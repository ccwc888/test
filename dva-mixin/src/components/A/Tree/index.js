import React from 'react';
import { Tree } from 'antd';

import styles from './index.scss';

const TreeNode = Tree.TreeNode;
class ATree extends React.Component {
  constructor(props) {
    super(props);
    const { selectedKeys = [] } = this.props;

    this.state = {
      searchValue: '',
      selectedKeys,
    };

    this.treeHash = {};
  }

  onSelect = (keys, e) => {
    const { multiple, onSelect, onSingleSelect, disabledKeys, disableCheckboxKeys, checkable, onCheck } = this.props;
    const realDisabled = checkable ? disableCheckboxKeys : disabledKeys;
    // const realSelected = checkable ? checkedKeys : propsSelected;
    if (checkable && e.node.props.disableCheckbox) {
      return false;
    }
    const { selectedKeys } = this.state;

    const key = e.node.props.eventKey;
    let modKeys = Array.isArray(keys) ? keys : keys.checked;

    const item = this.treeHash[key] || {};
    const { disabled } = item;

    let renderDisabled = !!disabled;
    if (Array.isArray(realDisabled)) {
      if (realDisabled.some(i => key === i)) {
        renderDisabled = true;
      } else {
        renderDisabled = false;
      }
    }

    if (renderDisabled || (checkable && e.node.disableCheckbox) || (checkable && item.hideCheckBox)) {
      return false;
    }
    // 如果是单选模式，取消 select 状态的 toggle
    if (!checkable && !multiple && selectedKeys.some(i => i === key)) {
      modKeys = selectedKeys;
    }

    if (typeof onSingleSelect === 'function') {
      onSingleSelect(key, item);
    }

    if (!checkable && typeof onSelect === 'function') {
      onSelect(modKeys, e);
    }
    if (checkable && typeof onCheck === 'function') {
      onCheck({ checked: modKeys, halfChecked: [] }, {
        ...e,
        checked: e.event === 'check' ? e.checked : e.selected,
        checkedNodes: e.event === 'check' ? e.checkedNodes : e.selectedNodes,
      });
    }
    this.setState({
      selectedKeys: modKeys,
    });
  }

  render() {
    const {
      className,
      style,
      dataSource = [],
      filterTypes,
      filterIds,
      disabledKeys,
      disableCheckboxKeys,
      selectedKeys: propsSelected,
      checkedKeys,
      checkable,
      multiple,
      // withSearch,
      hideCheckBox: propHideCheckBox,
      hideSwitcher: propHideSwitcher,
      ...rest
    } = this.props;
    const realDisabled = checkable ? disableCheckboxKeys : disabledKeys;
    const realSelected = checkable ? checkedKeys : propsSelected;
    const formatNode = data => data.reduce((acc, item) => {
      const [datas, hash] = acc;
      const { key, hideCheckBox, hideSwitcher, title, type, disabled, disableCheckbox, children, className: itemClass } = item;

      hash[key] = item;
      const realHideCheckBox = hideCheckBox || propHideCheckBox;
      const realHideSwitcher = hideSwitcher || propHideSwitcher;
      // 渲染不被过滤的项（被过滤的项，其后代也会被过滤）
      if (
        (!Array.isArray(filterTypes) || !filterTypes.some(i => type === i)) &&
        (!Array.isArray(filterIds) || !filterIds.some(i => key === i))
      ) {
        let renderDisabled = checkable ? !!disableCheckbox : !!disabled;
        // 如果存在过滤数组，则以过滤数组为准
        if (Array.isArray(realDisabled)) {
          if (realDisabled.some(i => key === i)) {
            renderDisabled = true;
          } else {
            renderDisabled = false;
          }
        }
        const classNames = [checkable ? 'checkable' : '', realHideCheckBox ? 'hideCheckBox' : '', realHideSwitcher ? 'hideSwitcher' : ''].filter(item => item.length > 0);
        // title 包裹在 span 中避免渲染 dom attr title
        // 不在这里处理 TreeNode 的 disabled 状态，因为这组件会把 expand 的箭头也 disabled ...
        if (Array.isArray(children) && children.length > 0) {
          const [childrenDatas, childrenHash] = formatNode(children);
          Object.assign(hash, childrenHash);

          datas.push(
            <TreeNode key={key} className={[...classNames, itemClass].join(' ')} title={<span className={renderDisabled ? styles.disabled : null}>{title}</span>} disableCheckbox={renderDisabled}>
              {childrenDatas}
            </TreeNode>,
          );
        } else {
          datas.push(
            <TreeNode key={key} className={[...classNames, itemClass].join(' ')} title={<span className={renderDisabled ? styles.disabled : null}>{title}</span>} disableCheckbox={renderDisabled} isLeaf={false} />,
          );
        }
      }

      return acc;
    }, [[], {}]);
    const [treeData, treeHash] = formatNode(dataSource);
    this.treeHash = treeHash;
    return (
      <div className={[styles.a, className].join(' ')} style={style}>
        <div className={styles.wrap}>
          <Tree
            checkStrictly
            multiple={!!multiple || !!checkable}
            checkable={!!checkable}
            defaultExpandAll
            disableCheckboxKeys={realDisabled}
            disabledKeys={realDisabled}
            {...rest}
            onSelect={this.onSelect}
            onCheck={this.onSelect}
            selectedKeys={(realSelected || this.state.selectedKeys)}
            checkedKeys={(realSelected || this.state.selectedKeys)}
          >
            {treeData}
          </Tree>
        </div>
      </div >
    );
  }
}

export default ATree;
