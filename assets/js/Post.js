const html_post = document.querySelector(".post");
const html_postContent = html_post.querySelector(".post-content");
const html_postHeader = html_post.querySelector(".post-header");
const html_postFooter = html_post.querySelector(".post-footer");

let Post = {
    linkClassName: "post-link",
    init: function () {
        const linkClickEventHandler = (event) => {
            if (event.target.classList.contains(this.linkClassName)) {
                event.preventDefault();
                URL.set(event.target.href);
            }
        }
        const linkWheelClickEventHandler = (event) => {
            if (event.button === 1 && event.target.classList.contains(this.linkClassName)) {
                event.preventDefault();
                window.open(event.target.href, '_blank');
            }
        }

        this.renderPost();
        //포스트 링크를 클릭시 loadPost 메소드 실행
        document.addEventListener("click", linkClickEventHandler);
        document.addEventListener("mousedown", linkWheelClickEventHandler);
        document.addEventListener("auxclick", linkWheelClickEventHandler);
        //페이지 이전, 이후로 갈때 loadPost 메소드 실행
        URL.addEvent(function () { this.loadPost(document.location, false); }.bind(this));
    },
    loadPost: function (url, scrollUp = true) {
        html_post.classList.add("gradient-box");
        fetch(url)
            .then((response) => response.text())
            .then((data) => {
                this.renderPost(data);
                html_post.classList.remove("gradient-box");
                if (scrollUp) window.scroll({ top: 0, left: 0, behavior: "smooth" });
            });
        Navigation.openCurrentFolder()
    },
    renderPost: function (text = "") {
        html_postContent.classList.remove('render-animation');
        html_postHeader.classList.remove('render-animation');
        html_postFooter.classList.remove('render-animation');
        const match = text.match(/<!--post start-->([\s\S]*?)<!--post end-->/);
        if(match) html_postContent.innerHTML = match[1];
        document.title = document.querySelector(".post-info").dataset["title"];
        Post.renderHeader();
        Post.renderFooter();
        html_postContent.classList.add('render-animation');
        html_postHeader.classList.add('render-animation');
        html_postFooter.classList.add('render-animation');

    },
    renderHeader: function () {
        let postData = document.querySelector(".post-info").dataset;
        html_postHeader.innerHTML = `
            <div class="info">
                <div class="post-dir navbar-folder-opener">${postData["dir"].toUpperCase()}</div>
                <div class="post-date">${postData["date"]}</div>
            </div>
            <h1 class="post-title">${postData["title"]}</h1>
            
            
            ${(function () {
                let hyperlinkList = html_postContent.querySelectorAll("h1");
                let html = "";
                for (let i = 0; i < hyperlinkList.length; i++) {
                    hyperlinkList[i].id = "hyper" + i;
                    html += `<li><a href="#hyper${i}">${hyperlinkList[i].innerText}</a></li>`;
                }
                if (html == "") return "";
                return `<ol class="post-hyperlink">${html}</ol>`;
            })()}`;
    },
    renderFooter: function () {
    }
}

Post.init();