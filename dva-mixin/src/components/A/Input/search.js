import React from 'react';
import { Input } from 'antd';
import style from './search.scss';

const Search = Input.Search;
class CSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <span className={style.wrapper}>
        <Search {...this.props} />
      </span>
    );
  }
}
export default CSearch;
