## JDLoader_extend说明书

JDLoader_extend插件是对原JDLoader插件的一个功能扩展，使用ES6模块化开发，通过rollup工具编译打包。

目录结构

- src 文件夹存放插件源码
- dist 文件夹存放打包后的插件
- public 文件夹存放示例代码

node环境下执行：

- npm install — 下载依赖包
- npm run build — 编译打包
- npm run server — 开启后端服务

JDLoader_extend插件暴露出一个JDLoader_Ext变量，可通过该变量实例化各个类

### API说明：

#### FileLoader类

##### Methods

.load ( url : String, onLoad : Function, onError : Function , onFinaly : Function )

该方法是对Ajax的一个封装，用于获取文件资源。

- url（必传）— 要获取文件的路径
- onLoad — 加载成功的回调
- onError — 加载失败的回调
- onFinaly — 无论加载成功还是失败都会执行的回调，入参result为加载的结果

##### Example
```javascript
var loader = new JDLoader_Ext.FileLoader();

loader.load(
  // 资源路径
  'example.txt',
  // 加载成功回调
  function ( data ) {
    // output the text to the console
    console.log( data )
  },
  // 加载失败回调
  function ( err ) {
    console.error( 'An error happened' );
  }
  // 无论加载成功还是失败都会执行的回调，入参result为加载的结果
  function ( result) {
    console.log( result);
  },
);
```

#### JDLoader类

##### Methods
.load ( url : String, callback : Function )

内部调用FileLoader类的load方法获取文件并调用parse方法解析数据

- url（必传）— 要加载模型的路径
- callback — 加载完的回调

.parse ( jdata : String/Object, callback : Function, texturePath : String )

解析jd文件数据

- jdata（必传）— jd模型数据，可为字符串或者JSON.parse转换后的对象
- callback — 解析完的回调
- texturePath — 贴图路径

##### Example

```javascript
// 可直接加载并解析
var JDloader = new JDLoader_Ext.JDLoader();
JDloader.load('./JD/base.JD', function (data) {
  console.log(data);
});

// 或通过FileLoader类加载再调用parse方法解析
var loader = new JDLoader_Ext.FileLoader();
// 获取数据
loader.load('./JD/base.JD', function (e) {
  // 解析
new JDLoader_Ext.JDLoader().parse(e, function (data) {
    console.log(data);
  })
})
```


#### AnimLoader类

##### Methods
.load ( url : String, callback : Function )

内部调用FileLoader类的load方法获取文件并调用parse方法解析数据

- url（必传）— 要加载动画的路径
- callback — 加载完的回调

.parse ( jdata : String/Object, callback : Function )

解析jd动画数据，转换为THREE.AnimationClip对象

- jdata（必传）— jd动画数据，可为字符串或者JSON.parse转换后的对象
- callback — 解析完的回调

##### Example

```javascript
// 可直接加载并解析
var Animloader = new JDLoader_Ext.AnimLoader();
Animloader.load('./JD/anim_1.JD', function (animation) {
  console.log(animation);
})

// 或通过FileLoader类加载再调用parse方法解析
var loader = new JDLoader_Ext.FileLoader();
// 获取数据
loader.load('./JD/anim_1.JD', function (e) {
  // 解析
  new JDLoader_Ext.AnimLoader().parse(e, function (data) {
    console.log(data);
  })
})
```

#### LinearLoader类

##### Constructor

LinearLoader ( srcArray : Array, holdLinear : Boolean )

可以在实例化LinearLoader类的时候传入参数，也可以调用initSources方法初始化数据

- srcArray — 需加载的资源数组，数组元素可为字符串或对象
- holdLinear — 加载失败是否继续加载队列，默认为true

##### Properties

.Loader— 加载器，默认为FileLoader对象
.sources — 资源队列，为Queue对象
.holdLinear — 加载失败是否继续加载队列，默认为true
.isBlock — 队列是否断开
.handleSuccess— 加载成功的回调
.handleFail— 加载失败的回调
.AllCompleted — 是否全部加载完
.handleAllLoaded— 全部加载完的回调
.handleBlock— 加载失败发生队列阻塞的回调，只有holdLinear为true时有效

##### Methods
.initSources ( srcArray : Array, holdLinear : Boolean )

初始化队列，在执行start方法前有效

- srcArray — 需加载的资源数组，数组元素可为字符串或对象
- holdLinear — 加载失败是否继续加载队列，默认为true

.start
开始加载队列

.loadFront
加载队头资源

.appendSource ( source : String/Object )

- source — 资源，可为路径字符串或对象
source对象有以下属性
src — 资源路径（必传）
success — 该资源加载成功的回调，会覆盖默认的回调handleSuccess
error— 该资源加载失败的回调，会覆盖默认的回调handleFail

.success ( callback : Function )
设置加载成功默认回调handleSuccess

.error ( callback : Function )
设置加载失败默认回调handleFail

.allLoaded ( callback : Function )
设置全部加载完成默认回调handleAllLoaded

.block ( callback : Function )
设置加载失败发生队列阻塞默认回调handleBlock

##### Example

```javascript
// 可以在实例化LinearLoader类时初始化队列
var loader = new JDLoader_Ext.LinearLoader([
  './JD/base.JD',
  './JD/ceshi.JD',
  './JD/t5.JD',
  './JD/test.JD'
]);

// 或通过initSources方法初始化队列
var loader = new JDLoader_Ext.LinearLoader();
loader.initSources([
  './JD/base.JD',
  './JD/ceshi.JD',
  './JD/t5.JD',
  './JD/test.JD'
])

// 初始化队列时可传入对象代替URL字符串
loader.initSources([
  './JD/base.JD',
  {
    src: './JD/ceshi.J',
    success: function (data, source) {
      console.log(data)
}，
error: function (error, source) {
  console.log(source.src + '加载失败');
}
  },
  './JD/t5.JD',
  './JD/test.JD'
])

// 设置加载成功的回调
loader.success(function (data, source) {
  new JDLoader_Ext.JDLoader().parse(data, function (e) {
    
  })
})
// 设置全部加载完的回调
loader.allLoaded(function () {
  console.log('全部加载完成');
});
// 开始加载队列
loader.start();
```