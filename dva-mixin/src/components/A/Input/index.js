import React from 'react';
import { Input as AInput } from 'antd';
import Input from './Input';
import Search from './search';

Input.TextArea = AInput.TextArea || function TextArea(props) { return (<AInput type="textarea" {...props} />); };
Input.Group = AInput.Group;
Input.Search = Search;
export default Input;
