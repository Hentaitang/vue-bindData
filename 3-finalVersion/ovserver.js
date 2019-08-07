function observe(data) {
  if (!data || typeof data !== 'object') return;
  Object.keys(data).forEach(k => {
    defineReactive(data, k, data[k]);
  });
}

function defineReactive(obj, key, val) {
  observe(val);
  var dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: function(newValue) {
      if (val === newValue) return;
      val = newValue;
      dep.notify();
    }
  });
}

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
