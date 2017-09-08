/**
 * Created by BaiYuQiang on 2016/2/29.
 */
var IsCreatePage=false;
var pagesize = 10;
var pageCurrent = 1;
var userId=$.cookie("userId_d");
var userName=$.cookie("userName_d");
var branchID=$.cookie("branchId_d");
var branchName=$.cookie("branchName_d");
var agentId=$.cookie("agentId_d");
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
    //根据代理商的等级进行，下级的添加
    for(var j=0;j<i-a;j++){
        //$('#agentLevellistx').append("<li data-value=\""+i-j+"\"><a>"+i-j+"级</a></li>");
        $('#agentLevellistx').append("<li data-value=\""+(i-j)+"\"><a>"+(i-j)+"级</a></li>");
    }
    pull_down_menu('#agentLevellistx li','#agentLevelx');

    //查询相应级别的代理商
    $('#agentLocationbuttonx').click(function(e) {
        selectFAgent();
    });

    $('#agentLevelbuttonx').click(function(e) {
        $('#agentLocationx').text("--");
        $('#agentLocationx').attr("data-value","");
    });

    $('#select').click(function(e) {
        selectAgentUser(pageCurrent);
    });
    $('#getdata').click(function(e) {
        if($('#getdata').text()=="返回"){
            HideShelter();
            $('.pop-layer').hide();
        }else if($('#getdata').text()=="修改"){
            HideShelter();
            $('.pop-layer').hide();
            updateAgentUser();
        }
    });
    $('#reset').click(function(e) {
        reset();
    });

    //导出数据
    $('#outdata').click(function(e) {
        checkOutExcel();
    });
});



//查询上级代理商
function selectFAgent(){
    if($("#agentLevelx").attr("data-value")==""){
        alert("请选择代理商级别");
        return;
    }
    var jsonPrama = {
        "marked": "AgentAction_findlevelAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    //alert(1);
    var myjsonStr = setJson(null,"branchId",$("#branchx").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",$("#agentLevelx").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentLocation",agentId);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectFAgent);
}

function callBack_selectFAgent(data){
    if(data.code==0){
        $('#agentLocationlistx').html("");
        $('#agentLocationx').html("--");
        $('#agentLocationx').attr("data-value","");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.agentId+"><a>"+entry.agentName+"</a></li>";
            $('#agentLocationlistx').append(strHtml);
        });
        pull_down_menu('#agentLocationlistx li','#agentLocationx');
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }

}


function selectAgentUser(pageCurrent){
    var jsonPrama = {
        "marked": "AgentUserAction_findAgentAdmin",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    //alert("11");
    var myjsonStr = setJson(null,"agentUserNum",$("#agentUserNum").val().trim());

    myjsonStr = setJson(myjsonStr,"agentUserName",$("#agentUserName").val().trim()) ;
    myjsonStr = setJson(myjsonStr,"branch",branchID);

    myjsonStr = setJson(myjsonStr,"agentLevel","") ;
    //alert(agentId);
    myjsonStr = setJson(myjsonStr,"agentLocation",agentId);
//agentId
    myjsonStr = setJson(myjsonStr,"state","") ;
    myjsonStr = setJson(myjsonStr,"curragePage",pageCurrent+"") ;
    myjsonStr = setJson(myjsonStr,"pageSize",pagesize+"") ;

    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectAgentUser);
}

