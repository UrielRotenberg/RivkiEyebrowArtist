
import React, { useState, useEffect } from 'react';
import { AccessibilityIcon, TextSizeIcon, ContrastIcon, EyeIcon, XIcon, CheckIcon } from './Icons';

const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 0, // 0: normal, 1: large, 2: extra large
    grayscale: false,
    highContrast: false,
    highlightLinks: false,
    readableFont: false,
  });

  useEffect(() => {
    // Apply Font Size
    const root = document.documentElement;
    if (settings.fontSize === 0) root.style.fontSize = '100%';
    if (settings.fontSize === 1) root.style.fontSize = '110%';
    if (settings.fontSize === 2) root.style.fontSize = '125%';

    // Apply Grayscale
    root.style.filter = settings.grayscale ? 'grayscale(100%)' : 'none';

    // Apply Readable Font
    if (settings.readableFont) {
        document.body.classList.add('font-readable');
    } else {
        document.body.classList.remove('font-readable');
    }

    // Apply Highlight Links
    if (settings.highlightLinks) {
        document.body.classList.add('highlight-links');
    } else {
        document.body.classList.remove('highlight-links');
    }

    // Apply High Contrast
    if (settings.highContrast) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }

  }, [settings]);

  const toggleSetting = (key) => {
    if (key === 'fontSize') {
        setSettings(prev => ({ ...prev, fontSize: (prev.fontSize + 1) % 3 }));
    } else {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const resetSettings = () => {
      setSettings({
        fontSize: 0,
        grayscale: false,
        highContrast: false,
        highlightLinks: false,
        readableFont: false,
      });
  };

  return (
    <>
        <style>{`
            .font-readable, .font-readable * { font-family: Arial, Helvetica, sans-serif !important; }
            .highlight-links a { text-decoration: underline !important; background-color: yellow !important; color: black !important; }
            .high-contrast { background-color: black !important; color: yellow !important; }
            .high-contrast * { background-color: black !important; color: yellow !important; border-color: yellow !important; }
            .high-contrast img { filter: grayscale(100%) contrast(150%); }
            .high-contrast button { background-color: yellow !important; color: black !important; }
        `}</style>
        
        <div className="fixed left-0 top-1/3 z-[100] flex items-start">
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-[#3E2723] text-white p-3 rounded-r-lg shadow-lg hover:bg-[#5D4037] transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    aria-label="פתח תפריט נגישות"
                >
                    <AccessibilityIcon className="w-8 h-8" />
                </button>
            )}

            {isOpen && (
                <div className="bg-white border border-[#D7CCC8] shadow-2xl rounded-r-xl p-4 w-72 animate-slideRight max-h-[60vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4 border-b border-stone-100 pb-2">
                        <h3 className="font-bold text-[#3E2723] flex items-center gap-2">
                            <AccessibilityIcon className="w-5 h-5" />
                            כלי נגישות
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-[#3E2723]">
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <button onClick={() => toggleSetting('fontSize')} className="w-full flex items-center justify-between p-3 rounded-lg bg-[#faf9f6] hover:bg-[#EFEBE9] text-[#5D4037]">
                            <div className="flex items-center gap-3">
                                <TextSizeIcon className="w-5 h-5" />
                                <span>גודל טקסט</span>
                            </div>
                            <span className="text-xs font-bold bg-[#D7CCC8] px-2 py-1 rounded">
                                {settings.fontSize === 0 ? 'רגיל' : settings.fontSize === 1 ? 'גדול' : 'ענק'}
                            </span>
                        </button>

                        <button onClick={() => toggleSetting('grayscale')} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${settings.grayscale ? 'bg-[#3E2723] text-white' : 'bg-[#faf9f6] text-[#5D4037] hover:bg-[#EFEBE9]'}`}>
                            <div className="flex items-center gap-3">
                                <EyeIcon className="w-5 h-5" />
                                <span>גווני אפור</span>
                            </div>
                            {settings.grayscale && <CheckIcon className="w-4 h-4" />}
                        </button>

                         <button onClick={() => toggleSetting('highContrast')} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${settings.highContrast ? 'bg-yellow-400 text-black font-bold' : 'bg-[#faf9f6] text-[#5D4037] hover:bg-[#EFEBE9]'}`}>
                            <div className="flex items-center gap-3">
                                <ContrastIcon className="w-5 h-5" />
                                <span>ניגודיות גבוהה</span>
                            </div>
                             {settings.highContrast && <CheckIcon className="w-4 h-4" />}
                        </button>

                         <button onClick={() => toggleSetting('highlightLinks')} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${settings.highlightLinks ? 'bg-[#3E2723] text-white' : 'bg-[#faf9f6] text-[#5D4037] hover:bg-[#EFEBE9]'}`}>
                            <div className="flex items-center gap-3">
                                <span className="underline decoration-2">Link</span>
                                <span>הדגשת קישורים</span>
                            </div>
                             {settings.highlightLinks && <CheckIcon className="w-4 h-4" />}
                        </button>
                        
                        <button onClick={() => toggleSetting('readableFont')} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${settings.readableFont ? 'bg-[#3E2723] text-white' : 'bg-[#faf9f6] text-[#5D4037] hover:bg-[#EFEBE9]'}`}>
                            <div className="flex items-center gap-3">
                                <span className="font-sans font-bold text-lg">א</span>
                                <span>פונט קריא</span>
                            </div>
                             {settings.readableFont && <CheckIcon className="w-4 h-4" />}
                        </button>

                        <button onClick={resetSettings} className="w-full mt-2 p-2 text-center text-red-500 text-sm hover:underline">
                            איפוס הגדרות
                        </button>
                    </div>
                    
                    <div className="mt-4 pt-2 border-t border-stone-100 text-[10px] text-center text-stone-400">
                        נגישות לפי תקן AA
                    </div>
                </div>
            )}
        </div>
    </>
  );
};
export default AccessibilityToolbar;
