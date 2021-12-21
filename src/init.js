import { initState } from './state.js';
import { compileToFunction } from './compiler';

export function initMixin(Vue){
  Vue.prototype._init = function(options){
    // console.log(this);
    // console.log(options);
    const vm = this;
    // 把用户的选项放到vm上，这样在其他方法中都可以获取到options
    vm.$options = options;

    // 状态初始化， props、data、watch
    // initState(vm);
    initState(vm);

    if(vm.$options.el) {
      // console.log('页面挂载！');
      // 数据已被劫持，数据变化需要更新视图，diff算法更新需要更新的部分
      // template -> ast(Abstract Syntax Tree)语法树（用来描述语法，描述语法本身）-> 描述成一个树结构 -> 将代码重组成js语法
      // 模板编译原理（把template模板编译成render函数 -> 虚拟DOM -> diff算法比对虚拟DOM）

      // ast -> render返回 -> vnode -> 生成真实dom
      //   更新的时候再次调用render -> 新的vnode -> 新旧对比 -> 更新真实dom
      vm.$mount(vm.$options.el);
    }
  }
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const opts = vm.$options;
    el = document.querySelector(el);
    vm.$el = el;
    
    if(!opts.render) {
      // 模板编译
      let template = opts.template;
      let render = compileToFunction(template ? template : el.outerHTML);
      opts.render = render;
    }
  }
}