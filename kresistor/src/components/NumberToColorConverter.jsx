import React, { useState, useEffect } from 'react';
import { Zap, Info } from 'lucide-react';
import { formatResistance, getColorBands } from '../utils/resistorUtils';
import ResistorVisual from './ResistorVisual';

const NumberToColorConverter = () => {
  const [resistorValue, setResistorValue] = useState('');
  const [resistorUnit, setResistorUnit] = useState(1);
  const [tolerance, setTolerance] = useState(5);
  const [resistorType, setResistorType] = useState(4);
  const [colorBands, setColorBands] = useState([]);
  const [actualValue, setActualValue] = useState(0);

  useEffect(() => {
    calculateColorBands();
  }, [resistorValue, resistorUnit, tolerance, resistorType]);

  const calculateColorBands = () => {
    const value = parseFloat(resistorValue);
    if (!value || value <= 0) {
      setColorBands([]);
      setActualValue(0);
      return;
    }

    const totalValue = value * resistorUnit;
    setActualValue(totalValue);
    
    const bands = getColorBands(totalValue, tolerance, resistorType);
    setColorBands(bands);
  };

  const commonValues = [
    { value: 100, unit: 1, label: '100Ω' },
    { value: 220, unit: 1, label: '220Ω' },
    { value: 330, unit: 1, label: '330Ω' },
    { value: 470, unit: 1, label: '470Ω' },
    { value: 1, unit: 1000, label: '1kΩ' },
    { value: 2.2, unit: 1000, label: '2.2kΩ' },
    { value: 4.7, unit: 1000, label: '4.7kΩ' },
    { value: 10, unit: 1000, label: '10kΩ' },
    { value: 22, unit: 1000, label: '22kΩ' },
    { value: 47, unit: 1000, label: '47kΩ' },
    { value: 100, unit: 1000, label: '100kΩ' },
    { value: 1, unit: 1000000, label: '1MΩ' }
  ];

  const handleQuickValue = (value, unit) => {
    setResistorValue(value.toString());
    setResistorUnit(unit);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-blue-600" />
          Number to Color Converter
        </h2>
        <p className="text-gray-600">
          Masukkan nilai resistor untuk mendapatkan kode warna yang sesuai
        </p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Input Nilai Resistor</h3>
          
          {/* Resistor Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Resistor:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value={4}
                  checked={resistorType === 4}
                  onChange={(e) => setResistorType(parseInt(e.target.value))}
                  className="mr-2"
                />
                <span>4 Band</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value={5}
                  checked={resistorType === 5}
                  onChange={(e) => setResistorType(parseInt(e.target.value))}
                  className="mr-2"
                />
                <span>5 Band</span>
              </label>
            </div>
          </div>

          {/* Value Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nilai Resistor:
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={resistorValue}
                onChange={(e) => setResistorValue(e.target.value)}
                placeholder="Masukkan nilai"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
              />
              <select
                value={resistorUnit}
                onChange={(e) => setResistorUnit(parseInt(e.target.value))}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>Ω</option>
                <option value={1000}>kΩ</option>
                <option value={1000000}>MΩ</option>
              </select>
            </div>
          </div>

          {/* Tolerance Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Toleransi:
            </label>
            <select
              value={tolerance}
              onChange={(e) => setTolerance(parseFloat(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={0.1}>±0.1%</option>
              <option value={0.25}>±0.25%</option>
              <option value={0.5}>±0.5%</option>
              <option value={1}>±1%</option>
              <option value={2}>±2%</option>
              <option value={5}>±5%</option>
              <option value={10}>±10%</option>
            </select>
          </div>

          {/* Quick Values */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Nilai Umum:</h4>
            <div className="grid grid-cols-3 gap-2">
              {commonValues.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickValue(item.value, item.unit)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual and Results */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Hasil Konversi
          </h3>
          
          {actualValue > 0 ? (
            <>
              {/* Resistor Visual */}
              <div className="mb-6">
                <ResistorVisual colorBands={colorBands} resistorType={resistorType} />
              </div>

              {/* Color Bands Info */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Kode Warna:</h4>
                <div className="space-y-2">
                  {colorBands.map((band, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Band {index + 1}:</span>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{
                            backgroundColor: band.colorCode,
                            border: band.colorCode === '#FFFFFF' ? '1px solid #ccc' : 'none'
                          }}
                        />
                        <span className="text-sm">{band.colorName}</span>
                        <span className="text-xs text-gray-500">({band.meaning})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {formatResistance(actualValue)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Toleransi: ±{tolerance}%
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Info className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Masukkan nilai resistor untuk melihat kode warna</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberToColorConverter;