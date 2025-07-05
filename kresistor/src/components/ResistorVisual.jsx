import React from 'react';

const ResistorVisual = ({ colorBands, resistorType }) => {
  const getBandSpacing = () => {
    if (resistorType === 4) {
      return 'gap-4';
    } else {
      return 'gap-3';
    }
  };

  const renderBand = (band, index) => {
    const isWhite = band.colorCode === '#FFFFFF';
    const isGold = band.colorCode === '#FFD700';
    const isSilver = band.colorCode === '#C0C0C0';
    
    return (
      <div
        key={index}
        className={`w-6 h-14 rounded-sm transition-all duration-300 ${
          isWhite ? 'border border-gray-400' : ''
        }`}
        style={{
          backgroundColor: band.colorCode,
          boxShadow: isGold || isSilver ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'none'
        }}
        title={`${band.colorName} - ${band.meaning}`}
      />
    );
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="relative">
        {/* Left wire */}
        <div className="absolute left-[-2rem] top-1/2 -translate-y-1/2 w-8 h-1 bg-gray-600 rounded-full" />
        
        {/* Right wire */}
        <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 w-8 h-1 bg-gray-600 rounded-full" />
        
        {/* Resistor body */}
        <div className="relative w-72 h-16 bg-gradient-to-b from-yellow-200 to-yellow-600 rounded-lg border-2 border-gray-400 shadow-lg">
          {/* Color bands container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`flex ${getBandSpacing()}`}>
              {colorBands.map((band, index) => renderBand(band, index))}
            </div>
          </div>
          
          {/* Resistor body texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-lg" />
        </div>
        
        {/* Resistor type indicator */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 font-medium">
          {resistorType} Band Resistor
        </div>
      </div>
    </div>
  );
};

export default ResistorVisual;