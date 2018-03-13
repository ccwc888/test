import { detect } from 'detect-browser';

const browser = detect() || {};
browser.version = window.parseInt(browser.version);

let isBlock = false;

// 兼容性要求
// 完全支持 chrome50+
// 提示 ie11 edge14 chrome50- other
// 阻塞 ie11- edge14- chrome45-
if (
  (browser.name === 'ie' && browser.version < 11) ||
  (browser.name === 'edge' && browser.version < 14) ||
  (browser.name === 'chrome' && browser.version < 45)
) {
  isBlock = true;
}

if (isBlock) {
  window.location.href = './login-block.html';
}
