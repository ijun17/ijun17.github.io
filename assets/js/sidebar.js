const html_category=document.querySelector(".category");
const html_sidebar=document.querySelector(".sidebar");
const html_sidebarMenu=document.querySelector(".sidebar-menu");
const html_sidebarButton = document.querySelector(".sidebar-button");
const html_sidebarBehind = document.querySelector(".sidebar-behind");

let directory=[
{title:"devlog",folders:[
    {name:"side project",folders:[
        {name:"Level10(web game)",category:"Level10"},
        {name:"SPA blog",category:"SPA-blog"}
    ]},
    {name:"study",folders:[
        {name:"data structure",category:"data-structure"},
        {name:"algorithm",category:"devlog"}
    ]}
]},
{title:"Life",folders:[
    {name:"독서",category:"book"},
    {name:"쇼핑",category:"shopping"}
]}
]

function createNav(dir, html_div){
    let folders = dir.folders;
    let category = dir.category;
    if(folders !== undefined){
        for(let i=0,l=folders.length; i<l; i++){
            let html_div_next = document.createElement("div");
            let html_folder=document.createElement("div");
            html_folder.innerText=folders[i].name;
            html_folder.className="navbar-folder";
            html_folder.addEventListener("mouseenter",function(){html_folder.style.color="rgba(255,255,255,0.5)"})
            html_folder.addEventListener("mouseleave",function(){html_folder.style.color="white"})
            html_folder.addEventListener("click",function(){
                html_div_next.style.height=(html_div_next.style.height[0]==="0" ?"auto":"0px");
            })
            createNav(dir.folders[i],html_div_next);
            html_div.appendChild(html_folder);
            html_div.appendChild(html_div_next);
            //console.log(folders[i].name,html_div_next.getBoundingClientRect())
            html_div_next.style="padding-left:25px; overflow:hidden; height:0; transition:height 1s ease 0s;";
        }
    }
    if(category !== undefined){
        let links = html_category.querySelector("."+category);
        if(links!=null){
            html_div.appendChild(links);
            for (let link of links.childNodes) {
                link.addEventListener("mouseenter", function () { link.style.backgroundColor = "rgba(255,255,255,0.1)" })
                link.addEventListener("mouseleave", function () { link.style.backgroundColor = "rgba(255,255,255,0)" })
            }
        }
    }
}
createNav(directory[0], html_sidebarMenu);
let sidebarOn=false;
html_sidebarButton.addEventListener("click",function(e){
    if(sidebarOn){
        html_sidebar.style="left: -320px;"
    }else{
        html_sidebar.style="left: 0px;"
    }
    sidebarOn=!sidebarOn;
})
