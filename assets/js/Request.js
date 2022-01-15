class Request{
    xmlHttp;
    onload;
    constructor(onload=function(){}){
        this.xmlHttp=new XMLHttpRequest();
        this.onload=onload;
        let temp=this;
        this.xmlHttp.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == this.DONE) temp.onload(this.responseText);
        }
    }
    load(url){
        this.xmlHttp.open("GET", url, true);
        this.xmlHttp.send();
    }
}
