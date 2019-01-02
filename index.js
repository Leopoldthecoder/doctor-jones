const cjkEn = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([a-zA-Z0-9])/g
const enCjk = /([a-zA-Z0-9])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g

console.log('这是个bug吗？我来fix一下'.replace(cjkEn, '$1 $2').replace(enCjk, '$1 $2'))


