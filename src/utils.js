export function isFun(val) {
  return val instanceof Function
};

export function isObject(val) {
  return typeof val === 'object' && val !== null;
};
// 判断数组
export function isArray(val) {
  return Array.isArray(val);
}