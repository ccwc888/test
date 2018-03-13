# Modal说明
## API
### 对话框的属性说明如下：
| 属性        | 说明           | 类型  | 默认值  |
| ------------- |:-------------:| -----:| -----:|
| 与antd一致      | 与antd一致  | 与antd一致 | 与antd一致 |

## 举个栗子
* 示例
    ```javascript
    <Modal
        title="测试标题"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="第一个按钮"
        cancelText="第二个按钮"
        footer={(<button>123</button>)}
      >
        这是内容
    </Modal>
    ```
