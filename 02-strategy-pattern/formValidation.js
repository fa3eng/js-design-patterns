const registerForm = document.getElementById('registerForm')

// registerForm.onsubmit = function (e) {
//   e.preventDefault()

//   if (registerForm.userName.value === '') {
//     alert('用户名不能为空')
//     return false
//   }
//   if (registerForm.password.value.length < 6) {
//     alert('密码长度不能少于 6 位')
//     return false
//   }
//   if (!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value)) {
//     alert('手机号码格式不正确')
//     return false
//   }
// }

// 封装策略
const strategy = {
  isNonEmpty(errMsg, value) {
    if (value === '') {
      return errMsg
    }
  },
  minLength(errMsg, value, minLength) {
    if (value.length < +minLength) {
      return errMsg
    }
  },
  isMobile(errMsg, value) {
    if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errMsg
    }
  }
}

// 我实现的版本并不是传入 dom 进去, 而且纯粹的对数值进行校验
// 构建 Validator 校验器
// 实现 add 方法添加校验对象以及对应的校验规则
// 实现 start 方法开启校验
const Validator = function() {
  this.validatorQueue = []  
};

Validator.prototype.add = function(value, rule, errMsg) {
  const [ruleName, ruleValue] = rule.split(':')
  this.validatorQueue.push({value, ruleName, ruleValue, errMsg})

  return this
}

Validator.prototype.start = function() {
  for(const { value, ruleName, ruleValue, errMsg } of this.validatorQueue) {
    const parameter = [errMsg, value]

    if(ruleValue) parameter.push(ruleValue)

    const msg = strategy[ruleName].apply(null, parameter)
    if(msg) return msg
  }

  return null
}

// 构建使用上下文
registerForm.onsubmit = function (e) {
  e.preventDefault()

  const validator = new Validator()

  // 添加校验规则
  validator.add(registerForm.userName.value, 'isNonEmpty', '用户名不为空')
  validator.add(registerForm.password.value, 'minLength:6', '密码长度不少于六位')
  validator.add(registerForm.phoneNumber.value, 'isMobile', '手机格式不正确')

  // 开启校验
  const msg = validator.start()
  if(msg) {
    alert(msg)
    return
  }
}
