/**
 * Created by WuZhenxin on 2016/2/29.
 */
//临时存储，用于开发测试，正式版去掉
// 存储一个带7天期限的 cookie
//$.cookie("branchID", "402890cd4e32fe28014e32fed9990001", {
//    expires : 7
//
//});
//$.cookie("branchType", "1", {
//    expries : 7
//});
//当前分页号码
var pageCurrent = 1;
//分页条数
var pagesize = 10;
//弹出框是否需要分页
var IsCreatePage=false;
//商户ID
var superShopId="";
//网点ID
var ShopId="";
//省ID
var provinceId = "";
//市ID
var cityId = "";
//县ID
var countyId = "";
//当前状态
var thisState = "1";
//POS渠道属性
var auStr="";
//管理员级别
var softPosType="";
//分公司ID
//var branchID=$.cookie("branchID");
$(function() {
    $('input.zhifu[type="checkbox"]:enabled').prop("checked",true);
    $('input.chengdui[type="checkbox"]:enabled').prop("checked",true);
    $('input.yinhangka[type="checkbox"]:enabled').prop("checked",true);
    $('#provincebutton').click(function (e) {
        findProvince();
    });
    $('#citybutton').click(function (e) {
        findCity();
    });
    $('#countybutton').click(function (e) {
        findCounty();
    });

//选择商户和网点
    $("#shjsButton").click(function(){

        $("#shjs").show();

    });

//商户检索按键-查询
    $("#jssh").click(function(){
        pageCurrent = 1;
        findSuperShop();
    });

//提交按钮单击事件
    $("#submitButton").click(function(){
        var tishi=check();
        if(tishi=='0'){
            //验证通过,可以提交
            //alert(tishi);
            add();
        }else{
            //无法提交
            if(tishi!="001"){
                alert(tishi);
            }
        }
//alert("提交中");
        return false;
    });
    $("#phoneNum").focusout(function (){
       var phoneNum = $("#phoneNum").val();
        if(phoneNum.length>8){
            phoneNum = phoneNum.substring(phoneNum.length-8);
        }
        $("#terminalNum").val(phoneNum);
    });

    //渠道部分多选框的设定
    $('#zhifuAll').click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $('input.zhifu[type="checkbox"]:enabled').prop("checked",true);
            $("#weixinAll").html("全消");
            $("#baiduAll").html("全消");
            $("#jingdongAll").html("全消");
            $("#zhifubaoAll").html("全消");
            $("#dazhongshanhuiAll").html("全消");
            $("#yizhifuAll").html("全消");
            $("#otherAll").html("全消");
            $("#tongyiAll").html("全消");
            $("#QQAll").html("全消");
            $("#xianjinAll").html("全消");
        }else{
            $(this).html("全选");
            $('input.zhifu[type="checkbox"]:enabled').prop("checked",false);
            $("#weixinAll").html("全选");
            $("#baiduAll").html("全选");
            $("#jingdongAll").html("全选");
            $("#zhifubaoAll").html("全选");
            $("#dazhongshanhuiAll").html("全选");
            $("#yizhifuAll").html("全选");
            $("#otherAll").html("全选");
            $("#tongyiAll").html("全选");
            $("#QQAll").html("全选");
            $("#xianjinAll").html("全选");
        }

    });

    $('#tuangouAll').click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $('input.tuangou[type="checkbox"]:enabled').prop("checked",true);
        }else {
            $(this).html("全选");
            $('input.tuangou[type="checkbox"]:enabled').prop("checked", false);
        }
    });

    $('#dazhongdianpingAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#dazhongdianpingYanzheng").prop("checked",true);
            $("#dazhongdianpingChexiao").prop("checked",true);
            $("#dazhongdianpingDingdanqueren").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#dazhongdianpingYanzheng").prop("checked",false);
            $("#dazhongdianpingChexiao").prop("checked",false);
            $("#dazhongdianpingDingdanqueren").prop("checked",false);
        }
    });

    $('#meituanAll2').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#meituanYanzheng").prop("checked",true);
            $("#meituanChexiao").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#meituanYanzheng").prop("checked",false);
            $("#meituanChexiao").prop("checked",false);
        }
    });

    $('#weixinAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#weixinZhusao").prop("checked",true);
            $("#weixinBeisao").prop("checked",true);
            $("#weixinTuihuo").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#weixinZhusao").prop("checked",false);
            $("#weixinBeisao").prop("checked",false);
            $("#weixinTuihuo").prop("checked",false);
        }
    });

    $('#zhifubaoAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#zhibubaoZhusao").prop("checked",true);
            $("#zhifubaoBeisao").prop("checked",true);
            $("#zhibubaoTuihuo").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#zhibubaoZhusao").prop("checked",false);
            $("#zhifubaoBeisao").prop("checked",false);
            $("#zhibubaoTuihuo").prop("checked",false);
        }
    });

    $('#baiduAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#baiduZhusao").prop("checked",true);
            $("#baiduBeisao").prop("checked",true);
            $("#baiduTuihuo").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#baiduZhusao").prop("checked",false);
            $("#baiduBeisao").prop("checked",false);
            $("#baiduTuihuo").prop("checked",false);
        }
    });

    $('#jingdongAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#jingdongZhusao").prop("checked",true);
            $("#jingdongBeisao").prop("checked",true);
            $("#jingdongTuihuo").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#jingdongZhusao").prop("checked",false);
            $("#jingdongBeisao").prop("checked",false);
            $("#jingdongTuihuo").prop("checked",false);
        }
    });

    $('#QQAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#QQZhusao").prop("checked",true);
            $("#QQBeisao").prop("checked",true);
            $("#QQTuihuo").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#QQZhusao").prop("checked",false);
            $("#QQBeisao").prop("checked",false);
            $("#QQTuihuo").prop("checked",false);
        }
    });

    $('#dazhongshanhuiAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#dazhongshanhuiZhusao").prop("checked",true);
            $("#dazhongshanhuiBeisao").prop("checked",true);
            $("#dazhongshanhuiTuihuo").prop("checked",true);
            $('#dazhongshanhuiDingdanqueren').prop("checked",true);
        }else {
            $(this).html("全选");
            $("#dazhongshanhuiZhusao").prop("checked",false);
            $("#dazhongshanhuiBeisao").prop("checked",false);
            $("#dazhongshanhuiTuihuo").prop("checked",false);
            $('#dazhongshanhuiDingdanqueren').prop("checked",false);
        }
    });

    $('#meituanAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#meituanZhusao").prop("checked",true);
            $("#meituanBeisao").prop("checked",true);
            $("#meituanTuihuo").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#meituanZhusao").prop("checked",false);
            $("#meituanBeisao").prop("checked",false);
            $("#meituanTuihuo").prop("checked",false);
        }
    });

    $('#yizhifuAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#yizhufuZhusao").prop("checked",true);
            $("#yizhifuBeisao").prop("checked",true);
            $("#yizhifuTuihuo").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#yizhufuZhusao").prop("checked",false);
            $("#yizhifuBeisao").prop("checked",false);
            $("#yizhifuTuihuo").prop("checked",false);
        }
    });

    $('#tongyiAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#tongyiZhusao").prop("checked",true);
            $("#tongyiBeisao").prop("checked",true);
            $("#tongyiTuihuo").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#tongyiZhusao").prop("checked",false);
            $("#tongyiBeisao").prop("checked",false);
            $("#tongyiTuihuo").prop("checked",false);
        }
    });

    $('#otherAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#panjintong").prop("checked",true);
            $("#cancel").prop("checked",true);
            $("#koubeitejia").prop("checked",true);
            $("#yunxujiesuan").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#panjintong").prop("checked",false);
            $("#cancel").prop("checked",false);
            $("#koubeitejia").prop("checked",false);
            $("#yunxujiesuan").prop("checked",false);
        }
    });

    $('#chengduiquanxianAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $('input.chengdui[type="checkbox"]:enabled').prop("checked",true);
            $("#chengduiquanxian").html("全消");
        }else{
            $(this).html("全选");
            $("#chengduiquanxian").html("全选");
            $('input.chengdui[type="checkbox"]:enabled').prop("checked",false);
        }
    });

    $('#yinhangkaquanxianAll').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $('input.yinhangka[type="checkbox"]:enabled').prop("checked",true);
            $("#yinhangkaquanxian").html("全消");
            $("#yinhangkayushouquanquanxian").html("全消");
            $("#yinhangkajifenquanxian").html("全消");
        }else{
            $(this).html("全选");
            $("#yinhangkaquanxian").html("全选");
            $("#yinhangkayushouquanquanxian").html("全选");
            $("#yinhangkajifenquanxian").html("全选");
            $('input.yinhangka[type="checkbox"]:enabled').prop("checked",false);
        }
    });

    $('#chengduiquanxian').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#quanmachengdui").prop("checked",true);
            $("#shoujihaochengdui").prop("checked",true);
            $("#yinhangkahaochengdui").prop("checked",true);
            $("#meituanchengdui").prop("checked",true);
            $("#dianpingchengdui").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#quanmachengdui").prop("checked",false);
            $("#shoujihaochengdui").prop("checked",false);
            $("#yinhangkahaochengdui").prop("checked",false);
            $("#meituanchengdui").prop("checked",false);
            $("#dianpingchengdui").prop("checked",false);
        }
    });

    $("#xianjinAll").click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#xianjinJizhang").prop("checked",true);
            $("#xianjinXiaozhang").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#xianjinJizhang").prop("checked",false);
            $("#xianjinXiaozhang").prop("checked",false);
        }
    });

    $("#yinhangkaquanxian").click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#yinhangkaxiaofei").prop("checked",true);
            $("#yinhangkachexiao").prop("checked",true);
            $("#yinhangkatuihuo").prop("checked",true);
            $("#yinbhangkayuechaxun").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#yinhangkaxiaofei").prop("checked",false);
            $("#yinhangkachexiao").prop("checked",false);
            $("#yinhangkatuihuo").prop("checked",false);
            $("#yinbhangkayuechaxun").prop("checked",false);
        }
    });

    $("#yinhangkayushouquanquanxian").click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#yinhangkayushouquan").prop("checked",true);
            $("#yushouquanchexiao").prop("checked",true);
            $("#yushouquanwancheng").prop("checked",true);
            $("#yushouquanwanchengchexiao").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#yinhangkayushouquan").prop("checked",false);
            $("#yushouquanchexiao").prop("checked",false);
            $("#yushouquanwancheng").prop("checked",false);
            $("#yushouquanwanchengchexiao").prop("checked",false);
        }
    });

    $("#yinhangkajifenquanxian").click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#yinhangkajifenxiaofei").prop("checked",true);
            $("#yinhangkajifenchexiao").prop("checked",true);
            $("#yinhangkajifentuihuo").prop("checked",true);
            $("#yinhangkajifenchaxun").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#yinhangkajifenxiaofei").prop("checked",false);
            $("#yinhangkajifenchexiao").prop("checked",false);
            $("#yinhangkajifentuihuo").prop("checked",false);
            $("#yinhangkajifenchaxun").prop("checked",false);
        }
    });
});
findProvince();

