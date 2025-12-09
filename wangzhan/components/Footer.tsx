import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <div className="mb-8">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">ALL INSIGHT</span>
        </div>
        <div className="flex justify-center space-x-8 mb-8">
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><i className="fa fa-weixin text-2xl"></i></a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><i className="fa fa-weibo text-2xl"></i></a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><i className="fa fa-instagram text-2xl"></i></a>
        </div>
        <p className="text-gray-600 text-sm">© 2025 天津奥因赛特科技有限公司 版权所有</p>
      </div>
    </footer>
  );
};

export default Footer;