class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
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
      this.cb.call(this.vm, this.value);
    }
  }
  get() {
    Dep.target = this;
    var value = this.vm.data[this.exp];
    Dep.target = null;
    return value;
  }
}
