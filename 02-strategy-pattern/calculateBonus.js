const calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return salary * 4
  }
  if (performanceLevel === 'A') {
    return salary * 3
  }
  if (performanceLevel === 'B') {
    return salary * 2
  }
}

calculateBonus('B', 20000)
calculateBonus('S', 6000)

// 使用策略模式计算奖金
// 策略模式至少包含两个部分
// 1. 一组策略, 策略类当中封装了具体的算法, 并负责具体的计算
// 2. 环境类 Context, 接受用户的请求, 并且委托给策略类

// **** 策略类 ****
const PerformanceS = function () {}
PerformanceS.prototype.calculate = function (salary) {
  return salary * 4
}

const PerformanceA = function () {}
PerformanceA.prototype.calculate = function (salary) {
  return salary * 3
}

const PerformanceB = function () {}
PerformanceB.prototype.calculate = function (salary) {
  return salary * 2
}

// **** 环境类 提供上下问给策略类 ****
const Bonus = function () {
  this.salary = null
  // 用于记录策略对象
  this.strategy = null
}

Bonus.prototype.setSalary = function (salary) {
  this.salary = salary
}

Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy
}

Bonus.prototype.getBonus = function () {
  return this.strategy.calculate(this.salary)
}

const bonus = new Bonus()
bonus.setSalary(1000)
bonus.setStrategy(new PerformanceA())
console.log(bonus.getBonus())

// 上面的用法是在模拟一般的策略模式, 实际上, 在 JavaScript 中我们可以写的更加简单
// JavaScript 中的 策略模式

// **** 简化之后的策略类 ****
const strategy = {
  S: function (salary) {
    return salary * 4
  },
  A: function (salary) {
    return salary * 3
  },
  B: function (salary) {
    return salary * 2
  }
}

// **** 简化之后的 context ****
const calculateBonus_ = function (strategy, level, salary) {
  return strategy[level](salary)
}

console.log(calculateBonus_(strategy, 'A', 1000))

// 通过这种方式去抽离计算逻辑以及判断路径是非常常见的手段, 作为 Map 爱好者, 我必须要上一个私货( 笑啦