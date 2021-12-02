const html_categories=document.querySelector(".categories");
const html_sidebar=document.querySelector(".sidebar");
const html_sidebarButton = document.querySelector(".sidebar-button");
const html_sidebarBehind = document.querySelector(".sidebar-behind");
const html_sidebarNav = document.querySelector(".sidebar-nav");
const html_navNavbarWrapper=document.querySelector(".nav-navbar-wrapper");
const html_navNavbarTitleWrapper = document.querySelector(".nav-navbar-title-wrapper");

let navigations=[
{title:"devlog",folders:[
    {name:"Toy Project",folders:[
        {name:"Level10(web game)",category:"devlog"},
        {name:"SPA blog",category:"SPA-blog"}
    ]}
]},
{title:"study",folders:[
    {name:"data structure",category:"data-structure"},
    {name:"algorithm",category:"algorithm"}
]},
{title:"기록",folders:[
    {name:"대학교",category:"대학교"},
    {name:"독서",category:"book"}
]}
]

let navbar_id_count=0;
let navbar_folder_id_count=0;

let Navigation = {
    currentPost: null,
    posts:[],
    init:function(){
        this.createNavbars(navigations);
        html_categories.remove();
        this.posts=document.querySelectorAll(".navbar-file");
        for (let post of this.posts) {post.addEventListener("click", function () {Navigation.changeCurrentPost(this.dataset.url)});}
        this.changeCurrentPost(document.location.pathname);
    },
    changeCurrentPost:function(changeUrl){
        for(let post of this.posts){
            if(post.dataset.url===changeUrl){
                if(Navigation.currentPost!=null)Navigation.currentPost.classList.remove("navbar-file-selected");
                Navigation.currentPost = post;
                post.classList.add("navbar-file-selected");
                console.log("current post: "+changeUrl);
                return;
            }
        }
    },
    createFolder: function (dir, html_div) {
        let folders = dir.folders;
        let category = dir.category;
        let innerHTML="";
        if (folders != undefined) for (let folder of folders) {
            innerHTML+=`
            <label for="navbar_folder${navbar_folder_id_count}" class="navbar-folder">${folder.name}</label>
            <input type="checkbox" id="navbar_folder${navbar_folder_id_count++}" class="navbar-folder-checkbox">
            <div class="navbar-folder-box">${this.createFolder(folder)}</div>`;
        }
        if (category != undefined) {
            let posts = html_categories.querySelector("." + category);
            if(posts!=null)innerHTML+=`<ol>${posts.innerHTML}</ol>`;
        }
        return innerHTML;
    },
    createNavbars: function (navigations) {
        for (let navigation of navigations) {
            html_navNavbarTitleWrapper.innerHTML += `
            <input type="radio" name="navbar-title" ${navbar_id_count === 0 ? "checked" : ""}>
            <label class="navbar-title" for="navbar${navbar_id_count}" onclick="this.previousElementSibling.click();">${navigation.title}</label>`
            html_navNavbarWrapper.innerHTML += `
            <input type="radio" id="navbar${navbar_id_count}" name="navbar" ${navbar_id_count++ === 0 ? "checked" : ""}>
            <div class="navbar">${this.createFolder(navigation)}</div>`;
        }
    }
}

Navigation.init();