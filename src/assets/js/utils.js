/**
 * 公用JS方法资源库
 */

let class2type = {};
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(name => {
  class2type["[object " + name + "]"] = name.toLowerCase();
});



function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n
}


/**
 * 时间格式化
 * @param time 标准时间格式/时间字符串
 * @param template
 */
export function formatTime(time, template = '{0}-{1}-{2}') {
  if (typeof time === 'object') {
    time = time.toLocaleString()
  }
  // 匹配字符串中的数字 ['2018','11','3']
  let reg = /\d+/g,
    ary = time.match(reg);
  ary = ary.map(item => item < 10 ? `0${item}` : item);

  reg = /{(\d+)}/g;
  template = template.replace(reg, (...arg) => {
    return ary[arg[1]] || '00'
  });
  return template
}

/**
 * 判断数据类型
 * @param obj 需要检测的对象
 * @returns {string} 数据类型 e.g:'number','string'
 */
export function type(obj) {
  if (obj == null) {
    return obj + "";
  }
  // Support: Android<4.0, iOS<6 (functionish RegExp)
  return typeof obj === "object" || typeof obj === "function" ?
    class2type[toString.call(obj)] || "object" :
    typeof obj;
}

export function px2rem (px, designWidth = 720) {
  return parseInt(px, 10) * 320 / designWidth / 20;
}
export function rem2px  (rem, designWidth = 720) {
  return rem * 20 * designWidth / 320;
}
export default {formatTime, type}
