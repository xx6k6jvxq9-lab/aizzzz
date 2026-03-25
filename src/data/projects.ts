import { Flame, Box, Sparkles } from 'lucide-react';

export const PROJECTS = [
  {
    id: 'project-1',
    title: 'AIGC Creation',
    titleZh: '数字工匠',
    navTitle: 'AIGC',
    subtitle: 'Digital Artisan & Creative Coder',
    subtitleZh: '在碳基生物和硅基逻辑之间反复横跳',
    year: '2026',
    role: 'Creator',
    description: '一个在碳基生物和硅基逻辑之间反复横跳的数字工匠。我致力于将复杂的技术转化为直观、优美的交互体验。通过深度提示词工程、动态人格建模以及沉浸式交互设计，我构建的不仅仅是应用，而是具有灵魂的数字生命。',
    tech: ['Prompt Engineering', 'React', 'Three.js', 'LLM Integration'],
    link: 'https://github.com',
    linkText: 'View on GitHub',
    images: [
      'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop'
    ],
    videos: [
      {
        title: 'Neural Mapping Demo',
        platform: 'Vimeo',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-connection-lines-34538-large.mp4',
        views: '12.4K'
      },
      {
        title: 'Emotional Feedback System',
        platform: 'YouTube',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-4430-large.mp4',
        views: '8.1K'
      }
    ],
    isMobileMockup: false,
    characters: [
      {
        name: 'Aura-01',
        role: 'Neural Guide',
        heatDisplay: '12.4K',
        heatValue: 12400,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        desc: 'Aura-01 是系统的核心引导者，负责协调神经元之间的信息流。她拥有极高的同理心算法，能够根据用户的记忆波动调整交互节奏。',
        platforms: [
          { name: 'Neural Link', heat: '8.2K' },
          { name: 'Ether Grid', heat: '4.2K' }
        ],
        stats: { 'Intelligence': 95, 'Empathy': 88, 'Processing': 92 }
      },
      {
        name: 'Echo',
        role: 'Memory Fragment',
        heatDisplay: '8.1K',
        heatValue: 8100,
        image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800&auto=format&fit=crop',
        desc: 'Echo 代表了被遗忘的记忆碎片。他在系统中以不稳定的形式存在，通过收集散落的数据点来重构过去。',
        platforms: [
          { name: 'Memory Bank', heat: '5.1K' },
          { name: 'Void Stream', heat: '3.0K' }
        ],
        stats: { 'Intelligence': 70, 'Empathy': 95, 'Processing': 65 }
      }
    ],
    features: [
      {
        title: '神经元映射 (Neuron Mapping)',
        tech: '采用 WebGL 与自定义着色器技术，实时渲染数百万个动态连接点。',
        gameplay: '用户可以通过手势交互，亲手编织属于自己的记忆网络。',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop'
      },
      {
        title: '情感反馈系统 (Emotional Feedback)',
        tech: '集成情感分析 API，根据用户的交互频率与力度调整视觉色调。',
        gameplay: '系统会根据用户的情绪状态，呈现出温暖、清冷或深邃的视觉氛围。',
        image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'project-2',
    title: 'Neon Pulse',
    titleZh: '霓虹脉冲',
    navTitle: 'Neon',
    subtitle: 'Cyberpunk Mobile Experience',
    subtitleZh: '赛博朋克移动端交互体验',
    year: '2025',
    role: 'Lead Designer',
    description: '一个为移动端打造的赛博朋克风格交互体验。我们挑战了传统移动界面的边界，将极简主义与霓虹美学完美融合。深度集成移动端线性马达，为每一次点击提供细腻的物理反馈。',
    tech: ['React Native', 'Framer Motion', 'Haptic API'],
    images: [
      'https://images.unsplash.com/photo-1550745679-33d01608216a?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop'
    ],
    videos: [
      {
        title: 'Interface Showcase',
        platform: 'Bilibili',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-4430-large.mp4',
        views: '22.1K'
      }
    ],
    isMobileMockup: true,
    characters: [
      {
        name: 'V',
        role: 'Street Samurai',
        heatDisplay: '22.1K',
        heatValue: 22100,
        image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop',
        desc: 'V 是霓虹之城的传奇。她游走在法律的边缘，用她的黑客技术与武士刀维护着底层的秩序。',
        platforms: [
          { name: 'Night City', heat: '15.2K' },
          { name: 'Undergrid', heat: '6.9K' }
        ],
        stats: { 'Intelligence': 85, 'Empathy': 60, 'Combat': 98 }
      }
    ],
    features: [
      {
        title: '霓虹界面 (Neon Interface)',
        tech: '使用高饱和度色彩与动态模糊效果，营造身临其境的赛博氛围。',
        gameplay: '极简的滑动手势即可完成复杂的系统操作，带来极致的流畅感。',
        image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2000&auto=format&fit=crop'
      }
    ]
  }
];
