import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accent/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
          <span className="block text-white mb-2 text-gradient">ALLINSIGHT</span>
          <span className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider block mt-4">
            AI设计-品牌全案-视频制作-3D打印
          </span>
          <span className="text-white text-xl md:text-2xl font-medium tracking-wide block mt-2 opacity-80">
            全链条服务
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s' }}>
          凝聚创意与技术的结晶，每一个作品都在讲述独特的故事。
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5 animate-fade-in-up opacity-0" style={{ animationDelay: '0.7s' }}>
          <a href="#works" className="btn-glow px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-1 transition-all">
            浏览作品集
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full glass-card hover:bg-white/10 text-white font-medium transform hover:-translate-y-1 transition-all">
            联系合作
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50 text-white">
        <i className="fa fa-angle-down text-2xl"></i>
      </div>
    </section>
  );
};

export default Hero;