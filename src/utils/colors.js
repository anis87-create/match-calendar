function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 0, g: 0, b: 0 };
}

// Dark background: 10% team color + 90% of dark base (#1a1a1a)
export function badgeBg(hex) {
  const { r, g, b } = hexToRgb(hex);
  const base = 26;
  return `rgb(${Math.round(r * 0.1 + base * 0.9)},${Math.round(g * 0.1 + base * 0.9)},${Math.round(b * 0.1 + base * 0.9)})`;
}

// Light text: 60% white + 40% team color
export function badgeText(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${Math.round(255 * 0.6 + r * 0.4)},${Math.round(255 * 0.6 + g * 0.4)},${Math.round(255 * 0.6 + b * 0.4)})`;
}

// Slightly darker border: 80% team color + 20% black
export function badgeBorder(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${Math.round(r * 0.8)},${Math.round(g * 0.8)},${Math.round(b * 0.8)})`;
}
