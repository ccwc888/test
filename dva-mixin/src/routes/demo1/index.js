import React from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
import styles from './index.scss';

function Demo1(reactProps) {
  const { text, dispatch } = reactProps;
  const onInput = ({ target: { value: v } }) => dispatch({ type: 'demo1/changeText', payload: v });
  return (<div className={styles.wrapper}>
    <div className={styles.unit}>
      <h2>数据双向绑定</h2>
      <div>Hello {text}</div>
      <Input onChange={onInput} value={text} style={{ width: 300 }} />
    </div>
  </div>);
}

function mapStatToProps(state) {
  return {
    text: state.demo1.text,
  };
}

export default connect(mapStatToProps)(Demo1);
