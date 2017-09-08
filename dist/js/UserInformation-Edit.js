/**
 * Created by WuZhenxin on 2016/3/8.
 */
//临时存储，用于开发测试，正式版去掉
// 存储一个带7天期限的 cookie
//$.cookie("branchID", "402890cd4e32fe28014e32fed9990001", {
//    expires : 7
//});
//$.cookie("branchType", "1", {
//    expries : 7
//});
//$.cookie("adminId", "ff808081508878ff015088c26209002d", {
//    expires : 7
//});
//$.cookie("adminName", "测试用户", {
//    expries : 7
//})
//以下均是列表页面的参数
//当前分页号码
var pageCurrent = 1;
//分页条数
var pagesize = 10;
//弹出框是否需要分页
var IsCreatePage=false;

//省ID
var provinceId = "";
//市ID
var cityId = "";
//县ID
var countyId = "";
//当前状态
var thisState = "";
//POS渠道属性
var auStr="";
//管理员级别
var softPosType="";
//商户ID
var superShopIdEdit="";
//网点ID
var ShopIdEdit="";
//省ID
var provinceIdEdit = "";
//市ID
var cityIdEdit = "";
//县ID
var countyIdEdit = "";
//当前状态
var thisStateEdit = "";
//管理员级别
var softPosTypeEdit="";
//本页管理员ID
var userIdEdit= "";
$(function(){
    $('#provincebutton').click(function (e) {
        findProvince();
    });
    $('#citybutton').click(function (e) {
        findCity();
    });
    $('#checkButton').click(function(e){
        findShopAssistantByCriteria(pageCurrent);
    });
    $('#closeButton').click(function(e){
        HideShelter();
        $('.pop-layer.poy-layer2').hide();
    });
    $('#provincebuttonedit').click(function (e) {
        findProvinceEdit();
    });
    $('#citybuttonedit').click(function (e) {
        findCityEdit();
    });
    $('#countybuttonedit').click(function (e) {
        findCountyEdit();
    });
    //选择商户和网点
    $("#shjsButtonedit").click(function(){
        //alert("333");
        $("#shjs").show();

    });
    $("#phoneNumedit").focusout(function (){
        var phoneNum = $("#phoneNumedit").val();
        if(phoneNum.length>8){
            phoneNum = phoneNum.substring(phoneNum.length-8);
        }
        $("#terminalNumedit").val(phoneNum);
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
    //导出按钮触发事件
    $("#outputButton").click(function(e){
        userInformation_findShopAssistantToExcel();
    });
    pull_down_menu('#selectStateedit li','#shopAssistantStateedit');




//渠道部分多选框的设定
    $('#zhifuAlledit').click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $('input.zhifu[type="checkbox"]:enabled').prop("checked",true);
            $("#weixinAlledit").html("全消");
            $("#baiduAlledit").html("全消");
            $("#jingdongAlledit").html("全消");
            $("#zhifubaoAlledit").html("全消");
            $("#dazhongshanhuiAlledit").html("全消");
            $("#yizhifuAlledit").html("全消");
            $("#otherAlledit").html("全消");
            $("#tongyiAlledit").html("全消");
            $("#QQAlledit").html("全消");
            $("#xianjinAlledit").html("全消");
        }else{
            $(this).html("全选");
            $('input.zhifu[type="checkbox"]:enabled').prop("checked",false);
            $("#weixinAlledit").html("全选");
            $("#baiduAlledit").html("全选");
            $("#jingdongAlledit").html("全选");
            $("#zhifubaoAlledit").html("全选");
            $("#dazhongshanhuiAlledit").html("全选");
            $("#yizhifuAlledit").html("全选");
            $("#otherAlledit").html("全选");
            $("#tongyiAlledit").html("全选");
            $("#QQAlledit").html("全选");
            $("#xianjinAlledit").html("全选");
        }

    });

    $('#tuangouAlledit').click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $('input.tuangou[type="checkbox"]:enabled').prop("checked",true);
        }else {
            $(this).html("全选");
            $('input.tuangou[type="checkbox"]:enabled').prop("checked", false);
        }
    });

    $('#dazhongdianpingAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#dazhongdianpingYanzhengedit").prop("checked",true);
            $("#dazhongdianpingChexiaoedit").prop("checked",true);
            $("#dazhongdianpingDingdanquerenedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#dazhongdianpingYanzhengedit").prop("checked",false);
            $("#dazhongdianpingChexiaoedit").prop("checked",false);
            $("#dazhongdianpingDingdanquerenedit").prop("checked",false);
        }
    });

    $('#meituanAll2edit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#meituanYanzhengedit").prop("checked",true);
            $("#meituanChexiaoedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#meituanYanzhengedit").prop("checked",false);
            $("#meituanChexiaoedit").prop("checked",false);
        }
    });

    $('#weixinAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#weixinZhusaoedit").prop("checked",true);
            $("#weixinBeisaoedit").prop("checked",true);
            $("#weixinTuihuoedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#weixinZhusaoedit").prop("checked",false);
            $("#weixinBeisaoedit").prop("checked",false);
            $("#weixinTuihuoedit").prop("checked",false);
        }
    });

    $('#zhifubaoAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#zhibubaoZhusaoedit").prop("checked",true);
            $("#zhifubaoBeisaoedit").prop("checked",true);
            $("#zhibubaoTuihuoedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#zhibubaoZhusaoedit").prop("checked",false);
            $("#zhifubaoBeisaoedit").prop("checked",false);
            $("#zhibubaoTuihuoedit").prop("checked",false);
        }
    });

    $('#baiduAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#baiduZhusaoedit").prop("checked",true);
            $("#baiduBeisaoedit").prop("checked",true);
            $("#baiduTuihuoedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#baiduZhusaoedit").prop("checked",false);
            $("#baiduBeisaoedit").prop("checked",false);
            $("#baiduTuihuoedit").prop("checked",false);
        }
    });

    $('#jingdongAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#jingdongZhusaoedit").prop("checked",true);
            $("#jingdongBeisaoedit").prop("checked",true);
            $("#jingdongTuihuoedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#jingdongZhusaoedit").prop("checked",false);
            $("#jingdongBeisaoedit").prop("checked",false);
            $("#jingdongTuihuoedit").prop("checked",false);
        }
    });

    $('#QQAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#QQZhusaoedit").prop("checked",true);
            $("#QQBeisaoedit").prop("checked",true);
            $("#QQTuihuoedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#QQZhusaoedit").prop("checked",false);
            $("#QQBeisaoedit").prop("checked",false);
            $("#QQTuihuoedit").prop("checked",false);
        }
    });

    $('#dazhongshanhuiAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#dazhongshanhuiZhusaoedit").prop("checked",true);
            $("#dazhongshanhuiBeisaoedit").prop("checked",true);
            $("#dazhongshanhuiTuihuoedit").prop("checked",true);
            $('#dazhongshanhuiDingdanquerenedit').prop("checked",true);
        }else {
            $(this).html("全选");
            $("#dazhongshanhuiZhusaoedit").prop("checked",false);
            $("#dazhongshanhuiBeisaoedit").prop("checked",false);
            $("#dazhongshanhuiTuihuoedit").prop("checked",false);
            $('#dazhongshanhuiDingdanquerenedit').prop("checked",false);
        }
    });

    $('#meituanAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#meituanZhusaoedit").prop("checked",true);
            $("#meituanBeisaoedit").prop("checked",true);
            $("#meituanTuihuoedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#meituanZhusaoedit").prop("checked",false);
            $("#meituanBeisaoedit").prop("checked",false);
            $("#meituanTuihuoedit").prop("checked",false);
        }
    });

    $('#yizhifuAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#yizhufuZhusaoedit").prop("checked",true);
            $("#yizhifuBeisaoedit").prop("checked",true);
            $("#yizhifuTuihuoedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#yizhufuZhusaoedit").prop("checked",false);
            $("#yizhifuBeisaoedit").prop("checked",false);
            $("#yizhifuTuihuoedit").prop("checked",false);
        }
    });

    $('#tongyiAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#tongyiZhusaoedit").prop("checked",true);
            $("#tongyiBeisaoedit").prop("checked",true);
            $("#tongyiTuihuoedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#tongyiZhusaoedit").prop("checked",false);
            $("#tongyiBeisaoedit").prop("checked",false);
            $("#tongyiTuihuoedit").prop("checked",false);
        }
    });

    $('#otherAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#panjintongedit").prop("checked",true);
            $("#canceledit").prop("checked",true);
            $("#koubeitejiaedit").prop("checked",true);
            $("#yunxujiesuanedit").prop("checked",true)
        }else {
            $(this).html("全选");
            $("#panjintongedit").prop("checked",false);
            $("#canceledit").prop("checked",false);
            $("#koubeitejiaedit").prop("checked",false);
            $("#yunxujiesuanedit").prop("checked",false);
        }
    });

    $('#chengduiquanxianAlledit').click(function() {
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

    $('#yinhangkaquanxianAlledit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $('input.yinhangka[type="checkbox"]:enabled').prop("checked",true);
            $("#yinhangkaquanxianedit").html("全消");
            $("#yinhangkayushouquanquanxianedit").html("全消");
            $("#yinhangkajifenquanxianedit").html("全消");
        }else{
            $(this).html("全选");
            $("#yinhangkaquanxianedit").html("全选");
            $("#yinhangkayushouquanquanxianedit").html("全选");
            $("#yinhangkajifenquanxianedit").html("全选");
            $('input.yinhangka[type="checkbox"]:enabled').prop("checked",false);
        }
    });

    $('#chengduiquanxianedit').click(function() {
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#quanmachengduiedit").prop("checked",true);
            $("#shoujihaochengduiedit").prop("checked",true);
            $("#yinhangkahaochengduiedit").prop("checked",true);
            $("#meituanchengduiedit").prop("checked",true);
            $("#dianpingchengduiedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#quanmachengduiedit").prop("checked",false);
            $("#shoujihaochengduiedit").prop("checked",false);
            $("#yinhangkahaochengduiedit").prop("checked",false);
            $("#meituanchengduiedit").prop("checked",false);
            $("#dianpingchengduiedit").prop("checked",false);
        }
    });

    $("#xianjinAlledit").click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#xianjinJizhangedit").prop("checked",true);
            $("#xianjinXiaozhangedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#xianjinJizhangedit").prop("checked",false);
            $("#xianjinXiaozhangedit").prop("checked",false);
        }
    });

    $("#yinhangkaquanxianedit").click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#yinhangkaxiaofeiedit").prop("checked",true);
            $("#yinhangkachexiaoedit").prop("checked",true);
            $("#yinhangkatuihuoedit").prop("checked",true);
            $("#yinbhangkayuechaxunedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#yinhangkaxiaofeiedit").prop("checked",false);
            $("#yinhangkachexiaoedit").prop("checked",false);
            $("#yinhangkatuihuoedit").prop("checked",false);
            $("#yinbhangkayuechaxunedit").prop("checked",false);
        }
    });

    $("#yinhangkayushouquanquanxianedit").click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#yinhangkayushouquanedit").prop("checked",true);
            $("#yushouquanchexiaoedit").prop("checked",true);
            $("#yushouquanwanchengedit").prop("checked",true);
            $("#yushouquanwanchengchexiaoedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#yinhangkayushouquanedit").prop("checked",false);
            $("#yushouquanchexiaoedit").prop("checked",false);
            $("#yushouquanwanchengedit").prop("checked",false);
            $("#yushouquanwanchengchexiaoedit").prop("checked",false);
        }
    });

    $("#yinhangkajifenquanxianedit").click(function(){
        if($(this).html()=="全选"){
            $(this).html("全消");
            $("#yinhangkajifenxiaofeiedit").prop("checked",true);
            $("#yinhangkajifenchexiaoedit").prop("checked",true);
            $("#yinhangkajifentuihuoedit").prop("checked",true);
            $("#yinhangkajifenchaxunedit").prop("checked",true);
        }else {
            $(this).html("全选");
            $("#yinhangkajifenxiaofeiedit").prop("checked",false);
            $("#yinhangkajifenchexiaoedit").prop("checked",false);
            $("#yinhangkajifentuihuoedit").prop("checked",false);
            $("#yinhangkajifenchaxunedit").prop("checked",false);
        }
    });

    $('#closeButton').click(function(e){
        //HideShelter();
        //$('.pop-layer.poy-layer2').hide();
        location.href="./UserInformation-Mgt.html";
    });





});

