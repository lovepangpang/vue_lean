import { isObject, isArray } from "../utils";
import { arrayMethods } from "./array";
import Dep from "./dep";

class Observer {
  constructor(value){
    // 为了拿到此类型中定义的方法, 可标识被监测过
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false
    })
    if(isArray(value)) {
      value.__proto__ = arrayMethods; // 重写数组方法

      this.observeArray(value);

    } else {
      this.walk(value);
    }
  }
  walk(data){
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key]);
    })
  }
  // 递归遍历数组，对数组内部的对象再次重写
  observeArray(data) {
    data.forEach(item => {
      observe(item);
    })
  }
}

function defineReactive(obj, key, value) {
  // 递归处理
  observe(value);

  let dep = new Dep(); // 为每个属性都增加个dep
  console.log('dep :>> ', dep);

  // 闭包，不能被释放
  // console.log(obj, key, value)
  Object.defineProperty(obj, key, {
    get(){
      debugger;
      if(Dep.target) {
        dep.depend();
      }
      console.log(dep, key);
      // console.log('递归get', key, value);
      return value;
    },
    set(newValue){
      // console.log('递归set', key, newValue);
      // 如果设置的是一个对象，那么会再次进行劫持
      observe(newValue);
      value = newValue;
      dep.notify();
    }
  })
}

export function observe (data){
  // 判断data是否是对象
  if(!isObject(data)) {
    return;
  }
  // 需要对对象进行观测（最外层必须是一个{}）
  if(data.__ob__) { // 判断已经被监测
    return;
  }

  // 如果一个数据已经被观测过了，就不要再进行观测了

  return new Observer(data);
}