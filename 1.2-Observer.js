/*
 * 思路分析中，需要创建一个可以容纳订阅者的消息订阅器Dep
 * 订阅器Dep主要负责收集订阅者，然后在属性变化的时候执行对应订阅者的更新函数。
 * 所以显然订阅器需要有一个容器，这个容器就是list。
 */

function defineReactive(obj, key, val) {
  observe(val);
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if (是否需要添加订阅者) {
        // 添加订阅者
        dep.addSub(watcher);
      }
      console.log('我拿这个值一下');
      return val;
    },
    set: function(newVal) {
      if (newVal === val) return;
      val = newVal;
      console.log('我重新设置了值');
      // 如果数据变化就通知所有订阅者
      dep.notify();
    }
  });
}

// 消息订阅器Dep
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}

// 数据监听器
function observe(data) {
  if (!data || typeof data !== 'object') return;
  Object.keys(data).forEach(k => {
    defineReactive(data, k, data[k]);
  });
}
