## 安装

全局安装 doctor-jones，即可在终端中使用：

```bash
npm i doctor-jones -g
```

## 使用

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
