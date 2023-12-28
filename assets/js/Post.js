const html_post=document.querySelector(".post");
const html_postContent=html_post.querySelector(".post-content")

let Post = {
    linkClassName:"post-link",
    init:function(){
        this.renderPost();
        //포스트 링크를 클릭시 loadPost 메소드 실행
        document.addEventListener("click", function(event){if (event.target.classList.contains(this.linkClassName)) this.loadPost(event.target.dataset.url, true);}.bind(this));
        //페이지 이전, 이후로 갈때 loadPost 메소드 실행
        URL.addEvent(function(){this.loadPost(document.location, false);}.bind(this))
    },
    loadPost: function (url, historyPush=true) {
        if (url === document.location.pathname) return;

        fetch(url).then((response)=>response.text()).then(this.renderPost);
        if (historyPush) URL.set(url);
    },
    renderPost: function (text="") { 
        text.replace(/<!--post start-->(.*)<!--post end-->/s, function (match, p1) { html_postContent.innerHTML = p1; });
        document.title=document.querySelector(".post-info").dataset["title"];
        Post.renderHeader();
        Post.renderFooter();
    },
    fadeoutPost: function(){

    },
    renderHeader: function(){
        const html_postHeader=document.querySelector(".post-header");
        let postData=document.querySelector(".post-info").dataset;
        html_postHeader.innerHTML=`
            <div class="info">
                <div class="post-dir navbar-folder-opener">${postData["dir"]}</div>
                <div class="post-date">${postData["date"]}</div>
            </div>
            <h1 class="post-title">${postData["title"]}</h1>
            
            
            ${(function(){
                let hyperlinkList=html_postContent.querySelectorAll("h1");
                let html="";
                for(let i=0; i<hyperlinkList.length;i++){
                    hyperlinkList[i].id="hyper"+i;
                    html+=`<li><a href="#hyper${i}">${hyperlinkList[i].innerText}</a></li>`
                }
                if(html=="")return ""
                return `<ol class="post-hyperlink">${html}</ol>`;
            })()}`
    },
    renderFooter:function(){
        const html_postFooter=document.querySelector(".post-footer");
    }
}

Post.init();