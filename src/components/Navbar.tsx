import React from 'react';
import { motion } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setCursorVariant: (variant: string) => void;
  projects: any[];
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, setCursorVariant, projects }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', labelZh: '概述' },
    ...projects.map(p => ({ id: p.id, label: p.navTitle, labelZh: p.navTitleZh })),
    { id: 'about', label: 'About', labelZh: '关于' },
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

export default Navbar;
