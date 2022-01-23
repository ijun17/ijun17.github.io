const html_sidebarWrapper=document.querySelector(".sidebar-wrapper");

let Navigation = {
    load:false,
    init:function(){
        fetch("/assets/data/sidebar.html").then(res=>res.text()).then(function(text){html_sidebarWrapper.innerHTML=text;})
        
        let cssRuleid1=CSS.addRule((s)=>{return `.navbar-file[data-url="${s}"]{font-weight: bold;color:cornflowerblue;}`}, document.location.pathname);
        let cssRuleid2=CSS.addRule((s)=>{return `.navbar[data-navbar="${s}"]{width:100%;height:auto;}`}, 0);
        let cssRuleid3=CSS.addRule((s)=>{return `.navbar-title[data-navbar="${s}"]{color:dimgrey;font-weight: bold;}`}, 0);

        document.addEventListener("click",function(event){
            let ele=event.target;
            if (ele.classList.contains("navbar-folder")) ele.nextElementSibling.classList.toggle("navbar-folder-open");
            else if (ele.classList.contains("navbar-title")) {
                CSS.setState(cssRuleid2,ele.dataset.navbar);
                CSS.setState(cssRuleid3,ele.dataset.navbar);
            }else if (ele.classList.contains("navbar-folder-opener")) {Navigation.openFolder(ele.dataset["category"]);}
        });
        URL.addEvent(function (event) {CSS.setState(cssRuleid1,document.location.pathname); }) 
    },
    openFolder:function(category){
        let folder=html_sidebarWrapper.querySelector(`.navbar-folder-box[data-category="${category}"]`);
        if(folder==null)return;
        //폴더 열기
        while(true){
            folder.classList.add("navbar-folder-open");
            folder=folder.parentElement;
            if(folder.classList.contains("navbar"))break;
        }
        //탭 열기
        html_sidebarWrapper.querySelector(`.navbar-title[data-navbar="${folder.dataset["navbar"]}"]`).click();
    }
}

Navigation.init();
