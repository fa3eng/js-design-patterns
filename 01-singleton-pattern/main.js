// 创建浮窗
const createFloatWindow = function() {
  const div = document.createElement('div')

  div.innerHTML = '我是登录浮窗'
  div.style.display = 'none'

  document.body.appendChild(div)
  return div
}

const proxySingleton = function(func) {
  let instance = null

  return function(args) {
    if(!instance) instance = func(args)
    
    return instance
  }
}

const singletonWindow = proxySingleton(createFloatWindow)

document.getElementById('loginBtn').onclick = function () {
  const loginLayer = singletonWindow()
  loginLayer.style.display = 'block'
}
