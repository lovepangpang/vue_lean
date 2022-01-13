import Watcher from "./observe/watcher";
import { patch } from "./vdom/patch";

export function mountComponent(vm) {
  // vm.$option.
  // vm._render();
  let updateComponent = () => {
    vm._update(vm._render());
  }
  // updateComponent();

  new Watcher(vm, updateComponent, ()=>{
    console.log('后续增添更新钩子函数 update')
  }, true);
}

export function lifeCycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = patch(vm.$el, vnode)
  }
}