export function dicFromList({ dataList, key = 'key' }) {
  const res = { dataList, data: {}, keys: [] };
  (dataList || []).forEach((element) => {
    const code = element[key];
    res.data[code] = element;
    res.keys.push(code);
    for (const itemKey in element) {
      if (!res[itemKey]) res[itemKey] = {};
      res[itemKey][code] = element[itemKey];
    }
  });
  return res;
}
export function dicFromMap(map = {}) {
  const res = { dataList: [], data: {}, keys: [] };
  Object.keys(map).forEach((key) => {
    let item = map[key];
    if (typeof item !== 'object') {
      item = { name: item };
    }
    res.keys.push(key);
    for (const itemKey in item) {
      if (!res[itemKey]) res[itemKey] = {};
      res[itemKey][key] = item[itemKey];
    }
    item.key = key;
    res.dataList.push(item);
    res.data[key] = item;
  });
  return res;
}
