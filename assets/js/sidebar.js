let directory={
    name:"post",folders:[
        
        {name:"side project",folders:[
            {name:"Level10(web game)",category:"Level10"},
            {name:"SPA blog",category:"SPA-blog"}
        ]},
        {name:"study",folders:[
            {name:"data structure",category:"data-structure"},
            {name:"algorithm",category:"devlog"}
        ]}
    ]
}

const html_category=document.querySelector(".category");

function createFolderButton(name,div_ele){
    let folder=document.createElement("div");
    folder.innerText=name;
    folder.className="navbar-folder";
    folder.addEventListener("mouseenter",function(){folder.style.color="rgba(255,255,255,0.5)"})
    folder.addEventListener("mouseleave",function(){folder.style.color="white"})
    folder.addEventListener("click",function(){div_ele.style.height=(div_ele.style.height[0]==="0" ?"":"0px")})
    return folder;
}

function createMenu(dir, div_ele, dir_name, tree_level){
    let folders = dir.folders;
    let category = dir.category;
    if(folders !== undefined){
        for(let i=0,l=folders.length; i<l; i++){
            let div_next = document.createElement("div");
            div_next.style.paddingLeft="25px";
            div_next.style.overflow="hidden"
            div_next.style.height="0px"
            div_ele.appendChild(createFolderButton(folders[i].name,div_next))
            div_ele.appendChild(div_next);

            createMenu(dir.folders[i],div_next,dir_name+"/"+folders[i].name,tree_level+1);
        }
    }
    if(category !== undefined){
        let links = html_category.querySelector("."+category);
        if(links!=null){
            div_ele.appendChild(links);
            for (let link of links.childNodes) {
                link.addEventListener("mouseenter", function () { link.style.backgroundColor = "rgba(255,255,255,0.1)" })
                link.addEventListener("mouseleave", function () { link.style.backgroundColor = "rgba(255,255,255,0)" })
            }
        }
    }
}
const html_sidebarMenu=document.querySelector(".sidebar-menu");
createMenu(directory, html_sidebarMenu, directory.name, 0)



const html_sidebar=document.querySelector(".sidebar")
const html_sidebarButton = document.querySelector(".sidebar-button");
let sidebarOn=true;
html_sidebarButton.addEventListener("click",function(e){
    html_sidebar.style.left=(sidebarOn?"-320px":"0px");
    sidebarOn=!sidebarOn;
})