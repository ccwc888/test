
import 'babel-polyfill';
import * as userService from '@services/user';
import * as storageService from '@services/storage';

const urlParam = window.location.hash.split('?')[1].split('&');
let token = '';
for (let i = 0; i < urlParam.length; i++) {
  const it = decodeURIComponent(urlParam[i]).split('=');
  if (it[0] === 'token') {
    token = it[1];
  }
}
if (token) {
  storageService.set('token', token);
  // localStorage.setItem('token', token);
  userService.getUserInfoByToken().then((userRes) => {
    if (!userRes.code) {
      storageService.set('user', userRes.data);
      // localStorage.setItem('user', JSON.stringify(userRes.data));
    }
    const toUrl = window.location.href.replace('redirect.html', '');
    window.location.replace(toUrl);
  }, () => {
    const toUrl = window.location.href.replace('redirect.html', '');
    window.location.replace(toUrl);
  });
} else {
  const toUrl = window.location.href.replace('redirect.html', '');
  window.location.replace(toUrl);
}
