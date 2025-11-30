
import React, { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon, QuoteIcon } from './Icons';

const testimonialsData = [
  {
    id: 1,
    text: "\"בוקר טוב ריבקי! קמתי מבסוטית על החיים, הסתכלתי במראה ואני מאוהבת בעצמי! מה הורסססס ואת אישה מדהימה!!!! שמחתי מאוד להכיר אותך!!\"",
    author: "עדי מזרחי",
    reply: "איזה כיף לשמוע נסיכה! שמחה שאת מרוצה, עשית לי את היום 😍"
  },
  {
    id: 2,
    text: "\"ריבקי אהובה! חייבת לפרגן לך, הגעתי אליך עם גבות הרוסות ועשית לי שיקום מטורף. לא מחליפה אותך בחיים!! היד הכי עדינה שיש ❤️\"",
    author: "נועה כהן",
    reply: "תודה רבה אהובה! תתחדשי, יצא לך מושלם! 😘"
  },
  {
    id: 3,
    text: "\"היי ריבקי, רק רציתי להגיד תודה ענקית. השפם והגבות יצאו וואו, והכי חשוב - לא כאב לי בכלל! את הכי מקצועית שפגשתי.\"",
    author: "שירן אברהמי",
    reply: "באהבה גדולה! נתראה בחודש הבא 😉"
  },
  {
    id: 4,
    text: "\"ריבקי תקשיבי, כולם מחמיאים לי על הגבות! איזה שינוי, אני בשוק. תודה על הסבלנות ועל הדיוק, אין עלייך בעולם.\"",
    author: "מיכל לוי",
    reply: "איזה אושר! כיף שאהבת ❤️"
  }
];

