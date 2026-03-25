import React from 'react';
import { motion } from 'motion/react';
import { PenTool, Code2, Blocks, Sparkles, Box, Bot, Type, Layers, Flame, TrendingUp, Users } from 'lucide-react';

interface AboutProps {
  setCursorVariant: (variant: string) => void;
}

const About: React.FC<AboutProps> = ({ setCursorVariant }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
        {/* Left: Bio */}
        <div className="md:col-span-7">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-serif italic tracking-tighter mb-12 leading-[0.9]">
              探索 <span className="font-sans font-medium not-italic text-gray-300">AI</span> 与 <br/>
              <span className="text-transparent [-webkit-text-stroke:1px_#1A1A1A]">叙事</span> 的边界。
            </h1>
            
            <div className="space-y-8 text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl">
              <p>
                我是一名专注于 AIGC 领域的跨界设计师与产品策划。在算法驱动的时代，我致力于寻找技术冷峻感与人类情感叙事之间的完美平衡。
              </p>
              <p>
                通过深度提示词工程、动态人格建模以及沉浸式交互设计，我构建的不仅仅是应用，而是具有灵魂的数字生命。
              </p>
            </div>
          </motion.div>

          {/* Stats/Skills Grid */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-12">
            {[
              { icon: <PenTool size={20} />, label: "Prompt Engineering", desc: "提示词工程" },
              { icon: <Code2 size={20} />, label: "Product Strategy", desc: "产品策略" },
              { icon: <Blocks size={20} />, label: "UI/UX Design", desc: "交互设计" },
              { icon: <Sparkles size={20} />, label: "AI Character", desc: "人格建模" },
              { icon: <Box size={20} />, label: "3D Visuals", desc: "三维视觉" },
              { icon: <Bot size={20} />, label: "LLM Integration", desc: "大模型集成" },
            ].map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="group"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                  {skill.icon}
                </div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-1">{skill.label}</h4>
                <p className="font-medium">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Sidebar/Details */}
        <div className="md:col-span-5 space-y-16">
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-gray-50 p-12 rounded-[2.5rem] border border-black/5"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400 mb-8">Current Focus // 当前关注</h3>
            <div className="space-y-10">
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                  <TrendingUp size={20} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase">研究方向 (Research)</p>
                  <p className="font-medium group-hover:text-blue-600 transition-colors">多模态人格一致性 (Multimodal Consistency)</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                  <Users size={20} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase">社区贡献 (Community)</p>
                  <p className="font-medium group-hover:text-blue-600 transition-colors">AI 提示词开放标准 (Open Prompt Standard)</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                  📚
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase">正在阅读 (Reading)</p>
                  <p className="font-medium group-hover:text-blue-600 transition-colors">设计心理学 (Design of Everyday Things)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
