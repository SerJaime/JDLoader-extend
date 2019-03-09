class FileLoader {
  constructor() {

  }

  load (url, onLoad, onError, onFinaly) {
    if (url === undefined) throw new Error('"url" is required!')

    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.addEventListener('load', function (event) {
      let response = this.response;
      if ( this.status === 200 || this.status === 0 ) {
        if ( this.status === 0 ) console.warn( 'FileLoader: HTTP Status 0 received.' );
        onLoad && onLoad(response);
        onFinaly && onFinaly({
          success: true
        });
      } else {
        onError && onError(event);
        onFinaly && onFinaly({
          success: false
        });
      }
    }, false)

    request.addEventListener( 'error', function (event) {
      onError && onError(event);
      onFinaly && onFinaly({
        success: false
      });
    }, false );

    request.open('GET', url, true);
    request.send();
  }
}

export { FileLoader }
