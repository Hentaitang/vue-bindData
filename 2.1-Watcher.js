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
      this.cb.call(this.vm, value, oldValue);
    }
  }
  get() {
    Dep.target = this; // 缓存自己
    var value = this.vm.data[this.exp]; // 强制执行监听器里的get函数
    Dep.target = null; // 释放自己
    return value;
  }
}

function defineReactive(obj, key, val) {
  observe(val);
  var dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      // 判断是否需要添加订阅者
      if (dep.target) {
        dep.addSub(dep.target);
      }
      return val;
    },
    set: function(newVal) {
      if (val === newVal) return;
      val = newVal;
      console.log('我重新设置了值');
      dep.notify();
    }
  });
}
