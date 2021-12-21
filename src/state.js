import { isFun } from './utils.js';
import { observe } from './observe';

export function initState(vm) {
  const opts = vm.$options;

  if(opts.data) {
    initData(vm);
  }

}

// 做个代理
function proxy(vm, key, source) {
  Object.defineProperty(vm, key, {
    get() {
      console.log('proxy取值');
      return vm[source][key];
    },
    set(newVal) {
      console.log('proxy赋值');
      vm[source][key] = newVal;
    }
  })
}

function initData(vm) {
  let data;
  data = isFun(vm.$options.data) ? vm.$options.data() : vm.$options.data;
  vm._data = data;

  // 需要将data变成响应式， 重写data中所有的属性
  // Object.defineProperty
  observe(data);

  // vm.message => vm._data.message
  for (const key in data) {
    proxy(vm, key, '_data')
  }

  console.log('数据的初始化操作！');

}