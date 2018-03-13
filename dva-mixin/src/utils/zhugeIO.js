export default function init(user) {
  if(process.env.NODE_ENV == 'production'){
    zhugeIO_init();

    zhuge.identify(user.accountId,{
      name:user.employeeName,
      employeeId: user.employeeId,
      employeeName: user.employeeName,
      customerId: user.customerId,
      serviceProvidorName: user.serviceProvidorName,
      serviceProvidorId: user.serviceProvidorId,
      IsInsideIP: user.IsInsideIP || false,
    }, function(){
      console.log('/* 5mi log on 2017-07-17 10:19:13 */','ZHUGE_IO identify')
      zhuge.track('login', {
        'accountId':user.accountId,
        employeeId: user.employeeId,
        employeeName: user.employeeName,
        customerId: user.customerId,
        serviceProvidorName: user.serviceProvidorName,
        serviceProvidorId: user.serviceProvidorId
      });
    });
  }else{
    window.zhuge = {
      track:function(){}
    }
  }

}

function zhugeIO_init(){
  if(window.zhuge) return;
  window.zhuge = window.zhuge || [];
  window.zhuge.methods = "_init debug identify track trackLink trackForm page".split(" ");
  window.zhuge.factory = function (b) {
    return function () {
      var a = Array.prototype.slice.call(arguments);
      a.unshift(b);
      window.zhuge.push(a);
      return window.zhuge;
    }
  };
  for (var i = 0; i < window.zhuge.methods.length; i++) {
    var key = window.zhuge.methods[i];
    window.zhuge[key] = window.zhuge.factory(key);
  }
  window.zhuge.load = function (b, x) {
    if (!document.getElementById("zhuge-js")) {
      var a = document.createElement("script");
      var verDate = new Date();
      var verStr = verDate.getFullYear().toString() + verDate.getMonth().toString() + verDate.getDate().toString();
      a.type = "text/javascript";
      a.id = "zhuge-js";
      a.async = !0;
      a.src = (location.protocol == 'http:' ? "http://sdk.zhugeio.com/zhuge.min.js?v=" : 'https://zgsdk.zhugeio.com/zhuge.min.js?v=') + verStr;
      a.onerror = function () {
        window.zhuge.identify = window.zhuge.track = function (ename, props, callback) {
          if (callback && Object.prototype.toString.call(callback) === '[object Function]') callback();
        };
      };
      var c = document.getElementsByTagName("script")[0];
      c.parentNode.insertBefore(a, c);
      window.zhuge._init(b, x)
    }
  };
  //配置应用的AppKey
  window.zhuge.load('7f25a4228a45471ca7d63149703b61ea',{
    debug:process.env.NODE_ENV != 'production',
    autoTrack: true, //启用全埋点采集（选填，默认false）
    singlePage: true, //是否是单页面应用（SPA），启用autoTrack后生效（选填，默认false）
    visualizer: true, //可视化埋点开关
  });
}

// export function routerOnUpdate(obj){
//   return function(){
//     console.log('/* 5mi log on 2017-07-27 18:58:33 */','router onupdate',obj)
//   }
// }
