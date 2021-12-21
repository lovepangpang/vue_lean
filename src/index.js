import { initMixin } from "./init.js";

function Vue(options){
  this._init(options);
}

initMixin(Vue)


export default Vue;


// 1.new Vue会调用_init方法进行初始化操作
// 2.会将用户的选项放到vm.$options上
// 3.会对当前属性上搜索有没有data数据 initState
// 4.有data 判断data是函数还是对象，如果是函数，取函数的返回值
// 5.observe 观测data中的数据
// 6.为了在vm上取到data的数据，把data赋值给vm._data, 
// 7.给vm代理到vm._data，使用方便
// 
// 8.如果更新对象不存在的属性，回导致视图不更新（吐过是数组更新索引和长度，不会触发更新）
// 9.如果是替换成一个新对象，新对象会被进行劫持，如果是数组存放新内容 push unshift splice 新增的内容也会被劫持
// 通过__ob__标识是否被劫持