let xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == this.DONE) {
        console.log(this.responseURL);
        setPost(this.responseText);
    }
};


function getPost(url){
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

function setPost(text){
    /*extract info from post layout
    <div class="post">
        <p class="post-dir" ... > ... </p>
        <h1 class="post-title" ... > ... </h1>
        <p class="post-date" ... > ... </p>
        <div class="post-line"></div>
        <div class="post-content"> ... </div>
        <div class="post-line"></div>
    </div>
    */
    // const postContent=document.querySelector(".post-content");
    // const postDate=document.querySelector(".post-date");
    // const postTitle=document.querySelector(".post-title");
    // const postDir=document.querySelector(".post-dir");

    // text.replace(/.*<div class="post">(.*)<\/div>.*/s,function(match,p1){return p1}) //remove not-post div 
    // text.replace(/<div class="post-line"><\/div>/g,"") //remove line

    // text.replace(/<div class="post-content">(.*)<\/div>/s,function(match,p1){postContent.innerHTML=p1;return "";})//get content
    // text.replace(/<p class="post-date"[^>]*>(.*)<\/p>/,function(match,p1){postDate.innerText=p1;return "";})//get date
    // text.replace(/<h1 class="post-title"[^>]*>(.*)<\/h1>/,function(match,p1){postTitle.innerText=p1;return "";})//get title
    // text.replace(/<p class="post-dir"[^>]*>(.*)<\/p>/,function(match,p1){postDir.innerText=p1;return "";})//get dir

    const post=document.querySelector(".post");
    text.replace(/.*<div class="post">(.*)<\/div>.*/s,function(match,p1){post.innerHTML=p1;return ""})
    setDynamicEvent(post);
}

function setDynamicEvent(element) {
    let dynamicPostList = element.querySelectorAll(".dynamic-post");
    for (let i=0,l=dynamicPostList.length; i<l; i++) {
        dynamicPostList[i].addEventListener("click", function () {
            history.pushState(null, null, dynamicPostList[i].dataset.url);
            getPost(dynamicPostList[i].dataset.url);
        })
    }
}
setDynamicEvent(document);

window.onpopstate = function(e){
    getPost(document.location);
};