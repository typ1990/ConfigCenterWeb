var branchType=$.cookie("branchType");
var branchname=$.cookie("branchName");
var branchID=$.cookie("branchID");

$(function(){
    $('#download').click(function(e) {
        //alert("a");
        window.open(excelDownUrl+"posparter.xls");
    });

    $('#branch').click(function(e) {
        //alert("qq");
        $('#belongname1').text("");
        if(branchType==0){
            findBranch();
        }else{
            $("#branchname1").html(branchname);
            $("#branchname1").attr("data-value",$.cookie("branchID"));
        }//加载分公司
    });
    $('#provice').click(function(e) {
        selectProvice();
        $('#cityname1').text("");
        $('#countryname1').text("");
    });
    $('#city').click(function(e) {
        selectCity();
        $('#countryname1').text("");
    });
    $('#country').click(function(e) {
        selectCountry();
    });
    $('#part').click(function(e) {
        //alert($("#11111").html());
        $('#belongname1').text("");
    });
    $('#belong').click(function(e) {
       //alert($("#11111").html());
        getContent();
    });

    $('#send').click(function(e) {
        //alert($("#11111").html());
        //alert("1");
        send();
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
                //$("#uplogoshow").html("上传成功！新名称："+na);
                $("#agentContentshow").html("上传成功");
                $("#wenjianName").html(na);
                $("#agentContentshow").attr("data",na);
                //logotp=na;
                //$("#agentContentId")[0].src=imgBaseUrl+"/uploads/"+na;

                //readExcel(na);
                //alert(na);

            },

        }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

});

