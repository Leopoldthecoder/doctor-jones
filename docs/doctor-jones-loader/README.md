## 介绍

doctor-jones-loader 是一个 webpack loader，用于将你的源代码中的字符串格式化并输出。它支持：
- 字符串字面量
- 模板字符串
- JSX 模板
- .vue 单文件组件中的模板
- .vue 单文件组件中的脚本

::: tip
doctor-jones-loader 同样支持 `.ts` 和 `.tsx` 文件
:::

## 安装

```bash
npm i doctor-jones-loader -D
```

## 配置

最简单的用法：
```js
// webpack.config.js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'doctor-jones-loader'
          }
        ]
      }
    ]
  }
}
```

若需自定义格式化选项，可以传入 `formatOptions`（具体的格式化选项请参考[这里](../doctor-jones/usage.html#格式化选项)）：
```js
{
  // ...
  use: [
    {
      loader: 'doctor-jones-loader',
      options: {
        formatOptions: {
          spacing: false
        }
      }
    }
  ]
}
```

支持 JSX（以 React 为例）：
```js
// webpack.config.js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'doctor-jones-loader',
            options: { formatOptions: {/* ... */} }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        ]
      }
    ]
  }
}
```

::: warning
由于 loader 链是逆序调用的，所以需要将 doctor-jones-loader 写在 babel-loader 之前。
:::

支持 Vue：
```js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'doctor-jones-loader',
            options: { formatOptions: {/* ... */} }
          },
          {
            loader: 'vue-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

支持 TypeScript：
```js
// webpack.config.js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'doctor-jones-loader',
            options: { formatOptions: {/* ... */} }
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
}
```

## 禁用格式化
若不希望格式化代码中的某一行，可以通过添加注释的方式来禁用格式化：
```js
const str1 = 'doctor-jones是一个“治疗”中英文混排格式的工具'
// doctor-jones-disabled-line
const str2 = 'doctor-jones是一个“治疗”中英文混排格式的工具'

// str1 会被格式化，而 str2 会被忽略
```
