let oldArrayPrototype = Array.prototype;

export let arrayMethods = Object.create(oldArrayPrototype);

// 只有这个7个方法 可以导致数组变化
let methods = [
  'push',
  'shift',
  'pop',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

methods.forEach( method => {
  arrayMethods[method] = function(...args) {
    console.log('数组的方法进行重写操作!');
    // 数组原有方法
    oldArrayPrototype[method].call(this, ...args);

    let inserted = [];
    let ob = this.__ob__;
    // 判断是增加
    switch(method) {
      case 'splice':
        inserted = args.slice(2);
        break;
      case 'push':
      case 'unshift':
        inserted = args;
        break;
    }
    if (inserted.length) {
      ob.observeArray(inserted);
      ob.dep.notify(); // 触发页面更新流程
    }
  }
})

