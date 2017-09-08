/**
 * Created by BaiYuQiang on 2016/2/29.
 */
var IsCreatePage=false;
var pagesize = 10;
var pageCurrent = 1;
var userId=$.cookie("userId_d");
var userName=$.cookie("userName_d");
//var branchType=$.cookie("branchType");
var branchID=$.cookie("branchId_d");
var branchName=$.cookie("branchName_d");
var agentId=$.cookie("agentId_d");
var agentName=$.cookie("agentName_d");
//var userId="11100";
//var userName="测试";
$(function(){
    if($.cookie("agentId_d")==null){
        parent.ssaa();
    }
    //此处修改是为代理商级别扩展使用
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
    $('.download').click(function(){
        window.open(imgBaseUrl+"/uploads/"+ $('.download').attr("url"));
    });

    //$('#branch').text(branchName);
    //$("#branch").attr("data-value",branchID);
    selectProvice();

    $('#select').click(function(e) {
        findAgent(pageCurrent);
    });
    //根据省份查询城市列表

    $('#citybuttonx').click(function(e) {
        if($('#getdata').text()=="修改"){
            $('#countyNamex').text("--");
            $("#countyNamex").attr("data-value", "");
            selectCityx();
        }else{
            return;
        }
    });



    $('#provincebuttonx').click(function(e) {
        if($('#getdata').text()=="修改") {
            $('#cityNamex').text("--");
            $("#cityNamex").attr("data-value", "");
            $('#countyNamex').text("--");
            $("#countyNamex").attr("data-value", "");
        }else{
            return;
        }
    });

    $('#countybuttonx').click(function(e) {
        selectCounty();
    });
    $('#agentLevelbuttonx').click(function(e) {
        $('#agentLocationx').text("--");
        $('#agentLocationx').attr("data-value","");
    });

    //点击所属上级代理
    $('#agentLocationbuttonx').click(function(e) {
        if($("#agentLevelx").attr("data-value")=="2") {
            $('#agentLocationlistx').html("");
            if($.cookie("userType_d")=="firstAgentAdmin"){
                $('#agentLocationx').text(agentName);
                $("#agentLocationx").attr("data-value",agentId);
            }
        }if($("#agentLevelx").attr("data-value")=="3"){
            if($.cookie("userType_d")=="firstAgentAdmin"){
                selectFAgent();
            }
            if($.cookie("userType_d")=="seoundAgentAdmin"){
                $('#agentLocationx').text(agentName);
                $("#agentLocationx").attr("data-value",agentId);
            }

        }if($("#agentLevel").attr("data-value")==""){
            alert("请先选择代理级别");
        }
    });

    $('#getdata').click(function(e) {
        if($('#getdata').text()=="返回"){
            HideShelter();
            $('.pop-layer').hide();
        }else if($('#getdata').text()=="修改"){

            saveAgentx();
        }
    });

    //导出数据
    $('#outdata').click(function(e) {
        checkOutExcel();
    });

    var upurl=imgUrl+'?redirect='+window.location.href.replace(/\/[^\/]*$/,'/jQueryfileupload/uploadresult.html');
    $('#agentContent').fileupload(
        {
            add: function(e, data) {
                var uploadErrors = [];
                var acceptFileTypes = /^image\/(jpe?g)$/i;
                //if(data.originalFiles[0]['type']=="" || (data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type']))) {
                //    uploadErrors.push('上传的文件类型不符合要求，请上传jpg类型的文件');
                //}
                if(data.originalFiles[0].size > 2000000) {
                    uploadErrors.push('文件尺寸过大，限制文件大小2M');
                }
                if(uploadErrors.length > 0) {
                    alert(uploadErrors.join("\n"));
                } else {
                    data.submit();
                }
            },
            forceIframeTransport: true,
            url: upurl,
            dataType: 'json',
            //acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i, // Allowed file types
            done: function (e, data) {
                var na=data.result.files[0].name;
                //brand_logosaveImg(imgBaseUrl+"/uploads/"+na);
                //$("#uplogoshow").html("上传成功！新名称："+na);
                $("#agentContentshow").html("上传成功！");
                $("#agentContentshow").attr("data-value",na);
                //logotp=na;
                $("#wenjianName").html(na);
                //alert(na);
            },
        }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

});
//查找分公司
function findBranch(){
    var jsonPrama = {
        "marked": "findBranch",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null,"123","");
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_findBranch);
}

