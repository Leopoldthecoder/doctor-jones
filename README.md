# Doctor Jones
> After all, we should all respect [w3c/clreq](https://github.com/w3c/clreq)

<p align="center">
  <a href='https://app.codacy.com/app/Leopoldthecoder/doctor-jones?utm_source=github.com&utm_medium=referral&utm_content=Leopoldthecoder/doctor-jones&utm_campaign=Badge_Grade_Dashboard'><img src='https://img.shields.io/codacy/grade/f564214ac34442fca5809a557f0dd342.svg?style=for-the-badge' alt='Codacy grade' /></a>
  <a href='https://coveralls.io/github/Leopoldthecoder/doctor-jones?branch=master'><img src='https://img.shields.io/coveralls/github/Leopoldthecoder/doctor-jones.svg?style=for-the-badge' alt='Coverage Status' /></a>
  <a href='https://www.npmjs.com/package/doctor-jones'><img src='https://img.shields.io/bundlephobia/min/doctor-jones.svg?style=for-the-badge' alt='npm bundle size' /></a>
  <a href='https://github.com/Leopoldthecoder/doctor-jones/blob/master/LICENSE'><img src='https://img.shields.io/npm/l/doctor-jones.svg?style=for-the-badge' alt='Liscense' /></a>
  <br>
  <br>
  <span>链接</span>
  <br>
  <a href='./README_EN.md'>English Documentation</a>
  <span> · </span>
  <a href='https://www.npmjs.com/package/doctor-jones'>npm Page</a>
  <br>
  <br>
  <span>相关项目</span>
  <br>
  <a href='https://github.com/Leopoldthecoder/doctor-jones-loader'>doctor-jones-loader</a>
  <span> · </span>
  <span>To Be Developed...</span>
</p>

##

### 介绍

`doctor-jones` 是一个用来格式化中文字符串（包括中英文混排）的工具箱，它基于 [w3c/clreq](https://github.com/w3c/clreq) 及其他中文排版最佳实践。作为一个工具箱，`doctor-jones` 包括：

* [x] 一个 [`npm` 包](https://www.npmjs.com/package/doctor-jones)，用于接收字符串，并返回格式化后的字符串
* [x] 一个 [`webpack` loader](https://github.com/Leopoldthecoder/doctor-jones-loader)，用于格式化你的 `.js`, `.ts`, `.jsx`, `.tsx`, `.vue` 文件中的字符串
* [ ] 一个 Chrome 插件，用于格式化当前正在浏览的网页（计划中）
* [ ] 一个即开即用的网站，粘贴一段文本，得到格式化后的输出，即 `doctor-jones-as-a-service`，简称 `DJaaS`（计划中）

使用 `doctor-jones` 可以做到以下格式化：

* 中英文、中文与数字之间增加半角空格
* 移除全角标点和英文/数字之间多余的半角空格
* 移除多于一个的连续感叹号
* 将省略号规范化为 `……`
* 将引号 `“”` `‘’` 替换为 `「」` `『』`
* 将纯数字周围的全角括号替换为半角括号

需要注意的是，这些格式化只对至少包含一个中文字符的字符串生效。同时，每个格式化选项都可以通过设置来关闭。

### 安装

#### CDN
```html
<script type="text/javascript" src="https://unpkg.com/doctor-jones/dist/index.umd.min.js"></script>
```

#### npm
```bash
npm i doctor-jones -S
```

### 使用
```js
// 使用 CDN
const dj = window.dj

// 使用 npm
import dj from 'doctor-jones'

dj('doctor-jones是一个“治疗”中英文混排格式的工具') // 返回 'doctor-jones 是一个「治疗」中英文混排格式的工具'
```

### 格式化选项
```js
dj(
  // 待格式化的字符串
  'doctor-jones是一个“治疗”中英文混排格式的工具',
  
  // 格式化选项
  {
    // 是否在中文和字母数字之间添加空格
    // 可选值：boolean
    spacing: true,

    // 是否允许在全角符号与字母数字之间存在空格  
    // 可选值：boolean
    spaceBetweenFullwidthPunctuationAndAlphabets: false,

    // 是否允许连续的感叹号  
    // 可选值：boolean
    successiveExclamationMarks: false,
  
    // 省略号规范化规则
    // 可选值：'none' | '3dots' | 'all'
    // 'none'：将连续出现两次或以上的 。、，. 规范化为 ……
    // '3dots'：除 ... 以外，将连续出现两次或以上的 。、，. 规范化为 ……
    // 'all'：不进行省略号规范化
    ellipsisTolerance: 'none',
  
    // 弯引号替换规则
    // 可选值：'double' | 'single' | 'none'
    // 'double'：使用直角引号「」替换弯引号“”，同时使用直角引号『』替换弯引号‘’
    // 'single'：使用直角引号「」替换弯引号‘’，同时使用直角引号『』替换弯引号“”
    // 'none'：不替换弯引号
    replaceWithCornerQuotes: 'double',

    // 是否在数字周围使用半角括号  
    // 可选值：boolean
    halfwidthParenthesisAroundNumbers: true
  }
)
```

### 感谢
- [pangu.js](https://github.com/vinta/pangu.js)
- [syntax-parser](https://github.com/ascoders/syntax-parser)
- [ElemeFE Style Guide](https://github.com/ElemeFE/style-guide/blob/master/copywriter.md)