editByID(request.QueryString("id"));





function findProvince(){
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
    //alert("3333");
    if(data.rspCode=="000"){
        $('#selectProvinceName').text("");
        $('#selectCityName').text("");
        $("#city").text("--");
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

function changeState(state){
    //alert(state);
    //以下是修改状态时需要添加的修改说明
    //首先判断修改的选项是否与之前相同，如果相同就不修改

    if(thisStateEdit!=state){
        ShowShelter();
        $('.pop-layer').show();
    }
    thisStateEdit = state;
    //alert("opinion:"+$('#shopAssistantStateedit').text());
}

function findShopAssistantByCriteria(p){

        var json=new Object();

        json.pageSize=pagesize.toString();

        json.curragePage= p.toString();

        json.shopAssistantNum = $("#shopAssistantNum").val();

        json.shopAssistantName = $('#shopAssistantName').val();

        json.phoneNum = $('#phoneNum').val();

        json.address = $('#address').val();

        json.dateStr = $("#dateStr").val();

        json.provinceId = provinceId.toString();//省ID

        json.cityId = cityId.toString();//市ID

        json.state = thisState.toString();//当前状态

        var jsonPrama = {

            "marked" : "userInformation_findShopAssistantByCriteria",

            "callbackparam" : "success_jsonpCallback",

            "jsonStr":JSON.stringify(json)

        };

        //alert('json=='+JSON.stringify(json));

        findData1(jsonPrama,callBack_findShopAssistantByCriteria);

    //}
}

//查询商户

function callBack_findShopAssistantByCriteria(da){

    //alert('成功方法'+da.rspCode );
    $("#table tbody").empty();

    if(da.rspCode=="000"){
        //$("#table tbody").append(' <tr> <td><input type="checkbox">&nbsp;175</td> <td>张学友</td> <td>13800138000</td> <td>自定义</td> <td>总部</td> <td>总部</td> <td>总部</td> <td><span class="label label-danger">停用</span></td> <td> <label class="label label-info ">修改&nbsp;<i class="fa fa-edit"></i></label> <label class="label label-info   ">查看&nbsp;<i class="fa  fa-building-o"></i></label> <label class="label label-info ">支付配置&nbsp;<i class="fa  fa-cc-visa"></i></label> </td> </tr>');
        $.each(da.list,function(index,enty){

            //alert("gl"+enty.id);

            var rd="<tr><td >"+enty.Sequence+"</td>";

            rd+="<td >"+enty.shopAssistantNum+"</td>";

            rd+="<td onclick='checkByID(\""+enty.userId+"\")'><a href=\"#\">"+enty.shopAssistantName+"</a></td>";

            rd+="<td >"+enty.shopAssistantRole+"</td>";

            rd+="<td >"+enty.shopAssistantPhone+"</td>";

            rd+="<td >"+enty.provinceName+"</td>";

            rd+="<td >"+enty.cityName+"</td>";

            rd+="<td >"+enty.shopAssistantAddress+"</td>";

            rd+="<td >"+enty.state+"</td>";

            //rd+="<td >"+enty.userId+"</td>";

            rd+="<td><label class='label label-info ' onclick='editByID(\""+enty.userId+"\")'>修改&nbsp;<i class='fa fa-edit' onclick='editByID(\""+enty.userId+"\")'></i></label> </td></tr>";

            $("#table tbody").append(rd);
            //alert(enty.id+";"+enty.buss+";"+enty.name);

        });

        //haha();

    }else{

        alert(da.rspDesc);

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

                //findSuperShop()
                findShopAssistantByCriteria(p);
            }

        });

    }

    return;

}

