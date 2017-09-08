/**
 * Created by lisa on 2016/8/5.
 */
var selectORexport;
$(function(){
    if($.cookie("agentId_d")==null){
        parent.ssaa();
    }

    var i=3;//当代理级别为3时
    var a;//当前的代理级别
    if($.cookie("userType_d")=="firstAgentAdmin"){
        a=1;
    }
    if($.cookie("userType_d")=="seoundAgentAdmin"){
        a=2;
    }
    if($.cookie("userType_d")=="thirdAgentAdmin"){
        a=3;
    }
    $('#agentLevellist').append("<option  data-value=\"0\">全部</option>");
    for(var j=0;j<i-a;j++){
        $('#agentLevellist').append("<option data-value=\""+(i-j)+"\">"+(i-j)+"级</option>");
    }
    gettime();

    $('#shjsBut').click(function(){
        $("#shjs").show();
    });
    $('#jssh').click(function () {
        //alert("aa");
        pageCurrent = 1;
        findShop();
    });
    $('#wangdianbtn').click(function () {
        if ($("#shopNameText").val() == "") {
            alert("请先选择商户");
            return;
        }
    });
    $('#agentLocationbutton').click(function () {
        if ($("#agentLevellist").find("option:selected").attr("data-value")=="0") {
            alert("请先选择代理商级别！");
            return;
        }
    });
    $('#select').click(function () {
        pageCurrent = 1;
        selectORexport="0";
        select("0");
    });
    $('#outdata').click(function(){
        pageCurrent = 1;
        selectORexport="1";
        select("1");
    });

});

function gettime() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-";
    if(day < 10)
        clock += "0";
    clock += day;
    //alert(clock);
    now.setMonth(now.getMonth()-1);
    //now.setDate()
    var year1 = now.getFullYear();       //年
    var month1 = now.getMonth() + 1;     //月
    var day1 = now.getDate();            //日
    var clock1 = year + "-";
    if(month1 < 10)
        clock1 += "0";
    clock1 += month1 + "-";
    if(day1 < 10)
        clock1 += "0";
    clock1 += day1;
    //alert(clock1);
    var timeCon=clock1+" - "+clock;
    $("#reservation1").val(timeCon);
    pageCurrent = 1;
    selectORexport="0";
    select("0");
}

function ss(){
    selectFAgent();
}

function findShop() {
    var json = new Object();
    json.agentId = $.cookie("agentId_d");
    json.pageSize = pageSize;
    json.currPage = pageCurrent;
    json.belongShopId = "0";
    json.name = $("#shanghuName").val();
    var jsonPrama = {

        "marked": "Dounenglu_payPublicCall_findSuperShop",

        "code": "10008",

        "version": "1.0",

        "callbackparam": "success_jsonpCallback",

        "jsonStr": JSON.stringify(json)

    };

    findDataForAll(jsonPrama, findShopBack);

}

//查询商户返回

function findShopBack(da) {

    //alert("查询商户成功"+da.code);


    $("#shjstbody").empty();

    if (da.code == "000") {

        $.each(da.list, function (index, enty) {

            //alert("gl"+enty.id);


            var rd = "<tr><td >" + enty.name + "</td>";

            rd += "<td >" + enty.agentName + "</td>";

            rd += "<td ><a onclick='xuzesh(\"" + enty.id + "\",\"" + enty.name + "\",\"" + enty.agentId + "\",\"" + enty.agentName + "\")'>选择</a> </td></tr>";

            $("#shjstbody").append(rd);

        });


    } else {

        alert(da.mess);

    }

    IsCreatePage = false;

    if (!IsCreatePage) {

        IsCreatePage = true;

        $("#pageId2").createPage({

            count: da.count,//总条数

            pageCount: Math.ceil(da.count / pageSize),//viewdata.TotalNum

            current: pageCurrent,

            backFn: function (p) {

                pageCurrent = p;

                //单击回调方法，p是当前页码

                findShop()

            }

        });

    }

    return;

}
function xuzesh(id, name, bi, bn) {

    $('#shopNameText').val(name);
    $("#shopNameText").attr("data-value", id);
    $("#shjs").hide();
    getwangdian(id);
}

function getwangdian(shopId) {


    var json = new Object();
    json.shopId = shopId;
    var jsonPrama = {
        "marked": "Dounenglu_getShopWangdian",
        "code": "10008",
        "version": "1.0",
        "callbackparam": "success_jsonpCallback",
        "jsonStr": JSON.stringify(json)
    };
    //findDataForAll(jsonPrama, getwangdianBack);
    jQuery.axjsonp(url, jsonPrama, getwangdianBack);
}
function getwangdianBack(data) {

    if(data.Code=="000"){
        $('#wangdianbtn').empty();
        $("#wangdianbtn").append("<option  data-value=\"\">全部</option>");
        $.each(data.list, function (index, entry) {
            var strHtml = "<option data-value=\""+entry.id+"\">"+entry.name+"</option>";
            $('#wangdianbtn').append(strHtml);
        });
    }
    else{
        //alert(data.Code + "  " + data.Mess);
        $("#wangdianbtn").empty();
        $("#wangdianbtn").append("<option  data-value=\"\">全部</option>");
        return;
    }
    return;
}

