let Unils = {
  gettype: Object.prototype.toString,
  isObject: function(o) {
    return this.gettype.call(o) == "[object Object]";
  },
  isArray: function(o) {
    return this.gettype.call(o) == "[object Array]";
  },
  isString: function(o) {
    return this.gettype.call(o) == "[object String]";
  },
  isBoolean: function(o) {
    return this.gettype.call(o) == "[object Boolean]";
  },
  isFunction: function(o) {
    return this.gettype.call(o) == "[object Function]";
  },
  isNumber: function(o) {
    return this.gettype.call(o) == "[object Number]";
  },
  isUndefined: function(o) {
    return this.gettype.call(o) == "[object Undefined]";
  },
  isNULL: function(o) {
    return this.gettype.call(o) == "[object Null]";
  },
  extractUrlBase: function ( url ) {
    var index = url.lastIndexOf( '/' );
    if ( index === - 1 ) return './';
    return url.substr( 0, index + 1 );
  }
}

Unils.Queue = function Queue() {
  let items = [];
  this.enqueue = function(element){
    items.push(element);
  };
  this.dequeue = function(){
    return items.shift();
  };
  this.front = function(){
    return items[0];
  };
  this.isEmpty = function(){
    return items.length == 0;
  };
  this.clear = function(){
    items = [];
  };
  this.size = function(){
    return items.length;
  };
  this.print = function(){
    console.log(items);
  };
}

export { Unils }
