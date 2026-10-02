#!/usr/bin/env node
/**
 * 货柜消除 3D 版本号自动管理脚本
 * 
 * 规则：
 * - 大功能: 大版本号 +1 (major, 例如 1.1.0 -> 2.0.0)
 * - 小功能: 小版本号 +1 (minor, 例如 1.0.0 -> 1.1.0)
 * - 问题修复/微调: 补丁号 +1 (patch, 例如 1.1.0 -> 1.1.1)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const appJsPath = path.join(rootDir, 'app.js');
const indexHtmlPath = path.join(rootDir, 'index.html');
const swJsPath = path.join(rootDir, 'sw.js');

function readCurrentVersion() {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return pkg.version || '1.0.0';
}

function parseSemver(v) {
  const clean = v.replace(/^v/, '');
  const parts = clean.split('.').map(n => parseInt(n, 10) || 0);
  while (parts.length < 3) parts.push(0);
  return { major: parts[0], minor: parts[1], patch: parts[2] };
}

function bumpVersion(type, msg = '') {
  let bumpType = type;
  if (!bumpType || bumpType === 'auto') {
    const text = (msg || '').toLowerCase();
    if (/major|大功能|重大|breaking/i.test(text)) {
      bumpType = 'major';
    } else if (/feat|小功能|新功能|功能|feature/i.test(text)) {
      bumpType = 'minor';
    } else if (/fix|bug|修复|优化|perf|chore|docs|patch/i.test(text)) {
      bumpType = 'patch';
    } else {
      bumpType = 'minor'; // 默认小功能
    }
  }

  const curVerStr = readCurrentVersion();
  const { major, minor, patch } = parseSemver(curVerStr);
  let nextVer = '';
  let reason = '';

  if (bumpType === 'major' || bumpType === '大功能') {
    nextVer = `${major + 1}.0.0`;
    reason = '大功能 (Major +1)';
  } else if (bumpType === 'patch' || bumpType === '修复') {
    nextVer = `${major}.${minor}.${patch + 1}`;
    reason = '修复/微调 (Patch +1)';
  } else {
    // 默认或 minor / 小功能
    nextVer = `${major}.${minor + 1}.0`;
    reason = '小功能 (Minor +1)';
  }

  // 1. 更新 package.json
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  pkg.version = nextVer;
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

  // 2. 更新 app.js 中的 APP_VERSION
  if (fs.existsSync(appJsPath)) {
    let appContent = fs.readFileSync(appJsPath, 'utf8');
    if (/const\s+APP_VERSION\s*=\s*['"][^'"]+['"];/.test(appContent)) {
      appContent = appContent.replace(
        /const\s+APP_VERSION\s*=\s*['"][^'"]+['"];/,
        `const APP_VERSION = '${nextVer}';`
      );
    } else {
      appContent = appContent.replace(
        /'use strict';/,
        `'use strict';\n\n  // Game Application Version\n  const APP_VERSION = '${nextVer}';`
      );
    }
    fs.writeFileSync(appJsPath, appContent, 'utf8');
  }

  // 3. 更新 index.html 中的暂停弹窗版本号
  if (fs.existsSync(indexHtmlPath)) {
    let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
    htmlContent = htmlContent.replace(
      /(<div class="modal-version-badge" id="pause-modal-version">).*?(<\/div>)/,
      `$1版本号：v${nextVer}$2`
    );
    fs.writeFileSync(indexHtmlPath, htmlContent, 'utf8');
  }

  // 4. 更新 sw.js 中的 CACHE_VERSION
  if (fs.existsSync(swJsPath)) {
    let swContent = fs.readFileSync(swJsPath, 'utf8');
    swContent = swContent.replace(
      /const\s+CACHE_VERSION\s*=\s*['"][^'"]+['"];/,
      `const CACHE_VERSION = 'v${nextVer}';`
    );
    fs.writeFileSync(swJsPath, swContent, 'utf8');
  }

  console.log(`[Version Bump] ${reason}: v${curVerStr} -> v${nextVer}`);
  return { prev: curVerStr, next: nextVer, type: bumpType, reason };
}

// CLI 执行
const args = process.argv.slice(2);
const command = args[0] || 'minor';

if (command === 'check') {
  const pkgVer = readCurrentVersion();
  console.log(`当前版本号: v${pkgVer}`);
  process.exit(0);
}

if (command === 'hook-pre-commit') {
  if (process.env.SKIP_BUMP) {
    console.log('[Version Hook] SKIP_BUMP detected, skipping version bump.');
    process.exit(0);
  }

  // 检查是否已经手动修改了版本号并暂存
  try {
    const cachedDiff = execSync('git diff --cached package.json', { cwd: rootDir, encoding: 'utf8' });
    if (/"version":\s*"/.test(cachedDiff)) {
      console.log('[Version Hook] 检测到暂存区中已包含版本号变更，保持现有版本号。');
      process.exit(0);
    }
  } catch (e) {
    // 忽略错误
  }

  // 检查环境变量 BUMP (major / minor / patch)
  const envType = process.env.BUMP || 'minor';
  bumpVersion(envType);
  try {
    execSync('git add package.json app.js index.html sw.js', { cwd: rootDir });
    console.log('[Version Hook] 已自动更新并暂存 package.json, app.js, index.html, sw.js');
  } catch (err) {
    console.error('[Version Hook] Git add failed:', err.message);
  }
  process.exit(0);
}

const shouldStage = args.includes('--stage');
const messageArg = args.find(a => !a.startsWith('--') && a !== command) || '';

bumpVersion(command, messageArg);

if (shouldStage) {
  try {
    execSync('git add package.json app.js index.html sw.js', { cwd: rootDir });
    console.log('[Git Stage] package.json, app.js, index.html, sw.js 已自动暂存');
  } catch (err) {
    console.error('Git add failed:', err.message);
  }
}
