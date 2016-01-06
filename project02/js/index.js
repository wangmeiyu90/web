var h1=$('#header').offset().top;
var h2=$('#template').offset().top;
var h3=$('#well').offset().top;
var h4=$('#creative').offset().top;
var h5=$('#passion').offset().top;
var h6=$('#team').offset().top;
var h7=$('#loop').offset().top;
$(function(){
    $(window).scroll(function(){
        var top=$(window).scrollTop();
        if(top>h1&&top<h2){
            $("#header h1").addClass("t1");
            $("#header p").addClass("t2");
        }
        if(top>h2&&top<h3){
            $("#template .row").addClass("t3");
        }
        if(top>h3&&top<h4){
            $("#well .a").addClass("t4");
            $("#well .b").addClass("t4");
            $("#well .c").addClass("t4");
        }
        if(top>h4&&top<h5){
            $("#creative .a").addClass("t4");
            $("#creative .b").addClass("t4");
            $("#creative .c").addClass("t4");
        }
        if(top>h6&&top<h7){
            $("#team .a").addClass("t4");
            $("#team .b").addClass("t4");
            $("#team .c").addClass("t4");
        }
    })
})



