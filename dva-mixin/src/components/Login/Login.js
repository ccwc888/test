import { connect } from 'dva';
import { Spin } from 'antd';
import React, { Component } from 'react';
import { detect } from 'detect-browser';
import css from './Login.scss';
import ydbDQcode from './img/ydbDQcode.png';
import ydgDQcode from './img/ydgDQcode.png';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 浏览器兼容提示框显示隐藏样式
      closeTips: '',
      // 登录窗口title
      loginWinTitle: 'Hi,欢迎登录',
      account: '',
      password: '',
      // 自动登录勾号显示隐藏样式
      autoLogin: '',
      // 错误提示显示隐藏样式
      errorWord: '',
      // 登录错误提示显示隐藏样式
      err: '',
      // 登录错误提示文字
      errWord: '',
      // 登录loading显示隐藏样式
      loginLoading: '',
      // 下载窗口和登录窗口切换右下角的图标样式
      switchClass: css.dqcode,
      // 下载窗口和登录窗口切换右下角的文字说明
      switchWord: '手机APP下载：用电宝、云电工',
      // 30天免登陆标示
      exp: '1',
    };
    // 监听回车登录系统
    global.document.onkeydown = this.enterKeyDown;
  }
  componentWillMount = () => {
    const { dispatch } = this.props;

    const browser = detect() || {};
    browser.version = window.parseInt(browser.version);

    let isTip = false;

    // 兼容性要求
    // 完全支持 chrome50+
    // 提示 ie11 edge14 chrome50- other
    // 阻塞 ie11- edge14- chrome45-
    if (
      (browser.name === 'chrome' && browser.version <= 50) ||
      (browser.name !== 'chrome')
    ) {
      isTip = true;
    }

    if (isTip) {
      this.setState({
        closeTips: css.closeTips,
      });
    }

    dispatch({
      type: 'login/logout',
    });
  }
  componentWillUnmount() {
    global.document.onkeydown = null;
  }
  enterKeyDown = (e) => {
    const url = global.location.href;
    if (url.indexOf('login') > -1) {
      // 兼容FF和IE和Opera
      const theEvent = e || window.event;
      const code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code === 13) {
        this.login();
        return false;
      }
      return true;
    }
  }
  // 显示登录loading
  showLoginLoading = () => {
    this.setState({
      loginLoading: css.on,
    });
  }
  // 隐藏登录loading
  hideLoginLoading = () => {
    this.setState({
      loginLoading: '',
    });
  }
  // 显示登录错误提示框
  showLoginErr = (errWord) => {
    this.setState({
      err: css.err,
      errWord,
    });
  }
  // 隐藏登录错误提示框
  hideLoginErr = () => {
    this.setState({
      err: '',
      errWord: '',
    });
  }
  // 关闭提示框
  closeTip = () => {
    this.setState({
      closeTips: '',
    });
  }
  // 登录
  login = () => {
    const { dispatch } = this.props;
    const account = this.state.account;
    const password = this.state.password;
    if (!account) {
      this.showLoginErr('账号不能为空');
      return;
    }
    if (!password) {
      this.showLoginErr('密码不能为空');
      return;
    }
    // 如果都没问题就关闭错误提示
    this.hideLoginErr();
    this.showLoginLoading();
    dispatch({
      type: 'login/login',
      payload: {
        password,
        username: account,
        exp: this.state.exp,
        callBack: (errmsg) => {
          this.hideLoginLoading();
          this.showLoginErr(errmsg || '账号或密码错误，请重新输入');
        },
      },
    });
  }
  // 自动登录按钮
  autoLogin = () => {
    // 如果没有勾选自动登录
    if (!this.state.autoLogin) {
      this.setState({
        autoLogin: css.on,
        exp: '30',
      });
    } else {
      this.setState({
        autoLogin: '',
        exp: '1',
      });
    }
  }
  // 切换登录窗口与下载app窗口
  switchWindow = () => {
    if (this.state.switchClass === css.dqcode) {
      this.setState({
        switchClass: css.computer,
        switchWord: '账号密码登录在这里',
        loginWinTitle: '手机APP下载',
      });
    } else {
      this.setState({
        switchClass: css.dqcode,
        switchWord: '手机APP下载：用电宝、云电工',
        loginWinTitle: 'Hi,欢迎登录',
      });
    }
  }
  // 用户输入监听
  accountInput = (e) => {
    const val = e.target.value;
    // if (!val) {
    //   this.showLoginErr('账号不能为空');
    // } else {
    //   this.hideLoginErr();
    // }
    this.setState({ account: val });
  }
  // 密码输入监听
  passwordInput = (e) => {
    const val = e.target.value;
    // if (!val) {
    //   this.showLoginErr('账号或密码不能为空');
    // } else {
    //   this.hideLoginErr();
    // }
    this.setState({ password: val });
  }
  // 登录dom
  loginDom = () => {
    return (
      <div>
        <div className={`${css.errorWord} ${this.state.err}`}>
          <i />
          {this.state.errWord}
        </div>
        <div className={css.inputField}>
          <p>
            <input type="text" placeholder="账号" value={this.state.account} onInput={this.accountInput} />
          </p>
          <p>
            <input type="password" placeholder="密码" value={this.state.password} onInput={this.passwordInput} />
          </p>
        </div>
        <div className={css.loginOption}>
          <p onClick={this.autoLogin}>
            <i className={this.state.autoLogin} />
            <span>30天免登陆</span>
          </p>
          <p />
          {/*<p>忘记密码</p>*/}
        </div>
        <div className={css.loginBtn} onClick={this.login}>登录</div>
      </div>
    );
  };
  // 下载appdom
  downLoadAppDom = () => {
    return (
      <div className={css.appDownLoad}>
        <div>
          <img alt="用电宝" src={ydbDQcode} />
          <p>用电宝</p>
        </div>
        <div>
          <img alt="用电宝" src={ydgDQcode} />
          <p>云电工</p>
        </div>
      </div>
    );
  }
  render() {
    const switchClass = this.state.switchClass;
    let renderDom;
    // 渲染登录页
    if (switchClass === css.dqcode) {
      renderDom = this.loginDom();
    } else {
      // 渲染下载app页
      renderDom = this.downLoadAppDom();
    }
    return (
      <div className={css.loginWarpper}>
        <div className={`${css.browserTips} ${this.state.closeTips}`}>

          {this.state.closeTips === css.closeTips ? ([<i className={css.ring} />, <span>温馨提示:</span>, '为保证使用效果，推荐使用 谷歌浏览器 打开平台。给您带来不便，敬请谅解。', <i className={css.close} onClick={this.closeTip} />]) : ''}

        </div>
        <div className={css.loginBody}>
          <div className={css.bodyCover}>
            <div className={css.coverIcoContent}>
              <i />
            </div>
          </div>
          <div className={css.bodyContent}>
            <div className={css.introduce} />
            <div className={css.bodyInput}>
              <div className={`${css.spinning} ${this.state.loginLoading}`}>
                <Spin size="large" />
              </div>
              <div className={css.inputTitle}>{this.state.loginWinTitle}</div>
              {renderDom}
              <div className={css.switchDownLoad}>
                <span className={`${css.promptIco} ${this.state.switchClass}`} onClick={this.switchWindow} />
                <span className={css.prompt}>{this.state.switchWord}<i /></span>
              </div>
            </div>
          </div>
        </div>
        <div className={css.loginFoot}>
          杭州中恒云能源互联网技术有限公司<i />地址：杭州国家高新技术产业开发区东信大道69号<i />联系方式：+86-571-56532199<i />邮箱：yny-service@hzzh.com
        </div>
      </div >
    );
  }
}
function mapStateToProps(state) {
  const { warn } = state.login;
  return {
    warn,
  };
}
export default connect(mapStateToProps)(Login);
