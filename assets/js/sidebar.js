let directory={
    name:"post",folders:[
        {name:"study",folders:[
            {name:"data structure",files:[
                "post1","post1","post1","post1","post1","post1"
            ]},
            {name:"algorithm",files:[
                "post1"
            ]}
        ]},
        {name:"side project",folders:[
            {name:"LEVEL10(WebGame)",files:[
                "Level10(web game)프로젝트 소개","post1","post1","post1","post1","post1"
            ]},
            {name:"SPA blog",files:[
                "2021-11-09-SPA-블로그-만들기"
            ]}
        ]}
    ]
}

function createFolderButton(name,div_ele){
    let folder=document.createElement("div");
    folder.style.display="flex";
    folder.style.flexDirection="row";
    folder.style.margin="5px"
    folder.style.backgroundColor="rgba(255,255,255,0.1)";
    folder.style.borderRadius="5px"
    folder.style.height="35px"
    folder.style.verticalAlign="middle"

    let text=document.createElement("p");
    text.innerText=name;
    text.style.fontSize="21px"
    text.style.color="rgba(255,255,255,1)"
    text.style.marginLeft="5px"
    text.style.fontWeight="200";

    folder.appendChild(text);
    folder.addEventListener("mouseenter",function(){text.style.color="rgba(255,255,255,0.5)"})
    folder.addEventListener("mouseleave",function(){text.style.color="white"})
    folder.addEventListener("click",function(){div_ele.style.height=(div_ele.style.height[0]==="0" ?"":"0px")})
    return folder;
}

function createFileButton(fileName,dir){
    let file = document.createElement("div");
    //let info=extractInfoFromJekyllFileName(fileName);
    file.innerText=fileName;
    file.style.fontSize="18px"
    file.style.color="white";
    file.style.listStyleType="disc"
    file.addEventListener("mouseenter",function(){file.style.color="rgba(255,255,255,0.5)"})
    file.addEventListener("mouseleave",function(){file.style.color="white"})
    //file.addEventListener("click",function(){setUrl(dir+"/"+fileName+".md");loadFile(dir+"/"+name+".md")})
    return file;
}

function createMenu(dir, div_ele, dir_name, tree_level){
    let folders = dir.folders;
    let files = dir.files;
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
    if(files !== undefined){
        for(let i=0,l=files.length; i<l; i++){
            div_ele.appendChild(createFileButton(files[i],dir_name))
        }
    }
}
const sidebarMenu=document.querySelector(".sidebar-menu");
createMenu(directory, sidebarMenu, directory.name, 0)



const sidebar=document.querySelector(".sidebar")
const sidebarButton = document.querySelector(".sidebar-button");
let sidebarOn=true;
sidebarButton.addEventListener("click",function(e){
    sidebar.style.left=(sidebarOn?"-320px":"0px");
    sidebarOn=!sidebarOn;
})