import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import NumberToColorConverter from './components/NumberToColorConverter';
import ColorToNumberCalculator from './components/ColorToNumberCalculator';
import CircuitCalculator from './components/CircuitCalculator';
import ColorReferenceTable from './components/ColorReferenceTable';

function App() {
  const [activeTab, setActiveTab] = useState('number-to-color');

  const tabs = [
    { id: 'number-to-color', label: 'Number to Color', icon: Calculator },
    { id: 'color-to-number', label: 'Color to Number', icon: Calculator },
    { id: 'circuit', label: 'Circuit Calculator', icon: Calculator },
    { id: 'reference', label: 'Color Reference', icon: Calculator }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Kalkulator Resistor
          </h1>
          <p className="text-gray-600">
            Konverter lengkap untuk nilai resistor dan kode warna
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-lg p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md transform scale-105'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-3 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'number-to-color' && <NumberToColorConverter />}
          {activeTab === 'color-to-number' && <ColorToNumberCalculator />}
          {activeTab === 'circuit' && <CircuitCalculator />}
          {activeTab === 'reference' && <ColorReferenceTable />}
        </div>
      </div>
    </div>
  );
}

export default App;