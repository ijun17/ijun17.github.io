let URL={
    eventList:[],
    onurlchange:function(){
        for(let f of URL.eventList)f();
    },
    addEvent:function(f){
        URL.eventList.push(f);
    },
    set:function(url){
        history.pushState(null,"",url);
        URL.onurlchange();
    },
    init:function(){
        window.addEventListener("popstate",URL.onurlchange) 
    }
}

URL.init();


let CSS={
    sheet:null,
    rules:[],
    changeRule:function(index,p){
        if(CSS.rules.length>index){
            CSS.sheet.insertRule(CSS.rules[index](p),index);
            CSS.sheet.deleteRule(index+1);
        }
    },
    addRule:function(f,p){
        CSS.sheet.insertRule(f(p),CSS.rules.length);
        CSS.rules.push(f);
        return CSS.rules.length-1;
    },
    init:function(){
        CSS.sheet = document.head.appendChild(document.createElement('style')).sheet;
    }
}

CSS.init();