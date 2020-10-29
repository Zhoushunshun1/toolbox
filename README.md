# slip_check

## 插件安装

```
npm i slip_check

https://github.com/Zhoushunshun541/toolbox 上下载 slipCheck.js 文件 放到本地资源中
```

### 插件的使用

```js
// 1  在需要的页面中引入
import { SlipCheck } from 'slip_check'
// 2  使用的时候 需要创建两个canvas 一个做背景图使用 一个做拖动使用
<canvas id="sliderBlock" width="488"></canvas>
<canvas id="codeImg" width="488"></canvas>
// 3  然后将对象实例化
qrCodeModule = new SlipCheck(id, bgId,callback,imgUrl)
// 4  画布初始化
qrCodeModule.init()
```

## 案例

### 说明文档 -- new实例的时候 参数详解

| 属性     | 说明                                                         | 默认值   |
| -------- | ------------------------------------------------------------ | -------- |
| id       | 滑动canvas的id                                               | String   |
| bgId     | 是否禁用拖动功能                                             | String   |
| callback | 当滑动校验通过时进行执行的函数                               | Function |
| imgUrl   | 背景图片的地址  我们已经有了一个默认背景，当然也可以根据您的需求传递新的地址 | String   |

[查看详情](https://github.com/Zhoushunshun541/toolbox).