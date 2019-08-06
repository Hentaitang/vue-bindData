function defineReactive(obj, key, val) {
  observe(val);
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      // 判断是否需要添加订阅者
      if (Dep.target) {
        // 添加订阅者
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: function(newVal) {
      if (val === newVal) return;
      val = newVal;
      // 如果数据变化就通知所有订阅者
      dep.notify();
    }
  });
}

// 数据监听器
function observe(data) {
  if (!data || typeof data !== 'object') return;
  Object.keys(data).forEach(k => {
    defineReactive(data, k, data[k]);
  });
}

// 消息订阅器
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach(sub => sub.update());
  }
}
