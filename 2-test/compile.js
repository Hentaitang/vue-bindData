class Compile {
  constructor(el, vm) {
    this.el = document.querySelector(el);
    this.vm = vm;
    this.fragment = null;
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      console.log('DOM元素不存在');
    }
  }
  nodeToFragment(el) {
    // 创建空白文档片段
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
      // 将DOM元素移入fragment
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  }
  compileElement(el) {
    // 拿到所有子DOM节点元素（伪数组）
    var children = el.childNodes;
    [].slice.call(children).forEach(n => {
      // 正则匹配{{xxx}}
      var reg = /\{\{\s*(.*?)\s*\}\}/;
      var text = n.textContent;
      if (this.isTextNode(n) && reg.test(text)) {
        console.log('reg.exec(text):' + reg.exec(text));
        this.compileText(n, reg.exec(text)[1]);
      }

      if (n.childNodes && n.childNodes.length) {
        // 节点中存在子节点，继续递归遍历
        this.compileElement(n);
      }
    });
  }
  // 判断是否为文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  compileText(node, exp) {
    var initText = this.vm[exp];
    // 将初始化数据初始化到视图中
    this.updateText(node, initText);
    // 生成订阅器并绑定更新函数
    new Watcher(this.vm, exp, value => {
      this.updateText(node, value);
    });
  }
  updateText(node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  }
}
