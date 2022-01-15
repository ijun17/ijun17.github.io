const html_post=document.querySelector(".post");

class Request{
    xmlHttp;
    onLoad;
    constructor(f=function(){}){
        this.xmlHttp=new XMLHttpRequest();
        this.onLoad=f;
        let temp=this;
        this.xmlHttp.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == this.DONE) temp.onLoad(this.responseText);
        }
    }
    load(url){
        this.xmlHttp.open("GET", url, true);
        this.xmlHttp.send();
    }
}

let Post = {
    linkClassName:"dynamic-link",
    postRequest:null,
    init:function(){
        this.renderPost();
        this.postRequest=new Request(this.renderPost);
        //특정 클래스를 포함한 엘레멘트를 클릭시 loadPost 메소드 실행
        document.addEventListener("click", function(event){if (event.target.classList.contains(this.linkClassName)) this.loadPost(event.target.dataset.url, true);}.bind(this));
        //페이지 이전 혹은 이후로 갈때 loadPost 메소드 실행
        window.addEventListener("popstate",function(){this.loadPost(document.location, false);})
    },
    loadPost: function (url, historyPush=true) {
        if (url === document.location.pathname) return;
        this.postRequest.load(url);
        if (historyPush) history.pushState(null, null, url);
    },
    renderPost: function (text="") { 
        text.replace(/<!--post start-->(.*)<!--post end-->/s, function (match, p1) { html_post.innerHTML = p1; });
        document.title=html_post.querySelector(".post-title").innerText;

        //create hyperlink
        const html_postHyperlink=html_post.querySelector(".post-hyperlink");
        let linkList=html_post.querySelector(".post-content").querySelectorAll("h1");
        for(let i=0; i<linkList.length;i++){
            linkList[i].id="hyper"+i;
            html_postHyperlink.innerHTML+=`<li><a href="#hyper${i}">${linkList[i].innerText}</a></li>`
        }
    }
}

Post.init();