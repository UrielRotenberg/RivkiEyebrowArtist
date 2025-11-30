
import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon, CheckIcon } from './Icons';

const BookingWizard = ({ services }) => {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({
    serviceId: null,
    date: '',
    time: '',
    clientName: '',
    clientPhone: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [inputType, setInputType] = useState('text');
  const dateInputRef = useRef(null);

  // Calculate Date Limits based on "Thursday of Next Week" logic
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon... 6=Sat
  
  // Logic: Calculate days until *this* week's Thursday (4), then add 7 days for *next* week's Thursday.
  const daysUntilMaxDate = (4 - dayOfWeek) + 7; 
  
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + daysUntilMaxDate);
  
  const minDateStr = today.toISOString().split('T')[0];
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const timeSlots = [
    "16:00", "16:30", "17:00", "17:30", 
    "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  // Reset input type when date is cleared
  useEffect(() => {
    if (!details.date) {
      setInputType('text');
    } else {
      setInputType('date');
    }
  }, [details.date]);

  const handleServiceSelect = (id) => {
    setDetails(prev => ({ ...prev, serviceId: id }));
    setStep(2);
  };

  const handleTimeSelect = (time) => {
    setDetails(prev => ({ ...prev, time }));
  };

  const handleDateChange = (e) => {
    const selectedDateStr = e.target.value;
    
    // Allow clearing the date
    if (!selectedDateStr) {
      setDetails(prev => ({ ...prev, date: '', time: '' }));
      return;
    }

    const selectedDate = new Date(selectedDateStr);
    const day = selectedDate.getDay();

    // Check if Friday (5) or Saturday (6)
    if (day === 5 || day === 6) {
      setError('הסטודיו פעיל בימים א׳-ה׳ בלבד.');
      setDetails(prev => ({ ...prev, date: '', time: '' }));
      return;
    }

    setError('');
    setDetails(prev => ({ ...prev, date: selectedDateStr, time: '' }));
  };

  const handleDateStepSubmit = (e) => {
    e.preventDefault();
    if (details.date && details.time) {
      setStep(3);
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedService = services.find(s => s.id === details.serviceId);

  // Robust function to open the date picker
  const activateDatePicker = (e) => {
    // Prevent default if it's an event triggered call (like a link click inside label)
    if (e && e.preventDefault) {
      // e.preventDefault(); // Don't prevent default on click, it might stop focus
    }

    setInputType('date');
    
    // Small timeout to allow render cycle to update input type before showing picker
    setTimeout(() => {
      try {
        if (dateInputRef.current) {
          if ('showPicker' in dateInputRef.current) {
            dateInputRef.current.showPicker();
          } else {
            dateInputRef.current.click();
          }
        }
      } catch (err) {
        console.log("Picker open error:", err);
      }
    }, 10);
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setInputType('text');
    }
  };

  if (submitted) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg mx-auto border border-[#EFEBE9]">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-bold text-[#3E2723] mb-2">התור נקבע בהצלחה!</h3>
        <p className="text-[#5D4037] text-lg mb-6">תודה רבה {details.clientName}, מחכה לראותך.</p>
        <div className="bg-[#faf9f6] p-4 rounded-lg text-right mb-6 inline-block w-full border border-[#D7CCC8]">
          <p className="font-bold text-[#4E342E]">{selectedService?.title}</p>
          <p className="text-[#6D4C41]">
            {new Date(details.date).toLocaleDateString('he-IL')} בשעה {details.time}
          </p>
        </div>
        <button 
          onClick={() => { setSubmitted(false); setStep(1); setDetails({ serviceId: null, date: '', time: '', clientName: '', clientPhone: '' }) }}
          className="text-[#8D6E63] hover:text-[#5D4037] font-medium underline"
        >
          קבעי תור נוסף
        </button>
      </div>
    );
  }

  return (
    <div id="booking-wizard" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-[#EFEBE9] flex flex-col md:flex-row min-h-[500px]">
      <style>{`
        /* Hide the native calendar icon in WebKit browsers to use our custom one */
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none !important;
          -webkit-appearance: none;
        }
      `}</style>

      {/* Sidebar Progress */}
      <div className="bg-[#f5f0eb] text-[#3E2723] p-8 md:w-1/3 flex flex-col justify-between border-l border-[#D7CCC8]">
        <div>
          <h3 className="text-2xl font-bold mb-6 text-[#3E2723]">קביעת תור</h3>
          <div className="space-y-6">
            <div className={`flex items-center gap-3 transition-colors ${step >= 1 ? 'text-[#5D4037]' : 'text-stone-300'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-[#8D6E63] bg-[#D7CCC8]' : 'border-stone-200'}`}>1</div>
              <span className="font-medium">בחירת טיפול</span>
            </div>
            <div className={`flex items-center gap-3 transition-colors ${step >= 2 ? 'text-[#5D4037]' : 'text-stone-300'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-[#8D6E63] bg-[#D7CCC8]' : 'border-stone-200'}`}>2</div>
              <span className="font-medium">מועד וזמן</span>
            </div>
            <div className={`flex items-center gap-3 transition-colors ${step >= 3 ? 'text-[#5D4037]' : 'text-stone-300'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-[#8D6E63] bg-[#D7CCC8]' : 'border-stone-200'}`}>3</div>
              <span className="font-medium">פרטים אישיים</span>
            </div>
          </div>
        </div>
        {selectedService && (
          <div className="mt-8 pt-8 border-t border-[#D7CCC8] animate-fadeIn">
            <p className="text-[#8D6E63] text-sm mb-1">טיפול נבחר:</p>
            <p className="font-bold text-lg text-[#3E2723]">{selectedService.title}</p>
            <p className="text-[#5D4037] font-bold">{selectedService.price} ₪</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-8 md:w-2/3 bg-white relative">
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h4 className="text-xl font-bold text-[#3E2723] mb-4">במה נתפנק היום?</h4>
            <div className="grid gap-4">
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className="flex items-center justify-between p-4 rounded-xl border border-stone-200 hover:border-[#C4A484] hover:bg-[#faf9f6] transition-all text-right group"
                >
                  <div>
                    <span className="font-bold text-[#4E342E] block group-hover:text-[#3E2723]">{service.title}</span>
                    <span className="text-sm text-[#8D6E63]">{service.durationMin} דקות</span>
                  </div>
                  <span className="font-bold text-[#5D4037] group-hover:text-[#3E2723]">{service.price} ₪</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleDateStepSubmit} className="space-y-8 animate-fadeIn h-full flex flex-col">
            <div>
              <h4 className="text-xl font-bold text-[#3E2723] mb-2">מתי נוח לך?</h4>
              <p className="text-sm text-[#8D6E63] mb-6">
                 ניתן לקבוע תורים עד {new Date(maxDate).toLocaleDateString('he-IL')}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#5D4037]">בחרי תאריך</label>
              
              <div className="relative group cursor-pointer" onClick={activateDatePicker}>
                <input
                  ref={dateInputRef}
                  id="date-input"
                  type={inputType}
                  placeholder="dd/mm/yyyy"
                  required
                  min={minDateStr}
                  max={maxDateStr}
                  value={details.date}
                  onChange={handleDateChange}
                  onBlur={handleBlur}
                  onClick={activateDatePicker} 
                  onFocus={activateDatePicker}
                  onKeyDown={(e) => {
                     e.preventDefault(); // Stop typing
                     if (e.key === 'Enter' || e.key === ' ') {
                       activateDatePicker(e);
                     }
                  }}
                  className="w-full p-4 pr-12 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#C4A484] outline-none text-[#3E2723] text-lg bg-[#faf9f6] hover:bg-white transition-colors cursor-pointer caret-transparent"
                />
                
                {/* Custom Icon Trigger */}
                <button 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      activateDatePicker(e);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#8D6E63] transition-colors p-1"
                >
                     <CalendarIcon className="w-6 h-6" />
                </button>
              </div>
              
              {error && <p className="text-red-500 text-sm mt-1 font-medium">{error}</p>}
            </div>

            {/* Time Grid - Only shows after date is selected */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${details.date ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <label className="block text-sm font-medium text-[#5D4037] mb-3">בחרי שעה פנויה</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pb-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
                    className={`
                      py-3 px-2 rounded-lg text-sm font-bold border transition-all
                      ${details.time === time 
                        ? 'bg-[#C4A484] text-white border-[#A1887F] shadow-md transform scale-105' 
                        : 'bg-white text-[#5D4037] border-stone-200 hover:border-[#D7CCC8] hover:bg-[#faf9f6] hover:text-[#3E2723]'}
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-auto pt-4 border-t border-stone-100">
              <button type="button" onClick={() => setStep(1)} className="text-[#8D6E63] hover:text-[#5D4037] px-4 font-medium">חזרה</button>
              <button 
                type="submit" 
                disabled={!details.time}
                className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  details.time 
                    ? 'bg-[#5D4037] text-white hover:bg-[#3E2723] hover:scale-105' 
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                המשך לפרטים
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6 animate-fadeIn h-full flex flex-col">
            <div>
              <h4 className="text-xl font-bold text-[#3E2723] mb-6">פרטים אחרונים</h4>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#5D4037]">שם מלא</label>
                  <input
                    type="text"
                    required
                    value={details.clientName}
                    onChange={(e) => setDetails({...details, clientName: e.target.value})}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#C4A484] outline-none text-[#3E2723] bg-[#faf9f6] focus:bg-white transition-colors"
                    placeholder="הקלידי את שמך"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#5D4037]">טלפון</label>
                  <input
                    type="tel"
                    required
                    value={details.clientPhone}
                    onChange={(e) => setDetails({...details, clientPhone: e.target.value})}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#C4A484] outline-none text-[#3E2723] bg-[#faf9f6] focus:bg-white transition-colors"
                    placeholder="050-0000000"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-auto pt-4 border-t border-stone-100">
              <button type="button" onClick={() => setStep(2)} className="text-[#8D6E63] hover:text-[#5D4037] px-4 font-medium">חזרה</button>
              <button type="submit" className="bg-[#C4A484] text-white px-10 py-3 rounded-xl hover:bg-[#A1887F] transition-all font-bold shadow-lg shadow-[#D7CCC8] hover:scale-105">
                קבעי תור
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingWizard;
