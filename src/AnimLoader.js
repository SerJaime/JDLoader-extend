import { Unils } from './unils.js';
import { FileLoader } from './FileLoader.js';

class AnimLoader {
  constructor() {

  }

  load (url, cb) {
    let loader = new FileLoader();
    loader.load(url, (data) => {
      this.parse(JSON.parse(data), cb)
    })
  }

  parse (data, cb) {
    let animData = data;
    if (!Unils.isObject(data)) {
      animData = JSON.parse(data);
    }

    let tracks = [];
    animData.animNodes.forEach((item) => {
      tracks.push(new THREE.VectorKeyframeTrack(item.nodeName + '.position', item.pos.times, item.pos.values));
      tracks.push(new THREE.VectorKeyframeTrack(item.nodeName + '.scale', item.scl.times, item.scl.values));
      tracks.push(new THREE.QuaternionKeyframeTrack(item.nodeName + '.quaternion', item.rot.times, item.rot.values));
    });
    let animationClip = new THREE.AnimationClip(animData.name, animData.length, tracks);
    cb && cb(animationClip);
  }
}

export { AnimLoader }
