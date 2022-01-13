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


let callbacks = [];
let waiting = false;
function flushCallbacks() {
  callbacks.forEach(fn => fn());
  callbacks = [];
  waiting = false;
}
export function nextTick(fn) {
  callbacks.push(fn);
  if(!waiting) {
    Promise.resolve().then(flushCallbacks);
    waiting = true;
  }
}