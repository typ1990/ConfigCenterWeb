/**
 * Created by BaiYuQiang on 2016/2/29.
 */
//var branchType=$.cookie("branchType");
var branchID=$.cookie("branchId_d");
var branchName=$.cookie("branchName_d");
var agentId=$.cookie("agentId_d");
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
        $('#agentLevellist').append("<li data-value=\""+(i-j)+"\"><a>"+(i-j)+"级</a></li>");
    }
    pull_down_menu('#agentLevellist li','#agentLevel');
    if((i-a)==0){
        alert("最下级代理商不能添加代理商人员");
        $("#savedata").attr("disabled",true);
        $("#import").attr("disabled",true);
        $("#download").attr("disabled",true);
    }

    $('#branch').text(branchName);
    $("#branch").attr("data-value",branchID);

    $('#download').click(function(e) {
        //alert("a");
        window.open(excelDownUrl+"agentuser.xls");
    });
    //查询一级代理商
    $('#agentLocationbutton').click(function(e) {
        //if($("#agentLevel").attr("data-value")=="1") {
        //    alert("代理为一级时，无需添加上级！");
        //    return;
        //}
        selectFAgent();
    });
    $('#agentLevelbutton').click(function(e) {
        $('#agentLocation').text("--");
        $('#agentLocation').attr("data-value","");
    });



    $('#savedata').click(function(e) {
        if(CheckIsMobile($("#agentUserPhone").val().trim())){
            saveAgentUser();
        }
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


});

function readExcel(p) {
    var jsonPrama = {
        "marked": "AgentUserAction_import",
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

//查询该代理商下相应级别的代理
function selectFAgent(){
    var jsonPrama = {
        "marked": "AgentAction_findlevelAgent",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    };
    if($("#agentLevel").attr("data-value")==""){
        alert("请先选择代理商级别！");
        return;
    }
    //if($('#agentLevel').attr("data-value")==1){
    //    $('#agentLocationlist').html("");
    //    $('#agentLocation').html("--");
    //    $('#agentLocation').attr("data-value","");
    //    alert("一级代理不存在上级代理，无需填写");
    //    return;
    //}
    var myjsonStr = setJson(null,"branchId",$("#branch").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",$("#agentLevel").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"agentLocation",agentId);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectFAgent);
}

function callBack_selectFAgent(data){
    if(data.code==0){
        $('#agentLocationlist').html("");
        $('#agentLocation').html("--");
        $('#agentLocation').attr("data-value","");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.agentId+"><a href=\"#\">"+entry.agentName+"</a></li>";
            $('#agentLocationlist').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down_menu('#agentLocationlist li','#agentLocation');
    return;
}

function saveAgentUser(){
    var jsonPrama = {
        "marked": "AgentUserAction_addAgentUser",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    if($("#agentUserName").val().trim()==""){
        alert("请填写代理员姓名！");
        return;
    }
    if($("#branch").attr("data-value")==""){
        alert("请填写分公司！");
        return;
    }

    //if($("#agentUserNum").val()==""){
    //    alert("请填写代理员编号！");
    //    return;
    //}
    if($("#agentUserPhone").val().trim()==""){
        alert("请填写手机号！");
        return;
    }


    if($("#agentLocation").attr("data-value")==""){
        alert("请填写所属代理商！");
        return;
    }

    var myjsonStr = setJson(null,"agentUserNum","");
    myjsonStr = setJson(myjsonStr,"agentUserName",$("#agentUserName").val());
    myjsonStr = setJson(myjsonStr,"agentUserPhone",$("#agentUserPhone").val());
    myjsonStr = setJson(myjsonStr,"agentUserAdress",$("#agentUserAdress").val());
    myjsonStr = setJson(myjsonStr,"agentLocation",$("#agentLocation").attr("data-value"));
    var userType = "";
    if($("#agentLevel").attr("data-value") == ""){
        alert("请选择所属代理商级别！");
        return;
    }
    if($("#agentLevel").attr("data-value") == 1){
        userType = "firstAgentAdmin";
    }else if($("#agentLevel").attr("data-value") == 2){
        userType = "seoundAgentAdmin";
    }else if($("#agentLevel").attr("data-value") == 3){
        userType = "thirdAgentAdmin";
    }
    myjsonStr = setJson(myjsonStr,"agentLevel",userType);
    myjsonStr = setJson(myjsonStr,"branchID",$("#branch").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"state",$("#state").attr("data-value"));
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_saveAgentUser);
}

function callBack_saveAgentUser(data){
    if(data.code==0){
        //location.href ="agentManagement.html";
        alert("操作成功！");
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}