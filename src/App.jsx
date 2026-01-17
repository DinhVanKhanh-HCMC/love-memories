import React, { useState, useEffect } from 'react';
import { Heart, Camera, Calendar, Sparkles, ArrowDown, Menu, X, ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LoveMemories() {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Độ dài hiệu ứng (ms)
      once: false,    // true: chỉ chạy 1 lần; false: lướt lên lướt xuống đều chạy lại
      easing: 'ease-in-out',
    });
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  
  // Ngày bắt đầu yêu
  const startDate = new Date('2025-11-06');
  const today = new Date();
  const daysTogether = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  
  // Ảnh cho slideshow hero
  const heroImages = [
    '/love-memories/images/anh1.jpg?w=1920&h=1080&fit=crop',
    '/love-memories/images/anh2.jpg?w=1920&h=1080&fit=crop',
    '/love-memories/images/anh3.jpg?w=1920&h=1080&fit=crop',
    '/love-memories/images/anh4.jpg?w=1920&h=1080&fit=crop'
  ];

  const openGallery = (memory) => {
    setSelectedMemory(memory);
    setCurrentImgIndex(0); // Luôn bắt đầu từ ảnh đầu tiên
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setSelectedMemory(null);
    document.body.style.overflow = 'auto';
  };

  // Hàm chuyển ảnh tiếp theo
  const nextImage = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài làm đóng modal
    if (currentImgIndex < selectedMemory.album.length - 1) {
      setCurrentImgIndex(currentImgIndex + 1);
    } else {
      setCurrentImgIndex(0); // Quay lại ảnh đầu nếu hết
    }
  };

  // Hàm quay lại ảnh trước
  const prevImage = (e) => {
    e.stopPropagation();
    if (currentImgIndex > 0) {
      setCurrentImgIndex(currentImgIndex - 1);
    } else {
      setCurrentImgIndex(selectedMemory.album.length - 1); // Đến ảnh cuối nếu đang ở đầu
    }
  };
  
  // Ảnh mẫu demo
  const memories = [
    { id: 1, title: 'Đi ăn cùng nhau nà', date: '29/11/2025', image: '/love-memories/1_havelunch/1.jpg?w=400&h=400&fit=crop',
      album: [
        '/love-memories/1_havelunch/1.jpg',
        '/love-memories/1_havelunch/2.jpg',
        '/love-memories/1_havelunch/3.jpg'
      ]
    },
    { id: 2, title: 'Đi Thảo Cầm Viên với nhau nà', date: '27/12/2025', image: '/love-memories/2_thaocamvien/1.jpg?w=400&h=400&fit=crop',
      album: [
        '/love-memories/2_thaocamvien/1.jpg',
        '/love-memories/2_thaocamvien/2.jpg',
        '/love-memories/2_thaocamvien/3.jpg',
        '/love-memories/2_thaocamvien/4.jpg',
      ]
    },
    { id: 3, title: 'Work date đồ đoá', date: '28/12/2025', image: '/love-memories/3_studydate/1.jpg?w=400&h=400&fit=crop',
      album: [
        '/love-memories/3_studydate/1.jpg',
      ]
    },
    { id: 4, title: 'Đi ăn cùng nhau ở Long Xuyên nà', date: '02/01/2025', image: '/love-memories/4_thaifood/1.jpg?w=400&h=400&fit=crop',
      album: [
        '/love-memories/4_thaifood/1.jpg',
        '/love-memories/4_thaifood/2.jpg',
        '/love-memories/4_thaifood/3.jpg',
        '/love-memories/4_thaifood/4.jpg',
      ]
    },
    { id: 5, title: 'Đi thăm khu lưu niệm Bác Tôn nà', date: '03/01/2025', image: '/love-memories/5_TonPresident/1.jpg?w=400&h=400&fit=crop',
      album: [
        '/love-memories/5_TonPresident/1.jpg',
        '/love-memories/5_TonPresident/2.jpg',
        '/love-memories/5_TonPresident/3.jpg',
        '/love-memories/5_TonPresident/4.jpg',
      ]
    },
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
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden" data-aos="fade-up">
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
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
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
          <div className="text-center mb-16 sm:mb-20 animate-fade-in-up" data-aos="fade-left">
            <div className="inline-block relative mb-6">
              <Sparkles className="inline-block text-yellow-400 animate-pulse" size={48} />
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50"></div>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent drop-shadow-lg">
              Về Chúng Mình
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg sm:text-2xl text-gray-700 max-w-3xl mx-auto font-medium px-4">
              Hai đứa gặp gỡ nhau vào một ngày đẹp trời tháng 11... ☀️
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12" data-aos="fade-right">
            <div className="group bg-gradient-to-br from-white/80 to-pink-50/80 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-2xl hover:shadow-pink-300/50 transition-all duration-500 hover:-translate-y-3 animate-fade-in-left border-2 border-pink-200/50">
              <div className="relative mb-6">
                <div className="w-24 h-24 p-1 bg-gradient-to-br from-pink-400 to-rose-600 rounded-3xl flex items-center justify-center transform rotate-6 group-hover:rotate-12 transition-transform shadow-xl overflow-hidden">
                  {/* Thẻ img thay cho Icon */}
                  <img 
                    src="/love-memories/images/anh6.jpg" // Thay đường dẫn ảnh của bạn ở đây
                    alt="Anh ấy"
                    className="w-full h-full object-cover rounded-[1.4rem] transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xl">👨</span>
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Anh ấy
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                Hỏng có gì để nói, hay chọc em hahaha
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-5 py-2.5 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">❤️ Hay chọc em</span>
                <span className="px-5 py-2.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">🎮 Ổ cứng</span>
                <span className="px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">🌟 IUH hihi</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-2xl hover:shadow-purple-300/50 transition-all duration-500 hover:-translate-y-3 animate-fade-in-right border-2 border-purple-200/50">
              <div className="relative mb-6">
                <div className="w-24 h-24 p-1 bg-gradient-to-br from-pink-400 to-rose-600 rounded-3xl flex items-center justify-center transform rotate-6 group-hover:rotate-12 transition-transform shadow-xl overflow-hidden">
                  {/* Thẻ img thay cho Icon */}
                  <img 
                    src="/love-memories/images/anh7.jpg" // Thay đường dẫn ảnh của bạn ở đây
                    alt="Cô ấy"
                    className="w-full h-full object-cover rounded-[1.4rem] transition-transform group-hover:scale-110"
                  />
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
                Là người tình cảm, dễ thương, đáng iu, ba gai, tiết kiệm chụp ảnh,... nói chung là tuyệt zời
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-5 py-2.5 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">💖 Dễ thương</span>
                <span className="px-5 py-2.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">🌸 Đáng yêu</span>
                <span className="px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">✨ Tuyệt vời</span>
              </div>
            </div>
          </div>

          <div className="relative group animate-fade-in-up" data-aos="fade-left">
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
        
        <div className="max-w-7xl mx-auto relative z-10" data-aos="fade-right">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" data-aos="fade-left">
            {memories.map((memory, index) => (
              <div
                key={memory.id}
                onClick={() => openGallery(memory)}
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

          {selectedMemory && (
            <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/98 backdrop-blur-md p-4 animate-fade-in overflow-hidden">
              
              <button 
                onClick={closeGallery}
                /* top-20 để nó nằm dưới thanh Navigation nếu thanh Nav vẫn còn lấp ló, 
                  hoặc để top-6 nhưng với z-index cực cao */
                className="fixed top-6 right-6 z-[1000] p-3 sm:p-4 bg-white/10 hover:bg-rose-500 backdrop-blur-xl rounded-full text-white transition-all shadow-2xl border border-white/20 active:scale-90"
                title="Đóng (Esc)"
              >
                <X size={28} className="sm:w-8 sm:h-8" />
              </button>

              {/* Nút Previous (Ẩn trên mobile nhỏ, hiện trên sm trở lên để tránh vướng) */}
              <button 
                onClick={prevImage}
                className="absolute left-2 sm:left-10 z-[110] p-3 sm:p-5 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all group active:scale-90"
              >
                <ChevronLeft size={32} className="sm:w-12 sm:h-12 group-hover:-translate-x-1 transition-transform" />
              </button>

              {/* Khu vực hiển thị ảnh chính */}
              <div className="relative w-full max-w-5xl h-[65vh] sm:h-[75vh] flex flex-col items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={selectedMemory.album[currentImgIndex]} 
                    alt="Gallery" 
                    /* Dùng object-contain để ảnh không bị méo và luôn thấy toàn bộ ảnh */
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-in"
                    key={currentImgIndex}
                  />
                </div>

                {/* Thông tin kỷ niệm */}
                <div className="mt-6 text-center text-white px-4">
                  <h2 className="text-xl sm:text-3xl font-black mb-1 line-clamp-1">{selectedMemory.title}</h2>
                  <p>Nhấn vào chỗ bất kỳ trừ nút chuyển ảnh để tắt</p>
                  <div className="flex items-center justify-center gap-3 text-pink-400 font-bold text-sm sm:text-base">
                    <Calendar size={18} />
                    <span>{selectedMemory.date}</span>
                    <span className="px-3 py-0.5 bg-white/10 rounded-full text-xs text-white border border-white/10">
                      {currentImgIndex + 1} / {selectedMemory.album.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Nút Next */}
              <button 
                onClick={nextImage}
                className="absolute right-2 sm:right-10 z-[110] p-3 sm:p-5 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all group active:scale-90"
              >
                <ChevronRight size={32} className="sm:w-12 sm:h-12 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Lớp phủ click để đóng (Z-index 100 để nằm dưới nút và ảnh) */}
              <div className="absolute inset-0 z-[90]" onClick={closeGallery}></div>
              
              {/* Thêm một nút đóng phụ to rõ ràng ở dưới cùng dành riêng cho Mobile */}
              <button 
                onClick={closeGallery}
                className="sm:hidden mt-8 px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white font-bold text-sm backdrop-blur-md active:bg-rose-500/50"
              >
                Vuốt xuống hoặc chạm để đóng
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-16 sm:mt-24 text-center animate-fade-in-up" data-aos="fade-right">
            <div className="inline-block relative group cursor-pointer" onClick={() => setIsOpened(true)}>
              
              {/* 1. HIỆU ỨNG ÁNH SÁNG NỀN (Giữ nguyên) */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>

              {/* 2. NỘI DUNG LỜI CHÚC (Sẽ hiện ra khi isOpened = true) */}
              <div className={`relative bg-gradient-to-br from-white/90 to-pink-50/90 backdrop-blur-xl rounded-[2.5rem] px-10 sm:px-16 py-10 sm:py-12 shadow-2xl border-2 border-pink-200/50 transition-all duration-1000 ${
                isOpened ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-12 blur-lg pointer-events-none'
              }`}>
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

              {/* 3. LỚP PHỦ HỘP QUÀ (Sẽ mất đi khi isOpened = true) */}
              {!isOpened && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 to-purple-600 rounded-[2.5rem] shadow-2xl transition-all duration-700 hover:scale-105 active:scale-95">
                  <div className="relative">
                    <Gift className="text-white animate-bounce" size={80} strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-white font-bold mt-4 tracking-widest animate-pulse">
                    NHẤN ĐỂ MỞ QUÀ 💕
                  </p>
                  
                  {/* Nơ hộp quà trang trí */}
                  <div className="absolute top-0 w-full h-8 bg-white/20 rounded-t-[2.5rem]"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-white/20"></div>
                </div>
              )}
            </div>
            
            {/* Nút để đóng hộp quà lại nếu muốn chơi lại */}
            {isOpened && (
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpened(false); }}
                className="mt-6 text-pink-500 font-bold text-sm hover:underline opacity-60"
              >
                Gói lại hộp quà
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}