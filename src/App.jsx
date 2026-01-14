import React, { useState, useEffect } from 'react';
import { Heart, Camera, Calendar, Sparkles, ArrowDown, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LoveMemories() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Ngày bắt đầu yêu
  const startDate = new Date('2025-11-06');
  const today = new Date();
  const daysTogether = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  
  // Ảnh cho slideshow hero
  const heroImages = [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1470228a23b9-e67a71b4a9ce?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&h=1080&fit=crop'
  ];
  
  // Ảnh mẫu demo
  const memories = [
    { id: 1, title: 'Ngày đầu gặp nhau', date: '15/06/2023', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop' },
    { id: 2, title: 'Picnic cuối tuần', date: '22/07/2023', image: 'https://images.unsplash.com/photo-1470428638778-de9a77f6e3ee?w=400&h=400&fit=crop' },
    { id: 3, title: 'Chuyến đi biển', date: '15/08/2023', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop' },
    { id: 4, title: 'Hẹn hò cafe', date: '03/09/2023', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop' },
    { id: 5, title: 'Sinh nhật anh', date: '20/10/2023', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop' },
    { id: 6, title: 'Noel cùng nhau', date: '24/12/2023', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=400&fit=crop' },
  ];

  // Auto slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'about', 'memories'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation - Fixed at 1024px breakpoint */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl' : 'bg-white/70 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-bounce-slow cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative">
              <Heart className="text-pink-500 fill-pink-500" size={32} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <span className="font-black text-xl sm:text-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              Kỷ Niệm Của Chúng Mình
            </span>
          </div>
          
          {/* Desktop Menu - Shows at 1024px and above */}
          <div className="hidden lg:flex gap-3">
            {[
              { id: 'hero', label: 'Trang chủ', icon: Heart },
              { id: 'about', label: 'Về chúng mình', icon: Sparkles },
              { id: 'memories', label: 'Kỷ niệm', icon: Camera }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`group flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 font-semibold ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white shadow-lg shadow-pink-300/50 scale-105'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:scale-105'
                }`}
              >
                <Icon size={18} className={activeSection === id ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button - Shows below 1024px */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-pink-100 transition-all active:scale-95"
          >
            {mobileMenuOpen ? (
              <X className="text-gray-700" size={26} />
            ) : (
              <Menu className="text-gray-700" size={26} />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-xl shadow-xl px-4 py-4 space-y-2 border-t border-pink-200">
            {[
              { id: 'hero', label: 'Trang chủ', icon: Heart },
              { id: 'about', label: 'Về chúng mình', icon: Sparkles },
              { id: 'memories', label: 'Kỷ niệm', icon: Camera }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-semibold ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-300/50'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100'
                }`}
              >
                <Icon size={22} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section with Image Slider */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image Slider with Blur */}
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="text-pink-500" size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight className="text-pink-500" size={24} />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-gradient-to-r from-pink-500 to-purple-500'
                  : 'w-3 h-3 bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Floating hearts animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-400 opacity-30 animate-float"
              size={Math.random() * 50 + 20}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl animate-fade-in-up">
          <div className="inline-block mb-6 animate-bounce-slow">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
              <Heart className="relative text-pink-500 fill-pink-500" size={80} />
              <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" size={36} />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
              Tình Yêu Của
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent drop-shadow-2xl">
              Chúng Mình
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-10 font-medium drop-shadow-lg">
            Nơi lưu giữ những khoảnh khắc ngọt ngào nhất 💕
          </p>

          <div className="flex gap-4 sm:gap-6 justify-center flex-wrap mb-12">
            <div className="group bg-white/90 backdrop-blur-xl rounded-3xl px-8 sm:px-10 py-5 sm:py-6 shadow-2xl hover:shadow-pink-300/50 transition-all hover:scale-110 border-2 border-pink-200">
              <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                {daysTogether}
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-bold">Ngày bên nhau</div>
            </div>
            
            <div className="group bg-white/90 backdrop-blur-xl rounded-3xl px-8 sm:px-10 py-5 sm:py-6 shadow-2xl hover:shadow-purple-300/50 transition-all hover:scale-110 border-2 border-purple-200">
              <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                ∞
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-bold">Yêu mãi mãi</div>
            </div>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-pink-300/50 transition-all hover:scale-110 active:scale-95"
          >
            <span>Khám phá câu chuyện của chúng mình</span>
            <ArrowDown size={22} className="group-hover:animate-bounce" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-6xl w-full relative z-10">
          <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
            <div className="inline-block relative mb-6">
              <Sparkles className="inline-block text-yellow-400 animate-pulse" size={48} />
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50"></div>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent drop-shadow-lg">
              Về Chúng Mình
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg sm:text-2xl text-gray-700 max-w-3xl mx-auto font-medium px-4">
              Câu chuyện tình yêu của hai đứa bắt đầu từ một ngày hè tháng 6... ☀️
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <div className="group bg-gradient-to-br from-white/80 to-pink-50/80 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-2xl hover:shadow-pink-300/50 transition-all duration-500 hover:-translate-y-3 animate-fade-in-left border-2 border-pink-200/50">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-600 rounded-3xl flex items-center justify-center transform rotate-6 group-hover:rotate-12 transition-transform shadow-xl">
                  <Heart className="text-white fill-white" size={36} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xl">👨</span>
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Anh ấy
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                Người luôn làm em cười, người bảo vệ em, người yêu em thật nhiều. 
                Anh là ánh sáng rực rỡ trong cuộc đời em, là lý do để em mỉm cười mỗi ngày.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-5 py-2.5 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">❤️ Ấm áp</span>
                <span className="px-5 py-2.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">🎮 Vui vẻ</span>
                <span className="px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">🌟 Tuyệt vời</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-2xl hover:shadow-purple-300/50 transition-all duration-500 hover:-translate-y-3 animate-fade-in-right border-2 border-purple-200/50">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-3xl flex items-center justify-center transform -rotate-6 group-hover:-rotate-12 transition-transform shadow-xl">
                  <Heart className="text-white fill-white" size={36} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.2s' }}>
                  <span className="text-xl">👩</span>
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Cô ấy
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                Người luôn bên anh, người hiểu anh nhất. 
                Em là món quà quý giá nhất mà cuộc sống dành cho anh, là người anh muốn nắm tay suốt đời.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-5 py-2.5 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">💖 Dễ thương</span>
                <span className="px-5 py-2.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">🌸 Đáng yêu</span>
                <span className="px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">✨ Tuyệt vời</span>
              </div>
            </div>
          </div>

          <div className="relative group animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-[2.5rem] blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative text-center">
                <div className="inline-block mb-6">
                  <Calendar className="inline-block drop-shadow-2xl" size={56} />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black mb-4 drop-shadow-lg">Ngày Đặc Biệt</h3>
                <div className="w-20 h-1.5 bg-white/50 mx-auto rounded-full mb-6"></div>
                <p className="text-2xl sm:text-3xl font-bold mb-4 drop-shadow-md">20 tháng 11, 2025</p>
                <p className="text-base sm:text-xl font-medium opacity-95 max-w-2xl mx-auto">
                  Ngày mà <span className="font-black">"bé Đa"</span> thuộc về <span className="font-black">"chú bé Khanh"</span> 💕
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Memories Gallery Section */}
      <section id="memories" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
            <div className="inline-block relative mb-6">
              <Camera className="inline-block text-purple-500 animate-pulse" size={52} />
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-40"></div>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
              Kỷ Niệm Của Chúng Mình
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg sm:text-2xl text-gray-700 max-w-3xl mx-auto font-medium px-4">
              Những khoảnh khắc đẹp nhất, những nụ cười ngọt ngào nhất 📸
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {memories.map((memory, index) => (
              <div
                key={memory.id}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-purple-300/50 transition-all duration-500 hover:-translate-y-4 animate-fade-in-up border-4 border-white"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Content on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <h3 className="text-2xl sm:text-3xl font-black mb-3 drop-shadow-2xl">{memory.title}</h3>
                    <div className="flex items-center gap-2 text-sm sm:text-base font-semibold opacity-90">
                      <Calendar size={18} />
                      <span>{memory.date}</span>
                    </div>
                  </div>
                </div>

                {/* Floating heart icon */}
                <div className="absolute top-4 right-4 w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 group-hover:rotate-12 transition-all duration-500">
                  <Heart className="text-white fill-white" size={26} />
                </div>

                {/* Index number */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center font-black text-pink-600 shadow-lg">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 sm:mt-24 text-center animate-fade-in-up">
            <div className="inline-block relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-white/90 to-pink-50/90 backdrop-blur-xl rounded-[2.5rem] px-10 sm:px-16 py-10 sm:py-12 shadow-2xl border-2 border-pink-200/50">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Heart className="text-pink-500 fill-pink-500 animate-pulse drop-shadow-2xl" size={52} />
                </div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-4 mt-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Yêu Em Hơn Hôm Qua
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-800 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Ít Hơn Ngày Mai
                </p>
                <div className="w-32 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6"></div>
                <p className="text-base sm:text-lg text-gray-700 font-semibold">
                  From Van Khanh with love to Thanh Ngan 💕
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}