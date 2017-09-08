var branchType=$.cookie("branchType");
var branchname=$.cookie("branchName");
//var userID=$.cookie("userID");
var IsCreatePage=false;
var pageCurrent = 1;
var stateval="";
var pagesize = 10;
var userName=$.cookie("userName");

$(function(){

    $('.download').click(function(){
        window.open(imgBaseUrl+"/uploads/"+ $('.download').attr("url"));

    });
        if(branchType==0){
            findBranch();
            findBranch1();
        }else{
            $("#branchname1").html(branchname);
            $("#branchname1").attr("data-value",$.cookie("branchID"));
            $("#branchname12").html(branchname);
            $("#branchname12").attr("data-value",$.cookie("branchID"));
        }//加载分公司
    pageCurrent=1;
    select(pageCurrent);
    $('#provice').click(function(e) {
        selectProvice();
        $('#cityname1').text("");
    });
    $('#provice1').click(function(e) {
        selectProvice1();
        $('#cityname12').text("");
        $('#countryname12').text("");
    });
    $('#city').click(function(e) {
        selectCity();
    });
    $('#city1').click(function(e) {
        selectCity1();
        $('#countryname12').text("");
    });
    $('#country1').click(function(e) {
        selectCountry1();
    });
    $('#belong').click(function(e) {
        //alert($("#11111").html());
        getContent();
    });
    $('#belong1').click(function(e) {
        //alert($("#11111").html());
        getContent1();
    });
    $('#select').click(function(e) {
        pageCurrent=1;
        select(pageCurrent);
    });
    $('#exprot').click(function(e) {
        exportInfo();
    });
    $('#cancel').click(function(e) {
        HideShelter();
        $('.pop').hide();
    });
    $('#save').click(function(e) {
        //alert($("#11111").html());
        send();
    });
    $('#branch1').click(function(e) {
        //alert($("#11111").html());
        $('#belongname12').text("");
    });
    $('#part').click(function(e) {
        //alert($("#111112")[0].innerText);
        $('#222221').html("");
        if($("#111112")[0].innerText==""){
            $('#222221').html("");
            var str="<li><a >第一级合作方</a></li><li><a >第二级合作方</a></li>";
            $('#222221').append(str);
            haha();
        }
        $('#belongname12').text("");
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


/**
 * 查询所有省份
 */
function selectProvice(p){

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
            var strHtml = "<li data-value="+entry.id+"><a >"+entry.name+"</a></li>";
            $('#proname').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    haha();
    return;
}

function selectProvice1(){

    var jsonPrama = {
        "marked": "findProviceOrCity",
        "jsonStr": "{}"
    };

    var myjsonStr = setJson(null,"level","1");
    myjsonStr = setJson(myjsonStr,"parentId","0");
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectProvice1);
}

function callBack_selectProvice1(data){
    $('#proname2').html("");
    if(data.code==0){
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a >"+entry.name+"</a></li>";
            $('#proname2').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    haha();
    return;
}

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
            var strHtml = "<li data-value="+entry.id+"><a >"+entry.name+"</a></li>";
            $('#cityname').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    haha();
    return;
}

function selectCity1(){
    var jsonPrama = {
        "marked": "findProviceOrCity",
        "jsonStr": "{}"
    };
    if($('#proname12').attr("data-value")==""){
        return;
    }
    var myjsonStr = setJson(null,"parentId",$('#proname12').attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",2);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectCity1);
}

function callBack_selectCity1(data){
    if(data.code==0){
        $('#cityname2').html("");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a >"+entry.name+"</a></li>";
            $('#cityname2').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    haha();
    return;
}

function selectCountry1(){
    var jsonPrama = {
        "marked": "findProviceOrCity",
        "jsonStr": "{}"
    };
    if($('#cityname12').attr("data-value")==""){
        return;
    }
    var myjsonStr = setJson(null,"parentId",$('#cityname12').attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level",3);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_selectCountry1);
}

function callBack_selectCountry1(data){
    if(data.code==0){
        $('#countryname2').html("");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a >"+entry.name+"</a></li>";
            $('#countryname2').append(strHtml);
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
            var strHtml = "<li data-value="+entry.id+"><a >"+entry.name+"</a></li>";
            $('#branchname').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    haha();
    return;
}

//查找分公司
function findBranch1(){

    var jsonPrama = {
        "marked": "findBranch",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null,"123","");
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_findBranch1);
}

function callBack_findBranch1(data){
    $('#branchname2').html("");
    if(data.code==0){
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a >"+entry.name+"</a></li>";
            $('#branchname2').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    haha();
    return;
}

function getContent(){
    var aa=$("#11111").html();
    if(aa=="第二级合作方"){
        getLevelOne();
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
            var strHtml = "<li data-value="+entry.id+"><a >"+entry.name+"</a></li>";
            $('#belongname').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    haha();
    return;
}

function getContent1(){
    var aa=$("#111112").html();
    if(aa=="第二级合作方"){
        getLevelOne1();
    }
    if(aa=="第一级合作方")
    {
        $('#belongname2').html("");
        alert("合作方为第一级合作方，没有所属上级合作方");
    }

}

function getLevelOne1(){

    var jsonPrama = {
        "marked": "addPOSParter_getOneLevel",
        "jsonStr": "{}"
    };
    if($("#branchname12")[0].innerText==""){
        alert("请选择公司所属的分子公司");
        return;
    }
    var myjsonStr = setJson(null,"branchID",$("#branchname12").attr("data-value"));
    jsonPrama.jsonStr=myjsonStr;

    jQuery.axjsonp(url, jsonPrama, callBack_getLevelOne1);
}

function callBack_getLevelOne1(data){
    $('#belongname2').html("");
    if(data.rspCode==0){
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a >"+entry.name+"</a></li>";
            $('#belongname2').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    haha();
    return;
}


function select(p){

    var jsonPrama = {
        "marked": "addPOSParter_select",
        "jsonStr": "{}"
    };
    //alert($("#parterAllName").val().trim());
    //alert($("#parterShortName").val().trim());
    //alert($("#address").val().trim());
    var myjsonStr = setJson(null,"parterAllName",$("#parterAllName").val().trim());
    myjsonStr = setJson(myjsonStr,"parterShortName",$("#parterShortName").val().trim());
    myjsonStr = setJson(myjsonStr,"address",$("#address").val().trim());
    //alert($("#statename")[0].innerText);
    //alert($("#branchname1").attr("data-value"));
    //alert($("#11111")[0].innerText);
    //alert($("#belongname1").attr("data-value"));
    //alert($("#proname1").attr("data-value"));
    //alert($("#cityname1").attr("data-value"));
    var state="";
    if("启用"==$("#statename")[0].innerText){
        state="1";
    }
    if("停用"==$("#statename")[0].innerText){
        state="0";
    }

    myjsonStr = setJson(myjsonStr,"parter_state",state);
    myjsonStr = setJson(myjsonStr,"branchId",$("#branchname1").attr("data-value"));
    var parterLevel="";
    if("第一级合作方"==$("#11111")[0].innerText){
        parterLevel="1";
    }
    if("第二级合作方"==$("#11111")[0].innerText){
        parterLevel="2";
    }
    myjsonStr = setJson(myjsonStr,"parterLevel",parterLevel);
    myjsonStr = setJson(myjsonStr,"belongParterId",$("#belongname1").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"provinceId",$("#proname1").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"cityId",$("#cityname1").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"curragePage",p+"") ;
    myjsonStr = setJson(myjsonStr,"pageSize",pagesize+"");
    //alert("aa");
    jsonPrama.jsonStr=myjsonStr;

    jQuery.axjsonp(url, jsonPrama, callBack_select);
  }
function callBack_select(data){
    if(data.rspCode=="000"){
        $('#content tbody').html("");
        $.each(data.list, function (entryIndex, entry) {
            var ssss = './html/Pospartner-Add.html?id=' + entry.pos_parterID;
            var dddd=ssss+'&update=1';
            var strHtml="<tr>" +"<td><input type=\"checkbox\">&nbsp;"+entry.Sequence+"</td>";
            //strHtml +="<td><a href=" +encodeURI(dddd)+">"+entry.parterAllName+ "</a></td>";
            strHtml+="<td><a href='#'onclick='chakan(\""+entry.pos_parterID+"\")'>"+entry.parterAllName+"</a></td>";
            //strHtml+="<td><button class='btn btn-sm btn-primary show' data-id="+entry.pos_parterID+">"+entry.parterAllName+"</button></td>";
            strHtml +="<td>" +entry.parterShortName+ "</td>";
            strHtml +="<td>" +entry.provinceName+ "</td>";
            strHtml +="<td>" +entry.cityName+ "</td>";
            strHtml +="<td>" +entry.createDate+ "</td>";
            strHtml +="<td>" +entry.branchName+ "</td>";
            var level="";
            if(entry.parterLevel=="1"){
            level="第一级合作方";
            }
            if(entry.parterLevel=="2"){
                level="第二级合作方";
            }
            strHtml +="<td>" +level+ "</td>";
            strHtml +="<td>" +entry.belongParter+ "</td>";
            if(entry.parter_state=="0"){
                strHtml +="<td><span class=\"label label-danger\">停用</span></td>";
            }
            if(entry.parter_state=="1"){
                strHtml +="<td><span class=\"label label-success\">启用</span></td>";
            }
            strHtml+="<td><button class='btn btn-sm btn-primary dissociate' data-id="+entry.pos_parterID+">修改</button></td>";
            strHtml += "</tr>";
            $('#content tbody').append(strHtml);
        });
        $('.dissociate').click(function(){
            getPosPartner($(this).attr('data-id'));
            ShowShelter();
            $('.pop').show();
            $('#save').show();
        });
        $('.show').click(function(){
            getPosPartner($(this).attr('data-id'));
            ShowShelter();
            $('.pop').show();
            $('#save').attr("disabled", true);
        });


    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }IsCreatePage=false;

    if(!IsCreatePage)

    {

        IsCreatePage=true;

        $("#pageId").createPage({

            count:data.count,//总条数

            pageCount:Math.ceil(data.count/pagesize),//viewdata.TotalNum

            current:pageCurrent,

            backFn:function(p){

                //CurrPage=p;

                pageCurrent=p;

                //单击回调方法，p是当前页码

                select(p);

            }

        });

    }

    return;
}
function chakan(pos_parterID) {
    getPosPartner(pos_parterID);
    ShowShelter();
    $('.pop').show();
    $('#save').hide();

}

function exportInfo(){
    var jsonPrama = {
        "marked": "addPOSParter_export",
        "jsonStr": "{}"
    };
    var myjsonStr = setJson(null,"parterAllName",$("#parterAllName").val().trim());
    myjsonStr = setJson(myjsonStr,"parterShortName",$("#parterShortName").val().trim());
    myjsonStr = setJson(myjsonStr,"address",$("#address").val().trim());
    var state="";
    if("启用"==$("#statename")[0].innerText){
        state="1";
    }
    if("停用"==$("#statename")[0].innerText){
        state="0";
    }

    myjsonStr = setJson(myjsonStr,"parter_state",state);
    myjsonStr = setJson(myjsonStr,"branchId",$("#branchname1").attr("data-value"));
    var parterLevel="";
    if("第一级合作方"==$("#11111")[0].innerText){
        parterLevel="1";
    }
    if("第二级合作方"==$("#11111")[0].innerText){
        parterLevel="2";
    }
    myjsonStr = setJson(myjsonStr,"parterLevel",parterLevel);
    myjsonStr = setJson(myjsonStr,"belongParterId",$("#belongname1").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"provinceId",$("#proname1").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"cityId",$("#cityname1").attr("data-value"));
    //alert("aa");
    jsonPrama.jsonStr=myjsonStr;

    jQuery.axjsonp(url, jsonPrama, callBack_export);
}
function callBack_export(data){
    if (data.rspCode == "000") {
        window.open(data.excelPath);

    } else {

        alert(data.rspCode + "   " + data.rspDesc);

    }

    return;
}

function getPosPartner(d){
    var jsonPrama = {
        "marked": "addPOSParter_selectInfo",
        "jsonStr": "{}"
    };
    var myjsonStr = setJson(null,"pos_parterID",d);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_getPosPartner);
}
function callBack_getPosPartner(data){
    if (data.rspCode == "000") {
        stateval="";
        $('#advice').attr("disabled", true);
        $('#parterId').attr("data-value",data.pos_parterID);
        $('#parterId').val(data.parterId);
        $('#parterAllName1').val(data.parterAllName);
        $('#parterShortName1').val(data.parterShortName);
        $('#connectPerson').val(data.connectPerson);
        $('#connectTel').val(data.connectTel);
        $('#address1').val(data.address);
        var parterLevel="";
        if(data.parterLevel=="1"){
            parterLevel="第一级合作方";
        }
        if(data.parterLevel=="2"){
            parterLevel="第二级合作方";
        }
        $("#111112")[0].innerText=parterLevel;
        $('#branchname12').attr("data-value",data.branchId);
        $("#branchname12")[0].innerText=data.branchName;
        //alert($(branchname12).attr('data-value'));
        $('#belongname12').attr("data-value",data.belongParterId);
        $("#belongname12")[0].innerText=data.belongParter;
        $('#proname12').attr("data-value",data.provinceId);
        $("#proname12")[0].innerText=data.provinceName;
        $('#cityname12').attr("data-value",data.cityId);
        $("#cityname12")[0].innerText=data.cityName;
        $('#countryname12').attr("data-value",data.countryId);
        $("#countryname12")[0].innerText=data.countryName;
        var parter_state="";
        stateval=data.parter_state;
        if(data.parter_state=="0"){
            parter_state="停用";
        }
        if(data.parter_state=="1"){
            parter_state="启用";
        }
        $("#statename1")[0].innerText=parter_state;
        //$("#agentContentId")[0].src=imgBaseUrl+"/uploads/"+data.contractImg;
        $("#wenjianName").html(data.contractImg);
        if(data.contractImg==""){
            //alert("hehe");
            $('#download').attr("disabled", true);
            //$('#download').attr("url",data.contractImg);
        }else{
            $('#download').attr("disabled", false);
            $('#download').attr("url",data.contractImg);
        }


        $('#advice').val(data.advice);
        $('#remark').val(data.remark);
        $('#record tbody').html("");
        $.each(data.list, function (entryIndex, entry) {
            var str="<tr>";
            str+="<th>"+entry.auditAdmin+"</th>";
            str+="<th>"+entry.auditDate+"</th>";
            str+="<th>"+entry.auditResult+"</th>";
            str+="<th>"+entry.auditAdvice+"</th>";
            $('#record tbody').append(str);
        });
    } else {
        alert(data.rspCode + "   " + data.rspDesc);
    }

    return;
}

function send(){
    if($("#parterId").val().trim()==""){
        alert("合作方编号不能为空，请重新填写！");
        return;
    }

    if($("#parterAllName1").val().trim()==""){
        alert("合作方全称不能为空，请重新填写！");
        return;
    }

    if($("#connectPerson").val().trim()==""){
        alert("联系人不能为空，请重新填写！");
        return;
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
    var myjsonStr = setJson(null,"parterId",$("#parterId").val().trim());
    myjsonStr = setJson(myjsonStr,"pos_parterID",$(parterId).attr('data-value'));
    myjsonStr = setJson(myjsonStr,"parterAllName",$("#parterAllName1").val().trim());
    myjsonStr = setJson(myjsonStr,"parterShortName",$("#parterShortName1").val().trim());
    myjsonStr = setJson(myjsonStr,"connectPerson",$("#connectPerson").val().trim());
    myjsonStr = setJson(myjsonStr,"connectTel",$("#connectTel").val().trim());
    myjsonStr = setJson(myjsonStr,"address",$("#address1").val().trim());
    var parterLevel="0";
    if("第一级合作方"==$("#111112")[0].innerText){
        parterLevel="1";
    }
    if("第二级合作方"==$("#111112")[0].innerText){
        parterLevel="2";
    }
    if(parterLevel=="0"){
        //alert("请选择公司所属的合作方级别");
        //return;
    }
    myjsonStr = setJson(myjsonStr,"parterLevel",parterLevel);
    if($("#branchname12")[0].innerText==""){
        alert("请选择公司所属的分子公司");
        return;
    }
    myjsonStr = setJson(myjsonStr,"branchName",$("#branchname12")[0].innerText);
    myjsonStr = setJson(myjsonStr,"branchId",$("#branchname12").attr("data-value"));
    var belongParter;
    var belongParterId;
    if($("#belongname12")[0].innerText==""){
        belongParter="";
        belongParterId="";
    }else{
        belongParter=$("#belongname12")[0].innerText;
        belongParterId=$("#belongname12").attr("data-value");
    }
    if("第二级合作方"==$("#111112")[0].innerText){
        if(belongParter==""){
            alert("请选择上级合作方");
            return;
        }
    }
    myjsonStr = setJson(myjsonStr,"belongParter",belongParter);
    myjsonStr = setJson(myjsonStr,"belongParterId",belongParterId);
    if($("#proname12")[0].innerText==""){
        //alert("请选择省");
        //return;
    }
    myjsonStr = setJson(myjsonStr,"provinceName",$("#proname12")[0].innerText);
    myjsonStr = setJson(myjsonStr,"provinceId",$("#proname12").attr("data-value"));
    if($("#cityname12")[0].innerText==""){
        //alert("请选择市");
        //return;
    }
    myjsonStr = setJson(myjsonStr,"cityName",$("#cityname12")[0].innerText);
    myjsonStr = setJson(myjsonStr,"cityId",$("#cityname12").attr("data-value"));
    if($("#countryname12")[0].innerText==""){
        //alert("请选择县区");
        //return;
    }
    myjsonStr = setJson(myjsonStr,"countryName",$("#countryname12")[0].innerText);
    myjsonStr = setJson(myjsonStr,"countryId",$("#countryname12").attr("data-value"));

    var state="0";
    if("启用"==$("#statename1")[0].innerText){
        state="1";
    }
    if("停用"==$("#statename1")[0].innerText){
        state="0";
    }
    if(state=="3"){
        //alert("请选择合作方状态");
        //return;
    }
    myjsonStr = setJson(myjsonStr,"parter_state",state);
    if($("#advice").attr("disabled")){
        //不变
        myjsonStr = setJson(myjsonStr,"advice","");
    }else{
        if($("#advice").val().trim()==""){
            alert("请输入状态变更意见");
            return;
        }
        myjsonStr = setJson(myjsonStr,"advice",$("#advice").val().trim());
    }
    //alert($("#advice").attr("disabled",false));
    myjsonStr = setJson(myjsonStr,"remark",$("#remark").val().trim());
    var contractImg="";
    if($("#agentContentshow").attr("data")!=null){
        contractImg=$("#agentContentshow").attr("data");
    }
    myjsonStr = setJson(myjsonStr,"contractImg",contractImg);
    myjsonStr = setJson(myjsonStr,"userID",userName);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_send);
}
function callBack_send(data){
    if(data.rspCode=="000"){
        alert("修改成功");
        HideShelter();
        $('.pop').hide();
        pageCurrent=1;
        select(pageCurrent);
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    return;
}


function stateClick(num){
    if(num!=stateval){
        $('#advice').val("");
        $('#advice').attr("disabled", false);
    }else{
        $('#advice').attr("disabled", true);
    }

}
