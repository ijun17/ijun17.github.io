const html_categories=document.querySelector(".categories");
const html_sidebar=document.querySelector(".sidebar");
const html_sidebarApps = document.querySelector(".sidebar-apps");
const html_sidebarNavbars=document.querySelector(".sidebar-navbars");
const html_sidebarButton = document.querySelector(".sidebar-button");
const html_sidebarBehind = document.querySelector(".sidebar-behind");


let apps=[
{title:"devlog",icon:null,folders:[
    {name:"side project",folders:[
        {name:"Level10(web game)",category:"Level10"},
        {name:"SPA blog",category:"SPA-blog"}
    ]},
    {name:"study",folders:[
        {name:"data structure",category:"data-structure"},
        {name:"algorithm",category:"devlog"}
    ]}
]},
{title:"Life",icon:null,folders:[
    {name:"독서",category:"book"},
    {name:"쇼핑",category:"shopping"}
]}
]

let navbar_folder_id_count=0;

function createNav(dir, html_div){
    let folders = dir.folders;
    let category = dir.category;
    if(folders !== undefined){
        for(let i=0,l=folders.length; i<l; i++){
            let html_box=document.createElement("div");
            html_box.innerHTML=`
            <input type="checkbox" id="navbar_folder${navbar_folder_id_count}" class="navbar-folder-checkbox" style="display:none">
            <label for="navbar_folder${navbar_folder_id_count++}" class="navbar-folder">${folders[i].name}</label>
            <div class="navbar-folder-box"></div>`;
            createNav(dir.folders[i],html_box.querySelector(".navbar-folder-box"));
            html_div.appendChild(html_box);
        }
    }
    if(category !== undefined){
        let links = html_categories.querySelector("."+category);
        if(links!=null) html_div.appendChild(links);
    }
}

let html_selectedNavbar;

function createApp(app){
    let html_app=document.createElement("div");
    let html_app_icon=document.createElement("img");
    let html_app_title=document.createElement("p");
    let html_navbar=document.createElement("div");
    let html_navbar_name=document.createElement("p");
    html_app.className="app";
    html_app_icon.addEventListener("click",function(){
        html_selectedNavbar.style="display:none; width:0px;";
        html_navbar.style="display:block; width:270px;";
        html_selectedNavbar=html_navbar;
    })
    html_app_icon.className="app-icon";
    if(app.icon!=null)html_app_icon.src=app.icon;
    html_app_title.innerText=app.title;
    html_navbar.className="navbar"
    html_navbar.style="display:none; width:0px;";
    html_navbar.style.transition="width 1s ease 0s;"
    html_navbar_name.className="sidebar-text";
    html_navbar_name.innerText=app.title;

    html_navbar.appendChild(html_navbar_name);
    createNav(app, html_navbar);
    html_sidebarNavbars.appendChild(html_navbar);
    html_app.appendChild(html_app_icon);
    html_app.appendChild(html_app_title);
    html_sidebarApps.appendChild(html_app);
}

for(let app of apps){
    createApp(app);
}
html_selectedNavbar=html_sidebarNavbars.querySelector("div");
html_selectedNavbar.style="display:block; width:270px;";