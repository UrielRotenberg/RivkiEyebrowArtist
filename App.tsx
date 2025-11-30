
import React, { useState, useEffect } from 'react';
import { ServiceType } from './types';
import { StarIcon, PhoneIcon, MenuIcon, XIcon, WhatsAppIcon, MapPinIcon, InstagramIcon } from './components/Icons';
import BookingWizard from './components/BookingWizard';
import AIConsultant from './components/AIConsultant';
import Testimonials from './components/Testimonials';
import AccessibilityToolbar from './components/AccessibilityToolbar';

const LOGO_URL = import.meta.env.BASE_URL + "rivki-logo.png";

const SERVICES = [
  {
    id: ServiceType.Eyebrows,
    title: 'עיצוב גבות',
    description: 'פיסול ועיצוב הגבה בהתאמה מושלמת למבנה הפנים, כולל ניקוי וגזירה.',
    price: 50,
    durationMin: '25',
    image: 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: ServiceType.Mustache,
    title: 'שפם',
    description: 'הסרת שיער בשעווה עדינה או חוט, ללא גירויים.',
    price: 20,
    durationMin: '10',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: ServiceType.Combo,
    title: 'קומבו גבות + שפם',
    description: 'החבילה המושלמת למראה נקי ורענן במחיר משתלם.',
    price: 60,
    durationMin: '30',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: ServiceType.Tinting,
    title: 'צביעת גבות',
    description: 'הדגשת הגבה באמצעות צבע טבעי ועמיד, למראה מלא ומודגש.',
    price: 25,
    durationMin: '15',
    image: 'https://images.unsplash.com/photo-1620331313123-6e3e1509a250?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: ServiceType.FaceWaxing,
    title: 'שעוות פנים',
    description: 'הסרת שיער עדינה מאזורים שונים בפנים (לחיים, סנטר, פאות). המחיר משתנה בהתאם לאזור.',
    price: '50-100',
    durationMin: '10-30',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Scroll Spy Logic
    const handleScrollSpy = () => {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      const sections = ['hero', 'about', 'services', 'testimonials', 'ai-tips', 'booking', 'contact'];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollSpy);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappMessage = encodeURIComponent("הגעתי מהאתר Rivki Eyebrow Artist");
  const whatsappLink = `https://wa.me/972555508321?text=${whatsappMessage}`;
  const mapsLink = "https://www.google.com/maps/search/?api=1&query=%D7%90%D7%9C%D7%AA%D7%A8+%D7%9E%D7%99%D7%94%D7%95%D7%93+3+%D7%A4%D7%AA%D7%97+%D7%AA%D7%A7%D7%95%D7%95%D7%94";
  const instagramLink = "https://www.instagram.com/rivki_roten";

  const getNavLinkClass = (id) => {
    const baseClass = "transition-all duration-300 hover:text-[#5D4037]";
    if (activeSection === id) {
      return `${baseClass} text-[#5D4037] font-bold border-b-2 border-[#5D4037] pb-1`;
    }
    return `${baseClass} text-stone-600`;
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#3E2723] font-sans overflow-x-hidden relative">
      
      <AccessibilityToolbar />

      {/* Watermark Background */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.08] overflow-hidden">
         <img src={LOGO_URL} alt="" className="w-[120%] max-w-none mix-blend-multiply" />
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div className="cursor-pointer flex items-center" onClick={() => scrollToSection('hero')}>
            <img src={LOGO_URL} alt="Rivki Eyebrow Artist" className="h-20 w-auto object-contain" />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-medium ml-10">
            <button onClick={() => scrollToSection('about')} className={getNavLinkClass('about')}>אודות</button>
            <button onClick={() => scrollToSection('services')} className={getNavLinkClass('services')}>טיפולים</button>
            <button onClick={() => scrollToSection('testimonials')} className={getNavLinkClass('testimonials')}>המלצות</button>
            <button onClick={() => scrollToSection('ai-tips')} className={getNavLinkClass('ai-tips')}>טיפים</button>
            <button onClick={() => scrollToSection('contact')} className={getNavLinkClass('contact')}>צור קשר</button>
          </div>

          <div className="hidden md:flex items-center gap-4">
             <button 
              onClick={() => scrollToSection('booking')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                activeSection === 'booking' 
                ? 'bg-[#8D6E63] text-white shadow-lg transform scale-105' 
                : scrolled ? 'bg-[#C4A484] text-white hover:bg-[#8D6E63]' : 'bg-white text-[#5D4037] hover:bg-[#faf9f6] shadow-lg'
              }`}
            >
              קבעי תור
            </button>

            {/* Social Icons - Desktop Header */}
            <div className="flex items-center gap-3 border-r border-stone-200 pr-4">
               <a href="tel:0555508321" className="text-stone-500 hover:text-[#5D4037] transition-colors p-1">
                 <PhoneIcon className="w-5 h-5" />
               </a>
               <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-green-600 transition-colors p-1">
                 <WhatsAppIcon className="w-5 h-5" />
               </a>
               <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-pink-600 transition-colors p-1">
                 <InstagramIcon className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#5D4037]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon className="w-8 h-8"/> : <MenuIcon className="w-8 h-8"/>}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-stone-100 p-6 flex flex-col gap-4 text-center">
            <button onClick={() => scrollToSection('about')} className={`text-lg py-2 ${activeSection === 'about' ? 'text-[#5D4037] font-bold' : 'text-stone-700'}`}>אודות</button>
            <button onClick={() => scrollToSection('services')} className={`text-lg py-2 ${activeSection === 'services' ? 'text-[#5D4037] font-bold' : 'text-stone-700'}`}>טיפולים</button>
            <button onClick={() => scrollToSection('testimonials')} className={`text-lg py-2 ${activeSection === 'testimonials' ? 'text-[#5D4037] font-bold' : 'text-stone-700'}`}>המלצות</button>
            <button onClick={() => scrollToSection('ai-tips')} className={`text-lg py-2 ${activeSection === 'ai-tips' ? 'text-[#5D4037] font-bold' : 'text-stone-700'}`}>טיפים</button>
            <button onClick={() => scrollToSection('booking')} className="text-lg font-bold py-2 text-[#5D4037]">קביעת תור</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Abstract Background - Light */}
        <div className="absolute inset-0 bg-[#f0ece9]/50">
             <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#D7CCC8] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
             <div className="absolute top-40 -left-20 w-72 h-72 bg-[#efebe9] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 pt-24 relative z-10 text-center flex flex-col items-center">
          <div className="inline-block mb-8 px-4 py-1 border border-[#8D6E63] rounded-full text-[#5D4037] text-sm tracking-wide uppercase bg-white/70 backdrop-blur-sm shadow-sm">
            סטודיו בוטיק
          </div>
          
          <img src={LOGO_URL} alt="Rivki Logo" className="w-40 md:w-60 h-auto mb-6 drop-shadow-sm" />

          <p className="text-xl text-[#6D4C41] mb-8 max-w-2xl mx-auto leading-relaxed">
            היי, אני ריבקי. מזמינה אותך לחוויה של דיוק, מקצועיות ויחס אישי. 
            כי הגבות שלך הן המסגרת של הפנים, ומגיע להן הטוב ביותר.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('booking')}
              className="bg-[#C4A484] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#A1887F] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-[#D7CCC8]"
            >
              שרייני מקום עכשיו
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="bg-white text-[#5D4037] border border-[#D7CCC8] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#faf9f6] hover:border-[#A1887F] transition-all duration-300"
            >
              לצפייה בטיפולים
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            
            {/* Image Column - Constrained width for portrait look */}
            <div className="md:w-1/2 flex justify-center">
               <div className="relative w-full max-w-sm">
                   <div className="absolute inset-0 bg-[#EFEBE9] rounded-2xl transform rotate-3 translate-x-2 translate-y-2"></div>
                   <img 
                    src="https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?auto=format&fit=crop&w=800&q=80" 
                    alt="Rivki Studio" 
                    className="relative rounded-2xl shadow-lg w-full h-[450px] object-cover"
                  />
               </div>
            </div>

            <div className="md:w-1/2 text-right">
              <h2 className="text-4xl font-bold text-[#3E2723] mb-6">נעים להכיר, ריבקי</h2>
              <div className="w-20 h-1 bg-[#C4A484] mb-8 rounded-full"></div>
              <p className="text-[#5D4037] text-lg leading-loose mb-6">
                עם ניסיון של שנתיים בתחום האסתטיקה, פיתחתי שיטה ייחודית המשלבת בין הטרנדים החדשים לבין הקלאסיקה שתמיד עובדת.
              </p>
              <p className="text-[#5D4037] text-lg leading-loose mb-8">
                הסטודיו שלי מעוצב באווירה רגועה ואינטימית, כדי שתוכלי להתנתק מהמרוץ היומיומי ולהעניק לעצמך רגע של שקט וטיפוח. אני משתמשת בחומרים האיכותיים ביותר (שעווה היפואלרגנית ופינצטות כירורגיות) כדי להבטיח תוצאה מושלמת ללא כאב מיותר.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#EFEBE9] rounded-full flex items-center justify-center text-[#5D4037]">
                    <StarIcon className="w-5 h-5"/>
                  </div>
                  <span className="font-medium text-[#4E342E]">מקצועיות ללא פשרות</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#EFEBE9] rounded-full flex items-center justify-center text-[#5D4037]">
                    <StarIcon className="w-5 h-5"/>
                  </div>
                  <span className="font-medium text-[#4E342E]">היגיינה וסטריליות</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#faf9f6] relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#3E2723] mb-4">תפריט טיפולים</h2>
            <p className="text-[#6D4C41] max-w-xl mx-auto">מגוון טיפולים אסתטיים המותאמים אישית לכל לקוחה, תוך שימוש בטכניקות מתקדמות.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group border border-[#EFEBE9]">
                <div className="h-48 overflow-hidden relative">
                   <div className="absolute inset-0 bg-[#8D6E63]/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#4E342E]">{service.title}</h3>
                    <span className="text-[#3E2723] font-bold bg-[#D7CCC8] px-2 py-1 rounded text-sm">{service.price} ₪</span>
                  </div>
                  <p className="text-[#6D4C41] text-sm mb-4 leading-relaxed min-h-[60px]">{service.description}</p>
                  <div className="flex justify-between items-center border-t border-[#EFEBE9] pt-4">
                    <span className="text-[#8D6E63] text-xs flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      {service.durationMin} דק'
                    </span>
                    <button 
                      onClick={() => scrollToSection('booking')}
                      className="text-[#5D4037] font-medium text-sm hover:text-[#3E2723] transition-colors"
                    >
                      הזמיני תור ←
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#3E2723] mb-4">לקוחות מספרות</h2>
            <p className="text-[#6D4C41] max-w-xl mx-auto">אלפי נשים כבר התאהבו, הנה טעימה קטנה מהפרגונים בוואטסאפ.</p>
          </div>
           <Testimonials />
        </div>
      </section>

      {/* AI Consultant Section */}
      <section id="ai-tips" className="py-12 bg-[#EFEBE9] relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
           <AIConsultant />
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3E2723] mb-4">קביעת תור בקליק</h2>
            <p className="text-[#6D4C41]">בחרי את הטיפול, התאריך והשעה - ואת בפנים.</p>
          </div>
          <BookingWizard services={SERVICES} />
        </div>
      </section>

      {/* Contact & Footer - Light Theme */}
      <footer id="contact" className="bg-[#f5f0eb] text-[#5D4037] py-16 border-t border-[#D7CCC8] relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-right">
            <div>
              <div className="mb-6 flex justify-center md:justify-start">
                  <img src={LOGO_URL} alt="Rivki Logo" className="h-16 w-auto mix-blend-multiply" />
              </div>
              <p className="leading-relaxed mb-6 text-[#5D4037]">
                הסטודיו המוביל לעיצוב גבות ואסתטיקת הפנים.
                <br/>
                דיוק, מקצועיות ואהבה למקצוע.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#3E2723] mb-6">שעות פעילות</h4>
              <ul className="space-y-3">
                <li className="flex justify-between md:justify-start gap-8 border-b border-[#D7CCC8] pb-2">
                  <span>א' - ה'</span>
                  <span className="text-[#3E2723] font-medium">16:00 - 20:00</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#3E2723] mb-6">יצירת קשר</h4>
              <ul className="space-y-4">
                <li>
                  <a href="tel:0555508321" className="flex items-center justify-center md:justify-start gap-3 hover:text-[#3E2723] transition-colors group">
                    <PhoneIcon className="w-5 h-5 text-[#8D6E63] group-hover:scale-110 transition-transform" />
                    <span className="font-bold">055-5508321</span>
                  </a>
                </li>
                <li>
                   <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-3 hover:text-green-700 transition-colors group">
                    <WhatsAppIcon className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                    <span>שלחי הודעה בווצאפ</span>
                  </a>
                </li>
                <li>
                  <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-3 hover:text-pink-600 transition-colors group">
                    <InstagramIcon className="w-5 h-5 text-pink-600 group-hover:scale-110 transition-transform" />
                    <span>rivki_roten</span>
                  </a>
                </li>
                <li>
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-3 hover:text-[#3E2723] transition-colors group">
                    <MapPinIcon className="w-5 h-5 text-[#8D6E63] group-hover:scale-110 transition-transform" />
                    <span>אלתר מיהוד 3, פתח תקווה</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#D7CCC8] mt-12 pt-8 text-center text-sm font-medium opacity-80">
            <p>כל הזכויות שמורות © אוריאל רוטנברג 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper icon component since it was used but not imported in the loop
const ClockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default App;
