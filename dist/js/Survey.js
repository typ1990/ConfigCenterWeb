/**
 * Created by lisa on 2016/7/21.
 */
$(function(){
    if($.cookie("agentId_d")==null){
        parent.ssaa();
    }
    gettime();
   getinfo();
    $('#select').click(function(e) {
        getcontent();
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
    getcontent();
}
function getcontent() {
    var jsonPrama = {
        "marked": "MessageInfo",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($("#reservation1").val()==""){
        alert("请选择日期");
        return;

    }
    var  s = $("#reservation1").val();

    var ctime = s.split(" - ");

    if(ctime[1]==null){

        ctime[1]="";
    }
    console.log(ctime[0]);
    StartDate=ctime[0];
    console.log(ctime[1]+"");
    EndDate=ctime[1]+"";
    var myjsonStr = setJson(null,"agentId", $.cookie("agentId_d"));
    myjsonStr = setJson(myjsonStr,"startDate",ctime[0]);
    myjsonStr = setJson(myjsonStr,"endDate",ctime[1]+"");
    jsonPrama.jsonStr=myjsonStr;
    console.log("请求数据："+jsonPrama.jsonStr);
    jQuery.axjsonp(jiaoyiurl, jsonPrama, callBack_getcontent);
}
function callBack_getcontent(data) {
    console.log(data);
    if(data.rspCode==0){
        $("#mendian").html(data.totalNum+"家");
        $("#pos").html(data.posNum+"台");
        $("#jiaoyi").html(data.transactionNum+"笔");
    }else{
        alert(data.rspCode+"  "+data.rspDesc);
        return;
    }

}

function getinfo() {
    var jsonPrama = {
        "marked": "Dounenglu_getAgentInfo",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    var myjsonStr = setJson(null,"agentId", $.cookie("agentId_d"));
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_getinfo);
}
function callBack_getinfo(data){
    console.log(data);
    if(data.code==0){
        if(data.name!=""){
        $("#name").html(data.name);
        }else{
            $("#name").html("无");
        }
        if(data.shortName!=""){
        $("#ShortName").html(data.shortName);
        }else{
            $("#ShortName").html("无");
        }
        if(data.connectPeople!=""){
        $("#peop").html(data.connectPeople);
        }else{
            $("#peop").html("无");
        }
        if(data.agentLevel=="1"){
            $("#level").html("一级");
        }
        if(data.agentLevel=="2"){
            $("#level").html("二级");
        }
        if(data.agentLevel=="3"){
            $("#level").html("三级");
        }
        if(data.legalPersonPhone!=""){
            $("#tel").html(data.legalPersonPhone);
        }else{
            $("#tel").html("无");
        }

        $("#uagt").html(data.agentBelong);
        $("#com").html(data.branchName);
        $("#acount").html(data.count);
        $("#local").html(data.location);
        $("#time").html(data.cdate);
    }else{
        alert(data.code+"  "+data.mess);
        return;
    }

}