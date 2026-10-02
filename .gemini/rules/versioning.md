---
title: 版本号更新规范
description: 提交与推送时必须同步更新版本号，大功能大版本号+1，小功能小版本号+1
always_apply: true
---

# 提交与推送版本号更新规范

在本项目中进行代码修改、提交（git commit）与推送（git push）时，必须遵守以下版本号规则：

1. **版本号显示**：
   - 游戏暂停弹窗（`#modal-pause`）中必须展示当前版本号（格式为 `版本号：vX.Y.Z`）。
   - `app.js` 中的常量 `APP_VERSION`、`package.json` 中的 `version` 以及 `index.html` 中的暂停版本标签必须时刻保持三方一致。

2. **版本号自增规则**：
   - **大功能**：大版本号 +1（Major +1，例如 `1.1.0` -> `2.0.0`），次版本与补丁归零。可执行 `npm run bump:major`。
   - **小功能**：小版本号 +1（Minor +1，例如 `1.0.0` -> `1.1.0`），补丁归零。可执行 `npm run bump:minor`。
   - **问题修复/日常优化**：补丁号 +1（Patch +1，例如 `1.1.0` -> `1.1.1`）。可执行 `npm run bump:patch`。

3. **提交前自动与手动管理**：
   - 每次提交前，必须运行相应的 bump 命令（或依靠 `.githooks/pre-commit` 自动递增）。
   - 确保 `package.json`、`app.js`、`index.html` 同步暂存并包含在提交中。
