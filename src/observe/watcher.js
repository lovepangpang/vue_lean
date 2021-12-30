import Dep from "./dep";

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
    debugger;
    this.getter();
    Dep.target = null;
  }
  update(){
    this.get();
  }

}
export default Watcher;