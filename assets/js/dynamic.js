const html_post=document.querySelector(".post");

/*

*/
let Dynamic = {
    xmlHttp: new XMLHttpRequest(),
    init: function () {
        this.createHyperlink();
        this.createPostNav();
        this.xmlHttp.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == this.DONE) Dynamic.setPost(this.responseText);
        }
        //특정 클래스를 포함한 엘레멘트를 클릭시 loadPost 메소드 실행
        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("dynamic-post")) {
                Dynamic.loadPost(event.target.dataset.url, true);
            }
        })
        //페이지 이전 혹은 이후로 갈때 loadPost 메소드 실행
        window.addEventListener("popstate",function(){Dynamic.loadPost(document.location, false);})
    },
    //포스트를 서버에 요청
    loadPost: function (url, historyPush = true) {
        if (url === document.location.pathname) return;
        this.xmlHttp.open("GET", url, true);
        this.xmlHttp.send();
        if (historyPush) history.pushState(null, null, url);
    },
    //포스트 로드가 완료되면 실행되는 함수
    setPost: function (text) { 
        text.replace(/<!--post start-->(.*)<!--post end-->/s, function (match, p1) { html_post.innerHTML = p1; });
        this.createHyperlink();
        this.createPostNav();
    },
    createHyperlink: function(){
        const html_postContent=html_post.querySelector(".post-content");
        const html_postHyperlink=html_post.querySelector(".post-hyperlink");
        let linkList=html_postContent.querySelectorAll("h1");
        for(let i=0; i<linkList.length;i++){
            linkList[i].id="hyper"+i;
            html_postHyperlink.innerHTML+=`<li><a href="#hyper${i}">${linkList[i].innerText}</a></li>`
        }
    },
    createPostNav:function(){
        const html_postDir=html_post.querySelector(".post-dir");
        const post_category=html_postDir.dataset["category"];
        const html_navCategory=html_navNavbarWrapper.querySelector(`[data-category=${post_category}]`);
        if(html_navCategory!==null){
            for(let category=html_navCategory.parentElement; category.dataset["foldername"]!=undefined; category=category.parentElement){
                html_postDir.innerText=category.dataset["foldername"]+">"+html_postDir.innerText;
                console.log("Asdfdsf");
            }
        }
    }
}

Dynamic.init();