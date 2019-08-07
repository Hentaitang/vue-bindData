// function MyVue(data, el, exp) {
//   this.data = data;
//   // 给属性转化getter和setter
//   observe(data);
//   // 初始化模板数据的值
//   el.innerHTML = this.data[exp];
//   new Watcher(this, exp, function(value) {
//     el.innerHTML = value;
//   });
//   return this;
// }

class MyVue {
  constructor(options) {
    this.vm = this;
    this.data = options.data;
    this.el = options.el;
    Object.keys(this.data).forEach(key => {
      this.proxyKeys(key);
    });

    observe(this.data);
    new Compile(this.el, this.vm);
  }
  proxyKeys(key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get() {
        return this.data[key];
      },
      set(newValue) {
        this.data[key] = newValue;
      }
    });
  }
}
