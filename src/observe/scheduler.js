import { nextTick } from "../utils";

let queue = []; // 存放要更新的watcher
let has = {};  // 用来存储已有的watcher的id
let pending = false;

function flushSchedulerQueue() {
  queue.forEach(fn => fn.run())
  queue = [];
  has = {};
  pending = false;
}
export function queueWatcher (watcher) {
  let id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);
    if(!pending) {
      nextTick(flushSchedulerQueue);
      pending = true;
    }
  }
};