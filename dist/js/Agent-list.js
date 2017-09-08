﻿/**
 * Created by lisa on 2016/8/11.
 */
var pagesize = 10;
var pageCurrent=1;
var IsCreatePage=false;
$(function(){
    if($.cookie("agentId_d")==null){
        parent.ssaa();
    }
    select(pageCurrent);
    $('#select').click(function(e) {
        pageCurrent = 1;
        select(pageCurrent);
    });

    $('#outData').click(function(e) {
        outData();
    });


});



function nameChange(){
    if($("#content").find("option:selected").text()=="按代理商名称"){
        $("#name").attr('placeholder','输入代理商名称');
    }
    if($("#content").find("option:selected").text()=="按代理商人员"){
        $("#name").attr('placeholder','输入代理商人员名称');
    }
    if($("#content").find("option:selected").text()=="按代理商人员电话"){
        $("#name").attr('placeholder','输入代理商人员电话');
    }
}


function select(pageCurrent){
    var agent;
    var person;
    var phone;
    var level;
    var agentType;

    if($("#content").find("option:selected").text()=="按代理商名称"){
        agent=$("#name").val();
        person="";
        phone="";
    }
    if($("#content").find("option:selected").text()=="按代理商人员"){
        agent="";
        person=$("#name").val();
        phone="";
    }
    if($("#content").find("option:selected").text()=="按代理商人员电话"){
        agent="";
        person="";
        phone=$("#name").val();
    }
    if($("#agent").find("option:selected").text()=="全部"){
        level="";
    }
    if($("#agent").find("option:selected").text()=="二级代理"){
        level="2";
    }
    if($("#agent").find("option:selected").text()=="三级代理"){
        level="3";
    }
    if($("#agentType").find("option:selected").text()=="全部"){
        agentType="";
    }
    if($("#agentType").find("option:selected").text()=="公司"){
        agentType="1";
    }
    if($("#agentType").find("option:selected").text()=="个人"){
        agentType="0";
    }
    var jsonPrama = {
        "marked": "AgentAction_selectAgent_dounenglu",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null,"agent",agent);
    myjsonStr = setJson(myjsonStr,"person",person);
    myjsonStr = setJson(myjsonStr,"phone",phone);
    myjsonStr = setJson(myjsonStr,"level",level);
    myjsonStr = setJson(myjsonStr,"agentType",agentType);
    myjsonStr = setJson(myjsonStr,"agentId",$.cookie("agentId_d"));
    myjsonStr = setJson(myjsonStr,"branchID",$.cookie("branchId_d"));
    myjsonStr = setJson(myjsonStr,"curragePage",pageCurrent+"") ;
    myjsonStr = setJson(myjsonStr,"pageSize",pagesize+"") ;
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_select);
}
function callBack_select(data){
	console.log(data);
    if(data.code==0){
        //location.href ="agentManagement.html";
        $('#agenttable tbody').html("");
        $.each(data.list,function(entryIndex, entry){

            var ssss = entry.agentId;

            var strHtml = "<tr>"+

                "<td>"+entry.Sequence+"</td>"+

                "<td><a href='#'onclick='chakan(\""+entry.agentId+"\")'>"+entry.agentName+"</a></td>"+

                "<td>"+entry.agentShortName+"</td>";

            //"<td>"+entry.operator+"</td>";
            strHtml+="<td>";strHtml+=entry.agentNum; strHtml+="</td>";

            if(entry.agentType=="0"){
                strHtml+="<td>";strHtml+="个人代理"; strHtml+="</td>";
            }else if(entry.agentType=="1"){
                strHtml+="<td>";strHtml+="公司代理"; strHtml+="</td>";
            }else{
                strHtml+="<td>";strHtml+="--"; strHtml+="</td>";
            }
            strHtml+="<td>";strHtml+=entry.person; strHtml+="</td>";
            strHtml+="<td>";strHtml+=entry.phone; strHtml+="</td>";
            //strHtml+="<td>";strHtml+=entry.branchCompanyName; strHtml+="</td>";

            if(entry.agentLevel==1){

                strHtml+="<td >1级</td>";

            }else if(entry.agentLevel==2){

                strHtml+="<td >2级</td>";

            }else if(entry.agentLevel==3){

                strHtml+="<td >3级</td>";

            } else{

                strHtml+="<td class=\"red_text\">--</td>";

            }
            strHtml+="<td>"; strHtml+=entry.superiorAgent; strHtml+="</td>";
            strHtml+="<td>"; strHtml+=entry.cdate; strHtml+="</td>";

            if(entry.state==0){

                strHtml+="<td> <span class=\"label label-danger\">停用</span></td>";

            }else if(entry.state==1){

                strHtml+="<td> <span class=\"label label-success\">启用</span></td>";

            }else{

                strHtml+="<td> <span class=\"label label-danger\">异常</span></td>";

            }

            strHtml+="<td><label id='' class='label label-info xiugai' onclick='xiugai(\""+entry.agentId+"\")'>修改&nbsp;<i class='fa fa-edit'></i></label></td>";

            //strHtml+="<td style=\"display: none\">"; strHtml+=entry.agentId; strHtml+="</td>";

            strHtml+="</tr>";

            $('#agenttable tbody').append(strHtml);

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

                select(pageCurrent);
            }

        });

    }

    return;
}

function outData(){
    var agent;
    var person;
    var phone;
    var level;
    var agentType;

    if($("#content").find("option:selected").text()=="按代理商名称"){
        agent=$("#name").val();
        person="";
        phone="";
    }
    if($("#content").find("option:selected").text()=="按代理商人员"){
        agent="";
        person=$("#name").val();
        phone="";
    }
    if($("#content").find("option:selected").text()=="按代理商人员电话"){
        agent="";
        person="";
        phone=$("#name").val();
    }
    if($("#agent").find("option:selected").text()=="全部"){
        level="";
    }
    if($("#agent").find("option:selected").text()=="二级代理"){
        level="2";
    }
    if($("#agent").find("option:selected").text()=="三级代理"){
        level="3";
    }
    if($("#agentType").find("option:selected").text()=="全部"){
        agentType="";
    }
    if($("#agentType").find("option:selected").text()=="公司"){
        agentType="1";
    }
    if($("#agentType").find("option:selected").text()=="个人"){
        agentType="0";
    }
    var jsonPrama = {
        "marked": "AgentAction_outAgent_dounenglu",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null,"agent",agent);
    myjsonStr = setJson(myjsonStr,"person",person);
    myjsonStr = setJson(myjsonStr,"phone",phone);
    myjsonStr = setJson(myjsonStr,"level",level);
    myjsonStr = setJson(myjsonStr,"agentType",agentType);
    myjsonStr = setJson(myjsonStr,"agentId",$.cookie("agentId_d"));
    myjsonStr = setJson(myjsonStr,"branchID",$.cookie("branchId_d"));
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_outData);
}
function callBack_outData(data){
    if(data.code==0){
        //location.href ="agentManagement.html";
        location.href =data.url;
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}


function chakan(agentId){

    location.href="./Agent-add2.html?editFla=0&agentId="+agentId;
}

function xiugai(agentId){

    location.href="./Agent-add2.html?editFla=1&agentId="+agentId;
}