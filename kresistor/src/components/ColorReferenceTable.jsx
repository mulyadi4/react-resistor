import React from 'react';
import { Book } from 'lucide-react';

const ColorReferenceTable = () => {
  const colorData = [
    { color: '#000000', name: 'Hitam', digit: '0', multiplier: '×1', tolerance: '-' },
    { color: '#8B4513', name: 'Coklat', digit: '1', multiplier: '×10', tolerance: '±1%' },
    { color: '#FF0000', name: 'Merah', digit: '2', multiplier: '×100', tolerance: '±2%' },
    { color: '#FFA500', name: 'Oranye', digit: '3', multiplier: '×1K', tolerance: '-' },
    { color: '#FFFF00', name: 'Kuning', digit: '4', multiplier: '×10K', tolerance: '-' },
    { color: '#008000', name: 'Hijau', digit: '5', multiplier: '×100K', tolerance: '±0.5%' },
    { color: '#0000FF', name: 'Biru', digit: '6', multiplier: '×1M', tolerance: '±0.25%' },
    { color: '#8A2BE2', name: 'Ungu', digit: '7', multiplier: '×10M', tolerance: '±0.1%' },
    { color: '#808080', name: 'Abu-abu', digit: '8', multiplier: '-', tolerance: '-' },
    { color: '#FFFFFF', name: 'Putih', digit: '9', multiplier: '-', tolerance: '-' },
    { color: '#FFD700', name: 'Emas', digit: '-', multiplier: '×0.1', tolerance: '±5%' },
    { color: '#C0C0C0', name: 'Perak', digit: '-', multiplier: '×0.01', tolerance: '±10%' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Book className="w-6 h-6 mr-2 text-blue-600" />
          Tabel Referensi Warna
        </h2>
        <p className="text-gray-600">
          Referensi lengkap kode warna resistor untuk digit, multiplier, dan toleransi
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <th className="text-left py-4 px-6 font-semibold">Warna</th>
              <th className="text-center py-4 px-4 font-semibold">Digit</th>
              <th className="text-center py-4 px-4 font-semibold">Multiplier</th>
              <th className="text-center py-4 px-4 font-semibold">Toleransi</th>
            </tr>
          </thead>
          <tbody>
            {colorData.map((item, index) => (
              <tr 
                key={index} 
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full shadow-md ${
                        item.color === '#FFFFFF' ? 'border-2 border-gray-300' : ''
                      }`}
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-gray-800">{item.name}</span>
                  </div>
                </td>
                <td className="text-center py-4 px-4">
                  <span className={`font-semibold ${item.digit === '-' ? 'text-gray-400' : 'text-blue-600'}`}>
                    {item.digit}
                  </span>
                </td>
                <td className="text-center py-4 px-4">
                  <span className={`font-semibold ${item.multiplier === '-' ? 'text-gray-400' : 'text-green-600'}`}>
                    {item.multiplier}
                  </span>
                </td>
                <td className="text-center py-4 px-4">
                  <span className={`font-semibold ${item.tolerance === '-' ? 'text-gray-400' : 'text-purple-600'}`}>
                    {item.tolerance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Information */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Tips Membaca Resistor:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Mulai dari band terdekat dengan ujung resistor</li>
            <li>• Band terakhir biasanya adalah toleransi</li>
            <li>• Band emas/perak selalu toleransi atau multiplier</li>
            <li>• Gunakan multimeter untuk verifikasi</li>
          </ul>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">Rumus Perhitungan:</h4>
          <div className="text-sm text-green-700 space-y-1">
            <div><strong>4 Band:</strong> (Band1×10 + Band2) × Multiplier</div>
            <div><strong>5 Band:</strong> (Band1×100 + Band2×10 + Band3) × Multiplier</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorReferenceTable;