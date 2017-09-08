/**
 * Created by WuZhenxin on 2016/3/12.
 */
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

$(function() {
    //选择商户和网点
    $("#shjsButton").click(function(){
        $("#shjs").show();

    });
    //商户检索按键-查询
    $("#jssh").click(function(){
        pageCurrent = 1;
        findSuperShop();
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
            $("#chengduiquanxian").html("全消");
            $('input.chengdui[type="checkbox"]:enabled').prop("checked",true);
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
        return false;
    });

});

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
        //alert('fgs=='+fgs);



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

        findData(jsonPrama,callBack_Login);



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

var da1;
var db1;
function xuzesh(da,db,dc){

    //alert("选择了什么"+da+"**"+db);

    $("#shjs").hide();

    $("#shshow").html(dc);
    da1 = da;
    db1 = db;

    var json=new Object();

    json.shopId=da;



    var jsonPrama = {

        "marked" : "posMenu_findShopAssistantByShop",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };
    //findData(jsonPrama,getSuperShopAssistantById);
    superId(da1,db1);




}


function getSuperShopAssistantById(data){
    if(data.rspCode=="000") {

        var auStr = data.auStr;
        //alert(auStr);
        //如果商户没有选择渠道，默认全部选择
        if(auStr==""||auStr==null){
            $.each($('input.zhifu[type="checkbox"]'),function(){
                var indexs=$(this).data("index");
                $(this).prop("checked",true);
            });
            $.each($('input.chengdui[type="checkbox"]'),function(){
                var indexs=$(this).data("index");
                $(this).prop("checked",true);
            });
        }else{
            $.each($('input.zhifu[type="checkbox"]'),function(){
                var indexs=$(this).data("index");
                //alert("顺序号"+indexs);
                var flag =auStr.substr(indexs,1);
                //alert('22:'+flag);
                if(flag==0){
                    $(this).prop("checked",false);
                }else{
                    $(this).prop("checked",true);
                }
            });
            $.each($('input.chengdui[type="checkbox"]'),function(){

                var indexs=$(this).data("index");
                //alert("顺序号"+indexs);
                var flag =auStr.substr(indexs,1);
                //alert('22:'+flag);
                if(flag==0){
                    $(this).prop("checked",false);
                }else{
                    $(this).prop("checked",true);
                }
            });
        }

        superId(da1,db1);
    }
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

        findData(jsonPrama,callBack_Login1);



    }else{

        alert('此商户id不正确!');

    }



}

//查询网点

function callBack_Login1(da){

    //alert("查询网点成功"+da);

    $('#smallshopList').empty();

    $.each(da.list,function(index,enty){

        //alert("商铺列表:"+enty.name);

        //var rd='<li><a data-id='+enty.id+' href=# onclick="shopId(this)">'+enty.name+'</a>';
        var rd='<li><a data-id='+enty.id+' data-shopnumber='+enty.shopNumber+' href=# onclick="shopId(this)">'+enty.name+'</a>';
        $('#smallshopList').append(rd);

    });
    pull_down_menu('#smallshopList li','#wdname');
    //haha();

}

function shopId(da){



    ShopId=$(da).data('id');
    $("#shopNumber").html("网点编号:"+$(da).data('shopnumber'));
    //alert(ShopId);

    var json=new Object();

    json.shopId= ShopId;

    var jsonPrama = {

        "marked" : "posMenu_findShopAssistantByShop",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };
    findData(jsonPrama,getShopAssistantById);

}


function getShopAssistantById(data){
    if(data.rspCode=="000") {

        var auStr = data.auStr;
        //alert(auStr);
        //如果网点没有选择渠道，默认为空

        if(auStr==""||auStr==null){
            $.each($('input.zhifu[type="checkbox"]'),function(){
                var indexs=$(this).data("index");
                $(this).prop("checked",false);
            });
            $.each($('input.chengdui[type="checkbox"]'),function(){
                var indexs=$(this).data("index");
                $(this).prop("checked",false);
            });
            $.each($('input.yinhangka[type="checkbox"]'),function(){
                var indexs=$(this).data("index");
                $(this).prop("checked",false);
            });
        }else{
            $.each($('input.zhifu[type="checkbox"]'),function(){
                var indexs=$(this).data("index");
                //alert("顺序号"+indexs);
                var flag =auStr.substr(indexs,1);
                //alert('22:'+flag);
                if(flag==0){
                    $(this).prop("checked",false);
                }else{
                    $(this).prop("checked",true);
                }
            });
            $.each($('input.chengdui[type="checkbox"]'),function(){

                var indexs=$(this).data("index");
                //alert("顺序号"+indexs);
                var flag =auStr.substr(indexs,1);
                //alert('22:'+flag);
                if(flag==0){
                    $(this).prop("checked",false);
                }else{
                    $(this).prop("checked",true);
                }
            });
            $.each($('input.yinhangka[type="checkbox"]'),function(){

                var indexs=$(this).data("index");
                //alert("顺序号"+indexs);
                var flag =auStr.substr(indexs,1);
                //alert('22:'+flag);
                if(flag==0){
                    $(this).prop("checked",false);
                }else{
                    $(this).prop("checked",true);
                }
            });
        }

        superId(da,db);
    }else{
        alert("查不到网点名下的POS");
    }
}

function findData(Str,callBack_Login){

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
    //alert(tt+"个选中，那么是什么?"+auStr);
    if(tt==0 ||superShopId=="" || superShopId==null){

        return '请将带*内容填写完整!';

    }

    return '0';

}

//添加方法
function add(){

    var json=new Object();

    json.superShopId=superShopId;//商户ID

    json.ShopId=ShopId;//网点ID

    json.auStr=auStr;//POS渠道属性


    json.isAllShop = $("#isAllShop").is(':checked')==true?"1":"0";

    json.isAllPOS = $("#isAllPOS").is(':checked')==true?"1":"0";

    if(json.isAllShop=="0"){
        alert("适用于所有门店必须打勾！");
        return;
    }
    if(json.isAllPOS=="0"){
        alert("适用于所有终端必须打勾！");
        return;
    }
    var jsonPrama = {

        "marked" : "posMenu_setPosBusiness",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)};
    //alert("json:"+JSON.stringify(json));
    findData(jsonPrama,callBack_setPosBusiness);

}

//添加POS后返回

function callBack_setPosBusiness(data){

    //alert(data.mess);

    if(data.rspCode=="000"){


        alert("成功");
        //location.href="./index.html";
        window.location.reload();
        //location.href="./UserInformation-Mgt.html";
    }else if(data.rspCode=="-101"){
        alert("没有查到对应的商户管理员");
    }else if(data.rspCode=="-102"){
        alert("没有查到对应的网点管理员");
    }else{
        alert("没有查到对应的POS");
    }

}