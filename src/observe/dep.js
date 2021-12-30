let id = 0;
class Dep {
  constructor(){
    this.subs = [];
    this.id = id++;
  }
  depend() {
    Dep.target.addDep(this);
  }
  addSub(watcher){
    this.subs.push(watcher);
  }
  notify(watcher) {
    this.subs.forEach(watcher => watcher.update());
  }
}

Dep.target = null;

export default Dep;