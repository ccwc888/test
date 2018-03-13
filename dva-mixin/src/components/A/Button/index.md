# Button说明
## API
### 按钮的属性说明如下：
| 属性        | 说明           | 类型  | 默认值  |
| ------------- |:-------------:| -----:| -----:|
| type      | 设置按钮类型，可选值为 primary icon link dashed  | string | - |
| value      | 设备按钮的展示文字      |   string | - |
| size | 设置按钮大小，可选值为 small 或者不设      |    string | default |
| level | 文字按钮的类型，可选值为danger或者不设      |    string | - |
| iconDom | 自定义icon，dom结构      |    dom | - |
| ghost | 使按钮背景为白色，一般和type="primary"一起使用，字体和边框为主色的次按钮 |  boolean  | false |
| onClick | Click事件的 handler      |    function | - |

## 几个栗子
* 主次按钮
    ```javascript
    // 主按钮
    <Button value="主按钮" type="primary" />
    // 次按钮（默认按钮）
    <Button value="次按钮" />
    ```

* 小命令按钮
    ```javascript
    // 小号按钮
    <Button value="小号按钮" size="small" />
    ```
* 图标按钮
    ```javascript
    //iconDom栗子
    const iconDom = (
      <span>
        <svg className="icon">
          <use xlinkHref="#icon-zdgl" />
          <use xlinkHref="#icon-zdgl1" />
        </svg>
      </span>
    );
    //图标按钮
    <Button type="icon" value="图标按钮" />
    //图标文字按钮
    <Button type="icon" value="图标按钮" iconDom={iconDom} />    
    ```
* 文字按钮
    ```javascript
    //文字按钮,蓝色
    <Button type="link" value="文字按钮" />
    //文字按钮,红色    
    <Button type="link" level="danger" value="文字按钮" />    
    ```
* 特殊次级按钮
    ```javascript
    // 特殊次级按钮,文字和边框为主色，背景色为白色的按钮
    <Button value="弹框筛选" type="primary" ghost />
    ```