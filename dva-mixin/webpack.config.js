var path = require('path');
var fs = require('fs');
var { theme: scssVarObj = {} } = JSON.parse(fs.readFileSync('./.roadhogrc'));

module.exports = function (webpackConfig) {
  webpackConfig.entry["fix-browser"] = ["./src/fix-browser.js"];
  webpackConfig.entry["redirect"] = ["./src/redirect.js"];
  /***** ↓添加sass-loader *****/
  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    exclude: null,
    // include: path.resolve(__dirname, 'src/routes/'),
    loader: 'style!css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]!postcss!sass?' + JSON.stringify({
      data: Object.keys(scssVarObj).map(key => `${key.replace('@', '$')}: ${scssVarObj[key]}`).join(';') + ';',
    }), // ?{"includePaths":["' + path.resolve(__dirname, "./src/var") + '"]}
    // includePath不能用, 现在采用data的方式传值
    // loader: 'style!css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]!postcss!sass?' + JSON.stringify({
    //   includePaths: [path.resolve(__dirname, "src/scss")]
    // }),
    // use: [
    //   'style-loader',
    //   {
    //     loader: 'css-loader',
    //     options: {
    //       importLoaders: 1,
    //       modules: true,
    //       localIdentName: '[local]___[hash:base64:5]'
    //     }
    //   },
    //   'postcss-loader',
    //   {
    //     loader: 'sass-loader',
    //     options: {
    //       includePaths: [
    //         // 替换antd用到的字体文件路径
    //         path.resolve(__dirname, "./src/var"),
    //       ]
    //     }
    //   },
    // ]
  });
  // 找到loader:url 里的exclude ，在其中加上scss的过滤
  webpackConfig.module.loaders[0].exclude.push(/\.scss$/);

  // webpackConfig.module.loaders[0].exclude.push(/\.ttf$/);
  // webpackConfig.module.loaders.filter(function(obj){
  //   return obj.loader === 'file';
  // })[0].test = /\.(svg|ttf)$/;
  console.log(webpackConfig.resolve);
  webpackConfig.resolve.alias = {
    '@components': path.join(__dirname, "src/components"),
    '@com': path.join(__dirname, "src/components/A"),
    '@routes': path.join(__dirname, "src/routes"),
    '@model': path.join(__dirname, "src/model"),
    '@services': path.join(__dirname, "src/services"),
    '@util': path.join(__dirname, "src/utils"),
    '@assets': path.join(__dirname, "src/assets"),
    '@root': path.join(__dirname, "src"),
    '@openapi': path.join(__dirname, "src/services/common/openapi"),
  }
  // return null;
  return webpackConfig;
}
