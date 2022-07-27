// 简单来说, 单例就是在项目中唯一的对象

// **** 简单的实现一个 ****
const Singleton_1 = function (name) {
  this.name = name
  this.instance = null
}

Singleton_1.prototype.createIns = function (args) {
  if (!this.instance) {
    this.instance = new Singleton_1(args)
  }

  return this.instance
}

Singleton_1.prototype.alertName = function () {
  alert(this.name)
}

// const ins = Singleton_1.prototype.createIns('meakle')
// ins.alertName()

// 上面这段代码最大的问题是只能通过 createIns 这种方式去创建实例, 而我们一般通过 new 关键字去创造实例
// 也就是说, 我们可以通过一种技术手段, 实现一种特殊的类
// 这个类只能被实现一次, 只能实例化出一个唯一的对象

// **** 下面我们利用闭包实现 ****
const Singleton_2 = (function () {
  let instance = null

  const Singleton_2_inner = function (name) {
    if (instance) return instance

    this.name = name
    instance = this

    return instance
  }

  Singleton_2_inner.prototype.alertName = function () {
    alert(this.name)
  }

  return Singleton_2_inner
})()

//
// const ins1 = new Singleton_2('meakle')
// const ins2 = new Singleton_2('asen')

// 看起来挺好的, 但是不够优雅
// 1. 有一个立即执行函数, 看起来很奇怪
// 2. Singleton_2_inner 函数违反单一职责原则, 作为构造函数的同时还判断是否重复创建实例
// 我们可以利用代理来做

// **** 单例代理 ****
// 创建一个代理函数用来包装普通的构造函数
const proxySingleton = function (func) {
  let instance = null

  return function (args) {
    if (instance) return instance

    instance = new func(args)
    return instance
  }
}

const proxySingleton_ = proxySingleton(Singleton_1)

const ins1 = new proxySingleton_('meakle')
const ins2 = new proxySingleton_('asen')
console.log(ins1, ins2, ins1 === ins2)

// JavaScript 实现单例还可以利用 esm 的能力, 在一个文件内创建一个构造函数, 并利用该构造函数生成一个实例, 最后只导出该实例
// 不过我觉得利用闭包的方式会更好