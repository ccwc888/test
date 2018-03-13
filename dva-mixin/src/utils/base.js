/**
 * 构建错误返回值对象
 */
export function ErrorRes(code, message = '') {
  this.requestId = null;
  this.type = 'ClientError';
  this.code = code;
  this.message = message;
}

const titleJson_iframe = {
  '/ygjgl/ygjgl.ejs':'预告警概览',
  '/ygjcx/ygjcx.ejs':'预告警查询',
  '/yxgk/yxgk.ejs':'企业工况',
  '/zdfx/yxrb/yxrb.ejs':'运行日报',
  '/repair_task/order/index.ejs':'抢修管理',
  '/repair_task/watch/index.ejs':'值班管理',
  '/repair_task/manage/index.ejs':'管理服务',
  '/glzx/fwzc/fwzc.ejs':'服务支持',
  '/glzx/ygjsz/ygjsz.ejs':'预告警设置',
  '/glzx/contactUs/contactUs.ejs':'联系我们',
  '/glzx/changePass/changePass.ejs':'修改密码',
}

const titleJson = {
  '/monthReport':'健康月报',
}

export function getTitle(pathname,query_viewurl){
  // console.log('/* wumi log on 2017-08-16 15:06:42', query_viewurl);
  return pathname === '/version2'?
    (titleJson_iframe[query_viewurl] || '知能平台'):
    (titleJson[pathname] || '知能平台');
}
