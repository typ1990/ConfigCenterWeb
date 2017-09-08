﻿var DLUser=new Array;
var DLid="";
//查询分公司
function selectBranch(){
    var ob=new Object();
    var obw=new Object();
    obw.marked="findBranch";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_selectBranch);
}
//查询分公司返回
function callBack_selectBranch(data){

    $('#branchText').html("");
    $('#branch').empty();

    $('#agentText').html("");
    $('#agentList').empty();
    DLid="";

    $('#agentUserTable').empty();
    DLUser=new Array;


    if(data.code==0){

        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li><a onclick='brahClick(\""+entry.id+"\",\""+entry.name+"\")'>"+entry.name+"</a></li>";
            $('#branch').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }

    if(editFlag){  //如果是编辑状态查询单条记录
        seleOne();
    }
    pull_down();
    return;
}
function brahClick(a1,b){
    branchId=a1;
    branName=b;

    $('#agentText').html("");
    $('#agentList').empty();
    DLid="";

    $('#agentUserTable').empty();
    DLUser=new Array;
}
//选择几级代理后查询代理
function jibieClick(a){
    //alert("aa");
    var branchId=$.cookie("branchId_d");
    if(branchId!=""){
        selectAge(a);
    }
}
//查询代理
function selectAge(a){
    var ob=new Object();
    var agentId=$.cookie("agentId_d");
    ob.branchId=$.cookie("branchId_d");
    ob.agentLocation=agentId;
    ob.level=a;
    var level;//当前的代理级别
    if($.cookie("userType_d")=="firstAgentAdmin"){
        level=1;
    }
    if($.cookie("userType_d")=="seoundAgentAdmin"){
        level=2;
    }
    if($.cookie("userType_d")=="thirdAgentAdmin"){
        level=3;
    }
    if(level==a){
        $('#agentList').empty();
        $('#agentList').append("<li><a onclick='agentClick(\""+$.cookie("agentId_d")+"\",\""+$.cookie("agentName_d")+"\")'>"+$.cookie("agentName_d")+"</a></li>");
        pull_down();
        return;
    }
    var obw=new Object();
    obw.marked="Dounenglu_AgentAction_findlevelAgent";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_selectAge);
}
//查询代理返回
function callBack_selectAge(data){
    $('#agentText').html("");
    $('#agentList').empty();
    DLid="";

    $('#agentUserTable').empty();
    DLUser=new Array;
    if(data.code==0){
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li><a onclick='agentClick(\""+entry.agentId+"\",\""+entry.agentName+"\")'>"+entry.agentName+"</a></li>";
            $('#agentList').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();
    return;
}
//选择代理后查询代理人员
function agentClick(a1,b){
    DLid=a1;
    selectAgeUser(a1);
}

//查询代理人员
function selectAgeUser(a){
    var ob=new Object();
    ob.id=a;
    var obw=new Object();
    obw.marked="Dounenglu_findAgentUser";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_selectAgeUser);
}
//查询代理人员返回
function callBack_selectAgeUser(data){
    $('#agentUserTable').empty();
    DLUser=new Array;
    if(data.code==0){

        $.each(data.list,function(entryIndex, entry){
            var str="<tr><td>"+entry.name+"</td><td>"+entry.num+"</td><td><input data-va='999' type='checkbox' onclick='selectAgentUser(this,\""+entry.id+"\")'>选择</td></tr>"
            $('#agentUserTable').append(str);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();
    return;
}
//选择还是不选择
function selectAgentUser(b,a1){

    if($(b).is(":checked")){
        //alert("选择了1.."+a1);
        DLUser.push(a1);
    }else{
        //alert("选择了2.."+a1);
        DLUser.remove(a1);
    }
}
