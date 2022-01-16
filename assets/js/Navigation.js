const html_sidebarWrapper=document.querySelector(".sidebar-wrapper");

let Navigation = {
    category:null,
    init:function(){
        fetch("/assets/data/sidebar.html").then(res=>res.text()).then(function(text){html_sidebarWrapper.innerHTML=text;})
        
        this.styleSheet_currentPost = document.head.appendChild(document.createElement('style')).sheet;
        this.styleSheet_currentNavbar = document.head.appendChild(document.createElement('style')).sheet;
        this.setCurrentPost(document.location.pathname);
        this.setCurrentNavbar(0);

        document.addEventListener("click",function(event){
            let ele=event.target;
            if (ele.classList.contains("navbar-file")) Navigation.setCurrentPost(ele.dataset.url);
            if (ele.classList.contains("navbar-folder")) ele.nextElementSibling.classList.toggle("navbar-folder-open");
            if (ele.classList.contains("navbar-title")) Navigation.setCurrentNavbar(ele.dataset.navbar);
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
    }
}

Navigation.init();


/*
createNavbars: function (navigations) {
    const html_navNavbarWrapper=document.querySelector(".nav-navbar-wrapper");
    const html_navNavbarTitleWrapper = document.querySelector(".nav-navbar-title-wrapper");
    let navbar_id_count=0;
    let navbar_folder_id_count=0;
    let createFolder=function(dir) {
        let folders = dir.folders;
        let category = dir.category;
        let innerHTML = "";
        if (folders != undefined) for (let folder of folders) {
            innerHTML += `
        <label for="navbar_folder${navbar_folder_id_count}" class="navbar-folder">${folder.name}</label>
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
*/