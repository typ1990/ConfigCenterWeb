/**
 * Created by lisa on 2016/8/9.
 */
var i=3;//当代理级别为3时
var a;//当前的代理级别
var selectAgentName="";
var agentIdinfo;
var agentType="";
if($.cookie("userType_d")=="firstAgentAdmin"){
    a=1;
}
if($.cookie("userType_d")=="seoundAgentAdmin"){
    a=2;
}
if($.cookie("userType_d")=="thirdAgentAdmin"){
    a=3;
}

$(function(){
    //$("#yijian").show();
    //$("#return").show();
    if($.cookie("agentId_d")==null){
        parent.ssaa();
    }

    createLevel();
    if((i-a)==0){
        alert("最下级代理商不能添加代理商");
        $("#savedata").attr("disabled",true);
        $("#import").attr("disabled",true);
        $("#download").attr("disabled",true);
        $("#agentContent").attr("disabled",true);
        $("#getdata").attr("disabled",true);
    }
    getAgentNum();
    agentIdinfo=request.QueryString("agentId");
    var tt=request.QueryString("editFla");
    //alert(tt);
    if(tt=="0"){
        //alert("查看");
        $("#title").html("查看代理");
        $("#savedata").attr("disabled",true);
        $("#savedata").hide();
        $("#download").attr("disabled",true);
        $("#daoru").hide();
        $("#shangchuan").hide();
        $("#getdata").attr("disabled",true);
        $("#agentContent").attr("disabled",true);
        $("#return").show();
        $("#person").attr("disabled",true);
        $("#company").attr("disabled",true);
        $("#agentNames").attr("disabled",true);
        $("#agentShortName").attr("disabled",true);
        $("#legalPersonName").attr("disabled",true);
        $("#legalPersonPhone").attr("disabled",true);
        $("#state").attr("disabled",true);
        $("#agentLevellist").attr("disabled",true);
        $("#agentLocationlist").attr("disabled",true);
        $("#provinceNamelist").attr("disabled",true);
        $("#cityNamelist").attr("disabled",true);
        $("#countyNamelist").attr("disabled",true);
        $("#agentAddress").attr("disabled",true);
        $("#agentAllpayId").attr("disabled",true);
        $("#agentAllpaykey").attr("disabled",true);
        //$("#yijian").show();
        $("#reMark").attr("disabled",true);
        findAgentInfo(agentIdinfo);
    }
    if(tt=="1"){
        $("#title").html("修改代理");
        $("#agentNames").attr("disabled",true);
        $("#yijian").show();
        findAgentInfo(agentIdinfo);
        $("#savedata").html("修改");
    }
    $('#return').click(function(e) {
        location.href="./Agent-list.html?";
    });
    selectProvice();
    $('#getdata').click(function(e) {
        getdounengshouAPI();
    });

    $('#savedata').click(function(e) {
        if($("#savedata").html()=="提交"){
            saveAgent();
        }
        if($("#savedata").html()=="修改"){
            updateAgent();
        }

    });

    $('#download').click(function(e) {
        location.href =excelDownUrl+"agentExample.xls";
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

});

function readExcel(p) {
    var jsonPrama = {
        "marked": "AgentAction_importAgent_dounenglu",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null, "url", p);
    jsonPrama.jsonStr = myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack);
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
        if(data.empty!=0&&data.empty!=undefined){

            bb+="     导入的空数据总行数为："+data.empty;
            bb+="     导入的空数据行数为："+data.emptryStr;
        }
        if(data.error!=0&&data.empty!=undefined){
            bb+="     导入的错误数据总行数为："+data.error;
            bb+="     导入的错误数据行数为："+data.errorStr;
        }
        $("#show").html("解析完成！");
        alert(bb);
        return;
    }
    $("#show").html("解析完成！");
}


function aab(){
    $('#agentLevellist').onchange();

}
function createLevel(){

    //根据代理商的等级进行，下级的添加
    for(var j=0;j<i-a;j++){
        //$('#agentLevellistx').append("<li data-value=\""+i-j+"\"><a>"+i-j+"级</a></li>");
        $('#agentLevellist').append("<option data-value=\""+(i-j)+"\"  >"+(i-j)+"级</option>");
    }
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
            var strHtml = "<option data-value="+entry.id+">"+entry.name+"</option>";
            $('#provinceNamelist').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    return;
}

