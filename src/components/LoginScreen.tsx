import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onEnter: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onEnter }) => {
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
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
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

      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">System Status // 系统状态</span>
          <span className="font-mono text-xs uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Neural Link Active
          </span>
        </div>
        <div className="text-right">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">Access Point // 接入点</span>
          <span className="font-mono text-xs uppercase tracking-widest">Tokyo_Node_09</span>
        </div>
      </div>

      <div className="flex flex-col items-center relative z-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-[12vw] md:text-[8vw] font-serif italic leading-none tracking-tighter">
            AIGC <br/> <span className="font-sans font-medium not-italic text-gray-300">Archives.</span>
          </h1>
        </motion.div>
        
        <div className="w-full max-w-md">
          <div className="flex justify-between items-end mb-4 font-mono text-[10px] uppercase tracking-[0.3em]">
            <span className="opacity-40">Initializing Neural Mesh</span>
            <span className="text-black font-bold">{progress}%</span>
          </div>
          <div className="w-full h-[1px] bg-black/5 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-black"
              initial={{ x: "-100%" }}
              animate={{ x: `${progress - 100}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end relative z-10">
        <div className="max-w-xs">
          <p className="text-[10px] font-mono uppercase tracking-widest leading-relaxed opacity-40">
            Warning: Unauthorized access to neural archives is strictly prohibited. All connections are monitored.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">Protocol // 协议</span>
          <span className="font-mono text-xs uppercase tracking-widest">TLS_1.3_SECURE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginScreen;
