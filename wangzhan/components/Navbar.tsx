import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#home' },
    { name: '精选作品', href: '#works' },
    { name: '服务体系', href: '#services' },
    { name: '关于我们', href: '#about' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav shadow-lg shadow-black/30' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30 transition-transform group-hover:rotate-3">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none group-hover:text-primary transition-colors">ALLINSIGHT</span>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase">Portfolio</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-all hover:scale-105">
              联系我
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl text-white" 
            onClick={() => setMobileMenuOpen(true)}
          >
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-dark/95 backdrop-blur-xl transform transition-transform duration-300 flex items-center justify-center ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button 
          className="absolute top-6 right-6 text-white text-3xl"
          onClick={() => setMobileMenuOpen(false)}
        >
          <i className="fa fa-times"></i>
        </button>
        <div className="flex flex-col space-y-8 text-center text-xl">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="text-primary font-bold" onClick={() => setMobileMenuOpen(false)}>联系我</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;