function selectCity(){
    $("#cityNamelist").empty();
    $("#cityNamelist").append("<option selected=\"selected\" data-value=\"0\">地市</option>");
    $("#countyNamelist").empty();
    $("#countyNamelist").append("<option selected=\"selected\" data-value=\"0\">区县</option>");
    if($("#provinceNamelist").find("option:selected").attr("data-value")=="0"){
        return;
    }
    var jsonPrama = {
        "marked": "findProviceOrCity",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($('#provinceName').attr("data-value")==""){
        return;
    }
    var myjsonStr = setJson(null,"parentId",$("#provinceNamelist").find("option:selected").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",2);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectCity);
}

function callBack_selectCity(data){
    if(data.code==0){
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<option data-value="+entry.id+">"+entry.name+"</option>";
            $('#cityNamelist').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    return;
}
function selectCounty(){
    $("#countyNamelist").empty();
    $("#countyNamelist").append("<option selected=\"selected\" data-value=\"0\">区县</option>");
    var jsonPrama = {
        "marked": "findProviceOrCity",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($("#cityNamelist").find("option:selected").attr("data-value")=="0"){
        return;
    }
    var myjsonStr = setJson(null,"parentId",$("#cityNamelist").find("option:selected").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",3);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectCounty);
}

function callBack_selectCounty(data){
    if(data.code==0){
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<option data-value="+entry.id+">"+entry.name+"</option>";
            $('#countyNamelist').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}

function getdounengshouAPI(){
    var jsonPrama = {
        "marked": "AgentAction_getdounengshouAPI_dounenglu",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };

    var myjsonStr = setJson(null,"abc","");
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_getdounengshouAPI);
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

function getBelowAgent(){
    if($("#agentLevellist").find("option:selected").attr("data-value")=="0"){
        $('#agentLocationlist').html("");
        $('#agentLocationlist').html("<option selected=\"selected\" data-value=\"0\">--</option>");
    }
    if($("#agentLevellist").find("option:selected").attr("data-value")=="2") {
        $('#agentLocationlist').html("");
        if($.cookie("userType_d")=="firstAgentAdmin"){
            $('#agentLocationlist').append("<option selected=\"selected\" data-value=\""+$.cookie("agentId_d")+"\">"+$.cookie("agentName_d")+"</option>");
        }
    }if($("#agentLevellist").find("option:selected").attr("data-value")=="3"){
        if($.cookie("userType_d")=="firstAgentAdmin"){
            selectFAgent();
        }
        if($.cookie("userType_d")=="seoundAgentAdmin"){
            $('#agentLocationlist').html("");
            $('#agentLocationlist').append("<option selected=\"selected\" data-value=\""+$.cookie("agentId_d")+"\">"+$.cookie("agentName_d")+"</option>");
        }
    }
}
//查询二级级代理商
function selectFAgent(){
    var jsonPrama = {
        "marked": "AgentAction_findSecondAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };

    var myjsonStr = setJson(null,"branchId",$.cookie("branchId_d"));
    myjsonStr = setJson(myjsonStr,"agentId",$.cookie("agentId_d"));
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectFAgent);
}

function callBack_selectFAgent(data){
    if(data.code==0){
        $('#agentLocationlist').html("");
        $.each(data.list,function(entryIndex, entry){
            if(entry.agentName!=selectAgentName){
            var strHtml = "<option data-value="+entry.agentId+">"+entry.agentName+"</a></option>";
            $('#agentLocationlist').append(strHtml);
            }else{
                var strHtml = "<option selected=\"selected\" data-value="+entry.agentId+">"+entry.agentName+"</a></option>";
                $('#agentLocationlist').append(strHtml);
                selectAgentName="";
            }
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}

function updateAgent(){
    var jsonPrama = {
        "marked": "AgentAction_updateAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    //alert($('input:radio:checked').val());
    if($('input:radio:checked').val()=="option1"){
        agentType="1";
    }
    if($('input:radio:checked').val()=="option"){
        agentType="0";
    }

    if($('input:radio:checked').val()=="option1"){
        agentType="1";
    }
    if($('input:radio:checked').val()=="option"){
        agentType="0";
    }


    if($("#agentNum").val().trim()==""){
        alert("请重新加载本页");
        return;
    }
    if($("#agentNames").val().trim()==""){
        alert("请填写代理商全称！");
        return;
    }

    if($("#agentLevellist").find("option:selected").attr("data-value")=="0"){
        alert("请选择代理级别！");
        return;
    }
    if($("#agentLocationlist").find("option:selected").attr("data-value")=="0"){
        alert("请选择所属上级代理！");
        return;
    }

    //if($("#agentLevel").attr("data-value")==2&&$("#agentLocation").attr("data-value")==""){
    //    alert("二级代理需填写上级代理商！");
    //    return;
    //}

    if($("#reMark").val()==""){
        alert("请填写变更意见");
        return;
    }



    var myjsonStr = setJson(null,"agentName",$("#agentNames").val());
    myjsonStr = setJson(myjsonStr,"agentId",agentIdinfo);
    //alert(agentType);
    myjsonStr = setJson(myjsonStr,"agentType",agentType);
    myjsonStr = setJson(myjsonStr,"agentNum",$("#agentNum").val());
    myjsonStr = setJson(myjsonStr,"agentContent",$("#agentContentshow").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentShortName",$("#agentShortName").val());
    //alert($("#branch").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"branchID",$.cookie("branchId_d"));
    myjsonStr = setJson(myjsonStr,"agentState",$("#state").find("option:selected").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentLevel",$("#agentLevellist").find("option:selected").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentLocation",$("#agentLocationlist").find("option:selected").attr("data-value"));
    var shengid;
    var sheng;
    if($("#provinceNamelist").find("option:selected").val()=="省份"){
        sheng="--";
        shengid="";
    }else{
        sheng=$("#provinceNamelist").find("option:selected").val();
        shengid=$("#provinceNamelist").find("option:selected").attr("data-value");
    }
    myjsonStr = setJson(myjsonStr,"proviceID",shengid);
    myjsonStr = setJson(myjsonStr,"proname",sheng);
    var cityid;
    var city;
    if($("#cityNamelist").find("option:selected").val()=="地市"){
        city="--";
        cityid="";
    }else{
        city=$("#cityNamelist").find("option:selected").val();
        cityid=$("#cityNamelist").find("option:selected").attr("data-value");
    }
    myjsonStr = setJson(myjsonStr,"cityID",cityid);
    myjsonStr = setJson(myjsonStr,"city",city);
    var countyid;
    var county;
    if($("#countyNamelist").find("option:selected").val()=="区县"){
        county="--";
        countyid="";
    }else{
        county=$("#countyNamelist").find("option:selected").val();
        countyid=$("#countyNamelist").find("option:selected").attr("data-value");
    }
    myjsonStr = setJson(myjsonStr,"countyID",countyid);
    myjsonStr = setJson(myjsonStr,"county",county);
    myjsonStr = setJson(myjsonStr,"agentAddress",$("#agentAddress").val());
    myjsonStr = setJson(myjsonStr,"legalPersonName",$("#legalPersonName").val());
    var phone=$("#legalPersonPhone").val();
    var reg = new RegExp("^[0-9]*$");
    if(phone!=""){
        if(phone.length <11 || phone.length >11
            || phone.substr(0,1)!=1 || !reg.test(phone))
        {
            alert("联系人手机号格式不正确,请重新输入");
            return;
        }

    }
    myjsonStr = setJson(myjsonStr,"legalPersonPhone",$("#legalPersonPhone").val());
    myjsonStr = setJson(myjsonStr,"agentAllpayId",$("#agentAllpayId").val());
    myjsonStr = setJson(myjsonStr,"agentAllpaykey",$("#agentAllpaykey").val());
    myjsonStr = setJson(myjsonStr,"remarke",$("#reMark").val());
    myjsonStr = setJson(myjsonStr,"userId",$.cookie("userId_d"));
    myjsonStr = setJson(myjsonStr,"userName",$.cookie("userNickName_d"));
    jsonPrama.jsonStr=myjsonStr;
    console.log(jsonPrama);
    jQuery.axjsonp(url, jsonPrama, callBack_updateAgent);
}

function callBack_updateAgent(data){
    if(data.code==0){
        //location.href ="agentManagement.html";
        location.href="./Agent-list.html";
        alert("修改成功！");
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}


function saveAgent(){
    var jsonPrama = {
        "marked": "AgentAction_saveAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    //var agentType;
    //if($("#person").attr("checked")=="checked"){
    //    agentType="0";
    //}
    //if($("#company").attr("checked")=="checked"){
    //    agentType="1";
    //}
    if($('input:radio:checked').val()=="option1"){
        agentType="1";
    }
    if($('input:radio:checked').val()=="option"){
        agentType="0";
    }

    if($("#agentNum").val().trim()==""){
        alert("请重新加载本页");
        return;
    }
    if($("#agentNames").val().trim()==""){
        alert("请填写代理商全称！");
        return;
    }

    if($("#agentLevellist").find("option:selected").attr("data-value")=="0"){
        alert("请选择代理级别！");
        return;
    }
    if($("#agentLocationlist").find("option:selected").attr("data-value")=="0"){
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



    var myjsonStr = setJson(null,"agentName",$("#agentNames").val());
    //alert(agentType);
    myjsonStr = setJson(myjsonStr,"agentType",agentType);
    myjsonStr = setJson(myjsonStr,"agentNum",$("#agentNum").val());
    myjsonStr = setJson(myjsonStr,"agentContent",$("#agentContentshow").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentShortName",$("#agentShortName").val());
    //alert($("#branch").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"branchID",$.cookie("branchId_d"));
    myjsonStr = setJson(myjsonStr,"agentState",$("#state").find("option:selected").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentLevel",$("#agentLevellist").find("option:selected").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentLocation",$("#agentLocationlist").find("option:selected").attr("data-value"));
    var shengid;
    var sheng;
    if($("#provinceNamelist").find("option:selected").val()=="省份"){
        sheng="--";
        shengid="";
    }else{
        sheng=$("#provinceNamelist").find("option:selected").val();
        shengid=$("#provinceNamelist").find("option:selected").attr("data-value");
    }
    myjsonStr = setJson(myjsonStr,"proviceID",shengid);
    myjsonStr = setJson(myjsonStr,"proname",sheng);
    var cityid;
    var city;
    if($("#cityNamelist").find("option:selected").val()=="地市"){
        city="--";
        cityid="";
    }else{
        city=$("#cityNamelist").find("option:selected").val();
        cityid=$("#cityNamelist").find("option:selected").attr("data-value");
    }
    myjsonStr = setJson(myjsonStr,"cityID",cityid);
    myjsonStr = setJson(myjsonStr,"city",city);
    var countyid;
    var county;
    if($("#countyNamelist").find("option:selected").val()=="区县"){
        county="--";
        countyid="";
    }else{
        county=$("#countyNamelist").find("option:selected").val();
        countyid=$("#countyNamelist").find("option:selected").attr("data-value");
    }
    myjsonStr = setJson(myjsonStr,"countyID",countyid);
    myjsonStr = setJson(myjsonStr,"county",county);
    myjsonStr = setJson(myjsonStr,"agentAddress",$("#agentAddress").val());
    myjsonStr = setJson(myjsonStr,"legalPersonName",$("#legalPersonName").val());
    var phone=$("#legalPersonPhone").val();
    var reg = new RegExp("^[0-9]*$");
    if(phone!=""){
        if(phone.length <11 || phone.length >11
            || phone.substr(0,1)!=1 || !reg.test(phone))
        {
            alert("联系人手机号格式不正确,请重新输入");
            return;
        }

    }
    myjsonStr = setJson(myjsonStr,"legalPersonPhone",$("#legalPersonPhone").val());
    myjsonStr = setJson(myjsonStr,"agentAllpayId",$("#agentAllpayId").val());
    myjsonStr = setJson(myjsonStr,"agentAllpaykey",$("#agentAllpaykey").val());
    myjsonStr = setJson(myjsonStr,"remarke",$("#reMark").val());
    jsonPrama.jsonStr=myjsonStr;
    console.log(jsonPrama);
    jQuery.axjsonp(url, jsonPrama, callBack_creatAgent);
}

function callBack_creatAgent(data){
    if(data.code==0){
        //location.href ="agentManagement.html";
        location.href="./Agent-list.html";
        alert("操作成功！");
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}

//查询详情以及修改页面反添数据查询方法
function findAgentInfo(agentId){
    // snum == 0 查询页面,  snum == 1 修改页面
    var jsonPrama = {
        "marked": "AgentAction_findAgentInfo",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null,"agentId",agentId);
    myjsonStr = setJson(myjsonStr,"snum","0") ;
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_findAgentInfo);
}
function callBack_findAgentInfo(data){

    if(data.code==0){
        if(data.agentType=="0"){
            $("#person").attr("checked","checked");
            $("#company").attr("checked",false)
        }else if(data.agentType=="1"){
            $("#company").attr("checked","checked");
            $("#person").attr("checked",false)
        }else{
            $("#person").attr("checked",false)
            $("#company").attr("checked",false)
        }
        $("#agentNum").val(data.agentNum);
        $("#agentNames").val(data.agentName);
        $("#agentShortName").val(data.agentShortName);
        $("#legalPersonName").val(data.legalPersonName);
        $("#legalPersonPhone").val(data.legalPersonPhone);
        var agentState = data.state;
        //alert(agentState);
        if(agentState == 0){
            $('#state').html("");
            $('#state').html("<option selected=\"selected\" data-value=\"0\">停用</option>");
            $('#state').append(" <option data-value=\"1\" >启用</option>");
        }else if(agentState == 1){
            $('#state').html("");
            $('#state').html("<option selected=\"selected\" data-value=\"1\">启用</option>");
            $('#state').append(" <option data-value=\"0\" >停用</option>");
        }
        var agentLevel = data.agentLevel;
        if(agentLevel == 1){
            $('#agentLevellist').html("");
            $('#agentLevellist').html("<option selected=\"selected\" data-value=\"1\">1级</option>");
            createLevel();
        }else if(agentLevel == 2){
            $('#agentLevellist').html("");
            $('#agentLevellist').html("<option selected=\"selected\" data-value=\"2\">2级</option>");
            $('#agentLevellist').append("<option  data-value=\"3\">3级</option>");
        }else if(agentLevel == 3){
            $('#agentLevellist').html("");
            $('#agentLevellist').html("<option selected=\"selected\" data-value=\"3\">3级</option>");
            if(a==1){
                $('#agentLevellist').append("<option data-value=\"2\">2级</option>");
            }
        }

        $('#agentLocationlist').html("");
        $('#agentLocationlist').html("<option selected=\"selected\" data-value=\""+data.superagentId+"\">"+data.superagentName+"</option>");
        if(agentLevel == 3&&a==1){
            selectAgentName=data.superagentName;
            getBelowAgent();
        }
        if(data.provinceName=="--"){
        $('#provinceNamelist').html("");
        $('#provinceNamelist').html("<option selected=\"selected\" data-value=\"0\">省份</option>");
        }else{
            $('#provinceNamelist').html("");
            $('#provinceNamelist').html("<option selected=\"selected\" data-value=\""+data.provinceID+"\">"+data.provinceName+"</option>");
        }
        if(data.cityName=="--"){
            $('#cityNamelist').html("");
            $('#cityNamelist').html("<option selected=\"selected\" data-value=\"0\">地市</option>");
        }else{
        $('#cityNamelist').html("");
        $('#cityNamelist').html("<option selected=\"selected\" data-value=\"+data.cityId+\">"+data.cityName+"</option>");
        }
        if(data.countyName=="--"){
            $('#countyNamelist').html("");
            $('#countyNamelist').html("<option selected=\"selected\" data-value=\"0\">区县</option>");
        }else{
            $('#countyNamelist').html("");
        $('#countyNamelist').html("<option selected=\"selected\" data-value=\"+data.countyId+\">"+data.countyName+"</option>");
        }
        $("#wenjianName").html(data.agentContactImg);
        $("#agentContentshow").attr("data-value",data.agentContactImg);
        //if(data.agentContactImg==""){
        //    $('#download').attr("disabled", true);
        //}else{
        //    $('#download').attr("disabled", false);
        //    $('#download').attr("url",data.agentContactImg);
        //}
        $("#agentAddress").val(data.agentAddress);

        $("#agentAllpayId").val(data.agentAllpayId);
        $("#agentAllpaykey").val(data.agentAllpaykey);
        $("#reMarkx").val(data.reMark);

    }else{
        alert(data.code+"   "+data.mess);
        return;
    }

    return;
}