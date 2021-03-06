/**
 * Created by BaiYuQiang on 2016/2/29.
 */
//$.cookie("branchID", "0", {
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
var IsCreatePage=false;
var pagesize = 10;
var pageCurrent = 1;
var branchID=$.cookie("branchId_d");
var branchName=$.cookie("branchName_d");
var agentId=$.cookie("agentId_d");
var agentName=$.cookie("agentName_d");
$(function(){
    if($.cookie("agentId_d")==null){
        window.open("./login.html");
    }
    selectAgent();
    selectProvice();
    $('#select').click(function(e) {
        pageCurrent=1;
        findStores(pageCurrent);
    });
    //根据省份查询城市列表
    $('#citybutton').click(function(e) {
        selectCity();
    });
    $('#provincebutton').click(function(e) {
        $('#cityName').text("--");
        $("#cityName").attr("data-value","");
    });
    //查询代理商
    //$('#agentbutton').click(function(e) {
    //    selectAgent();
    //});

    //查询代理商管理员
    $('#agentUserbutton').click(function(e) {
        if($("#agent").attr("data-value")==""){
            alert("请先选择代理商");
            return;
        }
        selectAgentUser();
    });
    //导出数据
    $('#outdata').click(function(e) {
        checkOutExcel();
    });

});

/**
 * 查询所有省份
 */
function selectProvice(){
    var jsonPrama = {
        "marked": "findProviceOrCity",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    var myjsonStr = setJson(null,"parentId","0");
    myjsonStr = setJson(myjsonStr,"level",1);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectProvice);
}

