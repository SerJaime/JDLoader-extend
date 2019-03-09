import { Unils } from './unils.js';
import { FileLoader } from './FileLoader.js';

class LinearLoader {
  constructor(srcArray, holdLinear) {
    this.Loader = new FileLoader();
    this.sources = new Unils.Queue();
    this.holdLinear = true; // 加载失败是否继续加载队列
    this.isBlock = false; // 队列是否断开
    this.handleSuccess = (data, frontSource) => { // 加载成功的回调
      console.log(frontSource.src + '加载成功');
    };
    this.handleFail = (error, frontSource) => { // 加载失败的回调
      console.log(frontSource.src + '加载失败');
      console.log(error);
    };
    this.AllCompleted = false; // 是否全部加载完
    this.handleAllLoaded = () => {
      console.log('全部加载完成');
    };
    this.handleBlock = () => { // 加载失败发生队列阻塞的回调，只有holdLinear为true时有效
      console.log('加载失败发生队列阻塞');
    };
    if (srcArray) this.initSources(srcArray);
    if (holdLinear !== undefined && !Unils.isNULL(holdLinear)) this.holdLinear = holdLinear;
  }

  // 初始化资源队列
  initSources (srcArray, holdLinear) {
    if (!Unils.isArray(srcArray)) {
      throw new Error('The param "srcArray" must be Array');
      return false;
    }
    srcArray.forEach((item) => {
      console.log(item);
      this.appendSource(item);
    })

    if (holdLinear !== undefined && !Unils.isNULL(holdLinear)) this.holdLinear = holdLinear;
  }
  // 开始加载
  start () {
    if (!this.sources.isEmpty()) {
      console.log('开始加载队列...');
      this.loadFront();
    } else {
      console.log('队列为空');
    }
  }
  // 加载队头资源
  loadFront () {
    let frontSource = this.sources.front()
    console.log('开始加载' + frontSource.src);
    this.Loader.load(
      frontSource.src,
      (data) => {
        frontSource.handleSuccess ? frontSource.handleSuccess(data, frontSource) : this.handleSuccess(data, frontSource)
      },
      (error) => {
        frontSource.handleFail ? frontSource.handleFail(error, frontSource) : this.handleFail(error, frontSource)
        if (!this.holdLinear) {
          this.isBlock = true;
          this.handleBlock && this.handleBlock(frontSource);
        }
      },
      (result) => { // 无论成功还是失败都会执行
        // console.log(result)
        this.sources.dequeue();
        if (this.isBlock) return false;
        if (!this.sources.isEmpty()) {
          this.loadFront();
        } else {
          this.AllCompleted = true;
          this.handleAllLoaded && this.handleAllLoaded();
        }
      }
    );
  }
  // 添加资源
  appendSource (param) {
    let source = {
      index: this.sources.size() + 1
    }
    if (Unils.isString(param)) {
      source.src = param;
    } else if (Unils.isObject(param)) {
      if (!param.src) {
        console.error('"src" is required');
        return false;
      }
      source.src = param.src;
      if (param.success) source.handleSuccess = param.success;
      if (param.error) source.handleFail = param.error;
    }
    console.log(source);
    this.sources.enqueue(source)
  }
  // 添加加载成功的回调
  success (cb) {
    if (cb && Unils.isFunction(cb)) this.handleSuccess = cb;
  }
  // 添加加载失败的回调
  error (cb) {
    if (cb && Unils.isFunction(cb)) this.handleFail = cb;
  }
  // 添加全部加载完成的回调
  allLoaded (cb) {
    if (cb && Unils.isFunction(cb)) this.handleAllLoaded = cb;
  }
  // 添加加载失败发生队列阻塞的回调
  block (cb) {
    if (cb && Unils.isFunction(cb)) this.handleBlock = cb;
  }
}

export { LinearLoader }
