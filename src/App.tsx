import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, PenTool, Code2, Blocks, Sparkles, Box, Bot, Type, Layers, Flame, TrendingUp, Users, X, Search, Phone, Play } from 'lucide-react';

type CursorVariant = 'default' | 'hover' | 'contentHover';
type CursorSetter = React.Dispatch<React.SetStateAction<CursorVariant>>;
type HeatPlatform = { name: string; heat: string };
type CharacterData = {
  name: string;
  role: string;
  image: string;
  heatValue: number;
  heatDisplay: string;
  desc: string;
  intro: string;
  platforms: HeatPlatform[];
};
type OrbitStyle = React.CSSProperties & {
  '--orbit-duration': string;
  '--orbit-tilt'?: string;
};

// --- Data ---
const PROJECTS = [
  {
    id: 'genesis',
    navTitle: 'AIGC Creation',
    navTitleZh: 'AIGC创作',
    title: 'AIGC Creation',
    titleZh: 'AIGC创作',
    subtitle: 'Digital Artisan & Creative Coder',
    subtitleZh: '数字工匠 & 创意编程',
    cover: '/11.webp',
    role: 'Creator',
    year: '2026',
    tech: ['Design', 'Code', 'AI'],
    description: '或许，我也可以成为一个创作者，把我脑子里天马行空的想法一一实现',
    videos: [
      { title: '中式梦核', titleEn: 'Chinese Dreamcore', url: '/c1-web.mp4?v=audio1', poster: '/c1-poster.webp', platform: 'Local', views: '120万播放' },
      { title: '美丽新世界', titleEn: 'Brave New World', url: '/c2-web.mp4', poster: '/c2-poster.webp', platform: 'Local', views: '85万播放' },
      { title: '玻璃山', titleEn: 'Glass Mountain', url: '/c3-web.mp4', poster: '/c3-poster.webp', platform: 'Local', views: '42万播放' },
      { title: '一觉醒来全球降智', titleEn: 'Global IQ Drop Overnight', url: '/c4-web.mp4', poster: '/c4-poster.webp', platform: 'Local', views: '210万播放' }
    ],
    characters: [
      { name: '江烬', role: '深情霸总', image: '/jz.webp', heatValue: 82000, heatDisplay: '8.2w', desc: '冷峻外表下藏着极致的深情。', intro: '作为跨国集团的掌舵人，江烬习惯了掌控一切。但在冷峻不近人情的外表下，隐藏着对唯一光芒的偏执与深情。', platforms: [{ name: '热度值', heat: '8.2w' }] },
      { name: '谢燃', role: '桀骜少年', image: '/xr.webp', heatValue: 90000, heatDisplay: '9.0w', desc: '如烈火般炽热，永不服输。', intro: '天才电竞选手，赛场上的烈火。桀骜不驯，拒绝一切规则与束缚，但内心始终保留赤诚。', platforms: [{ name: '热度值', heat: '9.0w' }] },
      { name: '陆砚深', role: '温润如玉', image: '/lys.webp', heatValue: 92000, heatDisplay: '9.2w', desc: '谦谦君子，温润如玉。', intro: '温文尔雅的大学教授，学术界的泰斗。他总是带着温和的笑容，用最理性的声音说出最动人的情话。', platforms: [{ name: '热度值', heat: '9.2w' }] },
      { name: '沈知珩', role: '高冷教授', image: '/szy.webp', heatValue: 93000, heatDisplay: '9.3w', desc: '禁欲系的天才，理性至上。', intro: '顶尖外科医生，被誉为上帝之手。极度理智、冷静，却无法解析自己逐渐失控的心跳。', platforms: [{ name: '热度值', heat: '9.3w' }] }
    ]
  },
  {
    id: 'StarDeam',
    navTitle: 'StarDeam',
    navTitleZh: '星梦之路',
    title: 'StarDeam',
    titleZh: '星梦之路',
    subtitle: 'AI Entertainment Interactive Game',
    subtitleZh: 'AI 娱乐圈互动文字游戏',
    betaUsers: '内测用户 100+',
    cover: '/S1.webp',
    role: '产品负责人',
    year: '2024',
    tech: ['大模型提示词工程', '产品策略', '游戏化设计'],
    description: '从无名新人到聚光灯中心，你要在训练、通告、舆论与人际关系之间做出选择，亲手塑造一条属于自己的成名轨迹。',
    synopsisImage: '/S1.webp',
    link: 'https://stardeam.netlify.app/?ref=watcha.cn',
    linkText: '进入 StarDream',
    characters: [
      { name: '顾星泽', role: '顶流偶像', image: '/jz.webp', heatValue: 95000, heatDisplay: '9.5w', desc: '站在聚光灯下的完美偶像，内心却渴望真实的触碰。', intro: '国民级顶流偶像，拥有完美的容颜和无可挑剔的舞台表现力。', platforms: [{ name: '粉丝数', heat: '2500w' }] },
      { name: '秦楚', role: '金牌经纪人', image: '/lys.webp', heatValue: 88000, heatDisplay: '8.8w', desc: '手段雷厉风行，只看重利益与结果的操盘手。', intro: '娱乐圈令人闻风丧胆的金牌经纪人，深谙名利场的生存法则。', platforms: [{ name: '掌控力', heat: 'Max' }] },
      { name: '苏夏', role: '天才导演', image: '/szy.webp', heatValue: 82000, heatDisplay: '8.2w', desc: '偏执的艺术疯子，只为寻找完美的缪斯。', intro: '才华横溢却性格偏执的青年导演，始终在寻找能完美诠释他美学理想的缪斯。', platforms: [{ name: '获奖数', heat: '12' }] }
    ],
    features: [
      {
        title: '起步 / Identity Onboarding',
        image: '/S1.webp',
        gameplayTitle: '从进入游戏，变成进入身份',
        gameplay: [
          '《星梦之路》的开场并不急于把玩家推进主线，而是先通过建档、形象设定与初始身份选择，完成一次“进入娱乐圈”的心理切换。玩家不是从旁观者位置开始读剧情，而是在第一分钟就被要求回答：将以什么样的身份踏进这个行业。',
          '这一步的价值，不只是建立基础信息，而是把代入感前置。只有当身份先被确认，后续的剧情判断、职业选择与关系推进才会真正带有个人重量。'
        ],
        techTitle: '初始化不仅是表单，而是叙事入口',
        techImages: ['/s2.webp', '/s3.webp'],
        tech: [
          '起步模块采用前端主驱动的初始化方式，将登录状态、角色基础信息、玩家画像与形象设定写入统一运行态。这样后续剧情、角色关系、成长反馈和任务推进都能从同一个身份起点展开，避免建档与主玩法脱节。',
          '这使“进入游戏”不再只是跳转到主界面，而是完成一次完整的系统初始化：角色是谁、从哪里开始、被如何识别，都在这一层被确定下来。'
        ]
      },
      {
        title: '名利场 / 公司、荣誉与多位面抉择',
        image: '/m1.webp',
        imageStack: ['/mt.webp', '/mt1.webp'],
        gameplayTitle: '每一次露面，都会重新定义角色的位置',
        gameplay: [
          '名利场这一部分主要围绕角色与演艺圈外部环境的接触展开，包括经纪公司、通告大厅、周边外出、荣誉，以及和曝光、资源、评价相关的内容。玩家在这里做出的选择，并不只是完成一项工作，而是在决定角色会以什么方式进入行业、获得怎样的关注、积累什么样的机会。',
          '通告会带来曝光，外出会扩展接触面，荣誉会记录阶段成果，而评价和资源又会继续影响下一步能接触到什么内容。角色并不是在一条固定路径上前进，而是在不断受到行业环境的推动以及后期打通开公司路线等多样玩法'
        ],
        techTitle: '机会、评价与资源，会在同一套状态里持续联动',
        techImageStack: ['/mg.webp', '/mg1.webp'],
        techImage: '/m2.webp',
        tech: [
          '这一部分由多组外部系统共同支撑。经纪公司负责组织角色与行业之间的连接，通告大厅提供工作机会，周边外出扩展可触达场景，荣誉系统承接阶段结果，而资源、评价和曝光变化会通过统一状态继续回写到后续流程中。',
          '也就是说，玩家每一次做出的行业选择都不会只停留在当前页面，而是会继续影响后续可执行内容、角色位置和外部反馈。外部环境因此成为持续参与判定的一层系统，而不是静态背景。'
        ],
        designLabel: '设计思路',
        designTitle: '真正的压力，不靠堆砌，而靠选择本身被感知',
        designImage: '/m3.webp',
        designImageGrid: ['/c1.webp', '/c2.webp', '/c3.webp', '/c4.webp'],
        design: [
          '摒弃喧嚣的视觉渲染，以极简信息层级、可控机会密度、留白式压迫感，让抉择本身具备重量。界面越克制，机会、代价、舆论风险、团队增益的关联越清晰，玩家的注意力自然聚焦于权衡与判断，真切感知机遇的稀缺性与生存的残酷性。',
          '华丽与残酷无需刻意强调，而是通过玩家犹豫、斟酌的瞬间被感知，嘲讽机制与舆论压力强化决策严肃性，让娱乐圈的生存压力，转化为可触摸的体验质感。'
        ]
      },
      {
        title: '星途 / 训练、任务与成长闭环',
        image: '/S1.webp',
        imageStack: ['/w1.webp', '/w2.webp'],
        gameplayTitle: '成长感不是奖励，而是被持续感知的推进',
        techTitle: '成长闭环依赖统一状态，而不是分散页面',
        techImageStack: ['/1.webp', '/2.webp'],
        designTitle: '上头感来自反馈密度，而不是界面复杂度',
        tech: [
          '把时间、属性、任务、场景、日志、动态事件、角色心理数据、团队增益、结局判定条件全部纳入全局状态管理，通过标准化的更新函数，同步完成行为结算、剧情触发、阶段反馈、关系进阶。每一次行动都不是单独改一个数值，而是多个系统一起联动更新，日常事件、特殊事件会按条件精准触发，同步更新关系进度和成长数值。',
          '今天的训练会影响明天的机会，当前的任务会触发后续剧情，关系突破能解锁专属内容，阶段完成会调整后续成长节奏，结局系统会全程收集状态数据，真正形成闭环的成长链路，而不是零散的碎片反馈。'
        ],
        gameplay: [
          '不做单纯的数值堆叠，而是走“属性提升+关系进阶+经营布局”三线并行的路线，让成长能被实实在在感知。训练、行动、时间推进、阶段突破形成稳定节奏，搭配衣橱穿搭获得属性和风格加成，借助团队效果提升成长效率；同时推进角色关系，好感度结合心理状态决定关系阶段，关键剧情没触发前，好感会有上限限制，避免无脑刷数值的问题。',
          '成长不是冰冷的数字上涨，而是一步步往上走的真实感受，每一次投入都能铺垫后续的机会，每一段关系羁绊都会影响最终结局，玩家的付出，最终会变成清晰可见的星路历程。'
        ],
        design: [
          '核心是精准反馈，不堆砌多余信息，把属性变化、任务完成、阶段奖励、关系波动、结果日志放在合适的位置。玩家每做一次行动，都能得到清晰及时的回应，这种高频但不杂乱的反馈，加上角色关系的情绪张力、成长经营的长期成就感，构成了持久的沉浸感。',
          '界面越简洁，成长的感受就越强烈，玩家不用在复杂面板里迷失，全程聚焦自身进阶和关系维系，每一步选择都指向专属结局，获得感自然更足。'
        ]
      },
      {
        title: '灵感碰撞 / AI 角色碰撞与实时好感反馈',
        image: '/l1.webp',
        imageStack: ['/l1.webp', '/l2.webp'],
        techImageStack: ['/l3.webp', '/l4.webp'],
        designImageStack: ['/l5.webp', '/l6.webp'],
        techTitle: 'AI 的价值不在替代内容，而在增强回应质量',
        tech: [
          '灵感碰撞采用独立增强层接入AI能力，仅在角色闲聊、特殊情境、高情绪弹窗、舆论反馈等关键场景启用，不干扰核心剧情与玩法稳定性。系统同步调取全局状态库的角色心理数据、关系阶段、际遇进度，AI基于多维参数生成贴合人设的回应，核心剧情与事件链仍由静态配置保障连贯性。',
          '此处AI的核心价值，是让回应更具角色灵魂，深度适配关系状态与上下文语境，同时联动日常事件、邂逅触发逻辑，让动态互动更贴合玩法节奏，而非盲目生成冗余内容。'
        ],
        gameplayTitle: '表达一旦变自由，互动就会变重',
        gameplay: [
          '灵感碰撞并非叠加AI功能的噱头设计，而是打破预设选项桎梏，融合角色心理侧写与动态际遇的深度互动体系。玩家不再局限于固定答案的被动选择，可在闲聊、特殊事件、舆论回应等场景输出专属表达，AI依据角色好感、信任、占有欲等心理指标，结合当前关系阶段给出精准回应，让互动从「点选」升级为「走心交流」。',
          '这一转变彻底升级体验质感：原本的剧情推进节点、日常邂逅瞬间、舆论公关场景，化作充满真实感的情感交流时刻，角色关系的羁绊感与情绪重量被瞬间放大。'
        ],
        designTitle: '被接住的瞬间，才会让角色真正立起来',
        design: [
          'AI互动的本质不是技术炫技，而是实现「表达被听见、情绪被承接」。角色依据关系阶段、沟通语境、语气态度、心理状态给出专属回应，让互动超越信息交换，升华为带有情绪后果的深度交流，同一表达在不同关系阶段会触发截然不同的反馈。',
          '角色的存在感不再依赖设定文案，而是源于一次次鲜活、真诚的回应，从静态立绘蜕变为有温度、有反应的鲜活个体，也让每一段际遇、每一次互动，都成为塑造角色关系与最终结局的关键伏笔。'
        ]
      }
    ],
    images: []
  },
  {
    id: 'bloom',
    navTitle: 'Bloom',
    navTitleZh: '绽放',
    title: 'Bloom Phone',
    titleZh: '绽放',
    subtitle: 'Digital Companion Terminal',
    subtitleZh: '数字伴侣终端',
    betaUsers: '内测用户 500+',
    cover: '/33.webp',
    role: '产品负责人',
    year: '2026',
    tech: ['AI Agent 设计', '用户体验（UX）', '市场进入策略'],
    description: '把聊天、动态、约会、情侣空间与长期留存的记忆收进同一部手机里，让关系不再停留在单一对话框中，而是在桌面亮起、界面切换、内容留存的过程中，逐渐拥有陪伴感、痕迹感与时间感。Bloom 所呈现的，并不是一个被包装成手机样子的聊天工具，而是一种更接近真实设备的关系体验：可以进入，可以停留，也可以在反复触达与长久陪伴中，成为关系本身的一部分。',
    link: 'https://bloom-5cm.pages.dev/',
    linkText: '体验Bloom',
    isMobileMockup: true,
    features: [
      {
        title: 'Bloom界面',
        image: '/b1.webp?v=20260324-1735',
        gallery: [
          '/b2.webp',
          '/b3.webp',
          '/b4.webp'
        ],
        tech: '极致拟物的手机系统体验。你可以自由排列桌面图标、放置功能组件，通过全局 CSS 与个性化配置，在数字世界中复刻一部完全属于你的 AI 手机。',
        gameplay: 'Bloom 的第一层体验不是功能导航，而是一部完整的手机。桌面、顶栏、Dock、图标与小组件共同构成沉浸式设备感，让产品从"任务列表"变成"生活入口"。'
      },
      {
        title: '关系体验',
        image: '/g1.webp?v=20260324-1748',
        gallery: [
          '/g2.webp?v=20260324-1755',
          '/g3.webp?v=20260324-1801',
          '/g4.webp?v=20260401-0001'
        ],
        tech: [
          '关系之所以能在不同场景中成立，依赖的不是单一 prompt，而是一套按任务拆分的场景化提示词系统。',
          '聊天、动态、评论回复、约会与摘要整理各自拥有独立的 prompt builder，使角色既能保持统一的人设与语气，又能输出符合场景目标的内容。持续存在感，本质上正来自这套系统的协同。'
        ],
        gameplay: [
          'Bloom 不把关系理解为一次次单独的对话，而是把聊天、动态、约会与情侣空间组织成一条连续的体验链路。',
          '回应只是开始，持续出现、逐渐靠近与长期留存，才构成这部手机真正的情感结构。'
        ]
      },
      {
        title: '生活化能力与完整度',
        image: '/h1.webp?v=20260324-1816',
        gallery: [
          '/h2.webp?v=20260324-1820',
          '/h3.webp?v=20260324-1820',
          '/h4.webp?v=20260324-1820'
        ],
        tech: [
          '这些模块之所以不会显得像散落的页面，关键在于底层已经形成统一的运行时主链。',
          'AI 请求被收口到同一运行时层，不同任务通过独立 prompt builder 进入对应链路，聊天、动态、约会与持久化数据再共同回流到同一套产品状态中。于是，这里成立的不是“很多功能”，而是一台已经具备主链路、状态回写与多模块联动能力的手机型产品。'
        ],
        gameplay: [
          'Bloom 的完整度并不只来自聊天与关系主链。音乐、钱包、论坛、监控、世界书、短信与游戏中心等模块虽然不是主卖点，却共同补足了这部手机的生活感与世界感。',
          '它们让设备不只承担关系推进的任务，也开始具备被停留、被切换、被探索与被反复返回的理由。'
        ]
      },
      {
        title: '记忆沉淀',
        image: '/j1.webp?v=20260324-1808',
        gallery: [
          '/j2.webp?v=20260324-1828',
          '/j3.webp?v=20260324-1828'
        ],
        tech: '这里的记忆并非一串聊天记录，而是被组织为分层结构：会话层承接即时互动，摘要层沉淀关系信息，记录层保存关键内容，配置层留存偏好与痕迹。也因此，关系不会因为一次退出而中断，而能在不同入口中持续被调用、回看与延续。',
        gameplay: 'Bloom 关注的并不只是互动发生的瞬间，而是关系如何被留住。约会后的记录、情侣空间中的内容、被收藏的片段与被反复回看的痕迹，共同构成了这部手机里最私密也最持久的一层体验。'
      }
    ],
    images: []
  }
];

