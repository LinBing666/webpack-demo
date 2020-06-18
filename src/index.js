import component from './component'
const src = require('./img/webpack.png')
// import 'purecss'
import './main.css'
const img = document.createElement('img')
img.className = 'webpack-img'
img.src = src.default
document.body.appendChild(img)
document.body.appendChild(component())
