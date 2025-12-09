import React, { useState } from 'react';
import { portfolioItems } from '../data/portfolioData';
import { Category, PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const filters = [
    { label: '全部', value: 'all' },
    { label: '品牌全案', value: Category.BRAND },
    { label: '视频制作', value: Category.VIDEO },
    { label: '智能培训', value: Category.TRAINING },
    { label: '交互展陈', value: Category.EXHIBITION },
  ];

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
  };

  return (
    <section id="works" className="py-24 relative bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">精选作品</h2>
            <p className="text-gray-400 max-w-xl">
              我们提供从创意到落地的全流程解决方案。
            </p>
          </div>
          
          <div className="glass-card p-1.5 rounded-full flex space-x-1 flex-wrap justify-center">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f.value 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              onClick={() => openModal(item)}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={item.cover} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <span className="px-6 py-2 border border-white text-white rounded-full font-bold tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    查看详情
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-lg font-bold text-white truncate pr-2">{item.title}</h3>
                   {item.awards && (
                     <span className="text-yellow-500 text-xs border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 rounded">
                       <i className="fa fa-trophy mr-1"></i>获奖
                     </span>
                   )}
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-2 h-10 mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center mb-6 shadow-inner">
              <i className="fa fa-folder-open-o text-3xl text-gray-600"></i>
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">暂无相关作品</h3>
            <p className="text-gray-500 text-sm">请切换其他分类查看</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
          >
            <i className="fa fa-times text-4xl"></i>
          </button>

          <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 h-[90vh] lg:h-auto">
            {/* Left: Carousel */}
            <div className="lg:w-2/3 flex flex-col justify-center relative bg-black/50 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              
              {/* Main Media Display */}
              <div className="relative w-full h-[50vh] lg:h-[600px] flex items-center justify-center bg-black">
                 {selectedItem.category === Category.VIDEO && selectedItem.videoUrl && currentImageIndex === 0 ? (
                    <video 
                      src={selectedItem.videoUrl} 
                      controls 
                      className="w-full h-full object-contain"
                      poster={selectedItem.cover}
                    />
                 ) : (
                    <img 
                      src={selectedItem.images[currentImageIndex]} 
                      alt={`Slide ${currentImageIndex}`} 
                      className="w-full h-full object-contain"
                    />
                 )}
                 
                 {/* Navigation Arrows */}
                 {selectedItem.images.length > 1 && (
                   <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                    >
                      <i className="fa fa-chevron-left"></i>
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                   </>
                 )}
              </div>

              {/* Thumbnails */}
              {selectedItem.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto no-scrollbar bg-dark/50 border-t border-white/5">
                  {selectedItem.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                        currentImageIndex === idx ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="thumb" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="lg:w-1/3 flex flex-col text-left overflow-y-auto max-h-[40vh] lg:max-h-[600px] p-2">
              <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
                {filters.find(f => f.value === selectedItem.category)?.label}
              </span>
              <h3 className="text-3xl font-bold text-white mb-6">{selectedItem.title}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">客户 / 对象</h4>
                  <p className="text-gray-200">{selectedItem.client || '自研项目'}</p>
                </div>
                
                {selectedItem.awards && selectedItem.awards.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">获得奖项</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.awards.map(award => (
                        <span key={award} className="text-yellow-400 text-sm flex items-center">
                          <i className="fa fa-trophy mr-2"></i>{award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">项目描述</h4>
                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                    {selectedItem.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">标签</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;