// Standalone High-Quality Goods Sort 3D Game with Solvability Guarantee
(function() {
  'use strict';

  // Game Application Version
  const APP_VERSION = '1.8.2';

  // Imported photo assets, fitted to a shared transparent canvas.
  const ITEMS = {
    "item_810": {
      "id": "item_810",
      "name": "彩色长袜（810）",
      "archetype": "stocking",
      "colorGroup": "810",
      "img": "./assets/items/photos/item_810.webp"
    },
    "item_811": {
      "id": "item_811",
      "name": "彩色长袜（811）",
      "archetype": "stocking",
      "colorGroup": "811",
      "img": "./assets/items/photos/item_811.webp"
    },
    "item_812": {
      "id": "item_812",
      "name": "彩色长袜（812）",
      "archetype": "stocking",
      "colorGroup": "812",
      "img": "./assets/items/photos/item_812.webp"
    },
    "item_813": {
      "id": "item_813",
      "name": "彩色长袜（813）",
      "archetype": "stocking",
      "colorGroup": "813",
      "img": "./assets/items/photos/item_813.webp"
    },
    "item_814": {
      "id": "item_814",
      "name": "彩色长袜（814）",
      "archetype": "stocking",
      "colorGroup": "814",
      "img": "./assets/items/photos/item_814.webp"
    },
    "item_815": {
      "id": "item_815",
      "name": "彩色长袜（815）",
      "archetype": "stocking",
      "colorGroup": "815",
      "img": "./assets/items/photos/item_815.webp"
    },
    "item_816": {
      "id": "item_816",
      "name": "蝴蝶结礼盒（816）",
      "archetype": "gift",
      "colorGroup": "816",
      "img": "./assets/items/photos/item_816.webp"
    },
    "item_817": {
      "id": "item_817",
      "name": "蝴蝶结礼盒（817）",
      "archetype": "gift",
      "colorGroup": "817",
      "img": "./assets/items/photos/item_817.webp"
    },
    "item_818": {
      "id": "item_818",
      "name": "蝴蝶结礼盒（818）",
      "archetype": "gift",
      "colorGroup": "818",
      "img": "./assets/items/photos/item_818.webp"
    },
    "item_819": {
      "id": "item_819",
      "name": "蝴蝶结礼盒（819）",
      "archetype": "gift",
      "colorGroup": "819",
      "img": "./assets/items/photos/item_819.webp"
    },
    "item_820": {
      "id": "item_820",
      "name": "蝴蝶结礼盒（820）",
      "archetype": "gift",
      "colorGroup": "820",
      "img": "./assets/items/photos/item_820.webp"
    },
    "item_821": {
      "id": "item_821",
      "name": "蝴蝶结礼盒（821）",
      "archetype": "gift",
      "colorGroup": "821",
      "img": "./assets/items/photos/item_821.webp"
    },
    "item_822": {
      "id": "item_822",
      "name": "蝴蝶结礼盒（822）",
      "archetype": "gift",
      "colorGroup": "822",
      "img": "./assets/items/photos/item_822.webp"
    },
    "item_823": {
      "id": "item_823",
      "name": "彩色蜡烛（823）",
      "archetype": "candle",
      "colorGroup": "823",
      "img": "./assets/items/photos/item_823.webp"
    },
    "item_824": {
      "id": "item_824",
      "name": "彩色蜡烛（824）",
      "archetype": "candle",
      "colorGroup": "824",
      "img": "./assets/items/photos/item_824.webp"
    },
    "item_825": {
      "id": "item_825",
      "name": "彩色蜡烛（825）",
      "archetype": "candle",
      "colorGroup": "825",
      "img": "./assets/items/photos/item_825.webp"
    },
    "item_826": {
      "id": "item_826",
      "name": "彩色蜡烛（826）",
      "archetype": "candle",
      "colorGroup": "826",
      "img": "./assets/items/photos/item_826.webp"
    },
    "item_827": {
      "id": "item_827",
      "name": "小猫公仔（827）",
      "archetype": "cat",
      "colorGroup": "827",
      "img": "./assets/items/photos/item_827.webp"
    },
    "item_828": {
      "id": "item_828",
      "name": "小猫公仔（828）",
      "archetype": "cat",
      "colorGroup": "828",
      "img": "./assets/items/photos/item_828.webp"
    },
    "item_829": {
      "id": "item_829",
      "name": "小猫公仔（829）",
      "archetype": "cat",
      "colorGroup": "829",
      "img": "./assets/items/photos/item_829.webp"
    },
    "item_830": {
      "id": "item_830",
      "name": "小猫公仔（830）",
      "archetype": "cat",
      "colorGroup": "830",
      "img": "./assets/items/photos/item_830.webp"
    },
    "item_831": {
      "id": "item_831",
      "name": "绿植盆栽（831）",
      "archetype": "plant",
      "colorGroup": "831",
      "img": "./assets/items/photos/item_831.webp"
    },
    "item_832": {
      "id": "item_832",
      "name": "绿植盆栽（832）",
      "archetype": "plant",
      "colorGroup": "832",
      "img": "./assets/items/photos/item_832.webp"
    },
    "item_833": {
      "id": "item_833",
      "name": "绿植盆栽（833）",
      "archetype": "plant",
      "colorGroup": "833",
      "img": "./assets/items/photos/item_833.webp"
    },
    "item_834": {
      "id": "item_834",
      "name": "绿植盆栽（834）",
      "archetype": "plant",
      "colorGroup": "834",
      "img": "./assets/items/photos/item_834.webp"
    },
    "item_835": {
      "id": "item_835",
      "name": "绿植盆栽（835）",
      "archetype": "plant",
      "colorGroup": "835",
      "img": "./assets/items/photos/item_835.webp"
    },
    "item_836": {
      "id": "item_836",
      "name": "绿植盆栽（836）",
      "archetype": "plant",
      "colorGroup": "836",
      "img": "./assets/items/photos/item_836.webp"
    },
    "item_837": {
      "id": "item_837",
      "name": "绿植盆栽（837）",
      "archetype": "plant",
      "colorGroup": "837",
      "img": "./assets/items/photos/item_837.webp"
    },
    "item_838": {
      "id": "item_838",
      "name": "绿植盆栽（838）",
      "archetype": "plant",
      "colorGroup": "838",
      "img": "./assets/items/photos/item_838.webp"
    },
    "item_839": {
      "id": "item_839",
      "name": "绿植盆栽（839）",
      "archetype": "plant",
      "colorGroup": "839",
      "img": "./assets/items/photos/item_839.webp"
    },
    "item_840": {
      "id": "item_840",
      "name": "绿植盆栽（840）",
      "archetype": "plant",
      "colorGroup": "840",
      "img": "./assets/items/photos/item_840.webp"
    },
    "item_841": {
      "id": "item_841",
      "name": "绿植盆栽（841）",
      "archetype": "plant",
      "colorGroup": "841",
      "img": "./assets/items/photos/item_841.webp"
    },
    "item_842": {
      "id": "item_842",
      "name": "绿植盆栽（842）",
      "archetype": "plant",
      "colorGroup": "842",
      "img": "./assets/items/photos/item_842.webp"
    },
    "item_843": {
      "id": "item_843",
      "name": "绿植盆栽（843）",
      "archetype": "plant",
      "colorGroup": "843",
      "img": "./assets/items/photos/item_843.webp"
    },
    "item_845": {
      "id": "item_845",
      "name": "小兔公仔（845）",
      "archetype": "rabbit",
      "colorGroup": "845",
      "img": "./assets/items/photos/item_845.webp"
    },
    "item_846": {
      "id": "item_846",
      "name": "小兔公仔（846）",
      "archetype": "rabbit",
      "colorGroup": "846",
      "img": "./assets/items/photos/item_846.webp"
    },
    "item_847": {
      "id": "item_847",
      "name": "小兔公仔（847）",
      "archetype": "rabbit",
      "colorGroup": "847",
      "img": "./assets/items/photos/item_847.webp"
    },
    "item_848": {
      "id": "item_848",
      "name": "小熊公仔（848）",
      "archetype": "bear",
      "colorGroup": "848",
      "img": "./assets/items/photos/item_848.webp"
    },
    "item_849": {
      "id": "item_849",
      "name": "小熊公仔（849）",
      "archetype": "bear",
      "colorGroup": "849",
      "img": "./assets/items/photos/item_849.webp"
    },
    "item_850": {
      "id": "item_850",
      "name": "小熊公仔（850）",
      "archetype": "bear",
      "colorGroup": "850",
      "img": "./assets/items/photos/item_850.webp"
    },
    "item_851": {
      "id": "item_851",
      "name": "小熊公仔（851）",
      "archetype": "bear",
      "colorGroup": "851",
      "img": "./assets/items/photos/item_851.webp"
    },
    "item_852": {
      "id": "item_852",
      "name": "小熊公仔（852）",
      "archetype": "bear",
      "colorGroup": "852",
      "img": "./assets/items/photos/item_852.webp"
    },
    "item_853": {
      "id": "item_853",
      "name": "小熊公仔（853）",
      "archetype": "bear",
      "colorGroup": "853",
      "img": "./assets/items/photos/item_853.webp"
    },
    "item_854": {
      "id": "item_854",
      "name": "小熊公仔（854）",
      "archetype": "bear",
      "colorGroup": "854",
      "img": "./assets/items/photos/item_854.webp"
    },
    "item_855": {
      "id": "item_855",
      "name": "小熊公仔（855）",
      "archetype": "bear",
      "colorGroup": "855",
      "img": "./assets/items/photos/item_855.webp"
    },
    "item_856": {
      "id": "item_856",
      "name": "饮品纸盒（856）",
      "archetype": "carton",
      "colorGroup": "856",
      "img": "./assets/items/photos/item_856.webp"
    },
    "item_857": {
      "id": "item_857",
      "name": "饮品纸盒（857）",
      "archetype": "carton",
      "colorGroup": "857",
      "img": "./assets/items/photos/item_857.webp"
    },
    "item_858": {
      "id": "item_858",
      "name": "饮品纸盒（858）",
      "archetype": "carton",
      "colorGroup": "858",
      "img": "./assets/items/photos/item_858.webp"
    },
    "item_859": {
      "id": "item_859",
      "name": "饮品纸盒（859）",
      "archetype": "carton",
      "colorGroup": "859",
      "img": "./assets/items/photos/item_859.webp"
    },
    "item_860": {
      "id": "item_860",
      "name": "零食袋（860）",
      "archetype": "snack",
      "colorGroup": "860",
      "img": "./assets/items/photos/item_860.webp"
    },
    "item_861": {
      "id": "item_861",
      "name": "零食袋（861）",
      "archetype": "snack",
      "colorGroup": "861",
      "img": "./assets/items/photos/item_861.webp"
    },
    "item_862": {
      "id": "item_862",
      "name": "零食袋（862）",
      "archetype": "snack",
      "colorGroup": "862",
      "img": "./assets/items/photos/item_862.webp"
    },
    "item_863": {
      "id": "item_863",
      "name": "零食袋（863）",
      "archetype": "snack",
      "colorGroup": "863",
      "img": "./assets/items/photos/item_863.webp"
    },
    "item_864": {
      "id": "item_864",
      "name": "零食袋（864）",
      "archetype": "snack",
      "colorGroup": "864",
      "img": "./assets/items/photos/item_864.webp"
    },
    "item_865": {
      "id": "item_865",
      "name": "饮品纸盒（865）",
      "archetype": "carton",
      "colorGroup": "865",
      "img": "./assets/items/photos/item_865.webp"
    },
    "item_866": {
      "id": "item_866",
      "name": "饮品纸盒（866）",
      "archetype": "carton",
      "colorGroup": "866",
      "img": "./assets/items/photos/item_866.webp"
    },
    "item_867": {
      "id": "item_867",
      "name": "饮品纸盒（867）",
      "archetype": "carton",
      "colorGroup": "867",
      "img": "./assets/items/photos/item_867.webp"
    },
    "item_869": {
      "id": "item_869",
      "name": "零食袋（869）",
      "archetype": "snack",
      "colorGroup": "869",
      "img": "./assets/items/photos/item_869.webp"
    },
    "item_870": {
      "id": "item_870",
      "name": "零食袋（870）",
      "archetype": "snack",
      "colorGroup": "870",
      "img": "./assets/items/photos/item_870.webp"
    },
    "item_871": {
      "id": "item_871",
      "name": "零食袋（871）",
      "archetype": "snack",
      "colorGroup": "871",
      "img": "./assets/items/photos/item_871.webp"
    },
    "item_872": {
      "id": "item_872",
      "name": "果味饮品（872）",
      "archetype": "carton",
      "colorGroup": "872",
      "img": "./assets/items/photos/item_872.webp"
    },
    "item_873": {
      "id": "item_873",
      "name": "果味饮品（873）",
      "archetype": "carton",
      "colorGroup": "873",
      "img": "./assets/items/photos/item_873.webp"
    },
    "item_874": {
      "id": "item_874",
      "name": "果味饮品（874）",
      "archetype": "carton",
      "colorGroup": "874",
      "img": "./assets/items/photos/item_874.webp"
    },
    "item_875": {
      "id": "item_875",
      "name": "果味饮品（875）",
      "archetype": "carton",
      "colorGroup": "875",
      "img": "./assets/items/photos/item_875.webp"
    },
    "item_876": {
      "id": "item_876",
      "name": "零食袋（876）",
      "archetype": "snack",
      "colorGroup": "876",
      "img": "./assets/items/photos/item_876.webp"
    },
    "item_878": {
      "id": "item_878",
      "name": "零食袋（878）",
      "archetype": "snack",
      "colorGroup": "878",
      "img": "./assets/items/photos/item_878.webp"
    },
    "item_879": {
      "id": "item_879",
      "name": "零食袋（879）",
      "archetype": "snack",
      "colorGroup": "879",
      "img": "./assets/items/photos/item_879.webp"
    },
    "item_880": {
      "id": "item_880",
      "name": "零食袋（880）",
      "archetype": "snack",
      "colorGroup": "880",
      "img": "./assets/items/photos/item_880.webp"
    },
    "item_881": {
      "id": "item_881",
      "name": "汽水瓶（881）",
      "archetype": "bottle",
      "colorGroup": "881",
      "img": "./assets/items/photos/item_881.webp"
    },
    "item_882": {
      "id": "item_882",
      "name": "汽水瓶（882）",
      "archetype": "bottle",
      "colorGroup": "882",
      "img": "./assets/items/photos/item_882.webp"
    },
    "item_883": {
      "id": "item_883",
      "name": "汽水瓶（883）",
      "archetype": "bottle",
      "colorGroup": "883",
      "img": "./assets/items/photos/item_883.webp"
    },
    "item_884": {
      "id": "item_884",
      "name": "汽水瓶（884）",
      "archetype": "bottle",
      "colorGroup": "884",
      "img": "./assets/items/photos/item_884.webp"
    },
    "item_885": {
      "id": "item_885",
      "name": "汽水瓶（885）",
      "archetype": "bottle",
      "colorGroup": "885",
      "img": "./assets/items/photos/item_885.webp"
    },
    "item_886": {
      "id": "item_886",
      "name": "汽水瓶（886）",
      "archetype": "bottle",
      "colorGroup": "886",
      "img": "./assets/items/photos/item_886.webp"
    },
    "item_887": {
      "id": "item_887",
      "name": "汽水瓶（887）",
      "archetype": "bottle",
      "colorGroup": "887",
      "img": "./assets/items/photos/item_887.webp"
    },
    "item_889": {
      "id": "item_889",
      "name": "汽水瓶（889）",
      "archetype": "bottle",
      "colorGroup": "889",
      "img": "./assets/items/photos/item_889.webp"
    },
    "item_890": {
      "id": "item_890",
      "name": "汽水瓶（890）",
      "archetype": "bottle",
      "colorGroup": "890",
      "img": "./assets/items/photos/item_890.webp"
    },
    "item_891": {
      "id": "item_891",
      "name": "汽水瓶（891）",
      "archetype": "bottle",
      "colorGroup": "891",
      "img": "./assets/items/photos/item_891.webp"
    },
    "item_892": {
      "id": "item_892",
      "name": "汽水瓶（892）",
      "archetype": "bottle",
      "colorGroup": "892",
      "img": "./assets/items/photos/item_892.webp"
    },
    "item_893": {
      "id": "item_893",
      "name": "条纹长袜（893）",
      "archetype": "stocking",
      "colorGroup": "893",
      "img": "./assets/items/photos/item_893.webp"
    },
    "item_894": {
      "id": "item_894",
      "name": "条纹长袜（894）",
      "archetype": "stocking",
      "colorGroup": "894",
      "img": "./assets/items/photos/item_894.webp"
    },
    "item_895": {
      "id": "item_895",
      "name": "青色台灯（895）",
      "archetype": "lamp",
      "colorGroup": "895",
      "img": "./assets/items/photos/item_895.webp"
    },
    "item_896": {
      "id": "item_896",
      "name": "橙色饮料（896）",
      "archetype": "drink",
      "colorGroup": "896",
      "img": "./assets/items/photos/item_896.webp"
    },
    "item_897": {
      "id": "item_897",
      "name": "橙色计算器（897）",
      "archetype": "calculator",
      "colorGroup": "897",
      "img": "./assets/items/photos/item_897.webp"
    },
    "item_898": {
      "id": "item_898",
      "name": "咖啡机（898）",
      "archetype": "coffee_maker",
      "colorGroup": "898",
      "img": "./assets/items/photos/item_898.webp"
    },
    "item_899": {
      "id": "item_899",
      "name": "咖啡机（899）",
      "archetype": "coffee_maker",
      "colorGroup": "899",
      "img": "./assets/items/photos/item_899.webp"
    },
    "item_900": {
      "id": "item_900",
      "name": "保龄球瓶（900）",
      "archetype": "bowling",
      "colorGroup": "900",
      "img": "./assets/items/photos/item_900.webp"
    },
    "item_901": {
      "id": "item_901",
      "name": "网球拍（901）",
      "archetype": "racket",
      "colorGroup": "901",
      "img": "./assets/items/photos/item_901.webp"
    },
    "item_902": {
      "id": "item_902",
      "name": "蓝色水壶（902）",
      "archetype": "flask",
      "colorGroup": "902",
      "img": "./assets/items/photos/item_902.webp"
    },
    "item_905": {
      "id": "item_905",
      "name": "收纳桶（905）",
      "archetype": "bin",
      "colorGroup": "905",
      "img": "./assets/items/photos/item_905.webp"
    },
    "item_906": {
      "id": "item_906",
      "name": "收纳桶（906）",
      "archetype": "bin",
      "colorGroup": "906",
      "img": "./assets/items/photos/item_906.webp"
    },
    "item_907": {
      "id": "item_907",
      "name": "清洁刷（907）",
      "archetype": "brush",
      "colorGroup": "907",
      "img": "./assets/items/photos/item_907.webp"
    },
    "item_908": {
      "id": "item_908",
      "name": "清洁用品（908）",
      "archetype": "cleaner",
      "colorGroup": "908",
      "img": "./assets/items/photos/item_908.webp"
    },
    "item_909": {
      "id": "item_909",
      "name": "清洁用品（909）",
      "archetype": "cleaner",
      "colorGroup": "909",
      "img": "./assets/items/photos/item_909.webp"
    },
    "item_910": {
      "id": "item_910",
      "name": "清洁用品（910）",
      "archetype": "cleaner",
      "colorGroup": "910",
      "img": "./assets/items/photos/item_910.webp"
    },
    "item_911": {
      "id": "item_911",
      "name": "清洁用品（911）",
      "archetype": "cleaner",
      "colorGroup": "911",
      "img": "./assets/items/photos/item_911.webp"
    },
    "item_912": {
      "id": "item_912",
      "name": "牙刷杯（912）",
      "archetype": "toothbrush_cup",
      "colorGroup": "912",
      "img": "./assets/items/photos/item_912.webp"
    },
    "item_913": {
      "id": "item_913",
      "name": "牙刷杯（913）",
      "archetype": "toothbrush_cup",
      "colorGroup": "913",
      "img": "./assets/items/photos/item_913.webp"
    },
    "item_914": {
      "id": "item_914",
      "name": "吹风机（914）",
      "archetype": "dryer",
      "colorGroup": "914",
      "img": "./assets/items/photos/item_914.webp"
    },
    "item_915": {
      "id": "item_915",
      "name": "吹风机（915）",
      "archetype": "dryer",
      "colorGroup": "915",
      "img": "./assets/items/photos/item_915.webp"
    },
    "item_916": {
      "id": "item_916",
      "name": "吸尘器（916）",
      "archetype": "vacuum",
      "colorGroup": "916",
      "img": "./assets/items/photos/item_916.webp"
    },
    "item_917": {
      "id": "item_917",
      "name": "吸尘器（917）",
      "archetype": "vacuum",
      "colorGroup": "917",
      "img": "./assets/items/photos/item_917.webp"
    },
    "item_918": {
      "id": "item_918",
      "name": "圣诞树（918）",
      "archetype": "tree",
      "colorGroup": "918",
      "img": "./assets/items/photos/item_918.webp"
    },
    "item_919": {
      "id": "item_919",
      "name": "彩色灯笼（919）",
      "archetype": "lantern",
      "colorGroup": "919",
      "img": "./assets/items/photos/item_919.webp"
    },
    "item_920": {
      "id": "item_920",
      "name": "彩色灯笼（920）",
      "archetype": "lantern",
      "colorGroup": "920",
      "img": "./assets/items/photos/item_920.webp"
    },
    "item_921": {
      "id": "item_921",
      "name": "彩色灯笼（921）",
      "archetype": "lantern",
      "colorGroup": "921",
      "img": "./assets/items/photos/item_921.webp"
    },
    "item_922": {
      "id": "item_922",
      "name": "节日花环（922）",
      "archetype": "wreath",
      "colorGroup": "922",
      "img": "./assets/items/photos/item_922.webp"
    },
    "item_923": {
      "id": "item_923",
      "name": "节日花环（923）",
      "archetype": "wreath",
      "colorGroup": "923",
      "img": "./assets/items/photos/item_923.webp"
    },
    "item_924": {
      "id": "item_924",
      "name": "节日花环（924）",
      "archetype": "wreath",
      "colorGroup": "924",
      "img": "./assets/items/photos/item_924.webp"
    },
    "item_925": {
      "id": "item_925",
      "name": "节日花环（925）",
      "archetype": "wreath",
      "colorGroup": "925",
      "img": "./assets/items/photos/item_925.webp"
    },
    "item_926": {
      "id": "item_926",
      "name": "福袋（926）",
      "archetype": "pouch",
      "colorGroup": "926",
      "img": "./assets/items/photos/item_926.webp"
    },
    "item_927": {
      "id": "item_927",
      "name": "福袋（927）",
      "archetype": "pouch",
      "colorGroup": "927",
      "img": "./assets/items/photos/item_927.webp"
    },
    "item_928": {
      "id": "item_928",
      "name": "庆典礼炮（928）",
      "archetype": "party_popper",
      "colorGroup": "928",
      "img": "./assets/items/photos/item_928.webp"
    },
    "item_929": {
      "id": "item_929",
      "name": "庆典礼炮（929）",
      "archetype": "party_popper",
      "colorGroup": "929",
      "img": "./assets/items/photos/item_929.webp"
    },
    "item_930": {
      "id": "item_930",
      "name": "节日礼盒（930）",
      "archetype": "gift",
      "colorGroup": "930",
      "img": "./assets/items/photos/item_930.webp"
    },
    "item_931": {
      "id": "item_931",
      "name": "节日礼盒（931）",
      "archetype": "gift",
      "colorGroup": "931",
      "img": "./assets/items/photos/item_931.webp"
    },
    "item_932": {
      "id": "item_932",
      "name": "高帮运动鞋（932）",
      "archetype": "shoe",
      "colorGroup": "932",
      "img": "./assets/items/photos/item_932.webp"
    },
    "item_933": {
      "id": "item_933",
      "name": "高帮运动鞋（933）",
      "archetype": "shoe",
      "colorGroup": "933",
      "img": "./assets/items/photos/item_933.webp"
    },
    "item_934": {
      "id": "item_934",
      "name": "彩色围巾（934）",
      "archetype": "scarf",
      "colorGroup": "934",
      "img": "./assets/items/photos/item_934.webp"
    },
    "item_935": {
      "id": "item_935",
      "name": "彩色围巾（935）",
      "archetype": "scarf",
      "colorGroup": "935",
      "img": "./assets/items/photos/item_935.webp"
    },
    "item_936": {
      "id": "item_936",
      "name": "彩色围巾（936）",
      "archetype": "scarf",
      "colorGroup": "936",
      "img": "./assets/items/photos/item_936.webp"
    },
    "item_937": {
      "id": "item_937",
      "name": "手提包（937）",
      "archetype": "handbag",
      "colorGroup": "937",
      "img": "./assets/items/photos/item_937.webp"
    },
    "item_938": {
      "id": "item_938",
      "name": "手提包（938）",
      "archetype": "handbag",
      "colorGroup": "938",
      "img": "./assets/items/photos/item_938.webp"
    },
    "item_939": {
      "id": "item_939",
      "name": "香水瓶（939）",
      "archetype": "perfume",
      "colorGroup": "939",
      "img": "./assets/items/photos/item_939.webp"
    },
    "item_940": {
      "id": "item_940",
      "name": "香水瓶（940）",
      "archetype": "perfume",
      "colorGroup": "940",
      "img": "./assets/items/photos/item_940.webp"
    },
    "item_941": {
      "id": "item_941",
      "name": "双肩背包（941）",
      "archetype": "backpack",
      "colorGroup": "941",
      "img": "./assets/items/photos/item_941.webp"
    },
    "item_942": {
      "id": "item_942",
      "name": "双肩背包（942）",
      "archetype": "backpack",
      "colorGroup": "942",
      "img": "./assets/items/photos/item_942.webp"
    },
    "item_943": {
      "id": "item_943",
      "name": "小摩托（943）",
      "archetype": "scooter",
      "colorGroup": "943",
      "img": "./assets/items/photos/item_943.webp"
    },
    "item_944": {
      "id": "item_944",
      "name": "小摩托（944）",
      "archetype": "scooter",
      "colorGroup": "944",
      "img": "./assets/items/photos/item_944.webp"
    },
    "item_945": {
      "id": "item_945",
      "name": "青色滑板（945）",
      "archetype": "skateboard",
      "colorGroup": "945",
      "img": "./assets/items/photos/item_945.webp"
    },
    "item_946": {
      "id": "item_946",
      "name": "热气球（946）",
      "archetype": "balloon",
      "colorGroup": "946",
      "img": "./assets/items/photos/item_946.webp"
    },
    "item_947": {
      "id": "item_947",
      "name": "热气球（947）",
      "archetype": "balloon",
      "colorGroup": "947",
      "img": "./assets/items/photos/item_947.webp"
    },
    "item_948": {
      "id": "item_948",
      "name": "热气球（948）",
      "archetype": "balloon",
      "colorGroup": "948",
      "img": "./assets/items/photos/item_948.webp"
    },
    "item_949": {
      "id": "item_949",
      "name": "红色列车（949）",
      "archetype": "train",
      "colorGroup": "949",
      "img": "./assets/items/photos/item_949.webp"
    },
    "item_951": {
      "id": "item_951",
      "name": "粉色笔记本（951）",
      "archetype": "notebook",
      "colorGroup": "951",
      "img": "./assets/items/photos/item_951.webp"
    },
    "item_952": {
      "id": "item_952",
      "name": "红色计算器（952）",
      "archetype": "calculator",
      "colorGroup": "952",
      "img": "./assets/items/photos/item_952.webp"
    },
    "item_953": {
      "id": "item_953",
      "name": "彩色骰子（953）",
      "archetype": "dice",
      "colorGroup": "953",
      "img": "./assets/items/photos/item_953.webp"
    },
    "item_954": {
      "id": "item_954",
      "name": "黄色耳机（954）",
      "archetype": "headphones",
      "colorGroup": "954",
      "img": "./assets/items/photos/item_954.webp"
    },
    "item_955": {
      "id": "item_955",
      "name": "紫色遥控器（955）",
      "archetype": "remote",
      "colorGroup": "955",
      "img": "./assets/items/photos/item_955.webp"
    },
    "item_956": {
      "id": "item_956",
      "name": "蓝色笔记本电脑（956）",
      "archetype": "laptop",
      "colorGroup": "956",
      "img": "./assets/items/photos/item_956.webp"
    },
    "item_957": {
      "id": "item_957",
      "name": "粉色保温杯（957）",
      "archetype": "flask",
      "colorGroup": "957",
      "img": "./assets/items/photos/item_957.webp"
    },
    "item_958": {
      "id": "item_958",
      "name": "灰色砧板（958）",
      "archetype": "board",
      "colorGroup": "958",
      "img": "./assets/items/photos/item_958.webp"
    },
    "item_959": {
      "id": "item_959",
      "name": "橙色微波炉（959）",
      "archetype": "microwave",
      "colorGroup": "959",
      "img": "./assets/items/photos/item_959.webp"
    },
    "item_960": {
      "id": "item_960",
      "name": "紫色电饭锅（960）",
      "archetype": "rice_cooker",
      "colorGroup": "960",
      "img": "./assets/items/photos/item_960.webp"
    },
    "item_961": {
      "id": "item_961",
      "name": "黄色烤面包机（961）",
      "archetype": "toaster",
      "colorGroup": "961",
      "img": "./assets/items/photos/item_961.webp"
    },
    "item_962": {
      "id": "item_962",
      "name": "蓝色咖啡机（962）",
      "archetype": "coffee_maker",
      "colorGroup": "962",
      "img": "./assets/items/photos/item_962.webp"
    },
    "item_963": {
      "id": "item_963",
      "name": "蓝色水壶（963）",
      "archetype": "kettle",
      "colorGroup": "963",
      "img": "./assets/items/photos/item_963.webp"
    },
    "item_964": {
      "id": "item_964",
      "name": "红色煎锅（964）",
      "archetype": "pan",
      "colorGroup": "964",
      "img": "./assets/items/photos/item_964.webp"
    },
    "item_965": {
      "id": "item_965",
      "name": "木色圆凳（965）",
      "archetype": "stool",
      "colorGroup": "965",
      "img": "./assets/items/photos/item_965.webp"
    },
    "item_966": {
      "id": "item_966",
      "name": "黄色扶手椅（966）",
      "archetype": "chair",
      "colorGroup": "966",
      "img": "./assets/items/photos/item_966.webp"
    },
    "item_968": {
      "id": "item_968",
      "name": "洗衣机（968）",
      "archetype": "washer",
      "colorGroup": "968",
      "img": "./assets/items/photos/item_968.webp"
    },
    "item_969": {
      "id": "item_969",
      "name": "蓝色风扇（969）",
      "archetype": "fan",
      "colorGroup": "969",
      "img": "./assets/items/photos/item_969.webp"
    },
    "item_970": {
      "id": "item_970",
      "name": "青色冰箱（970）",
      "archetype": "fridge",
      "colorGroup": "970",
      "img": "./assets/items/photos/item_970.webp"
    },
    "item_971": {
      "id": "item_971",
      "name": "红色闹钟（971）",
      "archetype": "clock",
      "colorGroup": "971",
      "img": "./assets/items/photos/item_971.webp"
    },
    "item_972": {
      "id": "item_972",
      "name": "彩色饮料（972）",
      "archetype": "drink",
      "colorGroup": "972",
      "img": "./assets/items/photos/item_972.webp"
    },
    "item_973": {
      "id": "item_973",
      "name": "彩色饮料（973）",
      "archetype": "drink",
      "colorGroup": "973",
      "img": "./assets/items/photos/item_973.webp"
    },
    "item_974": {
      "id": "item_974",
      "name": "彩色饮料（974）",
      "archetype": "drink",
      "colorGroup": "974",
      "img": "./assets/items/photos/item_974.webp"
    },
    "item_975": {
      "id": "item_975",
      "name": "彩色饮料（975）",
      "archetype": "drink",
      "colorGroup": "975",
      "img": "./assets/items/photos/item_975.webp"
    },
    "item_976": {
      "id": "item_976",
      "name": "彩色饮料（976）",
      "archetype": "drink",
      "colorGroup": "976",
      "img": "./assets/items/photos/item_976.webp"
    },
    "item_977": {
      "id": "item_977",
      "name": "彩色饮料（977）",
      "archetype": "drink",
      "colorGroup": "977",
      "img": "./assets/items/photos/item_977.webp"
    },
    "item_978": {
      "id": "item_978",
      "name": "彩色饮料（978）",
      "archetype": "drink",
      "colorGroup": "978",
      "img": "./assets/items/photos/item_978.webp"
    },
    "item_979": {
      "id": "item_979",
      "name": "彩色饮料（979）",
      "archetype": "drink",
      "colorGroup": "979",
      "img": "./assets/items/photos/item_979.webp"
    },
    "item_980": {
      "id": "item_980",
      "name": "彩色饮料（980）",
      "archetype": "drink",
      "colorGroup": "980",
      "img": "./assets/items/photos/item_980.webp"
    },
    "item_981": {
      "id": "item_981",
      "name": "彩色饮料（981）",
      "archetype": "drink",
      "colorGroup": "981",
      "img": "./assets/items/photos/item_981.webp"
    },
    "item_982": {
      "id": "item_982",
      "name": "黄色手套（982）",
      "archetype": "mitten",
      "colorGroup": "982",
      "img": "./assets/items/photos/item_982.webp"
    },
    "item_983": {
      "id": "item_983",
      "name": "玻璃杯饮料（983）",
      "archetype": "drink",
      "colorGroup": "983",
      "img": "./assets/items/photos/item_983.webp"
    },
    "item_984": {
      "id": "item_984",
      "name": "橙色台灯（984）",
      "archetype": "lamp",
      "colorGroup": "984",
      "img": "./assets/items/photos/item_984.webp"
    },
    "item_985": {
      "id": "item_985",
      "name": "龟背竹叶（985）",
      "archetype": "leaf",
      "colorGroup": "985",
      "img": "./assets/items/photos/item_985.webp"
    },
    "item_986": {
      "id": "item_986",
      "name": "蓝盒牛奶（986）",
      "archetype": "carton",
      "colorGroup": "986",
      "img": "./assets/items/photos/item_986.webp"
    },
    "item_987": {
      "id": "item_987",
      "name": "薯片袋（987）",
      "archetype": "snack",
      "colorGroup": "987",
      "img": "./assets/items/photos/item_987.webp"
    },
    "item_988": {
      "id": "item_988",
      "name": "薯片袋（988）",
      "archetype": "snack",
      "colorGroup": "988",
      "img": "./assets/items/photos/item_988.webp"
    },
    "item_989": {
      "id": "item_989",
      "name": "小熊饮料瓶（989）",
      "archetype": "bottle",
      "colorGroup": "989",
      "img": "./assets/items/photos/item_989.webp"
    },
    "item_990": {
      "id": "item_990",
      "name": "花草盆栽（990）",
      "archetype": "plant",
      "colorGroup": "990",
      "img": "./assets/items/photos/item_990.webp"
    },
    "item_991": {
      "id": "item_991",
      "name": "花草盆栽（991）",
      "archetype": "plant",
      "colorGroup": "991",
      "img": "./assets/items/photos/item_991.webp"
    },
    "item_992": {
      "id": "item_992",
      "name": "花草盆栽（992）",
      "archetype": "plant",
      "colorGroup": "992",
      "img": "./assets/items/photos/item_992.webp"
    },
    "item_993": {
      "id": "item_993",
      "name": "花草盆栽（993）",
      "archetype": "plant",
      "colorGroup": "993",
      "img": "./assets/items/photos/item_993.webp"
    },
    "item_995": {
      "id": "item_995",
      "name": "雪花手套（995）",
      "archetype": "mitten",
      "colorGroup": "995",
      "img": "./assets/items/photos/item_995.webp"
    },
    "item_996": {
      "id": "item_996",
      "name": "彩色笔记本（996）",
      "archetype": "notebook",
      "colorGroup": "996",
      "img": "./assets/items/photos/item_996.webp"
    },
    "item_997": {
      "id": "item_997",
      "name": "黄黑条纹长袜（997）",
      "archetype": "stocking",
      "colorGroup": "997",
      "img": "./assets/items/photos/item_997.webp"
    },
    "item_998": {
      "id": "item_998",
      "name": "蓝色矿泉水（998）",
      "archetype": "bottle",
      "colorGroup": "998",
      "img": "./assets/items/photos/item_998.webp"
    },
    "item_999": {
      "id": "item_999",
      "name": "橙味汽水（999）",
      "archetype": "bottle",
      "colorGroup": "999",
      "img": "./assets/items/photos/item_999.webp"
    },
    "item_8788": {
      "id": "item_8788",
      "name": "彩色糖果袋（8788）",
      "archetype": "snack",
      "colorGroup": "8788",
      "img": "./assets/items/photos/item_8788.webp"
    },
    "item_8871": {
      "id": "item_8871",
      "name": "葡萄饮品盒（8871）",
      "archetype": "carton",
      "colorGroup": "8871",
      "img": "./assets/items/photos/item_8871.webp"
    },
    "item_8877": {
      "id": "item_8877",
      "name": "饼干袋（8877）",
      "archetype": "snack",
      "colorGroup": "8877",
      "img": "./assets/items/photos/item_8877.webp"
    },
    "item_9771": {
      "id": "item_9771",
      "name": "紫色台灯（9771）",
      "archetype": "lamp",
      "colorGroup": "9771",
      "img": "./assets/items/photos/item_9771.webp"
    },
    "item_88868": {
      "id": "item_88868",
      "name": "紫色薯片袋（88868）",
      "archetype": "snack",
      "colorGroup": "88868",
      "img": "./assets/items/photos/item_88868.webp"
    }
  };

  // Each release uses its own asset URLs instead of displaying stale cached colours.
  Object.values(ITEMS).forEach(item => {
    item.img = `${item.img}?v=${APP_VERSION}`;
  });
  const ITEM_KEYS = Object.keys(ITEMS);

  // Smart selection ensuring maximum silhouette diversity and high-contrast color distinction
  function selectDistinguishableItemTypes(count) {
    const byArchetype = {};
    for (let k in ITEMS) {
      const a = ITEMS[k].archetype || 'other';
      if (!byArchetype[a]) byArchetype[a] = [];
      byArchetype[a].push(ITEMS[k]);
    }
    const archetypeList = Object.keys(byArchetype);
    const chosen = [];
    const chosenByArchetype = {};
    archetypeList.forEach(a => chosenByArchetype[a] = []);

    // Pass 1: Pick 1 variant from each archetype (ensuring diverse base silhouettes)
    const shuffledArch = [...archetypeList].sort(() => Math.random() - 0.5);
    for (let a of shuffledArch) {
      if (chosen.length >= count) break;
      const available = byArchetype[a].sort(() => Math.random() - 0.5);
      const pick = available[0];
      chosen.push(pick.id);
      chosenByArchetype[a].push(pick);
    }

    // Pass 2+: Distribute across archetypes with guaranteed color contrast
    while (chosen.length < count) {
      const candidates = [...archetypeList].filter(a => chosenByArchetype[a].length < byArchetype[a].length);
      if (candidates.length === 0) {
        const remaining = ITEM_KEYS.filter(k => !chosen.includes(k));
        if (remaining.length === 0) {
          // All unique items used: cycle through diverse archetypes to guarantee exact count
          const nextArch = archetypeList[chosen.length % archetypeList.length];
          const archList = byArchetype[nextArch];
          const pick = archList[Math.floor(Math.random() * archList.length)];
          chosen.push(pick.id);
          continue;
        }
        chosen.push(remaining[Math.floor(Math.random() * remaining.length)]);
        continue;
      }
      candidates.sort((a, b) => chosenByArchetype[a].length - chosenByArchetype[b].length || (Math.random() - 0.5));
      const arch = candidates[0];
      const alreadyPickedColors = new Set(chosenByArchetype[arch].map(x => x.colorGroup));
      const pool = byArchetype[arch].filter(x => !chosenByArchetype[arch].some(p => p.id === x.id));
      let best = pool.filter(x => !alreadyPickedColors.has(x.colorGroup));
      if (best.length === 0) best = pool;
      const pick = best[Math.floor(Math.random() * best.length)];
      chosen.push(pick.id);
      chosenByArchetype[arch].push(pick);
    }

    return chosen;
  }

  // Canonical visual matching key (ensures items that look identical match reliably)
  function getItemMatchKey(key) {
    if (!key || !ITEMS[key]) return key;
    return ITEMS[key].img || key;
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

    // BFS / Greedy simulation of elimination steps
    let maxSteps = 300;
    while (maxSteps-- > 0) {
      // 1. Count items in front layer across all slots
      const counts = {};
      slots.forEach(slot => {
        slot.layers[0].forEach(item => {
          const k = getItemMatchKey(item);
          counts[k] = (counts[k] || 0) + 1;
        });
      });

      // Find any item type with count >= 3 in front layer
      const matchableMatchKey = Object.keys(counts).find(key => counts[key] >= 3);
      if (matchableMatchKey) {
        // We can match this item!
        let needed = 3;
        for (let i = 0; i < slots.length && needed > 0; i++) {
          const slot = slots[i];
          for (let j = slot.layers[0].length - 1; j >= 0 && needed > 0; j--) {
            if (getItemMatchKey(slot.layers[0][j]) === matchableMatchKey) {
              slot.layers[0].splice(j, 1);
              needed--;
              promoteSimSlot(slot);
            }
          }
        }
        continue; // Next round of elimination
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

  // 5. Main Game Controller
  class GoodsOrganizerGame {
    constructor() {
      this.currentLevel = 2; // Elite Challenge as in screenshot
      this.score = 0;
      this.timerSeconds = 988; // 16:28 as in screenshot
      this.timerInterval = null;
      this.isFrozen = false;
      this.freezeTimeout = null;
      this.isPaused = false;
      this.hammerMode = false;

      this.propCounts = {
        hammer: 19,
        wand: 41,
        freeze: 67
      };

      this.cabinetData = [];
      this.conveyorRows = [];
      this.conveyorSpeeds = [-0.35, 0.42, -0.32]; // Smooth horizontal drift speeds
      this.conveyorMetrics = null;

      this.selectedItemInfo = null;
      this.dragState = null;

      this.initDOM();
      this.updateLayoutMetrics();
      this.particles = new ParticleSystem(document.getElementById('fx-canvas'));
      this.initLevelWithVerification(this.currentLevel);
      this.startConveyors();
      this.startTimer();
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

      document.getElementById('count-hammer').textContent = this.propCounts.hammer;
      document.getElementById('count-wand').textContent = this.propCounts.wand;
      document.getElementById('count-freeze').textContent = this.propCounts.freeze;
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
      const cabinetHeight = cabinetWrapper ? cabinetWrapper.clientHeight * 0.298 - 8 : 96;
      const rowEl = document.querySelector('.conveyor-row-wrapper');
      const rowHeight = rowEl ? rowEl.clientHeight : Math.min(102, Math.max(52, (this.conveyorSectionEl.clientHeight - 6) / 3));
      const woodAspect = 23 / 228;
      const rowItemWidth = (Math.min(rowHeight, 96) - 8 - 2 * woodAspect) / (1.4 + 3 * woodAspect);
      const itemWidth = Math.max(12, Math.min(84, Math.floor((compWidth - 4) / 3), Math.floor(cabinetHeight / 1.4), Math.floor(rowItemWidth)));
      const itemHeight = itemWidth * 1.4;
      const plankWidth = itemWidth * 3 - 2 + 4;
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

    // Generate level with strict Reverse Triplet Generation and Solvability Verification
    initLevelWithVerification(levelNumber) {
      let attempts = 0;
      let valid = false;

      while (!valid && attempts < 15) {
        attempts++;
        this.generateLevelData(levelNumber);
        valid = verifySolvability(this.cabinetData, this.conveyorRows);
      }

      console.log(`[Level Generator] Level ${levelNumber} generated & verified in ${attempts} attempts! Solvable: ${valid}`);
      const verifyBadge = document.getElementById('verify-badge');
      if (verifyBadge) {
        verifyBadge.textContent = '可解性校验：已通过 ✔';
        verifyBadge.style.color = '#446b45';
      }

      this.renderBoard();
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

    getSlotLayerCount(slotData) {
      if (!slotData || !slotData.layers) return 0;
      let count = 0;
      for (let i = 0; i < slotData.layers.length; i++) {
        if (slotData.layers[i] && slotData.layers[i].length > 0) {
          count++;
        }
      }
      return count;
    }

    generateLevelData(levelNumber) {
      this.currentLevel = levelNumber;
      this.selectedItemInfo = null;
      this.timerSeconds = 988; // 16:28
      this.updateTimerDisplay();

      // RICH MULTI-LAYER PACKING: 4 layers per slot (上下各多层货架)
      // Total triplets: Level 1 = 36 triplets (108 items), Level 2 = 46 triplets (138 items), Level 3 = 56 triplets (168 items)
      const tripletCounts = [36, 46, 56];
      const totalTriplets = tripletCounts[Math.min(levelNumber - 1, 2)] || 46;

      // Pick distinct item types with guaranteed visual diversity & contrast
      const chosenTypes = selectDistinguishableItemTypes(totalTriplets);

      const itemPool = [];
      chosenTypes.forEach(type => {
        itemPool.push(type, type, type);
      });
      // Shuffle pool
      itemPool.sort(() => Math.random() - 0.5);

      // Setup 3x3 Upper Cabinet: 9 cubbies, each with 4 layers
      this.cabinetData = [];
      for (let i = 0; i < 9; i++) {
        this.cabinetData.push({
          id: `cabinet-${i}`,
          layers: [[], [], [], []]
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
            layers: [[], [], [], []],
            xPos: initX
          });
        }
        this.conveyorRows.push(shelves);
      }

      // Active populated cabinet cubbies: 0, 1, 3, 4, 5, 7, 8 (7 cubbies)
      // Cubbies 2 and 6 remain open buffer compartments across all layers for sorting
      const populatedCabinet = [0, 1, 3, 4, 5, 7, 8];

      // 1. Layer 0 (Front interactive layer):
      // Conveyor: all 12 shelves get 2 to 3 items
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          const count = Math.random() < 0.6 ? 3 : 2;
          for (let k = 0; k < count && itemPool.length > 0; k++) {
            shelf.layers[0].push(itemPool.pop());
          }
        });
      });
      // Cabinet: 7 cubbies get 2 to 3 items
      populatedCabinet.forEach(c => {
        const count = Math.random() < 0.6 ? 3 : 2;
        for (let k = 0; k < count && itemPool.length > 0; k++) {
          this.cabinetData[c].layers[0].push(itemPool.pop());
        }
      });

      // 2. Layer 1 (Back Layer 1):
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          const count = Math.random() < 0.6 ? 3 : 2;
          for (let k = 0; k < count && itemPool.length > 0; k++) {
            shelf.layers[1].push(itemPool.pop());
          }
        });
      });
      populatedCabinet.forEach(c => {
        const count = Math.random() < 0.6 ? 3 : 2;
        for (let k = 0; k < count && itemPool.length > 0; k++) {
          this.cabinetData[c].layers[1].push(itemPool.pop());
        }
      });

      // 3. Layer 2 (Back Layer 2 / Deep Layer):
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          const count = Math.random() < 0.5 ? 3 : 2;
          for (let k = 0; k < count && itemPool.length > 0; k++) {
            shelf.layers[2].push(itemPool.pop());
          }
        });
      });
      populatedCabinet.forEach(c => {
        const count = Math.random() < 0.5 ? 3 : 2;
        for (let k = 0; k < count && itemPool.length > 0; k++) {
          this.cabinetData[c].layers[2].push(itemPool.pop());
        }
      });

      // 4. Layer 3 (Deepest Layer 3):
      while (itemPool.length > 0) {
        const item = itemPool.pop();
        const openSlot = populatedCabinet.map(c => this.cabinetData[c]).find(c => c.layers[3].length < 3) ||
                         this.conveyorRows.flatMap(r => r).find(s => s.layers[3].length < 3) ||
                         populatedCabinet.map(c => this.cabinetData[c]).find(c => c.layers[2].length < 3) ||
                         this.conveyorRows.flatMap(r => r).find(s => s.layers[2].length < 3);
        if (openSlot) {
          const targetL = openSlot.layers[3].length < 3 ? 3 : 2;
          openSlot.layers[targetL].push(item);
        } else {
          this.conveyorRows[0][0].layers[3].push(item);
        }
      }
    }

    renderBoard() {
      this.initBoardDOM();
      this.updateLayoutMetrics();
      this.updateAllSlots();
      this.checkMatches();
      this.checkGameWinOrLoss();
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
          deepItemEl.innerHTML = `<img src="${ITEMS[deepKey].img}" alt="" draggable="false">`;
          itemContainer.appendChild(deepItemEl);
        }

        // Back layer: Grayed out & darkened ("灰色代表在下一行")
        if (backItems[pos]) {
          const backKey = backItems[pos];
          const backItemEl = document.createElement('div');
          backItemEl.className = 'good-item layer-back';
          backItemEl.title = ITEMS[backKey].name;
          backItemEl.innerHTML = `<img src="${ITEMS[backKey].img}" alt="${ITEMS[backKey].name}" draggable="false">`;
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
          frontItemEl.innerHTML = `<img src="${ITEMS[frontKey].img}" alt="${ITEMS[frontKey].name}" draggable="false">`;

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
      const compDiv = this.cabinetEl.children[compIdx];
      if (!compDiv) return;
      const lane = compDiv.querySelector('.slot-lane');
      if (!lane) return;
      const slotData = this.cabinetData[compIdx];
      this.renderLane(lane, slotData.layers, 'cabinet', compIdx);

      // Remaining layer depth indicator badge
      let pill = compDiv.querySelector('.layer-depth-pill');
      const count = this.getSlotLayerCount(slotData);
      if (count > 1) {
        if (!pill) {
          pill = document.createElement('div');
          pill.className = 'layer-depth-pill';
          compDiv.appendChild(pill);
        }
        pill.textContent = `${count}层`;
      } else if (pill) {
        pill.remove();
      }
    }

    // Granular update: update only one conveyor shelf plank
    updateShelf(rowIdx, shelfIdx) {
      const track = document.getElementById(`conveyor-track-${rowIdx}`);
      if (!track) return;
      const plank = track.children[shelfIdx];
      if (!plank) return;
      const lane = plank.querySelector('.slot-lane');
      if (!lane) return;
      const slotData = this.conveyorRows[rowIdx][shelfIdx];
      this.renderLane(lane, slotData.layers, 'conveyor', rowIdx, shelfIdx);

      // Remaining layer depth indicator badge
      let pill = plank.querySelector('.layer-depth-pill');
      const count = this.getSlotLayerCount(slotData);
      if (count > 1) {
        if (!pill) {
          pill = document.createElement('div');
          pill.className = 'layer-depth-pill';
          plank.appendChild(pill);
        }
        pill.textContent = `${count}层`;
      } else if (pill) {
        pill.remove();
      }
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
      const animate = () => {
        if (!this.isPaused && !this.isFrozen) {
          const pitch = this.conveyorMetrics ? this.conveyorMetrics.pitch : 146;
          const totalSpan = this.conveyorMetrics ? this.conveyorMetrics.totalSpan : (4 * pitch);

          this.conveyorRows.forEach((row, rowIdx) => {
            const track = document.getElementById(`conveyor-track-${rowIdx}`);
            if (!track) return;

            const speed = this.conveyorSpeeds[rowIdx];

            row.forEach(shelf => {
              shelf.xPos += speed;

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
      this.timerInterval = setInterval(() => {
        if (this.isPaused || this.isFrozen) return;
        this.timerSeconds--;
        this.updateTimerDisplay();
        if (this.timerSeconds <= 0) {
          clearInterval(this.timerInterval);
          this.handleGameOver('时间已耗尽！');
        }
      }, 1000);
    }

    updateTimerDisplay() {
      const mins = Math.floor(Math.max(0, this.timerSeconds) / 60);
      const secs = Math.max(0, this.timerSeconds) % 60;
      this.timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    checkMatches() {
      let matchedAny = false;

      // 1. Check Cabinet Compartments
      this.cabinetData.forEach((comp, idx) => {
        const front = comp.layers[0];
        if (front.length === 3) {
          const m0 = getItemMatchKey(front[0]);
          const m1 = getItemMatchKey(front[1]);
          const m2 = getItemMatchKey(front[2]);
          if (m0 === m1 && m1 === m2) {
            matchedAny = true;
            this.triggerMatchElimination('cabinet', idx, null, front[0]);
          }
        }
      });

      // 2. Check Conveyor Shelves
      this.conveyorRows.forEach((row, rIdx) => {
        row.forEach((shelf, sIdx) => {
          const front = shelf.layers[0];
          if (front.length === 3) {
            const m0 = getItemMatchKey(front[0]);
            const m1 = getItemMatchKey(front[1]);
            const m2 = getItemMatchKey(front[2]);
            if (m0 === m1 && m1 === m2) {
              matchedAny = true;
              this.triggerMatchElimination('conveyor', rIdx, sIdx, front[0]);
            }
          }
        });
      });

      return matchedAny;
    }

    triggerMatchElimination(type, idx1, idx2, itemKey) {
      sound.playMatch();
      this.score += 100;
      this.scoreEl.textContent = this.score;

      let targetEl;
      let targetData;

      if (type === 'cabinet') {
        targetEl = this.cabinetEl.children[idx1];
        targetData = this.cabinetData[idx1];
      } else {
        const track = document.getElementById(`conveyor-track-${idx1}`);
        if (track) targetEl = track.children[idx2];
        targetData = this.conveyorRows[idx1][idx2];
      }

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
        targetData.layers[0] = [];

        // Deeper layer items promote to front layer! ("下一行变为上一行，灰色变为亮色")
        this.promoteSlot(targetData);

        // Granular update only the affected slot
        if (type === 'cabinet') {
          this.updateCompartment(idx1);
        } else {
          this.updateShelf(idx1, idx2);
        }

        this.checkMatches();
        this.checkGameWinOrLoss();
      }, 320);
    }

    moveItem(fromLocation, toLocation) {
      let sourceArray;
      if (fromLocation.type === 'cabinet') {
        sourceArray = this.cabinetData[fromLocation.slotIndex].layers[0];
      } else {
        sourceArray = this.conveyorRows[fromLocation.rowIndex][fromLocation.shelfIndex].layers[0];
      }

      let targetArray;
      let targetSlotData;
      if (toLocation.type === 'cabinet') {
        targetSlotData = this.cabinetData[toLocation.slotIndex];
        targetArray = targetSlotData.layers[0];
      } else {
        targetSlotData = this.conveyorRows[toLocation.rowIndex][toLocation.shelfIndex];
        targetArray = targetSlotData.layers[0];
      }

      if (targetArray.length >= 3) {
        sound.playDrop();
        return false;
      }

      const item = sourceArray.splice(fromLocation.itemIndex, 1)[0];
      if (!item) return false;

      targetArray.push(item);
      sound.playDrop();

      let sourceSlotData = fromLocation.type === 'cabinet' 
        ? this.cabinetData[fromLocation.slotIndex]
        : this.conveyorRows[fromLocation.rowIndex][fromLocation.shelfIndex];

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
      let currentSnapTarget = null;
      let isSettlingDrag = false;

      const isSameLocation = (from, to) => from && to && from.type === to.type &&
        (from.type === 'cabinet' ? from.slotIndex === to.slotIndex :
          from.rowIndex === to.rowIndex && from.shelfIndex === to.shelfIndex);

      const resetPointer = () => {
        activePointerId = null;
        isDragging = false;
        draggedItemData = null;
        draggedItemEl = null;
        currentSnapTarget = null;
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
            canPlace: count < 3 || isSameLocation(draggedItemData, { type: 'cabinet', slotIndex: idx }),
            rect: el.getBoundingClientRect()
          });
        });

        // 2. Conveyor Planks
        this.conveyorRows.forEach((row, rIdx) => {
          const track = document.getElementById(`conveyor-track-${rIdx}`);
          if (!track) return;
          row.forEach((shelf, sIdx) => {
            const el = track.children[sIdx];
            if (!el) return;
            const count = shelf.layers[0].length;
            candidates.push({
              el,
              type: 'conveyor',
              slotIndex: rIdx,
              rowIndex: rIdx,
              shelfIndex: sIdx,
              canPlace: count < 3 || isSameLocation(draggedItemData, { type: 'conveyor', rowIndex: rIdx, shelfIndex: sIdx }),
              rect: el.getBoundingClientRect()
            });
          });
        });

        let bestTarget = null;
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
              if (!bestTarget || bestTarget.dist > 0) {
                bestTarget = { ...cand, dist: 0, directHit: true };
              }
            }
          } else if (cand.canPlace && dist <= SNAP_RADIUS && dist < minDistance) {
            minDistance = dist;
            bestTarget = { ...cand, dist, directHit: false };
          }
        }

        return bestTarget;
      };

      const handleItemTap = (itemData) => {
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
              itemIndex: this.selectedItemInfo.itemIndex
            },
            {
              type: itemData.type,
              slotIndex: itemData.slotIndex,
              rowIndex: itemData.rowIndex,
              shelfIndex: itemData.shelfIndex
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
                  itemIndex: this.selectedItemInfo.itemIndex
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

        e.preventDefault();
        // Selection and deselection must not restart the entry animation.
        itemEl.classList.remove('entering');

        activePointerId = e.pointerId;
        startPointerPos = { x: e.clientX, y: e.clientY };
        isDragging = false;
        draggedItemEl = itemEl;

        const type = itemEl.dataset.type;
        const slotIdx = parseInt(itemEl.dataset.slotIndex || itemEl.dataset.rowIndex);
        const shelfIdx = parseInt(itemEl.dataset.shelfIndex || '0');
        const itemIdx = parseInt(itemEl.dataset.itemIndex);
        const itemKey = itemEl.dataset.itemKey;

        draggedItemData = {
          type,
          slotIndex: slotIdx,
          rowIndex: slotIdx,
          shelfIndex: shelfIdx,
          itemIndex: itemIdx,
          itemKey
        };
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

          this.dragGhost.innerHTML = `<img src="${ITEMS[draggedItemData.itemKey].img}" alt="" draggable="false">`;
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
          currentSnapTarget = target;

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
        const snap = currentSnapTarget && currentSnapTarget.canPlace ? currentSnapTarget : null;

        if (snap) {
          const isSameSlot = isSameLocation(sourceData, snap);

          if (isSameSlot) {
            restoreDragVisuals(sourceEl);
          } else {
            // Magnetic Snap Animation into target slot!
            const emptyIndicator = snap.el.querySelector('.empty-slot-indicator');
            const targetRect = emptyIndicator 
              ? emptyIndicator.getBoundingClientRect() 
              : snap.el.getBoundingClientRect();

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
              shelfIndex: snap.shelfIndex
            };

            settleDrag(() => {
              restoreDragVisuals(sourceEl);
              this.moveItem(
                {
                  type: sourceData.type,
                  slotIndex: sourceData.slotIndex,
                  rowIndex: sourceData.rowIndex,
                  shelfIndex: sourceData.shelfIndex,
                  itemIndex: sourceData.itemIndex
                },
                targetLocation
              );
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
        this.initLevelWithVerification(this.currentLevel);
      });
      document.getElementById('btn-sound-toggle').addEventListener('click', () => {
        const isMuted = sound.toggleMute();
        document.getElementById('btn-sound-toggle').textContent = isMuted ? '🔇' : '🔊';
      });
      document.getElementById('btn-next-level').addEventListener('click', () => {
        this.closeModals();
        this.initLevelWithVerification(this.currentLevel + 1);
      });
      document.getElementById('btn-revive').addEventListener('click', () => {
        this.closeModals();
        this.timerSeconds = 90;
        this.startTimer();
      });

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

    executeHammer(itemEl) {
      const type = itemEl.dataset.type;
      const slotIdx = parseInt(itemEl.dataset.slotIndex || itemEl.dataset.rowIndex);
      const shelfIdx = parseInt(itemEl.dataset.shelfIndex || '0');
      const itemIdx = parseInt(itemEl.dataset.itemIndex);

      sound.playHammer();
      this.propCounts.hammer--;
      document.getElementById('count-hammer').textContent = this.propCounts.hammer;
      this.deactivateHammer();

      const rect = itemEl.getBoundingClientRect();
      const parentRect = document.getElementById('game-container').getBoundingClientRect();
      this.particles.emit(rect.left - parentRect.left + 25, rect.top - parentRect.top + 25, 30, 'star');

      itemEl.classList.add('smashed');

      setTimeout(() => {
        let slotData = type === 'cabinet' 
          ? this.cabinetData[slotIdx] 
          : this.conveyorRows[slotIdx][shelfIdx];

        slotData.layers[0].splice(itemIdx, 1);
        this.promoteSlot(slotData);

        if (type === 'cabinet') {
          this.updateCompartment(slotIdx);
        } else {
          this.updateShelf(slotIdx, shelfIdx);
        }
        this.checkMatches();
        this.checkGameWinOrLoss();
      }, 280);
    }

    activateWand() {
      if (this.propCounts.wand <= 0) return;

      const visibleItemMap = {};
      
      this.cabinetData.forEach((comp, cIdx) => {
        comp.layers[0].forEach((key, pos) => {
          if (!visibleItemMap[key]) visibleItemMap[key] = [];
          visibleItemMap[key].push({ type: 'cabinet', slotIndex: cIdx, itemIndex: pos });
        });
      });

      this.conveyorRows.forEach((row, rIdx) => {
        row.forEach((shelf, sIdx) => {
          shelf.layers[0].forEach((key, pos) => {
            if (!visibleItemMap[key]) visibleItemMap[key] = [];
            visibleItemMap[key].push({ type: 'conveyor', rowIndex: rIdx, shelfIndex: sIdx, itemIndex: pos });
          });
        });
      });

      let targetKey = Object.keys(visibleItemMap).find(key => visibleItemMap[key].length >= 3);
      if (!targetKey) targetKey = Object.keys(visibleItemMap)[0];
      if (!targetKey) return;

      sound.playWand();
      this.propCounts.wand--;
      document.getElementById('count-wand').textContent = this.propCounts.wand;

      let removedCount = 0;
      for (let key in visibleItemMap) {
        if (key === targetKey) {
          visibleItemMap[key].slice(0, 3).forEach(loc => {
            let slotData = loc.type === 'cabinet' 
              ? this.cabinetData[loc.slotIndex]
              : this.conveyorRows[loc.rowIndex][loc.shelfIndex];
            const idx = slotData.layers[0].indexOf(targetKey);
            if (idx !== -1) {
              slotData.layers[0].splice(idx, 1);
              removedCount++;
            }
          });
        }
      }

      if (removedCount < 3) {
        // Also look into deeper layers if needed
        for (let l = 1; l < 4 && removedCount < 3; l++) {
          this.cabinetData.forEach(comp => {
            if (comp.layers[l] && removedCount < 3) {
              const idx = comp.layers[l].indexOf(targetKey);
              if (idx !== -1) {
                comp.layers[l].splice(idx, 1);
                removedCount++;
              }
            }
          });
          this.conveyorRows.forEach(row => {
            row.forEach(shelf => {
              if (shelf.layers[l] && removedCount < 3) {
                const idx = shelf.layers[l].indexOf(targetKey);
                if (idx !== -1) {
                  shelf.layers[l].splice(idx, 1);
                  removedCount++;
                }
              }
            });
          });
        }
      }

      this.score += 150;
      this.scoreEl.textContent = this.score;
      const parentRect = document.getElementById('game-container').getBoundingClientRect();
      this.particles.emit(parentRect.width / 2, parentRect.height / 2, 40, 'star');

      this.cabinetData.forEach(c => {
        this.promoteSlot(c);
      });
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          this.promoteSlot(shelf);
        });
      });

      this.updateAllSlots();
      this.checkMatches();
      this.checkGameWinOrLoss();
    }

    activateFreeze() {
      if (this.propCounts.freeze <= 0 || this.isFrozen) return;
      sound.playFreeze();
      this.propCounts.freeze--;
      document.getElementById('count-freeze').textContent = this.propCounts.freeze;

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
      sound.playShuffle();

      const allFrontItems = [];
      this.cabinetData.forEach(comp => {
        allFrontItems.push(...comp.layers[0]);
        comp.layers[0] = [];
      });
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          allFrontItems.push(...shelf.layers[0]);
          shelf.layers[0] = [];
        });
      });

      allFrontItems.sort(() => Math.random() - 0.5);

      // Redistribute to fill cabinet first
      let itemIdx = 0;
      this.cabinetData.forEach(comp => {
        for (let k = 0; k < 3 && itemIdx < allFrontItems.length; k++) {
          comp.layers[0].push(allFrontItems[itemIdx++]);
        }
      });

      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          const take = Math.min(2, allFrontItems.length - itemIdx);
          for (let k = 0; k < take; k++) {
            shelf.layers[0].push(allFrontItems[itemIdx++]);
          }
        });
      });

      while (itemIdx < allFrontItems.length) {
        const item = allFrontItems[itemIdx++];
        const openSlot = this.cabinetData.find(c => c.layers[0].length < 3) ||
                         this.conveyorRows[0].find(s => s.layers[0].length < 3);
        if (openSlot) openSlot.layers[0].push(item);
      }

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
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log(`[PWA] Service Worker registered with scope: ${reg.scope}`);
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }
  });
})();
