
$(function(){
    $.cookie("branchType","0");//总部
    $.cookie("branchID","402890cd4e32fe28014e32fed9990001");//总部
    $.cookie("branchName","总部");//总部

    //$.cookie("branchType","1");//总部
    //$.cookie("branchID","ff808081508878ff015088c0b1010022");//联鑫付的
    //$.cookie("branchName","联鑫付");//总部
    //$.cookie("branchID","ff808081508878ff015088c168770025");//梅泰诺的
    //$.cookie("branchName","梅泰诺");//总部
});
function haha(){

    for (var i=1;i<=20;i++){

        pull_down_menu('.pull_down_menu_'+i+' li','.pull_down_default_text_'+i+'');

    }

}
//下拉菜单效果，点击a，赋值给b

function pull_down_menu(a,b){

    $(a).click(function(){

//        var j=$(this)[0].innerText;

        if(navigator.appName.indexOf("Explorer") > -1){

            var j=$(this)[0].innerText;

        } else{

            var j=$(this)[0].textContent;

        }

        $(b)[0].innerHTML=j;

        $(b).attr("data-value",$(this).attr("data-value")==undefined?"":$(this).attr("data-value"));
//        $("#***").attr("data-value")

    });

}

function pull_down_menu1(a,b){

    $(a).click(function(){

//        var j=$(this)[0].innerText;

        if(navigator.appName.indexOf("Explorer") > -1){

            var j=$(this)[0].innerText;

        } else{

            var j=$(this)[0].textContent;

        }

        $(b)[0].innerHTML=j;

        $(b).attr("data-value",$(this).attr("data-value")==undefined?"":$(this).attr("data-value"));
        $(b).attr("data-level",$(this).attr("data-level")==undefined?"":$(this).attr("data-level"));

    });

}
