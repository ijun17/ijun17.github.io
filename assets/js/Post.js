const html_post=document.querySelector(".post");

let Post = {
    linkClassName:"post-link",
    postRequest:null,
    init:function(){
        this.renderPost();
        this.postRequest=new Request(this.renderPost);
        //포스트 링크를 클릭시 loadPost 메소드 실행
        document.addEventListener("click", function(event){if (event.target.classList.contains(this.linkClassName)) this.loadPost(event.target.dataset.url, true);}.bind(this));
        //페이지 이전, 이후로 갈때 loadPost 메소드 실행
        window.addEventListener("popstate",function(){this.loadPost(document.location, false);}.bind(this))
    },
    loadPost: function (url, historyPush=true) {
        if (url === document.location.pathname) return;
        this.postRequest.load(url);
        if (historyPush) history.pushState(null, null, url);
    },
    renderPost: function (text="") { 
        text.replace(/<!--post start-->(.*)<!--post end-->/s, function (match, p1) { html_post.innerHTML = p1; });
        document.title=html_post.querySelector(".post-title").innerText;

        //하이퍼 링크 생성
        const html_postHyperlink=html_post.querySelector(".post-hyperlink");
        let hyperlinkList=html_post.querySelector(".post-content").querySelectorAll("h1");
        for(let i=0; i<hyperlinkList.length;i++){
            hyperlinkList[i].id="hyper"+i;
            html_postHyperlink.innerHTML+=`<li><a href="#hyper${i}">${hyperlinkList[i].innerText}</a></li>`
        }
    }
}

Post.init();