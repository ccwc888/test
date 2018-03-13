import React from 'react';
import { TreeSelect } from 'antd';
import css from './index.scss';

const TreeNode = TreeSelect.TreeNode;
class TreeSelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={css.a}>
        <div className={css.wrap}>
          <TreeSelect
            {...this.props}
          />
        </div>
      </div>
    );
  }
}
TreeSelectComponent.TreeNode = ({ ...rest }) => {
  return (
    <TreeNode
      {...rest}
    />
  );
};
export default TreeSelectComponent;
