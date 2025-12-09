import React from 'react';

const Services: React.FC = () => {
  const services = [
    {
      icon: 'fa-cube',
      title: '品牌全案',
      desc: '从策略定位到视觉识别系统(VI)，我们为您构建具有市场竞争力的品牌资产，涵盖品牌策划、视觉设计、品牌推广全流程。',
      color: 'text-primary',
      bg: 'bg-primary/20',
      border: 'hover:border-primary/50'
    },
    {
      icon: 'fa-play-circle',
      title: '视频制作',
      desc: 'TVC广告、企业宣传片及短视频内容。电影级调色与剪辑，讲述动人故事，涵盖前期策划、拍摄执行、后期制作全流程。',
      color: 'text-secondary',
      bg: 'bg-secondary/20',
      border: 'hover:border-secondary/50'
    },
    {
      icon: 'fa-graduation-cap',
      title: '智能培训',
      desc: '结合AIGC技术的智能培训解决方案，包括数字化课程开发、虚拟讲师系统、智能测评工具，助力企业人才发展。',
      color: 'text-success',
      bg: 'bg-success/20',
      border: 'hover:border-success/50'
    },
    {
      icon: 'fa-tv',
      title: '交互展陈',
      desc: '数字展厅、互动装置与沉浸式投影。融合科技与空间美学，创造惊艳现场体验，适用于展会、博物馆、企业展厅等场景。',
      color: 'text-accent',
      bg: 'bg-accent/20',
      border: 'hover:border-accent/50'
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-2 block">Our Services</span>
          <h2 className="text-4xl font-bold text-white mb-6">全链路创意服务</h2>
          <div className="w-16 h-10 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8 flex items-center justify-center">
            <span className="text-white font-bold">四大核心</span>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            我们提供从品牌策略到落地执行的全流程服务，<br className="hidden md:block"/>融合科技与艺术，为客户创造独特价值。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`group glass-card p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 border-t border-white/10 ${service.border} hover:-translate-y-2`}>
              <div className={`w-14 h-14 rounded-xl ${service.bg} ${service.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                <i className={`fa ${service.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;