// Component to simulate a WhatsApp Screen
const WhatsAppScreen = ({ name, message, reply }) => (
  <div className="w-full h-full bg-[#efeae2] flex flex-col font-sans relative overflow-hidden text-right" dir="rtl">
    {/* WhatsApp Header */}
    <div className="bg-[#008069] p-3 flex items-center gap-3 shadow-sm z-10 text-white">
       <div className="cursor-pointer">
         <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
       </div>
       <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center overflow-hidden border border-white/20">
          <div className="font-bold text-stone-500 text-xs">{name ? name.charAt(0) : '?'}</div>
       </div>
       <div className="flex-1">
         <div className="font-bold text-sm leading-tight">{name}</div>
         <div className="text-[10px] opacity-90">מחובר/ת כעת</div>
       </div>
       <div className="flex gap-4 opacity-80">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15.9 14.3L15 13.4c-.7-.7-1.7-.7-2.4 0l-1.4 1.4c-.3.3-.7.2-1-.1-1.1-1.1-2.2-2.2-3.3-3.3-.3-.3-.4-.7-.1-1l1.4-1.4c.7-.7.7-1.7 0-2.4l-.9-.9C7 5.1 6.1 5 5.4 5.6L4.2 6.8c-.6.6-.7 1.5-.1 2.3 2.1 3.2 5.5 6.6 8.7 8.7.8.6 1.7.5 2.3-.1l1.2-1.2c.6-.7.5-1.6-.4-2.2z"></path></svg>
       </div>
    </div>

    {/* Chat Area - Using CSS pattern instead of external image for reliability */}
    <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3 relative bg-[#e5ddd5]" style={{ backgroundImage: 'radial-gradient(#d1d7db 7%, transparent 7%)', backgroundSize: '20px 20px' }}>
       
       <div className="flex justify-center my-2 opacity-80">
         <span className="bg-[#e6f2f2] text-stone-600 text-[10px] font-medium px-2 py-1 rounded-lg shadow-sm border border-stone-100">היום</span>
       </div>

       {/* Incoming Message (Client) - White Bubble on Right */}
       <div className="self-start max-w-[85%] flex flex-col items-start mr-2">
         <div className="bg-white p-2 pl-3 rounded-lg rounded-tr-none shadow-sm text-right relative">
            <p className="text-stone-800 text-sm leading-snug whitespace-pre-wrap">{message.replace(/"/g, '')}</p>
            <div className="text-[10px] text-stone-400 text-left mt-1 flex items-center justify-end gap-1">
               10:23
            </div>
            {/* Triangle Tip */}
            <div className="absolute top-0 -right-2 w-0 h-0 border-[8px] border-transparent border-t-white border-l-white"></div>
         </div>
       </div>

       {/* Outgoing Message (Rivki) - Green Bubble on Left */}
       <div className="self-end max-w-[85%] flex flex-col items-end ml-2">
          <div className="bg-[#d9fdd3] p-2 pr-3 rounded-lg rounded-tl-none shadow-sm text-right relative">
            <p className="text-stone-800 text-sm leading-snug">{reply}</p>
             <div className="text-[10px] text-[#787c79] text-left mt-1 flex items-center justify-start gap-1">
               <span>10:25</span>
               {/* Blue Checks */}
               <svg viewBox="0 0 16 11" width="14" height="10" fill="#53bdeb"><path d="M11.5 0L16 4.5 14.6 5.9 11.5 2.8 11.5 2.8 11.5 2.8 11.5 2.8 6.9 7.4 8.3 8.8 12.9 4.2 12.9 4.2 12.9 4.2 12.9 4.2 14.3 5.6 14.3 5.6 14.3 5.6 9.8 10.1 5.5 5.8 5.5 5.8 5.5 5.8 0 0.3 1.4 1.7 5.5 5.8 5.5 5.8 5.5 5.8 9.8 1.5 11.2 0.1 11.5 0.4 11.5 0z" /></svg>
            </div>
             {/* Triangle Tip */}
            <div className="absolute top-0 -left-2 w-0 h-0 border-[8px] border-transparent border-t-[#d9fdd3] border-r-[#d9fdd3]"></div>
          </div>
       </div>
    </div>
    
    {/* Fake Input Bar */}
    <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t border-stone-200">
       <div className="p-1 text-stone-500"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 11h6v2h-6v-2zm-6 2h6v-2H6v2zm0-4h12V7H6v2z"></path></svg></div>
       <div className="flex-1 bg-white rounded-full h-10 px-4 flex items-center text-sm text-stone-400 shadow-sm border border-stone-100 text-right">הקלד/י הודעה...</div>
       <div className="p-2 bg-[#008069] rounded-full text-white shadow-sm"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg></div>
    </div>
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Container - flex-col on mobile, flex-row on desktop. removed overflow-hidden on mobile to prevent clipping */}
      <div className="relative bg-white rounded-3xl shadow-xl border border-[#D7CCC8] flex flex-col md:flex-row h-auto md:min-h-[550px] overflow-hidden">
        
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D7CCC8] rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 -translate-x-1/2 z-0"></div>
        
        {/* Text Section (Right on RTL Desktop, Top on Mobile) */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center relative bg-white order-1 z-10">
          <QuoteIcon className="w-12 h-12 md:w-16 md:h-16 text-[#EFEBE9] absolute top-6 left-6 md:top-10 md:left-10 -z-0 transform -scale-x-100" />
          
          <div className="relative z-10 animate-fadeIn" key={currentIndex}>
            <h3 className="text-xl md:text-3xl font-bold text-[#4E342E] leading-relaxed mb-4 md:mb-6 font-serif italic min-h-[120px] md:min-h-0">
              {testimonialsData[currentIndex].text}
            </h3>
            
            <div className="flex items-center gap-4 mt-4 md:mt-8">
              <div className="w-12 h-1 bg-[#C4A484] rounded-full"></div>
              <p className="text-lg font-bold text-[#5D4037]">
                {testimonialsData[currentIndex].author}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 md:mt-12 z-20">
             <button 
                onClick={nextSlide} 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-[#faf9f6] hover:border-[#A1887F] hover:text-[#3E2723] transition-all text-[#8D6E63] group shadow-sm"
                aria-label="הבא"
             >
               <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-0.5 transition-transform" />
             </button>
             <button 
                onClick={prevSlide}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-[#faf9f6] hover:border-[#A1887F] hover:text-[#3E2723] transition-all text-[#8D6E63] group shadow-sm"
                 aria-label="הקודם"
             >
               <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-x-0.5 transition-transform" />
             </button>
          </div>
          
          {/* Dots */}
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-16 flex gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 md:w-8 bg-[#8D6E63]' : 'w-2 bg-stone-200 hover:bg-stone-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Phone Section (Left on RTL Desktop, Bottom on Mobile) */}
        <div className="w-full md:w-5/12 bg-[#faf9f6] relative p-8 flex items-center justify-center border-t md:border-t-0 md:border-r border-[#D7CCC8] order-2 min-h-[450px] md:min-h-full">
           <div className="relative w-[240px] md:w-full md:max-w-[280px] aspect-[9/18] bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-stone-800 overflow-hidden transform rotate-0 md:rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ring-1 ring-stone-900/10">
              {/* Simulated Phone Notch/Bar */}
              <div className="absolute top-0 inset-x-0 h-6 bg-stone-800 z-20 flex justify-center">
                  <div className="w-20 md:w-24 h-4 bg-stone-900 rounded-b-xl"></div>
              </div>
              
              {/* Screen Content */}
              <div className="w-full h-full pt-6 bg-stone-800">
                  <WhatsAppScreen 
                      name={testimonialsData[currentIndex].author} 
                      message={testimonialsData[currentIndex].text}
                      reply={testimonialsData[currentIndex].reply}
                  />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
