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
    renderHeader: function(){
        const html_postHeader=document.querySelector(".post-header");
        const html_postInfo=document.querySelector(".post-info");
        html_postHeader.innerHTML=`
            <div class="post-dir navbar-folder-opener" data-category="${html_postInfo.dataset["dir"].split(">").pop()}">${html_postInfo.dataset["dir"]}</div>
            <h1 class="post-title">${html_postInfo.dataset["title"]}</h1>
            <div class="post-date">${html_postInfo.dataset["date"]}</div>
            <ol class="post-hyperlink"><p style="font-weight: bold;font-size:17px;">목차</p>
            ${(function(){
                let hyperlinkList=html_postContent.querySelectorAll("h1");
                let html="";
                for(let i=0; i<hyperlinkList.length;i++){
                    hyperlinkList[i].id="hyper"+i;
                    html+=`<li><a href="#hyper${i}">${hyperlinkList[i].innerText}</a></li>`
                }
                return html;
            })()}
            </ol>`;
    },
    renderFooter:function(){
        const html_postFooter=document.querySelector(".post-footer");
    }
}

Post.init();