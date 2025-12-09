import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-black/20 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-surface/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">关于ALLINSIGHT</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  专注于创意设计与数字内容制作，擅长将技术与艺术结合，打造有温度、有价值的作品。我们不仅是设计者，更是您品牌的战略合作伙伴。
                </p>
                <div className="flex gap-4 flex-wrap">
                  <div className="text-center p-4 bg-white/5 rounded-lg flex-1 min-w-[100px]">
                    <div className="text-2xl font-bold text-primary">4</div>
                    <div className="text-xs text-gray-500">核心服务领域</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg flex-1 min-w-[100px]">
                    <div className="text-2xl font-bold text-secondary">20+</div>
                    <div className="text-xs text-gray-500">优质案例</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg flex-1 min-w-[100px]">
                    <div className="text-2xl font-bold text-accent">10+</div>
                    <div className="text-xs text-gray-500">奖项荣誉</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-white mb-6">科技 + 艺术 + 创意</h2>
            <p className="text-gray-400 mb-8 text-lg">
              每一个作品都凝聚了对细节的追求与对创新的探索，致力于通过专业的技术与独特的创意，为客户提供超出预期的解决方案。
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                <i className="fa fa-map-marker w-8 text-primary text-xl"></i> 
                <span>中国 · 天津</span>
              </div>
              <div className="flex items-center text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                <i className="fa fa-envelope w-8 text-primary text-xl"></i> 
                <span>460117431@qq.com</span>
              </div>
              <div className="flex items-center text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                <i className="fa fa-phone w-8 text-primary text-xl"></i> 
                <span>18522087134</span>
              </div>
            </div>
            <a href="#contact" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1">
              联系我们
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;