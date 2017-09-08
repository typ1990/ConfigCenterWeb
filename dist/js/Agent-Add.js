/**
 * Created by BaiYuQiang on 2016/2/29.
 */
var branchID=$.cookie("branchId_d");
var branchName=$.cookie("branchName_d");
var agentId=$.cookie("agentId_d");
var agentName=$.cookie("agentName_d");
$(function(){
    if($.cookie("isDemonstration_d")=="0"){
        $("#savedata").attr("disabled", true);
    }
    $("#agentAllpayId").val("");
    $("#agentAllpaykey").val("");
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
        $('#agentLevellist').append("<li data-value=\""+(i-j)+"\"><a>"+(i-j)+"级</a></li>");
    }

    if((i-a)==0){
       alert("最下级代理商不能添加代理商");
        $("#savedata").attr("disabled",true);
        $("#import").attr("disabled",true);
        $("#download").attr("disabled",true);
    }
    pull_down_menu('#agentLevellist li','#agentLevel');
    $('#download').click(function(e) {
        window.open(excelDownUrl+"agent.xls");
    });
    $('#getdata').click(function(e) {
        getdounengshouAPI();
    });

    $('#branch').text(branchName);
    $("#branch").attr("data-value",branchID);
    selectProvice();

    //根据省份查询城市列表
    $('#citybutton').click(function(e) {
        selectCity();
        $('#countyName').text("--");
        $("#countyName").attr("data-value","");
    });
    $('#provincebutton').click(function(e) {
        $('#cityName').text("--");
        $("#cityName").attr("data-value","");
        $('#countyName').text("--");
        $("#countyName").attr("data-value","");
    });

    $('#countybutton').click(function(e) {
        selectCounty();
    });

    //点击所属上级代理
    $('#agentLocationbutton').click(function(e) {

        if($("#agentLevel").attr("data-value")=="2") {
            $('#agentLocationlist').html("");
            if($.cookie("userType_d")=="firstAgentAdmin"){
            $('#agentLocation').text(agentName);
            $("#agentLocation").attr("data-value",agentId);
            }
        }if($("#agentLevel").attr("data-value")=="3"){
            if($.cookie("userType_d")=="firstAgentAdmin"){
                selectFAgent();
            }
            if($.cookie("userType_d")=="seoundAgentAdmin"){
                $('#agentLocation').text(agentName);
                $("#agentLocation").attr("data-value",agentId);
            }

        }if($("#agentLevel").attr("data-value")==""){
            alert("请先选择代理级别");
        }
    });

    //$('#branchButton').click(function(e) {
    //    $('#agentLocation').text("--");
    //    $('#agentLocation').attr("data-value","");
    //});

    $('#agentLevelbutton').click(function(e) {
        $('#agentLocation').text("--");
        $('#agentLocation').attr("data-value","0");
    });

    $('#savedata').click(function(e) {
        saveAgent();
    });

    var upurl=preRegistShopUrl+'?redirect='+window.location.href.replace(/\/[^\/]*$/,'/jQueryfileupload/uploadresult.html');
    $('#import').fileupload(
        {

            add: function(e, data) {
                var uploadErrors = [];
                var acceptFileTypes = /^image\/(jpe?g)$/i;
                //if(data.originalFiles[0]['type']=="" || (data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type']))) {
                //    uploadErrors.push('上传的文件类型不符合要求，请上传jpg类型的文件');
                //}
                if(data.originalFiles[0].size > 100000000) {
                    uploadErrors.push('文件尺寸过大，限制文件大小100M');
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
                //alert("dd");
                var na=data.result.files[0].name;
                $("#show").html("上传成功！正在解析。。。");
                readExcel(na);
                //alert(na);

            },

        }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

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

function readExcel(p) {
    var jsonPrama = {
        "marked": "AgentAction_import",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null, "url", p);
    jsonPrama.jsonStr = myjsonStr;
    jQuery.axjsonp(oldurl, jsonPrama, callBack);
}

function callBack(data) {
    if (data.rspCode == 0) {
        var aa="数据导入成功，导入的数据总数为："+data.count;
        if(data.empty!=0){
            aa="导入的数据部分保存成功，导入成功的数据数量为："+data.count
                +"    空数据行数为："+data.emptryStr;

        }
        $("#show").html("解析完成！");
        alert(aa);

    }else {
        var bb="数据导入失败  "+data.rspDesc;
        if(data.empty!=0){

            bb+="     导入的空数据总行数为："+data.empty;
            bb+="     导入的空数据行数为："+data.emptryStr;
        }
        if(data.error!=0){
            bb+="     导入的错误数据总行数为："+data.error;
            bb+="     导入的错误数据行数为："+data.errorStr;
        }
        $("#show").html("解析完成！");
        alert(bb);
        return;
    }
    $("#show").html("解析完成！");
}

//自动生成代理商编号
function getAgentNum(){
    var jsonPrama = {
        "marked": "AgentAction_getAgentNum",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_getAgentNum);
}

function callBack_getAgentNum(data){
    if(data.code==0){
        $("#agentNum").val(data.agentNum);
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}

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

    return;
}

//查询二级级代理商
function selectFAgent(){
    var jsonPrama = {
        "marked": "AgentAction_findSecondAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($("#branch").attr("data-value")==""){
        alert("请先选择分公司！");
        return;
    }
    //if($('#agentLevel').attr("data-value")==1){
    //    $('#agentLocationlist').html("");
    //    $('#agentLocation').html("--");
    //    $('#agentLocation').attr("data-value","0");
    //    alert("一级代理不存在上级代理，无需填写");
    //    return;
    //}
    var myjsonStr = setJson(null,"branchId",$("#branch").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentId",agentId);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectFAgent);
}

function callBack_selectFAgent(data){
    if(data.code==0){
        $('#agentLocationlist').html("");
        $('#agentLocation').html("--");
        $('#agentLocation').attr("data-value","0");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.agentId+"><a>"+entry.agentName+"</a></li>";
            $('#agentLocationlist').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down_menu('#agentLocationlist li','#agentLocation');
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
            $('#provinceNamelist').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    pull_down_menu('#provinceNamelist li','#provinceName');
    getAgentNum();
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

function selectCounty(){
    var jsonPrama = {
        "marked": "findProviceOrCity",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($('#cityName').attr("data-value")==""){
        return;
    }
    var myjsonStr = setJson(null,"parentId",$('#cityName').attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",3);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectCounty);
}

function callBack_selectCounty(data){
    if(data.code==0){
        $('#countyNamelist').html("");
        $('#countyName').html("--");
        $("#countyName").attr("data-value","");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a href=\"#\">"+entry.name+"</a></li>";
            $('#countyNamelist').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down_menu('#countyNamelist li','#countyName');
    return;
}

function saveAgent(){
    var jsonPrama = {
        "marked": "AgentAction_saveAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    if($("#agentName").val().trim()==""){
        alert("请填写代理商全称！");
        return;
    }
    if($("#branch").attr("data-value")==""){
        alert("请填写分公司！");
        return;
    }
    if($("#provinceName").attr("data-value")==""){
        //alert("请选择省份！");
        //return;
    }
    if($("#cityName").attr("data-value")==""){
        //alert("请选择城市！");
        //return;
    }
    if($("#countyName").attr("data-value")==""){
        //alert("请选择区县！");
        //return;
    }
    if($("#agentLevel").attr("data-value")==""){
        alert("请选择代理级别！");
        return;
    }
    if($("#agentLocation").attr("data-value")==""){
        alert("请选择所属上级代理！");
        return;
    }

    //if($("#agentLevel").attr("data-value")==2&&$("#agentLocation").attr("data-value")==""){
    //    alert("二级代理需填写上级代理商！");
    //    return;
    //}

    if($("#agentContentshow").attr("data-value")==""){
        //alert("请上传代理商文件！");
        //return;
    }

    //if($("#agentAllpayId").val().trim()==""){
    //    alert("请填写代理商接入ID！");
    //    return;
    //}
    //if($("#agentAllpaykey").val().trim()==""){
    //    alert("请填写代理商接入key1！");
    //    return;
    //}$("#agentContentshow").attr("data",na);

    var myjsonStr = setJson(null,"agentName",$("#agentName").val());
    myjsonStr = setJson(myjsonStr,"agentNum",$("#agentNum").val());
    myjsonStr = setJson(myjsonStr,"agentContent",$("#agentContentshow").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentShortName",$("#agentShortName").val());
    //alert($("#branch").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"branchID",$("#branch").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentState",$("#state").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentLevel",$("#agentLevel").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentLocation",$("#agentLocation").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"proviceID",$("#provinceName").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"proname",$("#provinceName").html());
    myjsonStr = setJson(myjsonStr,"cityID",$("#cityName").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"city",$("#cityName").html());
    myjsonStr = setJson(myjsonStr,"countyID",$("#countyName").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"county",$("#countyName").html());
    myjsonStr = setJson(myjsonStr,"agentAddress",$("#agentAddress").val());
    myjsonStr = setJson(myjsonStr,"legalPersonName",$("#legalPersonName").val());
    myjsonStr = setJson(myjsonStr,"legalPersonPhone",$("#legalPersonPhone").val());
    myjsonStr = setJson(myjsonStr,"agentAllpayId",$("#agentAllpayId").val());
    myjsonStr = setJson(myjsonStr,"agentAllpaykey",$("#agentAllpaykey").val());
    myjsonStr = setJson(myjsonStr,"remarke",$("#reMark").val());
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_creatAgent);
}

function callBack_creatAgent(data){
    if(data.code==0){
        //location.href ="agentManagement.html";
        location.href="./AgentInformation-Mgt.html";
        alert("操作成功！");
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}


function getdounengshouAPI(){
    var jsonPrama = {
        "marked": "AgentAction_getdounengshouAPI",
        "jsonStr": "{}"
    };

    var myjsonStr = setJson(null,"abc","");
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(oldurl, jsonPrama, callBack_getdounengshouAPI);
}

function callBack_getdounengshouAPI(data){
    if(data.code==0){
        if($("#agentAllpayId").val()==""){
        $("#agentAllpayId").val(data.id);
        }
        if($("#agentAllpaykey").val()=="") {
            $("#agentAllpaykey").val(data.key);
        }
        //HideShelter();
        //$('.pop-layer').hide();

    }else{
        alert(data.code+"   "+data.mess);
        return;
    }

    return;
}