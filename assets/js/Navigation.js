const html_sidebarWrapper=document.querySelector(".sidebar-wrapper");

let Navigation = {
    init:function(){
        fetch("/assets/data/sidebar.html").then(res=>res.text()).then(function(text){html_sidebarWrapper.innerHTML=text;})
        
        let cssRuleid1=CSS.addRule((p)=>{return `.navbar-file[data-url="${p}"]{font-weight: bold;color:cornflowerblue;}`}, document.location.pathname);
        let cssRuleid2=CSS.addRule((p)=>{return `.navbar[data-navbar="${p}"]{width:100%;height:auto;}`}, 0);
        let cssRuleid3=CSS.addRule((p)=>{return `.navbar-title[data-navbar="${p}"]{color:dimgrey;font-weight: bold;}`}, 0);

        document.addEventListener("click",function(event){
            let ele=event.target;
            if (ele.classList.contains("navbar-folder")) ele.nextElementSibling.classList.toggle("navbar-folder-open");
            else if (ele.classList.contains("navbar-title")) {
                CSS.changeRule(cssRuleid2,ele.dataset.navbar);
                CSS.changeRule(cssRuleid3,ele.dataset.navbar);
            }
        });
        URL.addEvent(function (event) {CSS.changeRule(cssRuleid1,document.location.pathname); }) 
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