//查询手机号码唯一性

function findProvince(){
//alert("33");
    var json=new Object();

    json.level = "1";
    json.parentID = "0";

    var jsonPrama = {

        "marked" : "userInformation_getProvinceAndCity",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };


    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callback_findProvince);

}

function callback_findProvince(data){

    if(data.rspCode=="000"){
        $('#selectProvinceName').text("");
        $('#selectCityName').text("");
        $("#city").text("--");
        $('#selectCountyName').text("");
        $("#county").text("--");
        //$('#selectProvinceName').html("<li><a href=\"#\">全部</a></li>");
        $.each(data.list,function(entryIndex, entry){
            var str="<li ><a  href=\"#\">" +entry.name + "</a></li>";
            var str =   "<li data-value='"+entry.id+"'><a href='#' onclick='selectProvince("+entry.id+")'>"+entry.name+"</a></li>";
            //var str =   "<li data-value='"+entry.id+"'onclick='selectProvince("+entry.id+")'>"+entry.name+"</li>";
            $('#selectProvinceName').append(str);
        });

    }else{
        alert(data.rspCode + "   " + data.rspDesc);
    }
    pull_down_menu('#selectProvinceName li','#province');
    pull_down_menu('#selectState li','#shopAssistantState');
    //findSuperShopByBranchID();
}

