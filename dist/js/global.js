﻿/**全局函数把一些可用的函数提出到此**/
var userBranchtype="";
var userBranchId="";
var userBranchName="";
var userId="";
var userRoleName="";

var pageSize=20;

$(function(){
    //a("9999");

    //var jsonStr=$.cookie("userinfo");
    //jsonStr='{"userName":"测试用户","roleName":"录入角色","userId":"ff8080815231be7201523213396000d2","userState":"1","phone":"13811000000","branchName":"梅泰诺","branchID":"ff808081509274b2015092ec5a05002e","branchType":"1","roleId":"ff8080815231be7201523204862c0063"}';
//alert("都加载了。。。ss=="+jsonStr);
//    var jsonOb= JSON.parse(jsonStr);
//alert("dd=="+jsonOb.branchID);
//把取得到的值存入cookie
//    $.cookie("userID", jsonOb.userId);
//    $.cookie("branchID", jsonOb.branchID);
//    $.cookie("branchType", jsonOb.branchType);
//    $.cookie("branchName", jsonOb.branchName);
//    $.cookie("roleName1",jsonOb.roleName);
//    $.cookie("userName",jsonOb.userName);



//每个页面都要调用,写这里了
//    userId=$.cookie("userID");
//    userBranchId= $.cookie("branchID");
//    userBranchtype= $.cookie("branchType");
//    userBranchName= $.cookie("branchName");
//    userRoleName= $.cookie("roleName1");
});

var Str09=new Array("0","1","2","3","4","5","6","7","8","9");

var Straz=new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");

var StrAZ=new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");

//替换字符串指定位置字符

function replaceChar(Str,index,repStr){

    if(index<Str.length){

        var bef=Str.substring(0,index);

        var last=Str.substring(index+1,Str.length);

        return bef.concat(repStr,last) ;

    }

    return "";

}

//生成指定位数随机数0-9

function createCode(codeLength)

{

    var code="";

    //var codeLength=8;

    var selectChar=new Array(0,1,2,3,4,5,6,7,8,9);

    for(var i=0;i<codeLength;i++)

    {

        var charIndex=Math.floor(Math.random()*10);

        code+=selectChar[charIndex];

    }

    return code;

}

//生成指定位数随机数,数据源自选

function createCodeAny(array,codeLength)

{

    var code="";

    for(var i=0;i<codeLength;i++)

    {

        var charIndex=Math.floor(Math.random()*array.length);

        code+=array[charIndex];

    }

    return code;

}

//验证手机号

function CheckIsMobile(mobile){
	//alert(mobile+"****");

    if (mobile==""){

        alert("请填写手机号码！");

        return false;

    }

    if(isNaN(mobile)||(mobile.length!=11)){

        alert("手机号码为11位数字！请正确填写！");

       return false;

   }



    var reg =/^0{0,1}(13[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;

    if(!reg.test(mobile))

    {

        alert("您的手机号码不正确，请重新输入");



        return false;

    }

    return true;

}

//判断时间是不是符合规则(时分00:00)

function checkTime(timeTextBox) {

    var time = $(timeTextBox).val();

    var regTime = /^([0-2][0-9]):([0-5][0-9])$/;

    var result = false;

    if (regTime.test(time)) {

        if ((parseInt(RegExp.$1) < 24) && (parseInt(RegExp.$2) < 60)) {

            result = true;

        }

    }

    //alert(result+"时间"+time);

    return result;

}

//判断时间是不是符合规则(时分秒00:00:00）

function checkTimeOld(timeTextBox) {

    var time = $(timeTextBox).val();

    var regTime = /^([0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/;

    var result = false;

    if (regTime.test(time)) {

        if ((parseInt(RegExp.$1) < 24) && (parseInt(RegExp.$2) < 60) && (parseInt(RegExp.$3) < 60)) {

            result = true;

        }

    }

    //alert(result+"时间"+time);

    return result;

}

/**
 * 判断中文长度(一个中文返回长度为2,英文数字返回长度为1)
 * @param str
 * @returns {Number}
 */
function getRealLen( str ) {
    return str.replace(/[^\x00-\xff]/g, '__').length; //这个把所有双字节的都给匹配进去了
}

/**
 * 截取开始--结束时间
 * @param index 返回前半段还是后半段
 * @param Str 要截取的字串
 * @returns {*}
 */
function pieTime(index,Str){
    var times=Str.split(" - ");
    var r1="";
    var r2="";
    if(times.length>1){
        r1=times[0];
        r2=times[1];
    }
    if(index==0){
        return r1.trim();
    }else if(index==1){
        return r2.trim();
    }else{
        return "";
    }


}


//验证邮箱
function checkvalue(theemail){
    var Reg=/^[._a-z 0-9]+@([_a-z 0-9]+\.)+[a-z 0-9]{2,3}$/;   //正则验证邮箱格式
    if(!Reg.test(theemail))
    {
        alert("请正确填写邮箱地址!");
        return false;
    }
    return true;
}
function findDataForAll(Str,fun){
    findData(Str,fun,url);
}
function findDataForAllOld(Str,fun){
    findData(Str,fun,oldurl);
}
//查询数据接口
function findData(Str,fun,dataUrl){
    //a("传参数:"+Str);
    Str["userid"]=$.cookie("userId_d");
    Str["username"]=$.cookie("userName_d");

    $.ajax({

        // 提交数据的类型 POST GET

        type : "POST",

        // async:false,

        // 提交的网址

        url : dataUrl,

        contentType:"application/x-www-form-urlencoded;charset=gbk",
        // 提交的数据

        //data : JSON.stringify(json),

        data:Str,

        // 返回数据的格式

        dataType : "jsonp",// "xml", "html", "script", "json", "jsonp", "text".

        jsonp : "callbackparam",// 传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

        jsonpCallback : "success_jsonpCallback",// 自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名

        // 在请求之前调用的函数

        beforeSend : function() { /* $("#btn_loading").css('display',''); */

        },

		timeout: 10*60*1000,
        // 成功返回之后调用的函数

        success : function(data) {

            // alert("AJAX请求错误：请求状态码：");

            fun(data);

        },

        // 调用执行后调用的函数

        complete : function(XMLHttpRequest, textStatus) {

            // $("#btn_loading").css('display','none');

        },

        // 调用出错执行的函数

        error : function(XMLHttpRequest, textStatus, errorThrown) {

            alert("AJAX请求错误：请求状态码：" + XMLHttpRequest.status + " readyState:"

                + XMLHttpRequest.readyState + "错误：" + textStatus);



        }

    });
}
//弹出框
function a(ab){
    alert(ab);
}
function haha(){

    for (var i=1;i<=20;i++){

        pull_down_menu('.pull_down_menu_'+i+' li','.pull_down_default_text_'+i+'');

    }

}
//下拉列表添加效果
function pull_down(){
    for (var i=1;i<=30;i++){
        pull_down_menu('.pull_down_menu_'+i+' li','.pull_down_menu_text_'+i+'');
    }
}

//下拉列表效果添加
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

//删除数组的指定值--开始
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

//var array = [1, 2, 3, 4, 5];
//alert("arr1=="+array);
//array.remove(9);
//alert("arr2=="+array);
//删除数组的指定值----结束



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
