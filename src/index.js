import { initMixin } from "./init.js";
import { lifeCycleMixin } from "./lifecycle.js";
import { renderMinxin } from "./render.js";

function Vue(options){
  this._init(options);
}

initMixin(Vue);

renderMinxin(Vue);

lifeCycleMixin(Vue);


export default Vue;


// ------------------初渲染-------------------------
// 1.new Vue会调用_init方法进行初始化操作
// 2.会将用户的选项放到vm.$options上
// 3.会对当前属性上搜索有没有data数据 initState
// 4.有data 判断data是函数还是对象，如果是函数，取函数的返回值
// 5.observe 观测data中的数据
// 6.为了在vm上取到data的数据，把data赋值给vm._data, 
// 7.给vm代理到vm._data，使用方便
// 
// 8.如果更新对象不存在的属性，会导致视图不更新（如果是数组更新索引和长度，不会触发更新）
// 9.如果是替换成一个新对象，新对象会被进行劫持，如果是数组存放新内容 push unshift splice 新增的内容也会被劫持
// 通过__ob__标识是否被劫持

// 10.判断用户是否传入el属性，内部会调用$mount方法，此方法也可以用户自己调用
// 11.对模板的优先级处理 render / template/ outerHTML
// 12.将模板编译成函数 parserHTML 解析模板-> ast 语法树, 生成code -> render 函数
// 13.通过render方法， 生成虚拟dom+真实的数据 
// 14.真实DOM

// --------------------更新流程--------------------------------------
// 只有根组件的情况， 每个属性都有一个dep
// 1.vue里面用到了观察者模式，默认组件渲染的时候，会创建一个watcher
// 2.当渲染视图的时候，会取data中的数据，会走每个属性的get方法， 就让这个属性的dep记录watcher
// 3.同时让watcher也记录deo， dep和watcher是多对多的关系
// 4.如果数据发生变化，会通知对应属性的dep，一次通知存放的watcher更新