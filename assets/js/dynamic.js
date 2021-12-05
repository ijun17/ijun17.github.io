const html_post=document.querySelector(".post");

let xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == this.DONE) setPost(this.responseText);
};

//포스트를 서버에 요청
function loadPost(url, historyPush=true){
    if (url === document.location.pathname) return;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    if(historyPush)history.pushState(null, null, url);
}

//포스트 로드가 완료되면 실행되는 함수
function setPost(text){
    text.replace(/<!--post start-->(.*)<!--post end-->/s,function(match,p1){html_post.innerHTML=p1;})
}

//특정 클래스를 포함한 엘레멘트를 클릭시 loadPost 메소드 실행
document.addEventListener("click", function (event) {
    if (event.path[0].classList.contains("dynamic-post")) loadPost(event.path[0].dataset.url, true);
})

//페이지 이전 혹은 이후로 갈때 loadPost 메소드 실행
window.onpopstate = function(){loadPost(document.location, false);};