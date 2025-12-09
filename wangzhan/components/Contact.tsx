import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-2 block">Contact Us</span>
          <h2 className="text-4xl font-bold text-white mb-6">开启合作之旅</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto border-t border-white/10">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">公司名称</label>
                <input type="text" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm transition-colors" placeholder="请输入公司名称" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">联系人</label>
                <input type="text" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm transition-colors" placeholder="请输入联系人姓名" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">联系电话</label>
                <input type="tel" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm transition-colors" placeholder="请输入联系电话" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">电子邮箱</label>
                <input type="email" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm transition-colors" placeholder="请输入电子邮箱" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">合作需求</label>
              <select className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm appearance-none cursor-pointer">
                <option value="">请选择合作类型</option>
                <option value="brand">品牌全案合作</option>
                <option value="video">视频制作合作</option>
                <option value="training">智能培训合作</option>
                <option value="exhibition">交互展陈合作</option>
                <option value="other">其他合作需求</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">需求描述</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm resize-none" placeholder="请详细描述您的合作需求..."></textarea>
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg hover:shadow-primary/25 transition-all transform active:scale-[0.98]">
              提交合作申请
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;