function selectProvince(id){
    provinceId = id;
}

function findCity(){
//alert("33");
    var json=new Object();


    if($('#province').attr("data-value")=="--"){
        return;
    }
    json.level = "2";
    json.parentID = $('#province').attr("data-value");

    if( json.parentID==""|| json.parentID==null){
        alert("还没有选中省份！");
        return;
    }
    var jsonPrama = {

        "marked" : "userInformation_getProvinceAndCity",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callback_findCity);

}

function callback_findCity(data){
    if(data.rspCode=="000"){
        $('#selectCityName').text("");
        $('#selectCountyName').text("");
        $("#county").text("--");
        $.each(data.list,function(entryIndex, entry){
            var str="<li ><a  href=\"#\">" +entry.name + "</a></li>";
            var str = "<li data-value='"+entry.id+"'><a href='#' onclick='selectCity("+entry.id+")'>"+entry.name+"</a></li>";
            $('#selectCityName').append(str);
        });
    }else{
        alert(data.rspCode + "   " + data.rspDesc);
    }
    pull_down_menu('#selectCityName li','#city');
}

function selectCity(id){
    //alert("555");
    cityId = id;
}

function findCounty(){
//alert("33");
    var json=new Object();


    if($('#city').attr("data-value")=="--"){
        return;
    }
    json.level = "3";
    json.parentID = $('#city').attr("data-value");
    if( json.parentID==""|| json.parentID==null){
        alert("还没有选中地市！");
        return;
    }
    var jsonPrama = {

        "marked" : "userInformation_getProvinceAndCity",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callback_findCounty);

}

