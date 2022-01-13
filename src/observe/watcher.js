import Dep from "./dep";
import { queueWatcher } from './scheduler';

let id = 0;
class Watcher {
  constructor(vm, fn, cb, options){
    this.vm = vm;
    this.fn = fn;
    this.cb = cb;
    this.options = options;
    this.depsId = new Set();
    this.id = id++;
    this.deps = [];
    this.getter = fn;
    this.get();
  }
  addDep(dep){
    let did = dep.id;
    if(!this.depsId.has(id)){
      this.depsId.add(id);
      this.deps.push(dep);

      dep.addSub(this);
    }
  }
  get(){
    Dep.target = this;
    this.getter();
    Dep.target = null;
  }
  update(){
    // 每次更新数据都会同步调用这个update方法，我可以将更新的逻辑环迅起来，等同步更新数据的逻辑执行完毕后，依次调用
    queueWatcher(this);
    // 可以做异步更新，
    // this.get();
    console.log('缓存更新 :>> ', '缓存更新');
  }
  run() {
    console.log('真正更新！');
    this.get();
  }

}
export default Watcher;