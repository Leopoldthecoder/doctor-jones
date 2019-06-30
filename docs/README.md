---
meta:
  - name: keywords
    content: doctor jones,composition of mixed text,中英文混排,格式化,排版,自动,空格
home: true
heroImage: /logo.png
heroText: Doctor Jones
tagline: 中文排版格式化工具
actionText: 阅读文档
actionLink: /doctor-jones/intro/
features:
- title: 格式化
  details: 修正不规范的中文符号，同时支持中英文混排时不同字符间的格式化
- title: 可配置
  details: 通过配置选项来定制你的格式化策略，使输出结果符合你的排版风格
- title: 工具集
  details: 除 npm 包以外，还包括 CLI、webpack loader、Chrome 扩展和一个即开即用的网站，满足不同场景的需要
footer: MIT Licensed | Made with ❤
---

```js
import dj from 'doctor-jones'

// 在中英文、中文与数字之间增加半角空格
dj('当蚀魂击中已经受其影响的敌人时，立即对敌人造成相当于120秒蚀魂的伤害')
// 当蚀魂击中已经受其影响的敌人时，立即对敌人造成相当于 120 秒蚀魂的伤害

// 移除全角标点和英文/数字之间多余的半角空格
dj('对圣光的追寻将是她一生中最大的考验， Anajinn 热切地拥抱了自己命运的安排')
// 对圣光的追寻将是她一生中最大的考验，Anajinn 热切地拥抱了自己命运的安排

// 移除多于一个的连续感叹号
dj('新鲜的肉！！！')
// 新鲜的肉！

// 将不规范的省略号规范化为 `……`
dj('恐惧之地流传着关于猎魔人库奈的传说，据说此人能与暗影合而为一、神鬼莫测。。。')
// 恐惧之地流传着关于猎魔人库奈的传说，据说此人能与暗影合而为一、神鬼莫测……

// 将弯引号替换为直角引号
dj('维尔声称，“御法者”是一种介于现实世界不同位面的存在')
// 维尔声称，「御法者」是一种介于现实世界不同位面的存在

// 将纯数字周围的全角括号替换为半角括号
dj('镶孔（1）')
// 镶孔(1)
```
