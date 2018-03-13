/**
 * 将同一个point下tag不同的数据合并成一条
 * @param {*} metricData
 */
export function combinePoint(metricData) {
  const metricObj = {};
  metricData.map((metricItem) => {
    if (!metricObj[metricItem.tags.pointId]) {
      metricObj[metricItem.tags.pointId] = metricItem;
      return metricItem;
    }
    const old = metricObj[metricItem.tags.pointId];
    metricObj[metricItem.tags.pointId] = {
      ...old,
      data: Object.assign({}, old.data, metricItem.data),
    };
    return metricItem;
  });
  const pointList = Object.keys(metricObj);
  const metricRes = pointList.map((key) => {
    return metricObj[key];
  });
  return metricRes;
}

/**
 * 格式化metric格式数据的时间戳
 * @param {*} metricData
 */
export function timeStampConverterForMetricDatum(metricData) {
  const metricRes = metricData.map((metricItem) => {
    const keys = Object.keys(metricItem.data);
    if (keys.length < 1) return metricItem;
    const currentTime = new Date().getTime();
    const resData = {};
    keys.map((key) => {
      const item = metricItem.data[key];
      const currentStamp = key;
      if (currentStamp > (currentTime * 2)) {
        resData[parseInt(currentStamp / 1000000, 10)] = item;
        return key;
      }
      if (currentStamp > (currentTime / 2)) {
        resData[parseInt(currentStamp / 1000, 10)] = item;
        return key;
      }
      resData[currentStamp] = item;
      return key;
    });
    return { ...metricItem, data: resData };
  });
  return metricRes;
}

/**
 * 格式化最近数据查找后的时间戳
 * @param {*} metricData
 */
export function timeStampConverterForLatestDatum(metricData) {
  const currentTime = new Date().getTime();
  const metricRes = metricData.map((metricItem) => {
    const currentStamp = metricItem.time;
    if (currentStamp > (currentTime * 2)) {
      return {
        ...metricItem,
        time: currentStamp / 1000000,
      };
    }
    if (currentStamp > (currentTime / 2)) {
      return {
        ...metricItem,
        time: currentStamp / 1000,
      };
    }
    return metricItem;
  });
  return metricRes;
}
