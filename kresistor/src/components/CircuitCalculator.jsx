import React, { useState, useEffect } from 'react';
import { Zap, Plus, Trash2, Calculator } from 'lucide-react';
import { formatResistance } from '../utils/resistorUtils';

const CircuitCalculator = () => {
  const [circuitType, setCircuitType] = useState('series');
  const [resistors, setResistors] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState(1);
  const [totalResistance, setTotalResistance] = useState(0);
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState(0);
  const [power, setPower] = useState(0);

  useEffect(() => {
    calculateTotalResistance();
  }, [resistors, circuitType]);

  useEffect(() => {
    calculateElectrical();
  }, [totalResistance, voltage]);

  const calculateTotalResistance = () => {
    if (resistors.length === 0) {
      setTotalResistance(0);
      return;
    }

    let total = 0;
    if (circuitType === 'series') {
      total = resistors.reduce((sum, resistor) => sum + resistor.value, 0);
    } else {
      const reciprocalSum = resistors.reduce((sum, resistor) => sum + 1 / resistor.value, 0);
      total = reciprocalSum > 0 ? 1 / reciprocalSum : 0;
    }
    setTotalResistance(total);
  };

  const calculateElectrical = () => {
    const v = parseFloat(voltage);
    if (v > 0 && totalResistance > 0) {
      const i = v / totalResistance;
      const p = v * i;
      setCurrent(i);
      setPower(p);
    } else {
      setCurrent(0);
      setPower(0);
    }
  };

  const addResistor = () => {
    const value = parseFloat(inputValue);
    if (value && value > 0) {
      const actualValue = value * inputUnit;
      const newResistor = {
        id: Date.now() + Math.random(),
        value: actualValue
      };
      setResistors([...resistors, newResistor]);
      setInputValue('');
    }
  };

  const removeResistor = (id) => {
    setResistors(resistors.filter(r => r.id !== id));
  };

  const clearAll = () => {
    setResistors([]);
  };

  const quickAdd = (value) => {
    const newResistor = {
      id: Date.now() + Math.random(),
      value: value
    };
    setResistors([...resistors, newResistor]);
  };

  const commonValues = [
    { value: 100, label: '100Ω' },
    { value: 220, label: '220Ω' },
    { value: 330, label: '330Ω' },
    { value: 470, label: '470Ω' },
    { value: 1000, label: '1kΩ' },
    { value: 2200, label: '2.2kΩ' },
    { value: 4700, label: '4.7kΩ' },
    { value: 10000, label: '10kΩ' },
    { value: 22000, label: '22kΩ' }
  ];

  const renderSeriesDiagram = () => (
    <div className="flex items-center justify-center space-x-1 py-4">
      <div className="w-4 h-0.5 bg-gray-600"></div>
      {resistors.map((resistor, index) => (
        <React.Fragment key={resistor.id}>
          <div className="flex flex-col items-center">
              
            <div className="w-15 h-5 bg-yellow-200 border border-gray-400 rounded flex items-center justify-center">
              <div className="text-xs font-medium">R{index + 1} {formatResistance(resistor.value)}</div>
            </div>
           
          </div>
          {index < resistors.length - 1 && <div className="w-4 h-0.5 bg-gray-600"></div>}
        </React.Fragment>
      ))}
      <div className="w-4 h-0.5 bg-gray-600"></div>
    </div>
  );

  const renderParallelDiagram = () => (
    <div className="flex items-center justify-center py-4">
      <div className="w-4 h-0.5 bg-gray-600"></div>
      <div className="flex flex-col space-y-1">
        {resistors.map((resistor, index) => (
          <div key={resistor.id} className="flex items-center space-x-1">
            <div className="w-0.5 h-5 bg-gray-600"></div>
            <div className=" w-4 h-0.5 bg-gray-600"></div>
            <div className="flex flex-col items-center">

              <div className="w-15 h-5 bg-yellow-200 border border-gray-400 rounded flex items-center justify-center">
                <div className="text-xs font-medium">R{index + 1} {formatResistance(resistor.value)}</div>
              </div>

            </div>
            <div className="w-4 h-0.5 bg-gray-600"></div>
            <div className="w-0.5 h-4 bg-gray-600"></div>
          </div>
        ))}
      </div>
      <div className="w-4 h-0.5 bg-gray-600"></div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Calculator className="w-6 h-6 mr-2 text-blue-600" />
          Circuit Calculator
        </h2>
        <p className="text-gray-600">
          Hitung resistansi total untuk rangkaian seri dan paralel
        </p>
      </div>

      {/* Circuit Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Jenis Rangkaian:
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="series"
              checked={circuitType === 'series'}
              onChange={(e) => setCircuitType(e.target.value)}
              className="mr-2"
            />
            <span>Seri</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="parallel"
              checked={circuitType === 'parallel'}
              onChange={(e) => setCircuitType(e.target.value)}
              className="mr-2"
            />
            <span>Paralel</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Input Resistor</h3>
          
          {/* Add Resistor */}
          <div className="mb-4">
            <div className="flex space-x-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nilai resistor"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
                onKeyPress={(e) => e.key === 'Enter' && addResistor()}
              />
              <select
                value={inputUnit}
                onChange={(e) => setInputUnit(parseInt(e.target.value))}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>Ω</option>
                <option value={1000}>kΩ</option>
                <option value={1000000}>MΩ</option>
              </select>
              <button
                onClick={addResistor}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Add Values */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Tambah Cepat:</h4>
            <div className="grid grid-cols-3 gap-2">
              {commonValues.map((item, index) => (
                <button
                  key={index}
                  onClick={() => quickAdd(item.value)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resistor List */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Daftar Resistor:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {resistors.length === 0 ? (
                <div className="text-gray-500 text-sm">Belum ada resistor</div>
              ) : (
                resistors.map((resistor, index) => (
                  <div key={resistor.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">
                      R{index + 1}: {formatResistance(resistor.value)}
                    </span>
                    <button
                      onClick={() => removeResistor(resistor.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Clear All Button */}
          {resistors.length > 0 && (
            <button
              onClick={clearAll}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Hapus Semua
            </button>
          )}
        </div>

        {/* Visualization and Results */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Visualisasi & Hasil</h3>
          
          {/* Circuit Diagram */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg min-h-32">
            {resistors.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                Tambahkan resistor untuk melihat diagram
              </div>
            ) : (
              <div>
                <div className="text-center text-sm font-medium text-gray-700 mb-2">
                  Rangkaian {circuitType === 'series' ? 'Seri' : 'Paralel'}
                </div>
                {circuitType === 'series' ? renderSeriesDiagram() : renderParallelDiagram()}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-4">Hasil Perhitungan:</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Resistansi:</span>
                <span className="text-xl font-bold text-blue-600">
                  {totalResistance > 0 ? formatResistance(totalResistance) : '-'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Jumlah Resistor:</span>
                <span className="font-semibold text-gray-800">{resistors.length}</span>
              </div>
            </div>

            {/* Voltage and Current Calculator */}
            {totalResistance > 0 && (
              <div className="mt-6 pt-4 border-t border-blue-200">
                <h5 className="font-medium text-gray-700 mb-3">Hitung Arus & Daya:</h5>
                <div className="mb-3">
                  <input
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    placeholder="Tegangan (V)"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
                {current > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arus Total:</span>
                      <span className="font-semibold text-green-600">
                        {current.toFixed(4)} A
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daya Total:</span>
                      <span className="font-semibold text-purple-600">
                        {power.toFixed(4)} W
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Formula Information */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Formula:</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div>
                <strong>Rangkaian Seri:</strong> R<sub>total</sub> = R₁ + R₂ + R₃ + ... + Rₙ
              </div>
              <div>
                <strong>Rangkaian Paralel:</strong> 1/R<sub>total</sub> = 1/R₁ + 1/R₂ + 1/R₃ + ... + 1/Rₙ
              </div>
              <div className="pt-2">
                <strong>Hukum Ohm:</strong> V = I × R, P = V × I
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitCalculator;