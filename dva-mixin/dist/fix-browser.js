!function(n){function e(t){if(r[t])return r[t].exports;var o=r[t]={exports:{},id:t,loaded:!1};return n[t].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=n,e.c=r,e.p="/",e(0)}({0:function(n,e,r){n.exports=r(1384)},214:function(n,e){function r(){throw new Error("setTimeout has not been defined")}function t(){throw new Error("clearTimeout has not been defined")}function o(n){if(f===setTimeout)return setTimeout(n,0);if((f===r||!f)&&setTimeout)return f=setTimeout,setTimeout(n,0);try{return f(n,0)}catch(e){try{return f.call(null,n,0)}catch(e){return f.call(this,n,0)}}}function i(n){if(d===clearTimeout)return clearTimeout(n);if((d===t||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(n);try{return d(n)}catch(e){try{return d.call(null,n)}catch(e){return d.call(this,n)}}}function u(){w&&m&&(w=!1,m.length?p=m.concat(p):h=-1,p.length&&s())}function s(){if(!w){var n=o(u);w=!0;for(var e=p.length;e;){for(m=p,p=[];++h<e;)m&&m[h].run();h=-1,e=p.length}m=null,w=!1,i(n)}}function a(n,e){this.fun=n,this.array=e}function c(){}var f,d,l=n.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:r}catch(n){f=r}try{d="function"==typeof clearTimeout?clearTimeout:t}catch(n){d=t}}();var m,p=[],w=!1,h=-1;l.nextTick=function(n){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];p.push(new a(n,e)),1!==p.length||w||o(s)},a.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=c,l.addListener=c,l.once=c,l.off=c,l.removeListener=c,l.removeAllListeners=c,l.emit=c,l.prependListener=c,l.prependOnceListener=c,l.listeners=function(n){return[]},l.binding=function(n){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(n){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},520:function(n,e,r){(function(e){function t(){var n=i();return n?n:"undefined"!=typeof navigator?u(navigator.userAgent):null}function o(n){var e=a(),r=e.filter(function(e){return e.rule&&e.rule.test(n)})[0];return r?r.name:null}function i(){var n="undefined"==typeof navigator&&"undefined"!=typeof e;return n?{name:"node",version:e.version.slice(1),os:r(871).type().toLowerCase()}:null}function u(n){var e=s();if(!n)return null;var r=e.map(function(e){var r=e.rule.exec(n),t=r&&r[1].split(/[._]/).slice(0,3);return t&&t.length<3&&(t=t.concat(1==t.length?[0,0]:[0])),r&&{name:e.name,version:t.join(".")}}).filter(Boolean)[0]||null;return r&&(r.os=o(n)),r}function s(){return c([["edge",/Edge\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["vivaldi",/Vivaldi\/([0-9\.]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)$/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/]])}function a(){return c([["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/],["Search Bot",/(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/]])}function c(n){return n.map(function(n){return{name:n[0],rule:n[1]}})}n.exports={detect:t,detectOS:o,getNodeVersion:i,parseUserAgent:u}}).call(e,r(214))},871:function(n,e){e.endianness=function(){return"LE"},e.hostname=function(){return"undefined"!=typeof location?location.hostname:""},e.loadavg=function(){return[]},e.uptime=function(){return 0},e.freemem=function(){return Number.MAX_VALUE},e.totalmem=function(){return Number.MAX_VALUE},e.cpus=function(){return[]},e.type=function(){return"Browser"},e.release=function(){return"undefined"!=typeof navigator?navigator.appVersion:""},e.networkInterfaces=e.getNetworkInterfaces=function(){return{}},e.arch=function(){return"javascript"},e.platform=function(){return"browser"},e.tmpdir=e.tmpDir=function(){return"/tmp"},e.EOL="\n"},1384:function(n,e,r){"use strict";var t=r(520),o=(0,t.detect)()||{};o.version=window.parseInt(o.version);var i=!1;("ie"===o.name&&o.version<11||"edge"===o.name&&o.version<14||"chrome"===o.name&&o.version<45)&&(i=!0),i&&(window.location.href="./login-block.html")}});