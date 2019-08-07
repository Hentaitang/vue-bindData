class MyVue {
  constructor(option) {
    this.el = option.el;
    this.data = option.data;
    this.methods = option.methods;
    this.vm = this;
    Object.keys(this.data).forEach(key => {
      this.proxyKey(key);
    });
    observe(this.data);
    new Compile(this.el, this.vm);
    option.created && option.created.call(this);
    option.mounted && option.mounted.call(this);
  }
  proxyKey(key) {
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