function callBack_selectProvice(data){
    if(data.code==0){
        $('#provinceNamelist').append("<li data-value=\"\"><a >"+"全部"+"</a></li>");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a href=\"#\">"+entry.name+"</a></li>";
            $('#provinceNamelist').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    pull_down_menu('#provinceNamelist li','#provinceName');
    return;
}

function selectCity(){
    var jsonPrama = {
        "marked": "findProviceOrCity",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($('#provinceName').attr("data-value")==""){
        return;
    }
    var myjsonStr = setJson(null,"parentId",$('#provinceName').attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",2);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectCity);
}

function callBack_selectCity(data){
    if(data.code==0){
        $('#cityNamelist').html("");
        $('#cityName').html("--");
        $("#cityName").attr("data-value","");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a href=\"#\">"+entry.name+"</a></li>";
            $('#cityNamelist').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    pull_down_menu('#cityNamelist li','#cityName');
    return;
}

/**
 * 查询当前分公司下所有代理商
 */
function selectAgent(){
    var jsonPrama = {
        "marked": "storesCallin_selectAllAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    //var myjsonStr = setJson(null,"branchId", $.cookie('branchID'));
    var myjsonStr = setJson(null,"agentId",agentId);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectAgent);
}

function callBack_selectAgent(data){
    if(data.code==0){
        $('#agentlist').html("");
        $('#agentUserId').html("全部");
        $("#agentUserId").attr("data-value","");
        $('#agentlist').append("<li data-value=\"\"><a >"+"全部"+"</a></li>");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.agentId+"><a>"+entry.agentName+"</a></li>";
            $('#agentlist').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    pull_down_menu('#agentlist li','#agent');
    return;
}

/**
 * 查询代理商下所有管理员
 */
function selectAgentUser(){
    var jsonPrama = {
        "marked": "storesCallin_selectAllAgentUser",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    var myjsonStr = setJson(null,"agentId", $("#agent").attr("data-value"));
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectAgentUser);
}

function callBack_selectAgentUser(data){
    if(data.code==0){
        $('#agentUserIdlist').html("");
        $('#agentUserId').html("全部");
        $("#agentUserId").attr("data-value","");
        $('#agentUserIdlist').append("<li data-value=\"\"><a >"+"全部"+"</a></li>");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.agentUserId+"><a >"+entry.agentUserName+"</a></li>";
            $('#agentUserIdlist').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    pull_down_menu('#agentUserIdlist li','#agentUserId');
    return;
}

function findStores(pageCurrent){

    var jsonPrama = {

        "marked": "storesCallin_selectStores",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"

    }

    var  s = $("#reservation1").val();

    var ctime = s.split(" - ");

    if(ctime[1]==null){

        ctime[1]="";
    }

    var myjsonStr = setJson(null,"shopName",$("#shopName").val());

    myjsonStr = setJson(myjsonStr,"industryNum",$("#industryNum").attr("data-value")) ;

    myjsonStr = setJson(myjsonStr,"startDay",ctime[0]);

    myjsonStr = setJson(myjsonStr,"branchId", branchID);

    myjsonStr = setJson(myjsonStr,"endDay",ctime[1]+"");

    myjsonStr = setJson(myjsonStr,"agent",$("#agent").attr("data-value")==""?agentId:$("#agent").attr("data-value"));

    myjsonStr = setJson(myjsonStr,"agentUserId",$("#agentUserId").attr("data-value")) ;

    myjsonStr = setJson(myjsonStr,"storeName",$("#storeName").val());

    myjsonStr = setJson(myjsonStr,"storeNum",$("#storeNum").val()) ;

    myjsonStr = setJson(myjsonStr,"state",$("#state").attr("data-value"));

    myjsonStr = setJson(myjsonStr,"adress",$("#adress").val()) ;

    myjsonStr = setJson(myjsonStr,"provinceID",$("#provinceName").attr("data-value"));

    myjsonStr = setJson(myjsonStr,"cityId",$("#cityName").attr("data-value")) ;

    myjsonStr = setJson(myjsonStr,"curragePage",pageCurrent+"") ;

    myjsonStr = setJson(myjsonStr,"pageSize",pagesize+"") ;

    jsonPrama.jsonStr=myjsonStr;

    jQuery.axjsonp(url, jsonPrama, callBack_findStores);

}

function callBack_findStores(data){
    $('#storetable tbody').html("");
    if(data.list==null){
        alert("查询结果为空!");
        return;
    }
    if(data.code==0){

        $.each(data.list,function(entryIndex, entry){

            var strHtml = "<tr>"+

                "<td>"+entry.Sequence+"</td>"+

                "<td>"+entry.shopName+"</td>"+

            "<td onclick='chakan(\""+entry.storeId+"\")'><a href=\"#\">"+entry.storeName+"</a></td>";

                //"<td>"+entry.storeName+"</td>";

                //"<td>"+entry.operator+"</td>";
            strHtml+="<td>"; strHtml+=entry.storeNum; strHtml+="</td>";

            //strHtml+="<td>"; strHtml+=entry.industry; strHtml+="</td>";

            strHtml+="<td>"; strHtml+=entry.provinceName; strHtml+="</td>";

            strHtml+="<td>"; strHtml+=entry.cityName; strHtml+="</td>";

            strHtml+="<td>"; strHtml+=entry.cTime; strHtml+="</td>";

            if(entry.state==0){

                strHtml+="<td> <span class=\"label label-danger\">停用</span></td>";

            }else if(entry.state==1){

                strHtml+="<td> <span class=\"label label-success\">启用</span></td>";

            }else{

                strHtml+="<td> <span class=\"label label-danger\">异常</span></td>";

            }

            strHtml+="<td><label id='' class='label label-info xiugai' onclick='xiugai(\""+entry.storeId+"\")'>修改&nbsp;<i class='fa fa-edit'></i></label></td>";

            //strHtml+="<td style=\"display: none\">"; strHtml+=entry.agentId; strHtml+="</td>";

            strHtml+="</tr>";

            $('#storetable tbody').append(strHtml);

        });

    }else{

        alert(data.code+"   "+data.mess);

        return;

    }

    IsCreatePage=false;

    if(!IsCreatePage)

    {

        IsCreatePage=true;

        $("#pageId").createPage({

            count:data.count,//总条数

            pageCount:Math.ceil(data.count/pagesize),//viewdata.TotalNum

            current:pageCurrent,

            backFn:function(p){

                pageCurrent=p;

                //单击回调方法，p是当前页码

                findStores(p);
            }

        });

    }

    return;

}

function xiugai(storeId) {
    location.href="./BusinessesPos-Add.html?storeId="+storeId+"";
}

function chakan(storeId) {
    location.href="./BusinessesPos-Check.html?storeId="+storeId+"";
}

function checkOutExcel(){
    var jsonPrama = {
        "marked": "storesCallin_checkOutExcel",
        "code":"10000",
        "version":"1.0",
        "jsonStr": "{}"
    }
    var  s = $("#reservation1").val();

    var ctime = s.split(" - ");

    if(ctime[1]==null){

        ctime[1]="";
    }

    var myjsonStr = setJson(null,"shopShortName",$("#shopName").val());

    myjsonStr = setJson(myjsonStr,"industryNum",$("#industryNum").attr("data-value")) ;

    myjsonStr = setJson(myjsonStr,"branchId", userBranchId);

    myjsonStr = setJson(myjsonStr,"startDay",ctime[0]);

    myjsonStr = setJson(myjsonStr,"endDay",ctime[1]+"");

    myjsonStr = setJson(myjsonStr,"agent",$("#agent").attr("data-value"));

    myjsonStr = setJson(myjsonStr,"agentUserId",$("#agentUserId").attr("data-value")) ;

    myjsonStr = setJson(myjsonStr,"storeShortName",$("#storeName").val());

    myjsonStr = setJson(myjsonStr,"storeNum",$("#storeNum").val()) ;

    myjsonStr = setJson(myjsonStr,"state",$("#state").attr("data-value"));

    myjsonStr = setJson(myjsonStr,"adress",$("#adress").val()) ;

    myjsonStr = setJson(myjsonStr,"provinceID",$("#provinceName").attr("data-value"));

    myjsonStr = setJson(myjsonStr,"cityId",$("#cityName").attr("data-value")) ;
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_checkOutExcel);
}

function callBack_checkOutExcel(data){
    if(data.code==0){
        //location.href ="agentManagement.html";
        window.open(data.url) ;
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}