function userInformation_findShopAssistantToExcel(p){

    var json=new Object();

    json.shopAssistantNum = $("#shopAssistantNum").val();

    json.shopAssistantName = $('#shopAssistantName').val();

    json.phoneNum = $('#phoneNum').val();

    json.address = $('#address').val();

    json.dateStr = $("#dateStr").val();

    json.provinceId = provinceId.toString();//省ID

    json.cityId = cityId.toString();//市ID

    json.state = thisState.toString();//当前状态

    var jsonPrama = {

        "marked" : "userInformation_findShopAssistantToExcel",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callBack_findShopAssistantToExcel);

    //}
}

function callBack_findShopAssistantToExcel(data){
    if(data.code==000){
        //location.href ="agentManagement.html";
        window.open(data.url) ;
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}

function saveOpinion(){
    //$("#changeText").val($("#opinion").val());
    HideShelter();
    $('.pop-layer').hide();
    $('#stateStredit').text("审核意见:"+$("#opinionedit").val());
    $("#opinionedit").val("");
}

function cancelOpinion(){
    HideShelter();
    $('.pop-layer').hide();
    $("#opinionedit").val("");
    //如果取消，则恢复之前的设置
    if(thisStateEdit==1){
        thisStateEdit=0;
        $("#shopAssistantStateedit").html("停用");
    }else{
        thisStateEdit=1;
        $("#shopAssistantStateedit").html("启用");
    }
}

//进入查看页面
function checkByID(id){
    //alert("userId:"+id);
    //location.href="./UserInformation-Check.html?id="+id+"";

    //ShowShelter();
    //$('.pop-layer.poy-layer2').show();
    var json=new Object();

    json.userId=id;
    var jsonPrama = {

        "marked" : "userInformation_getShopAssistantById",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callBack_getShopAssistantById);
}

//查看页面回调函数
function callBack_getShopAssistantById(da){

    //alert('成功方法'+da.shopAssistantNum);
    if(da.rspCode=="000"){
        $("#shopAssistantNumcheck").val(da.shopAssistantNum);
        $("#shopAssistantNamecheck").val(da.shopAssistantName);
        $("#provincecheck").html(da.provinceName);
        $("#citycheck").html(da.cityName);
        $("#countycheck").html(da.countyName);
        var state = da.state;
        if("0"==state){
            state = "停用";
        }else if("1"==state){
            state = "启用";
        }else if("2"==state){
            state = "合同到期";
        }
        $("#shopAssistantStatecheck").html(state);
        $("#addresscheck").val(da.address);
        $("#phoneNumcheck").val(da.phoneNum);
        $("#terminalNumcheck").val(da.terNum);
        //$("#posShopNamecheck").val(da.posShopName);
        $("#changeTextcheck tbody").empty();
         $.each(da.list,function(index,enty){

            //alert("gl"+enty.shopAssistantViewID);

            var rd="<tr><td >"+(index+1)+"</td>";

            rd+="<td>"+enty.createDate+"</td>";

             rd+="<td >"+enty.view+"</td>";

            rd+="<td >"+enty.adminId+"</td>";

            rd+="<td >"+enty.adminName+"</td></tr>";

            $("#changeTextcheck tbody").append(rd);
        });
        //管理员权限初始化清零
        $('input[type="checkbox"]').prop("checked",false);
        $("#shjsButtoncheck").html(da.superShopName);
        $("#wdnamecheck").html(da.shopName)
        var softPosType = da.softPosType;
        if("contraAdmin"==softPosType){
            softPosType = "商铺管理员";
            $("#superShopManagercheck").prop("checked",true);
            $('#shopcheck').attr('disabled',true);
            $('#wdnamecheck').text("");
        }else if("shopAdmin"==softPosType){
            softPosType = "网点管理员";
            $("#childShopManagercheck").prop("checked",true);
        }else if("shopBusiness"==softPosType){
            softPosType = "网点业务员";
            $("#childShopEmployeecheck").prop("checked",true);
        }

        var auStr = da.auStr;
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
        //haha();

    }else{

        alert(da.rspDesc);

    }

    //IsCreatePage=false;
    //
    //if(!IsCreatePage)
    //
    //{
    //
    //    IsCreatePage=true;
    //
    //    $("#pageId").createPage({
    //
    //        count:da.count,//总条数
    //
    //        pageCount:Math.ceil(da.count/pagesize),//viewdata.TotalNum
    //
    //        current:pageCurrent,
    //
    //        backFn:function(p){
    //
    //            pageCurrent=p;
    //
    //            //单击回调方法，p是当前页码
    //
    //            //findSuperShop()
    //            findShopAssistantByCriteria(p);
    //        }
    //
    //    });
    //
    //}

    return;

}

//进入修改页面
function editByID(id){
    //alert("userId:"+id);
    //ShowShelter();
    //$('.pop-layer.poy-layer3').show();

    var json=new Object();

    json.userId=id;
   userIdEdit = request.QueryString("id");
    var jsonPrama = {

        "marked" : "userInformation_getShopAssistantById",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callBack_getShopAssistantByIdEdit);

}
//修改页面回调函数
//查看页面回调函数
function callBack_getShopAssistantByIdEdit(da){

    //alert('成功方法'+da);
    //findProvinceEdit();
    if(da.rspCode=="000"){
        $("#shopAssistantNumedit").val(da.shopAssistantNum);
        $("#shopAssistantNameedit").val(da.shopAssistantName);
        $("#provinceedit").html(da.provinceName);
        $('#provinceedit').attr("data-value",da.provinceId);
        provinceIdEdit = da.provinceId;
        $("#cityedit").html(da.cityName);
        $('#cityedit').attr("data-value",da.cityId);
        cityIdEdit = da.cityId;
        $("#countyedit").html(da.countyName);
        $('#countyedit').attr("data-value",da.countyId);
        countyIdEdit = da.countyId;
        var state = da.state;
        thisStateEdit = state;
        if("0"==state){
            state = "停用";
        }else if("1"==state){
            state = "启用";
        }else if("2"==state){
            state = "合同到期";
        }
        $("#shopAssistantStateedit").html(state);
        $("#addressedit").val(da.address);
        $("#phoneNumedit").val(da.phoneNum);
        $("#terminalNumedit").val(da.terNum);
        //$("#posShopNameedit").val(da.posShopName);
        $("#changeTextedit tbody").empty();
        $.each(da.list,function(index,enty){

            //alert("gl"+enty.shopAssistantViewID);

            var rd="<tr><td >"+(index+1)+"</td>";

            rd+="<td>"+enty.createDate+"</td>";

            rd+="<td >"+enty.view+"</td>";

            rd+="<td >"+enty.adminId+"</td>";

            rd+="<td >"+enty.adminName+"</td></tr>";

            $("#changeTextedit tbody").append(rd);
        });
        //管理员权限初始化清零
        $('input[type="checkbox"]').prop("checked",false);
        $("#shjsButtonedit").html(da.superShopName);
        $("#wdnameedit").html(da.shopName);
        superShopIdEdit = da.superShopId;
        ShopIdEdit = da.shopId;
        var softPosType = da.softPosType;
        if("contraAdmin"==softPosType){
            softPosType = "商铺管理员";
            $("#superShopManageredit").prop("checked",true);
            $('#shopedit').attr('disabled',true);
            $('#wdnameedit').text("");
            softPosTypeEdit="2";
            ShopIdEdit="";


        }else if("shopAdmin"==softPosType){
            softPosType = "网点管理员";
            $("#childShopManageredit").prop("checked",true);
            $('#shopedit').attr('disabled',false);
            softPosTypeEdit="0";
        }else if("shopBusiness"==softPosType){
            softPosType = "网点业务员";
            $("#childShopEmployeeedit").prop("checked",true);
            $('#shopedit').attr('disabled',false);
            softPosTypeEdit="1";

        }
        var auStr = da.auStr;
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
        //haha();
        //查找省份
    }else{

        alert(da.rspDesc);

    }

    return;

}

//查询手机号码唯一性

function findProvinceEdit(){
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

    findData1(jsonPrama,callback_findProvinceEdit);

}

function callback_findProvinceEdit(data){

    if(data.rspCode=="000"){
        $('#selectProvinceNameedit').text("");
        $('#selectCityNameedit').text("");
        $("#cityedit").text("--");
        $('#selectCountyNameedit').text("");
        $("#countyedit").text("--");

        //$('#selectProvinceName').html("<li><a href=\"#\">全部</a></li>");
        $.each(data.list,function(entryIndex, entry){
            var str="<li ><a  href=\"#\">" +entry.name + "</a></li>";
            var str =   "<li data-value='"+entry.id+"'><a href='#' onclick='selectProvinceEdit("+entry.id+")'>"+entry.name+"</a></li>";
            //var str =   "<li data-value='"+entry.id+"'onclick='selectProvince("+entry.id+")'>"+entry.name+"</li>";
            $('#selectProvinceNameedit').append(str);
        });

    }else{
        alert(data.rspCode + "   " + data.rspDesc);
    }
    pull_down_menu('#selectProvinceNameedit li','#provinceedit');
    pull_down_menu('#selectStateedit li','#shopAssistantStateedit');
    //findSuperShopByBranchID();
}

function selectProvinceEdit(id){
    provinceIdEdit = id;
}

function findCityEdit(){
//alert("33");
    var json=new Object();


    if($('#provinceedit').attr("data-value")=="--"){
        return;
    }
    json.level = "2";
    json.parentID = $('#provinceedit').attr("data-value");
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

    findData1(jsonPrama,callback_findCityEdit);

}

function callback_findCityEdit(data){
    if(data.rspCode=="000"){
        $('#selectCityNameedit').text("");
        $('#selectCountyNameedit').text("");
        $("#countyedit").text("--");
        $.each(data.list,function(entryIndex, entry){
            var str="<li ><a  href=\"#\">" +entry.name + "</a></li>";
            var str = "<li data-value='"+entry.id+"'><a href='#' onclick='selectCityEdit("+entry.id+")'>"+entry.name+"</a></li>";
            $('#selectCityNameedit').append(str);
        });
    }else{
        alert(data.rspCode + "   " + data.rspDesc);
    }
    pull_down_menu('#selectCityNameedit li','#cityedit');
}

function selectCityEdit(id){
    //alert("555");
    cityIdEdit = id;
}

function findCountyEdit(){
//alert("33");
    var json=new Object();


    if($('#cityedit').attr("data-value")=="--"){
        return;
    }
    json.level = "3";
    json.parentID = $('#cityedit').attr("data-value");
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

    findData1(jsonPrama,callback_findCountyEdit);

}

function callback_findCountyEdit(data){

    if(data.rspCode=="000"){
        $('#selectCountyNameedit').text("");

        $.each(data.list,function(entryIndex, entry){
            var str="<li ><a  href=\"#\">" +entry.name + "</a></li>";
            var str = "<li data-value='"+entry.id+"'><a href='#' onclick='selectCountyEdit("+entry.id+")'>"+entry.name+"</a></li>";
            $('#selectCountyNameedit').append(str);
        });
    }else{
        alert(data.rspCode + "   " + data.rspDesc);
    }
    pull_down_menu('#selectCountyNameedit li','#countyedit');
}

function selectCountyEdit(id){
    //alert("555");
    countyIdEdit = id;
}


//店员级别只允许选择其中一项
function onlySelectOne(str){
    if(str=="superShopManager"){
        $('#childShopManageredit').prop('checked',false);
        $('#childShopEmployeeedit').prop('checked',false);
        //商户管理员不允许选择网点
        $('#shopedit').attr('disabled',true);
        $('#wdnameedit').text("");
        ShopIdEdit="";
        softPosTypeEdit="2";
    }else if(str=="childShopManager"){
        $('#superShopManageredit').prop('checked',false);
        $('#childShopEmployeeedit').prop('checked',false);
        $('#shopedit').attr('disabled',false);
        softPosTypeEdit="0";
    }else if(str=="childShopEmployee"){
        $('#superShopManageredit').prop('checked',false);
        $('#childShopManageredit').prop('checked',false);
        $('#shopedit').attr('disabled',false);
        softPosTypeEdit="1";
    }
}

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



    ShopIdEdit="";

    $("#wdnameedit").html("");

    superShopIdEdit=da;

    if(da!=""){

        $('#smallshopListedit').empty();

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

    $('#smallshopListedit').empty();

    $.each(da.list,function(index,enty){

        //alert("商铺列表:"+enty.name);

        //var rd='<li><a data-id='+enty.id+' href=# onclick="shopId(this)">'+enty.name+'</a>';
        var rd='<li><a data-id='+enty.id+' data-shopnumber='+enty.shopNumber+' href=# onclick="shopId(this)">'+enty.name+'</a>';
        $('#smallshopListedit').append(rd);

    });
    pull_down_menu('#smallshopListedit li','#wdnameedit');
    //haha();

}

function shopId(da){

    //alert($(da).data('id'));

    ShopIdEdit=$(da).data('id');
    $("#shopNumber").html("网点编号:"+$(da).data('shopnumber'));
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
    $.each($('input.daiding[type="checkbox"]'),function(){

        auStr+="0";

    });
    $.each($('input.yinhangka[type="checkbox"]'),function(){

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

    if(tt==0||$("#terminalNumedit").val()==""){

        return '请将带*内容填写完整!';

    }
    //if(getRealLen($("#posShopNameedit").val())>20){
    //    return "pos显示网点名称内容过长!";
    //}

    if(softPosTypeEdit==""||superShopIdEdit==""||$("#phoneNumedit").val()==""){
        return '请将带*内容填写完整!';

    }
    if(!CheckIsMobile($("#phoneNumedit").val())){
        return '001';
    }
    //alert(provinceIdEdit+";"+cityIdEdit+";"+countyIdEdit+";"+thisStateEdit);
    if(provinceIdEdit==""||cityIdEdit==""||countyIdEdit==""|| thisStateEdit==null){

        return "没有填写省市县或当前状态";
    }
    if(softPosTypeEdit!="2"){

        if(ShopIdEdit==""){

            return '请选择网点!';

        }
    }

    return '0';

}

//添加方法
function add(){

    var json=new Object();

    json.edit="1";//修改

    json.posId=userIdEdit;//新增，没有ID

    json.posType="2";//软POS

    json.softPosType=softPosTypeEdit;//管理员权限

    json.posOwn="";//硬POS拥有者

    json.qOwn="";//硬POS扫码枪类型

    json.superShopId=superShopIdEdit;//商户ID

    json.ShopId=ShopIdEdit;//网点ID

    //json.posShopName=$("#posShopNameedit").val();//POS显示网点名称

    json.posShopName="";//POS显示网点名称

    json.auStr=auStr;//POS渠道属性

    json.provinceId=provinceIdEdit.toString();//省ID

    json.cityId=cityIdEdit.toString();//市ID

    json.countyId=countyIdEdit.toString();//县ID

    json.state=thisStateEdit.toString();//当前状态

    json.shopAssistantName=$('#shopAssistantNameedit').val();//姓名

    json.shopAssistantNum=$('#shopAssistantNumedit').val();//人员编号

    json.address=$('#addressedit').val();//地址

    json.phoneNum=$('#phoneNumedit').val();//手机号

    json.terNum=$('#terminalNumedit').val().trim();//终端号

    json.adminId = $.cookie('userID');//用户名

    json.adminName = $.cookie('userName');//用户ID

    if($("#stateStredit").text()==null || $("#stateStredit").text()==""){
        json.view = "";//状态更改说明
    }else{
        json.view = $("#stateStredit").text().split(":")[1];//状态更改说明

    }

    //alert("666");
    var jsonPrama = {

        "marked" : "userInformation_editShopAssistantAndPos",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)};
    //alert("json:"+JSON.stringify(json));
    findData1(jsonPrama,callBack_editShopAssistantAndPos);

}

//添加POS后返回

function callBack_editShopAssistantAndPos(data){

    //alert(data.mess);

    if(data.rspCode=="000"){

        //location.href="./index.html";
        alert("成功");
        location.href="./UserInformation-Mgt.html";
    }else{
        alert(data.rspDesc);
    }

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