# Message说明
## API
### 信息提示框的属性说明如下：
| 属性        | 说明           | 类型  | 默认值  |
| ------------- |:-------------:| -----:| -----:|
| type      | 设置按钮类型，可选值为 default alarm  | string | default |
| okText      | 第一个按钮的文字      |   string | 确定 |
| cancelText | 设置第二按钮的文字（type为alarm时只生效cancelText） |    string | 取消 |
| titleWord | 设置提示框的标题      |    string | 出错啦！ |
| word | 设置提示框的内容问题      |    string | - |
| icon  | 显示图标的类型，可选值为 error success alarm remind ask  | string | error |
| onOk | 第一个按钮的Click事件的 handler      |    function | - |
| onCancel | 第二个按钮的Click事件的 handler （type为alarm时只生效onCancel）     |    function | - |

## 几个栗子
* 两个按钮的使用
    ```javascript
    <Message
      visible={true}
      type="default"
      okText="确定"
      cancelText="取消"
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      titleWord="出错啦！"
      icon="error"
      word="接口请求出错啦！"
    />
    ```

* 一个按钮的使用
    ```javascript
    // 小号按钮
    <Message
      visible={true}
      type="alarm"
      cancelText="关闭"
      onCancel={this.handleCancel}
      titleWord="操作成功！"
      icon="success"
      word="操作成功啦，请进行下一步！"
    />
    ```