function readExcel(p) {
    var jsonPrama = {
        "marked": "addPOSParter_import",
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



function getContent(){
    var aa=$("#11111").html();
    if(aa=="第二级合作方"){
        getLevelOne();
    }
    if(aa=="第一级合作方")
    {
        $('#belongname').html("");
        alert("合作方为第一级合作方，没有所属上级合作方");
    }

}

function getLevelOne(){

    var jsonPrama = {
        "marked": "addPOSParter_getOneLevel",
        "jsonStr": "{}"
    };
    if($("#branchname1")[0].innerText==""){
        alert("请选择公司所属的分子公司");
        return;
    }
    var myjsonStr = setJson(null,"branchID",$("#branchname1").attr("data-value"));
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_getLevelOne);
}

function callBack_getLevelOne(data){
    $('#belongname').html("");
    if(data.rspCode==0){
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a>"+entry.name+"</a></li>";
            $('#belongname').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    haha();
    return;
}


/**
 * 查询所有省份
 */
function selectProvice(){

    var jsonPrama = {
        "marked": "findProviceOrCity",
        "jsonStr": "{}"
    };

    var myjsonStr = setJson(null,"level","1");
    myjsonStr = setJson(myjsonStr,"parentId","0");
    jsonPrama.jsonStr=myjsonStr;

    jQuery.axjsonp(url, jsonPrama, callBack_selectProvice);
}

function callBack_selectProvice(data){
    $('#proname').html("");
    if(data.code==0){
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a>"+entry.name+"</a></li>";
            $('#proname').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    haha();
    return;
}
//查找城市
function selectCity(){
    var jsonPrama = {
        "marked": "findProviceOrCity",
        "jsonStr": "{}"
    };if($('#proname1').attr("data-value")==""){
        return;
    }
    var myjsonStr = setJson(null,"parentId",$('#proname1').attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",2);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectCity);
}

function callBack_selectCity(data){
    if(data.code==0){
        $('#cityname').html("");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a>"+entry.name+"</a></li>";
            $('#cityname').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    haha();
    return;
}

//查找城市
function selectCountry(){
    var jsonPrama = {
        "marked": "findProviceOrCity",
        "jsonStr": "{}"
    };
    if($('#proname1').attr("data-value")==""){
        return;
    }
    var myjsonStr = setJson(null,"parentId",$('#cityname1').attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",3);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectCountry);
}

function callBack_selectCountry(data){
    if(data.code==0){
        $('#countryname').html("");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a>"+entry.name+"</a></li>";
            $('#countryname').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    haha();
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
    $('#branchname').html("");
    if(data.code==0){
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a>"+entry.name+"</a></li>";
            $('#branchname').append(strHtml);
        });
    }else{

        alert(data.code+"   "+data.mess);
        return;
    }
    haha();
    return;
}

function send(){
    //if($("#parterId").val().trim()==""){
    //    alert("合作方编号不能为空，请重新填写！");
    //    return;
    //}

    if($("#parterAllName").val().trim()==""){
        alert("合作方全称不能为空，请重新填写！");
        return;
    }

    if($("#connectPerson").val().trim()==""){
        //alert("联系人不能为空，请重新填写！");
        //return;
    }
    
    //alert($("#parterId").val().trim());
    //alert($("#parterAllName").val().trim());
    //alert($("#parterShortName").val().trim());
    //alert($("#connectPerson").val().trim());
    //alert($("#connectTel").val().trim());
    //alert($("#address").val().trim());
    var jsonPrama = {
        "marked": "addPOSParter",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null,"parterId","");
    myjsonStr = setJson(myjsonStr,"pos_parterID","");
    myjsonStr = setJson(myjsonStr,"parterAllName",$("#parterAllName").val().trim());
    myjsonStr = setJson(myjsonStr,"parterShortName",$("#parterShortName").val().trim());
    myjsonStr = setJson(myjsonStr,"connectPerson",$("#connectPerson").val().trim());
    myjsonStr = setJson(myjsonStr,"connectTel",$("#connectTel").val().trim());
    myjsonStr = setJson(myjsonStr,"address",$("#address").val().trim());
    var parterLevel="0";
    if("第一级合作方"==$("#11111")[0].innerText){
        parterLevel="1";
    }
    if("第二级合作方"==$("#11111")[0].innerText){
        parterLevel="2";
    }
    if(parterLevel=="0"){
        //alert("请选择公司所属的合作方级别");
        //return;
    }
    myjsonStr = setJson(myjsonStr,"parterLevel",parterLevel);
    if($("#branchname1")[0].innerText==""){
        alert("请选择公司所属的分子公司");
        return;
    }

    myjsonStr = setJson(myjsonStr,"branchName",$("#branchname1")[0].innerText);
    myjsonStr = setJson(myjsonStr,"branchId",$("#branchname1").attr("data-value"));
    var belongParter;
    var belongParterId;
    if($("#belongname1")[0].innerText==""){
        belongParter="";
        belongParterId="";
    }else{
        belongParter=$("#belongname1")[0].innerText;
        belongParterId=$("#belongname1").attr("data-value");
    }
    if("第二级合作方"==$("#11111")[0].innerText){
        if(belongParter==""){
            alert("请选择所属上级合作方");
            return;
        }
    }
    myjsonStr = setJson(myjsonStr,"belongParter",belongParter);
    myjsonStr = setJson(myjsonStr,"belongParterId",belongParterId);
    if($("#proname1")[0].innerText==""){
        //alert("请选择省");
        //return;
    }
    myjsonStr = setJson(myjsonStr,"provinceName",$("#proname1")[0].innerText);
    myjsonStr = setJson(myjsonStr,"provinceId",$("#proname1").attr("data-value"));
    if($("#cityname1")[0].innerText==""){
        //alert("请选择地市");
       // return;
    }
    myjsonStr = setJson(myjsonStr,"cityName",$("#cityname1")[0].innerText);
    myjsonStr = setJson(myjsonStr,"cityId",$("#cityname1").attr("data-value"));
    if($("#countryname1")[0].innerText==""){
       // alert("请选择县区");
        //return;
    }
    myjsonStr = setJson(myjsonStr,"countryName",$("#countryname1")[0].innerText);
    myjsonStr = setJson(myjsonStr,"countryId",$("#countryname1").attr("data-value"));
    var state="1";
    if("启用"==$("#statename")[0].innerText){
        state="1";
    }
    if("停用"==$("#statename")[0].innerText){
        state="0";
    }
    if(state=="3"){
       // alert("请选择合作方状态");
       // return;
    }
    myjsonStr = setJson(myjsonStr,"parter_state",state);
    myjsonStr = setJson(myjsonStr,"advice","");
    myjsonStr = setJson(myjsonStr,"remark",$("#remark").val().trim());
    myjsonStr = setJson(myjsonStr,"userID",userRoleName);
    //alert($("#agentContentshow").attr("data"));
    var contractImg="";
    if($("#agentContentshow").attr("data")!=null){
        contractImg=$("#agentContentshow").attr("data");
    }
    myjsonStr = setJson(myjsonStr,"contractImg",contractImg);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_send);
}
function callBack_send(data){
    if(data.rspCode=="000"){
    alert("添加成功");
     location.href="./PosPartner-Mgt.html";
    }else{
    alert(data.rspCode+"   "+data.rspDesc);
    return;
    }
    return;
}

