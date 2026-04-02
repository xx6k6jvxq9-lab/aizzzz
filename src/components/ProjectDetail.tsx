import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowUpRight, Box, Flame, X } from 'lucide-react';

const getVideoPoster = (url: string) =>
  url
    .replace(/-web\.mp4(\?.*)?$/i, '.webp')
    .replace(/\.mp4(\?.*)?$/i, '.webp');

interface ProjectDetailProps {
  project: any;
  projects: any[];
  onSelectProject: (id: string) => void;
  setCursorVariant: (variant: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, projects, onSelectProject, setCursorVariant }) => {
  const [selectedChar, setSelectedChar] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const [unlockedChars, setUnlockedChars] = useState<any[]>([]);
  const [totalHeat, setTotalHeat] = useState(0);
  const [playerOffset, setPlayerOffset] = useState(0);
  const directoryRef = useRef<HTMLDivElement>(null);
  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  useEffect(() => {
    if (directoryRef.current) {
      const activeItem = directoryRef.current.children[activeVideo] as HTMLElement;
      if (activeItem) {
        setPlayerOffset(activeItem.offsetTop);
      }
    }
  }, [activeVideo]);

  const handleFlipCard = (char: any) => {
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
      <div className="pt-40 md:pt-56 pb-12 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8 md:mb-16">
            <span className="w-12 h-[1px] bg-black/20"></span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
              {project.navTitle} &mdash; {project.year}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-[11vw] tracking-tighter leading-[0.85] text-black mb-16 md:mb-24 flex flex-col">
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
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-black/10 pt-12">
            <div>
              <p className="text-2xl md:text-4xl text-gray-800 font-light max-w-3xl leading-snug mb-2">
                {project.subtitle}
              </p>
              <p className="text-lg md:text-xl text-gray-500 font-light max-w-3xl leading-snug">
                {project.subtitleZh}
              </p>
            </div>
            <div className="flex items-center gap-4 text-gray-400 pb-2">
              <span className="font-mono text-xs uppercase tracking-widest">向下滚动 (Scroll)</span>
              <ArrowDown size={20} className="animate-bounce" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        {/* Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-black/10 pt-12 mb-32">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">职责 (Role)</h4>
            <p className="text-lg font-medium">{project.role}</p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">年份 (Year)</h4>
            <p className="text-lg font-medium">{project.year}</p>
          </div>
          <div className="col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">技术栈 (Technologies)</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="px-4 py-2 bg-white border border-black/5 rounded-full text-sm font-medium shadow-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          <div className="md:col-span-4">
            <h3 className="text-3xl md:text-4xl font-serif italic">The Challenge</h3>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light mb-8">
              {project.description}
            </p>
            {project.link && (
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105"
              >
                {project.linkText || 'Visit Project'}
                <ArrowUpRight className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Videos Section */}
        {project.videos && (
          <div className="mb-40 border-t border-black/10 pt-24">
            <div className="flex items-baseline gap-4 mb-20">
              <h3 className="text-4xl md:text-5xl font-serif italic">Visual Archives</h3>
              <span className="text-gray-400 font-sans text-xl tracking-widest">影像档案</span>
            </div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Directory (Left) */}
              <div className="md:col-span-4 flex flex-col">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8 px-2">
                  档案索引 Archive Index / {project.videos.length} Entries
                </div>
                <div ref={directoryRef} className="space-y-0 relative">
                  {project.videos.map((vid: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveVideo(idx)}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                      className={`group w-full text-left py-8 border-b border-black/5 transition-all duration-500 flex items-center justify-between px-2 ${
                        activeVideo === idx ? 'text-black' : 'text-gray-400 hover:text-black'
                      }`}
                    >
                      <div className="flex items-baseline gap-6">
                        <span className="font-mono text-xs opacity-50">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="flex flex-col">
                          <span className={`text-xl md:text-2xl font-serif italic transition-all duration-500 ${activeVideo === idx ? 'translate-x-2' : 'group-hover:translate-x-1'}`}>
                            档案文件 Archive File // {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-widest mt-1 opacity-50">
                            {vid.title} — {vid.platform}
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
              <div className="md:col-span-8 relative">
                <motion.div 
                  animate={{ y: playerOffset }}
                  transition={{ type: "spring", damping: 25, stiffness: 120 }}
                  className="relative"
                >
                  <motion.div 
                    layout
                    className="bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-black/5"
                  >
                    <div className="aspect-[21/9] bg-black relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeVideo}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0"
                        >
                          <video 
                            src={project.videos[activeVideo].url} 
                            poster={getVideoPoster(project.videos[activeVideo].url)}
                            controls={false}
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        </motion.div>
                      </AnimatePresence>

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

                      <div className="absolute top-6 right-6 z-20">
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-white/90">
                            {project.videos[activeVideo].platform}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <div className="mt-8 flex justify-between items-start px-2">
                    <div className="max-w-md">
                      <h4 className="text-2xl font-serif italic mb-2">{project.videos[activeVideo].title}</h4>
                      <p className="text-sm text-gray-500 font-sans font-light leading-relaxed">
                        从服务器检索到的机密视觉数据。参与度指标显示出高度的神经共鸣。
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-black">{project.videos[activeVideo].views}</p>
                      <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">总播放量 (Total Impressions)</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Characters Section */}
        {project.characters && (
          <div className="mb-32 border-t border-black/10 pt-24 relative">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-24">
              <div className="md:w-2/3">
                <div className="flex items-baseline gap-4 mb-8">
                  <h3 className="text-5xl md:text-7xl font-serif italic tracking-tighter">AI Entities</h3>
                  <span className="text-gray-300 font-sans text-2xl tracking-[0.2em] font-light">机密人格档案</span>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end gap-12">
                  <div className="relative">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4 flex items-center gap-2">
                      <Flame size={12} className="text-orange-500" /> 同步热度 Syncing Neural Heat
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
                      <span>35.7w Target</span>
                    </div>
                    <div className="w-full h-[2px] bg-black/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((totalHeat / 357000) * 100, 100)}%` }}
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
                    <span className="text-2xl font-sans font-light text-gray-300">/ {project.characters.length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full min-h-[700px] md:min-h-[900px] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.015] select-none">
                <h2 className="text-[25vw] font-serif italic leading-none whitespace-nowrap">Classified</h2>
              </div>

              <div className="relative w-full max-w-7xl h-full flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {project.characters.map((char: any, idx: number) => {
                  const isUnlocked = unlockedChars.find(u => u.name === char.name);
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
                      const target = e.target as HTMLElement;
                      if (target.closest('button')) return;
                      handleFlipCard(char);
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotate: rotate, 
                      x: tx, 
                      y: ty,
                      zIndex: isUnlocked ? 40 : 10 + idx
                    }}
                    whileHover={{ scale: 1.02, zIndex: 90, transition: { duration: 0.2 } }}
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
                              onClick={(e) => { e.stopPropagation(); setSelectedChar(char); }}
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
          </div>
        )}

        {/* Features Section */}
        {project.features && (
          <div className="space-y-24 md:space-y-40 mb-32">
            {project.features.map((feat: any, idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`md:col-span-7 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'} flex justify-center`}
                >
                  {project.isMobileMockup ? (
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
                      <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">策略拆解 (Strategy Breakdown)</h4>
                      <p className="text-lg text-gray-600 leading-relaxed font-light">{feat.tech}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">核心玩法 Core Gameplay</h4>
                      <p className="text-lg text-gray-600 leading-relaxed font-light">{feat.gameplay}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
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
                  我们开发了一套跨平台的综合设计系统。从字体排印、色彩方案到组件库，每一个细节都经过精心打磨，在保持独特美感的同时，确保了品牌的一致性。
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="order-1 md:order-2 w-full aspect-[4/5] overflow-hidden rounded-[2rem] bg-gray-100"
              >

              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full overflow-hidden rounded-[2rem] bg-gray-100"
            >

            </motion.div>
          </div>
        )}

        {/* Next Project */}
        <div className="mt-32 pt-24 border-t border-black/10 text-center pb-12">
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-6">下一个项目 (Next Project)</p>
          <button 
            onClick={() => onSelectProject(nextProject.id)}
            className="group inline-block"
          >
            <h2 className="text-5xl md:text-7xl font-serif italic text-black group-hover:opacity-60 transition-opacity">
              {nextProject.title}
            </h2>
            <div className="h-[1px] w-0 bg-black group-hover:w-full transition-all duration-500 mt-4 mx-auto"></div>
          </button>
        </div>
      </div>

      {/* Character Modal */}
      <AnimatePresence>
        {selectedChar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-xl"
            onClick={() => setSelectedChar(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="bg-white w-full max-w-3xl rounded-[1.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[85vh]"
              onClick={e => e.stopPropagation()}
            >

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
                    {selectedChar.platforms.map((p: any, i: number) => (
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
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-3">核心属性 Core Attributes</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedChar.stats).map(([stat, val]: any) => (
                      <div key={stat}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="font-sans font-medium text-gray-700">{stat}</span>
                          <span className="font-mono text-gray-500">{val}/100</span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${val}%` }}
                            className="h-full bg-black"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectDetail;
