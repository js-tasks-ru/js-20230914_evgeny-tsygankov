/**
 * @param {number[]} data
 * @param {number} chartHeight
 * @returns {Array<{ percent: string; value: string }>}
 */
export function getColumnProps(data, chartHeigh) {
  const maxValue = Math.max(...data);
  const scale = chartHeigh / maxValue;

  return data.map((item) => ({
    percent: ((item / maxValue) * 100).toFixed(0) + "%",
    value: String(Math.floor(item * scale)),
  }));
}