function callback_findCounty(data){

    if(data.rspCode=="000"){
        $('#selectCountyName').text("");

        $.each(data.list,function(entryIndex, entry){
            var str="<li ><a  href=\"#\">" +entry.name + "</a></li>";
            var str = "<li data-value='"+entry.id+"'><a href='#' onclick='selectCounty("+entry.id+")'>"+entry.name+"</a></li>";
            $('#selectCountyName').append(str);
        });
    }else{
        alert(data.rspCode + "   " + data.rspDesc);
    }
    pull_down_menu('#selectCountyName li','#county');
}

function selectCounty(id){
    //alert("555");
    countyId = id;
}



function changeState(state){
    //alert(state);
    //以下是修改状态时需要添加的修改说明
    //首先判断修改的选项是否与之前相同，如果相同就不修改
    //alert("opinion:"+$('#shopAssistantState').text());
    thisState = state;
    //新增页面暂时不用填写修改说明
    //ShowShelter();
    //$('.pop-layer1').show();
}

function saveOpinion(){
    //$("#changeText").val($("#opinion").val());
    HideShelter();
    $('.pop-layer').hide();
    $('#stateStr').text("审核意见："+$("#opinion").val());
    $("#opinion").val("");
}

function cancelOpinion(){
    HideShelter();
    $('.pop-layer').hide();
    $("#opinion").val("");
}


//店员级别只允许选择其中一项
function onlySelectOne(str){
    if(str=="superShopManager"){
        $('#childShopManager').prop('checked',false);
        $('#childShopEmployee').prop('checked',false);
        //商户管理员不允许选择网点
        $('#shop').attr('disabled',true);
        $('#wdname').text("");
        ShopId = "";
        softPosType="2";
  }else if(str=="childShopManager"){
        $('#superShopManager').prop('checked',false);
        $('#childShopEmployee').prop('checked',false);
        $('#shop').attr('disabled',false);
        softPosType="0";
    }else if(str=="childShopEmployee"){
        $('#superShopManager').prop('checked',false);
        $('#childShopManager').prop('checked',false);
        $('#shop').attr('disabled',false);
        softPosType="1";
    }
}

//选择商户和网点

//查询商户

