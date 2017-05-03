export default class BBService {
  
  constructor(url) {
    this.url = url;
    console.log("bbservice constructor");
  }

  loadData(onSuccess, onError) {
    var serviceChannel = new XMLHttpRequest();
    
    serviceChannel.addEventListener("readystatechange", e => {
      var target = e.target;
      var readyState = target.readyState;
      var httpStatus = target.status;
      
      console.log("readyState is " + readyState);
      console.log("httpStatus is " + httpStatus);

      if (e.target.readyState == 4) {
        console.log("processing results");
        this.processData(e, onSuccess, onError);
      }
    }, false);

    serviceChannel.open("GET", this.url,true);
    serviceChannel.send();
  }

  processData(e, onSuccess, onError) {
    console.log(e);
    console.log("e.target.status is " + e.target.status);

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
