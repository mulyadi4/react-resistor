import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { 
  colorMapping, 
  multiplierMapping, 
  toleranceMapping, 
  formatResistance 
} from '../utils/resistorUtils';
import ResistorVisual from './ResistorVisual';

const ColorToNumberCalculator = () => {
  const [resistorType, setResistorType] = useState(4);
  const [selectedColors, setSelectedColors] = useState({});
  const [resistance, setResistance] = useState(0);
  const [tolerance, setTolerance] = useState(0);

  // Create options arrays from mappings
  const colorOptions = Object.entries(colorMapping).map(([digit, data]) => ({
    value: digit,
    name: data.name,
    color: data.color,
    label: digit
  }));

  const multiplierOptions = Object.entries(multiplierMapping).map(([value, data]) => ({
    value,
    name: data.name,
    color: data.color,
    label: data.label
  }));

  const toleranceOptions = Object.entries(toleranceMapping).map(([value, data]) => ({
    value,
    name: data.name,
    color: data.color,
    label: data.label
  }));

  useEffect(() => {
    calculateResistance();
  }, [selectedColors, resistorType]);

  const calculateResistance = () => {
    let calculatedResistance = 0;
    let calculatedTolerance = 0;

    if (resistorType === 4) {
      const band1 = selectedColors['1'];
      const band2 = selectedColors['2'];
      const multiplier = selectedColors['3'];
      const toleranceBand = selectedColors['4'];

      if (band1 && band2 && multiplier) {
        const baseValue = parseInt(band1.value) * 10 + parseInt(band2.value);
        calculatedResistance = baseValue * parseFloat(multiplier.value);
      }

      if (toleranceBand) {
        calculatedTolerance = parseFloat(toleranceBand.value);
      }
    } else {
      const band1 = selectedColors['1'];
      const band2 = selectedColors['2'];
      const band3 = selectedColors['3'];
      const multiplier = selectedColors['4'];
      const toleranceBand = selectedColors['5'];

      if (band1 && band2 && band3 && multiplier) {
        const baseValue = parseInt(band1.value) * 100 + parseInt(band2.value) * 10 + parseInt(band3.value);
        calculatedResistance = baseValue * parseFloat(multiplier.value);
      }

      if (toleranceBand) {
        calculatedTolerance = parseFloat(toleranceBand.value);
      }
    }

    setResistance(calculatedResistance);
    setTolerance(calculatedTolerance);
  };

  const handleColorChange = (band, colorData) => {
    setSelectedColors(prev => ({
      ...prev,
      [band]: colorData
    }));
  };

  const getColorBands = () => {
    const bands = [];
    const bandCount = resistorType === 4 ? 4 : 5;

    for (let i = 1; i <= bandCount; i++) {
      const color = selectedColors[i.toString()];
      bands.push({
        colorCode: color?.color || '#d1d5db',
        colorName: color?.name || 'Tidak dipilih',
        meaning: color?.label || 'Tidak dipilih'
      });
    }
    
    return bands;
  };

  const renderBandSelector = (bandNumber, label, options) => {
    return (
      <div key={bandNumber} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}:
        </label>
        <select
          value={selectedColors[bandNumber.toString()]?.value || ''}
          onChange={(e) => {
            const selectedOption = options.find(opt => opt.value === e.target.value);
            if (selectedOption) {
              handleColorChange(bandNumber.toString(), selectedOption);
            }
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Pilih Warna</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name} ({option.label})
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Palette className="w-6 h-6 mr-2 text-blue-600" />
          Color to Number Calculator
        </h2>
        <p className="text-gray-600">
          Pilih warna band untuk menghitung nilai resistor
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pilih Kode Warna</h3>
          
          {/* Resistor Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Resistor:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value={4}
                  checked={resistorType === 4}
                  onChange={(e) => {
                    setResistorType(parseInt(e.target.value));
                    setSelectedColors({});
                  }}
                  className="mr-2"
                />
                <span>4 Band</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value={5}
                  checked={resistorType === 5}
                  onChange={(e) => {
                    setResistorType(parseInt(e.target.value));
                    setSelectedColors({});
                  }}
                  className="mr-2"
                />
                <span>5 Band</span>
              </label>
            </div>
          </div>

          {/* Color Band Selectors */}
          <div className="space-y-4">
            {renderBandSelector(1, 'Band 1', colorOptions)}
            {renderBandSelector(2, 'Band 2', colorOptions)}
            
            {resistorType === 5 && renderBandSelector(3, 'Band 3', colorOptions)}
            
            {renderBandSelector(
              resistorType === 4 ? 3 : 4,
              'Multiplier',
              multiplierOptions
            )}
            
            {renderBandSelector(
              resistorType === 4 ? 4 : 5,
              'Toleransi',
              toleranceOptions
            )}
          </div>
        </div>

        {/* Visual and Results */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Hasil Perhitungan
          </h3>
          
          {/* Resistor Visual */}
          <div className="mb-6">
            <ResistorVisual colorBands={getColorBands()} resistorType={resistorType} />
          </div>

          {/* Results */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {resistance > 0 ? formatResistance(resistance) : '-'}
              </div>
              <div className="text-lg text-green-600 mb-2">
                {tolerance > 0 ? `±${tolerance}%` : '-'}
              </div>
              {resistance > 0 && tolerance > 0 && (
                <div className="text-sm text-gray-600">
                  Rentang: {formatResistance(resistance * (1 - tolerance / 100))} - {formatResistance(resistance * (1 + tolerance / 100))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorToNumberCalculator;