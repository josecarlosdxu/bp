var showGrid = {};

(function() {
    "use strict";
    var body,
        initiated = false,
        contextMenu = false,

        showContextMenu = function(e) {

            var screenSize = getSizes(),
                midSizeHeight = screenSize.y / 2,
                mouseY = e.y, 
                mouseX = e.x,
                isinTop = Number(mouseY > midSizeHeight);
                contextMenu.style.top = + mouseY-(isinTop * 30)+'px';
                contextMenu.style.left =  (mouseX - 30) +'px';
                body.appendChild(contextMenu);


            //e.preventDefault();
            //console.log(e.y > midSizeHeight);
            //alert(window.offsetHeight / 2)*/

            //console.log(getSizes())

            //mouse x coordinates > screen height/2 than display menu on top of the cursor...


            //alert(body.offsetHeight -(screen.height-80)),)


        },
        createContextMenu = function() {

            if (!contextMenu) {
                contextMenu = document.createElement("div");
                contextMenu.classList.add("box");
                contextMenu.style.position = "fixed";
                contextMenu.style.minWidth = "30px";
                contextMenu.style.minHeight = "30px";
            }


        };
    this.init = function() {
        /*body = document.body;
        createContextMenu();
        document.addEventListener('contextmenu', showContextMenu, false);*/

    };

}).apply(showGrid);
window.addEventListener("load", showGrid.init, false);

function getSizes() {



    var size = {},
        w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    size.x = x;
    size.y = y;

    return size;


}

/*function createContextMenu(e){   
 var position,contextMenu = document.createElement('div');
  contextMenu.classList.add("contextMenu"); 
  document.body.appendChild(contextMenu);
  
   position = setContextMenuPostion(e,contextMenu);
  
  
  
  
  //contextMenu.style.left = position.x+"px";
  //contextMenu.style.top = position.y+"px";  
   e.preventDefault();
  
}

function setContextMenuPostion(event, contextMenu) {
  
  //mouse x coordinates > screen height/2 than display menu on top of the cursor...

   
}


document.addEventListener('contextmenu', createContextMenu, false);*/
