function MyVue(data, el, exp) {
  this.data = data;
  // 给属性转化getter和setter
  observe(data);
  // 初始化模板数据的值
  el.innerHTML = this.data[exp];
  new Watcher(this, exp, function(value) {
    el.innerHTML = value;
  });
  return this;
}
