import { Category, PortfolioItem } from '../types';

/**
 * ==================================================================================
 *  USER GUIDE: HOW TO REPLACE IMAGES AND VIDEOS
 * ==================================================================================
 * 
 * 1. Place your image files in a 'public/images' folder (create it if it doesn't exist).
 * 2. Replace the placeholder URLs (https://picsum.photos/...) with your file paths.
 *    Example: change "https://picsum.photos/800/600" to "/images/brand/project1.jpg"
 * 
 * 3. 'cover': The image shown on the main list.
 * 4. 'images': An array of images shown in the popup carousel.
 * 5. 'videoUrl': Optional. If present, shows a video player.
 */

export const portfolioItems: PortfolioItem[] = [
  // --- Brand Design (品牌全案) ---
  {
    id: 'brand-1',
    title: '节气灵兽 (Spirits of Solar Terms)',
    category: Category.BRAND,
    client: '学院奖、织采宫',
    description: '山海经 X 二十四节气 IP全案设计。通过AI辅助设计，将传统文化与现代审美结合。',
    awards: ['美国设计奖', '法国设计奖', '缪斯设计奖'],
    tags: ['IP全案', '包装设计', '文创周边'],
    cover: './images//Allinsight-品牌全案_01.png', // 替换为: PDF Page 2 主图
    images: [
      './images//Allinsight-品牌全案_02.jpg', // 替换为: PDF Page 3 (全家福)
      './images//Allinsight-品牌全案_03.jpg', // 替换为: PDF Page 5 (色卡展示)
      './images//Allinsight-品牌全案_04.jpg', // 替换为: PDF Page 6 (产品包装)
      './images//Allinsight-品牌全案_05.jpg', // 替换为: PDF Page 7 (模型渲染)
      './images//Allinsight-品牌全案_06.jpg', // 替换为: PDF Page 7 (模型渲染)
      './images//Allinsight-品牌全案_07.jpg', // 替换为: PDF Page 7 (模型渲染)
   ]
  },
  {
    id: 'brand-2',
    title: '创小星 (Chuang Xiaoxing)',
    category: Category.BRAND,
    client: '广告人集团',
    description: '青春好物节品牌IP全案。包含LOGO设计、IP形象建模及延展文创。',
    tags: ['LOGO', 'IP形象', '文创'],
    cover: './images//Allinsight-品牌全案_08.png', // 替换为: PDF Page 8 左侧
    images: [
      './images//Allinsight-品牌全案_09.jpg', // 替换为: PDF Page 8 右侧 (多色展示)
      './images//Allinsight-品牌全案_10.jpg', // 替换为: PDF Page 8 右侧 (多色展示)
      './images//Allinsight-品牌全案_11.jpg', // 替换为: PDF Page 8 右侧 (多色展示)
      './images//Allinsight-品牌全案_12.jpg', // 替换为: PDF Page 8 右侧 (多色展示)
      './images//Allinsight-品牌全案_13.jpg', // 替换为: PDF Page 8 右侧 (多色展示)
      './images//Allinsight-品牌全案_14.jpg', // 替换为: PDF Page 8 右侧 (多色展示)
      './images//Allinsight-品牌全案_15.jpg', // 替换为: PDF Page 8 右侧 (多色展示)
    ]
  },
  {
    id: 'brand-3',
    title: '傲娇小站 (Pride Station)',
    category: Category.BRAND,
    client: '津南区小站稻',
    description: '“躬身的希望，昂首的骄傲”。津南区特产小站稻的IP形象设计与文创落地。',
    tags: ['IP形象', '地方文旅', '3D打印'],
    cover: 'https://picsum.photos/800/600?random=6', // 替换为: PDF Page 13
    images: [
      'https://picsum.photos/1200/800?random=6', // 替换为: PDF Page 13
      'https://picsum.photos/1200/800?random=7', // 替换为: PDF Page 14 (三视图)
      'https://picsum.photos/1200/800?random=8', // 替换为: PDF Page 15 (应用场景)
    ]
  },
  {
    id: 'brand-4',
    title: '织采采 / 香香象',
    category: Category.BRAND,
    client: '武清区织采宫',
    description: '非遗文化IP化设计，结合盲盒包装与文创产品开发。',
    tags: ['IP形象', '包装设计', '非遗'],
    cover: 'https://picsum.photos/800/600?random=9', // 替换为: PDF Page 16
    images: [
      'https://picsum.photos/1200/800?random=9', // 替换为: PDF Page 16
      'https://picsum.photos/1200/800?random=10', // 替换为: PDF Page 17 (实物拍摄)
    ]
  },
  {
    id: 'brand-5',
    title: '金瑞 (Jinrui)',
    category: Category.BRAND,
    client: '天津市金街',
    description: '天津市金街IP征集设计一等奖作品。',
    awards: ['天津市金街IP征集一等奖'],
    tags: ['IP形象', '手办'],
    cover: 'https://picsum.photos/800/600?random=11', // 替换为: PDF Page 19
    images: [
      'https://picsum.photos/1200/800?random=11',
    ]
  },
  {
    id: 'brand-6',
    title: '大龙邮局 龙族IP',
    category: Category.BRAND,
    client: '和平区中国邮政',
    description: '大龙邮局专属IP形象设计及邮政周边文创。',
    tags: ['IP形象', '文创', '邮政'],
    cover: 'https://picsum.photos/800/600?random=12', // 替换为: PDF Page 24
    images: [
      'https://picsum.photos/1200/800?random=12',
      'https://picsum.photos/1200/800?random=13', // 替换为: PDF Page 25
    ]
  },

  // --- Video Production (视频制作) ---
  {
    id: 'video-1',
    title: '金皇酒店宣传视频',
    category: Category.VIDEO,
    client: '天津金皇房地产有限公司',
    description: '金皇酒店IP与实景结合的创意宣传视频。',
    tags: ['宣传视频', '实景合成'],
    cover: 'https://picsum.photos/800/600?random=20', // 替换为: PDF Page Video-2
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // 替换为实际视频文件
    images: ['https://picsum.photos/1200/800?random=20']
  },
  {
    id: 'video-2',
    title: '2024青春盛典',
    category: Category.VIDEO,
    client: '广告人集团',
    description: '创意星球学院奖颁奖典礼定制视频，大气磅礴的视觉呈现。',
    tags: ['颁奖典礼', '活动视频'],
    cover: 'https://picsum.photos/800/600?random=21', // 替换为: PDF Page Video-4
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', // 替换为实际视频文件
    images: ['https://picsum.photos/1200/800?random=21']
  },
  {
    id: 'video-3',
    title: '聊斋新语',
    category: Category.VIDEO,
    client: '自研',
    description: '基于AIGC生成的艺术风格化视频，重构聊斋志异的奇幻世界。',
    tags: ['AI视频', '艺术'],
    cover: 'https://picsum.photos/800/600?random=22', // 替换为: PDF Page Video-6
    images: ['https://picsum.photos/1200/800?random=22']
  },
  {
    id: 'video-4',
    title: '哪吒反诈之年报风云',
    category: Category.VIDEO,
    client: '津南区市场监管局',
    description: '荣获东方设计奖全国一等奖的公益普法视频，以哪吒形象进行反诈宣传。',
    awards: ['东方设计奖一等奖'],
    tags: ['公益视频', 'MG动画'],
    cover: 'https://picsum.photos/800/600?random=23', // 替换为: PDF Page Video-8
    images: ['https://picsum.photos/1200/800?random=23']
  },

  // --- Smart Training (智能培训) ---
  {
    id: 'training-1',
    title: 'Agent智能体定制与培训',
    category: Category.TRAINING,
    client: '江苏海洋大学、东方好创意等',
    description: '提供AIGC学习、智能体搭建、八小时定向设计挑战赛等专业培训服务。',
    tags: ['AI培训', 'Agent', '教育'],
    cover: 'https://picsum.photos/800/600?random=30', // 替换为: PDF Page Training-3
    images: [
      'https://picsum.photos/1200/800?random=30',
      'https://picsum.photos/1200/800?random=31', // 替换为: PDF Page Training-4
      'https://picsum.photos/1200/800?random=32', // 替换为: PDF Page Training-5 (课件展示)
    ]
  },
  {
    id: 'training-2',
    title: '中意师生共创AIGC电影',
    category: Category.TRAINING,
    client: '意大利约布斯学院',
    description: 'AIGC艺术设计培训，跨国合作项目 "Painted Skin Workshop"。',
    tags: ['国际交流', 'AI电影'],
    cover: 'https://picsum.photos/800/600?random=33', // 替换为: PDF Page Training-7
    images: ['https://picsum.photos/1200/800?random=33']
  },

  // --- Interactive Exhibition (交互展陈) ---
  {
    id: 'exhibit-1',
    title: 'AR沉浸式数字交互方案',
    category: Category.EXHIBITION,
    client: '河北区政府',
    description: '结合AR技术与实景雕塑，实现“名人复活”般的互动体验。',
    tags: ['AR', '交互设计', '数字展陈'],
    cover: 'https://picsum.photos/800/600?random=40', // 替换为: PDF Page Exhibit-2
    images: ['https://picsum.photos/1200/800?random=40']
  },
  {
    id: 'exhibit-2',
    title: 'AI+艺术思政协同创新中心',
    category: Category.EXHIBITION,
    client: '天津商务职业学院',
    description: '校园展陈设计，数字化互动大屏与实体展板的结合。',
    tags: ['展厅设计', '校园文化'],
    cover: 'https://picsum.photos/800/600?random=41', // 替换为: PDF Page Exhibit-3
    images: ['https://picsum.photos/1200/800?random=41']
  }
];