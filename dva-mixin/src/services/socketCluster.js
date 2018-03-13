import io from 'socketcluster-client';
import * as environmentService from './environment';

let socket = null;

const isInvalidSocket = () => socket === null;
let listenFunc = () => { };
// let topicHash = {};
// 订阅的topic列表
let channelList = [];
// 缓冲队列, 在socket未建立时缓存信息
let bufferList = [];

let registerHash = {};

export async function init() {
  if (socket) {
    return socket;
  }
  try {
    const dataRes = await environmentService.getWebSocketOption();
    if (!dataRes.code) {
      const { ip, port, query = '' } = dataRes.data;
      socket = io.connect({ hostname: ip, port, query });
    }
  } catch (e) {
    console.error('establish websocket failed:', e);
  }
  if (!socket) {
    return;
  }
  if (bufferList.length > 0) {
    // 处理缓冲
    bufferList.forEach(({ topic, callback }) => {
      subChannel(topic, callback);
    });
    bufferList = [];
  }

  socket.on('error', err => console.log('Socket error - ', err));
  socket.on('connect', () => console.log('Socket connect'));
  socket.on('disconnect', () => console.log('Socket disconnect'));
  socket.on('raw', (...args) => console.log('Socket raw:', args));
  global.window.wsocket = socket;
  return socket;
}

export function publish(evname, data) {
  if (isInvalidSocket()) { return; }
  socket.publish(evname, data, e => console.log(`Failed to publish, error: ${e}`));
}


export function safeSubChannel(evname, cb) {
  if (isInvalidSocket()) {
    bufferList.push({ topic: evname, callback: cb });
  } else {
    subChannel(evname, cb);
  }
}

function subChannel(evname, cb) {
  if (isInvalidSocket() || typeof cb !== 'function') {
    return;
  }
  const channel = socket.channel(evname);
  if (channel.state === 'unsubscribed') {
    channel.subscribe();
    channel.on('subscribeFail', (err) => {
      console.log('Failed to subscribe to the channel due to error: ', err);
    });
    channel.on('subscribe', () => { });
    channelList.push(evname);
  }
  channel.watch(cb);
  // return () => unwatch(evname, cb);
}

export function unsubChannel(evname, callback) {
  if (isInvalidSocket() || typeof callback !== 'function') {
    return;
  }
  socket.unwatch(evname, callback);
}

// function clear() {
//   if (isInvalidSocket())
//     return;
//   for (let i = 0; i < channelList.length; i++) {
//     socket.destroyChannel(channelList[i]);
//   }
//   channelList.splice(0, channelList.length);
// }

// export function unsubscribe(evname) {
//   if (isInvalidSocket())
//     return;
//   for (let i = 0; i < events.length; i++) {
//     if (events[i] == evname) {
//       socket.destroyChannel(evname);
//       events.splice(i, 1);
//       break;
//     }
//   }
// }

// 用于 APP启动时 基础数据模型中的subscription中传入通用dispatch
export function watch(cb) {
  listenFunc = cb;
  // 按subscripton的要求返回一个取消监测的方法
  // TODO: 这里可能会需要销毁很多东西
  return () => (listenFunc = () => { });
}

// 从具体数据模型中传入topic和action
export function registerTopic(topic, action) {
  const key = `${topic}/${action}`;
  if (!registerHash[key]) {
    const f = data => listenFunc(action, data, topic);
    safeSubChannel(topic, f);
    registerHash[`${topic}/${action}`] = true;
  }
}

// 从具体数据模型中传入topic和action
export function unregiterAll() {
  if (!isInvalidSocket()) {
    channelList.forEach((channel) => { socket.destroyChannel(channel); });
    channelList = [];
    bufferList = [];
    registerHash = {};
  }
}
