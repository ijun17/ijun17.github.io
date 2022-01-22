const html_sidebarWrapper=document.querySelector(".sidebar-wrapper");

let Navigation = {
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
            }
        });
        URL.addEvent(function (event) {CSS.setState(cssRuleid1,document.location.pathname); }) 
    }
}

Navigation.init();
