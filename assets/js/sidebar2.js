const html_categories=document.querySelector(".categories");
const html_sidebar=document.querySelector(".sidebar");
const html_sidebarButton = document.querySelector(".sidebar-button");
const html_sidebarBehind = document.querySelector(".sidebar-behind");
const html_navNavbarWrapper=document.querySelector(".nav-navbar-wrapper");
const html_navNavbarTitleWrapper = document.querySelector(".nav-navbar-title-wrapper");

let apps=[
{title:"devlog",folders:[
    {name:"Toy Project",folders:[
        {name:"Level10(web game)",category:"Level10"},
        {name:"SPA blog",category:"SPA-blog"}
    ]},
    {name:"Study",folders:[
        {name:"data structure",category:"data-structure"},
        {name:"algorithm",category:"devlog"}
    ]}
]},
{title:"sdfa",folders:[
    {name:"독서",category:"book"},
    {name:"쇼핑",category:"shopping"}
]},
{title:"asdf",folders:[
    {name:"1학년",folders:[

    ]},
    {name:"2학년",folders:[
        
    ]},
    {name:"3학년",folders:[
        
    ]},
    {name:"4학년",folders:[
        
    ]}
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
            <input type="checkbox" id="navbar_folder${navbar_folder_id_count}" class="navbar-folder-checkbox">
            <label for="navbar_folder${navbar_folder_id_count++}" class="navbar-folder">${folders[i].name}</label>
            <div class="navbar-folder-box"></div>`;
            html_div.appendChild(html_box);
            createNav(dir.folders[i],html_box.querySelector(".navbar-folder-box"));
        }
    }
    if(category !== undefined){
        let links = html_categories.querySelector("."+category);
        if(links!=null) html_div.appendChild(links);
    }
}

let navbar_id_count=0;

function createNavbars(navigations){
    for (let navigation of navigations) {
        html_navNavbarTitleWrapper.innerHTML+=`
        <input type="radio" id="navbars${navbar_id_count}" name="navbar-title" ${navbar_id_count === 0 ? "checked" : ""}>
        <label class="navbar-title" for="navbar${navbar_id_count}">
        ${navigation.title}
        </label>`;

        let html_navbar = document.createElement("div");
        html_navbar.className="navbar";
        createNav(navigation, html_navbar);
        html_navNavbarWrapper.innerHTML += `<input type="radio" id="navbar${navbar_id_count}" name="navbar" ${navbar_id_count++ === 0 ? "checked" : ""}>`
        html_navNavbarWrapper.appendChild(html_navbar);
        console.log(html_navNavbarTitleWrapper);
    }
}


createNavbars(apps);