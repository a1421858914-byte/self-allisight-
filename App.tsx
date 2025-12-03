import React, { useState, useEffect, useRef } from 'react';
import { Category, WorkItem, ToastMessage } from './types';
import { saveWork, getAllWorks } from './services/db';

// --- Helper Components ---

const Toast = ({ msg, remove }: { msg: ToastMessage; remove: (id: number) => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => remove(msg.id), 3000);
    return () => clearTimeout(timer);
  }, [msg.id, remove]);

  return (
    <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border mb-3 transition-all transform animate-fade-in-up
      ${msg.type === 'error' ? 'bg-red-900/40 border-red-500/50 text-white' : 'bg-green-900/40 border-green-500/50 text-white'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
        <i className={`fa ${msg.type === 'error' ? 'fa-exclamation' : 'fa-check'}`}></i>
      </div>
      <div>
        <h4 className="font-bold text-sm">{msg.type === 'error' ? 'Failure' : 'Success'}</h4>
        <p className="text-xs text-gray-300">{msg.text}</p>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  // State
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Refs for Scroll
  const homeRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Load Data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getAllWorks();
      setWorks(data);
    } catch (e) {
      console.error("Failed to load works", e);
    }
  };

  const addToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToasts(prev => [...prev, { id: Date.now(), text, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // --- Render Helpers ---

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const titleInput = form.elements.namedItem('title') as HTMLInputElement;
    const descInput = form.elements.namedItem('desc') as HTMLTextAreaElement;
    const catInput = form.elements.namedItem('category') as HTMLSelectElement;
    const coverInput = form.elements.namedItem('cover') as HTMLInputElement;
    const fileInput = form.elements.namedItem('file') as HTMLInputElement;

    if (!coverInput.files?.[0] || !fileInput.files?.[0]) {
      addToast('请上传完整的封面和内容文件', 'error');
      return;
    }

    const newWork: WorkItem = {
      id: Date.now().toString(),
      title: titleInput.value,
      description: descInput.value,
      category: catInput.value as Category,
      coverBlob: coverInput.files[0],
      fileBlob: fileInput.files[0],
      fileName: fileInput.files[0].name,
      fileType: fileInput.files[0].type,
      createdAt: Date.now(),
    };

    try {
      await saveWork(newWork);
      await loadData(); // Reload from DB
      setIsUploadModalOpen(false);
      addToast('作品发布成功！');
      form.reset();
    } catch (err) {
      addToast('保存失败，可能是文件过大', 'error');
    }
  };

  const filteredWorks = filter === 'all' ? works : works.filter(w => w.category === filter);

  return (
    <div className="relative min-h-screen">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accent/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300">
        <nav className="glass-nav py-4 px-6 md:px-12">
          <div className="container mx-auto flex justify-between items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo(homeRef); }} className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">A</div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none group-hover:text-primary transition-colors">ALL INSIGHT</span>
                <span className="text-[10px] tracking-widest text-gray-400 uppercase">Design Agency</span>
              </div>
            </a>
            
            <div className="hidden md:flex items-center space-x-10">
              {[
                { label: '首页', ref: homeRef },
                { label: '精选作品', ref: worksRef },
                { label: '服务体系', ref: servicesRef },
                { label: '关于我们', ref: aboutRef },
              ].map(item => (
                <button key={item.label} onClick={() => scrollTo(item.ref)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  {item.label}
                </button>
              ))}
              <button onClick={() => scrollTo(contactRef)} className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-all hover:scale-105">
                合作咨询
              </button>
            </div>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl text-white">
              <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-dark/95 backdrop-blur-xl md:hidden flex items-center justify-center">
          <div className="flex flex-col space-y-8 text-center text-xl">
            <button onClick={() => scrollTo(homeRef)} className="text-white hover:text-primary">首页</button>
            <button onClick={() => scrollTo(worksRef)} className="text-white hover:text-primary">精选作品</button>
            <button onClick={() => scrollTo(servicesRef)} className="text-white hover:text-primary">服务体系</button>
            <button onClick={() => scrollTo(aboutRef)} className="text-white hover:text-primary">关于我们</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section ref={homeRef} className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent text-xs tracking-wider mb-8 backdrop-blur-sm">
              ✨ 视觉艺术家 / 智能科技设计
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <span className="block text-white mb-2">光影所至</span>
            <span className="text-gradient">皆为传奇</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            我们用镜头重塑视觉想象，融合 AIGC 与传统美学，致力于为每一个品牌瞬间注入电影般的质感与灵魂。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <button onClick={() => scrollTo(worksRef)} className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-1 transition-all">
              探索作品
            </button>
            <button onClick={() => scrollTo(contactRef)} className="px-8 py-4 rounded-full glass-card hover:bg-white/10 text-white font-medium transform hover:-translate-y-1 transition-all">
              开启合作
            </button>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section ref={worksRef} className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
                精选作品 
                <button onClick={() => setIsUploadModalOpen(true)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center text-gray-600 hover:text-primary transition-all text-xs" title="内部上传通道">
                  <i className="fa fa-lock"></i>
                </button>
              </h2>
              <p className="text-gray-400 max-w-xl">凝聚创意与技术的结晶，每一个像素都在讲述品牌的故事。</p>
            </div>
            
            <div className="glass-card p-1.5 rounded-full flex space-x-1 overflow-x-auto max-w-full">
              {[
                { id: 'all', label: '全部' },
                { id: Category.BRAND, label: '品牌' },
                { id: Category.VIDEO, label: '视频' },
                { id: Category.EXHIBITION, label: '展陈' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id as any)}
                  className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === cat.id ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {works.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center mb-6 shadow-inner">
                <i className="fa fa-folder-open-o text-3xl text-gray-600"></i>
              </div>
              <h3 className="text-xl font-medium text-gray-300 mb-2">作品集暂未发布</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">目前没有公开展示的作品。内部人员请使用左上角锁图标入口上传。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWorks.map((work) => (
                <div key={work.id} className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-fade-in-up">
                  <div className="aspect-[4/3] overflow-hidden relative cursor-pointer" onClick={() => setActiveWork(work)}>
                    <img 
                      src={URL.createObjectURL(work.coverBlob)} 
                      alt={work.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60"></div>
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <span className="px-6 py-2 border border-white text-white rounded-full font-bold tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        查看详情
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur text-xs text-white rounded-md border border-white/10 uppercase">
                        {work.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 truncate">{work.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 h-10">{work.description || '暂无描述'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-dark/90 backdrop-blur-sm" onClick={() => setIsUploadModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl glass-panel rounded-2xl p-8 border border-primary/20 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <i className="fa fa-cloud-upload text-primary mr-3"></i> 内部作品上传
              </h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-white">
                <i className="fa fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">作品标题</label>
                  <input name="title" type="text" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm" placeholder="输入标题..." required />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">分类</label>
                  <select name="category" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm appearance-none cursor-pointer" required>
                    <option value={Category.BRAND}>品牌全案 (Brand)</option>
                    <option value={Category.VIDEO}>视频制作 (Video)</option>
                    <option value={Category.EXHIBITION}>交互展陈 (Exhibition)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative group">
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">1. 封面图 (JPG/PNG)</label>
                  <input name="cover" type="file" accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30" required />
                </div>
                <div className="relative group">
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">2. 完整内容 (PDF/PPT/图片)</label>
                  <input name="file" type="file" accept=".pdf,.ppt,.pptx,image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-accent/20 file:text-accent hover:file:bg-accent/30" required />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">作品简介</label>
                <textarea name="desc" rows={2} className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm resize-none" placeholder="简要描述..."></textarea>
              </div>
              
              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg hover:shadow-primary/25 transition-all transform active:scale-[0.98]">
                <i className="fa fa-check mr-2"></i>确认发布
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Full Screen Viewer (The "New Page") */}
      {activeWork && (
        <WorkViewer work={activeWork} onClose={() => setActiveWork(null)} />
      )}

      {/* Services Section */}
      <section ref={servicesRef} className="py-24 relative overflow-hidden bg-black/20">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-2 block">Our Services</span>
            <h2 className="text-4xl font-bold text-white mb-6">全链路创意服务</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'fa-cube', title: '品牌全案', desc: '从策略定位到视觉识别系统(VI)，我们为您构建具有市场竞争力的品牌资产。', color: 'text-primary', border: 'hover:border-primary/50' },
              { icon: 'fa-play-circle', title: '视频制作', desc: 'TVC广告、企业宣传片及短视频内容。电影级调色与剪辑，讲述动人故事。', color: 'text-secondary', border: 'hover:border-secondary/50' },
              { icon: 'fa-tv', title: '交互展陈', desc: '数字展厅、互动装置与沉浸式投影。融合科技与空间美学，创造惊艳现场。', color: 'text-accent', border: 'hover:border-accent/50' },
              { icon: 'fa-magic', title: 'AIGC 创新', desc: '利用人工智能生成内容技术，探索视觉边界，提供IP孵化与数字资产生成。', color: 'text-purple-400', border: 'hover:border-purple-400/50' },
            ].map((s, i) => (
              <div key={i} className={`group glass-card p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 border-t border-white/10 ${s.border}`}>
                <div className={`w-14 h-14 rounded-xl bg-white/5 ${s.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`fa ${s.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Contact Section */}
      <section ref={aboutRef} className="py-24 relative z-10">
        <div ref={contactRef} className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-2xl opacity-20"></div>
                <div className="relative glass-panel p-8 rounded-2xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">关于奥因塞特 (ALL INSIGHT)</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    不只是记录者，更是时光的造梦师。作为天津奥因赛特设计有限公司的核心团队，我们依托"人工智能与科技艺术协同创新中心"，致力于以数字技术驱动设计创新。
                  </p>
                  <div className="flex gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg flex-1">
                      <div className="text-2xl font-bold text-primary">3+</div>
                      <div className="text-xs text-gray-500">核心领域</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg flex-1">
                      <div className="text-2xl font-bold text-secondary">100+</div>
                      <div className="text-xs text-gray-500">商业案例</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-white mb-6">科技 + 艺术 + 文化</h2>
              <p className="text-gray-400 mb-8 text-lg">
                我们擅长将中国传统文化元素与现代设计语言、数字技术相结合，打造具有独特故事性与情感价值的IP形象与产品。
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300 gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary"><i className="fa fa-map-marker"></i></div>
                  <span>天津市 · 海河教育园区</span>
                </div>
                <div className="flex items-center text-gray-300 gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary"><i className="fa fa-envelope"></i></div>
                  <span>460117431@qq.com</span>
                </div>
                <div className="flex items-center text-gray-300 gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary"><i className="fa fa-phone"></i></div>
                  <span>136 1218 5987</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <div className="mb-8">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">ALL INSIGHT</span>
          </div>
          <div className="flex justify-center space-x-8 mb-8">
            {['weixin', 'weibo', 'instagram'].map(icon => (
              <a key={icon} href="#" className="text-gray-500 hover:text-white transition-colors"><i className={`fa fa-${icon} text-2xl`}></i></a>
            ))}
          </div>
          <p className="text-gray-600 text-sm">© 2025 天津奥因塞特设计有限公司 版权所有</p>
        </div>
      </footer>

      {/* Toast Container */}
      <div className="fixed top-24 right-6 z-[70] flex flex-col items-end pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
             <Toast msg={t} remove={removeToast} />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Viewer Component (Separate for clarity) ---

const WorkViewer: React.FC<{ work: WorkItem; onClose: () => void }> = ({ work, onClose }) => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [zoom, setZoom] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // Create Object URL for the full file
    const url = URL.createObjectURL(work.fileBlob);
    setFileUrl(url);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      URL.revokeObjectURL(url);
      document.body.style.overflow = 'auto';
    };
  }, [work]);

  const handleZoom = (e: React.WheelEvent) => {
    if (!work.fileType.startsWith('image/')) return;
    if (e.ctrlKey || isZoomed) {
      e.stopPropagation(); // Prevent page scroll if implemented incorrectly, though body is locked
      setZoom(prev => Math.min(3, Math.max(0.5, prev - e.deltaY * 0.001)));
      setIsZoomed(true);
    }
  };
  
  const resetZoom = () => {
    setZoom(1);
    setIsZoomed(false);
  }

  // Determine viewer content based on file type
  const renderContent = () => {
    const type = work.fileType;

    if (type.startsWith('image/')) {
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden" onWheel={handleZoom} onDoubleClick={resetZoom}>
           <img 
            src={fileUrl} 
            alt={work.title} 
            style={{ transform: `scale(${zoom})`, cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
            className="max-w-full max-h-full object-contain transition-transform duration-100 ease-linear rounded shadow-2xl"
            onClick={() => setIsZoomed(!isZoomed)}
          />
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full text-xs text-white backdrop-blur-md pointer-events-none">
             支持滚轮/双击缩放
          </div>
        </div>
      );
    }

    if (type === 'application/pdf') {
      return (
        <iframe 
          src={fileUrl} 
          title={work.title} 
          className="w-full h-full rounded shadow-2xl border-0"
        ></iframe>
      );
    }

    // PPT or other files that browser cannot preview natively without extensions or external services
    return (
      <div className="text-center p-12 glass-card rounded-2xl max-w-2xl mx-auto flex flex-col items-center">
        <i className="fa fa-file-powerpoint-o text-7xl text-secondary mb-8"></i>
        <h3 className="text-3xl font-bold text-white mb-4">文件预览受限</h3>
        <p className="text-gray-400 mb-8 text-lg">
          该作品为演示文稿格式 ({work.fileName.split('.').pop()})。<br/>
          由于浏览器安全限制，请下载后查看。
        </p>
        <a 
          href={fileUrl} 
          download={work.fileName} 
          className="px-10 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-all shadow-lg shadow-primary/30 flex items-center gap-2"
        >
          <i className="fa fa-download"></i> 下载完整文件
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-md flex flex-col animate-fade-in-up">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-dark/50 z-10">
        <div className="flex items-center gap-4 overflow-hidden">
          <h3 className="text-lg font-bold text-white truncate max-w-md">{work.title}</h3>
          <span className="px-2 py-0.5 rounded bg-white/10 text-xs text-gray-400">{work.category.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={fileUrl} download={work.fileName} className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
            <i className="fa fa-download"></i> <span className="hidden sm:inline">下载源文件</span>
          </a>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden p-4 md:p-8 flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;