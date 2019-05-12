# Doctor Jones
> After all, we should all respect [w3c/clreq](https://github.com/w3c/clreq)

[English documentation](./README_EN.md)

`doctor-jones` 是一个用来格式化中文字符串（包括中英文混排）的工具箱，它基于 [w3c/clreq](https://github.com/w3c/clreq) 及其他中文排版最佳实践。

使用 `doctor-jones` 可以做到以下格式化：

* 中英文、中文与数字之间增加半角空格
* 移除全角标点和英文/数字之间多余的半角空格
* 将引号 `“”` `‘’` 替换为 `「」` `『』`
* 将省略号规范化为 `……`
* 移除多于一个的连续感叹号
* 将纯数字周围的全角括号替换为半角括号

需要注意的是，这些格式化只对至少包含一个中文字符的字符串生效。同时，每个格式化选项都可以通过设置来关闭。

作为一个工具箱，`doctor-jones` 包括：

* [ ] 一个 `npm` 包，用于接收字符串，并返回格式化后的字符串（完成）
* [ ] 一个 `webpack` loader，用于格式化你的 `.js`, `.ts`, `.jsx`, `.tsx`, `.vue` 文件中的字符串字面量（施工中🚧）
* [ ] 一个即开即用的网站，粘贴一段文本，得到格式化后的输出，即 `doctor-jones-as-a-service`，简称 `DJaaS`（计划中）
* [ ] 一个 Chrome 插件，用于格式化当前正在浏览的网页（计划中）

目前这个项目仍处于早期阶段。