function callBack_selectAgentUser(data){
    if(data.code==0){
        $('#agentUserTable tbody').html("");

        $.each(data.lists,function(entryIndex, entry){
            var strHtml = "<tr>"+
                "<td>"+entry.Sequence+"</td>"+
                "<td>"+entry.agentUserNum+"</td>"+

                "<td><a href='#'onclick='chakan(\""+entry.agentUserID+"\")'>"+entry.agentUserName+"</a></td>";

            //"<td>"+entry.agentUserName+"</td>";
            strHtml+="<td>"; strHtml+=entry.userName; strHtml+="</td>";
            strHtml+="<td>"; strHtml+=entry.banchName; strHtml+="</td>";
            strHtml+="<td>"; strHtml+=entry.agentName; strHtml+="</td>";
            if(entry.agentLevel==1){
            strHtml+="<td>"; strHtml+="一级"; strHtml+="</td>";
            }
            if(entry.agentLevel==2){
                strHtml+="<td>"; strHtml+="二级"; strHtml+="</td>";
            }
            if(entry.agentLevel==3){
                strHtml+="<td>"; strHtml+="三级"; strHtml+="</td>";
            }
            strHtml+="<td>"; strHtml+=entry.address; strHtml+="</td>";
            if(entry.state==0){
                strHtml+="<td> <span class=\"label label-danger\">停用</span></td>";
            }else if(entry.state==1){
                strHtml+="<td> <span class=\"label label-success\">启用</span></td>";
            }else{
                strHtml+="<td> <span class=\"label label-warning\">异常</span></td>";
            }
            strHtml+="<td><label class='label label-info ' onclick='xiugai(\""+entry.agentUserID+"\")'>修改&nbsp;<i class='fa fa-edit'></i></label><label class='label label-info ' onclick='resetpassword(\""+entry.agentUserID+"\")'>重置密码&nbsp;<i class='fa  fa-building-o'></i></label></td>";
            strHtml+="</tr>";
            $('#agentUserTable tbody').append(strHtml);
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
                selectAgentUser(p);
            }
        });
    }
    return;
}

function chakan(agentUserID) {
    ShowShelter();
    $('.update').show();
    findAgentUserInfo(agentUserID, "0");
}

function xiugai(agentUserID) {
    ShowShelter();
    $('.update').show();
    findAgentUserInfo(agentUserID,"1");
}

function findAgentUserInfo(agentUserID,snum){
    var jsonPrama = {
        "marked": "AgentUserAction_selectAgentUserInfo",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    var myjsonStr = setJson(null,"agentUserId",agentUserID);
    myjsonStr = setJson(myjsonStr,"snum",snum) ;
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_findAgentUserInfo);
}

