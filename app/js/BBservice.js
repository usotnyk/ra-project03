export default class BBService {
  
  constructor(url) {
    this.url = url;
  }

  loadData(onSuccess, onError) {
    var serviceChannel = new XMLHttpRequest();
    
    serviceChannel.addEventListener("readystatechange", e => {
      var target = e.target;
      var readyState = target.readyState;
      var httpStatus = target.status;

      if (e.target.readyState == 4) {
        this.processData(e, onSuccess, onError);
      }
    }, false);

    serviceChannel.open("GET", this.url,true);
    serviceChannel.send();
  }

  processData(e, onSuccess, onError) {
    if (e.target.status == 200) {
      onSuccess(this.getDataFrom(e));
    } else {
      onError();
    }
  }

  getDataFrom(e) {
    var target = e.target;
    var theData = target.responseText;
    return JSON.parse(theData);
  }
}
