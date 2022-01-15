const html_sidebar=document.querySelector(".sidebar");
const html_sidebarNav = document.querySelector(".sidebar-nav");
const html_navNavbarWrapper=document.querySelector(".nav-navbar-wrapper");
const html_navNavbarTitleWrapper = document.querySelector(".nav-navbar-title-wrapper");

let navigations=[
{title:"devlog",folders:[
    {name:"side project",folders:[
        {name:"Level10(web game)",category:"Level10"},
        {name:"SPA blog",category:"SPA-blog"}
    ]},
    {name:"study",folders:[
        {name:"data structure",category:"data-structure"},
        {name:"algorithm",category:"algorithm"}
    ]}
]},
{title:"기록",folders:[
    {name:"대학교",category:"대학교"},
    {name:"독서",category:"book"}
]}
]

let navbar_id_count=0;
let navbar_folder_id_count=0;

let Navigation = {
    category:null,
    init:function(){
        (new Request(function(text){
            this.category=JSON.parse(text);
            this.createNavbars(navigations);
            
        }.bind(this))).load("/assets/data/categorizedPosts.json");
        
        this.styleSheet_currentPost = document.head.appendChild(document.createElement('style')).sheet;
        this.styleSheet_currentNavbar = document.head.appendChild(document.createElement('style')).sheet;
        this.setCurrentPost(document.location.pathname);
        this.setCurrentNavbar(0);

        document.addEventListener("click",function(event){
            if (event.target.classList.contains("navbar-file")) Navigation.setCurrentPost(event.target.dataset.url);
            if (event.target.classList.contains("navbar-title")) Navigation.setCurrentNavbar(event.target.dataset.navbar);
        });
        window.addEventListener("popstate",function () { Navigation.setCurrentPost(document.location.pathname); }) 
    },
    setCurrentPost:function(url){
        if(this.styleSheet_currentPost.cssRules.length>0)this.styleSheet_currentPost.deleteRule(0);
        this.styleSheet_currentPost.insertRule(`.navbar-file[data-url="${url}"]{font-weight: bold;color:cornflowerblue;}`);
    },
    setCurrentNavbar:function(num){
        if(this.styleSheet_currentNavbar.cssRules.length>1){
            this.styleSheet_currentNavbar.deleteRule(0);
            this.styleSheet_currentNavbar.deleteRule(0);
        }
        this.styleSheet_currentNavbar.insertRule(`.navbar[data-navbar="${num}"]{width:100%;height:auto;}`);
        this.styleSheet_currentNavbar.insertRule(`.navbar-title[data-navbar="${num}"]{color:dimgrey;font-weight: bold;}`);
    },
    createNavbars: function (navigations) {
        createFolder=function(dir) {
            let folders = dir.folders;
            let category = dir.category;
            let innerHTML = "";
            if (folders != undefined) for (let folder of folders) {
                innerHTML += `
            <label for="navbar_folder${navbar_folder_id_count}" class="navbar-folder">${folder.name}</label>
            <input type="checkbox" id="navbar_folder${navbar_folder_id_count++}" class="navbar-folder-checkbox" ${folder.category == undefined ? "checked" : ""}>
            <div class="navbar-folder-box">${createFolder(folder)}</div>`;
            }
            if (category != undefined) innerHTML += `<ol data-category="${category}">${this.category[category]}</ol>`;
            return innerHTML;
        }.bind(this);

        for (let navigation of navigations) {
            html_navNavbarTitleWrapper.innerHTML += `<label class="navbar-title" data-navbar="${navbar_id_count}">${navigation.title}</label>`;
            html_navNavbarWrapper.innerHTML += `<div class="navbar" data-navbar="${navbar_id_count++}">${createFolder(navigation)}</div>`;
        }
    }
}

Navigation.init();