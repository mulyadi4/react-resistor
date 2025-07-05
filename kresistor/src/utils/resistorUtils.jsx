// Color mapping for resistor bands
export const colorMapping = {
  '0': { color: '#000000', name: 'Hitam' },
  '1': { color: '#8B4513', name: 'Coklat' },
  '2': { color: '#FF0000', name: 'Merah' },
  '3': { color: '#FFA500', name: 'Oranye' },
  '4': { color: '#FFFF00', name: 'Kuning' },
  '5': { color: '#008000', name: 'Hijau' },
  '6': { color: '#0000FF', name: 'Biru' },
  '7': { color: '#8A2BE2', name: 'Ungu' },
  '8': { color: '#808080', name: 'Abu-abu' },
  '9': { color: '#FFFFFF', name: 'Putih' }
};

export const multiplierMapping = {
  '1': { color: '#000000', name: 'Hitam' ,label: '×1' },
  '10': { color: '#8B4513', name: 'Coklat', label: '×10' },
  '100': { color: '#FF0000', name: 'Merah', label: '×100' },
  '1000': { color: '#FFA500', name: 'Oranye', label: '×1K' },
  '10000': { color: '#FFFF00', name: 'Kuning', label: '×10K' },
  '100000': { color: '#008000', name: 'Hijau', label: '×100K' },
  '1000000': { color: '#0000FF', name: 'Biru', label: '×1M' },
  '10000000': { color: '#8A2BE2', name: 'Ungu', label: '×10M' },
  '0.1': { color: '#FFD700', name: 'Emas' , label: '×0.1' },
  '0.01': { color: '#C0C0C0', name: 'Perak' , label: '×0.01' }
};

export const toleranceMapping = {
  '0.1': { color: '#8A2BE2', name: 'Ungu' , label: '±0.1%'},
  '0.25': { color: '#0000FF', name: 'Biru' , label: '±0.25%'},
  '0.5': { color: '#008000', name: 'Hijau' , label: '±0.5%' },
  '1': { color: '#8B4513', name: 'Coklat' , label: '±1%'},
  '2': { color: '#FF0000', name: 'Merah' , label: '±2%'},
  '5': { color: '#FFD700', name: 'Emas' , label: '±5%'},
  '10': { color: '#C0C0C0', name: 'Perak' , label: '±20%'}
};


export const formatResistance = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(2).replace(/\.?0+$/, '') + 'MΩ';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2).replace(/\.?0+$/, '') + 'kΩ';
  } else {
    return value.toFixed(2).replace(/\.?0+$/, '') + 'Ω';
  }
};

export const getColorBands = (value, tolerance, resistorType) => {
  if (value <= 0) return [];

  const bands = [];
  
  // Find the best multiplier
  let tempValue = value;
  let multiplier = 1;
  
  if (resistorType === 4) {
    // For 4-band, we need 2 significant digits
    while (tempValue >= 100 && multiplier < 10000000) {
      tempValue /= 10;
      multiplier *= 10;
    }
    
    const digit1 = Math.floor(tempValue / 10);
    const digit2 = Math.floor(tempValue % 10);
    
    // Band 1
    if (colorMapping[digit1.toString()]) {
      bands.push({
        colorCode: colorMapping[digit1.toString()].color,
        colorName: colorMapping[digit1.toString()].name,
        meaning: `Digit 1: ${digit1}`
      });
    }
    
    // Band 2
    if (colorMapping[digit2.toString()]) {
      bands.push({
        colorCode: colorMapping[digit2.toString()].color,
        colorName: colorMapping[digit2.toString()].name,
        meaning: `Digit 2: ${digit2}`
      });
    }
    
    // Multiplier
    if (multiplierMapping[multiplier.toString()]) {
      bands.push({
        colorCode: multiplierMapping[multiplier.toString()].color,
        colorName: multiplierMapping[multiplier.toString()].name,
        meaning: `×${formatMultiplier(multiplier)}`
      });
    }
    
    // Tolerance
    if (toleranceMapping[tolerance.toString()]) {
      bands.push({
        colorCode: toleranceMapping[tolerance.toString()].color,
        colorName: toleranceMapping[tolerance.toString()].name,
        meaning: `±${tolerance}%`
      });
    }
  } else {
    // For 5-band, we need 3 significant digits
    while (tempValue >= 1000 && multiplier < 10000000) {
      tempValue /= 10;
      multiplier *= 10;
    }
    
    const digit1 = Math.floor(tempValue / 100);
    const digit2 = Math.floor((tempValue % 100) / 10);
    const digit3 = Math.floor(tempValue % 10);
    
    // Band 1
    if (colorMapping[digit1.toString()]) {
      bands.push({
        colorCode: colorMapping[digit1.toString()].color,
        colorName: colorMapping[digit1.toString()].name,
        meaning: `Digit 1: ${digit1}`
      });
    }
    
    // Band 2
    if (colorMapping[digit2.toString()]) {
      bands.push({
        colorCode: colorMapping[digit2.toString()].color,
        colorName: colorMapping[digit2.toString()].name,
        meaning: `Digit 2: ${digit2}`
      });
    }
    
    // Band 3
    if (colorMapping[digit3.toString()]) {
      bands.push({
        colorCode: colorMapping[digit3.toString()].color,
        colorName: colorMapping[digit3.toString()].name,
        meaning: `Digit 3: ${digit3}`
      });
    }
    
    // Multiplier
    if (multiplierMapping[multiplier.toString()]) {
      bands.push({
        colorCode: multiplierMapping[multiplier.toString()].color,
        colorName: multiplierMapping[multiplier.toString()].name,
        meaning: `×${formatMultiplier(multiplier)}`
      });
    }
    
    // Tolerance
    if (toleranceMapping[tolerance.toString()]) {
      bands.push({
        colorCode: toleranceMapping[tolerance.toString()].color,
        colorName: toleranceMapping[tolerance.toString()].name,
        meaning: `±${tolerance}%`
      });
    }
  }
  
  return bands;
};

const formatMultiplier = (mult) => {
  if (mult >= 1000000) {
    return `${mult / 1000000}M`;
  } else if (mult >= 1000) {
    return `${mult / 1000}K`;
  } else if (mult < 1) {
    return mult.toString();
  } else {
    return mult.toString();
  }
};

export const calculateResistanceFromBands = (bands, resistorType) => {
  let resistance = 0;
  let tolerance = 0;

  if (resistorType === 4) {
    const band1 = bands['1'];
    const band2 = bands['2'];
    const multiplier = bands['3'];
    const toleranceBand = bands['4'];

    if (band1 && band2 && multiplier) {
      const baseValue = parseInt(band1.value) * 10 + parseInt(band2.value);
      resistance = baseValue * parseFloat(multiplier.value);
    }

    if (toleranceBand) {
      tolerance = parseFloat(toleranceBand.value);
    }
  } else {
    const band1 = bands['1'];
    const band2 = bands['2'];
    const band3 = bands['3'];
    const multiplier = bands['4'];
    const toleranceBand = bands['5'];

    if (band1 && band2 && band3 && multiplier) {
      const baseValue = parseInt(band1.value) * 100 + parseInt(band2.value) * 10 + parseInt(band3.value);
      resistance = baseValue * parseFloat(multiplier.value);
    }

    if (toleranceBand) {
      tolerance = parseFloat(toleranceBand.value);
    }
  }

  return { resistance, tolerance };
};