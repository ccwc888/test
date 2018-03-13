import React from 'react';
import { connect } from 'dva';
import ComponentTable from '@components/A/table';
import ComponentInput from '@components/A/Input';
import ComponentSelect from '@components/A/Select';
import Pagination from '@components/A/Pagination';

import { Badge, Menu, Dropdown, Icon } from 'antd';
import style from './index.scss';

const Option = ComponentSelect.Option;
const SearchInput = ComponentInput.Search;
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.key === 2, // Column configuration not to be checked
  }),
};

const rowSelectionOut = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.key === 2, // Column configuration not to be checked
  }),
};

const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);

const expandedRowRender = (inner) => {
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', key: 'state', render: () => <span><Badge status="success" />Finished</span> },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <span className="table-operation">
          <a href="#">Pause</a>
          <a href="#">Stop</a>
          <Dropdown overlay={menu}>
            <a href="#">
              More <Icon type="down" />
            </a>
          </Dropdown>
        </span>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    });
  }

  const rowClassName = (record) => {
    return record.key === 2 ? 'disabled-tr' : '';
  };
  return (
    <ComponentTable
      className={inner ? 'nested-inner-table' : ''}
      columns={columns}
      dataSource={data}
      pagination={false}
      rowSelection={rowSelection}
      rowClassName={rowClassName}
    />
  );
};

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Platform', dataIndex: 'platform', key: 'platform' },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: 'Creator', dataIndex: 'creator', key: 'creator' },
  { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Action', key: 'operation', render: () => <a href="#">Publish</a> },
];

const data = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
  });
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

const multiSelectChildren = [];
for (let i = 10; i < 36; i++) {
  multiSelectChildren.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class NestedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedRowKeys: '',
    };
  }
  handleOnRowClick = (record) => {
    record.key === this.state.expandedRowKeys
      ? this.setState({ expandedRowKeys: '' })
      : this.setState({ expandedRowKeys: record.key });
  };
  render() {
    return (
      <div className={style.main}>
        <p style={{ margin: '10px' }}>table复合时样式</p>
        <ComponentTable
          className="components-table-nested"
          columns={columns}
          expandedRowRender={expandedRowRender}
          dataSource={data}
          onRowClick={this.handleOnRowClick}
          rowSelection={rowSelectionOut}
          expandedRowKeys={[this.state.expandedRowKeys]}
          pagination={false}
        />
        <hr style={{ margin: '15px' }} />
        <p style={{ margin: '10px' }}>table</p>
        {expandedRowRender()}
        <hr style={{ margin: '15px' }} />
        <div>
          <label>
            select 选择框
            <ComponentSelect defaultValue="lucy" style={{ margin: '10px', width: '80px' }} onChange={handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucycxzczxczczxczczcxzczx</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </ComponentSelect>
          </label>
          <label>
            禁用状态
            <ComponentSelect defaultValue="lucy" style={{ margin: '10px', width: 120 }} allowClear disabled>
              <Option value="lucy">Lucy</Option>
            </ComponentSelect>
          </label>
          <label>
            可搜索
            <ComponentSelect
              showSearch
              style={{ margin: '10px', width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </ComponentSelect>
          </label>
          <ComponentSelect
            style={{ margin: '10px', width: 200 }}
            placeholder="select"
          >
            {multiSelectChildren}
          </ComponentSelect>
        </div>
        <label>
          input输入框
          <ComponentInput placeholder="Basic usage" style={{ width: 200, margin: '10px' }} />
        </label>
        <label>
          input搜索框
          <SearchInput placeholder="input search text" style={{ width: 200, margin: '10px' }} onSearch={value => console.log(value)} />
        </label>
        <label>
          禁用状态
          <ComponentInput placeholder="disable usage" disabled style={{ width: 200, margin: '10px' }} />
        </label>

        <Pagination
          total={100}
          /* current={1} */
          defaultCurrent={1}
          defaultPageSize={30}
          /* pageSize={10} */
          /* pageSizeOptions={[10, 20, 30]} */
          showSizeChanger
          showSplitLine
          onChange={() => { }}
          onShowSizeChange={() => { }}
        />
      </div>
    );
  }
}
// function componetDev() {
//   console.log('wumi log componentTable', ComponentTable);
//   return (
//     <div className={style.main}>
//       component_dev
//       <ComponentTable columns={columns} rowSelection={rowSelection} dataSource={data} />
//     </div>
//   );
// }
function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(NestedTable);
