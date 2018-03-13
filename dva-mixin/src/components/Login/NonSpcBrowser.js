import { connect } from 'dva';
import React, { Component } from 'react';
import css from './NonSpcBrowser.scss';
import googleImg from './img/google.png';

class NonSpcBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  downLoad = () => {
    global.open('https://www.baidu.com/link?url=HPvYm9ldcM7sEe7sd8UPQBv9GZA23A3NkFY3tIs04H9a2gWdUrqBLYE4T2iEiL10LDWucuACnem9rW92nbNL5jJpp9oVon5ZNihaW2TGlD_&wd=&eqid=ab49bf2d0000a3cc00000004591bb7ee');
  }
  render() {
    return (
      <div className={css.nonSpcBrowserWrpper}>
        <div className={css.content}>
          <p className={css.title}>
            <span>知能平台温馨提示：</span> 本网站不支持您所使用的浏览器，请尝试谷歌浏览器 ^_^
          </p>
          <img alt="谷歌浏览器" src={googleImg} />
          <p className={css.download}>
            <span onClick={this.downLoad}>谷歌浏览器下载</span>
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps)(NonSpcBrowser);
