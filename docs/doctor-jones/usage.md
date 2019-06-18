## 引入

根据安装方式的不同，需要以不同方式引入 doctor-jones

### 通过 CDN 安装

```js
const dj = window.dj
```

### 通过 npm 安装

```js
import dj from 'doctor-jones'
```

## 调用

```js
dj('doctor-jones是一个“治疗”中英文混排格式的工具')
// 返回 'doctor-jones 是一个「治疗」中英文混排格式的工具'
```

## 格式化选项

`dj` 支持传入第二个参数，作为格式化选项：

```js{9,13,17,24,31,35}
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