const getVideoPoster = (video: { url: string; poster?: string }) =>
  video.poster ||
  video.url
    .replace(/-web\.mp4(\?.*)?$/i, '.webp')
    .replace(/\.mp4(\?.*)?$/i, '.webp');

const asParagraphs = (content: string | string[] | undefined) =>
  Array.isArray(content) ? content : content ? [content] : [];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEntered, setIsEntered] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const wrinkleOpacity = activeTab === 'about' ? 0 : 0.8;

  const handleContentClick = () => {
    // No-op, wrinkle opacity is now based on active tab
  };

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(26, 26, 26, 0.9)',
      backdropFilter: 'blur(4px)',
    },
    hover: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      border: '1px solid rgba(26, 26, 26, 0.1)',
      backdropFilter: 'blur(8px)',
    },
    contentHover: {
      width: 64,
      height: 64,
      backgroundColor: 'transparent',
      border: '1px dashed rgba(26, 26, 26, 0.6)',
      backdropFilter: 'none',
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#1A1A1A] font-sans selection:bg-black selection:text-white relative cursor-none overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-purple-300/20 to-blue-300/20 blur-[80px] animate-[pulse_8s_ease-in-out_infinite] pointer-events-none mix-blend-multiply" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-orange-200/20 to-pink-300/20 blur-[100px] animate-[pulse_10s_ease-in-out_infinite_alternate] pointer-events-none mix-blend-multiply" style={{ animationDelay: '2s' }} />

      {/* Custom Cursor */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[999] hidden md:flex items-center justify-center will-change-transform ${cursorVariant === 'hover' ? 'backdrop-blur-md shadow-sm' : ''}`}
        variants={variants}
        animate={cursorVariant}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      >
        <AnimatePresence mode="wait">
          {cursorVariant === "default" && (
            <motion.div
              key="search-lens"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Central Crosshair */}
              <div className="w-1 h-1 bg-black/40 rounded-full" />
              
              {/* Lens Handle */}
              <div 
                className="absolute -bottom-2 -right-2 w-3 h-[1.5px] bg-black/90 origin-left rotate-45" 
                style={{ transform: 'rotate(45deg) translateX(4px)' }}
              />
              
              {/* Glass Reflection */}
              <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-white/40 rounded-full blur-[1px]" />
            </motion.div>
          )}
          {cursorVariant === "hover" && (
            <motion.span
              key="hover-text"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-mono text-[#1A1A1A] uppercase tracking-widest font-bold"
            >
              View
            </motion.span>
          )}
          {cursorVariant === "contentHover" && (
            <motion.span
              key="content-text"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-mono text-[#1A1A1A] uppercase tracking-widest font-bold bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm"
            >
              Inspect
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isEntered ? (
          <LoginScreen key="login" onEnter={() => setIsEntered(true)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} setCursorVariant={setCursorVariant} />
            
            {/* Wrinkle Overlay */}
            <div
              className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-1000 ease-out mix-blend-multiply"
              style={{ 
                opacity: wrinkleOpacity * 0.4, // Adjust opacity for realistic paper feel
                backgroundImage: `url('https://images.unsplash.com/photo-1603484477859-abe6a73f9366?q=80&w=2000&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'contrast(1.5) grayscale(1)' // Enhance texture contrast and remove color
              }}
            />

            <AnimatePresence mode="wait">
              {activeTab === 'overview' ? (
                <Overview key="overview" onSelectProject={setActiveTab} setCursorVariant={setCursorVariant} onContentClick={handleContentClick} />
              ) : activeTab === 'about' ? (
                <About key="about" setCursorVariant={setCursorVariant} />
              ) : (
                <ProjectDetail 
                  key={activeTab} 
                  project={PROJECTS.find(p => p.id === activeTab)!} 
                  onSelectProject={setActiveTab}
                  setCursorVariant={setCursorVariant}
                  onContentClick={handleContentClick}
                />
              )}
            </AnimatePresence>

            <Footer setCursorVariant={setCursorVariant} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Components ---

const OrbitingNumbers: React.FC = () => {
  const orbits = [
    { radius: 200, duration: 15, tilt: 25, count: 8, color: 'text-black/20' },
    { radius: 320, duration: 25, tilt: -15, count: 12, color: 'text-black/15' },
    { radius: 450, duration: 40, tilt: 10, count: 16, color: 'text-black/10' },
    { radius: 580, duration: 60, tilt: -30, count: 20, color: 'text-black/5' },
    { radius: 720, duration: 80, tilt: 45, count: 24, color: 'text-black/5' },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center perspective-1000 pointer-events-none overflow-hidden">
      <div className="relative preserve-3d w-0 h-0">
        {orbits.map((orbit, i) => (
          <div
            key={i}
            className="absolute preserve-3d animate-orbit"
            style={{
              '--orbit-duration': `${orbit.duration}s`,
              '--orbit-tilt': `${orbit.tilt}deg`,
            } as OrbitStyle}
          >
            {Array.from({ length: orbit.count }).map((_, j) => {
              const angle = (j / orbit.count) * 360;
              return (
                <div
                  key={j}
                  className="absolute preserve-3d"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${orbit.radius}px)`,
                  }}
                >
                  <div className={`text-4xl md:text-7xl font-mono font-bold animate-counter-orbit ${orbit.color}`}
                       style={{ '--orbit-duration': `${orbit.duration}s` } as OrbitStyle}>
                    {Math.floor(Math.random() * 10)}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const LoginScreen: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800; // 1.8s
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo curve for that snappy but smooth deceleration
      const easeProgress = rawProgress === 1 ? 1 : 1 - Math.pow(2, -10 * rawProgress);
      
      setProgress(Math.floor(easeProgress * 100));

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onEnter, 500); // Wait half a second at 100% before exiting
      }
    };

    requestAnimationFrame(animate);
  }, [onEnter]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#F7F7F5] flex flex-col justify-between p-6 md:p-12 text-[#1A1A1A] overflow-hidden"
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* 3D Orbiting Background */}
      <OrbitingNumbers />

      {/* Wrinkle Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-[0.32]"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1603484477859-abe6a73f9366?q=80&w=2000&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.5) grayscale(1)'
        }}
      />

      {/* Top Bar */}
      <div className="flex justify-between items-start font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-400 relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-black">作品集 Portfolio</span>
          <span>&copy; 2026</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span className="text-black">状态 Status</span>
          <span>{progress === 100 ? '完成 Complete' : '加载中 Loading'}</span>
        </div>
      </div>

      {/* Center Massive Counter */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative z-10">
        <motion.div 
          className="relative flex items-baseline"
          exit={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <h1 className="text-[30vw] md:text-[25vw] leading-none font-serif italic tracking-tighter text-black">
            {progress}
          </h1>
          <span className="text-[5vw] md:text-[4vw] font-sans font-light text-gray-400 ml-2 md:ml-4">%</span>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-400 relative z-10">
        <span>环境初始化中 Initializing Environment</span>
        <div className="w-1/3 max-w-[200px] h-[1px] bg-gray-200 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-black"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

const Navbar: React.FC<{ activeTab: string, setActiveTab: (id: string) => void, setCursorVariant: CursorSetter }> = ({ activeTab, setActiveTab, setCursorVariant }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', labelZh: '概述' },
    ...PROJECTS.map(p => ({ id: p.id, label: p.navTitle, labelZh: p.navTitleZh })),
    { id: 'about', label: 'About', labelZh: '关于' }
  ];

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none"
    >
      <div className="bg-white/70 backdrop-blur-2xl border border-white/20 rounded-full p-1.5 flex gap-1 shadow-xl shadow-black/5 pointer-events-auto">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 flex items-baseline gap-1.5 ${
                isActive ? 'text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-black rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              <span className={`relative z-10 text-[11px] font-normal tracking-widest ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                {tab.labelZh}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

const Overview: React.FC<{ onSelectProject: (id: string) => void, setCursorVariant: CursorSetter, onContentClick: () => void }> = ({ onSelectProject, setCursorVariant, onContentClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zIndex, setZIndex] = useState(10);
  const [shuffleKey, setShuffleKey] = useState(0);

  const bringToFront = () => {
    setZIndex(prev => prev + 1);
    return zIndex;
  };

  const handleShuffle = () => {
    setShuffleKey(prev => prev + 1);
  };

  const getScatterProps = (index: number) => {
    const seed = index + shuffleKey * 10;
    // Use safe defaults if window is not defined yet, though it usually is in useEffect/render
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;
    const rangeX = isDesktop ? 350 : 100;
    const rangeY = isDesktop ? 200 : 150;
    
    const randomX = Math.sin(seed * 1.5) * rangeX;
    const randomY = Math.cos(seed * 2.5) * rangeY;
    const randomRotate = Math.sin(seed) * 15;

    return { x: randomX, y: randomY, rotate: randomRotate };
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-24 overflow-hidden relative flex items-center justify-center bg-transparent"
    >
      {/* Background Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
        <h1 className="text-[20vw] font-serif italic leading-none whitespace-nowrap">Playground</h1>
        <h1 className="text-[20vw] font-serif italic leading-none whitespace-nowrap">Playground</h1>
      </div>

      <div className="absolute top-32 left-6 md:left-12 pointer-events-none z-0">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">互动式工作台 Interactive Desk</p>
        <h2 className="text-4xl md:text-6xl font-serif italic text-black leading-tight">
          拖拽、放置、<br /> <span className="font-sans font-medium not-italic text-gray-300">探索。</span>
        </h2>
      </div>

      <button
        onClick={handleShuffle}
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
        className="absolute bottom-12 right-6 md:right-12 z-50 px-6 py-3 bg-black text-white rounded-full font-mono text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-xl flex items-center gap-2"
      >
        <Sparkles size={14} /> 重组桌面 Shuffle Desk
      </button>

      {/* Draggable Sticky Note */}
      <motion.div
        key={`sticky-${shuffleKey}`}
        drag
        dragConstraints={containerRef}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        onPointerDown={(e) => { e.currentTarget.style.zIndex = bringToFront().toString() }}
        initial={{ y: -500, x: -300, rotate: 0 }}
        animate={{ 
          x: -200 + Math.sin(shuffleKey)*50, 
          y: -150 + Math.cos(shuffleKey)*50, 
          rotate: -12 + Math.sin(shuffleKey)*10 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
        className="absolute w-56 h-56 bg-white/60 backdrop-blur-xl p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] cursor-grab flex flex-col justify-center items-center text-center transform-gpu hidden md:flex rounded-3xl border border-white/80"
        style={{ zIndex: 1 }}
        onMouseEnter={() => setCursorVariant("contentHover")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full" />
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-xl opacity-40 pointer-events-none" />
        <p className="font-sans text-sm text-gray-800 leading-relaxed font-medium z-10">
          “我不是在胡说八道，<br/>我只是在进行高维度的<br/>概率采样。”<br/><br/>
          <span className="text-gray-400 text-xs font-mono">—— 某位不愿透露姓名的 LLM</span>
        </p>
      </motion.div>

      {/* Project Cards */}
      <AnimatePresence>
        {PROJECTS.map((project, index) => {
          const scatter = getScatterProps(index);
          return (
            <motion.div
              key={`${project.id}-${shuffleKey}`}
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              whileDrag={{ scale: 1.05, cursor: "grabbing" }}
              onPointerDown={(e) => { e.currentTarget.style.zIndex = bringToFront().toString() }}
              initial={{ y: 1000, rotate: 0, scale: 0.5 }}
              animate={{ x: scatter.x, y: scatter.y, rotate: scatter.rotate, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
              className="absolute w-[280px] md:w-[360px] bg-white p-4 pb-6 rounded-2xl shadow-2xl cursor-grab border border-black/5 transform-gpu"
              style={{ zIndex: index + 2 }}
              onMouseEnter={() => setCursorVariant("contentHover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 pointer-events-none bg-white">
                <img
                  src={project.cover}
                  alt={project.title}
                  className={`w-full h-full ${project.id === 'bloom' ? 'object-contain' : 'object-cover'}`}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-2">
                <div className="flex justify-end items-center mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">0{index + 1}</span>
                </div>
                <h2 className="text-2xl font-sans font-medium text-black mb-1">
                  {project.title} <span className="font-serif italic text-gray-500 ml-2">{project.titleZh}</span>
                </h2>
                <p className="text-xs text-gray-500 line-clamp-2 mb-6">{project.subtitleZh}</p>
                <button
                  onPointerDown={(e) => e.stopPropagation()} // Prevent drag when clicking button
                  onClick={() => {
                    onContentClick();
                    onSelectProject(project.id);
                  }}
                  className="w-full py-3 bg-[#F7F7F5] hover:bg-black hover:text-white transition-colors rounded-xl text-xs font-mono uppercase tracking-widest flex justify-center items-center gap-2 group"
                >
                  查看详情 (Open Case) <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}



const ProjectDetail: React.FC<{ project: any, onSelectProject: (id: string) => void, setCursorVariant: CursorSetter, onContentClick: () => void }> = ({ project, onSelectProject, setCursorVariant, onContentClick }) => {
  const [selectedChar, setSelectedChar] = useState<CharacterData | null>(null);
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const [shouldAutoplayArchive, setShouldAutoplayArchive] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [selectedFeatureImage, setSelectedFeatureImage] = useState<{ src: string; alt: string } | null>(null);
  const [unlockedChars, setUnlockedChars] = useState<CharacterData[]>([]);
  const [totalHeat, setTotalHeat] = useState(0);
  const [playerOffset, setPlayerOffset] = useState(0);
  const [expandedGalleryIdx, setExpandedGalleryIdx] = useState<number | null>(null);
  const directoryRef = useRef<HTMLDivElement>(null);
  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const nextProject = { id: 'about', title: '关于我', titleEn: 'About' };

  useEffect(() => {
    if (directoryRef.current) {
      const activeItem = directoryRef.current.children[activeVideo] as HTMLElement;
      if (activeItem) {
        setPlayerOffset(activeItem.offsetTop);
      }
    }
  }, [activeVideo]);

  useEffect(() => {
    setShouldAutoplayArchive(false);
  }, [project.id]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedFeatureImage(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleFlipCard = (char: CharacterData) => {
    if (unlockedChars.find(u => u.name === char.name)) {
      setSelectedChar(char);
      return;
    }
    
    setUnlockedChars(prev => [...prev, char]);
    setTotalHeat(prev => prev + (char.heatValue || 0));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Background Watermark */}
      <div className="absolute top-32 left-0 w-full overflow-hidden -z-10 pointer-events-none select-none flex">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap opacity-[0.03] text-[20vw] font-serif italic font-bold"
        >
          <span className="pr-16">{project.title}</span>
          <span className="pr-16">{project.title}</span>
          <span className="pr-16">{project.title}</span>
          <span className="pr-16">{project.title}</span>
        </motion.div>
      </div>

      {/* Typographic Hero */}
      <div className="pt-40 md:pt-56 pb-8 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8 md:mb-16">
            <span className="w-12 h-[1px] bg-black/20"></span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
              {project.navTitle}
            </span>
          </div>
          
          <h1 
            className="text-6xl md:text-[11vw] tracking-tighter leading-[0.85] text-black mb-16 md:mb-24 flex flex-col"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            {project.title.split(' ').map((word: string, i: number, arr: string[]) => (
              <motion.span 
                key={i} 
                initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8, type: "spring" }}
                className={`flex items-baseline gap-6 ${i % 2 !== 0 ? "font-serif italic text-gray-500 ml-12 md:ml-32" : "font-sans font-medium"}`}
              >
                <span className="hover:text-transparent hover:[-webkit-text-stroke:2px_#1A1A1A] transition-all duration-300 cursor-default">{word}</span>
                {i === arr.length - 1 && (
                  <span className="font-serif text-gray-400 text-4xl md:text-6xl tracking-normal font-light">{project.titleZh}</span>
                )}
              </motion.span>
            ))}
          </h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-t border-black/10 pt-14">
            <div>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-2">
                <p className="text-xl md:text-2xl text-gray-800 font-light max-w-3xl leading-snug font-serif italic">
                  {project.subtitle}
                </p>
                {(project as any).betaUsers && (
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3.5 py-1 text-[12px] md:text-[13px] text-gray-700 shadow-[0_8px_24px_rgba(0,0,0,0.05)] backdrop-blur-sm">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-black/55" />
                    {(project as any).betaUsers}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <p className="text-base md:text-lg text-gray-500 font-light leading-snug font-serif italic">
                  {project.subtitleZh}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400 pb-2">
              <span className="font-mono text-xs uppercase tracking-widest">向下滚动 (Scroll)</span>
              <ArrowDown size={20} className="animate-bounce" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-24">
        {/* Description */}
        <div className="mb-32">
          <div className={`${project.id === 'StarDeam' ? 'hidden' : 'flex items-baseline gap-4 mb-12'}`}>
            <h3 className="text-4xl md:text-5xl font-serif tracking-tight">
              {project.id === 'bloom' ? (
                <>
                  <span className="text-5xl md:text-7xl font-semibold">Bloom:</span>
                  <span> 于彼此陪伴中，让每一个独立的灵魂，都能向内生长，向外盛放。</span>
                </>
              ) : project.id === 'StarDeam'
                ? '游戏简介'
                : '起源'}
            </h3>
            {project.id !== 'bloom' && (
              <span className="text-gray-400 font-sans text-xl tracking-widest font-light italic">
                {project.id === 'StarDeam' ? 'Game Synopsis' : 'Origin'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Image Column */}
            <div className={`w-full ${(project as any).synopsisImage ? 'lg:col-span-7 lg:-ml-14 xl:-ml-20 lg:pt-8' : 'hidden'}`}>
              {(project as any).synopsisImage && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-[116%] rounded-2xl overflow-hidden shadow-2xl border border-black/5"
                >
                  <img 
                    src={(project as any).synopsisImage} 
                    alt="Game Synopsis" 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              )}
            </div>

            {/* Text & Action Column */}
            <div className={`flex flex-col ${(project as any).synopsisImage ? 'lg:col-span-5 lg:pl-4' : 'lg:col-span-12'}`}>
              {project.id === 'StarDeam' && (
                <div className="flex items-baseline gap-4 mb-8 whitespace-nowrap">
                    <h3 className="text-4xl md:text-5xl font-serif tracking-tight">游戏简介</h3>
                    <span className="text-gray-400 font-sans text-xl tracking-[0.12em] font-light italic whitespace-nowrap">Game Synopsis</span>
                </div>
              )}
              {project.id === 'StarDeam' ? (
                <>
                  <p className="text-gray-600 leading-relaxed font-light mb-6 text-lg">
                    {project.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed font-light mb-8 text-lg">
                    《星梦之路》不是单纯的文本阅读，而是一款将娱乐圈养成、剧情分支、角色羁绊与轻经营节奏结合在一起的沉浸式网页文游。玩家从新人阶段起步，在能力提升、资源选择、关系推进与公众形象之间不断权衡，最终走向不同的发展路线与结局。
                  </p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {['成长型叙事', '关系驱动选择', 'AI 动态互动'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 border border-black/8 rounded-full text-[11px] tracking-[0.18em] text-gray-500 font-mono uppercase bg-white/35"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              ) : project.id === 'bloom' ? (
                <div className="mb-10 max-w-6xl space-y-6">
                  <p className="text-xl md:text-2xl text-gray-600 leading-[1.95] font-light">
                    把聊天、动态、约会、情侣空间与长期留存的记忆收进同一部手机里，让关系不再停留在单一对话框中，而是在桌面亮起、界面切换、内容留存的过程中，逐渐拥有陪伴感、痕迹感与时间感。
                  </p>
                  <p className="text-lg md:text-xl text-gray-500 leading-[1.95] font-light max-w-5xl pl-0 md:pl-8 border-l border-black/10">
                    Bloom 所呈现的，并不是一个被包装成手机样子的聊天工具，而是一种更接近真实设备的关系体验：可以进入，可以停留，也可以在反复触达与长久陪伴中，成为关系本身的一部分。
                  </p>
                </div>
              ) : (
                <p className={`text-gray-600 leading-relaxed font-light mb-10 ${(project as any).synopsisImage ? 'text-lg' : 'text-xl md:text-2xl'}`}>
                  {project.description}
                </p>
              )}
              
              {(project as any).link && (
                <div className={`flex items-start gap-6 ${project.id === 'bloom' ? 'flex-row flex-wrap md:flex-nowrap' : 'flex-col'}`}>
                  <a 
                    href={(project as any).link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-full font-medium overflow-hidden transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {(project as any).linkText || '访问项目'}
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  
                  {project.id === 'bloom' ? (
                    <div className="relative ml-2 md:ml-4 mt-2 md:mt-0 shrink-0">
                      <div className="w-[210px] md:w-[250px] rounded-[2rem] border border-white/45 bg-white/35 px-5 py-7 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-md rotate-[-8deg]">
                        <div className="mx-auto mb-4 h-2.5 w-16 rounded-full bg-black/10" />
                        <p className="text-center text-[22px] md:text-[26px] font-serif italic text-black/80 leading-[1.25]">
                          手机体验最佳捏
                        </p>
                        <p className="mt-3 text-center text-[16px] md:text-[18px] font-serif italic text-black/65 leading-[1.35]">
                          初次加入需要配置 API
                        </p>
                        <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.24em] text-black/35">
                          Best on Mobile
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-4 bg-black/5 rounded-xl border border-black/5">
                      <div className="mt-0.5 text-black/40">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      </div>
                      <p className="font-mono text-xs text-black/60 leading-relaxed">
                        首次加载可能需要一点时间，请耐心等待。<br />
                        Initial loading may take a moment.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Characters Section (Chaotic Cards) */}
        {(project as any).characters && project.id !== 'StarDeam' && (
          <div className="mb-32 border-t border-black/10 pt-24 relative">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-24">
              <div className="md:w-2/3">
                <div className="flex items-baseline gap-4 mb-8">
                  <h3 className="text-5xl md:text-7xl font-serif italic tracking-tighter">
                    {project.id === 'StarDeam' ? 'Dramatis Personae' : 'AI Character Creators'}
                  </h3>
                  <span className="text-gray-300 font-sans text-2xl tracking-[0.2em] font-light">
                    {project.id === 'StarDeam' ? '登场角色' : 'AI角色创作者'}
                  </span>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end gap-12">
                  <div className="relative">
                    <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-black font-bold mb-4 flex items-center gap-2">
                      <Flame size={16} className="text-orange-500 fill-orange-500" /> 
                      {project.id === 'StarDeam' ? '全网攻略热度' : 'AI陪伴产品平台热度'}
                    </p>
                    <div className="flex items-baseline gap-4">
                      <motion.span 
                        key={totalHeat}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-7xl md:text-[8rem] font-serif italic leading-none text-black"
                      >
                        {(totalHeat / 10000).toFixed(1)}
                        <span className="text-3xl md:text-4xl not-italic font-sans font-light text-gray-300 ml-2">w</span>
                      </motion.span>
                    </div>
                  </div>

                  <div className="flex-1 max-w-xs pb-4">
                    <div className="flex justify-between items-end mb-3 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                      <span>Progress</span>
                      <span>{project.id === 'StarDeam' ? '30.0w Target' : '35.7w Target'}</span>
                    </div>
                    <div className="w-full h-[2px] bg-black/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((totalHeat / (project.id === 'StarDeam' ? 300000 : 357000)) * 100, 100)}%` }}
                        className="h-full bg-black"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3 flex md:justify-end">
                <div className="text-right border-l border-black/10 pl-8">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-4">已解锁档案 Unlocked Entries</p>
                  <div className="flex items-baseline justify-end gap-2">
                    <span className="text-6xl font-serif italic">{unlockedChars.length}</span>
                    <span className="text-2xl font-sans font-light text-gray-300">/ {(project as any).characters.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout based on project */}
            {project.id === 'StarDeam' ? (
              <div className="flex flex-col gap-16 w-full max-w-5xl mx-auto">
                {(project as any).characters.map((char: any, idx: number) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-16 items-center border-b border-black/5 pb-16 last:border-0">
                    <div 
                      className="w-full md:w-1/3 aspect-square overflow-hidden bg-gray-100 rounded-full"
                      onMouseEnter={() => setCursorVariant("contentHover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <img src={char.image} alt={char.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="w-full md:w-2/3">
                      <div className="flex items-baseline gap-4 mb-4">
                        <h4 className="text-4xl md:text-5xl font-serif italic">{char.name}</h4>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-400">{char.role}</span>
                      </div>
                      <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">{char.desc}</p>
                      
                      <div className="mb-8">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-3">人物介绍 Character Introduction</p>
                        <p className="text-base text-gray-700 font-sans font-light leading-relaxed">{char.intro}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {char.platforms.map((p: HeatPlatform, i: number) => (
                          <div key={i}>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-2">{p.name}</p>
                            <p className="text-2xl font-serif italic">{p.heat}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
            <div className="relative w-full min-h-[700px] md:min-h-[900px] flex items-center justify-center">
              {/* Background text for flavor */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.015] select-none">
                <h2 className="text-[25vw] font-serif italic leading-none whitespace-nowrap">
                  Classified
                </h2>
              </div>

              <div className="relative w-full max-w-7xl h-full flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {(project as any).characters.map((char: any, idx: number) => {
                  const isUnlocked = unlockedChars.find(u => u.name === char.name);
                  
                  // Chaotic scatter values
                  const rotations = [-18, 14, -10, 22, -14, 18, -6, 12];
                  const transY = [60, -80, 40, -60, 100, -40, 50, -70];
                  const transX = [-50, 70, -30, 60, -80, 30, -20, 50];
                  
                  const rotate = rotations[idx % rotations.length];
                  const ty = transY[idx % transY.length];
                  const tx = transX[idx % transX.length];
                  
                  return (
                  <motion.div 
                    key={idx} 
                    drag
                    dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
                    dragElastic={0.05}
                    onPointerUp={(e) => {
                      // Only flip if it wasn't a significant drag
                      const target = e.target as HTMLElement;
                      if (target.closest('button')) return; // Don't flip if clicking the button
                      handleFlipCard(char);
                    }}
                    onMouseEnter={() => setCursorVariant("contentHover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotate: rotate, 
                      x: tx, 
                      y: ty,
                      zIndex: isUnlocked ? 40 : 10 + idx
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      zIndex: 90,
                      transition: { duration: 0.2 }
                    }}
                    whileDrag={{ scale: 1.05, zIndex: 95, cursor: 'grabbing' }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    className={`group relative w-[180px] md:w-[240px] aspect-[3/4.5] rounded-lg overflow-hidden shadow-xl transition-shadow duration-500 cursor-grab active:cursor-grabbing ${!isUnlocked ? 'bg-white border border-black/5' : ''}`}
                  >
                    <AnimatePresence mode="wait">
                      {isUnlocked ? (
                        <motion.div
                          key="front"
                          initial={{ rotateY: 90, opacity: 0 }}
                          animate={{ rotateY: 0, opacity: 1 }}
                          className="absolute inset-0"
                        >
                          <img src={char.image} alt={char.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent opacity-90" />
                          
                          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                            <div className="flex justify-between items-end mb-4">
                              <div>
                                <h4 className="text-3xl font-serif italic leading-none mb-1">{char.name}</h4>
                                <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">{char.role}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-mono text-[10px] text-orange-400">+{char.heatDisplay}</p>
                                <p className="font-mono text-[8px] uppercase tracking-tighter text-white/30">Heat</p>
                              </div>
                            </div>
                            
                            <div className="w-full h-[1px] bg-white/10 mb-4" />
                            
                            <button 
                              onPointerDown={(e) => e.stopPropagation()}
                              onClick={(e) => { e.stopPropagation(); onContentClick(); setSelectedChar(char); }}
                              className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-[10px] font-mono uppercase tracking-widest transition-colors"
                            >
                              View Dossier
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="back"
                          exit={{ rotateY: -90, opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#F5F5F3]"
                        >
                          {/* File Folder Aesthetic */}
                          <div className="absolute top-0 left-0 w-1/3 h-8 bg-gray-200/50 rounded-br-xl" />
                          <div className="absolute top-4 right-4 font-mono text-[8px] text-gray-300 uppercase tracking-widest">
                            Top Secret // 2026
                          </div>
                          
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-black/5">
                            <Box size={24} className="text-gray-200" />
                          </div>
                          
                          <div className="space-y-2 text-center">
                            <p className="font-serif italic text-2xl text-gray-400">Classified</p>
                            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-300">Neural_Archive_{String(idx + 1).padStart(2, '0')}</p>
                          </div>

                          <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4">
                            <div className="w-12 h-[1px] bg-gray-200" />
                            <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-gray-300 animate-pulse">Decrypt</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )})}
              </div>
            </div>
            )}
          </div>
        )}

        {/* Videos Section */}
        {(project as any).videos && (
          <div className="mb-40 border-t border-black/10 pt-24">
            <div className="flex items-baseline gap-4 mb-20">
              <h3 className="text-4xl md:text-5xl font-serif italic">Visual Archives</h3>
              <span className="text-gray-400 font-sans text-xl tracking-widest">影像档案</span>
            </div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Directory (Left) */}
              <div className="md:col-span-3 flex flex-col">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8 px-2">
                  档案索引 Archive Index / {(project as any).videos.length} Entries
                </div>
                    <div ref={directoryRef} className="space-y-0 relative">
                  {(project as any).videos.map((vid: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onContentClick();
                        setActiveVideo(idx);
                        setShouldAutoplayArchive(false);
                      }}
                      onMouseEnter={() => setCursorVariant("contentHover")}
                      onMouseLeave={() => setCursorVariant("default")}
                      className={`group w-full text-left py-8 border-b border-black/5 transition-all duration-500 flex items-center justify-between px-2 ${
                        activeVideo === idx ? 'text-black' : 'text-gray-400 hover:text-black'
                      }`}
                    >
                      <div className="flex items-baseline gap-6">
                        <span className="font-mono text-xs opacity-50">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <span className={`text-2xl md:text-3xl font-serif italic text-black/90 transition-all duration-500 ${activeVideo === idx ? 'translate-x-2' : 'group-hover:translate-x-1'}`}>
                            {vid.title}
                          </span>
                        </div>
                      </div>
                      
                      <div className="relative w-6 h-6 overflow-hidden">
                        <ArrowUpRight 
                          size={20} 
                          className={`transition-all duration-500 ${
                            activeVideo === idx 
                              ? 'translate-x-0 translate-y-0 opacity-100' 
                              : 'translate-x-[-100%] translate-y-[100%] opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100'
                          }`} 
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Video Player (Right) */}
              <div className="md:col-span-9 relative">
                <motion.div 
                  animate={{ y: playerOffset }}
                  transition={{ type: "spring", damping: 25, stiffness: 120 }}
                  className="relative"
                >
                  <motion.div 
                    layout
                    className="bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-black/5"
                  >
                    {/* Larger Presentation Ratio */}
                    <div className="aspect-[16/8.5] bg-black relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeVideo}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0"
                        >
                          {/\.((mp4)|(webm)|(ogg)|(mov))(\?.*)?$/i.test((project as any).videos[activeVideo].url) ? (
                            <>
                              {shouldAutoplayArchive ? (
                                <video 
                                  src={(project as any).videos[activeVideo].url} 
                                  poster={getVideoPoster((project as any).videos[activeVideo])}
                                  controls
                                  autoPlay
                                  loop 
                                  playsInline
                                  preload="metadata"
                                  className="w-full h-full object-cover" 
                                />
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setShouldAutoplayArchive(true)}
                                  className="group absolute inset-0 overflow-hidden"
                                >
                                  <img
                                    src={getVideoPoster((project as any).videos[activeVideo])}
                                    alt={(project as any).videos[activeVideo].title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                  />
                                  <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(0,0,0,0.6),_rgba(0,0,0,0.12)_42%,_rgba(0,0,0,0.22))]" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex items-center gap-4 rounded-full border border-white/20 bg-black/45 px-6 py-4 text-white shadow-[0_20px_40px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-500 group-hover:bg-black/55">
                                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                                        <Play size={18} className="ml-0.5" fill="currentColor" />
                                      </span>
                                      <span className="text-left">
                                        <span className="block font-mono text-[10px] uppercase tracking-[0.32em] text-white/65">Archive Preview</span>
                                        <span className="block text-sm md:text-base font-light">点击播放视频</span>
                                      </span>
                                    </div>
                                  </div>
                                </button>
                              )}
                            </>
                          ) : (
                            <a
                              href={(project as any).videos[activeVideo].url}
                              target="_blank"
                              rel="noreferrer"
                              className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_35%),linear-gradient(135deg,_#141414_0%,_#2A2A2A_45%,_#0B0B0B_100%)] text-white"
                            >
                              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,_rgba(0,0,0,0.45),_rgba(0,0,0,0.1))]" />
                              <div className="relative z-10 flex max-w-xl flex-col items-center px-8 text-center">
                                <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-white/60 mb-5">
                                  External Archive
                                </p>
                                <h4 className="font-serif italic text-4xl md:text-5xl mb-4">
                                  {(project as any).videos[activeVideo].title}
                                </h4>
                                <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8">
                                  点击打开外部档案链接查看完整内容
                                </p>
                                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.35em] text-white backdrop-blur-sm">
                                  Open Archive
                                </span>
                              </div>
                            </a>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Recording Indicator */}
                      <div className="absolute bottom-6 left-6 flex items-center gap-3 z-20">
                        <motion.div 
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                          Rec // Archive_{String(activeVideo + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Video Info Label */}
                      <div className="absolute top-6 right-6 z-20">
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-white/90">
                            {(project as any).videos[activeVideo].platform}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Caption */}
                  <div className="mt-8 mb-12 md:mb-16 px-2">
                    <div className="max-w-md">
                      <h4 className="text-4xl md:text-5xl font-serif italic leading-[1.15] mb-2">{(project as any).videos[activeVideo].title}</h4>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        {(project as any).features && (
          project.id === 'StarDeam' ? (
            <div className="mb-32 border-t border-black/10 pt-24">
              <div className="flex flex-col items-center text-center mb-16">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">StarDream System Atlas</span>
                <div className="flex items-baseline gap-4 md:gap-6 mb-6 flex-wrap justify-center">
                  <h3 className="text-4xl md:text-6xl font-serif text-black tracking-tight">星途功能图谱</h3>
                  <span className="text-lg md:text-2xl text-gray-400 font-light italic tracking-[0.12em]">Feature Map</span>
                </div>
                <p className="max-w-4xl text-base md:text-lg text-black/70 leading-relaxed font-light">
                  点击节点，查看《星梦之路》的核心系统如何共同塑造一条可游玩的成名路径。
                </p>
                <p className="max-w-4xl mt-2 text-sm md:text-base text-black/45 leading-relaxed font-light italic">
                  Click nodes to explore how each system contributes to the player's rise through the entertainment industry.
                </p>
                <p className="max-w-3xl mt-4 text-xs md:text-[13px] text-black/45 leading-relaxed">
                  这不是简单的功能目录，而是一张围绕“成长—代价—关系—反馈”展开的玩法结构图。
                </p>
              </div>
              
              {/* The Map Container - Luxury Editorial Style */}
              <div className="relative w-full h-[500px] md:h-[700px] bg-[#E5E4DF] rounded-3xl overflow-hidden mb-24 border border-black/10 shadow-inner">
                {/* Dynamic Background Image */}
                <img
                  src={activeFeature !== null ? (project as any).features[activeFeature].image : (project as any).cover}
                  className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale mix-blend-multiply transition-opacity duration-1000"
                  alt="Map Background"
                  referrerPolicy="no-referrer"
                />
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay pointer-events-none" />

                {/* Large Watermark */}
                <div className="absolute -bottom-16 -right-12 text-[25vw] font-serif italic text-black/[0.03] pointer-events-none leading-none select-none">
                  星梦之路
                </div>

                {/* Editorial Decorations */}
                <div className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col gap-1 z-0">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-black/60">图谱 01</span>
                  <span className="font-serif text-xl md:text-2xl text-black/80 tracking-widest">星途功能图谱</span>
                </div>
                <div className="absolute top-8 right-8 md:top-12 md:right-12 z-10">
                  <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-black/45 uppercase">
                    点击节点展开 / Inspect Nodes
                  </span>
                </div>
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col gap-1 z-0">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-black/40">比例尺 1:10000</span>
                  <div className="w-24 h-[1px] bg-black/20 mt-1 relative">
                    <div className="absolute top-[-3px] left-0 w-[1px] h-[7px] bg-black/20" />
                    <div className="absolute top-[-3px] right-0 w-[1px] h-[7px] bg-black/20" />
                    <div className="absolute top-[-3px] left-1/2 w-[1px] h-[7px] bg-black/20" />
                  </div>
                </div>

                {/* Crosshairs */}
                <div className="absolute top-1/4 right-1/4 text-black/20 font-mono text-xs pointer-events-none">+</div>
                <div className="absolute bottom-1/3 left-1/3 text-black/20 font-mono text-xs pointer-events-none">+</div>
                <div className="absolute top-1/2 right-[15%] text-black/20 font-mono text-xs pointer-events-none">+</div>

                {/* SVG Constellation Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 20 50 L 45 28 L 85 35 L 75 71 Z" stroke="rgba(0,0,0,0.06)" strokeWidth="0.2" fill="rgba(0,0,0,0.02)" />
                  <path d="M 20 50 L 75 71" stroke="rgba(0,0,0,0.06)" strokeWidth="0.2" strokeDasharray="1 1" fill="none" />
                </svg>

                {/* Map Nodes */}
                {[
                  { x: 20, y: 50, label: '起点', sublabel: '建档与人设建立', labelPos: 'right' },
                  { x: 45, y: 28, label: '名利场', sublabel: '通告、资源与公众形象', labelPos: 'right' },
                  { x: 75, y: 71, label: '星途', sublabel: '训练、任务与成长反馈', labelPos: 'left' },
                  { x: 85, y: 35, label: '灵感碰撞', sublabel: 'AI 角色互动与动态反馈', labelPos: 'left' }
                ].map((pos, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onContentClick();
                      setActiveFeature(idx);
                      setTimeout(() => {
                        document.getElementById('feature-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group flex items-center justify-center z-20 w-28 h-24 md:w-32 md:h-28 cursor-pointer"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    {/* The Point */}
                    <div className="relative flex items-center justify-center pointer-events-none">
                      <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-500 ${activeFeature === idx ? 'bg-black scale-100' : 'bg-black/20 scale-75 group-hover:scale-100 group-hover:bg-black/60'}`} />
                      {activeFeature === idx && (
                        <div className="absolute inset-[-12px] rounded-full border border-black/30 animate-[spin_4s_linear_infinite] border-t-transparent" />
                      )}
                      {/* Outer ring */}
                      <div className={`absolute inset-[-20px] rounded-full border transition-all duration-700 ${activeFeature === idx ? 'border-black/10 scale-100' : 'border-transparent scale-50 group-hover:border-black/5 group-hover:scale-100'}`} />
                    </div>

                    {/* The Label */}
                    <div className={`absolute w-max pointer-events-none transition-all duration-500 ${
                      pos.labelPos === 'right'
                        ? `left-12 md:left-14 text-left ${activeFeature === idx ? 'opacity-100 translate-x-0' : 'opacity-60 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`
                        : `right-12 md:right-14 text-right ${activeFeature === idx ? 'opacity-100 translate-x-0' : 'opacity-60 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`
                    }`}>
                      <div className={`flex items-baseline gap-2 ${pos.labelPos === 'right' ? 'justify-start' : 'justify-end flex-row-reverse'}`}>
                        <span className="font-mono text-[10px] md:text-[11px] text-black/50 tracking-[0.16em]">0{idx + 1}</span>
                        <span className="font-serif text-[26px] md:text-[32px] text-black/90 tracking-[0.08em]">{pos.label}</span>
                      </div>
                      <div className="font-mono text-[10px] md:text-[11px] tracking-[0.16em] text-black/60 mt-1">
                        {pos.sublabel}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Expanded Details Section - Long Flowing Editorial (Text + Image Paired) */}
              <div id="feature-details" className="w-full scroll-mt-32 pt-16">
                <AnimatePresence mode="wait">
                  {activeFeature !== null && (
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-7xl mx-auto px-4 md:px-8"
                    >
                      {/* 标题区域：大留白，无边框 */}
                      <div className="flex flex-col md:flex-row items-baseline gap-6 md:gap-12 mb-32 md:mb-48 border-b border-black/10 pb-16">
                        <span className="font-serif text-6xl md:text-8xl text-black/10 select-none">
                          0{activeFeature + 1}
                        </span>
                        <h4 className="text-4xl md:text-6xl lg:text-7xl font-serif text-black tracking-widest">
                          {(project as any).features[activeFeature].title}
                        </h4>
                      </div>

                      {/* Section 1: 核心玩法 (Text Left, Image Right) */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center mb-32 md:mb-48">
                        <div className="md:col-span-5 md:col-start-1">
                          <h5 className="font-mono text-sm tracking-[0.3em] text-gray-400 mb-8 md:mb-12">核心玩法</h5>
                          {(project as any).features[activeFeature].gameplayTitle && (
                            <h6 className="text-2xl md:text-3xl text-black/90 font-light leading-[1.65] tracking-wide mb-8">
                              {(project as any).features[activeFeature].gameplayTitle}
                            </h6>
                          )}
                          <div className="space-y-6">
                            {asParagraphs((project as any).features[activeFeature].gameplay).map((paragraph: string, index: number) => (
                              <p key={index} className="text-lg md:text-xl text-gray-600 font-light leading-[2.05] tracking-wide">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="md:col-span-7 md:-mr-10 lg:-mr-16">
                          {Array.isArray((project as any).features[activeFeature].imageStack) ? (
                            <div className="flex flex-col gap-2 md:gap-3">
                              {((project as any).features[activeFeature].imageStack as string[]).map((imageSrc: string, imageIndex: number) => (
                                <button
                                  type="button"
                                  key={imageSrc}
                                  className="w-full lg:w-[114%] bg-transparent overflow-hidden"
                                  onClick={() => setSelectedFeatureImage({ src: imageSrc, alt: `核心玩法 ${imageIndex + 1}` })}
                                >
                                  <img
                                    src={imageSrc}
                                    alt={`核心玩法 ${imageIndex + 1}`}
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority={imageIndex === 0 ? 'high' : 'auto'}
                                    className="block w-full h-auto hover:scale-[1.02] transition-all duration-1000"
                                    referrerPolicy="no-referrer"
                                  />
                                </button>
                              ))}
                            </div>
                          ) : (
                            <button
                              type="button"
                              className={`w-full ${(((project as any).features[activeFeature].image || '').startsWith('/m') || (project as any).features[activeFeature].image === '/l1.webp') ? 'lg:w-[114%] flex items-center justify-center bg-transparent' : 'lg:w-[108%] bg-gray-100'} aspect-[4/3] overflow-hidden`}
                              onClick={() => setSelectedFeatureImage({ src: (project as any).features[activeFeature].image, alt: '核心玩法' })}
                            >
                              <img 
                                src={(project as any).features[activeFeature].image} 
                                alt="核心玩法"
                                loading="eager"
                                decoding="async"
                                fetchPriority="high"
                                className={`w-full h-full ${(((project as any).features[activeFeature].image || '').startsWith('/m') || (project as any).features[activeFeature].image === '/l1.webp') ? 'object-contain' : 'object-cover'} hover:scale-105 transition-all duration-1000`} 
                                referrerPolicy="no-referrer"
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Section 2: 技术架构 (Image Left, Text Right) */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center mb-32 md:mb-48">
                        <div className="md:col-span-7 md:order-1 order-2">
                          {Array.isArray((project as any).features[activeFeature].techImageStack) ? (
                            <div className={`flex flex-col ${project.id === 'StarDeam' && (project as any).features[activeFeature].title?.startsWith('星途') ? 'gap-5 md:gap-7' : 'gap-2 md:gap-3'}`}>
                              {((project as any).features[activeFeature].techImageStack as string[]).map((imageSrc: string, imageIndex: number) => (
                                <button
                                  type="button"
                                  key={imageSrc}
                                  className="w-full lg:w-[114%] bg-transparent overflow-hidden"
                                  onClick={() => setSelectedFeatureImage({ src: imageSrc, alt: `技术架构 ${imageIndex + 1}` })}
                                >
                                  <img
                                    src={imageSrc}
                                    alt={`技术架构 ${imageIndex + 1}`}
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority={imageIndex === 0 ? 'high' : 'auto'}
                                    className="block w-full h-auto hover:scale-[1.02] transition-all duration-1000"
                                    referrerPolicy="no-referrer"
                                  />
                                </button>
                              ))}
                            </div>
                          ) : Array.isArray((project as any).features[activeFeature].techImages) ? (
                            <div className="flex flex-col gap-4 md:gap-5">
                              <button
                                type="button"
                                className="overflow-hidden bg-gray-100 aspect-[16/10]"
                                onClick={() => setSelectedFeatureImage({ src: (project as any).features[activeFeature].techImages[0], alt: '技术架构' })}
                              >
                                <img
                                  src={(project as any).features[activeFeature].techImages[0]}
                                  alt="技术架构"
                                  loading="eager"
                                  decoding="async"
                                  fetchPriority="high"
                                  className="w-full h-full object-cover hover:scale-105 transition-all duration-1000"
                                  referrerPolicy="no-referrer"
                                />
                              </button>
                              <button
                                type="button"
                                className="overflow-hidden bg-gray-100 aspect-[16/10]"
                                onClick={() => setSelectedFeatureImage({ src: (project as any).features[activeFeature].techImages[1], alt: '技术架构补充' })}
                              >
                                <img
                                  src={(project as any).features[activeFeature].techImages[1]}
                                  alt="技术架构补充"
                                  loading="eager"
                                  decoding="async"
                                  className="w-full h-full object-cover hover:scale-105 transition-all duration-1000"
                                  referrerPolicy="no-referrer"
                                />
                              </button>
                            </div>
                          ) : (project as any).features[activeFeature].techImage ? (
                            <button
                              type="button"
                              className={`w-full ${(project as any).features[activeFeature].techImage.startsWith('/m') ? 'lg:w-[110%] flex items-center justify-center bg-transparent' : 'bg-gray-100'} aspect-[4/3] overflow-hidden`}
                              onClick={() => setSelectedFeatureImage({ src: (project as any).features[activeFeature].techImage, alt: '技术架构' })}
                            >
                              <img 
                                src={(project as any).features[activeFeature].techImage} 
                                alt="技术架构"
                                loading="eager"
                                decoding="async"
                                fetchPriority="high"
                                className={`w-full h-full ${(project as any).features[activeFeature].techImage.startsWith('/m') ? 'object-contain' : 'object-cover'} hover:scale-105 transition-all duration-1000`} 
                                referrerPolicy="no-referrer"
                              />
                            </button>
                          ) : (
                            <div className="w-full aspect-[16/9] overflow-hidden bg-gray-100">
                              <img 
                                src={`https://picsum.photos/seed/stardeam-tech-${activeFeature}/1600/900`} 
                                alt="技术架构"
                                className="w-full h-full object-cover hover:scale-105 transition-all duration-1000" 
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-5 md:order-2 order-1">
                          <h5 className="font-mono text-sm tracking-[0.3em] text-gray-400 mb-8 md:mb-12">技术架构</h5>
                          {(project as any).features[activeFeature].techTitle && (
                            <h6 className="text-2xl md:text-3xl text-black/90 font-light leading-[1.65] tracking-wide mb-8">
                              {(project as any).features[activeFeature].techTitle}
                            </h6>
                          )}
                          <div className="space-y-6">
                            {asParagraphs((project as any).features[activeFeature].tech).map((paragraph: string, index: number) => (
                              <p key={index} className="text-lg md:text-xl text-gray-600 font-light leading-[2.05] tracking-wide">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Section 3: 设计哲学 (Text Left, Image Right) */}
                      {activeFeature !== 0 && (
                        <div className={`grid grid-cols-1 ${project.id === 'StarDeam' && (project as any).features[activeFeature].title?.startsWith('星途') ? 'mb-32 md:mb-40' : 'md:grid-cols-12 gap-12 md:gap-24 items-center mb-32 md:mb-40'}`}>
                          <div className={`${project.id === 'StarDeam' && (project as any).features[activeFeature].title?.startsWith('星途') ? 'max-w-4xl mx-auto' : 'md:col-span-5 md:col-start-1'}`}>
                            <h5 className="font-mono text-sm tracking-[0.3em] text-gray-400 mb-8 md:mb-12">
                              {(project as any).features[activeFeature].designLabel || '设计哲学'}
                            </h5>
                            {(project as any).features[activeFeature].designTitle && (
                              <h6 className={`text-2xl md:text-3xl text-black/90 font-light leading-[1.65] tracking-wide mb-8 ${project.id === 'StarDeam' && (project as any).features[activeFeature].title?.startsWith('星途') ? 'text-center' : ''}`}>
                                {(project as any).features[activeFeature].designTitle}
                              </h6>
                            )}
                            <div className="space-y-6">
                              {(Array.isArray((project as any).features[activeFeature].design)
                                ? (project as any).features[activeFeature].design
                                : ['通过极简的视觉语言与深度的数值逻辑，构建一个真实且残酷的演艺圈生态。每一次互动都将引发蝴蝶效应，塑造独一无二的星途轨迹。抛开繁杂的界面边框，让文字与图像本身成为视觉主体，呈现最纯粹的沉浸感。']
                              ).map((paragraph: string, index: number) => (
                                <p key={index} className="text-lg md:text-xl text-gray-600 font-light leading-[2.05] tracking-wide">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                          {!(project.id === 'StarDeam' && (project as any).features[activeFeature].title?.startsWith('星途')) && (
                            <div className="md:col-span-7">
                              {Array.isArray((project as any).features[activeFeature].designImageGrid) ? (
                                <div className="w-full lg:w-[114%] space-y-4 md:space-y-5 -mt-4 md:-mt-6">
                                  <button
                                    type="button"
                                    className="w-full bg-transparent overflow-hidden"
                                    onClick={() => setSelectedFeatureImage({ src: (project as any).features[activeFeature].designImage || `https://picsum.photos/seed/stardeam-design-${activeFeature}/1600/900`, alt: '设计哲学' })}
                                  >
                                      <img
                                        src={(project as any).features[activeFeature].designImage || `https://picsum.photos/seed/stardeam-design-${activeFeature}/1600/900`}
                                        alt="设计哲学"
                                        loading="eager"
                                        decoding="async"
                                        fetchPriority="high"
                                        className="block w-full h-auto hover:scale-[1.02] transition-all duration-1000"
                                        referrerPolicy="no-referrer"
                                      />
                                  </button>
                                  <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-full">
                                    {((project as any).features[activeFeature].designImageGrid as string[]).map((imageSrc: string, imageIndex: number) => (
                                      <button
                                        type="button"
                                        key={imageSrc}
                                        className="w-full bg-transparent overflow-hidden"
                                        onClick={() => setSelectedFeatureImage({ src: imageSrc, alt: `设计细节 ${imageIndex + 1}` })}
                                      >
                                        <img
                                          src={imageSrc}
                                          alt={`设计细节 ${imageIndex + 1}`}
                                          loading="eager"
                                          decoding="async"
                                          className="block w-full h-auto hover:scale-[1.02] transition-all duration-1000"
                                          referrerPolicy="no-referrer"
                                        />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ) : Array.isArray((project as any).features[activeFeature].designImageStack) ? (
                                <div className="flex flex-col gap-2 md:gap-3">
                                  {((project as any).features[activeFeature].designImageStack as string[]).map((imageSrc: string, imageIndex: number) => (
                                    <button
                                      type="button"
                                      key={imageSrc}
                                      className="w-full bg-transparent overflow-hidden"
                                      onClick={() => setSelectedFeatureImage({ src: imageSrc, alt: `设计哲学 ${imageIndex + 1}` })}
                                    >
                                      <img
                                        src={imageSrc}
                                        alt={`设计哲学 ${imageIndex + 1}`}
                                        loading="eager"
                                        decoding="async"
                                        className="block w-full h-auto hover:scale-[1.02] transition-all duration-1000"
                                        referrerPolicy="no-referrer"
                                      />
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className={`w-full ${((project as any).features[activeFeature].designImage || '').startsWith('/m') ? 'lg:w-[110%] flex items-center justify-center bg-transparent' : 'bg-gray-100'} aspect-[4/3] overflow-hidden`}
                                  onClick={() => setSelectedFeatureImage({ src: (project as any).features[activeFeature].designImage || `https://picsum.photos/seed/stardeam-design-${activeFeature}/1600/900`, alt: '设计哲学' })}
                                >
                                  <img 
                                    src={(project as any).features[activeFeature].designImage || `https://picsum.photos/seed/stardeam-design-${activeFeature}/1600/900`} 
                                    alt="设计哲学"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                    className={`w-full h-full ${((project as any).features[activeFeature].designImage || '').startsWith('/m') ? 'object-contain' : 'object-cover'} hover:scale-105 transition-all duration-1000`} 
                                    referrerPolicy="no-referrer"
                                  />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* 底部留白与分割线 */}
                      <div className="w-full h-[1px] bg-black/10 mb-24" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : project.id === 'bloom' ? (
            <div className="space-y-32 md:space-y-48 mb-32">
              {(project as any).features.map((feat: any, idx: number) => {
                const isExpanded = expandedGalleryIdx === idx;
                const isOtherExpanded = expandedGalleryIdx !== null && expandedGalleryIdx !== idx;
                
                return (
                <motion.div 
                  layout 
                  key={idx} 
                  className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-24 items-center transition-opacity duration-500 ${isOtherExpanded ? 'opacity-20 pointer-events-none' : ''}`}
                >
                  
                  {/* Image Column */}
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`flex justify-center ${isExpanded ? 'w-full' : 'w-full md:w-1/2'}`}
                  >
                    <motion.div 
                      layout
                      className="relative w-full cursor-pointer group"
                      onClick={() => feat.gallery && setExpandedGalleryIdx(isExpanded ? null : idx)}
                    >
                      <div className="overflow-x-auto hide-scrollbar w-full py-4 safe-center">
                        <div className="flex gap-6 px-4 w-max items-center">
                          <motion.img 
                            layout
                            src={feat.image} 
                            alt={feat.title} 
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                            className={`shrink-0 w-[285px] md:w-[320px] aspect-[430/910] bg-black object-cover drop-shadow-2xl rounded-[2rem] border-[4px] border-gray-900 transition-transform duration-500 ${feat.title === 'Bloom界面' ? 'scale-[1.02]' : ''} ${!isExpanded ? 'group-hover:scale-[1.04]' : ''}`} 
                            referrerPolicy="no-referrer" 
                          />
                          <AnimatePresence mode="popLayout">
                            {isExpanded && feat.gallery && feat.gallery.map((img: string, i: number) => (
                              <motion.img 
                                key={i}
                                layout
                                initial={{ opacity: 0, x: -40, scale: 0.95, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, x: -40, scale: 0.95, filter: 'blur(4px)' }}
                                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                                src={img} 
                                alt={`${feat.title} ${i}`} 
                                loading="eager"
                                decoding="async"
                                className="shrink-0 w-[285px] md:w-[320px] aspect-[430/910] object-cover drop-shadow-2xl rounded-[2rem] border-[4px] border-gray-900" 
                                referrerPolicy="no-referrer" 
                              />
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                      
                      {/* Hint Text */}
                      {feat.gallery && (
                        <motion.div layout className="mt-4 text-center w-full flex justify-center h-6 overflow-hidden">
                          <AnimatePresence mode="wait">
                            {!isExpanded ? (
                              <motion.span 
                                key="expand-hint"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="inline-flex items-center gap-2 text-[12px] font-mono tracking-widest text-gray-400 uppercase transition-colors group-hover:text-gray-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                点击图片查看更多
                              </motion.span>
                            ) : (
                              <motion.span 
                                key="collapse-hint"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="inline-flex items-center gap-2 text-[12px] font-mono tracking-widest text-gray-400 uppercase transition-colors hover:text-gray-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                点击图片收起
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Text Column */}
                  <AnimatePresence mode="popLayout">
                    {!isExpanded && (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50, filter: 'blur(8px)' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`w-full md:w-1/2 space-y-12`}
                      >
                        <div>
                          <div className="font-mono text-sm text-gray-400 mb-6">0{idx + 1}</div>
                          <h3 className="text-4xl md:text-5xl font-serif italic text-black mb-6 leading-tight">{feat.title}</h3>
                        </div>

                        <div className="space-y-10">
                        <div>
                          <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">
                              {feat.title === 'Bloom界面'
                                ? '体验定位 EXPERIENCE'
                                : feat.title === '记忆沉淀'
                                ? '情感留存 MEMORY LAYER'
                                : feat.title === '生活化能力与完整度'
                                  ? '世界补全 WORLD COMPLETENESS'
                                  : feat.title === '个性化与长期使用'
                                    ? '拥有感 OWNERSHIP'
                                  : '关系主链 RELATIONSHIP FLOW'}
                          </h4>
                          <div className="space-y-4">
                            {asParagraphs(feat.gameplay).map((paragraph: string, paragraphIndex: number) => (
                              <p key={paragraphIndex} className="text-lg text-gray-600 leading-relaxed font-light">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div>
                            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">
                              {feat.title === 'Bloom界面'
                                ? '设计表达 DESIGN APPROACH'
                                : feat.title === '记忆沉淀'
                                  ? '记忆分层 MEMORY ARCHITECTURE'
                                  : feat.title === '生活化能力与完整度'
                                    ? '运行时主链 RUNTIME CHAIN'
                                    : feat.title === '个性化与长期使用'
                                      ? '长期机制 LONG-TERM MECHANISM'
                                : feat.title === '关系体验'
                                  ? '提示词系统 PROMPT SYSTEM'
                                  : '技术实现 Technical Implementation'}
                          </h4>
                          <div className="space-y-4">
                            {asParagraphs(feat.tech).map((paragraph: string, paragraphIndex: number) => (
                              <p key={paragraphIndex} className="text-base text-gray-500 leading-relaxed font-light">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )})}
            </div>
          ) : (
            <div className="space-y-24 md:space-y-40 mb-32">
              {(project as any).features.map((feat: any, idx: number) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`md:col-span-7 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'} flex justify-center`}
                  >
                    {(project as any).isMobileMockup ? (
                      <div className="relative w-full max-w-[430px] aspect-[430/932] bg-black rounded-[3rem] p-2 shadow-2xl border border-gray-800">
                        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-10">
                          <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
                        </div>
                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-gray-100 relative">
                          <img src={feat.image} alt={feat.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-[2rem] overflow-hidden bg-gray-100 aspect-[4/3] shadow-sm w-full">
                        <img src={feat.image} alt={feat.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: idx % 2 === 0 ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`md:col-span-5 ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
                  >
                    <h3 className="text-3xl font-serif italic mb-8">{feat.title}</h3>
                    <div className="space-y-8">
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">
                          {feat.title === '生活化能力与完整度'
                            ? '运行时主链 RUNTIME CHAIN'
                            : feat.title === '个性化与长期使用'
                              ? '长期机制 LONG-TERM MECHANISM'
                            : feat.title === '关系体验'
                              ? '提示词系统 PROMPT SYSTEM'
                              : feat.title === '记忆沉淀'
                                ? '记忆分层 MEMORY ARCHITECTURE'
                                : feat.title === 'Bloom界面'
                                  ? '设计表达 DESIGN APPROACH'
                                  : '策略拆解 (Strategy Breakdown)'}
                        </h4>
                        <div className="space-y-4">
                          {asParagraphs(feat.tech).map((paragraph: string, paragraphIndex: number) => (
                            <p key={paragraphIndex} className="text-lg text-gray-600 leading-relaxed font-light">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">
                          {feat.title === 'Bloom界面'
                            ? '体验定位 EXPERIENCE'
                            : feat.title === '记忆沉淀'
                            ? '情感留存 MEMORY LAYER'
                            : feat.title === '生活化能力与完整度'
                              ? '世界补全 WORLD COMPLETENESS'
                              : feat.title === '个性化与长期使用'
                                ? '拥有感 OWNERSHIP'
                              : '关系主链 RELATIONSHIP FLOW'}
                        </h4>
                        <div className="space-y-4">
                          {asParagraphs(feat.gameplay).map((paragraph: string, paragraphIndex: number) => (
                            <p key={paragraphIndex} className="text-lg text-gray-600 leading-relaxed font-light">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="space-y-16 md:space-y-32">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full overflow-hidden rounded-[2rem] bg-gray-100"
            >
              <img src={project.images[0]} alt="" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="order-2 md:order-1"
              >
                <h3 className="text-3xl md:text-4xl font-serif italic mb-8">设计系统 (Design System)</h3>
                <p className="text-xl text-gray-600 leading-relaxed font-light">
                  我们开发了一套跨平台的综合设计系统。从字体排印、色彩方案到组件库，每一个细节都经过精心打磨，在保持独特美感的同时，确保了品牌的一致性。                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="order-1 md:order-2 w-full aspect-[4/5] overflow-hidden rounded-[2rem] bg-gray-100"
              >
                <img src={project.images[1]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full overflow-hidden rounded-[2rem] bg-gray-100"
            >
              <img src={project.images[2]} alt="" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
        )}

        {/* Next Project */}
        <div className="mt-32 pt-24 border-t border-black/10 text-center pb-12">
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-6">下一个项目 (Next Project)</p>
          <button 
            onClick={() => {
              onContentClick();
              onSelectProject(nextProject.id);
            }}
            className="group inline-block"
          >
            <h2 className="text-5xl md:text-7xl font-serif italic text-black group-hover:opacity-60 transition-opacity">
              {nextProject.title}
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-400 font-mono uppercase tracking-[0.3em]">
              {nextProject.titleEn}
            </p>
            <div className="h-[1px] w-0 bg-black group-hover:w-full transition-all duration-500 mt-4 mx-auto"></div>
          </button>
        </div>
      </div>

      {/* Character Modal */}
      <AnimatePresence>
        {selectedFeatureImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-xl"
            onClick={() => setSelectedFeatureImage(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative w-full max-w-7xl max-h-[88vh] flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedFeatureImage(null)}
                className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X size={20} />
              </button>
              <img
                src={selectedFeatureImage.src}
                alt={selectedFeatureImage.alt}
                className="max-w-full max-h-[88vh] object-contain rounded-[1.25rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}

        {selectedChar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-xl"
            onClick={() => setSelectedChar(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="bg-white w-full max-w-3xl rounded-[1.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[85vh] z-[110]"
              onClick={e => e.stopPropagation()}
            >
              {/* Left: Card Image */}
              <div className="md:w-[35%] relative aspect-[3/4] md:aspect-auto h-48 md:h-auto shrink-0">
                <img src={selectedChar.image} alt={selectedChar.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              {/* Right: Details */}
              <div className="md:w-[65%] p-6 md:p-10 flex flex-col bg-gray-50 overflow-y-auto">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">{selectedChar.role}</p>
                  <button 
                    onClick={() => setSelectedChar(null)} 
                    className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all hover:scale-110 active:scale-95 shadow-lg"
                  >
                    <X size={20} />
                  </button>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif italic mb-6">{selectedChar.name}</h2>
                
                <div className="mb-6">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-3">平台热度 Platform Heat</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedChar.platforms.map((p: HeatPlatform, i: number) => (
                      <div key={i} className="bg-white p-3 rounded-lg border border-black/5 shadow-sm">
                        <p className="text-[11px] font-sans font-medium text-gray-800 mb-0.5">{p.name}</p>
                        <p className="font-mono text-base text-black">{p.heat}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 font-sans font-light leading-relaxed mb-8 text-base">
                  {selectedChar.desc}
                </p>

                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-3">人物介绍 Character Introduction</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700 font-sans font-light leading-relaxed">
                      {selectedChar.intro}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}

const About: React.FC<{ setCursorVariant: CursorSetter }> = ({ setCursorVariant }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-32 relative z-10 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* Left: Typography & Text */}
          <div className="w-full md:w-1/2">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-7xl md:text-[9rem] leading-[0.85] font-serif italic tracking-tighter text-black mb-12"
            >
              Hi,<br/>
              <span className="font-sans not-italic font-light text-5xl md:text-7xl tracking-tight text-gray-800">I'm 张佳辉</span>
            </motion.h1>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8 text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-lg"
            >
              <p>
                我喜欢创造，也喜欢探索那些尚未被定义的东西。
              </p>
              <p>
                我总会对新鲜事物产生兴趣，也会本能地去想：<br />
                它还能不能更自然一点，<br />
                更清晰一点，<br />
                更接近人一点。
              </p>
              <p>
                我喜欢把脑海里模糊的感觉，慢慢整理成清晰的想法；<br />
                再用逻辑、表达和行动，<br />
                把它一步步变成可以被看见、被感知、被实现的存在。
              </p>
              <p>
                <strong className="font-medium text-black">对我来说，创造不是一时兴起的表达。</strong>
              </p>
              <p>
                而是一种持续的靠近。<br />
                靠近更好的想法，<br />
                靠近更真实的自我，<br />
                也靠近那些原本还不存在的可能。
              </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-16 pt-8 border-t border-black/10"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400">
                Current Status // Online & Overthinking
              </p>
            </motion.div>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <div className="w-full md:w-1/2 relative">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-2xl"
              onMouseEnter={() => setCursorVariant("contentHover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <img 
                src="/44.webp" 
                alt="Portrait" 
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

const Footer: React.FC<{ setCursorVariant: CursorSetter }> = ({ setCursorVariant }) => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center">
        <div className="flex flex-col items-center text-center">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-8 whitespace-nowrap"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            让我们一起，创造些什么。
          </h2>
          <a 
            href="mailto:hello@example.com" 
            className="text-xl border-b border-white/30 pb-1 hover:border-white transition-colors"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Zjh15377409273@outlook.com
          </a>
          <div className="mt-4 flex items-center gap-3 text-lg text-white/80">
            <Phone size={18} strokeWidth={1.8} />
            <span>15377409273</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

