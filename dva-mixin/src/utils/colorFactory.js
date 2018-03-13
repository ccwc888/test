const stableSeries = [
  ['#FFFFCC', '#CCFFFF', '#FFFF99', '#CCCCFF', '#FF9966', '#FF6666', '#FFCC99', '#CCFF99', '#CCCCCC', '#CCCCFF', '#CCFFCC', '#CCFFFF', '#CCCCCC', '#CCFF99', '#99CC99', '#99CCCC', '#FFCC99', '#CCCCFF', '#CCFFFF', '#FFCC99', '#FFFFCC', '#99CCCC'],
  ['#f3856b', '#ffdb6e', '#98d87d', '#19b7f2', '#99CC33', '#FF9900', '#FFCC00', '#FF6666', '#FFFF66', '#99CC66', '#666699', '#FF9999', '#FF0033', '#FF9966', '#FF9900', '#CCFF00', '#CC3399', '#99CC33', '#FF6600', '#993366', '#CCCC33', '#666633', '#66CCCC', '#666699', '#66CCCC', '#CCFF66', '#FF99CC', '#FF9999', '#FFCC99'],
  ['#CC9999', '#FFFF99', '#666699', '#FF9900', '#FFFF00', '#0099CC', '#CCCC99', '#CC3399', '#99CC00', '#FF6666', '#FFFF00', '#3399CC', '#CC6600', '#999999', '#CCCC33', '#FF9933', '#FFFFCC', '#009933', '#0099CC', '#CCCCCC', '#FF6666', '#FF6600', '#FFFF66', '#009966', '#CC6633', '#FFCC99', '#CC6600', '#CC0066', '#009999', '#FFCC33'],
  ['#FF6666', '#FFFF00', '#006699', '#FF9966', '#0066CC', '#339933', '#FFCC33', '#336699', '#FF9900', '#FFFFCC', '#336699', '#CC6600', '#CCCC44', '#336699', '#99CC33', '#0099CC', '#99CC33', '#FF6666', '#336699', '#336699', '#99CCCC', '#FF0033', '#333399', '#CCCC00', '#33CC99', '#FFFF00', '#336699'],
  ['#990066', '#FFCC00', '#CC0033', '#FFCC33', '#333399', '#FF0033', '#666699', '#FFFF00', '#FF0033', '#FF0033', '#006699', '#FFFF33', '#FFCC00', '#009999', '#CC3366', '#FF0033', '#CCCC00', '#006699', '#CCCC00', '#FF9933', '#663399', '#FF9933', '#FFFF00', '#336699', '#CC3333', '#99CC00', '#003399', '#FFFF00', '#FF6600'],
];
const impressionSeries = {
  soft: stableSeries[0],
  light: stableSeries[0],
  gentle: stableSeries[0],
  cute: stableSeries[1],
  joyful: stableSeries[1],
  funny: stableSeries[1],
  sprghtly: stableSeries[2],
  happy: stableSeries[2],
  interesting: stableSeries[2],
  lively: stableSeries[3],
  brisk: stableSeries[3],
};
export function impression(name, num) {
  let aim = impressionSeries[name];
  if (aim & num > 1 & aim.length < num) {
    return aim.slice(0, num - 1);
  }
  if (!aim) return impression('cute', num);
  let rest = num - aim.length;
  for (let i = 0; i < 4; i++) {
    if (stableSeries[i].length > rest) return aim.concat(stableSeries[i].slice(0, rest));
    aim = aim.concat(stableSeries[i]);
    rest -= stableSeries[i].length;
  }
  aim.concat(impression(name, num - aim.length));
}
