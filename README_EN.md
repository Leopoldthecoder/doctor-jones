# Doctor Jones
> After all, we should all respect [w3c/clreq](https://github.com/w3c/clreq)

<p align="center">
  <a href='https://app.codacy.com/app/Leopoldthecoder/doctor-jones?utm_source=github.com&utm_medium=referral&utm_content=Leopoldthecoder/doctor-jones&utm_campaign=Badge_Grade_Dashboard'><img src='https://img.shields.io/codacy/grade/f564214ac34442fca5809a557f0dd342.svg?style=for-the-badge' alt='Codacy grade' /></a>
  <a href='https://coveralls.io/github/Leopoldthecoder/doctor-jones?branch=master'><img src='https://img.shields.io/coveralls/github/Leopoldthecoder/doctor-jones.svg?style=for-the-badge' alt='Coverage Status' /></a>
  <a href='https://www.npmjs.com/package/doctor-jones'><img src='https://img.shields.io/bundlephobia/min/doctor-jones.svg?style=for-the-badge' alt='npm bundle size' /></a>
  <a href='https://github.com/Leopoldthecoder/doctor-jones/blob/master/LICENSE'><img src='https://img.shields.io/npm/l/doctor-jones.svg?style=for-the-badge' alt='Liscense' /></a>
  <br>
  <br>
  <span>Links</span>
  <br>
  <a href='https://leopoldthecoder.github.io/doctor-jones/'>文档</a>
  <span> · </span>
  <a href='./README.md'>中文 README</a>
  <span> · </span>
  <a href='https://www.npmjs.com/package/doctor-jones'>npm Page</a>
  <br>
  <br>
  <span>Related Projects</span>
  <br>
  <a href='https://github.com/Leopoldthecoder/doctor-jones-loader'>doctor-jones-loader</a>
  <span> · </span>
  <span>More to be developed...</span>
</p>

##

### Introduction

`doctor-jones` is a toolbox designed for formatting Chinese texts, especially when mixed with Western texts, based on [w3c/clreq](https://github.com/w3c/clreq) and other best practices. As a toolbox, `doctor-jones` includes:

* [x] An [`npm` package](https://www.npmjs.com/package/doctor-jones) which takes a string and returns the formatted output
* [x] A [`webpack` loader](https://github.com/Leopoldthecoder/doctor-jones-loader) which formats your strings in `.js`, `.ts`, `.jsx`, `.tsx`, `.vue` files
* [ ] A Chrome extension which formats the web page you're browsing (under development)
* [ ] A ready-to-use website where you can paste some text and get the formatted output, aka. `doctor-jones-as-a-service`, or `DJaaS` (in plan)

Here "formatting" means:

* Adding a halfwidth space between a Chinese character and an alphabet / number
* Removing unnecessary halfwidth space between a fullwidth punctuation and an alphabet / number
* Removing successive exclamation marks
* Normalizing ellipses to `……`
* Replacing quotation marks `“”` `‘’` with `「」` `『』`
* Replacing fullwidth brackets around numbers with halfwidth ones

Note that these formats only take effects on texts with at least one Chinese character or one full-width mark. And all the above formats can be turned off using options.

### Installation

#### CDN
```html
<script type="text/javascript" src="https://unpkg.com/doctor-jones/dist/index.umd.min.js"></script>
```

#### npm
```bash
npm i doctor-jones -S
```

### Usage
```js
// Using CDN
const dj = window.dj

// Using npm
import dj from 'doctor-jones'

dj('doctor-jones是一个“治疗”中英文混排格式的工具') // returns 'doctor-jones 是一个「治疗」中英文混排格式的工具'
```

### Format options
```js
dj(
  // string to be formatted
  'doctor-jones是一个“治疗”中英文混排格式的工具',
  
  // format options
  {
    // whether to add a halfwidth space between a Chinese character and an alphabet / number
    // boolean
    spacing: true,

    // whether the unnecessary halfwidth space between a fullwidth punctuation and an alphabet / number is allowed
    // boolean
    spaceBetweenFullwidthPunctuationAndAlphabets: false,

    // whether successive exclamation marks are removed  
    // boolean
    successiveExclamationMarks: false,
  
    // ellipses normalization rule
    // 'none' | '3dots' | 'all'
    // 'none': converts successive 。、，. to ……
    // '3dots': converts successive 。、，. to ……, excepted for ...
    // 'all': no conversion
    ellipsisTolerance: 'none',
  
    // corner quotation rule
    // 'double' | 'single' | 'none'
    // 'double': replace “” with 「」, and replace ‘’ with 『』
    // 'single': replace ‘’ with 「」, and replace “” with 『』
    // 'none': “” and ‘’ are not replaced
    replaceWithCornerQuotes: 'double',

    // whether to replace fullwidth brackets around numbers with halfwidth ones
    // boolean
    halfwidthParenthesisAroundNumbers: true
  }
)
```

### CLI

Install doctor-jones globally and you can use it in your terminal:

```bash
npm i doctor-jones -g
```

```shell
$ doctor-jones --help

Format Options
  --spacing, -s          是否在中文和字母数字之间添加空格                  [boolean]
  --space-between, --sb  是否允许在全角符号与字母数字之间存在空格           [boolean]
  --exclamation, --ex    是否允许连续的感叹号                            [boolean]
  --ellipsis, --el       省略号规范化规则       [choices: "none", "3dots", "all"]
  --quote, -q            弯引号替换规则     [choices: "none", "double", "single"]
  --parenthesis, -p      是否在数字周围使用半角括号                       [boolean]

Options:
  --help, -h     帮助信息                                              [boolean]
  --version, -v  当前版本                                              [boolean]

Examples:
    doctor-jones 需要格式化的字符串
    doctor-jones -s false 需要格式化的字符串
    doctor-jones -s false --el 3dots 需要格式化的字符串
```

### Inspirations
- [pangu.js](https://github.com/vinta/pangu.js)
- [syntax-parser](https://github.com/ascoders/syntax-parser)
- [ElemeFE Style Guide](https://github.com/ElemeFE/style-guide/blob/master/copywriter.md)