//查询该代理商下相应级别的代理
function selectFAgent(){
    var jsonPrama = {
        "marked": "AgentAction_findlevelAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($("#agentLevellist").find("option:selected").attr("data-value")=="0"){
        //alert("请先选择代理商级别！");
        $("#agentLocationbutton").empty();
        $("#agentLocationbutton").append("<option  data-value=\"\">全部</option>");
        return;
    }
    var myjsonStr = setJson(null,"branchId",$.cookie("branchId_d"));
    myjsonStr = setJson(myjsonStr,"level",$("#agentLevellist").find("option:selected").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentLocation",$.cookie("agentId_d"));
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectFAgent);
}

function callBack_selectFAgent(data){
    if(data.code==0){
        $("#agentLocationbutton").empty();
        $("#agentLocationbutton").append("<option  data-value=\"\">全部</option>");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<option data-value=\""+entry.agentId+"\">"+entry.agentName+"</option>";
            $('#agentLocationbutton').append(strHtml);
        });
    }else{
        $("#agentLocationbutton").empty();
        $("#agentLocationbutton").append("<option  data-value=\"\">全部</option>");
        //alert(data.code+"   "+data.mess);
        return;
    }
    return;
}

//检索商户
function select(da){
    var jsonPrama = {
        "marked": "getTransactionFlowList",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    var  s = $("#reservation1").val();

    var ctime = s.split(" - ");

    if(ctime[1]==null){

        ctime[1]="";
    }
    var myjsonStr = setJson(null,"orderNo",$("#storeNum").val());
    myjsonStr = setJson(myjsonStr,"startDate",ctime[0]);
    myjsonStr = setJson(myjsonStr,"endDate",ctime[1]+"");
    myjsonStr = setJson(myjsonStr,"agentId",$.cookie("agentId_d"));
    var a;//当前的代理级别
    if($.cookie("userType_d")=="firstAgentAdmin"){
        a="1";
    }
    if($.cookie("userType_d")=="seoundAgentAdmin"){
        a="2";
    }
    if($.cookie("userType_d")=="thirdAgentAdmin"){
        a="3";
    }
    myjsonStr = setJson(myjsonStr,"agentId_level",a);
    myjsonStr = setJson(myjsonStr,"agentTwoId",$("#agentLocationbutton").find("option:selected").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentTwoId_level",$("#agentLevellist").find("option:selected").attr("data-value"));
    //var agent=$("#agenId").attr("data-value");
    //if(agent==""){
    //    agent=$.cookie("agentId");
    //}
    //myjsonStr = setJson(myjsonStr,"agentTwoId",agent);
    var bbb=$("#shopNameText").attr("data-value");
    if($("#shopNameText").attr("data-value")==""){
        bbb="";
    }
    myjsonStr = setJson(myjsonStr,"merchantShortNameId",bbb);
    myjsonStr = setJson(myjsonStr,"shopNameId",$("#wangdianbtn").find("option:selected").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"orderStatus",$("#state").find("option:selected").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"pageCurrent",pageCurrent);
    myjsonStr = setJson(myjsonStr,"pageSize",pageSize);
    myjsonStr = setJson(myjsonStr,"channelId",$("#industryNum").find("option:selected").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"Query_type",da);
    myjsonStr = setJson(myjsonStr,"Terminal","0");
    myjsonStr = setJson(myjsonStr,"Terminal_version","1.0");
    myjsonStr = setJson(myjsonStr,"termCode",$("#adress").val());
    //var  s = $("#reservation1").val();
    //
    //var ctime = s.split(" - ");
    //
    //if(ctime[1]==null){
    //
    //    ctime[1]="";
    //}
    //var myjsonStr = setJson(null,"orderNo","7145408480611857903");
    //myjsonStr = setJson(myjsonStr,"startDate","2013-04-15");
    //myjsonStr = setJson(myjsonStr,"endDate","2016-06-18");
    //
    //var agent=$("#agenId").attr("data-value");
    //if(agent==""){
    //    agent=$.cookie("agentId");
    //}
    //myjsonStr = setJson(myjsonStr,"agentTwoId","ff808081545267a3015452ad1b630011");
    //var bbb=$("#shopNameText").attr("data-value");
    //if($("#shopNameText").attr("data-value")==""){
    //    bbb="";
    //}
    //myjsonStr = setJson(myjsonStr,"merchantShortNameId","ff808081523557bd0152443238961d3d");
    //myjsonStr = setJson(myjsonStr,"shopNameId","ff808081523557bd015244363b5e1d50");
    //myjsonStr = setJson(myjsonStr,"orderStatus","SUCCESS");
    //myjsonStr = setJson(myjsonStr,"pageCurrent",pageCurrent);
    //myjsonStr = setJson(myjsonStr,"pageSize",pageSize);
    //myjsonStr = setJson(myjsonStr,"channelId","03");
    //myjsonStr = setJson(myjsonStr,"Query_type","0");
    //myjsonStr = setJson(myjsonStr,"Terminal","0");
    //myjsonStr = setJson(myjsonStr,"Terminal_version","1.0");
    //myjsonStr = setJson(myjsonStr,"termCode","75647652");
    jsonPrama.jsonStr=myjsonStr;
    console.log(jsonPrama);
    jQuery.axjsonp(jiaoyiurl, jsonPrama, callBack_select);
}
function callBack_select(data){
    console.log(data);
    if(selectORexport=="0"){
        //alert("abc");
        if(data.rspCode=="000"){
            //alert("hh");
            $("#content").empty();
            //alert(data.DistributionList);
            $.each(data.TransactionList,function(index,enty){
                var strHtml = "<tr><td >"+enty.id+"</td>";
                strHtml+="<td >"+enty.transDate+"</td>";
                strHtml+="<td >"+enty.orderNo+"</td>";
                strHtml+="<td >"+enty.merchantShortName+"</td>";
                strHtml+="<td >"+enty.shopName+"</td>";
                strHtml+="<td >"+enty.agent+"</td>";
                strHtml+="<td >"+enty.termCode+"</td>";
                strHtml+="<td >"+enty.totalFee+"</td>";
                strHtml+="<td >"+enty.channelOffMoney+"</td>";
                strHtml+="<td >"+enty.channelPayMoney+"</td>";
                strHtml+="<td >"+enty.refundFee+"</td>";
                switch(enty.channelId)
                {
                    case "02":
                        strHtml+="<td >"+"百度"+"</td>";
                        break;
                    case "03":
                        strHtml+="<td >"+"微信"+"</td>";
                        break;
                    case "04":
                        strHtml+="<td >"+"盘锦通"+"</td>";
                        break;
                    case "05":
                        strHtml+="<td >"+"海外购"+"</td>";
                        break;
                    case "06":
                        strHtml+="<td >"+"移动积分"+"</td>";
                        break;
                    case "07":
                        strHtml+="<td >"+"京东"+"</td>";
                        break;
                    case "08":
                        strHtml+="<td >"+"美团"+"</td>";
                        break;
                    case "09":
                        strHtml+="<td >"+"支付宝"+"</td>";
                        break;
                    case "10":
                        strHtml+="<td >"+"大众点评"+"</td>";
                        break;
                    case "11":
                        strHtml+="<td >"+"威富通"+"</td>";
                        break;
                    case "12":
                        strHtml+="<td >"+"翼支付"+"</td>";
                        break;
                    case "13":
                        strHtml+="<td >"+"飞惠"+"</td>";
                        break;
                    case "14":
                        strHtml+="<td >"+"MIS接入"+"</td>";
                        break;
                    case "15":
                        strHtml+="<td >"+"QQ"+"</td>";
                        break;
                    case "16":
                        strHtml+="<td >"+"刷卡"+"</td>";
                        break;
                    case "17":
                        strHtml+="<td >"+"移动和包"+"</td>";
                        break;
                    default:
                        strHtml+="<td >"+enty.channelId+"</td>";
                }

                strHtml+="<td >"+enty.transname+"</td>";
                strHtml+="<td >"+enty.orderStatus+"</td>";

                strHtml+="</tr>";
                $('#content').append(strHtml);
            });

        }else{
            alert(data.rspCode+"   "+data.rspDesc);

        }

        IsCreatePage=false;

        if(!IsCreatePage)

        {

            IsCreatePage=true;

            $("#pageId").createPage({

                count:data.totalNum,//总条数

                pageCount:Math.ceil(data.totalNum/pageSize),//viewdata.TotalNum

                current:pageCurrent,

                backFn:function(p){

                    pageCurrent=p;

                    //单击回调方法，p是当前页码

                    select("0");

                }

            });

        }

        return;
    }
    if(selectORexport=="1"){
        if(data.rspCode=="000"){
            location.href=data.fileUrl;
            return;
        }else{
            alert(data.rspCode+"   "+data.rspDesc);
            return;
        }

    }

}