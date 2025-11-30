
import React, { useState } from 'react';
import { getBeautyTip } from '../services/geminiService';
import { SparklesIcon } from './Icons';

const AIConsultant = () => {
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(false);

  const topics = [
    "התאמת גבות למבנה פנים",
    "שמירה על עור הפנים לאחר שעווה",
    "טיפוח גבות בבית",
    "טרנדים בעיצוב גבות"
  ];

  const handleGetTip = async (topic) => {
    setLoading(true);
    setTip(null);
    const result = await getBeautyTip(topic);
    setTip(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-white to-[#f5f0eb] p-8 rounded-2xl shadow-sm border border-[#EFEBE9] my-12">
      <div className="flex items-center gap-3 mb-4 text-[#5D4037]">
        <SparklesIcon className="w-6 h-6" />
        <h3 className="text-xl font-bold">הפינה של ריבקי - טיפים חכמים</h3>
      </div>
      <p className="text-[#8D6E63] mb-6">
        רוצה טיפ מקצועי לפני שאת מגיעה? בחרי נושא וה-AI של ריבקי ייתן לך עצה מותאמת אישית.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleGetTip(topic)}
            disabled={loading}
            className="px-4 py-2 bg-white text-[#5D4037] border border-[#D7CCC8] rounded-full hover:bg-[#faf9f6] hover:border-[#A1887F] transition-all text-sm shadow-sm disabled:opacity-50"
          >
            {topic}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-[#8D6E63] animate-pulse">
          <SparklesIcon className="w-5 h-5" />
          <span>ריבקי מנסחת את הטיפ המושלם עבורך...</span>
        </div>
      )}

      {tip && !loading && (
        <div className="bg-white p-6 rounded-xl border-r-4 border-[#C4A484] shadow-md">
          <p className="text-[#3E2723] text-lg leading-relaxed font-medium">
            "{tip}"
          </p>
        </div>
      )}
    </div>
  );
};

export default AIConsultant;
