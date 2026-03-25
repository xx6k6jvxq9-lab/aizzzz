import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, Twitter, Mail, Instagram } from 'lucide-react';

interface FooterProps {
  setCursorVariant: (variant: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCursorVariant }) => {
  return (
    <footer className="bg-white border-t border-black/5 py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
          {/* Left: Branding */}
          <div className="md:col-span-6">
            <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter mb-12">
              让我们共同 <br/>
              <span className="font-sans font-medium not-italic text-gray-300">构建</span> 未来。
            </h2>
            <div className="flex gap-4">
              {[
                { icon: <Github size={20} />, label: "GitHub" },
                { icon: <Twitter size={20} />, label: "Twitter" },
                { icon: <Instagram size={20} />, label: "Instagram" },
                { icon: <Mail size={20} />, label: "Email" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Links */}
          <div className="md:col-span-6 grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Navigation // 导航</p>
              <ul className="space-y-4">
                {['Overview', 'StarDeam', 'About'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-lg font-medium hover:text-gray-400 transition-colors flex items-center gap-2 group">
                      {item}
                      <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Contact // 联系</p>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:hello@stardeam.ai" className="text-lg font-medium hover:text-gray-400 transition-colors">
                    hello@stardeam.ai
                  </a>
                </li>
                <li>
                  <p className="text-lg font-medium text-gray-400">Shanghai, China</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-32 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            © 2026 StarDeam Studio. All rights reserved.
          </p>
          <div className="flex gap-12 font-mono text-[10px] uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
