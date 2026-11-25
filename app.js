// Standalone High-Quality Goods Sort 3D Game with Solvability Guarantee
(function() {
  'use strict';

  // Game Application Version
  const APP_VERSION = '1.13.0';

  // Imported photo assets, fitted to a shared transparent canvas.
  const ITEMS = {
    "item_732": {
      "id": "item_732",
      "name": "蓝色小怪兽（732）",
      "archetype": "monster",
      "colorGroup": "732",
      "img": "./assets/items/photos/item_732.webp",
      "revision": "1e6ae46e498f",
      "bounds": [
        8,
        38,
        184,
        226
      ]
    },
    "item_733": {
      "id": "item_733",
      "name": "绿色小怪兽（733）",
      "archetype": "monster",
      "colorGroup": "733",
      "img": "./assets/items/photos/item_733.webp",
      "revision": "060e1f705bed",
      "bounds": [
        8,
        35,
        184,
        229
      ]
    },
    "item_734": {
      "id": "item_734",
      "name": "红色小怪兽（734）",
      "archetype": "monster",
      "colorGroup": "734",
      "img": "./assets/items/photos/item_734.webp",
      "revision": "e684ca25b7d3",
      "bounds": [
        8,
        37,
        184,
        227
      ]
    },
    "item_735": {
      "id": "item_735",
      "name": "青梨水果篮（735）",
      "archetype": "fruit_basket",
      "colorGroup": "735",
      "img": "./assets/items/photos/item_735.webp",
      "revision": "e81765790b2f",
      "bounds": [
        8,
        82,
        184,
        182
      ]
    },
    "item_736": {
      "id": "item_736",
      "name": "芒果水果篮（736）",
      "archetype": "fruit_basket",
      "colorGroup": "736",
      "img": "./assets/items/photos/item_736.webp",
      "revision": "cf17e10b84d4",
      "bounds": [
        8,
        91,
        184,
        173
      ]
    },
    "item_737": {
      "id": "item_737",
      "name": "番茄水果篮（737）",
      "archetype": "fruit_basket",
      "colorGroup": "737",
      "img": "./assets/items/photos/item_737.webp",
      "revision": "40a18f4d0eab",
      "bounds": [
        8,
        40,
        184,
        224
      ]
    },
    "item_738": {
      "id": "item_738",
      "name": "蓝色雨云挂件（738）",
      "archetype": "cloud",
      "colorGroup": "738",
      "img": "./assets/items/photos/item_738.webp",
      "revision": "ca5791f2d643",
      "bounds": [
        8,
        61,
        184,
        203
      ]
    },
    "item_739": {
      "id": "item_739",
      "name": "橙子水果挂件（739）",
      "archetype": "fruit",
      "colorGroup": "739",
      "img": "./assets/items/photos/item_739.webp",
      "revision": "bcdd9a4ea968",
      "bounds": [
        8,
        44,
        184,
        220
      ]
    },
    "item_740": {
      "id": "item_740",
      "name": "蜜桃水果挂件（740）",
      "archetype": "fruit",
      "colorGroup": "740",
      "img": "./assets/items/photos/item_740.webp",
      "revision": "b2d5f6ce7769",
      "bounds": [
        8,
        60,
        184,
        204
      ]
    },
    "item_741": {
      "id": "item_741",
      "name": "蓝莓水果挂件（741）",
      "archetype": "fruit",
      "colorGroup": "741",
      "img": "./assets/items/photos/item_741.webp",
      "revision": "fe24df610378",
      "bounds": [
        8,
        46,
        184,
        218
      ]
    },
    "item_742": {
      "id": "item_742",
      "name": "草莓水果挂件（742）",
      "archetype": "fruit",
      "colorGroup": "742",
      "img": "./assets/items/photos/item_742.webp",
      "revision": "a05e58adcca6",
      "bounds": [
        8,
        32,
        184,
        232
      ]
    },
    "item_743": {
      "id": "item_743",
      "name": "葡萄水果挂件（743）",
      "archetype": "fruit",
      "colorGroup": "743",
      "img": "./assets/items/photos/item_743.webp",
      "revision": "915fe49bdcb6",
      "bounds": [
        8,
        16,
        184,
        248
      ]
    },
    "item_744": {
      "id": "item_744",
      "name": "柠檬水果挂件（744）",
      "archetype": "fruit",
      "colorGroup": "744",
      "img": "./assets/items/photos/item_744.webp",
      "revision": "b96c7b9057c9",
      "bounds": [
        8,
        29,
        184,
        235
      ]
    },
    "item_745": {
      "id": "item_745",
      "name": "南瓜水果挂件（745）",
      "archetype": "fruit",
      "colorGroup": "745",
      "img": "./assets/items/photos/item_745.webp",
      "revision": "cd680fe2bb39",
      "bounds": [
        8,
        30,
        184,
        234
      ]
    },
    "item_746": {
      "id": "item_746",
      "name": "粉蓝雨云挂件（746）",
      "archetype": "cloud",
      "colorGroup": "746",
      "img": "./assets/items/photos/item_746.webp",
      "revision": "12fe058d8844",
      "bounds": [
        8,
        81,
        184,
        183
      ]
    },
    "item_747": {
      "id": "item_747",
      "name": "小牛装公仔（747）",
      "archetype": "doll",
      "colorGroup": "747",
      "img": "./assets/items/photos/item_747.webp",
      "revision": "5b287325db71",
      "bounds": [
        14,
        16,
        172,
        248
      ]
    },
    "item_749": {
      "id": "item_749",
      "name": "兔子装公仔（749）",
      "archetype": "doll",
      "colorGroup": "749",
      "img": "./assets/items/photos/item_749.webp",
      "revision": "76e81bde59cc",
      "bounds": [
        28,
        16,
        143,
        248
      ]
    },
    "item_750": {
      "id": "item_750",
      "name": "紫色巫师帽南瓜灯（750）",
      "archetype": "pumpkin",
      "colorGroup": "750",
      "img": "./assets/items/photos/item_750.webp",
      "revision": "aa9bc413173e",
      "bounds": [
        8,
        37,
        184,
        227
      ]
    },
    "item_751": {
      "id": "item_751",
      "name": "橙色南瓜灯（751）",
      "archetype": "pumpkin",
      "colorGroup": "751",
      "img": "./assets/items/photos/item_751.webp",
      "revision": "b56970a7d645",
      "bounds": [
        8,
        81,
        184,
        183
      ]
    },
    "item_752": {
      "id": "item_752",
      "name": "草莓水果包装（752）",
      "archetype": "fruit_pack",
      "colorGroup": "752",
      "img": "./assets/items/photos/item_752.webp",
      "revision": "dc1a60bc15a4",
      "bounds": [
        8,
        22,
        184,
        242
      ]
    },
    "item_753": {
      "id": "item_753",
      "name": "榴莲水果包装（753）",
      "archetype": "fruit_pack",
      "colorGroup": "753",
      "img": "./assets/items/photos/item_753.webp",
      "revision": "a82f58879267",
      "bounds": [
        8,
        30,
        184,
        234
      ]
    },
    "item_754": {
      "id": "item_754",
      "name": "西瓜水果包装（754）",
      "archetype": "fruit_pack",
      "colorGroup": "754",
      "img": "./assets/items/photos/item_754.webp",
      "revision": "77debc4630e9",
      "bounds": [
        8,
        30,
        184,
        234
      ]
    },
    "item_755": {
      "id": "item_755",
      "name": "柠檬水果包装（755）",
      "archetype": "fruit_pack",
      "colorGroup": "755",
      "img": "./assets/items/photos/item_755.webp",
      "revision": "9dca10a4dc07",
      "bounds": [
        8,
        18,
        184,
        246
      ]
    },
    "item_756": {
      "id": "item_756",
      "name": "猫咪装公仔（756）",
      "archetype": "doll",
      "colorGroup": "756",
      "img": "./assets/items/photos/item_756.webp",
      "revision": "df5486f5ee92",
      "bounds": [
        16,
        16,
        168,
        248
      ]
    },
    "item_757": {
      "id": "item_757",
      "name": "草莓装公仔（757）",
      "archetype": "doll",
      "colorGroup": "757",
      "img": "./assets/items/photos/item_757.webp",
      "revision": "0694f3b871c8",
      "bounds": [
        30,
        16,
        139,
        248
      ]
    },
    "item_758": {
      "id": "item_758",
      "name": "蜜蜂装公仔（758）",
      "archetype": "doll",
      "colorGroup": "758",
      "img": "./assets/items/photos/item_758.webp",
      "revision": "7a312a345f44",
      "bounds": [
        30,
        16,
        140,
        248
      ]
    },
    "item_760": {
      "id": "item_760",
      "name": "绿色小猫公仔（760）",
      "archetype": "cat",
      "colorGroup": "760",
      "img": "./assets/items/photos/item_760.webp",
      "revision": "f499f16d5392",
      "bounds": [
        8,
        33,
        184,
        231
      ]
    },
    "item_762": {
      "id": "item_762",
      "name": "橘色小猫公仔（762）",
      "archetype": "cat",
      "colorGroup": "762",
      "img": "./assets/items/photos/item_762.webp",
      "revision": "d10063cc2627",
      "bounds": [
        8,
        27,
        184,
        237
      ]
    },
    "item_763": {
      "id": "item_763",
      "name": "西瓜饮料瓶（763）",
      "archetype": "bottle",
      "colorGroup": "763",
      "img": "./assets/items/photos/item_763.webp",
      "revision": "27232f4d916a",
      "bounds": [
        9,
        16,
        182,
        248
      ]
    },
    "item_764": {
      "id": "item_764",
      "name": "西瓜装小猫公仔（764）",
      "archetype": "cat",
      "colorGroup": "764",
      "img": "./assets/items/photos/item_764.webp",
      "revision": "9024c6b28a91",
      "bounds": [
        11,
        16,
        177,
        248
      ]
    },
    "item_765": {
      "id": "item_765",
      "name": "草莓水果糖盒（765）",
      "archetype": "fruit_candy",
      "colorGroup": "765",
      "img": "./assets/items/photos/item_765.webp",
      "revision": "1824a761f475",
      "bounds": [
        14,
        16,
        171,
        248
      ]
    },
    "item_766": {
      "id": "item_766",
      "name": "青葡萄水果糖盒（766）",
      "archetype": "fruit_candy",
      "colorGroup": "766",
      "img": "./assets/items/photos/item_766.webp",
      "revision": "3bbd18c67711",
      "bounds": [
        9,
        16,
        182,
        248
      ]
    },
    "item_767": {
      "id": "item_767",
      "name": "粉梨水果糖盒（767）",
      "archetype": "fruit_candy",
      "colorGroup": "767",
      "img": "./assets/items/photos/item_767.webp",
      "revision": "372b01aa4f57",
      "bounds": [
        21,
        16,
        158,
        248
      ]
    },
    "item_768": {
      "id": "item_768",
      "name": "蓝色菠萝水果糖盒（768）",
      "archetype": "fruit_candy",
      "colorGroup": "768",
      "img": "./assets/items/photos/item_768.webp",
      "revision": "d4f7e1cfe4f0",
      "bounds": [
        24,
        16,
        152,
        248
      ]
    },
    "item_770": {
      "id": "item_770",
      "name": "紫葡萄水果糖盒（770）",
      "archetype": "fruit_candy",
      "colorGroup": "770",
      "img": "./assets/items/photos/item_770.webp",
      "revision": "b8c616c9b952",
      "bounds": [
        8,
        19,
        184,
        245
      ]
    },
    "item_771": {
      "id": "item_771",
      "name": "青梨水果糖盒（771）",
      "archetype": "fruit_candy",
      "colorGroup": "771",
      "img": "./assets/items/photos/item_771.webp",
      "revision": "2ada8e81ae46",
      "bounds": [
        8,
        16,
        183,
        248
      ]
    },
    "item_772": {
      "id": "item_772",
      "name": "橙色菠萝水果糖盒（772）",
      "archetype": "fruit_candy",
      "colorGroup": "772",
      "img": "./assets/items/photos/item_772.webp",
      "revision": "062b37e77319",
      "bounds": [
        19,
        16,
        162,
        248
      ]
    },
    "item_773": {
      "id": "item_773",
      "name": "香蕉水果糖盒（773）",
      "archetype": "fruit_candy",
      "colorGroup": "773",
      "img": "./assets/items/photos/item_773.webp",
      "revision": "0c7cd791e15e",
      "bounds": [
        23,
        16,
        154,
        248
      ]
    },
    "item_774": {
      "id": "item_774",
      "name": "粉紫色礼盒（774）",
      "archetype": "gift",
      "colorGroup": "774",
      "img": "./assets/items/photos/item_774.webp",
      "revision": "07483b64fcc1",
      "bounds": [
        8,
        32,
        184,
        232
      ]
    },
    "item_775": {
      "id": "item_775",
      "name": "黄色圆帽（775）",
      "archetype": "hat",
      "colorGroup": "775",
      "img": "./assets/items/photos/item_775.webp",
      "revision": "fd8d4396bff5",
      "bounds": [
        8,
        59,
        184,
        205
      ]
    },
    "item_779": {
      "id": "item_779",
      "name": "咖啡饮品纸盒（779）",
      "archetype": "carton",
      "colorGroup": "779",
      "img": "./assets/items/photos/item_779.webp",
      "revision": "5c2ea6a5c7e2",
      "bounds": [
        26,
        16,
        148,
        248
      ]
    },
    "item_782": {
      "id": "item_782",
      "name": "粉蓝蘑菇（782）",
      "archetype": "mushroom",
      "colorGroup": "782",
      "img": "./assets/items/photos/item_782.webp",
      "revision": "50ee0c32cdda",
      "bounds": [
        8,
        32,
        184,
        232
      ]
    },
    "item_783": {
      "id": "item_783",
      "name": "绿色星星束口袋（783）",
      "archetype": "pouch",
      "colorGroup": "783",
      "img": "./assets/items/photos/item_783.webp",
      "revision": "e1b2529ea9df",
      "bounds": [
        8,
        23,
        184,
        241
      ]
    },
    "item_785": {
      "id": "item_785",
      "name": "金黄色束口袋（785）",
      "archetype": "pouch",
      "colorGroup": "785",
      "img": "./assets/items/photos/item_785.webp",
      "revision": "b9bbee0b0b9a",
      "bounds": [
        37,
        16,
        126,
        248
      ]
    },
    "item_786": {
      "id": "item_786",
      "name": "木色圆凳（786）",
      "archetype": "stool",
      "colorGroup": "786",
      "img": "./assets/items/photos/item_786.webp",
      "revision": "b0d421dea6e4",
      "bounds": [
        8,
        37,
        184,
        227
      ]
    },
    "item_790": {
      "id": "item_790",
      "name": "橙色庆典礼炮（790）",
      "archetype": "party_popper",
      "colorGroup": "790",
      "img": "./assets/items/photos/item_790.webp",
      "revision": "b3a15728367a",
      "bounds": [
        11,
        16,
        178,
        248
      ]
    },
    "item_791": {
      "id": "item_791",
      "name": "可乐饮料瓶（791）",
      "archetype": "bottle",
      "colorGroup": "791",
      "img": "./assets/items/photos/item_791.webp",
      "revision": "780d7465af2a",
      "bounds": [
        30,
        16,
        139,
        248
      ]
    },
    "item_792": {
      "id": "item_792",
      "name": "小熊饮料瓶（792）",
      "archetype": "bottle",
      "colorGroup": "792",
      "img": "./assets/items/photos/item_792.webp",
      "revision": "28e23ffa7dd1",
      "bounds": [
        24,
        16,
        151,
        248
      ]
    },
    "item_793": {
      "id": "item_793",
      "name": "粉色双肩背包（793）",
      "archetype": "backpack",
      "colorGroup": "793",
      "img": "./assets/items/photos/item_793.webp",
      "revision": "e10b5a759a17",
      "bounds": [
        8,
        27,
        184,
        237
      ]
    },
    "item_794": {
      "id": "item_794",
      "name": "绿色鸡蛋瓶清洁剂（794）",
      "archetype": "cleaner",
      "colorGroup": "794",
      "img": "./assets/items/photos/item_794.webp",
      "revision": "dd737cb145b8",
      "bounds": [
        8,
        33,
        184,
        231
      ]
    },
    "item_797": {
      "id": "item_797",
      "name": "黄色咖啡机（797）",
      "archetype": "coffee_maker",
      "colorGroup": "797",
      "img": "./assets/items/photos/item_797.webp",
      "revision": "92a082678902",
      "bounds": [
        13,
        16,
        173,
        248
      ]
    },
    "item_798": {
      "id": "item_798",
      "name": "绿色咖啡机（798）",
      "archetype": "coffee_maker",
      "colorGroup": "798",
      "img": "./assets/items/photos/item_798.webp",
      "revision": "3f66f4170a5a",
      "bounds": [
        15,
        16,
        170,
        248
      ]
    },
    "item_799": {
      "id": "item_799",
      "name": "青色台灯（799）",
      "archetype": "lamp",
      "colorGroup": "799",
      "img": "./assets/items/photos/item_799.webp",
      "revision": "7e40d82b2452",
      "bounds": [
        8,
        16,
        184,
        248
      ]
    },
    "item_800": {
      "id": "item_800",
      "name": "橙色饮料瓶（800）",
      "archetype": "bottle",
      "colorGroup": "800",
      "img": "./assets/items/photos/item_800.webp",
      "revision": "238660988574",
      "bounds": [
        59,
        16,
        81,
        248
      ]
    },
    "item_801": {
      "id": "item_801",
      "name": "可乐饮料瓶（801）",
      "archetype": "bottle",
      "colorGroup": "801",
      "img": "./assets/items/photos/item_801.webp",
      "revision": "3ffae0835a07",
      "bounds": [
        63,
        16,
        74,
        248
      ]
    },
    "item_802": {
      "id": "item_802",
      "name": "粉紫色饮料瓶（802）",
      "archetype": "bottle",
      "colorGroup": "802",
      "img": "./assets/items/photos/item_802.webp",
      "revision": "2a93cd05eccf",
      "bounds": [
        64,
        16,
        71,
        248
      ]
    },
    "item_803": {
      "id": "item_803",
      "name": "蓝紫色咖啡机（803）",
      "archetype": "coffee_maker",
      "colorGroup": "803",
      "img": "./assets/items/photos/item_803.webp",
      "revision": "76b8df8c821f",
      "bounds": [
        16,
        16,
        168,
        248
      ]
    },
    "item_804": {
      "id": "item_804",
      "name": "紫色双肩背包（804）",
      "archetype": "backpack",
      "colorGroup": "804",
      "img": "./assets/items/photos/item_804.webp",
      "revision": "ab55b30f5e8e",
      "bounds": [
        8,
        27,
        184,
        237
      ]
    },
    "item_805": {
      "id": "item_805",
      "name": "浅蓝色饮料瓶（805）",
      "archetype": "bottle",
      "colorGroup": "805",
      "img": "./assets/items/photos/item_805.webp",
      "revision": "d7d12e8137db",
      "bounds": [
        64,
        16,
        71,
        248
      ]
    },
    "item_810": {
      "id": "item_810",
      "name": "粉色吹风机（810）",
      "archetype": "dryer",
      "colorGroup": "810",
      "img": "./assets/items/photos/item_810.webp",
      "revision": "363a0ca151ec",
      "bounds": [
        8,
        34,
        184,
        230
      ]
    },
    "item_811": {
      "id": "item_811",
      "name": "橙色吹风机（811）",
      "archetype": "dryer",
      "colorGroup": "811",
      "img": "./assets/items/photos/item_811.webp",
      "revision": "8513ca7c2dd8",
      "bounds": [
        8,
        36,
        184,
        228
      ]
    },
    "item_812": {
      "id": "item_812",
      "name": "红色高帮鞋（812）",
      "archetype": "shoe",
      "colorGroup": "812",
      "img": "./assets/items/photos/item_812.webp",
      "revision": "b08e3fc429a7",
      "bounds": [
        8,
        36,
        184,
        228
      ]
    },
    "item_813": {
      "id": "item_813",
      "name": "蓝色庆典礼炮（813）",
      "archetype": "party_popper",
      "colorGroup": "813",
      "img": "./assets/items/photos/item_813.webp",
      "revision": "bb9478784df3",
      "bounds": [
        8,
        26,
        184,
        238
      ]
    },
    "item_814": {
      "id": "item_814",
      "name": "紫色牙刷杯（814）",
      "archetype": "toothbrush_cup",
      "colorGroup": "814",
      "img": "./assets/items/photos/item_814.webp",
      "revision": "511661e24d87",
      "bounds": [
        8,
        21,
        184,
        243
      ]
    },
    "item_815": {
      "id": "item_815",
      "name": "红色笑脸按压瓶（815）",
      "archetype": "pump_bottle",
      "colorGroup": "815",
      "img": "./assets/items/photos/item_815.webp",
      "revision": "6389c2393c0b",
      "bounds": [
        16,
        16,
        167,
        248
      ]
    },
    "item_816": {
      "id": "item_816",
      "name": "多肉盆栽（816）",
      "archetype": "plant",
      "colorGroup": "816",
      "img": "./assets/items/photos/item_816.webp",
      "revision": "c608196cbb83",
      "bounds": [
        10,
        16,
        180,
        248
      ]
    },
    "item_818": {
      "id": "item_818",
      "name": "蓝色风扇（818）",
      "archetype": "fan",
      "colorGroup": "818",
      "img": "./assets/items/photos/item_818.webp",
      "revision": "b6c51ec869f8",
      "bounds": [
        8,
        28,
        184,
        236
      ]
    },
    "item_819": {
      "id": "item_819",
      "name": "绿色饮料瓶（819）",
      "archetype": "bottle",
      "colorGroup": "819",
      "img": "./assets/items/photos/item_819.webp",
      "revision": "16a7fd8c0553",
      "bounds": [
        60,
        16,
        80,
        248
      ]
    },
    "item_820": {
      "id": "item_820",
      "name": "黄色饮料瓶（820）",
      "archetype": "bottle",
      "colorGroup": "820",
      "img": "./assets/items/photos/item_820.webp",
      "revision": "6a80aaed103e",
      "bounds": [
        64,
        16,
        72,
        248
      ]
    },
    "item_821": {
      "id": "item_821",
      "name": "橙色清洁刷（821）",
      "archetype": "brush",
      "colorGroup": "821",
      "img": "./assets/items/photos/item_821.webp",
      "revision": "c9e95ecf1147",
      "bounds": [
        12,
        16,
        175,
        248
      ]
    },
    "item_822": {
      "id": "item_822",
      "name": "蓝色牙刷杯（822）",
      "archetype": "toothbrush_cup",
      "colorGroup": "822",
      "img": "./assets/items/photos/item_822.webp",
      "revision": "18062e963f35",
      "bounds": [
        8,
        20,
        184,
        244
      ]
    },
    "item_823": {
      "id": "item_823",
      "name": "橙色围巾（823）",
      "archetype": "scarf",
      "colorGroup": "823",
      "img": "./assets/items/photos/item_823.webp",
      "revision": "3e7ea9d51c5b",
      "bounds": [
        8,
        30,
        184,
        234
      ]
    },
    "item_826": {
      "id": "item_826",
      "name": "粉黄渐变笔记本（826）",
      "archetype": "notebook",
      "colorGroup": "826",
      "img": "./assets/items/photos/item_826.webp",
      "revision": "6921213558fc",
      "bounds": [
        24,
        16,
        152,
        248
      ]
    },
    "item_827": {
      "id": "item_827",
      "name": "粉色饮料瓶（827）",
      "archetype": "bottle",
      "colorGroup": "827",
      "img": "./assets/items/photos/item_827.webp",
      "revision": "0687bd777b7c",
      "bounds": [
        11,
        16,
        177,
        248
      ]
    },
    "item_828": {
      "id": "item_828",
      "name": "黄色汽水罐（828）",
      "archetype": "can",
      "colorGroup": "828",
      "img": "./assets/items/photos/item_828.webp",
      "revision": "6129a7b62ab9",
      "bounds": [
        8,
        16,
        184,
        248
      ]
    },
    "item_829": {
      "id": "item_829",
      "name": "珍珠奶茶（829）",
      "archetype": "drink",
      "colorGroup": "829",
      "img": "./assets/items/photos/item_829.webp",
      "revision": "3a4b64633fea",
      "bounds": [
        14,
        16,
        171,
        248
      ]
    },
    "item_830": {
      "id": "item_830",
      "name": "紫色星芒零食袋（830）",
      "archetype": "snack",
      "colorGroup": "830",
      "img": "./assets/items/photos/item_830.webp",
      "revision": "562c108b32e7",
      "bounds": [
        12,
        16,
        175,
        248
      ]
    },
    "item_832": {
      "id": "item_832",
      "name": "红色列车（832）",
      "archetype": "train",
      "colorGroup": "832",
      "img": "./assets/items/photos/item_832.webp",
      "revision": "8aa7df9cad31",
      "bounds": [
        8,
        39,
        184,
        225
      ]
    },
    "item_833": {
      "id": "item_833",
      "name": "绿色围巾（833）",
      "archetype": "scarf",
      "colorGroup": "833",
      "img": "./assets/items/photos/item_833.webp",
      "revision": "d864549ea85c",
      "bounds": [
        8,
        29,
        184,
        235
      ]
    },
    "item_834": {
      "id": "item_834",
      "name": "红色围巾（834）",
      "archetype": "scarf",
      "colorGroup": "834",
      "img": "./assets/items/photos/item_834.webp",
      "revision": "f3d28398db7c",
      "bounds": [
        8,
        30,
        184,
        234
      ]
    },
    "item_835": {
      "id": "item_835",
      "name": "棕色小熊公仔（835）",
      "archetype": "bear",
      "colorGroup": "835",
      "img": "./assets/items/photos/item_835.webp",
      "revision": "4f6851cf7d6b",
      "bounds": [
        12,
        16,
        175,
        248
      ]
    },
    "item_836": {
      "id": "item_836",
      "name": "紫色小熊公仔（836）",
      "archetype": "bear",
      "colorGroup": "836",
      "img": "./assets/items/photos/item_836.webp",
      "revision": "67dbe437beb6",
      "bounds": [
        16,
        16,
        168,
        248
      ]
    },
    "item_837": {
      "id": "item_837",
      "name": "蓝色汽水罐（837）",
      "archetype": "can",
      "colorGroup": "837",
      "img": "./assets/items/photos/item_837.webp",
      "revision": "a95edc05c278",
      "bounds": [
        10,
        16,
        179,
        248
      ]
    },
    "item_838": {
      "id": "item_838",
      "name": "紫色遥控器（838）",
      "archetype": "remote",
      "colorGroup": "838",
      "img": "./assets/items/photos/item_838.webp",
      "revision": "9ba07fb76cde",
      "bounds": [
        16,
        16,
        167,
        248
      ]
    },
    "item_839": {
      "id": "item_839",
      "name": "红色闹钟（839）",
      "archetype": "clock",
      "colorGroup": "839",
      "img": "./assets/items/photos/item_839.webp",
      "revision": "6f6738a2808b",
      "bounds": [
        8,
        19,
        184,
        245
      ]
    },
    "item_840": {
      "id": "item_840",
      "name": "青色冰箱（840）",
      "archetype": "fridge",
      "colorGroup": "840",
      "img": "./assets/items/photos/item_840.webp",
      "revision": "7b6776d99b9e",
      "bounds": [
        8,
        25,
        184,
        239
      ]
    },
    "item_842": {
      "id": "item_842",
      "name": "红色计算器（842）",
      "archetype": "calculator",
      "colorGroup": "842",
      "img": "./assets/items/photos/item_842.webp",
      "revision": "0b07fca645e8",
      "bounds": [
        8,
        42,
        184,
        222
      ]
    },
    "item_843": {
      "id": "item_843",
      "name": "蓝色标签饮料瓶（843）",
      "archetype": "bottle",
      "colorGroup": "843",
      "img": "./assets/items/photos/item_843.webp",
      "revision": "8c4ea880145f",
      "bounds": [
        48,
        16,
        103,
        248
      ]
    },
    "item_844": {
      "id": "item_844",
      "name": "橙色饮料瓶（844）",
      "archetype": "bottle",
      "colorGroup": "844",
      "img": "./assets/items/photos/item_844.webp",
      "revision": "a35d1e061645",
      "bounds": [
        51,
        16,
        97,
        248
      ]
    },
    "item_845": {
      "id": "item_845",
      "name": "黄黑条纹袜子（845）",
      "archetype": "stocking",
      "colorGroup": "845",
      "img": "./assets/items/photos/item_845.webp",
      "revision": "1d30c0399571",
      "bounds": [
        44,
        16,
        112,
        248
      ]
    },
    "item_846": {
      "id": "item_846",
      "name": "圆形仙人掌盆栽（846）",
      "archetype": "plant",
      "colorGroup": "846",
      "img": "./assets/items/photos/item_846.webp",
      "revision": "ed363132df9b",
      "bounds": [
        23,
        16,
        153,
        248
      ]
    },
    "item_847": {
      "id": "item_847",
      "name": "橙色计算器（847）",
      "archetype": "calculator",
      "colorGroup": "847",
      "img": "./assets/items/photos/item_847.webp",
      "revision": "2cad08126a61",
      "bounds": [
        11,
        16,
        178,
        248
      ]
    },
    "item_848": {
      "id": "item_848",
      "name": "紫色葡萄糖果零食袋（848）",
      "archetype": "snack",
      "colorGroup": "848",
      "img": "./assets/items/photos/item_848.webp",
      "revision": "4b3da80085a8",
      "bounds": [
        8,
        33,
        184,
        231
      ]
    },
    "item_849": {
      "id": "item_849",
      "name": "蓝紫色台灯（849）",
      "archetype": "lamp",
      "colorGroup": "849",
      "img": "./assets/items/photos/item_849.webp",
      "revision": "7e7013499b87",
      "bounds": [
        15,
        16,
        170,
        248
      ]
    },
    "item_850": {
      "id": "item_850",
      "name": "红色饮料瓶（850）",
      "archetype": "bottle",
      "colorGroup": "850",
      "img": "./assets/items/photos/item_850.webp",
      "revision": "7587d227912a",
      "bounds": [
        26,
        16,
        148,
        248
      ]
    },
    "item_851": {
      "id": "item_851",
      "name": "黄色手套（851）",
      "archetype": "mitten",
      "colorGroup": "851",
      "img": "./assets/items/photos/item_851.webp",
      "revision": "e49a7080324d",
      "bounds": [
        8,
        48,
        184,
        216
      ]
    },
    "item_853": {
      "id": "item_853",
      "name": "绿色小熊公仔（853）",
      "archetype": "bear",
      "colorGroup": "853",
      "img": "./assets/items/photos/item_853.webp",
      "revision": "d9e242002c89",
      "bounds": [
        16,
        16,
        167,
        248
      ]
    },
    "item_855": {
      "id": "item_855",
      "name": "橙色零食袋（855）",
      "archetype": "snack",
      "colorGroup": "855",
      "img": "./assets/items/photos/item_855.webp",
      "revision": "a0b1cf4f075a",
      "bounds": [
        13,
        16,
        174,
        248
      ]
    },
    "item_856": {
      "id": "item_856",
      "name": "彩虹零食袋（856）",
      "archetype": "snack",
      "colorGroup": "856",
      "img": "./assets/items/photos/item_856.webp",
      "revision": "cca8d1936d0c",
      "bounds": [
        8,
        16,
        183,
        248
      ]
    },
    "item_857": {
      "id": "item_857",
      "name": "紫葡萄饮品纸盒（857）",
      "archetype": "carton",
      "colorGroup": "857",
      "img": "./assets/items/photos/item_857.webp",
      "revision": "4ca6becfedd5",
      "bounds": [
        13,
        16,
        173,
        248
      ]
    },
    "item_858": {
      "id": "item_858",
      "name": "青苹果饮品纸盒（858）",
      "archetype": "carton",
      "colorGroup": "858",
      "img": "./assets/items/photos/item_858.webp",
      "revision": "0d13bff1d59f",
      "bounds": [
        11,
        16,
        177,
        248
      ]
    },
    "item_859": {
      "id": "item_859",
      "name": "橙色圆形饮料瓶（859）",
      "archetype": "bottle",
      "colorGroup": "859",
      "img": "./assets/items/photos/item_859.webp",
      "revision": "fd7338f78d71",
      "bounds": [
        25,
        16,
        150,
        248
      ]
    },
    "item_860": {
      "id": "item_860",
      "name": "绿色圆形饮料瓶（860）",
      "archetype": "bottle",
      "colorGroup": "860",
      "img": "./assets/items/photos/item_860.webp",
      "revision": "fbb15a13ffc2",
      "bounds": [
        9,
        16,
        181,
        248
      ]
    },
    "item_861": {
      "id": "item_861",
      "name": "红色圆形饮料瓶（861）",
      "archetype": "bottle",
      "colorGroup": "861",
      "img": "./assets/items/photos/item_861.webp",
      "revision": "0be48a7e3151",
      "bounds": [
        13,
        16,
        173,
        248
      ]
    },
    "item_862": {
      "id": "item_862",
      "name": "红色灯笼（862）",
      "archetype": "lantern",
      "colorGroup": "862",
      "img": "./assets/items/photos/item_862.webp",
      "revision": "3b7d867ba473",
      "bounds": [
        17,
        16,
        165,
        248
      ]
    },
    "item_863": {
      "id": "item_863",
      "name": "黄色灯笼（863）",
      "archetype": "lantern",
      "colorGroup": "863",
      "img": "./assets/items/photos/item_863.webp",
      "revision": "663ea52f6475",
      "bounds": [
        18,
        16,
        164,
        248
      ]
    },
    "item_864": {
      "id": "item_864",
      "name": "橙色福字束口袋（864）",
      "archetype": "pouch",
      "colorGroup": "864",
      "img": "./assets/items/photos/item_864.webp",
      "revision": "dbe230af8c92",
      "bounds": [
        8,
        16,
        183,
        248
      ]
    },
    "item_865": {
      "id": "item_865",
      "name": "红色福字束口袋（865）",
      "archetype": "pouch",
      "colorGroup": "865",
      "img": "./assets/items/photos/item_865.webp",
      "revision": "86528368be80",
      "bounds": [
        8,
        16,
        184,
        248
      ]
    },
    "item_866": {
      "id": "item_866",
      "name": "灰色砧板（866）",
      "archetype": "board",
      "colorGroup": "866",
      "img": "./assets/items/photos/item_866.webp",
      "revision": "1aca0ef20805",
      "bounds": [
        20,
        16,
        159,
        248
      ]
    },
    "item_867": {
      "id": "item_867",
      "name": "粉色小熊公仔（867）",
      "archetype": "bear",
      "colorGroup": "867",
      "img": "./assets/items/photos/item_867.webp",
      "revision": "8d0b3f03d90c",
      "bounds": [
        13,
        16,
        174,
        248
      ]
    },
    "item_868": {
      "id": "item_868",
      "name": "蓝色小熊公仔（868）",
      "archetype": "bear",
      "colorGroup": "868",
      "img": "./assets/items/photos/item_868.webp",
      "revision": "08775918792c",
      "bounds": [
        11,
        16,
        178,
        248
      ]
    },
    "item_869": {
      "id": "item_869",
      "name": "黄色小熊公仔（869）",
      "archetype": "bear",
      "colorGroup": "869",
      "img": "./assets/items/photos/item_869.webp",
      "revision": "60b1eb00671d",
      "bounds": [
        11,
        16,
        177,
        248
      ]
    },
    "item_870": {
      "id": "item_870",
      "name": "黄色烤面包机（870）",
      "archetype": "toaster",
      "colorGroup": "870",
      "img": "./assets/items/photos/item_870.webp",
      "revision": "45082d92c477",
      "bounds": [
        8,
        50,
        184,
        214
      ]
    },
    "item_871": {
      "id": "item_871",
      "name": "蓝色水壶（871）",
      "archetype": "flask",
      "colorGroup": "871",
      "img": "./assets/items/photos/item_871.webp",
      "revision": "221a9f8e0019",
      "bounds": [
        27,
        16,
        146,
        248
      ]
    },
    "item_872": {
      "id": "item_872",
      "name": "橙色波点手提包（872）",
      "archetype": "handbag",
      "colorGroup": "872",
      "img": "./assets/items/photos/item_872.webp",
      "revision": "c37e8fe70298",
      "bounds": [
        8,
        43,
        184,
        221
      ]
    },
    "item_873": {
      "id": "item_873",
      "name": "红色波点手提包（873）",
      "archetype": "handbag",
      "colorGroup": "873",
      "img": "./assets/items/photos/item_873.webp",
      "revision": "095f0401b4de",
      "bounds": [
        8,
        43,
        184,
        221
      ]
    },
    "item_874": {
      "id": "item_874",
      "name": "绿色香水瓶（874）",
      "archetype": "perfume",
      "colorGroup": "874",
      "img": "./assets/items/photos/item_874.webp",
      "revision": "98ac82fd5054",
      "bounds": [
        18,
        16,
        164,
        248
      ]
    },
    "item_875": {
      "id": "item_875",
      "name": "蓝色香水瓶（875）",
      "archetype": "perfume",
      "colorGroup": "875",
      "img": "./assets/items/photos/item_875.webp",
      "revision": "9a4ad0422497",
      "bounds": [
        18,
        16,
        164,
        248
      ]
    },
    "item_876": {
      "id": "item_876",
      "name": "橙色圆形饮料瓶（876）",
      "archetype": "bottle",
      "colorGroup": "859",
      "img": "./assets/items/photos/item_876.webp",
      "revision": "6e0fa9cc3731",
      "bounds": [
        12,
        16,
        175,
        248
      ]
    },
    "item_877": {
      "id": "item_877",
      "name": "彩色糖果袋（877）",
      "archetype": "candy_bag",
      "colorGroup": "877",
      "img": "./assets/items/photos/item_877.webp",
      "revision": "e11ed7fa67f8",
      "bounds": [
        8,
        23,
        184,
        241
      ]
    },
    "item_878": {
      "id": "item_878",
      "name": "莓果饮品纸盒（878）",
      "archetype": "carton",
      "colorGroup": "878",
      "img": "./assets/items/photos/item_878.webp",
      "revision": "fb6041e1dbad",
      "bounds": [
        10,
        16,
        180,
        248
      ]
    },
    "item_879": {
      "id": "item_879",
      "name": "深蓝色饮料瓶（879）",
      "archetype": "bottle",
      "colorGroup": "879",
      "img": "./assets/items/photos/item_879.webp",
      "revision": "ff734fb2deb0",
      "bounds": [
        59,
        16,
        82,
        248
      ]
    },
    "item_880": {
      "id": "item_880",
      "name": "粉色收纳桶（880）",
      "archetype": "bin",
      "colorGroup": "880",
      "img": "./assets/items/photos/item_880.webp",
      "revision": "33eb00ebaf25",
      "bounds": [
        23,
        16,
        154,
        248
      ]
    },
    "item_881": {
      "id": "item_881",
      "name": "粉色笔记本（881）",
      "archetype": "notebook",
      "colorGroup": "881",
      "img": "./assets/items/photos/item_881.webp",
      "revision": "ad4f29c9110d",
      "bounds": [
        8,
        22,
        184,
        242
      ]
    },
    "item_882": {
      "id": "item_882",
      "name": "绿色青柠零食袋（882）",
      "archetype": "snack",
      "colorGroup": "882",
      "img": "./assets/items/photos/item_882.webp",
      "revision": "59f26bfc3700",
      "bounds": [
        10,
        16,
        179,
        248
      ]
    },
    "item_883": {
      "id": "item_883",
      "name": "草莓饮品纸盒（883）",
      "archetype": "carton",
      "colorGroup": "883",
      "img": "./assets/items/photos/item_883.webp",
      "revision": "585fe2d8304b",
      "bounds": [
        10,
        16,
        179,
        248
      ]
    },
    "item_884": {
      "id": "item_884",
      "name": "黄色笑脸瓶清洁剂（884）",
      "archetype": "cleaner",
      "colorGroup": "884",
      "img": "./assets/items/photos/item_884.webp",
      "revision": "cdcaa5504a7f",
      "bounds": [
        11,
        16,
        178,
        248
      ]
    },
    "item_885": {
      "id": "item_885",
      "name": "粉色热气球（885）",
      "archetype": "balloon",
      "colorGroup": "885",
      "img": "./assets/items/photos/item_885.webp",
      "revision": "2a501015a4d4",
      "bounds": [
        18,
        16,
        163,
        248
      ]
    },
    "item_886": {
      "id": "item_886",
      "name": "蓝色泡泡零食袋（886）",
      "archetype": "snack",
      "colorGroup": "886",
      "img": "./assets/items/photos/item_886.webp",
      "revision": "515332f3c4eb",
      "bounds": [
        8,
        26,
        184,
        238
      ]
    },
    "item_887": {
      "id": "item_887",
      "name": "菠萝零食袋（887）",
      "archetype": "snack",
      "colorGroup": "887",
      "img": "./assets/items/photos/item_887.webp",
      "revision": "8a3f13c158fc",
      "bounds": [
        8,
        26,
        184,
        238
      ]
    },
    "item_888": {
      "id": "item_888",
      "name": "蓝紫镭射零食袋（888）",
      "archetype": "snack",
      "colorGroup": "888",
      "img": "./assets/items/photos/item_888.webp",
      "revision": "51029ed491b9",
      "bounds": [
        10,
        16,
        179,
        248
      ]
    },
    "item_889": {
      "id": "item_889",
      "name": "紫色圆形饮料瓶（889）",
      "archetype": "bottle",
      "colorGroup": "889",
      "img": "./assets/items/photos/item_889.webp",
      "revision": "e5b079572413",
      "bounds": [
        12,
        16,
        175,
        248
      ]
    },
    "item_890": {
      "id": "item_890",
      "name": "蓝色薯片零食袋（890）",
      "archetype": "snack",
      "colorGroup": "890",
      "img": "./assets/items/photos/item_890.webp",
      "revision": "7f39a606d3b3",
      "bounds": [
        8,
        16,
        183,
        248
      ]
    },
    "item_891": {
      "id": "item_891",
      "name": "蓝色牛奶饮品纸盒（891）",
      "archetype": "carton",
      "colorGroup": "891",
      "img": "./assets/items/photos/item_891.webp",
      "revision": "8f6b2290cc45",
      "bounds": [
        25,
        16,
        150,
        248
      ]
    },
    "item_892": {
      "id": "item_892",
      "name": "蜜蜂公仔（892）",
      "archetype": "bee",
      "colorGroup": "892",
      "img": "./assets/items/photos/item_892.webp",
      "revision": "38e942522872",
      "bounds": [
        8,
        34,
        184,
        230
      ]
    },
    "item_893": {
      "id": "item_893",
      "name": "橙色蘑菇（893）",
      "archetype": "mushroom",
      "colorGroup": "893",
      "img": "./assets/items/photos/item_893.webp",
      "revision": "7113ea5d800d",
      "bounds": [
        9,
        16,
        181,
        248
      ]
    },
    "item_894": {
      "id": "item_894",
      "name": "橙色灯笼（894）",
      "archetype": "lantern",
      "colorGroup": "894",
      "img": "./assets/items/photos/item_894.webp",
      "revision": "c2e7a5196a9a",
      "bounds": [
        17,
        16,
        165,
        248
      ]
    },
    "item_895": {
      "id": "item_895",
      "name": "绿色波纹零食袋（895）",
      "archetype": "snack",
      "colorGroup": "895",
      "img": "./assets/items/photos/item_895.webp",
      "revision": "e5041095b938",
      "bounds": [
        18,
        16,
        163,
        248
      ]
    },
    "item_896": {
      "id": "item_896",
      "name": "橙色波点按压瓶（896）",
      "archetype": "pump_bottle",
      "colorGroup": "896",
      "img": "./assets/items/photos/item_896.webp",
      "revision": "7b4fd5c8751c",
      "bounds": [
        26,
        16,
        147,
        248
      ]
    },
    "item_897": {
      "id": "item_897",
      "name": "橙汁饮品纸盒（897）",
      "archetype": "carton",
      "colorGroup": "897",
      "img": "./assets/items/photos/item_897.webp",
      "revision": "1fb77da766fd",
      "bounds": [
        11,
        16,
        178,
        248
      ]
    },
    "item_898": {
      "id": "item_898",
      "name": "香蕉饮品纸盒（898）",
      "archetype": "carton",
      "colorGroup": "898",
      "img": "./assets/items/photos/item_898.webp",
      "revision": "c90e607ea834",
      "bounds": [
        23,
        16,
        153,
        248
      ]
    },
    "item_899": {
      "id": "item_899",
      "name": "蓝莓零食袋（899）",
      "archetype": "snack",
      "colorGroup": "899",
      "img": "./assets/items/photos/item_899.webp",
      "revision": "ed8a2c57f5e7",
      "bounds": [
        10,
        16,
        179,
        248
      ]
    },
    "item_900": {
      "id": "item_900",
      "name": "草莓零食袋（900）",
      "archetype": "snack",
      "colorGroup": "900",
      "img": "./assets/items/photos/item_900.webp",
      "revision": "816e6642841d",
      "bounds": [
        9,
        16,
        181,
        248
      ]
    },
    "item_901": {
      "id": "item_901",
      "name": "橙色薯片零食袋（901）",
      "archetype": "snack",
      "colorGroup": "901",
      "img": "./assets/items/photos/item_901.webp",
      "revision": "10978858e5c8",
      "bounds": [
        10,
        16,
        179,
        248
      ]
    },
    "item_902": {
      "id": "item_902",
      "name": "黄色芝士零食袋（902）",
      "archetype": "snack",
      "colorGroup": "902",
      "img": "./assets/items/photos/item_902.webp",
      "revision": "0101c24650d5",
      "bounds": [
        8,
        32,
        184,
        232
      ]
    },
    "item_903": {
      "id": "item_903",
      "name": "红色辣味零食袋（903）",
      "archetype": "snack",
      "colorGroup": "903",
      "img": "./assets/items/photos/item_903.webp",
      "revision": "56b2f24d3dd4",
      "bounds": [
        8,
        34,
        184,
        230
      ]
    },
    "item_904": {
      "id": "item_904",
      "name": "绿色海苔零食袋（904）",
      "archetype": "snack",
      "colorGroup": "904",
      "img": "./assets/items/photos/item_904.webp",
      "revision": "ce0a36e5a451",
      "bounds": [
        8,
        32,
        184,
        232
      ]
    },
    "item_905": {
      "id": "item_905",
      "name": "咖啡饮品纸盒（905）",
      "archetype": "carton",
      "colorGroup": "905",
      "img": "./assets/items/photos/item_905.webp",
      "revision": "dcf54900c8a9",
      "bounds": [
        18,
        16,
        164,
        248
      ]
    },
    "item_911": {
      "id": "item_911",
      "name": "长颈鹿包装（911）",
      "archetype": "animal_pack",
      "colorGroup": "911",
      "img": "./assets/items/photos/item_911.webp",
      "revision": "e227bac04a79",
      "bounds": [
        8,
        50,
        184,
        214
      ]
    },
    "item_913": {
      "id": "item_913",
      "name": "蓝色什锦饼干罐（913）",
      "archetype": "cookie_box",
      "colorGroup": "913",
      "img": "./assets/items/photos/item_913.webp",
      "revision": "46d2dfaebd58",
      "bounds": [
        8,
        32,
        184,
        232
      ]
    },
    "item_915": {
      "id": "item_915",
      "name": "红色果酱饼干罐（915）",
      "archetype": "cookie_box",
      "colorGroup": "915",
      "img": "./assets/items/photos/item_915.webp",
      "revision": "ee21230e4527",
      "bounds": [
        8,
        39,
        184,
        225
      ]
    },
    "item_916": {
      "id": "item_916",
      "name": "橙色柑橘饼干罐（916）",
      "archetype": "cookie_box",
      "colorGroup": "916",
      "img": "./assets/items/photos/item_916.webp",
      "revision": "79e4ce9aa2e6",
      "bounds": [
        8,
        40,
        184,
        224
      ]
    },
    "item_917": {
      "id": "item_917",
      "name": "棕色巧克力饼干罐（917）",
      "archetype": "cookie_box",
      "colorGroup": "917",
      "img": "./assets/items/photos/item_917.webp",
      "revision": "10a1576d76b1",
      "bounds": [
        10,
        16,
        180,
        248
      ]
    },
    "item_918": {
      "id": "item_918",
      "name": "紫色条纹袜子（918）",
      "archetype": "stocking",
      "colorGroup": "918",
      "img": "./assets/items/photos/item_918.webp",
      "revision": "5bf863af7f2c",
      "bounds": [
        20,
        16,
        159,
        248
      ]
    },
    "item_919": {
      "id": "item_919",
      "name": "青蓝糖果罐（919）",
      "archetype": "candy_jar",
      "colorGroup": "919",
      "img": "./assets/items/photos/item_919.webp",
      "revision": "3003355aba74",
      "bounds": [
        16,
        16,
        167,
        248
      ]
    },
    "item_920": {
      "id": "item_920",
      "name": "红色糖果罐（920）",
      "archetype": "candy_jar",
      "colorGroup": "920",
      "img": "./assets/items/photos/item_920.webp",
      "revision": "a3526dece49c",
      "bounds": [
        21,
        16,
        158,
        248
      ]
    },
    "item_921": {
      "id": "item_921",
      "name": "橙色糖果罐（921）",
      "archetype": "candy_jar",
      "colorGroup": "921",
      "img": "./assets/items/photos/item_921.webp",
      "revision": "cbe1aea4dbf2",
      "bounds": [
        8,
        25,
        184,
        239
      ]
    },
    "item_922": {
      "id": "item_922",
      "name": "紫色糖果罐（922）",
      "archetype": "candy_jar",
      "colorGroup": "922",
      "img": "./assets/items/photos/item_922.webp",
      "revision": "845565b13e51",
      "bounds": [
        8,
        17,
        184,
        247
      ]
    },
    "item_923": {
      "id": "item_923",
      "name": "绿色糖果罐（923）",
      "archetype": "candy_jar",
      "colorGroup": "923",
      "img": "./assets/items/photos/item_923.webp",
      "revision": "e7f089f551dd",
      "bounds": [
        8,
        16,
        184,
        248
      ]
    },
    "item_924": {
      "id": "item_924",
      "name": "粉色糖果罐（924）",
      "archetype": "candy_jar",
      "colorGroup": "924",
      "img": "./assets/items/photos/item_924.webp",
      "revision": "4088c2e1eadb",
      "bounds": [
        14,
        16,
        172,
        248
      ]
    },
    "item_925": {
      "id": "item_925",
      "name": "蓝黄糖果罐（925）",
      "archetype": "candy_jar",
      "colorGroup": "925",
      "img": "./assets/items/photos/item_925.webp",
      "revision": "46f7fb6c8a7d",
      "bounds": [
        15,
        16,
        170,
        248
      ]
    },
    "item_928": {
      "id": "item_928",
      "name": "奶黄色小兔公仔（928）",
      "archetype": "rabbit",
      "colorGroup": "928",
      "img": "./assets/items/photos/item_928.webp",
      "revision": "370b34b670a9",
      "bounds": [
        19,
        16,
        161,
        248
      ]
    },
    "item_929": {
      "id": "item_929",
      "name": "紫色小兔公仔（929）",
      "archetype": "rabbit",
      "colorGroup": "929",
      "img": "./assets/items/photos/item_929.webp",
      "revision": "e3dbfcb874af",
      "bounds": [
        17,
        16,
        166,
        248
      ]
    },
    "item_930": {
      "id": "item_930",
      "name": "虎尾兰盆栽（930）",
      "archetype": "plant",
      "colorGroup": "930",
      "img": "./assets/items/photos/item_930.webp",
      "revision": "d496196b5e8c",
      "bounds": [
        18,
        16,
        164,
        248
      ]
    },
    "item_931": {
      "id": "item_931",
      "name": "彩色雏菊盆栽（931）",
      "archetype": "plant",
      "colorGroup": "931",
      "img": "./assets/items/photos/item_931.webp",
      "revision": "53fe5050c845",
      "bounds": [
        14,
        16,
        171,
        248
      ]
    },
    "item_932": {
      "id": "item_932",
      "name": "向日葵盆栽（932）",
      "archetype": "plant",
      "colorGroup": "932",
      "img": "./assets/items/photos/item_932.webp",
      "revision": "e7205071f16c",
      "bounds": [
        22,
        16,
        156,
        248
      ]
    },
    "item_933": {
      "id": "item_933",
      "name": "绿色仙人掌盆栽（933）",
      "archetype": "plant",
      "colorGroup": "933",
      "img": "./assets/items/photos/item_933.webp",
      "revision": "657ef7929409",
      "bounds": [
        18,
        16,
        163,
        248
      ]
    },
    "item_934": {
      "id": "item_934",
      "name": "多肉盆栽（934）",
      "archetype": "plant",
      "colorGroup": "934",
      "img": "./assets/items/photos/item_934.webp",
      "revision": "ac8509e7c466",
      "bounds": [
        18,
        16,
        163,
        248
      ]
    },
    "item_935": {
      "id": "item_935",
      "name": "彩色绣球盆栽（935）",
      "archetype": "plant",
      "colorGroup": "935",
      "img": "./assets/items/photos/item_935.webp",
      "revision": "d2da1e38c4ed",
      "bounds": [
        17,
        18,
        166,
        246
      ]
    },
    "item_936": {
      "id": "item_936",
      "name": "蓝灰色小猫公仔（936）",
      "archetype": "cat",
      "colorGroup": "936",
      "img": "./assets/items/photos/item_936.webp",
      "revision": "5b35b10dc1be",
      "bounds": [
        13,
        16,
        173,
        248
      ]
    },
    "item_938": {
      "id": "item_938",
      "name": "橙色条纹小猫公仔（938）",
      "archetype": "cat",
      "colorGroup": "938",
      "img": "./assets/items/photos/item_938.webp",
      "revision": "8179e6107669",
      "bounds": [
        12,
        16,
        175,
        248
      ]
    },
    "item_939": {
      "id": "item_939",
      "name": "奶黄色小猫公仔（939）",
      "archetype": "cat",
      "colorGroup": "939",
      "img": "./assets/items/photos/item_939.webp",
      "revision": "db0b2afc3603",
      "bounds": [
        8,
        16,
        184,
        248
      ]
    },
    "item_940": {
      "id": "item_940",
      "name": "蓝色条纹蜡烛（940）",
      "archetype": "candle",
      "colorGroup": "940",
      "img": "./assets/items/photos/item_940.webp",
      "revision": "6dfa793eb546",
      "bounds": [
        22,
        16,
        155,
        248
      ]
    },
    "item_941": {
      "id": "item_941",
      "name": "黄色波点蜡烛（941）",
      "archetype": "candle",
      "colorGroup": "941",
      "img": "./assets/items/photos/item_941.webp",
      "revision": "66d632e74ed5",
      "bounds": [
        18,
        16,
        163,
        248
      ]
    },
    "item_942": {
      "id": "item_942",
      "name": "红色斜纹蜡烛（942）",
      "archetype": "candle",
      "colorGroup": "942",
      "img": "./assets/items/photos/item_942.webp",
      "revision": "80f12a9762fe",
      "bounds": [
        25,
        16,
        150,
        248
      ]
    },
    "item_943": {
      "id": "item_943",
      "name": "蓝色方形蜡烛（943）",
      "archetype": "candle",
      "colorGroup": "943",
      "img": "./assets/items/photos/item_943.webp",
      "revision": "db40e50d5f2f",
      "bounds": [
        23,
        16,
        153,
        248
      ]
    },
    "item_944": {
      "id": "item_944",
      "name": "红白礼盒（944）",
      "archetype": "gift",
      "colorGroup": "944",
      "img": "./assets/items/photos/item_944.webp",
      "revision": "12e5e692c266",
      "bounds": [
        8,
        32,
        184,
        232
      ]
    },
    "item_945": {
      "id": "item_945",
      "name": "蓝银礼盒（945）",
      "archetype": "gift",
      "colorGroup": "945",
      "img": "./assets/items/photos/item_945.webp",
      "revision": "bea999b1c385",
      "bounds": [
        8,
        22,
        184,
        242
      ]
    },
    "item_946": {
      "id": "item_946",
      "name": "粉黄礼盒（946）",
      "archetype": "gift",
      "colorGroup": "946",
      "img": "./assets/items/photos/item_946.webp",
      "revision": "ac50d7946d0c",
      "bounds": [
        8,
        18,
        184,
        246
      ]
    },
    "item_947": {
      "id": "item_947",
      "name": "紫金礼盒（947）",
      "archetype": "gift",
      "colorGroup": "947",
      "img": "./assets/items/photos/item_947.webp",
      "revision": "e0dd6ecce26e",
      "bounds": [
        12,
        16,
        175,
        248
      ]
    },
    "item_948": {
      "id": "item_948",
      "name": "彩虹礼盒（948）",
      "archetype": "gift",
      "colorGroup": "948",
      "img": "./assets/items/photos/item_948.webp",
      "revision": "53a3a9cf255f",
      "bounds": [
        13,
        16,
        173,
        248
      ]
    },
    "item_949": {
      "id": "item_949",
      "name": "彩虹礼盒（949）",
      "archetype": "gift",
      "colorGroup": "949",
      "img": "./assets/items/photos/item_949.webp",
      "revision": "f1b5a4f2b70b",
      "bounds": [
        8,
        19,
        184,
        245
      ]
    },
    "item_951": {
      "id": "item_951",
      "name": "蓝灰雪花袜子（951）",
      "archetype": "stocking",
      "colorGroup": "951",
      "img": "./assets/items/photos/item_951.webp",
      "revision": "c47bb16a28b5",
      "bounds": [
        19,
        16,
        162,
        248
      ]
    },
    "item_952": {
      "id": "item_952",
      "name": "粉色爱心袜子（952）",
      "archetype": "stocking",
      "colorGroup": "952",
      "img": "./assets/items/photos/item_952.webp",
      "revision": "52a510bf9a25",
      "bounds": [
        20,
        16,
        159,
        248
      ]
    },
    "item_953": {
      "id": "item_953",
      "name": "彩虹条纹袜子（953）",
      "archetype": "stocking",
      "colorGroup": "953",
      "img": "./assets/items/photos/item_953.webp",
      "revision": "0480b5020b1e",
      "bounds": [
        23,
        16,
        154,
        248
      ]
    },
    "item_954": {
      "id": "item_954",
      "name": "绿色圆点袜子（954）",
      "archetype": "stocking",
      "colorGroup": "954",
      "img": "./assets/items/photos/item_954.webp",
      "revision": "bac1f803f0cd",
      "bounds": [
        23,
        16,
        153,
        248
      ]
    },
    "item_955": {
      "id": "item_955",
      "name": "蓝紫条纹袜子（955）",
      "archetype": "stocking",
      "colorGroup": "955",
      "img": "./assets/items/photos/item_955.webp",
      "revision": "37fea7f40a49",
      "bounds": [
        24,
        16,
        152,
        248
      ]
    },
    "item_956": {
      "id": "item_956",
      "name": "深蓝星星双肩背包（956）",
      "archetype": "backpack",
      "colorGroup": "956",
      "img": "./assets/items/photos/item_956.webp",
      "revision": "a87ae7a9ae8f",
      "bounds": [
        11,
        16,
        178,
        248
      ]
    },
    "item_957": {
      "id": "item_957",
      "name": "橙色水果双肩背包（957）",
      "archetype": "backpack",
      "colorGroup": "957",
      "img": "./assets/items/photos/item_957.webp",
      "revision": "0921d374c403",
      "bounds": [
        11,
        16,
        177,
        248
      ]
    },
    "item_958": {
      "id": "item_958",
      "name": "奶黄色双肩背包（958）",
      "archetype": "backpack",
      "colorGroup": "958",
      "img": "./assets/items/photos/item_958.webp",
      "revision": "326b15ba47e4",
      "bounds": [
        9,
        16,
        182,
        248
      ]
    },
    "item_959": {
      "id": "item_959",
      "name": "浅蓝色双肩背包（959）",
      "archetype": "backpack",
      "colorGroup": "959",
      "img": "./assets/items/photos/item_959.webp",
      "revision": "c061c27d3d25",
      "bounds": [
        11,
        16,
        177,
        248
      ]
    },
    "item_960": {
      "id": "item_960",
      "name": "淡紫小猫双肩背包（960）",
      "archetype": "backpack",
      "colorGroup": "960",
      "img": "./assets/items/photos/item_960.webp",
      "revision": "c7f76426aca8",
      "bounds": [
        8,
        20,
        184,
        244
      ]
    },
    "item_961": {
      "id": "item_961",
      "name": "蓝色海浪汽水罐（961）",
      "archetype": "can",
      "colorGroup": "961",
      "img": "./assets/items/photos/item_961.webp",
      "revision": "55526a0fbe83",
      "bounds": [
        21,
        16,
        157,
        248
      ]
    },
    "item_982": {
      "id": "item_982",
      "name": "粉色草莓汽水罐（982）",
      "archetype": "can",
      "colorGroup": "982",
      "img": "./assets/items/photos/item_982.webp",
      "revision": "f73f38ef32ce",
      "bounds": [
        26,
        16,
        147,
        248
      ]
    },
    "item_983": {
      "id": "item_983",
      "name": "红色草莓汽水罐（983）",
      "archetype": "can",
      "colorGroup": "983",
      "img": "./assets/items/photos/item_983.webp",
      "revision": "8a62e48d6cb2",
      "bounds": [
        24,
        16,
        151,
        248
      ]
    },
    "item_985": {
      "id": "item_985",
      "name": "绿色青柠汽水罐（985）",
      "archetype": "can",
      "colorGroup": "985",
      "img": "./assets/items/photos/item_985.webp",
      "revision": "e564cdebf8a0",
      "bounds": [
        28,
        16,
        144,
        248
      ]
    },
    "item_986": {
      "id": "item_986",
      "name": "彩虹汽水罐（986）",
      "archetype": "can",
      "colorGroup": "986",
      "img": "./assets/items/photos/item_986.webp",
      "revision": "c40dba66ae19",
      "bounds": [
        27,
        16,
        146,
        248
      ]
    },
    "item_987": {
      "id": "item_987",
      "name": "蓝色星空汽水罐（987）",
      "archetype": "can",
      "colorGroup": "987",
      "img": "./assets/items/photos/item_987.webp",
      "revision": "f8f9c8310ede",
      "bounds": [
        28,
        16,
        144,
        248
      ]
    },
    "item_988": {
      "id": "item_988",
      "name": "橙子糖霜饼干（988）",
      "archetype": "cookie",
      "colorGroup": "988",
      "img": "./assets/items/photos/item_988.webp",
      "revision": "2cb2390ce25a",
      "bounds": [
        18,
        16,
        164,
        248
      ]
    },
    "item_989": {
      "id": "item_989",
      "name": "巧克力坚果饼干（989）",
      "archetype": "cookie",
      "colorGroup": "989",
      "img": "./assets/items/photos/item_989.webp",
      "revision": "b1e61704da2d",
      "bounds": [
        14,
        16,
        172,
        248
      ]
    },
    "item_990": {
      "id": "item_990",
      "name": "金黄夹心饼干（990）",
      "archetype": "cookie",
      "colorGroup": "990",
      "img": "./assets/items/photos/item_990.webp",
      "revision": "64bc517bb9eb",
      "bounds": [
        16,
        16,
        167,
        248
      ]
    },
    "item_991": {
      "id": "item_991",
      "name": "橙色波点手提包（991）",
      "archetype": "handbag",
      "colorGroup": "872",
      "img": "./assets/items/photos/item_991.webp",
      "revision": "88f0ad041560",
      "bounds": [
        16,
        16,
        167,
        248
      ]
    },
    "item_992": {
      "id": "item_992",
      "name": "红色波点手提包（992）",
      "archetype": "handbag",
      "colorGroup": "873",
      "img": "./assets/items/photos/item_992.webp",
      "revision": "a65f1c1d3a50",
      "bounds": [
        18,
        16,
        164,
        248
      ]
    },
    "item_993": {
      "id": "item_993",
      "name": "黄色闪电游戏机（993）",
      "archetype": "game_console",
      "colorGroup": "993",
      "img": "./assets/items/photos/item_993.webp",
      "revision": "0ef5829a1ad4",
      "bounds": [
        9,
        16,
        182,
        248
      ]
    },
    "item_994": {
      "id": "item_994",
      "name": "紫色月亮游戏机（994）",
      "archetype": "game_console",
      "colorGroup": "994",
      "img": "./assets/items/photos/item_994.webp",
      "revision": "7425733e51d0",
      "bounds": [
        11,
        16,
        177,
        248
      ]
    },
    "item_995": {
      "id": "item_995",
      "name": "蓝色星星游戏机（995）",
      "archetype": "game_console",
      "colorGroup": "995",
      "img": "./assets/items/photos/item_995.webp",
      "revision": "a8f9350329a3",
      "bounds": [
        8,
        18,
        184,
        246
      ]
    },
    "item_996": {
      "id": "item_996",
      "name": "绿色方块游戏机（996）",
      "archetype": "game_console",
      "colorGroup": "996",
      "img": "./assets/items/photos/item_996.webp",
      "revision": "544ef1817386",
      "bounds": [
        9,
        16,
        182,
        248
      ]
    },
    "item_997": {
      "id": "item_997",
      "name": "彩虹糖针饼干（997）",
      "archetype": "cookie",
      "colorGroup": "997",
      "img": "./assets/items/photos/item_997.webp",
      "revision": "b8610a7d77d1",
      "bounds": [
        13,
        16,
        173,
        248
      ]
    },
    "item_998": {
      "id": "item_998",
      "name": "坚果夹心饼干（998）",
      "archetype": "cookie",
      "colorGroup": "998",
      "img": "./assets/items/photos/item_998.webp",
      "revision": "6d5b24059005",
      "bounds": [
        15,
        16,
        170,
        248
      ]
    },
    "item_999": {
      "id": "item_999",
      "name": "蓝色糖霜饼干（999）",
      "archetype": "cookie",
      "colorGroup": "999",
      "img": "./assets/items/photos/item_999.webp",
      "revision": "fb3ae640b838",
      "bounds": [
        12,
        16,
        175,
        248
      ]
    }
  };

  // Each release uses its own asset URLs instead of displaying stale cached colours.
  Object.values(ITEMS).forEach(item => {
    item.img = `${item.img}?v=${item.revision || APP_VERSION}`;
  });
  function shuffleItems(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const other = Math.floor(Math.random() * (i + 1));
      [items[i], items[other]] = [items[other], items[i]];
    }
    return items;
  }

  // A catalog color group within an archetype identifies one visual variant.
  // Alternate crops can match even when their image URLs are different.
  function getItemMatchKey(key) {
    const item = ITEMS[key];
    return item?.colorGroup ? `${item.archetype}:${item.colorGroup}` : key;
  }

  function selectDistinguishableItemTypes(count) {
    const byArchetype = new Map();
    const seen = new Set();
    for (const item of shuffleItems(Object.values(ITEMS))) {
      const matchKey = getItemMatchKey(item.id);
      if (seen.has(matchKey)) continue;
      seen.add(matchKey);
      if (!byArchetype.has(item.archetype)) byArchetype.set(item.archetype, []);
      byArchetype.get(item.archetype).push(item.id);
    }

    const chosen = [];
    let variants = [...byArchetype.values()];
    while (chosen.length < count && variants.length > 0) {
      for (const group of shuffleItems(variants)) {
        chosen.push(group.pop());
        if (chosen.length === count) break;
      }
      variants = variants.filter(group => group.length > 0);
    }
    return chosen;
  }

  function hasRepeatedShelfGroups(slots) {
    const seen = new Set();
    for (const { layers } of slots) {
      for (const layer of layers) {
        if (layer.length < 2) continue;
        const group = layer.map(getItemMatchKey).sort().join('|');
        if (seen.has(group)) return true;
        seen.add(group);
      }
    }
    return false;
  }

  function itemImageMarkup(key, front = false, alt = ITEMS[key].name) {
    const item = ITEMS[key];
    const [left, top, width, height] = item.bounds || [0, 0, 200, 280];
    const fit = `--photo-w:${width};--photo-h:${height};--photo-cx:${left + width / 2};--photo-bottom:${top + height}`;
    const loading = front ? '' : ' loading="lazy" fetchpriority="low"';
    return `<img data-item-image src="${item.img}" alt="${alt}" width="200" height="280" decoding="async" style="${fit}"${loading} draggable="false">`;
  }

  // Capturing handles errors from dynamically inserted cabinet and drag images too.
  function setupImageRecovery() {
    const retries = new WeakMap();
    const failed = new Set();
    function retry(image) {
      const state = retries.get(image);
      if (!state || state.timer || state.attempts >= 2 || !image.isConnected) return;
      state.timer = setTimeout(() => {
        state.timer = null;
        if (!image.isConnected) { failed.delete(image); return; }
        state.attempts++;
        const url = new URL(state.source, document.baseURI);
        url.searchParams.set('_image_retry', state.attempts);
        image.loading = 'eager';
        image.src = url.href;
      }, 500 * (2 ** state.attempts));
    }
    document.addEventListener('error', event => {
      const image = event.target;
      if (image.tagName !== 'IMG' || !image.hasAttribute('data-item-image')) return;
      if (!retries.has(image)) retries.set(image, { source: image.src, attempts: 0, timer: null });
      failed.add(image);
      // Detached images should not be retained while moving between levels.
      for (const previous of failed) if (!previous.isConnected) failed.delete(previous);
      retry(image);
    }, true);
    document.addEventListener('load', event => {
      if (event.target.tagName === 'IMG') failed.delete(event.target);
    }, true);
    window.addEventListener('online', () => {
      for (const image of failed) {
        if (!image.isConnected) { failed.delete(image); continue; }
        retries.get(image).attempts = 0;
        retry(image);
      }
    });
  }

  // 2. Web Audio Synthesizer (Zero asset dependency, instant sound)
  class SoundSystem {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playPick() {
      if (this.muted) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.09);
    }

    playDrop() {
      if (this.muted) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.13);
    }

    playMatch() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const noteStart = now + idx * 0.07;
        osc.frequency.setValueAtTime(freq, noteStart);
        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(0.25, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 0.36);
      });
    }

    playHammer() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    }

    playWand() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = now + idx * 0.05;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.31);
      });
    }

    playFreeze() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = now + i * 0.08;
        osc.frequency.setValueAtTime(1400 + i * 220, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.41);
      }
    }

    playShuffle() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.31);
    }

    playWin() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const chords = [
        [523.25, 659.25, 783.99],
        [587.33, 739.99, 880.00],
        [659.25, 830.61, 987.77],
        [1046.50, 1318.51, 1567.98]
      ];
      chords.forEach((chord, step) => {
        const t = now + step * 0.18;
        chord.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.15, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + (step === 3 ? 0.8 : 0.25));
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + (step === 3 ? 0.85 : 0.28));
        });
      });
    }

    playLose() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const notes = [440, 392, 349.23, 293.66];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        const t = now + idx * 0.2;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.32);
      });
    }

    toggleMute() {
      this.muted = !this.muted;
      return this.muted;
    }
  }

  const sound = new SoundSystem();

  // 3. Particle System (Canvas FX)
  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.loop();
    }

    resize() {
      if (!this.canvas.parentElement) return;
      this.canvas.width = this.canvas.parentElement.clientWidth;
      this.canvas.height = this.canvas.parentElement.clientHeight;
    }

    emit(x, y, count = 24, type = 'star') {
      const colors = ['#dba537', '#cb7b36', '#b84532', '#498957', '#2c83a9', '#705195', '#ffffff'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          gravity: 0.18,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 15,
          type
        });
      }
    }

    loop() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.vRot;
        p.life -= p.decay;
        p.alpha = Math.max(0, p.life);

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;

        if (p.type === 'star') {
          this.drawStar(0, 0, 5, p.size, p.size / 2);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();
      }
      requestAnimationFrame(() => this.loop());
    }

    drawStar(cx, cy, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        this.ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        this.ctx.lineTo(x, y);
        rot += step;
      }
      this.ctx.lineTo(cx, cy - outerRadius);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  // 4. Solvability Verification Algorithm (支持多层深度的可解性校验器)
  function verifySolvability(cabinetData, conveyorRows) {
    // Clone board state with all layers
    const slots = [];
    cabinetData.forEach(c => slots.push({ layers: c.layers.map(l => [...l]) }));
    conveyorRows.forEach(row => {
      row.forEach(s => slots.push({ layers: s.layers.map(l => [...l]) }));
    });

    // Promotion helper inside verification
    const promoteSimSlot = (slot) => {
      if (slot.layers[0].length === 0 && slot.layers.slice(1).some(l => l.length > 0)) {
        while (slot.layers.length > 1 && slot.layers[0].length === 0 && slot.layers.slice(1).some(l => l.length > 0)) {
          slot.layers.shift();
          slot.layers.push([]);
        }
      }
    };

    // Simulate legal front moves and clear any completed triplets.
    let maxSteps = 300;
    while (maxSteps-- > 0) {
      const complete = slots.find(({ layers: [front] }) =>
        front.length === 3 && front.every(item => getItemMatchKey(item) === getItemMatchKey(front[0])));
      if (complete) {
        complete.layers[0] = [];
        promoteSimSlot(complete);
        continue;
      }

      const counts = new Map();
      slots.forEach(slot => {
        slot.layers[0].forEach(item => {
          const k = getItemMatchKey(item);
          counts.set(k, (counts.get(k) || 0) + 1);
        });
      });

      const empty = slots.find(slot => slot.layers[0].length === 0);
      const partial = slots.find(({ layers: [front] }) => {
        const key = getItemMatchKey(front[0]);
        return front.length > 0 && counts.get(key) >= 3 && front.every(item => getItemMatchKey(item) === key);
      });
      const matchKey = partial ? getItemMatchKey(partial.layers[0][0]) : [...counts.keys()].find(key => counts.get(key) >= 3);
      const destination = partial || empty;
      if (destination && matchKey) {
        for (const source of slots) {
          if (source === destination) continue;
          const front = source.layers[0];
          for (let i = front.length - 1; i >= 0 && destination.layers[0].length < 3; i--) {
            if (getItemMatchKey(front[i]) !== matchKey) continue;
            destination.layers[0].push(front.splice(i, 1)[0]);
            promoteSimSlot(source);
          }
        }
        continue;
      }

      // 2. If no direct 3-match in front, check if emptying a slot to reveal deeper items helps
      let movedToReveal = false;
      const candidateSlots = slots.filter(s => s.layers[0].length > 0 && s.layers.slice(1).some(l => l.length > 0));
      candidateSlots.sort((a, b) => a.layers[0].length - b.layers[0].length);

      for (const cand of candidateSlots) {
        const toMove = cand.layers[0].length;
        const available = slots.filter(s => s !== cand && s.layers[0].length < 3);
        const totalAvail = available.reduce((acc, s) => acc + (3 - s.layers[0].length), 0);
        if (totalAvail >= toMove) {
          while (cand.layers[0].length > 0) {
            const item = cand.layers[0].pop();
            const target = slots.find(s => s !== cand && s.layers[0].length < 3);
            if (target) target.layers[0].push(item);
          }
          promoteSimSlot(cand);
          movedToReveal = true;
          break;
        }
      }

      if (movedToReveal) continue;

      // 3. Check if all items cleared
      const remainingItems = slots.reduce((acc, s) => acc + s.layers.reduce((lacc, l) => lacc + l.length, 0), 0);
      if (remainingItems === 0) {
        return true; // 100% Solvable!
      }

      // No more moves possible
      break;
    }

    const totalRemaining = slots.reduce((acc, s) => acc + s.layers.reduce((lacc, l) => lacc + l.length, 0), 0);
    return totalRemaining === 0;
  }

  const DIFFICULTIES = {
    1: { label: '轻松', tiers: [11, 7], buffers: [2, 4, 6], time: null, speed: 0.65,
      tools: { hammer: 10, wand: 12, freeze: 0, shuffle: Infinity } },
    2: { label: '标准', tiers: [14, 12, 11, 9], buffers: [2, 6], time: 988, speed: 1,
      tools: { hammer: 5, wand: 8, freeze: 4, shuffle: Infinity } },
    3: { label: '大师', tiers: [17, 15, 13, 11, 9, 7], buffers: [2], time: 600, speed: 1.45,
      tools: { hammer: 1, wand: 2, freeze: 1, shuffle: 2 } }
  };

  function countExposedTriplets(slots) {
    const counts = new Map();
    for (const { layers: [front] } of slots) {
      for (const item of front) counts.set(item, (counts.get(item) || 0) + 1);
    }
    return [...counts.values()].filter(count => count === 3).length;
  }

  // 5. Main Game Controller
  class GoodsOrganizerGame {
    constructor() {
      this.score = 0;
      this.timerInterval = null;
      this.isFrozen = false;
      this.freezeTimeout = null;
      this.isPaused = false;
      this.hammerMode = false;

      this.cabinetData = [];
      this.conveyorRows = [];
      this.conveyorSpeeds = [-0.35, 0.42, -0.32]; // Smooth horizontal drift speeds
      this.conveyorMetrics = null;

      this.selectedItemInfo = null;
      this.dragState = null;

      this.initDOM();
      this.updateLayoutMetrics();
      this.particles = new ParticleSystem(document.getElementById('fx-canvas'));
      this.startRound(2);
      this.startConveyors();
      this.bindEvents();
    }

    initDOM() {
      this.timerEl = document.getElementById('timer-text');
      this.scoreEl = document.getElementById('score-value');
      this.cabinetEl = document.getElementById('cabinet-grid');
      this.conveyorSectionEl = document.getElementById('conveyor-section');
      this.hammerBanner = document.getElementById('hammer-banner');
      this.freezeOverlay = document.getElementById('freeze-overlay');
      this.dragGhost = document.getElementById('drag-ghost');

      this.difficultyDialog = document.getElementById('difficulty-dialog');
    }

    startRound(levelNumber) {
      const difficulty = DIFFICULTIES[levelNumber];
      clearTimeout(this.freezeTimeout);
      this.isFrozen = false;
      this.freezeOverlay.classList.remove('active');
      this.timerEl.style.removeProperty('color');
      this.deactivateHammer();
      this.propCounts = { ...difficulty.tools };
      for (const tool of Object.keys(this.propCounts)) this.updateToolCount(tool);

      this.timerSeconds = difficulty.time;
      this.updateTimerDisplay();
      document.getElementById('level-mode-tag').textContent = difficulty.label;
      document.getElementById('btn-revive').hidden = levelNumber !== 2;
      this.initLevelWithVerification(levelNumber);
      this.startTimer();
    }

    updateToolCount(tool) {
      const count = this.propCounts[tool];
      document.getElementById(`count-${tool}`).textContent = count === Infinity ? '∞' : count;
      document.getElementById(`btn-tool-${tool}`).setAttribute('aria-disabled', count === 0);
    }

    // Dynamically calculate and apply responsive metrics for mobile, iPad, and desktop
    updateLayoutMetrics() {
      const container = document.getElementById('game-container');
      if (!container) return;

      const containerWidth = container.clientWidth;
      const trackEl = document.querySelector('.conveyor-track') || this.conveyorSectionEl;
      const trackWidth = trackEl ? trackEl.clientWidth : containerWidth;

      // 1. Calculate compartment and plank width
      // In the cabinet (3 columns, padding 2.3% left/right, column-gap 2.3%)
      // Net grid width = containerWidth * (1 - 2 * 0.023 - 2 * 0.023) = containerWidth * 0.908
      const cabinetWrapper = document.querySelector('.cabinet-wrapper');
      const actualCabinetWidth = cabinetWrapper ? cabinetWrapper.clientWidth : containerWidth;
      const compWidth = Math.round((actualCabinetWidth * 0.908) / 3);

      // Cabinet, conveyor and ghost use one box, constrained by both lane
      // width and available height. The plank fits exactly three item positions,
      // including their 1px overlap and the 2px wooden edge on each side.
      const compartment = document.querySelector('.compartment');
      const cellHeight = compartment ? compartment.clientHeight : cabinetWrapper
        ? (cabinetWrapper.clientHeight * 0.934 - actualCabinetWidth * 0.061) / 3 : 104;
      const cabinetHeight = Math.max(12, cellHeight - 8);
      // Use the section budget so a previous narrow-screen row cap does not
      // prevent the items growing again when the screen gets wider.
      const rowHeight = Math.max(24, (this.conveyorSectionEl.clientHeight - 6) / 3);
      const woodAspect = 23 / 228;
      const itemWidth = Math.max(12, Math.floor((compWidth - 4) / 3));
      const plankWidth = itemWidth * 3 - 2 + 4;
      // Fit actual subject bounds into a taller shared position, without the
      // transparent photo margins reducing the visible object size.
      const itemHeight = Math.max(12, Math.min(itemWidth * 1.85, cabinetHeight, rowHeight - plankWidth * woodAspect - 8));
      const plankGap = Math.max(6, Math.round(plankWidth * 0.05));

      // Four shelves still wrap beyond the visible track after narrowing them.
      const minPitchForLoop = Math.ceil((trackWidth + 8) / 3);
      const pitch = Math.max(plankWidth + plankGap, minPitchForLoop);
      const totalSpan = 4 * pitch;

      // Set CSS variables on container
      container.style.setProperty('--item-w', `${itemWidth}px`);
      container.style.setProperty('--item-h', `${itemHeight}px`);
      container.style.setProperty('--plank-w', `${plankWidth}px`);
      // The ghost is a child of body, so it does not inherit container variables.
      this.dragGhost.style.width = `${itemWidth}px`;
      this.dragGhost.style.height = `${itemHeight}px`;
      this.dragGhost.style.setProperty('--item-w', `${itemWidth}px`);
      this.dragGhost.style.setProperty('--item-h', `${itemHeight}px`);

      const oldPitch = this.conveyorMetrics ? this.conveyorMetrics.pitch : pitch;
      this.conveyorMetrics = {
        trackWidth,
        plankWidth,
        plankGap,
        pitch,
        totalSpan
      };

      // Rescale existing shelf positions if layout changed
      if (oldPitch && oldPitch !== pitch && this.conveyorRows && this.conveyorRows.length > 0) {
        const ratio = pitch / oldPitch;
        this.conveyorRows.forEach(row => {
          row.forEach(shelf => {
            shelf.xPos *= ratio;
          });
        });
      }
    }

    initLevelWithVerification(levelNumber) {
      let attempts = 0;
      let valid = false;
      const maxRandomDeals = levelNumber === 2 ? 15 : 0;

      while (!valid && attempts < maxRandomDeals) {
        attempts++;
        this.generateLevelData(levelNumber);
        valid = !hasRepeatedShelfGroups(this.getBoardSlots()) &&
          verifySolvability(this.cabinetData, this.conveyorRows);
      }

      if (!valid) {
        this.generateLevelData(levelNumber, true);
        if (levelNumber === 3) this.mixMasterLayers();
        valid = !hasRepeatedShelfGroups(this.getBoardSlots()) &&
          verifySolvability(this.cabinetData, this.conveyorRows);
        if (!valid) throw new Error('Could not generate a solvable board');
      }

      console.log(`[Level Generator] Level ${levelNumber} verified after ${attempts} random deals`);
      const verifyBadge = document.getElementById('verify-badge');
      if (verifyBadge) {
        verifyBadge.textContent = '可解性校验：已通过 ✔';
        verifyBadge.style.color = '#446b45';
      }

      this.renderBoard();
    }

    mixMasterLayers() {
      const slots = this.getBoardSlots();
      let exposed = countExposedTriplets(slots);
      // Bury some of the opening matches. Keep each swap only if the full
      // board still has a solution and the shelf combinations stay distinct.
      for (const { layers } of shuffleItems([...slots])) {
        if (exposed <= 6) break;
        const [front, back] = layers;
        if (!back.length) continue;
        for (const frontIndex of shuffleItems(front.map((_, index) => index))) {
          const backIndex = Math.floor(Math.random() * back.length);
          [front[frontIndex], back[backIndex]] = [back[backIndex], front[frontIndex]];
          const nextExposed = countExposedTriplets(slots);
          if (nextExposed < exposed && !hasRepeatedShelfGroups(slots) &&
              verifySolvability(this.cabinetData, this.conveyorRows)) {
            exposed = nextExposed;
            break;
          }
          [front[frontIndex], back[backIndex]] = [back[backIndex], front[frontIndex]];
        }
      }
    }

    // Helper to promote deeper layers when layer 0 is completely empty
    promoteSlot(slotData) {
      if (!slotData || !slotData.layers) return false;
      if (slotData.layers[0].length === 0 && slotData.layers.slice(1).some(l => l.length > 0)) {
        while (slotData.layers.length > 1 && slotData.layers[0].length === 0 && slotData.layers.slice(1).some(l => l.length > 0)) {
          slotData.layers.shift();
          slotData.layers.push([]);
        }
        if (slotData.layers[0].length > 0) {
          sound.playPick();
          return true;
        }
      }
      return false;
    }

    generateLevelData(levelNumber, useGuaranteedDeal = false) {
      this.currentLevel = levelNumber;
      this.selectedItemInfo = null;
      const { tiers, buffers } = DIFFICULTIES[levelNumber];
      const totalTriplets = tiers.reduce((sum, count) => sum + count, 0);
      const chosenTypes = selectDistinguishableItemTypes(totalTriplets);
      const makeLayers = () => tiers.map(() => []);

      // Setup 3x3 Upper Cabinet: 9 cubbies, each with 4 layers
      this.cabinetData = [];
      for (let i = 0; i < 9; i++) {
        this.cabinetData.push({
          id: `cabinet-${i}`,
          layers: makeLayers()
        });
      }

      // Setup 3 Conveyor Rows: 4 planks per row = 12 planks total, each with 4 layers
      if (!this.conveyorMetrics) {
        this.updateLayoutMetrics();
      }
      const pitch = this.conveyorMetrics ? this.conveyorMetrics.pitch : 146;

      this.conveyorRows = [];
      for (let r = 0; r < 3; r++) {
        const shelves = [];
        const speed = this.conveyorSpeeds[r];
        for (let s = 0; s < 4; s++) {
          let initX = s * pitch;
          if (speed > 0) {
            initX = (s - 1) * pitch;
          }
          shelves.push({
            id: `conveyor-${r}-${s}`,
            rowIndex: r,
            shelfIndex: s,
            layers: makeLayers(),
            xPos: initX
          });
        }
        this.conveyorRows.push(shelves);
      }

      const slots = [
        ...this.conveyorRows.flat(),
        ...this.cabinetData.filter((_, index) => !buffers.includes(index))
      ];
      if (useGuaranteedDeal) {
        let nextType = 0;
        for (const [depth, count] of tiers.entries()) {
          const order = shuffleItems([...slots]);
          const starts = shuffleItems(slots.map((_, index) => index));
          for (const start of starts.slice(0, count)) {
            const type = chosenTypes[nextType++];
            // Offsets 0, 1 and 4 have distinct differences. Two types can
            // therefore share only one shelf, keeping combinations distinct.
            for (const offset of [0, 1, 4]) {
              order[(start + offset) % slots.length].layers[depth].push(type);
            }
          }
        }

        for (const slot of slots) {
          // Expose the first occupied layer, leaving the buffer cabinets
          // available to clear exposed triplets in tier order.
          slot.layers = slot.layers.filter(layer => layer.length > 0).map(shuffleItems);
          while (slot.layers.length < tiers.length) slot.layers.push([]);
        }
        return;
      }

      const itemPool = shuffleItems(chosenTypes.flatMap(type => [type, type, type]));
      for (const [depth, triplets] of tiers.entries()) {
        const layerTotal = triplets * 3;
        const base = Math.floor(layerTotal / slots.length);
        const extras = layerTotal % slots.length;
        shuffleItems([...slots]).forEach((slot, index) => {
          const count = base + Number(index < extras);
          slot.layers[depth] = itemPool.splice(itemPool.length - count, count);
        });
      }
    }

    renderBoard() {
      this.initBoardDOM();
      this.updateLayoutMetrics();
      this.updateAllSlots();
      this.checkMatches();
      this.checkGameWinOrLoss();
      this.cacheCurrentLevel();
    }

    cacheCurrentLevel() {
      if (!('serviceWorker' in navigator)) return;
      const slots = [...this.cabinetData, ...this.conveyorRows.flat()];
      const keys = new Set(slots.flatMap(slot => slot.layers.flat()));
      const urls = [...keys].filter(key => ITEMS[key]).map(key => ITEMS[key].img);
      navigator.serviceWorker.ready.then(registration => {
        const signature = [...urls].sort().join('|');
        if (this.cachedLevelSignature === signature && this.levelCacheWorker === registration.active) return;
        if (registration.active) {
          this.cachedLevelSignature = signature;
          this.levelCacheWorker = registration.active;
          registration.active.postMessage({ type: 'CACHE_LEVEL', urls });
        }
      }).catch(() => {});
    }

    // Initialize persistent DOM elements once (avoids destroying conveyor animations and tracks!)
    initBoardDOM() {
      // 1. Setup 9 Upper Cabinet Compartments
      this.cabinetEl.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const compDiv = document.createElement('div');
        compDiv.className = 'compartment';
        compDiv.dataset.type = 'cabinet';
        compDiv.dataset.index = i;

        const lane = document.createElement('div');
        lane.className = 'slot-lane';
        compDiv.appendChild(lane);
        this.cabinetEl.appendChild(compDiv);
      }

      // 2. Setup 3 Conveyor Track Rows with 4 Planks each
      this.conveyorSectionEl.innerHTML = '';
      this.conveyorRows.forEach((row, rowIdx) => {
        const rowWrapper = document.createElement('div');
        rowWrapper.className = 'conveyor-row-wrapper';
        rowWrapper.id = `conveyor-row-${rowIdx}`;

        const track = document.createElement('div');
        track.className = 'conveyor-track';
        track.id = `conveyor-track-${rowIdx}`;

        row.forEach((shelf, shelfIdx) => {
          const plank = document.createElement('div');
          plank.className = 'shelf-plank';
          plank.dataset.type = 'conveyor';
          plank.dataset.rowIndex = rowIdx;
          plank.dataset.shelfIndex = shelfIdx;
          plank.style.transform = `translateX(${shelf.xPos}px)`;

          const lane = document.createElement('div');
          lane.className = 'slot-lane';
          plank.appendChild(lane);
          track.appendChild(plank);
        });

        rowWrapper.appendChild(track);
        this.conveyorSectionEl.appendChild(rowWrapper);
      });
    }

    // Render items inside a specific slot-lane without touching the rest of the board
    renderLane(laneEl, layers, type, slotIdx, shelfIdx = 0) {
      laneEl.innerHTML = '';
      const frontItems = layers[0] || [];
      const backItems = layers[1] || [];
      const deepItems = layers[2] || [];

      for (let pos = 0; pos < 3; pos++) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'item-layer-container';

        // Deepest 3rd layer: subtle silhouette in background
        if (deepItems[pos]) {
          const deepKey = deepItems[pos];
          const deepItemEl = document.createElement('div');
          deepItemEl.className = 'good-item layer-deep';
          deepItemEl.innerHTML = itemImageMarkup(deepKey, false, '');
          itemContainer.appendChild(deepItemEl);
        }

        // Back layer: reduced saturation, retaining the original colour.
        if (backItems[pos]) {
          const backKey = backItems[pos];
          const backItemEl = document.createElement('div');
          backItemEl.className = 'good-item layer-back';
          backItemEl.title = ITEMS[backKey].name;
          backItemEl.innerHTML = itemImageMarkup(backKey);
          itemContainer.appendChild(backItemEl);
        }

        // Front layer: Interactive item
        if (frontItems[pos]) {
          const frontKey = frontItems[pos];
          const frontItemEl = document.createElement('div');
          frontItemEl.className = 'good-item layer-front entering';
          frontItemEl.addEventListener('animationend', () => {
            frontItemEl.classList.remove('entering');
          }, { once: true });
          frontItemEl.dataset.itemKey = frontKey;
          frontItemEl.dataset.type = type;
          frontItemEl.dataset.slotIndex = slotIdx;
          frontItemEl.dataset.rowIndex = slotIdx;
          frontItemEl.dataset.shelfIndex = shelfIdx;
          frontItemEl.dataset.itemIndex = pos;
          frontItemEl.title = ITEMS[frontKey].name;
          frontItemEl.innerHTML = itemImageMarkup(frontKey, true);

          if (this.selectedItemInfo &&
              this.selectedItemInfo.locationType === type &&
              (type === 'cabinet' ? this.selectedItemInfo.slotIndex === slotIdx :
                (this.selectedItemInfo.rowIndex === slotIdx && this.selectedItemInfo.shelfIndex === shelfIdx)) &&
              this.selectedItemInfo.itemIndex === pos) {
            frontItemEl.classList.add('selected');
          }

          itemContainer.appendChild(frontItemEl);
        } else {
          // Empty slot indicator
          const emptySlot = document.createElement('div');
          emptySlot.className = 'empty-slot-indicator';
          emptySlot.textContent = '+';
          itemContainer.appendChild(emptySlot);
        }

        laneEl.appendChild(itemContainer);
      }
    }

    // Granular update: update only one compartment
    updateCompartment(compIdx) {
      const slotData = this.cabinetData[compIdx];
      if (slotData?.animating) return;
      const compDiv = this.cabinetEl.children[compIdx];
      if (!compDiv) return;
      const lane = compDiv.querySelector('.slot-lane');
      if (!lane) return;
      this.renderLane(lane, slotData.layers, 'cabinet', compIdx);

    }

    // Granular update: update only one conveyor shelf plank
    updateShelf(rowIdx, shelfIdx) {
      const slotData = this.conveyorRows[rowIdx][shelfIdx];
      if (slotData.animating) return;
      const track = document.getElementById(`conveyor-track-${rowIdx}`);
      if (!track) return;
      const plank = track.children[shelfIdx];
      if (!plank) return;
      const lane = plank.querySelector('.slot-lane');
      if (!lane) return;
      this.renderLane(lane, slotData.layers, 'conveyor', rowIdx, shelfIdx);

    }

    // Granular update for any slot location
    updateLocation(loc) {
      if (!loc) return;
      if (loc.type === 'cabinet') {
        this.updateCompartment(loc.slotIndex);
      } else {
        this.updateShelf(loc.rowIndex, loc.shelfIndex);
      }
    }

    getSlotData({ type, slotIndex, rowIndex, shelfIndex }) {
      return type === 'cabinet' ? this.cabinetData[slotIndex] : this.conveyorRows[rowIndex]?.[shelfIndex];
    }

    getBoardSlots() {
      return [...this.cabinetData, ...this.conveyorRows.flat()];
    }

    // Update all slots across cabinet and conveyors without destroying DOM nodes
    updateAllSlots() {
      for (let i = 0; i < 9; i++) {
        this.updateCompartment(i);
      }
      this.conveyorRows.forEach((row, rIdx) => {
        row.forEach((_, sIdx) => {
          this.updateShelf(rIdx, sIdx);
        });
      });
    }

    // Auto-scroll horizontal conveyor animation (Seamless cyclic 4-shelf train)
    startConveyors() {
      let previousFrame;
      const animate = (now) => {
        const elapsed = previousFrame === undefined ? 0 : Math.min(now - previousFrame, 50);
        previousFrame = now;
        if (!this.isPaused && !this.isFrozen && !this.difficultyDialog?.open) {
          const pitch = this.conveyorMetrics ? this.conveyorMetrics.pitch : 146;
          const totalSpan = this.conveyorMetrics ? this.conveyorMetrics.totalSpan : (4 * pitch);

          this.conveyorRows.forEach((row, rowIdx) => {
            const track = document.getElementById(`conveyor-track-${rowIdx}`);
            if (!track) return;

            const speed = this.conveyorSpeeds[rowIdx] * DIFFICULTIES[this.currentLevel].speed;

            row.forEach(shelf => {
              shelf.xPos += speed * elapsed / (1000 / 60);

              if (speed < 0) {
                // Moving left: when shelf goes completely off-screen to the left
                if (shelf.xPos < -pitch) {
                  shelf.xPos += totalSpan;
                }
              } else {
                // Moving right: when shelf goes past the right boundary
                if (shelf.xPos > totalSpan - pitch) {
                  shelf.xPos -= totalSpan;
                }
              }
            });

            const plankEls = track.children;
            for (let i = 0; i < plankEls.length; i++) {
              const plank = plankEls[i];
              const shelf = row[i];
              if (plank && shelf) {
                plank.style.transform = `translateX(${shelf.xPos}px)`;
              }
            }
          });
        }
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }

    startTimer() {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      if (this.timerSeconds === null) return;
      this.timerInterval = setInterval(() => {
        if (this.isPaused || this.isFrozen || this.difficultyDialog?.open) return;
        this.timerSeconds--;
        this.updateTimerDisplay();
        if (this.timerSeconds <= 0) {
          clearInterval(this.timerInterval);
          this.handleGameOver('时间已耗尽！');
        }
      }, 1000);
    }

    updateTimerDisplay() {
      if (this.timerSeconds === null) {
        this.timerEl.textContent = '不限时';
        return;
      }
      const mins = Math.floor(Math.max(0, this.timerSeconds) / 60);
      const secs = Math.max(0, this.timerSeconds) % 60;
      this.timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    checkMatches() {
      let matchedAny = false;

      // 1. Check Cabinet Compartments
      this.cabinetData.forEach((comp, idx) => {
        if (comp.animating) return;
        const front = comp.layers[0];
        if (front.length === 3) {
          const m0 = getItemMatchKey(front[0]);
          const m1 = getItemMatchKey(front[1]);
          const m2 = getItemMatchKey(front[2]);
          if (m0 === m1 && m1 === m2) {
            matchedAny = true;
            this.triggerMatchElimination('cabinet', idx, null);
          }
        }
      });

      // 2. Check Conveyor Shelves
      this.conveyorRows.forEach((row, rIdx) => {
        row.forEach((shelf, sIdx) => {
          if (shelf.animating) return;
          const front = shelf.layers[0];
          if (front.length === 3) {
            const m0 = getItemMatchKey(front[0]);
            const m1 = getItemMatchKey(front[1]);
            const m2 = getItemMatchKey(front[2]);
            if (m0 === m1 && m1 === m2) {
              matchedAny = true;
              this.triggerMatchElimination('conveyor', rIdx, sIdx);
            }
          }
        });
      });

      return matchedAny;
    }

    triggerMatchElimination(type, idx1, idx2) {
      const location = { type, slotIndex: idx1, rowIndex: idx1, shelfIndex: idx2 };
      const targetData = this.getSlotData(location);
      if (targetData.animating) return;
      targetData.animating = true;

      sound.playMatch();
      this.score += 100;
      this.scoreEl.textContent = this.score;

      const targetEl = type === 'cabinet' ? this.cabinetEl.children[idx1] :
        document.getElementById(`conveyor-track-${idx1}`)?.children[idx2];

      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const parentRect = document.getElementById('game-container').getBoundingClientRect();
        const fxX = rect.left - parentRect.left + rect.width / 2;
        const fxY = rect.top - parentRect.top + rect.height / 2;

        this.particles.emit(fxX, fxY, 30, 'star');

        const scoreFloat = document.createElement('div');
        scoreFloat.className = 'score-float';
        scoreFloat.textContent = '+100 消除!';
        scoreFloat.style.left = `${fxX - 45}px`;
        scoreFloat.style.top = `${fxY - 20}px`;
        document.getElementById('game-container').appendChild(scoreFloat);
        setTimeout(() => scoreFloat.remove(), 800);

        const frontItems = targetEl.querySelectorAll('.good-item.layer-front');
        frontItems.forEach(el => el.classList.add('matching'));
      }

      setTimeout(() => {
        if (this.getSlotData(location) !== targetData) return;
        targetData.layers[0] = [];
        targetData.animating = false;
        this.promoteSlot(targetData);
        this.updateLocation(location);
        this.checkMatches();
        this.checkGameWinOrLoss();
      }, 320);
    }

    moveItem(fromLocation, toLocation) {
      const sourceSlotData = this.getSlotData(fromLocation);
      const targetSlotData = this.getSlotData(toLocation);
      if (!sourceSlotData || sourceSlotData.animating || !targetSlotData || targetSlotData.animating) return false;
      if (fromLocation.slot && fromLocation.slot !== sourceSlotData) return false;

      const sourceArray = sourceSlotData.layers[0];
      const targetArray = targetSlotData.layers[0];
      if (fromLocation.itemKey && sourceArray[fromLocation.itemIndex] !== fromLocation.itemKey) return false;

      if (sourceArray === targetArray) {
        const fromIndex = fromLocation.itemIndex;
        const toIndex = toLocation.itemIndex;
        if (!Number.isInteger(fromIndex) || !Number.isInteger(toIndex) ||
            fromIndex === toIndex || !sourceArray[fromIndex] || !sourceArray[toIndex]) return false;

        [sourceArray[fromIndex], sourceArray[toIndex]] = [sourceArray[toIndex], sourceArray[fromIndex]];
        sound.playDrop();
        this.selectedItemInfo = null;
        document.querySelectorAll('.good-item.selected').forEach(el => el.classList.remove('selected'));
        this.updateLocation(fromLocation);
        return true;
      }

      if (targetArray.length >= 3) {
        sound.playDrop();
        return false;
      }

      const item = sourceArray.splice(fromLocation.itemIndex, 1)[0];
      if (!item) return false;

      targetArray.push(item);
      sound.playDrop();

      this.promoteSlot(sourceSlotData);

      // Clear selection without rebuilding DOM
      this.selectedItemInfo = null;
      document.querySelectorAll('.good-item.selected').forEach(el => el.classList.remove('selected'));

      // Granular update ONLY the two affected slots!
      this.updateLocation(fromLocation);
      this.updateLocation(toLocation);

      this.checkMatches();
      this.checkGameWinOrLoss();
      return true;
    }

    bindEvents() {
      const container = document.getElementById('game-container');

      let activePointerId = null;
      let startPointerPos = { x: 0, y: 0 };
      let isDragging = false;
      let draggedItemData = null;
      let draggedItemEl = null;
      let isSettlingDrag = false;

      const isSameLocation = (from, to) => from && to && from.type === to.type &&
        (from.type === 'cabinet' ? from.slotIndex === to.slotIndex :
          from.rowIndex === to.rowIndex && from.shelfIndex === to.shelfIndex);

      const resetPointer = () => {
        activePointerId = null;
        isDragging = false;
        draggedItemData = null;
        draggedItemEl = null;
      };

      const restoreDragVisuals = (sourceEl) => {
        this.dragGhost.style.display = 'none';
        this.dragGhost.style.transition = 'none';
        this.dragGhost.style.transform = 'translate(-50%, -50%)';
        if (sourceEl) sourceEl.style.removeProperty('visibility');
      };

      const settleDrag = (callback, delay) => {
        // Keep a later gesture from reusing the ghost while this one settles.
        isSettlingDrag = true;
        setTimeout(() => {
          try {
            callback();
          } finally {
            isSettlingDrag = false;
          }
        }, delay);
      };

      const clearSnapHighlights = () => {
        document.querySelectorAll('.drop-target-snap, .drop-target-valid, .drop-target-invalid').forEach(el => {
          el.classList.remove('drop-target-snap', 'drop-target-valid', 'drop-target-invalid');
        });
      };

      const findBestSnapTarget = (clientX, clientY) => {
        const candidates = [];

        // 1. Cabinet Compartments
        this.cabinetData.forEach((comp, idx) => {
          const el = this.cabinetEl.children[idx];
          if (!el) return;
          const count = comp.layers[0].length;
          candidates.push({
            el,
            type: 'cabinet',
            slotIndex: idx,
            rowIndex: idx,
            shelfIndex: 0,
            canPlace: !comp.animating && (count < 3 || isSameLocation(draggedItemData, { type: 'cabinet', slotIndex: idx })),
            rect: el.getBoundingClientRect()
          });
        });

        // 2. Conveyor Planks
        this.conveyorRows.forEach((row, rIdx) => {
          const track = document.getElementById(`conveyor-track-${rIdx}`);
          if (!track) return;
          const trackRect = track.getBoundingClientRect();
          row.forEach((shelf, sIdx) => {
            const el = track.children[sIdx];
            if (!el) return;
            const bounds = el.getBoundingClientRect();
            const rect = {
              left: Math.max(bounds.left, trackRect.left),
              right: Math.min(bounds.right, trackRect.right),
              top: Math.max(bounds.top, trackRect.top),
              bottom: Math.min(bounds.bottom, trackRect.bottom)
            };
            if (rect.left >= rect.right || rect.top >= rect.bottom) return;
            const count = shelf.layers[0].length;
            candidates.push({
              el,
              type: 'conveyor',
              slotIndex: rIdx,
              rowIndex: rIdx,
              shelfIndex: sIdx,
              canPlace: !shelf.animating && (count < 3 || isSameLocation(draggedItemData, { type: 'conveyor', rowIndex: rIdx, shelfIndex: sIdx })),
              rect
            });
          });
        });

        let bestTarget = null;
        let blockedTarget = null;
        let minDistance = Infinity;
        const SNAP_RADIUS = Math.max(60, Math.round((this.conveyorMetrics?.plankWidth || 142) * 0.45)); // Auto-snap magnetic suction radius

        for (const cand of candidates) {
          const r = cand.rect;
          const dx = Math.max(r.left - clientX, 0, clientX - r.right);
          const dy = Math.max(r.top - clientY, 0, clientY - r.bottom);
          const dist = Math.hypot(dx, dy);

          if (dist === 0) {
            // Direct hit inside shelf boundary
            if (cand.canPlace) {
              return { ...cand, dist: 0, directHit: true };
            } else {
              blockedTarget = { ...cand, dist: 0, directHit: true };
            }
          } else if (cand.canPlace && dist <= SNAP_RADIUS && dist < minDistance) {
            minDistance = dist;
            bestTarget = { ...cand, dist, directHit: false };
          }
        }

        return blockedTarget || bestTarget;
      };

      const findSwapItem = (snap, clientX, clientY) => {
        if (!isSameLocation(draggedItemData, snap)) return null;
        let closestItem = null;
        let minDistance = Infinity;
        snap.el.querySelectorAll('.good-item.layer-front').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return;
          const distance = Math.hypot(clientX - rect.left - rect.width / 2, clientY - rect.top - rect.height / 2);
          if (distance < minDistance) {
            closestItem = el;
            minDistance = distance;
          }
        });
        return closestItem;
      };

      const handleItemTap = (itemData) => {
        if (this.getSlotData(itemData) !== itemData.slot || itemData.slot.animating ||
            itemData.slot.layers[0][itemData.itemIndex] !== itemData.itemKey) return;

        // 1. If clicking on already selected item, deselect it
        if (this.selectedItemInfo &&
            this.selectedItemInfo.locationType === itemData.type &&
            this.selectedItemInfo.slotIndex === itemData.slotIndex &&
            this.selectedItemInfo.shelfIndex === itemData.shelfIndex &&
            this.selectedItemInfo.itemIndex === itemData.itemIndex) {
          this.selectedItemInfo = null;
          document.querySelectorAll('.good-item.selected').forEach(el => el.classList.remove('selected'));
          sound.playPick();
          return;
        }

        // 2. If an item is already selected, try moving it to this slot!
        if (this.selectedItemInfo) {
          const moved = this.moveItem(
            {
              type: this.selectedItemInfo.locationType,
              slotIndex: this.selectedItemInfo.slotIndex,
              rowIndex: this.selectedItemInfo.rowIndex,
              shelfIndex: this.selectedItemInfo.shelfIndex,
              itemIndex: this.selectedItemInfo.itemIndex,
              itemKey: this.selectedItemInfo.itemKey
            },
            {
              type: itemData.type,
              slotIndex: itemData.slotIndex,
              rowIndex: itemData.rowIndex,
              shelfIndex: itemData.shelfIndex,
              itemIndex: itemData.itemIndex
            }
          );
          if (moved) return;
        }

        // 3. Select this item directly
        this.selectedItemInfo = {
          locationType: itemData.type,
          slotIndex: itemData.slotIndex,
          rowIndex: itemData.rowIndex,
          shelfIndex: itemData.shelfIndex,
          itemIndex: itemData.itemIndex,
          itemKey: itemData.itemKey
        };
        sound.playPick();

        // Update selected class directly on the clicked element - ZERO global re-render!
        document.querySelectorAll('.good-item.selected').forEach(el => el.classList.remove('selected'));
        let targetEl = null;
        if (itemData.type === 'cabinet') {
          targetEl = this.cabinetEl.children[itemData.slotIndex]?.querySelectorAll('.good-item.layer-front')[itemData.itemIndex];
        } else {
          const track = document.getElementById(`conveyor-track-${itemData.rowIndex}`);
          targetEl = track?.children[itemData.shelfIndex]?.querySelectorAll('.good-item.layer-front')[itemData.itemIndex];
        }
        if (targetEl) targetEl.classList.add('selected');
      };

      const onPointerDown = (e) => {
        if (this.isPaused || activePointerId !== null || isSettlingDrag) return;

        if (this.hammerMode) {
          const itemEl = e.target.closest('.good-item.layer-front');
          if (itemEl) {
            e.preventDefault();
            this.executeHammer(itemEl);
          }
          return;
        }

        const itemEl = e.target.closest('.good-item.layer-front');
        if (!itemEl) {
          // If clicked on an empty slot indicator or shelf while an item was selected
          if (this.selectedItemInfo) {
            const compEl = e.target.closest('.compartment, .shelf-plank');
            if (compEl) {
              const type = compEl.dataset.type;
              const slotIdx = parseInt(compEl.dataset.index || compEl.dataset.rowIndex);
              const shelfIdx = parseInt(compEl.dataset.shelfIndex || '0');
              this.moveItem(
                {
                  type: this.selectedItemInfo.locationType,
                  slotIndex: this.selectedItemInfo.slotIndex,
                  rowIndex: this.selectedItemInfo.rowIndex,
                  shelfIndex: this.selectedItemInfo.shelfIndex,
                  itemIndex: this.selectedItemInfo.itemIndex,
                  itemKey: this.selectedItemInfo.itemKey
                },
                {
                  type,
                  slotIndex: slotIdx,
                  rowIndex: slotIdx,
                  shelfIndex: shelfIdx
                }
              );
            }
          }
          return;
        }

        const type = itemEl.dataset.type;
        const slotIdx = parseInt(itemEl.dataset.slotIndex || itemEl.dataset.rowIndex);
        const shelfIdx = parseInt(itemEl.dataset.shelfIndex || '0');
        const itemIdx = parseInt(itemEl.dataset.itemIndex);
        const itemKey = itemEl.dataset.itemKey;

        const location = { type, slotIndex: slotIdx, rowIndex: slotIdx, shelfIndex: shelfIdx, itemIndex: itemIdx, itemKey };
        const slot = this.getSlotData(location);
        if (!slot || slot.animating || slot.layers[0][itemIdx] !== itemKey) return;

        e.preventDefault();
        // Selection and deselection must not restart the entry animation.
        itemEl.classList.remove('entering');
        activePointerId = e.pointerId;
        startPointerPos = { x: e.clientX, y: e.clientY };
        isDragging = false;
        draggedItemEl = itemEl;
        draggedItemData = { ...location, slot };
      };

      const onPointerMove = (e) => {
        if (activePointerId === null || e.pointerId !== activePointerId) return;

        const clientX = e.clientX;
        const clientY = e.clientY;
        const dist = Math.hypot(clientX - startPointerPos.x, clientY - startPointerPos.y);

        if (!isDragging && dist > 5) {
          isDragging = true;
          // Clear any active selected item visually without recreating the DOM
          if (this.selectedItemInfo) {
            this.selectedItemInfo = null;
            document.querySelectorAll('.good-item.selected').forEach(el => el.classList.remove('selected'));
          }

          this.dragGhost.innerHTML = itemImageMarkup(draggedItemData.itemKey, true, '');
          this.dragGhost.style.display = 'flex';
          this.dragGhost.style.transition = 'none';
          this.dragGhost.style.left = `${clientX}px`;
          this.dragGhost.style.top = `${clientY}px`;
          this.dragGhost.style.transform = 'translate(-50%, -50%)';

          if (draggedItemEl) {
            draggedItemEl.style.visibility = 'hidden';
          }
          sound.playPick();
        }

        if (isDragging) {
          // Precise cursor tracking: pointer is exactly at the visual center of the dragged item
          this.dragGhost.style.left = `${clientX}px`;
          this.dragGhost.style.top = `${clientY}px`;
          this.dragGhost.style.transform = 'translate(-50%, -50%)';

          clearSnapHighlights();
          const target = findBestSnapTarget(clientX, clientY);

          if (target) {
            if (target.canPlace) {
              target.el.classList.add('drop-target-snap');
            } else {
              target.el.classList.add('drop-target-invalid');
            }
          }
        }
      };

      const onPointerUp = (e) => {
        if (activePointerId === null || e.pointerId !== activePointerId) return;

        clearSnapHighlights();

        if (!isDragging) {
          // Tap / Click action
          const itemData = draggedItemData;
          resetPointer();
          handleItemTap(itemData);
          return;
        }

        // Capture this gesture before clearing shared state. Return animations
        // must restore its original node, even after pointerup has completed.
        const sourceEl = draggedItemEl;
        const sourceData = { ...draggedItemData };

        // Auto-snap upon release ("松手要自吸附")
        const releaseTarget = findBestSnapTarget(e.clientX, e.clientY);
        const snap = releaseTarget && releaseTarget.canPlace ? releaseTarget : null;

        if (snap) {
          const isSameSlot = isSameLocation(sourceData, snap);
          const swapItem = findSwapItem(snap, e.clientX, e.clientY);
          const swapIndex = swapItem ? parseInt(swapItem.dataset.itemIndex) : null;

          if (isSameSlot && (swapIndex === null || swapIndex === sourceData.itemIndex)) {
            restoreDragVisuals(sourceEl);
          } else {
            // Magnetic Snap Animation into target slot!
            const emptyIndicator = snap.el.querySelector('.empty-slot-indicator');
            const targetRect = (swapItem || emptyIndicator || snap.el).getBoundingClientRect();

            const targetX = targetRect.left + targetRect.width / 2;
            const targetY = targetRect.top + targetRect.height / 2;

            this.dragGhost.style.transition = 'all 0.15s cubic-bezier(0.2, 0.9, 0.3, 1)';
            this.dragGhost.style.left = `${targetX}px`;
            this.dragGhost.style.top = `${targetY}px`;
            this.dragGhost.style.transform = 'translate(-50%, -50%)';

            const parentRect = document.getElementById('game-container').getBoundingClientRect();
            this.particles.emit(targetX - parentRect.left, targetY - parentRect.top, 14, 'star');

            const targetLocation = {
              type: snap.type,
              slotIndex: snap.slotIndex,
              rowIndex: snap.rowIndex,
              shelfIndex: snap.shelfIndex,
              itemIndex: swapIndex
            };

            settleDrag(() => {
              restoreDragVisuals(sourceEl);
              this.moveItem(sourceData, targetLocation);
            }, 140);
          }
        } else {
          // Snap back to origin
          if (sourceEl) {
            const srcRect = sourceEl.getBoundingClientRect();
            const srcX = srcRect.left + srcRect.width / 2;
            const srcY = srcRect.top + srcRect.height / 2;

            this.dragGhost.style.transition = 'all 0.16s ease-out';
            this.dragGhost.style.left = `${srcX}px`;
            this.dragGhost.style.top = `${srcY}px`;
            this.dragGhost.style.transform = 'translate(-50%, -50%)';

            settleDrag(() => {
              restoreDragVisuals(sourceEl);
            }, 150);
          } else {
            restoreDragVisuals(sourceEl);
          }
        }

        resetPointer();
      };

      const onPointerCancel = (e) => {
        if (activePointerId === null || e.pointerId !== activePointerId) return;
        clearSnapHighlights();
        restoreDragVisuals(draggedItemEl);
        resetPointer();
      };

      container.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerCancel);

      // Boosters
      document.getElementById('btn-tool-hammer').addEventListener('click', () => this.activateHammer());
      document.getElementById('btn-tool-wand').addEventListener('click', () => this.activateWand());
      document.getElementById('btn-tool-freeze').addEventListener('click', () => this.activateFreeze());
      document.getElementById('btn-tool-shuffle').addEventListener('click', () => this.activateShuffle());
      document.getElementById('btn-cancel-hammer').addEventListener('click', () => this.deactivateHammer());

      // Header & Modals
      document.getElementById('btn-pause').addEventListener('click', () => this.togglePause());
      document.getElementById('btn-resume').addEventListener('click', () => this.togglePause());
      document.getElementById('btn-restart').addEventListener('click', () => {
        this.closeModals();
        this.startRound(this.currentLevel);
      });
      document.getElementById('btn-sound-toggle').addEventListener('click', () => {
        const isMuted = sound.toggleMute();
        document.getElementById('btn-sound-toggle').textContent = isMuted ? '🔇' : '🔊';
      });
      document.getElementById('btn-next-level').addEventListener('click', () => {
        this.closeModals();
        this.startRound(this.currentLevel);
      });
      document.getElementById('btn-revive').addEventListener('click', () => {
        this.closeModals();
        this.timerSeconds = 90;
        this.startTimer();
      });

      document.getElementById('level-mode-tag').addEventListener('click', () => this.openDifficultyPicker());
      document.getElementById('btn-win-difficulty').addEventListener('click', () => this.openDifficultyPicker());
      document.getElementById('difficulty-form').addEventListener('submit', event => {
        event.preventDefault();
        const selected = this.difficultyDialog.querySelector('input:checked');
        this.difficultyDialog.close();
        this.closeModals();
        this.startRound(Number(selected.value));
        document.getElementById('level-mode-tag').focus();
      });
      document.getElementById('btn-cancel-difficulty').addEventListener('click', () => this.difficultyDialog.close());

      // Window resize & orientation change listeners for dynamic mobile / iPad responsive adaptation
      const handleResize = () => {
        this.updateLayoutMetrics();
      };
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', () => {
        setTimeout(handleResize, 100);
      });
      if (window.screen && window.screen.orientation) {
        window.screen.orientation.addEventListener('change', () => {
          setTimeout(handleResize, 100);
        });
      }
    }

    openDifficultyPicker() {
      const current = this.difficultyDialog.querySelector(`input[value="${this.currentLevel}"]`);
      current.checked = true;
      this.difficultyDialog.showModal();
      current.focus();
    }

    activateHammer() {
      if (this.propCounts.hammer <= 0) return;
      this.hammerMode = true;
      document.body.classList.add('hammer-mode');
      document.getElementById('btn-tool-hammer').classList.add('active-tool');
      this.hammerBanner.style.display = 'flex';
      sound.playPick();
    }

    deactivateHammer() {
      this.hammerMode = false;
      document.body.classList.remove('hammer-mode');
      document.getElementById('btn-tool-hammer').classList.remove('active-tool');
      this.hammerBanner.style.display = 'none';
    }

    collectItemPositions() {
      const groups = new Map();
      for (const slot of this.getBoardSlots()) {
        if (slot.animating) continue;
        slot.layers.forEach((layer, depth) => layer.forEach((item, index) => {
          const key = getItemMatchKey(item);
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key).push({ slot, depth, index });
        }));
      }
      for (const positions of groups.values()) {
        positions.sort((a, b) => a.depth - b.depth);
      }
      return groups;
    }

    removeTriplet(positions) {
      const affected = new Set();
      // Remove higher indices first so positions in a shared layer stay valid.
      positions.sort((a, b) => b.index - a.index);
      for (const { slot, depth, index } of positions) {
        slot.layers[depth].splice(index, 1);
        affected.add(slot);
      }
      affected.forEach(slot => this.promoteSlot(slot));
      this.selectedItemInfo = null;
    }

    executeHammer(itemEl) {
      const { type, slotIndex, rowIndex, shelfIndex, itemIndex, itemKey } = itemEl.dataset;
      const location = { type, slotIndex: Number(slotIndex), rowIndex: Number(rowIndex), shelfIndex: Number(shelfIndex) };
      const slot = this.getSlotData(location);
      const index = Number(itemIndex);
      if (this.propCounts.hammer <= 0 || !slot || slot.animating || slot.layers[0][index] !== itemKey || !itemKey) return;

      const positions = this.collectItemPositions().get(getItemMatchKey(itemKey));
      if (positions.length < 3) return;
      const others = positions.filter(pos => pos.slot !== slot || pos.depth !== 0 || pos.index !== index);

      sound.playHammer();
      this.propCounts.hammer--;
      this.updateToolCount('hammer');
      this.deactivateHammer();

      const rect = itemEl.getBoundingClientRect();
      const parentRect = document.getElementById('game-container').getBoundingClientRect();
      this.particles.emit(rect.left - parentRect.left + 25, rect.top - parentRect.top + 25, 30, 'star');
      itemEl.classList.add('smashed');

      // Remove the entire group now. Only the clicked slot's redraw waits for the animation.
      slot.animating = true;
      this.removeTriplet([{ slot, depth: 0, index }, ...others.slice(0, 2)]);
      this.updateAllSlots();
      this.checkMatches();

      setTimeout(() => {
        if (this.getSlotData(location) !== slot) return;
        slot.animating = false;
        this.updateLocation(location);
        this.checkMatches();
        this.checkGameWinOrLoss();
      }, 280);
    }

    activateWand() {
      if (this.propCounts.wand <= 0) return;

      const triplets = [...this.collectItemPositions().values()]
        .filter(positions => positions.length >= 3 && positions[0].depth === 0);
      const chosen = triplets.find(positions => positions[2].depth === 0) || triplets[0];
      if (!chosen) return;

      sound.playWand();
      this.propCounts.wand--;
      this.updateToolCount('wand');
      this.removeTriplet(chosen.slice(0, 3));

      this.score += 150;
      this.scoreEl.textContent = this.score;
      const parentRect = document.getElementById('game-container').getBoundingClientRect();
      this.particles.emit(parentRect.width / 2, parentRect.height / 2, 40, 'star');

      this.updateAllSlots();
      this.checkMatches();
      this.checkGameWinOrLoss();
    }

    activateFreeze() {
      if (this.propCounts.freeze <= 0 || this.isFrozen) return;
      sound.playFreeze();
      this.propCounts.freeze--;
      this.updateToolCount('freeze');

      this.isFrozen = true;
      this.freezeOverlay.classList.add('active');
      this.timerEl.style.color = '#b4422b';

      clearTimeout(this.freezeTimeout);
      this.freezeTimeout = setTimeout(() => {
        this.isFrozen = false;
        this.freezeOverlay.classList.remove('active');
        this.timerEl.style.removeProperty('color');
      }, 25000);
    }

    activateShuffle() {
      if (this.propCounts.shuffle === 0) return;
      const slots = this.getBoardSlots().filter(slot => !slot.animating);
      const frontItems = slots.flatMap(slot => slot.layers[0]);
      if (frontItems.length < 2) return;
      sound.playShuffle();
      if (Number.isFinite(this.propCounts.shuffle)) {
        this.propCounts.shuffle--;
        this.updateToolCount('shuffle');
      }

      shuffleItems(frontItems);

      // Shuffle the occupied positions across all shelves without changing occupancy.
      let nextItem = 0;
      for (const slot of slots) {
        slot.layers[0] = slot.layers[0].map(() => frontItems[nextItem++]);
      }

      this.selectedItemInfo = null;
      this.updateAllSlots();
      this.checkMatches();
      this.checkGameWinOrLoss();
    }

    togglePause() {
      this.isPaused = !this.isPaused;
      const modal = document.getElementById('modal-pause');
      if (this.isPaused) {
        const verEl = document.getElementById('pause-modal-version');
        if (verEl) verEl.textContent = `版本号：v${APP_VERSION}`;
        modal.classList.add('open');
      } else {
        modal.classList.remove('open');
      }
    }

    closeModals() {
      document.querySelectorAll('.modal-overlay').forEach(el => el.classList.remove('open'));
      this.isPaused = false;
    }

    checkGameWinOrLoss() {
      if (this.getBoardSlots().some(slot => slot.animating)) return;

      let totalItems = 0;
      this.cabinetData.forEach(comp => {
        comp.layers.forEach(l => totalItems += l.length);
      });
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          shelf.layers.forEach(l => totalItems += l.length);
        });
      });

      if (totalItems === 0) {
        clearInterval(this.timerInterval);
        sound.playWin();
        const parentRect = document.getElementById('game-container').getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            this.particles.emit(
              Math.random() * parentRect.width,
              Math.random() * parentRect.height * 0.6,
              40,
              'star'
            );
          }, i * 200);
        }
        document.getElementById('win-final-score').textContent = this.score;
        document.getElementById('modal-win').classList.add('open');
        return;
      }

      let totalFrontItems = 0;
      let totalFrontCapacity = 9 * 3 + (3 * 4 * 3);
      this.cabinetData.forEach(comp => totalFrontItems += comp.layers[0].length);
      this.conveyorRows.forEach(row => row.forEach(shelf => totalFrontItems += shelf.layers[0].length));

      if (totalFrontItems === totalFrontCapacity) {
        const hasMatch = this.checkMatches();
        if (!hasMatch) {
          this.handleGameOver('货架已全满，无可移动空格！');
        }
      }
    }

    handleGameOver(reason) {
      sound.playLose();
      document.getElementById('gameover-reason').textContent = reason;
      document.getElementById('modal-gameover').classList.add('open');
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    setupImageRecovery();
    window.game = new GoodsOrganizerGame();

    // ================== PWA Installation & Service Worker ==================
    let deferredInstallPrompt = null;
    const btnInstallPwa = document.getElementById('btn-install-pwa');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (btnInstallPwa) {
        btnInstallPwa.style.display = 'block';
      }
      console.log('[PWA] beforeinstallprompt captured, install button activated');
    });

    if (btnInstallPwa) {
      btnInstallPwa.addEventListener('click', async () => {
        if (!deferredInstallPrompt) return;
        btnInstallPwa.style.display = 'none';
        deferredInstallPrompt.prompt();
        try {
          const { outcome } = await deferredInstallPrompt.userChoice;
          console.log(`[PWA] Install prompt outcome: ${outcome}`);
        } catch (err) {
          console.error('[PWA] Error during install prompt:', err);
        }
        deferredInstallPrompt = null;
      });
    }

    window.addEventListener('appinstalled', () => {
      console.log('[PWA] Goods Sort 3D was installed successfully!');
      if (btnInstallPwa) {
        btnInstallPwa.style.display = 'none';
      }
    });

    // Register Service Worker for offline capability
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => window.game.cacheCurrentLevel());
      window.addEventListener('online', () => {
        window.game.cachedLevelSignature = null;
        window.game.cacheCurrentLevel();
      });
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
          .then((reg) => {
            console.log(`[PWA] Service Worker registered with scope: ${reg.scope}`);
            window.game.cacheCurrentLevel();
            // Let visible images finish first. Save-data and slow connections
            // keep only played levels instead of downloading the whole library.
            setTimeout(() => {
              const connection = navigator.connection;
              if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '')) return;
              const warmLibrary = () => navigator.serviceWorker.ready.then(registration => {
                registration.active?.postMessage({ type: 'CACHE_LIBRARY' });
              }).catch(() => {});
              if ('requestIdleCallback' in window) window.requestIdleCallback(warmLibrary, { timeout: 10000 });
              else warmLibrary();
            }, 15000);
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }
  });
})();
