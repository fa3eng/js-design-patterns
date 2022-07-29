// 升级版, 可以对一条输入框使用多个校验规则

// 封装策略
const strategy = {
  isNonEmpty (errMsg, value) {
    if (value === '') {
      return errMsg
    }
  },
  minLength (errMsg, value, minLength) {
    if (value.length < +minLength) {
      return errMsg
    }
  },
  isMobile (errMsg, value) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errMsg
    }
  }
}

// 构建 validator
const Validator = function () {
  this.validatorQueue = []
}

// 内部方法, 用于处理参数值
Validator.prototype.__handleParameter = function (value, validationObj) {
  const { errMsg, rule } = validationObj
  const [ruleName, ruleValue] = rule.split(':')
  const parameter = !ruleValue ? [errMsg, value] : [errMsg, value, ruleValue]

  return {
    ruleName,
    parameter
  }
}

Validator.prototype.add = function (value, rules) {
  for (const item of rules) {
    const { ruleName, parameter } = Validator.prototype.__handleParameter(
      value,
      item
    )

    this.validatorQueue.push({ validationFunc: strategy[ruleName], parameter })
  }
}

Validator.prototype.start = function () {
  for (const { validationFunc, parameter } of this.validatorQueue) {
    const msg = validationFunc.apply(null, parameter)

    if (msg) return msg
  }

  return null
}

registerForm.onsubmit = function (e) {
  e.preventDefault()
  const validator = new Validator()

  // 添加校验规则
  validator.add(registerForm.userName.value, [
    {
      rule: 'isNonEmpty',
      errMsg: '用户名不为空'
    },
    {
      rule: 'minLength:2',
      errMsg: '用户名长度不少于两位'
    }
  ])

  validator.add(registerForm.password.value, [
    {
      rule: 'minLength:6',
      errMsg: '密码长度不少于六位'
    }
  ])
  validator.add(registerForm.phoneNumber.value, [
    {
      rule: 'isMobile',
      errMsg: '手机格式不正确'
    }
  ])

  // 开启校验
  const msg = validator.start()
  if (msg) {
    alert(msg)
    return
  }
}