function findSuperShop(){

    if($.cookie('branchType')==null){

        alert('您的登录分公司信息有误!');

        //window.location.href="./login.html";

    }else{

        var fgs="";

        if($.cookie('branchType')=='0'){

            fgs='';

        }else{

            fgs=$.cookie('branchID');

        }



        var json=new Object();

        json.branchId=fgs;

        json.pageSize=pagesize;

        json.currPage=pageCurrent;

        json.belongShopId="0";

        json.name=$("#shanghuName").val();

        var jsonPrama = {

            "marked" : "userInformation_findSuperShopByBranchID",

            "callbackparam" : "success_jsonpCallback",

            "jsonStr":JSON.stringify(json)

        };

        //alert('json=='+JSON.stringify(json));

        findData1(jsonPrama,callBack_Login);



    }

}

//查询商户

function callBack_Login(da){

    //alert('成功方法'+da.Code);
    $("#shjstbody").empty();

    if(da.Code=="000"){

        $.each(da.list,function(index,enty){

            //alert("gl"+enty.id);



            var rd="<tr><td >"+enty.name+"</td>";

            rd+="<td >"+enty.bran+"</td>";

            rd+="<td ><a href='#'onclick='xuzesh(\""+enty.id+"\",\""+enty.buss+"\",\""+enty.name+"\")'>选择</a> </td></tr>";

            $("#shjstbody").append(rd);
            //alert(enty.id+";"+enty.buss+";"+enty.name);

        });

        //haha();

    }else{

        alert(da.Mess);

    }

    IsCreatePage=false;

    if(!IsCreatePage)

    {

        IsCreatePage=true;

        $("#pageId").createPage({

            count:da.count,//总条数

            pageCount:Math.ceil(da.count/pagesize),//viewdata.TotalNum

            current:pageCurrent,

            backFn:function(p){

                pageCurrent=p;

                //单击回调方法，p是当前页码

                findSuperShop();

            }

        });

    }

    return;



}

function xuzesh(da,db,dc){

    //alert("选择了什么"+da+"**"+db);

    $("#shjs").hide();

    $("#shshow").html(dc);

    superId(da,db)

}

//选择了商户后方法

function superId(da,db){



    //var pay=$(da).data('pay');

    //var sell=$(da).data('sell');

    //alert("选择可用业务.."+$(da).data('value'))
    //
    //xuze(db.toString());



    ShopId="";

    $("#wdname").html("");

    superShopId=da;

    if(da!=""){

        $('#smallshopList').empty();

        var json=new Object();

        json.shopId=da;

        var jsonPrama = {

            "marked" : "userInformation_findChildShopBySuperShop",

            "callbackparam" : "success_jsonpCallback",

            "jsonStr":JSON.stringify(json)

        };

        //alert('json=='+JSON.stringify(json));

        findData1(jsonPrama,callBack_Login1);



    }else{

        alert('此商户id不正确!');

    }



}

//查询网点

function callBack_Login1(da){

    //alert("查询网点成功"+da);

    $('#smallshopList').empty();

    $.each(da.list,function(index,enty){

        //alert("商铺列表:"+enty.shopNumber);

        var rd='<li><a data-id='+enty.id+' data-shopnumber='+enty.shopNumber+' href=# onclick="shopId(this)">'+enty.name+'</a>';

        $('#smallshopList').append(rd);

    });
    pull_down_menu('#smallshopList li','#wdname');
    //haha();

}

function shopId(da){

    //alert($(da).data('id'));
    ShopId=$(da).data('id');
    $("#shopNumber").html("网点编号:"+$(da).data('shopnumber'));
}

function findData1(Str,callBack_Login){

    $.ajax({
        // 提交数据的类型 POST GET
        type : "POST",
        // async:false,
        // 提交的网址
        url : url,
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

        // 成功返回之后调用的函数
        success : function(data) {
            // alert("AJAX请求错误：请求状态码：");
            callBack_Login(data);
        },

        // 调用执行后调用的函数
        complete : function(XMLHttpRequest, textStatus) {
            // $("#btn_loading").css('display','none');
        },

        // 调用出错执行的函数
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            alert("AJAX请求错误：请求状态码：" + XMLHttpRequest.status + " readyState:"
                + XMLHttpRequest.readyState + "错误：" + textStatus);}

    });

}



