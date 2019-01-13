/* eslint-env browser */
import './assets/css/style.css'

const title = document.createElement('h1')
title.textContent = 'doctor-jones是一个“治疗”中英文混排格式的工具'
title.className = 'title'

const app = document.getElementById('app')

if (app) {
  app.appendChild(title)
}
