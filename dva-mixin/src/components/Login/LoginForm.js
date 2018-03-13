import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './LoginForm.scss';

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = (e) => {
    const { loginMethod } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        loginMethod(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.login_form}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(<Input addonBefore={<Icon type="user" />} placeholder="用户名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(<Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />)}
        </FormItem>
        <FormItem className={styles.left_align}>
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住我</Checkbox>)}*/}
          {/* <a className={styles.login_form_forgot}>Forgot password</a>*/}
          <Button type="primary" htmlType="submit" className={styles.login_form_button}>
            登录</Button>
          {/* Or <a>register now!</a>*/}
        </FormItem>
      </Form>
    );
  }
}
export default Form.create()(LoginForm);
