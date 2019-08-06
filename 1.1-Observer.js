// 数据监听器

function defineReactive(obj, key, val) {
  // 递归循环遍历所有子属性
  observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('我拿这个值一下');
      return val;
    },
    set: function(value) {
      val = `我重新设置了你 ${value}`;
      console.log('我重新设置了值');
    }
  });
}

function observe(data) {
  if (!data || typeof data !== 'object') return;
  Object.keys(data).forEach(k => {
    defineReactive(data, k, data[k]);
  });
}

var a = {
  book1: '大飞机',
  book2: '小飞机'
};
observe(a);
a.book1;

a.book1 = '大苹果';
a.book2 = '大栗子';
