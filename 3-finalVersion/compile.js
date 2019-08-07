class Compile {
  constructor(el, vm) {
    this.el = document.querySelector(el);
    this.vm = vm;
    this.fragment = null;
    if (this.el) {
      this.fragment = this.noteToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      console.log('DOM元素不存在');
    }
  }
  noteToFragment(el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  }
  compileElement(el) {
    var children = el.childNodes;
    Array.prototype.slice.call(children).forEach(n => {
      var reg = /\{\{\s*(.*?)\s*\}\}/;
      var text = n.textContent;
      if (this.isElementNode(n)) {
        this.compile(n);
      } else if (this.isTextNode(n) && reg.test(text)) {
        this.compileText(n, reg.exec(text)[1]);
      }

      if (n.childNodes && n.childNodes.length) {
        this.compileElement(n);
      }
    });
  }
  compile(node) {
    var nodeAttrs = node.attributes;
    Array.prototype.forEach.call(nodeAttrs, attr => {
      var attrName = attr.name;
      if (this.isDirective(attrName)) {
        var val = attr.value;
        var dir = attrName.substring(2);
        if (this.isEventDirective(dir)) {
          // 事件指令
          this.compileEvent(node, this.vm, val, dir);
        } else {
          // v-model指令
          this.compileModel(node, this.vm, val, dir);
        }
        node.removeAttribute(attrName);
      }
    });
  }
  compileText(node, exp) {
    var initText = this.vm[exp];
    this.updateText(node, initText);
    new Watcher(this.vm, exp, value => {
      this.updateText(node, value);
    });
  }
  compileModel(node, vm, exp, dir) {
    var value = vm[exp];
    this.modelUpdater(node, value);
    new Watcher(vm, exp, val => {
      this.modelUpdater(node, val);
    });

    node.addEventListener('input', e => {
      var newValue = e.target.value;
      if (value === newValue) return;
      vm[exp] = newValue;
      value = newValue;
    });
  }
  compileEvent(node, vm, exp, dir) {
    var eventType = dir.split(':')[1];
    var cb = vm.methods && vm.methods[exp];

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm));
    }
  }
  isDirective(name) {
    return name.indexOf('v-') === 0;
  }
  isEventDirective(dir) {
    return dir.indexOf('on:') === 0;
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  isTextNode(node) {
    return node.nodeType === 3;
  }
  updateText(node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  }
  modelUpdater(node, value) {
    node.value = typeof value === 'undefined' ? '' : value;
  }
}
