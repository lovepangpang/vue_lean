import { isObject } from "./utils";
import { createElement, createText } from "./vdom";

export function renderMinxin (Vue) {
  Vue.prototype._c = function() { // createElement 创建元素型的节点
    let vm = this;
    return createElement(vm, ...arguments)
  }
  Vue.prototype._v = function(text) { // 创建文本的虚拟节点
    let vm = this;
    return createText(vm, text);
  }
  Vue.prototype._s = function(val) { // JSON.stringify()
    console.log('_s :>> ', val);
    if(isObject(val)) return JSON.stringify(val);
    return val;
  }
  Vue.prototype._render = function () {
    const vm = this;
    let { render } = vm.$options;
    let vnode = render.call(vm);
    return vnode;
  }
}