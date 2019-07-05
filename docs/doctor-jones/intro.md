## 工具集

`doctor-jones` 是一个用来格式化中文字符串（包括中英文混排）的工具集，它基于 [w3c/clreq](https://github.com/w3c/clreq) 及其他中文排版最佳实践。作为一个工具集，`doctor-jones` 包括：

* 一个 [npm 包](https://www.npmjs.com/package/doctor-jones)，用于接收字符串，并返回格式化后的字符串
* 一个 [webpack loader](https://github.com/Leopoldthecoder/doctor-jones-loader)，用于格式化你的 `.js`, `.ts`, `.jsx`, `.tsx`, `.vue` 文件中的字符串
* 一个 [Chrome 插件](https://github.com/Leopoldthecoder/doctor-jones-extension)，用于格式化当前正在浏览的网页
* 一个即开即用的网站，粘贴一段文本，得到格式化后的输出，即 `doctor-jones-as-a-service`，简称 `DJaaS`（计划中）

## 功能

使用 `doctor-jones` 可以做到以下格式化：

* 中英文、中文与数字之间增加半角空格
* 移除全角标点和英文/数字之间多余的半角空格
* 移除多于一个的连续感叹号
* 将不规范的省略号（如`。。。`、`、、`等）规范化为 `……`
* 将引号 `“”` `‘’` 替换为 `「」` `『』`
* 将纯数字周围的全角括号替换为半角括号

::: warning
需要注意的是，这些格式化只对至少包含一个中文字符或全角符号的字符串生效。
:::

## 示例

<iframe width="100%" height="300" src="//jsfiddle.net/leopoldthecuber/9y78tmv1/9/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
