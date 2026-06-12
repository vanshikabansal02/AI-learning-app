import React, { useState } from "react";
import { Star, RotateCcw } from "lucide-react";

const Flashcard = ({ flashcard, onToggleStar }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Safe variables fallback if object structure changes
  const isStarred = flashcard?.isStarred || false;
  const questionText = flashcard?.question || "No question provided";
  const answerText = flashcard?.answer || "No answer provided";

  return (
    <div className="relative w-full h-72" style={{ perspective: "1000px" }}>
      <div
        className="relative w-full h-full transition-transform duration-500 transform-gpu cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={handleFlip}
      >
        {/* Front of the card (Question) */}
        <div
          className="absolute inset-0 w-full h-full bg-white border-2 border-slate-200 rounded-2xl shadow-xl p-8 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="bg-slate-100 text-[10px] text-slate-600 rounded px-2 py-1">
              Question Card
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (flashcard?._id) onToggleStar(flashcard._id);
              }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isStarred
                  ? "bg-amber-400 text-white shadow-md"
                  : "bg-slate-100 text-slate-400 hover:bg-slate-200"
              }`}
            >
              <Star
                className="w-4 h-4"
                strokeWidth={2}
                fill={isStarred ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center px-4 py-6">
            <p className="text-lg font-semibold text-slate-900 text-center leading-relaxed">
              {questionText}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Click to reveal answer</span>
          </div>
        </div>

        {/* Back of the card (Answer) */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 border-2 border-emerald-400 rounded-2xl shadow-xl p-8 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex justify-between items-start">
            <span className="bg-white/20 text-white text-[10px] rounded px-2 py-1">
              Answer Card
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (flashcard?._id) onToggleStar(flashcard._id);
              }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                isStarred
                  ? "bg-white/30 text-white border border-white/40"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              <Star
                className="w-4 h-4"
                strokeWidth={2}
                fill={isStarred ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center px-4 py-6">
            <p className="text-base text-white text-center leading-relaxed font-medium">
              {answerText}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-white/70 font-medium">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Click to see question</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;