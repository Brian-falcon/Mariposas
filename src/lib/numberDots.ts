/**
 * Puntos para seguir/trazar cada número (0-20).
 * Coordenadas normalizadas 0-100 (porcentaje del ancho/alto).
 */

function circlePoints(cx: number, cy: number, r: number, n: number, startAngle = -90): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * 360 + startAngle;
    const rad = (angle * Math.PI) / 180;
    points.push([cx + r * Math.cos(rad), cy + r * Math.sin(rad)]);
  }
  return points;
}

// Formas aproximadas de cada dígito (puntos en orden de trazado)
const digitDots: Record<string, [number, number][]> = {
  "0": circlePoints(50, 50, 35, 24),
  "1": [
    [50, 15], [50, 25], [50, 35], [50, 45], [50, 55], [50, 65], [50, 75], [50, 85],
  ],
  "2": [
    [22, 28], [28, 18], [38, 12], [52, 12], [65, 20], [72, 32], [74, 45], [68, 58], [55, 68], [38, 78],
    [28, 84], [25, 88], [35, 88], [55, 88], [75, 88], [82, 85],
  ],
  "3": [
    [25, 20], [45, 20], [65, 25], [70, 40], [60, 50], [70, 60], [65, 75], [45, 82], [25, 78], [20, 65],
    [25, 50], [20, 35],
  ],
  "4": [
    [60, 15], [60, 30], [60, 50], [25, 50], [35, 50], [85, 50], [85, 65], [85, 85],
  ],
  "5": [
    [75, 15], [30, 15], [25, 15], [25, 45], [30, 50], [65, 50], [75, 60], [70, 80], [35, 85], [25, 80],
  ],
  "6": [
    [65, 25], [45, 15], [25, 30], [20, 55], [30, 75], [55, 82], [75, 70], [80, 50], [70, 35], [50, 30],
  ],
  "7": [
    [20, 15], [35, 15], [50, 15], [65, 15], [80, 15], [65, 40], [55, 60], [45, 85], [35, 85],
  ],
  "8": [
    ...circlePoints(50, 35, 22, 16, -90),
    ...circlePoints(50, 65, 22, 16, 90),
  ],
  "9": [
    [55, 50], [35, 35], [25, 55], [30, 75], [55, 85], [80, 70], [85, 45], [70, 25], [45, 15], [25, 25],
  ],
};

export function getNumberDots(num: number): [number, number][] {
  const str = String(num);

  if (str.length === 2) {
    const d1 = digitDots[str[0]] || [];
    const d2 = digitDots[str[1]] || [];
    const scale = 0.4;
    const all: [number, number][] = [];
    d1.forEach(([x, y]) => all.push([(x - 50) * scale + 25, y]));
    d2.forEach(([x, y]) => all.push([(x - 50) * scale + 75, y]));
    return all;
  }

  return digitDots[str] || [];
}