function callBack_findBranch(data){
    if(data.code==0){
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a onclick=\"getBran('"+entry.branchID+"')\" href=\"#\">"+entry.name+"</a></li>";
            $('#branchlist').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down_menu('#branchlist li','#branch');
    selectProvice();
    return;
}

//查询对应级别代理商
function selectFAgent(){
    var jsonPrama = {
        "marked": "AgentAction_findSecondAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    var myjsonStr = setJson(null,"branchId",$("#branchx").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentId",agentId);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectFAgent);
}

function callBack_selectFAgent(data){
    if(data.code==0){
        $('#agentLocationlistx').html("");
        $('#agentLocationx').html("--");
        $('#agentLocationx').attr("data-value","");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.agentId+"><a href=\"#\">"+entry.agentName+"</a></li>";
            $('#agentLocationlistx').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down_menu('#agentLocationlistx li','#agentLocationx');
    return;
}

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
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a href=\"#\">"+entry.name+"</a></li>";
            //$('#provinceNamelist').append(strHtml);
            $('#provinceNamelistx').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    //pull_down_menu('#provinceNamelist li','#provinceName');
    pull_down_menu('#provinceNamelistx li','#provinceNamex');
    return;
}


function selectCityx(){
    var jsonPrama = {
        "marked": "findProviceOrCity",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($('#provinceNamex').attr("data-value")==""){
        return;
    }
    var myjsonStr = setJson(null,"parentId",$('#provinceNamex').attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",2);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectCityx);
}

function callBack_selectCityx(data){
    if(data.code==0){
        $('#cityNamelistx').html("");
        $('#cityNamex').html("--");
        $("#cityNamex").attr("data-value","");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a href=\"#\">"+entry.name+"</a></li>";
            $('#cityNamelistx').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    pull_down_menu('#cityNamelistx li','#cityNamex');
    return;
}

function selectCounty(){
    var jsonPrama = {
        "marked": "findProviceOrCity",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($('#cityNamex').attr("data-value")==""){
        return;
    }
    var myjsonStr = setJson(null,"parentId",$('#cityNamex').attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",3);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectCounty);
}

function callBack_selectCounty(data){
    if(data.code==0){
        $('#countyNamelistx').html("");
        $('#countyNamex').html("--");
        $("#countyNamex").attr("data-value","");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a href=\"#\">"+entry.name+"</a></li>";
            $('#countyNamelistx').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    pull_down_menu('#countyNamelistx li','#countyNamex');
    return;
}

function findAgent(pageCurrent){

    var jsonPrama = {
        "marked": "AgentAction_findAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }

    //var  s = $("#ctime").val();
    //
    //var ctime = s.split(" - ");
    //
    //if(ctime[1]==null){
    //
    //    ctime[1]="";
    //}

    var myjsonStr = setJson(null,"agentName",$("#agentName").val().trim());

    myjsonStr = setJson(myjsonStr,"agentShortName",$("#agentShortName").val().trim()) ;

    //myjsonStr = setJson(myjsonStr,"startDate",ctime[0]);
    //
    //myjsonStr = setJson(myjsonStr,"endDate",ctime[1]+"");

    myjsonStr = setJson(myjsonStr,"agentId",agentId);

    myjsonStr = setJson(myjsonStr,"branchID",branchID);

    myjsonStr = setJson(myjsonStr,"curragePage",pageCurrent+"") ;

    myjsonStr = setJson(myjsonStr,"pageSize",pagesize+"") ;
    jsonPrama.jsonStr=myjsonStr;

    jQuery.axjsonp(url, jsonPrama, callBack_findAgent);

}

function callBack_findAgent(data){


    if(data.code==0){
        $('#agenttable tbody').html("");
        $.each(data.list,function(entryIndex, entry){

            var ssss = entry.agentId;

            var strHtml = "<tr>"+

                "<td>"+entry.Sequence+"</td>"+

                "<td><a href='#'onclick='chakan(\""+entry.agentId+"\")'>"+entry.agentName+"</a></td>"+

                "<td>"+entry.agentShortName+"</td>";

                //"<td>"+entry.operator+"</td>";
            strHtml+="<td>";strHtml+=entry.agentNum; strHtml+="</td>";

            strHtml+="<td>";strHtml+=entry.branchCompanyName; strHtml+="</td>";

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

                findAgent(p);
            }

        });

    }

    return;

}

function chakan(agentId) {
    ShowShelter();
    $('.pop-layer').show();
    findAgentInfo(agentId,"0");
}


function xiugai(agentId) {
    ShowShelter();
    $('.pop-layer').show();
    findAgentInfo(agentId, "1");
}

//查询详情以及修改页面反添数据查询方法
function findAgentInfo(agentId,snum){
    // snum == 0 查询页面,  snum == 1 修改页面
    var jsonPrama = {
        "marked": "AgentAction_findAgentInfo",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null,"agentId",agentId);
    myjsonStr = setJson(myjsonStr,"snum",snum) ;
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_findAgentInfo);
}

function callBack_findAgentInfo(data){

    if(data.code==0){
        var snum = data.snum;
        $("#agentNumx").val(data.agentNum);
        $("#agentNumx").attr("disabled","disabled");
        $("#agentNumx").attr("data-value",data.agentId);
        $("#agentNamex").val(data.agentName).attr("disabled","disabled");
        $("#agentShortNamex").val(data.agentShortName);
        //$("#operator").val(data.operator);
        $("#branchx").attr("data-value",data.branchId);
        $("#branchx").text(data.branchCompanyName).attr("disabled","disabled");
        var agentState = data.state;
        //alert(agentState);
        if(agentState == 0){
            $("#statex").text("停用");
        }else if(agentState == 1){
            $("#statex").text("启用");
        }
        $("#statex").attr("data-value",agentState);
        var agentLevel = data.agentLevel;
        if(agentLevel == 1){
            $("#agentLevelx").text("1级");
        }else if(agentLevel == 2){
            $("#agentLevelx").text("2级");
        }else if(agentLevel == 3){
            $("#agentLevelx").text("3级");
        }
        $("#wenjianName").html(data.agentContactImg);
        $("#agentContentshow").attr("data-value",data.agentContactImg);
        if(data.agentContactImg==""){
            //alert("hehe");
            $('#download').attr("disabled", true);
            //$('#download').attr("url",data.contractImg);
        }else{
            $('#download').attr("disabled", false);
            $('#download').attr("url",data.agentContactImg);
        }
        $("#agentLevelx").attr("data-value",agentLevel).attr("disabled","disabled");
        $("#agentLocationx").text(data.superagentName);
        $("#agentLocationx").attr("data-value",data.agentLocation).attr("disabled","disabled");
        $("#provinceNamex").attr("data-value",data.provinceID);
        $("#provinceNamex").text(data.provinceName);
        $("#cityNamex").text(data.cityName);
        $("#cityNamex").attr("data-value",data.cityId);
        $("#countyNamex").text(data.countyName==""?"--":data.countyName);
        $("#countyNamex").attr("data-value",data.countyId);
        $("#agentAddressx").val(data.agentAddress);
        $("#legalPersonNamex").val(data.legalPersonName);
        $("#legalPersonPhonex").val(data.legalPersonPhone);
        $("#agentAllpayIdx").val(data.agentAllpayId);
        $("#agentAllpaykeyx").val(data.agentAllpaykey);
        $("#reMarkx").val("");
        if(snum == 0){
            $("#agentShortNamex").attr("disabled","disabled");
            $("#statex").attr("disabled","disabled");
            $("#provinceNamex").attr("disabled","disabled");
            $("#cityNamex").attr("disabled","disabled");
            $("#countyNamex").attr("disabled","disabled");
            $("#agentAddressx").attr("disabled","disabled");
            $("#legalPersonNamex").attr("disabled","disabled");
            $("#legalPersonPhonex").attr("disabled","disabled");
            $("#agentAllpayIdx").attr("disabled","disabled");
            $("#agentAllpaykeyx").attr("disabled","disabled");
            $("#reMarkx").attr("disabled","disabled");
            $("#getdata").text("返回");
        }else if(snum == 1){
            $("#agentShortNamex").attr("disabled",false);
            $("#statex").attr("disabled",false);
            $("#provinceNamex").attr("disabled",false);
            $("#cityNamex").attr("disabled",false);
            $("#countyNamex").attr("disabled",false);
            $("#agentAddressx").attr("disabled",false);
            $("#legalPersonNamex").attr("disabled",false);
            $("#legalPersonPhonex").attr("disabled",false);
            $("#agentAllpayIdx").attr("disabled",false);
            $("#agentAllpaykeyx").attr("disabled",false);
            $("#reMarkx").attr("disabled",false);
            $("#getdata").text("修改");
            pull_down_menu('#statelistx li','#statex');
        }

    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    ////加载分公司
    //if(branchType==0){
    //    findBranch();
    //}else{
    //    $("#branchname1").text(branchname);
    //    selectProvice();
    //}
    return;
}

//修改代理商
function saveAgentx(){
    var jsonPrama = {
        "marked": "AgentAction_updateAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    if($("#agentNamex").val().trim()==""){
        alert("请填写代理商全称！");
        return;
    }
    if($("#branchx").attr("data-value")==""){
        alert("请填写分公司！");
        return;
    }
    if($("#provinceNamex").attr("data-value")==""){
        //alert("请选择省份！");
        //return;
    }
    if($("#cityNamex").attr("data-value")==""){
        //alert("请选择城市！");
        //return;
    }
    if($("#agentLevelx").attr("data-value")==""){
        alert("请选择代理级别！");
        return;
    }
    if($("#agentLocationx").attr("data-value")==""){
        alert("请选择所属上级代理！");
        return;
    }

    if($("#agentNumx").val()==""){
        alert("请填写代理商编号！");
        return;
    }
    if($("#legalPersonNamex").val().trim()==""){
        //alert("请填写联系人！");
        //return;
    }
    //alert($("#agentContentshow").attr("data-value"));

    if($("#agentContentshow").attr("data-value")==""){
        //alert("请上传代理商文件！");
        //return;
    }

    //if($("#agentAllpayIdx").val().trim()==""){
    //    alert("请填写代理商接入ID！");
    //    return;
    //}
    //if($("#agentAllpaykeyx").val().trim()==""){
    //    alert("请填写代理商接入key1！");
    //    return;
    //}

    if($("#reMarkx").val().trim()==""){
        alert("请填写修改意见！");
        return;
    }
    //alert($("#agentContentshow").attr("data-value"));
    //if($("#agentContentshow").attr("data-value")==""){
    //    alert("请上传代理商合同！");
    //    return;
    //}

    var myjsonStr = setJson(null,"agentName",$("#agentNamex").val());
    myjsonStr = setJson(myjsonStr,"agentId",$("#agentNumx").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentContent",$("#agentContentshow").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentNum",$("#agentNumx").val());
    //myjsonStr = setJson(myjsonStr,"agentContent",$("#agentContentshow").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentShortName",$("#agentShortNamex").val());
    myjsonStr = setJson(myjsonStr,"branchID",$("#branchx").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentState",$("#statex").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentLevel",$("#agentLevelx").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentLocation",$("#agentLocationx").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"proviceID",$("#provinceNamex").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"proname",$("#provinceNamex").html());
    myjsonStr = setJson(myjsonStr,"cityID",$("#cityNamex").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"city",$("#cityNamex").html());
    myjsonStr = setJson(myjsonStr,"countyID",$("#countyNamex").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"county",$("#countyNamex").html());
    myjsonStr = setJson(myjsonStr,"agentAddress",$("#agentAddressx").val());
    myjsonStr = setJson(myjsonStr,"legalPersonName",$("#legalPersonNamex").val());
    myjsonStr = setJson(myjsonStr,"legalPersonPhone",$("#legalPersonPhonex").val());
    myjsonStr = setJson(myjsonStr,"agentAllpayId",$("#agentAllpayIdx").val());
    myjsonStr = setJson(myjsonStr,"agentAllpaykey",$("#agentAllpaykeyx").val());
    myjsonStr = setJson(myjsonStr,"remarke",$("#reMarkx").val());
    myjsonStr = setJson(myjsonStr,"userId",userId);
    myjsonStr = setJson(myjsonStr,"userName",$.cookie("userNickName_d"));
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_creatAgent);
}

function callBack_creatAgent(data){
    if(data.code==0){
        //location.href ="agentManagement.html";
        alert("操作成功！");
        HideShelter();
        $('.pop-layer').hide();
        findAgent(pageCurrent);
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}

function checkOutExcel(){
    var jsonPrama = {
        "marked": "Dounenglu_agentCheckOutExcel",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null,"agentName",$("#agentName").val().trim());
    myjsonStr = setJson(myjsonStr,"agentShortName",$("#agentShortName").val().trim()) ;
    myjsonStr = setJson(myjsonStr,"branchID",branchID);
    myjsonStr = setJson(myjsonStr,"agentState","") ;
    myjsonStr = setJson(myjsonStr,"agentLevel","");
    myjsonStr = setJson(myjsonStr,"agentId",agentId) ;
    myjsonStr = setJson(myjsonStr,"provinceID","");
    myjsonStr = setJson(myjsonStr,"cityId","") ;
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