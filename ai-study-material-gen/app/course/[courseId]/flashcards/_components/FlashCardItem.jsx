import React, { useMemo } from 'react';
import ReactCardFlip from 'react-card-flip';

function FlashCardItem({ isFlipped, handleClick, flashcard }) {
  // Define aesthetic theme color pairs
  const themes = [
    { front: "bg-cyan-700", back: "bg-teal-600" },
    { front: "bg-purple-700", back: "bg-fuchsia-600" },
    { front: "bg-orange-500", back: "bg-rose-600" },
    { front: "bg-gray-900 text-white", back: "bg-lime-500 text-black" },
    { front: "bg-indigo-600", back: "bg-sky-500" },
  ];

  // Stick to a single random theme per card using memo
  const theme = useMemo(() => {
    return themes[Math.floor(Math.random() * themes.length)];
  }, []);

  const commonStyles = "w-[280px] h-[240px] md:w-[300px] md:h-[250px] rounded-xl shadow-lg p-6 flex items-center justify-center text-center cursor-pointer transition-all duration-300";

  return (
    <div className="flex items-center justify-center">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        
        {/* Front */}
        <div
          className={`${commonStyles} ${theme.front}`}
          onClick={handleClick}
        >
          <h2 className="text-lg font-semibold">{flashcard?.front}</h2>
        </div>

        {/* Back */}
        <div
          className={`${commonStyles} ${theme.back}`}
          onClick={handleClick}
        >
          <h2 className="text-lg font-semibold">{flashcard?.back}</h2>
        </div>

      </ReactCardFlip>
    </div>
  );
}

export default FlashCardItem;
