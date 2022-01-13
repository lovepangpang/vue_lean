import { isObject, isArray } from "../utils";
import { arrayMethods } from "./array";
import Dep from "./dep";

class Observer {
  constructor(value){
    this.dep = new Dep();
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
function dependArray(value) {
  for(let i = 0; i < value.length; i++) {
    let current = value[i];
    current.__ob__ && current.__ob__.dep.depend();
    if(Array.isArray(current)) {
      dependArray(current)
    }
  }
}

function defineReactive(obj, key, value) {
  // 递归处理
  let childOb = observe(value);
  // childOb 如果有值 name就是数组或者对象

  let dep = new Dep(); // 为每个属性都增加个dep
  // console.log('dep :>> ', dep);

  // 闭包，不能被释放
  // console.log(obj, key, value)
  Object.defineProperty(obj, key, {
    get(){
      if(Dep.target) {
        dep.depend();
        if (childOb) { // 取属性的时候 会对对应的值（对象本身和数组） 进行依赖收集
          childOb.dep.depend(); // 让数组和对象也记住当前的watcher
          if(Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      // console.log(dep, key);
      // console.log('递归get', key, value);
      return value;
    },
    set(newValue){
      // console.log('递归set', key, newValue);
      // 如果设置的是一个对象，那么会再次进行劫持
      if(newValue === value) return
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

// 1.默认vue在初始化的时候，会对对象的每一个属性都进行劫持，增加dep属性，当取值的时候会做依赖收集
// 2.默认还会对属性值是（对象和数组的本身进行增加dep属性）进行依赖收集
// 3.如果属性变化 触发属性对应的dep去更新
// 4.如果是数组更新，触发数组本身的dep进行更新
// 5.如果取值的时候是数组，还要让数组中对象类型进行依赖收集（递归依赖收集）
// 6.如果数组里面放对象，默认对象里的属性是会进行依赖收集的，因为在取值时，会进行JSON.stringify