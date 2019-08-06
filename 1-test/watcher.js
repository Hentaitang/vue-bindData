// 订阅者
class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    // 将自己添加到订阅器的操作
    this.value = this.get();
  }
  update() {
    this.run();
  }
  run() {
    var value = this.vm.data[this.exp];
    var oldValue = this.value;
    if (value !== oldValue) {
      this.value = value;
      this.cb.call(this.vm, value);
    }
  }
  get() {
    // 缓存自己
    Dep.target = this;
    // 强行执行监听器里的get函数
    var value = this.vm.data[this.exp];
    Dep.target = null;
    return value;
  }
}
