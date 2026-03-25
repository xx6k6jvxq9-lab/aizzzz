import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowUpRight, Sparkles, Star, Moon, Zap, Heart, Camera } from 'lucide-react';

interface StarDeamDetailProps {
  project: any;
  projects: any[];
  onSelectProject: (id: string) => void;
  setCursorVariant: (variant: string) => void;
}

const StarDeamDetail: React.FC<StarDeamDetailProps> = ({ project, projects, onSelectProject, setCursorVariant }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Floating stars for background
  const stars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative bg-[#050505] text-white min-h-screen overflow-hidden"
    >
      {/* Dynamic Starry Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0.2, scale: 0.5 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2], 
              scale: [0.5, 1.2, 0.5],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: star.duration, 
              repeat: Infinity, 
              delay: star.delay,
              ease: "easeInOut"
            }}
            className="absolute bg-white rounded-full blur-[1px]"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-40 md:pt-56 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-purple-400">
              {project.navTitle} // {project.year}
            </span>
          </div>

          <h1 className="text-7xl md:text-[14vw] font-black leading-[0.8] tracking-tighter mb-12 flex flex-col">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-400">
              {project.title}
            </span>
            <span className="text-4xl md:text-6xl font-serif italic text-purple-500/80 mt-4">
              {project.titleZh}
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <p className="text-xl md:text-3xl font-light text-gray-400 leading-tight max-w-xl">
              {project.subtitle} <br/>
              <span className="text-purple-400/60 italic">{project.subtitleZh}</span>
            </p>
            <div className="flex justify-start md:justify-end">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-purple-500/40"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest">Dive into Dream</span>
                <ArrowDown size={24} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Feature List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-purple-500 mb-8">System Modules // 系统模块</h3>
            {project.features.map((feat: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveFeature(idx)}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-500 border ${
                  activeFeature === idx 
                    ? 'bg-white/10 border-purple-500/50 shadow-2xl shadow-purple-500/10' 
                    : 'bg-transparent border-white/5 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className={`font-mono text-xs ${activeFeature === idx ? 'text-purple-400' : 'text-gray-600'}`}>
                    0{idx + 1}
                  </span>
                  <h4 className={`text-xl font-medium ${activeFeature === idx ? 'text-white' : 'text-gray-400'}`}>
                    {feat.title}
                  </h4>
                </div>
                {activeFeature === idx && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm text-gray-400 leading-relaxed mt-4"
                  >
                    {feat.gameplay}
                  </motion.p>
                )}
              </button>
            ))}
          </div>

          {/* Right: Visual Showcase */}
          <div className="lg:col-span-7 sticky top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Decorative Frame */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
                  <img 
                    src={project.features[activeFeature].image} 
                    alt={project.features[activeFeature].title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                  
                  {/* Overlay Labels */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2">
                      <Zap size={12} className="text-yellow-400" />
                      <span className="font-mono text-[10px] uppercase text-white/80">Active Module</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="flex flex-col gap-2">
                      <h5 className="font-mono text-[10px] uppercase tracking-widest text-purple-400">Technical Implementation</h5>
                      <p className="text-sm text-white/90 font-light leading-relaxed">
                        {project.features[activeFeature].tech}
                      </p>
                    </div>
                  </div>

                {/* Floating Icons */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <Camera className="text-purple-400" size={24} />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <Heart className="text-pink-400" size={20} />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* "The Fame" Section - Brutalist Style */}
      <div className="relative z-10 bg-white text-black py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-6">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-8">
                The Price of <br/>
                <span className="text-transparent [-webkit-text-stroke:2px_black]">Stardom</span>
              </h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-12">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {project.tech.map((t: string) => (
                  <span key={t} className="px-6 py-3 bg-black text-white rounded-full text-xs font-mono uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-2xl bg-purple-900/10">
                <img 
                  src={project.images[0]} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-purple-600/20 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Project Footer */}
      <div className="relative z-10 py-32 text-center bg-[#050505]">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-gray-600 mb-8">Next Dream // 下一个梦境</p>
        <button 
          onClick={() => onSelectProject(nextProject.id)}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          className="group relative inline-block"
        >
          <h2 className="text-5xl md:text-[8vw] font-black tracking-tighter uppercase transition-all duration-500 group-hover:text-purple-500 group-hover:italic">
            {nextProject.title}
          </h2>
          <motion.div 
            className="h-2 bg-purple-500 mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
          />
        </button>
      </div>

      {/* Bottom Navigation Bar (Special for StarDeam) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full flex items-center gap-8 shadow-2xl">
        <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <Moon size={18} />
          <span className="font-mono text-[10px] uppercase tracking-widest">Night Mode</span>
        </button>
        <div className="w-[1px] h-4 bg-white/20" />
        <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <Zap size={18} />
          <span className="font-mono text-[10px] uppercase tracking-widest">Fast Forward</span>
        </button>
      </div>
    </motion.div>
  );
};

export default StarDeamDetail;
