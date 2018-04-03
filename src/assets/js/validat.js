export let validatUsername = (u) => {
  if (typeof u === "string") {
    let reg = /^[a-zA-Z0-9_]{6,16}$/i;
    return {valida: reg.test(u), msg: '6到16位数字字母下划线'}
  }
  return {}
}
export let validatPassword = (p) => {
  if (typeof p === "string") {
    let reg = /^([a-zA-Z]){6,16}$|^(\d){6,16}$|^((?=[\x21-\x7e]+)[^A-Za-z0-9]){6,16}$|^(?!\2+$)(?!\1+$)[\2\1]{6,7}$|^(?!\3+$)(?!\1+$)[\3\1]{6,7}$|^(?!\3+$)(?!\2+$)[\2\3]{6,7}$|^(?=.*\3)(?=.*\1)(?=.*\2)[a-zA-Z\x21-\x7e\d]{6,7}$/;
    return {valida: reg.test(p), msg: '6到16位数字字母特殊字符'}
  }
  return {}
}