//添加方法
function add(){

    var json=new Object();

    json.edit="0";//新增

    json.posId="";//新增，没有ID

    json.posType="2";//软POS

    json.softPosType=softPosType;//管理员权限

    json.posOwn="";//硬POS拥有者

    json.qOwn="";//硬POS扫码枪类型

    json.superShopId=superShopId;//商户ID

    json.ShopId=ShopId;//网点ID

    //json.posShopName=$("#posShopName").val();//POS显示网点名称

    json.posShopName="";//POS显示网点名称

    json.auStr=auStr;//POS渠道属性

    json.provinceId=provinceId.toString();//省ID

    json.cityId=cityId.toString();//市ID

    json.countyId=countyId.toString();//县ID

    json.state=thisState;//当前状态

    json.shopAssistantName=$('#shopAssistantName').val();//姓名

    json.shopAssistantNum="";//人员编号

    json.address=$('#address').val();//地址

    json.phoneNum=$('#phoneNum').val();//手机号

    json.terNum=$('#terminalNum').val().trim();//终端号


    var jsonPrama = {

        "marked" : "userInformation_addShopAssistantAndPos",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)};
     //alert("json:"+JSON.stringify(json));
    findData1(jsonPrama,callBack_addShopAssistantAndPos);

}

//添加POS后返回

function callBack_addShopAssistantAndPos(data){

    //alert(data.mess);

    if(data.rspCode=="000"){

        //location.href="./index.html";
       alert("成功");
        //window.location.reload();
        location.href="./UserInformation-Mgt.html";
    }else{
        alert(data.rspDesc);
    }

}

//检查必填项是否都填写了

function check(){

    auStr="";

    var tt=0;

    $.each($('input.zhifu[type="checkbox"]'),function(){

        auStr+="0";

    });

    $.each($('input.chengdui[type="checkbox"]'),function(){

        auStr+="0";

    });
    $.each($('input.yinhangka[type="checkbox"]'),function(){

        auStr+="0";

    });
    $.each($('input.daiding[type="checkbox"]'),function(){

        auStr+="0";

    });
    //alert("初始化权限"+auStr.length);

    $.each($('input.zhifu[type="checkbox"]'),function(){

        if($(this).is(':checked')){

            //alert('22');

            var indexs=$(this).data("index");

            //alert("顺序号"+indexs);

            //auStr[indexs]="1";

            auStr=replaceChar(auStr,indexs,"1");

            //alert("提交中"+auStr);
            tt++;

        }

    });
    $.each($('input.chengdui[type="checkbox"]'),function(){

        if($(this).is(':checked')){
            var indexs=$(this).data("index");
            auStr=replaceChar(auStr,indexs,"1");
            tt++;
        }
    });
    $.each($('input.yinhangka[type="checkbox"]'),function(){

        if($(this).is(':checked')){
            var indexs=$(this).data("index");
            auStr=replaceChar(auStr,indexs,"1");
            tt++;
        }
    });
    //alert("提交中"+auStr);


    //alert(tt+"个选中，那么是什么?"+auStr);

    //if(tt==0||$("#terminalNum").val()==""||$("#posShopName").val()==""){
        if(tt==0||$("#terminalNum").val()==""||$("#shopAssistantNum").val()==""){
        return '请将带*内容填写完整!';

    }
    //if(getRealLen($("#posShopName").val())>20){
    //    return "pos显示网点名称内容过长!";
    //}

        if(softPosType==""||superShopId==""||$("#phoneNum").val()==""){

            return '请将带*内容填写完整!';

        }
        if(!CheckIsMobile($("#phoneNum").val())){
            return '001';
        }
    //alert("32222222222222222"+thisState);
    //if(provinceId==""||cityId==""||countyId==""|| thisState==""){
    //    return "没有填写省市县或当前状态";
    //}
        if(softPosType!="2"){

            if(ShopId==""){

                return '请选择网点!';

            }
        }

    return '0';

}
