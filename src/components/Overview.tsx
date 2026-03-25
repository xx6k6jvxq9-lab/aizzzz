import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface OverviewProps {
  projects: any[];
  onSelectProject: (id: string) => void;
  setCursorVariant: (variant: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ projects, onSelectProject, setCursorVariant }) => {
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
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">交互式工作台 Interactive Desk</p>
        <h2 className="text-4xl md:text-6xl font-serif italic text-black leading-tight">
          拖拽、放置、<br/> <span className="font-sans font-medium not-italic text-gray-300">探索。</span>
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
        drag
        dragConstraints={containerRef}
        dragElastic={0.1}
        initial={{ x: -300, y: 200, rotate: -5 }}
        animate={{ x: -400, y: 250, rotate: -8 }}
        className="absolute hidden md:block w-64 p-6 bg-yellow-100 shadow-lg border border-yellow-200/50 rotate-[-8deg] z-10 cursor-grab active:cursor-grabbing"
      >
        <div className="w-full h-4 bg-yellow-200/50 absolute top-0 left-0" />
        <p className="font-serif italic text-xl text-yellow-800/60 leading-tight">
          “玩耍是研究的最高形式。” <br/><br/>— 爱因斯坦
        </p>
      </motion.div>

      {/* Project Cards */}
      <div className="relative w-full h-full flex items-center justify-center">
        {projects.map((project, index) => {
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
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 pointer-events-none bg-gray-100">
                <img 
                  src={project.images[0]} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">{project.year}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">0{index + 1}</span>
                </div>
                <h2 className="text-2xl font-serif italic text-black mb-2">{project.title}</h2>
                <p className="text-xs text-gray-500 line-clamp-2 mb-6">{project.subtitle}</p>
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => onSelectProject(project.id)}
                  className="w-full py-3 bg-[#F7F7F5] hover:bg-black hover:text-white transition-colors rounded-xl text-xs font-mono uppercase tracking-widest flex justify-center items-center gap-2 group"
                >
                  查看详情 (Open Case) <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Overview;