function callBack_findAgentUserInfo(data){
    if(data.code==0){
        var snum = data.snum;
        $("#agentUserNumx").val(data.agentUserNum);
        $("#agentUserNumx").attr("disabled","disabled");
        $("#agentUserNumx").attr("data-value",data.agentUserId);
        $("#agentUserNamex").val(data.agentUserName);
        $("#agentUserPhonex").val(data.agentUserPhone);
        $("#agentUserAdressx").val(data.agentUserAdress);
        $("#branchx").attr("data-value",data.branchId);
        $("#branchx").text(data.branchName).attr("disabled","disabled");
        var agentState = data.state;
        //alert(agentState);
        if(agentState == 0){
            $("#statex").text("停用");
        }else if(agentState == 1){
            $("#statex").text("启用");
        }
        $("#statex").attr("data-value",agentState);
        var agentLevel = data.agentLevel;
        if(agentLevel == "firstAgentAdmin"){
            $("#agentLevelx").text("1级");
            $("#agentLevelx").attr("data-value","1");
        }else if(agentLevel == "seoundAgentAdmin"){
            $("#agentLevelx").text("2级");
            $("#agentLevelx").attr("data-value","2");
        }else if(agentLevel == "thirdAgentAdmin"){
            $("#agentLevelx").text("3级");
            $("#agentLevelx").attr("data-value","3");
        }
        $("#agentLevelx").attr("disabled","disabled");
        $("#agentLocationx").text(data.agentName);
        $("#agentLocationx").attr("data-value",data.agentId).attr("disabled","disabled");
        $("#reMarkx").val("");
        pull_down_menu('#statelistx li','#statex');
        if(snum == 0){
            $("#agentUserNumx").attr("disabled","disabled");
            $("#agentUserPhonex").attr("disabled","disabled");
            $("#agentUserNamex").attr("disabled","disabled");
            $("#agentUserAdressx").attr("disabled","disabled");
            $("#branchx").attr("disabled","disabled");
            $("#statex").attr("disabled","disabled");
            $("#agentLevelx").attr("disabled","disabled");
            $("#agentLocationx").attr("disabled","disabled");
            $("#reMarkx").attr("disabled","disabled");
            $("#getdata").text("返回");
        }else if(snum == 1){
            $("#agentUserNumx").attr("disabled",true);
            $("#agentUserPhonex").attr("disabled",true);
            $("#agentUserNamex").attr("disabled",false);
            $("#agentUserAdressx").attr("disabled",false);
            $("#branchx").attr("disabled",false);
            $("#statex").attr("disabled",false);
            $("#agentLevelx").attr("disabled",false);
            $("#agentLocationx").attr("disabled",false);
            $("#reMarkx").attr("disabled",false);
            $("#getdata").text("修改");
            pull_down_menu('#statelistx li','#statex');
        }
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}

function resetpassword(agentUserID) {
    ShowShelter();
    $('.rest').show();
    $("#newpassword1").attr("data-value",agentUserID);
    $("#newpassword1").val("");
    $("#newpassword2").val("");
}

function reset(){
    var jsonPrama = {
        "marked": "AgentUserAction_reSetPassWord",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($("#newpassword1").val()!=$("#newpassword2").val()){
        alert("两次填写密码不一致！");
        return;
    }
    if($("#newpassword1").val().trim()==""){
        alert("新密码不能为空！");
        return;
    }
    var myjsonStr = setJson(null,"newPassWord",$("#newpassword1").val());
    myjsonStr = setJson(myjsonStr,"agentUserId",$("#newpassword1").attr("data-value")) ;
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_reset);
}

function callBack_reset(data){
    alert(data.code+"   "+data.mess);
    HideShelter();
    $('.rest').hide();
    return;
}

function updateAgentUser(){
    var jsonPrama = {
        "marked": "AgentUserAction_updateAgentUser",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($("#branchx").attr("data-value")==""){
        alert("请填写分公司！");
        return;
    }
    if($("#agentUserNamex").val().trim()==""){
        alert("请填写代理员姓名！");
        return;
    }
    if($("#agentUserPhonex").val().trim()==""){
        alert("请填写手机号！");
        return;
    }
    if($("#agentLocationx").attr("data-value")==""){
        alert("请填写所属代理商！");
        return;
    }
    var myjsonStr = setJson(null,"agentUserId",$("#agentUserNumx").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentUserName",$("#agentUserNamex").val()) ;
    myjsonStr = setJson(myjsonStr,"agentUserPhone",$("#agentUserPhonex").val()) ;
    myjsonStr = setJson(myjsonStr,"agentUserAdress",$("#agentUserAdressx").val()) ;
    myjsonStr = setJson(myjsonStr,"state",$("#statex").attr("data-value")) ;
    myjsonStr = setJson(myjsonStr,"agentLocation",$("#agentLocationx").attr("data-value"));
    var userType = "";
    if($("#agentLevelx").attr("data-value") == 1){
        userType = "firstAgentAdmin";
    }else if($("#agentLevelx").attr("data-value") == 2){
        userType = "seoundAgentAdmin";
    }else if($("#agentLevelx").attr("data-value") == 3){
        userType = "thirdAgentAdmin";
    }
    myjsonStr = setJson(myjsonStr,"agentLevel",userType);
    myjsonStr = setJson(myjsonStr,"branchID",$("#branchx").attr("data-value"));
    if($("#reMarkx").val()==""){
        alert("请填写状态变更意见！");
        return;
    }
    myjsonStr = setJson(myjsonStr,"reMark",$("#reMarkx").val()) ;
    myjsonStr = setJson(myjsonStr,"userId",userId);
    myjsonStr = setJson(myjsonStr,"userName",$.cookie("userNickName_d"));
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_updateAgentUser);
}

function callBack_updateAgentUser(data){
    alert(data.code+"   "+data.mess);
    HideShelter();
    $('.update').hide();
    selectAgentUser(pageCurrent);
    return;
}

function checkOutExcel(){
    var jsonPrama = {
        "marked": "DounengshouWeb_checkOutAgentUser",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }

    var myjsonStr = setJson(null,"agentUserNum",$("#agentUserNum").val().trim());

    myjsonStr = setJson(myjsonStr,"agentUserName",$("#agentUserName").val().trim()) ;
    myjsonStr = setJson(myjsonStr,"branch",branchID);

    myjsonStr = setJson(myjsonStr,"agentLevel","") ;
    myjsonStr = setJson(myjsonStr,"agentLocation",agentId);

    myjsonStr = setJson(myjsonStr,"state","") ;
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