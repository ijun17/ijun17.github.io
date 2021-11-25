function setMobileType(){
    html_sidebarBehind.style.display="none";
    html_post.style.margin="0px";
    html_post.style.padding="15px";
    html_post.style.width=(screen.width)+"px";
    html_post.style.borderRadius="0px";
}

function setPCType(){
    html_sidebarBehind.style.display="block";
    html_post.style.margin="20px";
    html_post.style.padding="60px";
    html_post.style.width="800px";
    html_post.style.borderRadius="5px";
    html_sidebarButton.style.display="none";

    document.getElementById("sidebar_button").checked=true;
}

function setType(){
    if(screen.width>800+320+40)setPCType();
    else setMobileType();
}

setType();