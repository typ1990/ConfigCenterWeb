/**
 * Created by typ on 2015/9/10.
 */
//var baseUrl="http://192.168.16.61:8080/yewuproject/";
var branchID = $.cookie("branchID");
var tpsource1="";
var tpsource2="";
var tpsource3="";
var tpsource4="";
var file1="";

var ischild="";
var update="";
var IsCreatePage=false;
var pageCurrent = 1;


var shopId="";
var shopName="";
//关闭ifram方法
function closeMy(){
    window.parent.closeIfram()
}
$(function(){

    shopId=request.QueryString("superShopId");
    shopName=decodeURIComponent(request.QueryString("superShopName"));
    $("#shopName").val(shopName);
    updateWechatInfo();//查询信息

    //证书密码为商户号截取
    $('#mchID').change(function(){
        $("#secretKey").val($('#mchID').val());
    });


    //查询微信类目一级目录
    $('#leimu11').click(function(e) {
        //alert($("#certificateFile1").val())
        //wechatConfig();
        $('#leimu22').text("--");
        $('#leimu32').text("--");
        selectleimu1();
    });
    //查询微信类目二级目录
    $('#leimu21').click(function(e) {
        $('#leimu32').text("--");
        selectleimu2();
    });
    $('#leimu31').click(function(e) {
        selectleimu3();
    });

    //提交信息
    $('#commit').click(function(e) {
        //alert($("#certificateFile1").val())
        wechatConfig();
    });

    //上传控制
    var upurl=cerUrl+'?redirect='+window.location.href.replace(/\/[^\/]*$/,'/jQueryfileupload/uploadresult.html');
    $('#fileupload').fileupload(
        {
            add: function(e, data) {
                var uploadErrors = [];
                //var acceptFileTypes = /^image\/(jpe?g)$/i;
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
                var na=data.result.files[0].name;
                $("#show").html("上传成功！新名称："+na);
                tpsource1=na;

                //alert(na);

            },

        }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');


    $('#fileupload2').fileupload(
        {
            add: function(e, data) {
                var uploadErrors = [];
                //var acceptFileTypes = /^image\/(jpe?g)$/i;
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
                var na=data.result.files[0].name;
                $("#show2").html("上传成功！新名称："+na);
                tpsource2=na;

                //alert(na);

            },

        }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
    $('#fileupload3').fileupload(
        {
            add: function(e, data) {
                var uploadErrors = [];
                //var acceptFileTypes = /^image\/(jpe?g)$/i;
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
                var na=data.result.files[0].name;
                $("#show3").html("上传成功！新名称："+na);
                tpsource3=na;

                //alert(na);

            },

        }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
    $('#fileupload4').fileupload(
        {
            add: function(e, data) {
                var uploadErrors = [];
                //var acceptFileTypes = /^image\/(jpe?g)$/i;
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
                var na=data.result.files[0].name;
                $("#show4").html("上传成功！新名称："+na);
                tpsource4=na;

                //alert(na);

            },

        }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});
function selectleimu3() {
//    var url = baseUrl+"html5Callin!tietie.action";
    var jsonPrama = {
        "marked": "AddWeinXinPayConfigAction_selectAllLeimu2",
        "jsonStr": "{}"
    };
    var myjsonStr = setJson(null,"id",$("#leimu22").attr("data-value"));
    myjsonStr = setJson(myjsonStr,"level","3");
    jsonPrama.jsonStr=myjsonStr;
    //jQuery.axjsonp(url, jsonPrama, callBack_3);
    findDataForAllOld(jsonPrama, callBack_3)
}

function callBack_3(data){
    if(data.rspCode=="-207"){
        return;
    }
    if(data.rspCode=="000"){
        $('#leimu311').html("");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value=" +entry.id+"><a href=\"#\">"+entry.leimu+"</a></li>";
            $('#leimu311').append(strHtml);
        });
    }else{
        alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    haha();
    return;
}

function selectleimu2() {
//        var url = baseUrl+"html5Callin!tietie.action";
        var jsonPrama = {
            "marked": "AddWeinXinPayConfigAction_selectAllLeimu2",
            "jsonStr": "{}"
        };
        var myjsonStr = setJson(null,"id",$("#leimu12").attr("data-value"));
        myjsonStr = setJson(myjsonStr,"level","2");
        jsonPrama.jsonStr=myjsonStr;
        //jQuery.axjsonp(url, jsonPrama, callBack_2);
        findDataForAllOld(jsonPrama, callBack_2)
    }

    function callBack_2(data){
        if(data.rspCode=="-207"){
            return;
        }
        if(data.rspCode=="000"){
            $('#leimu211').html("");
            $('#leimu311').html("");
            $.each(data.list,function(entryIndex, entry){
                var strHtml = "<li data-value=" +entry.id+"><a href=\"#\">"+entry.leimu+"</a></li>";
                $('#leimu211').append(strHtml);
            });
        }else{
            alert(data.rspCode+"   "+data.rspDesc);
            return;
        }
        haha();
        return;
    }
function selectleimu1() {
    var jsonPrama = {
        "marked": "AddWeinXinPayConfigAction_selectAllLeimu1",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null, "123","");
    jsonPrama.jsonStr = myjsonStr;
    //jQuery.axjsonp(url, jsonPrama, callBack_findBranch);
    findDataForAllOld( jsonPrama, callBack_findLeimu1);
}

function callBack_findLeimu1(data) {

    if (data.rspCode =="000") {
        $('#leimu111').html("");
        $('#leimu211').html("");
        $('#leimu311').html("");
        $.each(data.list, function (entryIndex, entry) {
            var strHtml = "<li data-value=" +entry.id+ "><a  href=\"#\">" +entry.leimu1 + "</a></li>";
            $('#leimu111').append(strHtml);
        });
        //alert($("#shopname").data('type'))
    } else {
        alert(data.rspCode + "   " + data.rspDesc);
        return;
    }
    haha();
    return;
}


function updateWechatInfo() {

//    var url = baseUrl+"html5Callin!tietie.action";
    var jsonPrama = {
        "marked": "payPublicCall_findOneWX",
        "jsonStr": "{}"
    }
    //alert(request.QueryString("theshopId"));
    var myjsonStr = setJson(null,"shopId",shopId);
    jsonPrama.jsonStr=myjsonStr;
    //jQuery.axjsonp(url, jsonPrama, callBack_updateShop);
    findDataForAll(jsonPrama, callBack_updateShop);
}

function callBack_updateShop(data){
    if(data.code=="000"){

        $("#leimu12").text(data.leimu1);
        $("#leimu22").text(data.leimu2);
        $("#leimu32").text(data.leimu3);
        $("#appID").val(data.appID);
        $("#AppSecret").val(data.AppSecret);
        $("#mchID").val(data.mchID);
        $("#secretKey").val(data.CertificatePassWord);
        $("#beizhu").val(data.remarke);
        tpsource1=data.file1;
        if(tpsource1!=""){
            $("#show").html("已上传:"+tpsource1);
        }
        tpsource2=data.file2;
        if(tpsource2!=""){
            $("#show2").html("已上传:"+tpsource2);
        }
        tpsource3=data.file3;
        if(tpsource3!=""){
            $("#show3").html("已上传:"+tpsource3);
        }
        tpsource4=data.file4;
        if(tpsource4!=""){
            $("#show4").html("已上传:"+tpsource4);
        }


        haha();
    }else{
        //alert(data.code+"   "+data.mess);
        return;
    }
    return ;
}

function wechatConfig(){
//alert("123"+($('#ischild').is(':checked')));

    if($("#leimu12")[0].innerText=="--"){
        alert("请选择微信一级目录");
        return;
    }
    if($("#leimu22")[0].innerText=="--"){
        alert("请选择微信二级目录");
        return;
    }
    if($("#appID").val()==""){
        alert("公众号不能为空");
        return;
    }
    if($("#AppSecret").val()==""){
        alert("应用密钥密钥不能为空");
        return;
    }
    if($("#mchID").val()==""){
        alert("商户号不能为空");
        return;
    }

    if(tpsource1==""){
        alert("上传的第一个证书文件不能为空");
        return;
    }

    if(tpsource2==""){
        alert("上传的第二个证书文件不能为空");
        return;
    }

    if(tpsource3==""){
        alert("上传的第三个证书文件不能为空");
        return;
    }

    if(tpsource4==""){
        alert("上传的第四个证书文件不能为空");
        return;
    }
        ischild="0";


    //alert("ischild:"+ischild);

    //alert($("#shopname").attr("data-value"));
    var myjsonStr = setJson(null,"contract_businessID","");
    myjsonStr = setJson(myjsonStr,"ischild","0");
    myjsonStr = setJson(myjsonStr,"closed","1");
    myjsonStr = setJson(myjsonStr,"busCode","113");
    myjsonStr = setJson(myjsonStr,"leimu1",$("#leimu12")[0].innerText);
    myjsonStr = setJson(myjsonStr,"leimu2",$("#leimu22")[0].innerText);
    myjsonStr = setJson(myjsonStr,"leimu3",$("#leimu32")[0].innerText=="--"?"":$("#leimu32")[0].innerText);
    myjsonStr = setJson(myjsonStr,"appID",$("#appID").val());
    myjsonStr = setJson(myjsonStr,"AppSecret",$("#AppSecret").val());
    myjsonStr = setJson(myjsonStr,"mchID",$("#mchID").val());
    myjsonStr = setJson(myjsonStr,"file1",tpsource1);
    myjsonStr = setJson(myjsonStr,"file2",tpsource2);
    myjsonStr = setJson(myjsonStr,"file3",tpsource3);
    myjsonStr = setJson(myjsonStr,"file4",tpsource4);
    //alert($("#certificateFile1").val())
    myjsonStr = setJson(myjsonStr,"secretKey",$("#mchID").val());
    myjsonStr = setJson(myjsonStr,"beizhu",$("#beizhu").val());
    myjsonStr = setJson(myjsonStr,"ShopPublishingSetID","");
    myjsonStr = setJson(myjsonStr,"shopId",shopId);
    //myjsonStr = setJson(myjsonStr,"shopIddata",$("#shopname").attr("data-shopid"));
//    var url = baseUrl+"html5Callin!tietie.action";
    var jsonPrama = {
        "marked": "payPublicCall_addAndEditWX",
        "jsonStr": "{}"
    }
    //alert("shopname:"+$("#shopname")[0].innerText);

    jsonPrama.jsonStr=myjsonStr;
    //jQuery.axjsonp(url, jsonPrama, addsucess);
    findDataForAll(jsonPrama, addsucess);
}
function addsucess(data) {
   alert(data.mess);
    if(data.code=="000"){
        closeMy();
    }
    return;
}
