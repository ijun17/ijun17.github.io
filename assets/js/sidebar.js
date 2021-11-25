const html_categories=document.querySelector(".categories");
const html_sidebar=document.querySelector(".sidebar");
const html_sidebarApps = document.querySelector(".sidebar-apps");
const html_sidebarNavbars=document.querySelector(".sidebar-navbars");
const html_sidebarButton = document.querySelector(".sidebar-button");
const html_sidebarBehind = document.querySelector(".sidebar-behind");


let apps=[
{title:"devlog",icon:"/assets/images/sidebar.jpg",folders:[
    {name:"Toy Project",folders:[
        {name:"Level10(web game)",category:"Level10"},
        {name:"SPA blog",category:"SPA-blog"}
    ]},
    {name:"Study",folders:[
        {name:"data structure",category:"data-structure"},
        {name:"algorithm",category:"devlog"}
    ]}
]},
{title:"기록",icon:"/assets/images/sidebar.jpg",folders:[
    {name:"독서",category:"book"},
    {name:"쇼핑",category:"shopping"}
]},
{title:"대학교",icon:null,folders:[
    {name:"1학년",folders:[

    ]},
    {name:"2학년",folders:[
        
    ]},
    {name:"3학년",folders:[
        
    ]},
    {name:"4학년",folders:[
        
    ]}
]},
{title:"독서",icon:null,folders:[
    {name:"it",category:"book-it"},
    {name:"시",category:"book-poem"}
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

function createApp(app){
    html_sidebarApps.innerHTML+=`
    <label class="app" for="navbar${navbar_id_count}" style="background:url('${app.icon}'),rgba(255,255,255,0.1);background-size: cover;">
    ${app.title}
    </label>`;

    let html_navbar=document.createElement("div");
    html_navbar.className="navbar";
    html_navbar.innerHTML=`
    <p class="sidebar-text">${app.title}</p>`
    createNav(app, html_navbar);
    html_sidebarNavbars.innerHTML+=`<input type="radio" id="navbar${navbar_id_count}" name="navbar" class="navbar-radio" style="display:none" ${navbar_id_count++===0?"checked":""}>`
    html_sidebarNavbars.appendChild(html_navbar);
}

for(let app of apps){createApp(app);}