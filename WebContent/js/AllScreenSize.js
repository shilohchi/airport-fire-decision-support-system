
var screenWidth  = 0;
var screenHeight = 0;

function GetScreenWidthAndHeight(){

      if(window.innerWidth){
        screenWidth = window.innerWidth;
      }else if((document.body)&&(document.body.clientWidth)){
        screenWidth = document.body.clientWidth;      
      }
      
      if(window.innerHeight){
        screenHeight = window.innerHeight;
      }else if((document.body)&&(document.body.clientHeight)){
        screenHeight = document.body.clientheight;      
      }
      
      if(document.documentElement && document.documentElement.clientWidth && document.documentElement.clientHeight){
        screenWidth =  document.documentElement.clientWidth ;
        screenHeight =  document.documentElement.clientHeight;    
      }
      
}

GetScreenWidthAndHeight();

window.onresize = GetScreenWidthAndHeight;

