var pageCurrent=1;
var superShopId="";
var superShopName="";
var IsCreatePage=false;
var shopId="";
//var shopId="402890cd5190a604015190a642c6006d";
var branchId="";
var branchName="";
var agentId="";
var agentName="";
var proviceId="";
var proviceName="";
var cityId="";
var cityName="";
var xianid="";
var xianName="";
var state="1";
var shopStateEditText="";
var tp1="";
var tp2="";
var tp3="";

var posStr="1000000000000";
var posList=new Array;
var stateList=["停用","启用","停用","停用","停用","停用"];

var addposagentid="";
var addposhezuoid="";
var addpospeijianhezuoid="";
var youpeijian=false;

var ddpj="";//单独添加配件id
var ddpos="";
var branchID=$.cookie("branchId_d");
var branchName=$.cookie("branchName_d");

var ss=null;//联系人修改时候判断是不是要删除的

$(function(){
    if($.cookie("isDemonstration_d")=="0"){
        $("#shopSubmit").attr("disabled", true);
        $("#branPosSubmit").attr("disabled", true);
        $("#addXNPos").attr("disabled", true);
        $("#shyjshtj").attr("disabled", true);
        $("#dzyssubmit").attr("disabled", true);
        $("#branPosSubmit").attr("disabled", true);
        $("#branPosSubmit1").attr("disabled", true);
        $("#branPosSubmit2").attr("disabled", true);
    }

    if($.cookie("agentId_d")==null){
        window.close();
        window.open("./login.html");
    }

    $('#branchText').text(branchName);
    $("#branchText").attr("data-value",branchID);
    $('#branchText2').text(branchName);
    $("#branchText2").attr("data-value",branchID);
    pull_down();
    $('#download').click(function(e) {
        //alert("a");
        window.open(excelDownUrl+"shop.xls");
    });
    $('#download2').click(function(e) {
        //alert("a");
        window.open(excelDownUrl+"contactPerson.xls");
    });
    $('#download3').click(function(e) {
        //alert("a");
        window.open(excelDownUrl+"pos.xls");
    });
    //修改pos时查询posparter
    $('#posparter').click(function(e) {
        //alert("a");
        findPOsParter();
    });
    $('#pospartlevel').click(function(e) {
        //alert("a");
        $('#posparText2').html("");
    });
    //修改pos时，提交信息
    $('#branPosSubmit2').click(function(e) {
        //alert("a");
        updatePOS();
    });
    shopId=request.QueryString("storeId");
    //shopId="402890cd537479f90153748a6b5b0000"

    $("#businessStartHours").val("09:00");

    $("#businessEndHours").val("22:00")

    if(shopId!=""){
        findSPone();
        $("#shjsBut").attr("disabled",true);
    }else{
        $("#shjsBut").attr("disabled",false);
    }

    //大众点评映射
    $('#dzyssubmit').click(function(){
        addDZDP();
    });

    //点击弹出商户检索
    $('#shjsBut').click(function(){
        $("#shjs").show();
    });

//导出pos
    $("#outpos").click(function(){
       outpos();
    });
    //商户检索按键-查询
    $("#jssh").click(function(){

        pageCurrent = 1;

        findShop();

    });

    //pos列表中添加配件按钮
    $("#branPosSubmit1").click(function(){
        addPosPJ();
    });

    //上传控制

    var upurl=imgUrl+'?redirect='+window.location.href.replace(/\/[^\/]*$/,'/jQueryfileupload/uploadresult.html');

    $('#fileupload1').fileupload(

        {

            add: function(e, data) {

                var uploadErrors = [];

                var acceptFileTypes = /^image\/(jpe?g)$/i;

                if(data.originalFiles[0]['type']=="" || (data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type']))) {

                    uploadErrors.push('上传的文件类型不符合要求，请上传jpg类型的文件');

                }

                if(data.originalFiles[0].size > 1000000) {

                    uploadErrors.push('文件尺寸过大，限制文件大小1M');

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

                tp1=na;

                $("#tp1")[0].src=imgBaseUrl+"/uploads/"+na;

                //alert(na);



            },



        }).prop('disabled', !$.support.fileInput)

        .parent().addClass($.support.fileInput ? undefined : 'disabled');

    //上传控制


    $('#fileupload2').fileupload(

        {

            add: function(e, data) {

                var uploadErrors = [];

                var acceptFileTypes = /^image\/(jpe?g)$/i;

                if(data.originalFiles[0]['type']=="" || (data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type']))) {

                    uploadErrors.push('上传的文件类型不符合要求，请上传jpg类型的文件');

                }

                if(data.originalFiles[0].size > 1000000) {

                    uploadErrors.push('文件尺寸过大，限制文件大小1M');

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

                tp2=na;

                $("#tp2")[0].src=imgBaseUrl+"/uploads/"+na;

                //alert(na);



            },



        }).prop('disabled', !$.support.fileInput)

        .parent().addClass($.support.fileInput ? undefined : 'disabled');

    //上传控制


    $('#fileupload3').fileupload(

        {

            add: function(e, data) {

                var uploadErrors = [];

                var acceptFileTypes = /^image\/(jpe?g)$/i;

                if(data.originalFiles[0]['type']=="" || (data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type']))) {

                    uploadErrors.push('上传的文件类型不符合要求，请上传jpg类型的文件');

                }

                if(data.originalFiles[0].size > 1000000) {

                    uploadErrors.push('文件尺寸过大，限制文件大小1M');

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

                tp3=na;

                $("#tp3")[0].src=imgBaseUrl+"/uploads/"+na;

                //alert(na);



            },



        }).prop('disabled', !$.support.fileInput)

        .parent().addClass($.support.fileInput ? undefined : 'disabled');



    //截取简称
    $("#wdN").focusout(function(){
        if( $("#wdN").val()!=""){
            $("#dzSP").val( $("#wdN").val());
            if( $("#wdN").val().length<=20){
                $("#wdJ").val($("#wdN").val());
                $("#poswdN").val($("#wdN").val());
            }else{
                $("#wdJ").val($("#wdN").val().substr(0,20));
                $("#poswdN").val($("#wdN").val().substr(0,20));
            }
        }
    });
    $("#shopSubmit").click(function(){
       //提交门店信息
        if(checkShop()){
            submitShop();
        };
    });
    $("#posSubmit").click(function(){
        //pos单条添加
        if(shopId==""){
            a("请先保存门店信息");
            return;
        }
        if($("#branPos").val().length!=8){
            a("请填写8位正确终端号")
        }else{
            addPosOne();
        }
    });

    $("#branPosSubmit").click(function(){

        if(shopId==""){
            a("请先保存门店信息");
            return;
        }
        if($("#branPos").val()==""){

            if(checkBranPos()){
                if(checkBranPos()) {
                    addPos();
                }
            }
        }else{

        if($("#branPos").val().length!=8){
            a("如添加单条pos请填写8位正确终端号,否则请清空后以批量添加!")
        }else{
            var posNum=$("#branPos").val();
            if(posNum!=""&&posNum!=null){
                var regPass=new RegExp("^[A-Za-z0-9]+$");
                if(!regPass.test(posNum)){
                    alert("pos号码只能为数字或字母");
                    return false;
                }

            }
            addPosOne();
        }

        }

    });

    //点省按钮
    //$('#proviceText').click(function(){
    //    selectProvice();//查询省
    //});
    //点省按钮--ie用上面的,非ie用下面的,现在不知道为什么
    $('#proviceButton').click(function(){
        selectProvice();//查询省
    });
    //$('#proviceText').click(function(){
    //    selectProvice();//查询省
    //});


    //添加联系人

    $(".add_people_btn").click(function(){

        $(".add_people_pop").show();

        ss=null;

        $("#lxrxm").val("");

        $("#lxrdh").val("");

        $("#lxryx").val("");

        $("#lxrzw").val("");

        $("#lxrbz").val("");

    });

    $('#addpeono').click(function (){
        $(".add_people_pop").hide();
    });
    //添加联系人确定

    $("#addpeoyes").click(function(){

        if($("#lxrxm").val()==""||$("#lxrdh").val()==""){

            alert("请将姓名及电话填写完整");

            return;

        }

        if(!CheckIsMobile($("#lxrdh").val())){

            return;

        }

        if(ss!=null){

            shanchu(ss);

        }

        $(".add_people_pop").hide();

        //alert("999");

        var str='<tr><td>'+$("#lxrxm").val()+'</td><td>'+$("#lxrdh").val()+'</td><td>'+$("#lxryx").val()+'</td><td>'+$("#lxrzw").val()+'</td><td>'+$("#lxrbz").val()+'</td><td><a onclick="xiugai(this)">修改</a>  <a onclick="shanchu(this)">删除</a></td></tr>';

        $("#tbody").append(str);

        ss=null;

    });

    var upurl1=preRegistShopUrl+'?redirect='+window.location.href.replace(/\/[^\/]*$/,'/jQueryfileupload/uploadresult.html');
    $('#import').fileupload(
        {
            add: function(e, data) {
                //alert("11");
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
            url: upurl1,
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

    var upurl2=preRegistShopUrl+'?redirect='+window.location.href.replace(/\/[^\/]*$/,'/jQueryfileupload/uploadresult.html');
    $('#import2').fileupload(
        {
            add: function(e, data) {
                //alert("11");
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
            url: upurl2,
            dataType: 'json',
            //acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i, // Allowed file types
            done: function (e, data) {
                //alert("dd");
                var na=data.result.files[0].name;
                $("#show2").html("上传成功！正在解析。。。");
                readExcel2(na);
                //alert(na);

            },

        }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

    var upurl3=preRegistShopUrl+'?redirect='+window.location.href.replace(/\/[^\/]*$/,'/jQueryfileupload/uploadresult.html');
    $('#import3').fileupload(
        {
            add: function(e, data) {
                //alert("11");
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
            url: upurl3,
            dataType: 'json',
            //acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i, // Allowed file types
            done: function (e, data) {
                //alert("dd");
                var na=data.result.files[0].name;
                $("#show3").html("上传成功！正在解析。。。");
                readExcel3(na);
                //alert(na);

            },

        }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});

function getPosType(b){
    $("#posTypeText").data("value",b);
}

function readExcel(p) {
    var jsonPrama = {
        "marked": "storesCallin_import",
        "code":"10000",
        "verson":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null, "url", p);
    jsonPrama.jsonStr = myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack);
}

function callBack(data) {
    if(data.code=="000"){
        a(data.mess);

    }else{
        a(data.mess);
    }
    $("#show").html("解析完成！");
}

function readExcel2(p) {
    var jsonPrama = {
        "marked": "storesCallin_importContractPerson",
        "code":"10000",
        "verson":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null, "url", p);
    jsonPrama.jsonStr = myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack2);
}

function callBack2(data) {

    if (data.code == 0) {
        var aa="数据导入成功，导入的数据总数为："+data.count;
        if(data.empty!=null&&data.empty!=0){
            aa="导入的数据部分保存成功，导入成功的数据数量为："+data.count
                +"    空数据行数为："+data.emptryStr;

        }
        $("#show2").html("解析完成！");
        alert(aa);

    }else {
        var bb="数据导入失败  "+data.mess;
        if(data.empty!=null&&data.empty!=0){

            bb+="     导入的空数据总行数为："+data.empty;
            bb+="     导入的空数据行数为："+data.emptryStr;
        }
        if(data.error!=null&&data.error!=0){
            bb+="     导入的错误数据总行数为："+data.error;
            bb+="     导入的错误数据行数为："+data.errorStr;
        }
        $("#show2").html("解析完成！");
        alert(bb);
        return;
    }
    $("#show2").html("解析完成！");
}

function readExcel3(p) {
    var jsonPrama = {
        "marked": "storesCallin_importpos",
        "code":"10000",
        "verson":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null, "url", p);
    jsonPrama.jsonStr = myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack3);
}

function callBack3(data) {

    if (data.code == 0) {
        var aa="数据导入成功，导入的数据总数为："+data.count;
        if(data.empty!=null&&data.empty!=0){
            aa="导入的数据部分保存成功，导入成功的数据数量为："+data.count
                +"    空数据行数为："+data.emptryStr;

        }
        $("#show3").html("解析完成！");
        alert(aa);

    }else {
        var bb="数据导入失败  "+data.mess;
        if(data.empty!=null&&data.empty!=0){

            bb+="     导入的空数据总行数为："+data.empty;
            bb+="     导入的空数据行数为："+data.emptryStr;
        }
        if(data.error!=null&&data.error!=0){
            bb+="     导入的错误数据总行数为："+data.error;
            bb+="     导入的错误数据行数为："+data.errorStr;
        }
        $("#show3").html("解析完成！");
        alert(bb);
        return;
    }
    $("#show3").html("解析完成！");
}


//添加联系人删除方法
function shanchu(da){

    $(da).parent().parent().remove();

    //alert($(da).html())

}

//修改联系人

function xiugai(da){



    $(".add_people_pop").show();

    $("#lxrxm").val($(da).parent().parent().find("td").eq(0).html());

    $("#lxrdh").val($(da).parent().parent().find("td").eq(1).html());

    $("#lxryx").val($(da).parent().parent().find("td").eq(2).html());

    $("#lxrzw").val($(da).parent().parent().find("td").eq(3).html());

    $("#lxrbz").val($(da).parent().parent().find("td").eq(4).html());

    ss=da;

    //var s=$(da).parent().parent().find("td").eq(0).html();

    // alert(s)

}



function stateClick(b){
    state=b;
    if(shopId!=""){
        ShowShelter();
        $('.shyjsh-layer').show();
        //存储来自哪里,审核状态(点提交时才生效)
        $("#shyjshtj").click(function(){
            shopStateEditText=$("#shyjshText").val();
            HideShelter();
            $('.shyjsh-layer').hide();
        });
    }
}
//检查门店必填
function  checkShop(){
    if(superShopId==""||superShopName==""){
        a("请选择商户");
        return false;
    }
    if($("#shopNum").val()==""){
        a("请填写门店编号");
        return false;
    }
    //alert();

    if($("#shopNum").val().length!=15){
        a("门店编号必须为15位");
        return false;
    }
    if (isNaN($("#shopNum").val())) {
        alert("门店编号必须为数字");
        $("#shopNum").focus();
        return false;
    }

    if($("#wdN").val().trim()==""){
        a("请填写门店名称");
        return false;
    }
    if($("#poswdN").val().trim()==""){
        a("请填写pos显示门店名称");
        return false;
    }

    if($("#businessStartHours").val()!=""&&$("#businessEndHours").val()!=""){
        if(!checkTime("#businessStartHours")||!checkTime("#businessEndHours")){
            alert( "开始时间或结束时间格式不正确");
            return false;
        }
    }


    return true;
}

function checkBranPos(){
    var posCou=$("#posCou").val();
    var posStart=$("#posStart").val();
    var posEnd=$("#posEnd").val();
    if(posCou!=""){
        //a(Number(posCou))
       if(Number(posCou).toString()=='NaN'||posCou.indexOf(".")!=-1||posCou.indexOf("0")==0){
           a("终端数错误或第一位是0")
           return false;
       }
    }
    if(posStart!=""){
        if(Number(posStart).toString()=='NaN'||posStart.indexOf(".")!=-1||posStart.indexOf("0")==0){
            a("终端起始数错误或第一位是0")
            return false;
        }
    }
    if(posEnd!=""){
        if(Number(posEnd).toString()=='NaN'||posEnd.indexOf(".")!=-1||posEnd.indexOf("0")==0){
            a("终端结束数错误或第一位是0")
            return false;
        }
    }
    if(posCou==""&&posStart==""){
        alert("请填写添加数量和起始号")
        return false;
    }
    //branPos

    if(posCou==""&&posStart==""){
        alert("请填写添加数量和起始号")
        return false;
    }
    if(posCou!=""&&posStart!=""){
        $("#posEnd").val( Number(posStart)+Number(posCou)-1);
        return true;
    }

    if(posCou!=""&&posEnd!=""){
        $("#posStart").val( Number(posEnd)-Number(posCou)<0?"错误":Number(posEnd)-Number(posCou)+1);
        return true;
    }

    if(posStart!=""&&posEnd!=""){
        $("#posCou").val( Number(posEnd)-Number(posStart)+1);
        return true;
    }
    if(posStart.length==8&&posCou==""){
        $("#posCou").val(1)
        return true;
    }
    return true;
}

//添加虚拟pos
function addXNPos(){
    //var br=branchId;
    //if(br==""){
    //    br=userBranchId;
    //}
    posList=new Array;
    posList.push(createCode(8))
    var ob=new Object();
    ob.spId=shopId;
    ob.branchId=$.cookie("branchId_d");
    ob.posType="3";
    ob.poss=posList;
    ob.posShopNumber=$("#shopNum").val().trim();
    ob.agentId=$.cookie("agentId_d");
    ob.posBranch="";
    ob.peijianis=false;
    ob.peijianPosBranch="";
    //if(youpeijian){//如果有配件传
    //    ob.peijianPosBranch=addpospeijianhezuoid;
    //}

    var obw=new Object();
    obw.marked="Dounenglu_storesCallin_addAndEditPos";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_addXN);
}
function callBack_addXN(data){
    alert(data.mess);
    findpos();
}

function addPosOne(){
   var br=$.cookie("branchId_d");
    posList=new Array;
    posList.push($("#branPos").val())
    var ob=new Object();
    ob.spId=shopId;
    ob.branchId=br;
    ob.posType=$("#posTypeText").data("value")+"";
    ob.tableNum="";
    ob.poss=posList;
    ob.posShopNumber=$("#posShopNum").val().trim();
    //ob.posType="1";
    ob.agentId=addposagentid;
    ob.posBranch=addposhezuoid;
    ob.peijianis=youpeijian;
    ob.peijianPosBranch="";
    if(youpeijian){//如果有配件传
        ob.peijianPosBranch=addpospeijianhezuoid;
    }

    var obw=new Object();
    obw.marked="Dounenglu_storesCallin_addAndEditPos";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_addOne);
}
function callBack_addOne(data){
    //alert("aa11");
    if(data.code=="000"){
        HideShelter();
        $('.pop-layer').hide();
    }

    alert(data.mess);
    findpos();
}
function findpos(){
    var ob=new Object();
    ob.spId=shopId;
    ob.num=$("#zdh").val();
    var obw=new Object();
    obw.marked="Dounenglu_storesCallin_findMyShopPos";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    //alert(JSON.stringify(obw))
    findDataForAll(obw,callBack_findpos);
}
function callBack_findpos(data){
    $("#tbodypos").empty();
    if(data.code=="000"){
        $.each(data.list,function(index,enty){
            //alert(enty.id)
            var dd=enty.state=="0"?"启用":"停用";
            var ss="<tr><td>"+enty.num+"</td><td>"+enty.own+"</td><td>"+enty.otherOwn+
                "</td><td>"+stateList[enty.state==""?0:enty.state]+"</td><td>"+enty.cdate+"</td><td><a onclick='changePos(\""+enty.id+"\",\""+enty.state+"\")'>"+dd+"</a>  <a onclick='addPJ(\""+enty.id+"\")'>配件</a>  <a onclick='xiugaiinfo(\""+enty.id+"\")'>修改</a> </td></tr>";
            $("#tbodypos").append(ss);
        });
    }

    findTP();//查询网点进件神器上传图片
}
function xiugaiinfo(id){
    //alert(id);
    ShowShelter();
    $('.pop-layer9').show();
    //$("#branchText2").html(branchName);
    setInfo(id);
    //if(userBranchtype=="0"){
    //    $('#branPosSubmit2').attr("disabled", false);
    //    findBranch1();
    //
    //}else{
    //    $('#branPosSubmit2').attr("disabled", true);
    //}
    //findPOsParter();
    //if(userBranchtype=="0"){
    //    findBranch1();
    //}
}
function findPOsParter(){
    var jsonPrama = {
        "marked": "Dounenglu_findpos_posParter",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null,"branchId",$("#branchText2").attr("data-value"));
    var level;
    if($("#posparLev2")[0].innerText=="1级"){
        level="1";
    }
    if($("#posparLev2")[0].innerText=="2级"){
        level="2";
    }
    //alert(level);
    myjsonStr = setJson(myjsonStr,"level",level);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_findPOsParter);
}
function callBack_findPOsParter(data){

    if(data.code==0){
        $('#pospar2').html("");
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a >"+entry.name+"</a></li>";
            $('#pospar2').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();
    return;

}

function setInfo(id){
    var jsonPrama = {
        "marked": "Dounenglu_findpos_info",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    $("#posid").attr("data-value",id);
    var myjsonStr = setJson(null,"posId",id);
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_setInfo);

}
function callBack_setInfo(data){
    if(data.code==0){
        //alert("aa");

        $('#branchText2').html(data.branchName);
        $("#branchText2").attr("data-value",data.branchid);
        if(data.level=="1"){
            $('#posparLev2').html("1级");
        }
        if(data.level=="2"){
            $('#posparLev2').html("2级");
        }
        $('#posparText2').html(data.pos_ParterName);
        $("#posparText2").attr("data-value",data.pos_ParterId);
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }

}

//查询商户进件神器的图片
function findTP(){
    //alert("6666666666")
    var ob=new Object();
    ob.shopId=shopId;
    var obw=new Object();
    obw.marked="Dounenglu_superShop_findShopIMG";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_findTP);
}
//查询商户进件神器的图片的返回
function callBack_findTP(da){
    if(da.code=="000"){
        var ss="";
        if(da.doorheadPhoto!=null&&da.doorheadPhoto!=""&&da.doorheadPhoto!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.doorheadPhoto+"' target='_blank' >经营场所门头照</a>   ";
        }
        if(da.doorplatePhoto!=null&&da.doorplatePhoto!=""&&da.doorplatePhoto!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.doorplatePhoto+"' target='_blank' >经营场所门牌照</a>   ";
        }
        if(da.insidePhoto!=null&&da.insidePhoto!=""&&da.insidePhoto!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.insidePhoto+"' target='_blank' >内部照</a>   ";
        }
        if(da.insidePhoto2!=null&&da.insidePhoto2!=""&&da.insidePhoto2!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.insidePhoto2+"' target='_blank' >内部照2</a>   ";
        }
        if(da.extraPhoto!=null&&da.extraPhoto!=""&&da.extraPhoto!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.extraPhoto+"' target='_blank' >备用项</a>   ";
        }

        $("#tp").html(ss);
    }
}


function changePos(a1,b){
    if(b=="1"){
        b="0";
    }else{
        b="1";
    }
    changep(a1,b);
}

function changep(a1,b){
    var ob=new Object();
    ob.posId=a1;
    ob.state=b;
    var obw=new Object();
    obw.marked="Dounenglu_storesCallin_changePos";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_changep);
}
function callBack_changep(data){
    alert(data.mess);
    findpos();
}
function addPos(){
    posList=new Array;
    var br=$.cookie("branchId_d");
    //if(br==""){
    //    br=userBranchId;
    //}
    var dd=$("#posStart").val();
    if(dd.length<8){
        dd=posStr.substr(0,8-dd.length)+dd;
    }
    for(var i=0;i<$("#posCou").val();i++){
        //alert("pos=="+(Number(dd)+i).toString())
        posList.push((Number(dd)+i).toString());

    }
    var deloal= window.confirm("即将添加POS编号:"+posList.toString());
    if(deloal){

        var ob=new Object();
        ob.spId=shopId;
        ob.branchId=br;
        ob.poss=posList;
        ob.posType="1";
        ob.posShopNumber=$("#posShopNum").val().trim();
        ob.agentId=addposagentid;
        ob.posBranch=addposhezuoid;
        ob.peijianis=youpeijian;
        ob.peijianPosBranch="";
        if(youpeijian){//如果有配件传
            ob.peijianPosBranch=addpospeijianhezuoid;
        }
        var obw=new Object();
        obw.marked="Dounenglu_storesCallin_addAndEditPos";
        obw.code="10008";
        obw.version="1.0";
        obw.jsonStr=JSON.stringify(ob);
        findDataForAll(obw,callBack_addOne);
    }else{
        //alert("点取消了");
    }



}
//提交门店信息
function  submitShop(){
    var json=new Object();

    json.shopId=shopId;
    json.superShopId=superShopId;
    json.images="";
    json.shopName=$("#wdN").val();
    json.shopShortName=$("#wdJ").val();
    json.proviceId=proviceId;
    json.cityId=cityId;
    json.xianid=xianid;
    json.xian=xianName;
    json.posShopName=$("#poswdN").val();
    json.state=state;
    json.uid=$.cookie("userNickName_d");
    json.stateText=shopStateEditText;
    json.proviceName=proviceName;
    json.cityName=cityName;
    json.shopAddress=$("#shopAddress").val();
    json.shopNumber=$("#shopNum").val();
    json.remarke=$("#remarke").val();
    json.customerServicePhone="";
    json.locationTude=$("#coordinates").val();
    if($("#businessStartHours").val()!=""&&$("#businessEndHours").val()!="") {
        json.businessStartHours = $("#businessStartHours").val() + ":00";
         json.businessEndHours = $("#businessEndHours").val() + ":00";
      }else{
        json.businessStartHours = "00:00:00";
        json.businessEndHours = "00:00:00";
    }
    json.branchId=branchID;
    json.specialServices=$("#specialServices").val();
    json.imgFile1=tp1;
    json.imgFile2=tp2;
    json.imgFile3=tp3;
    json.yinshang="";
    var lxrarr=new Array;
    $.each($("#tbody>tr"),function(index,enty){
        var ob=new Object();
        ob.shopAssistantName= $(enty).find("td").eq(0).html();
        ob.shopAssistantPhone= $(enty).find("td").eq(1).html();
        ob.shopAssistantEmail= $(enty).find("td").eq(2).html();
        ob.position= $(enty).find("td").eq(3).html();
        ob.shopAssistantNote= $(enty).find("td").eq(4).html();
        lxrarr.push(ob);
    });

    json.list=lxrarr;


    var jsonPrama = {

        "marked" : "Dounenglu_storesCallin_addAndEditStores",
        "code" :"10008",
        "version":"1.0",
        "callbackparam" : "success_jsonpCallback",
        "jsonStr":JSON.stringify(json)
    };

//alert("添加参数"+JSON.stringify(jsonPrama))
    findDataForAll(jsonPrama,submitShopBack);
}
function submitShopBack(data){
    if(data.code=="000"){
        a("操作成功!");
        shopId=data.mess;
        findpos();

    }else{
        a(data.mess);
    }

}

//检索商户
function findShop(){
    var json=new Object();

    json.agentId=$.cookie("agentId_d");

    json.pageSize=pageSize;

    json.currPage=pageCurrent;

    json.belongShopId="0";

    json.name=$("#shanghuName").val();

    var jsonPrama = {

        "marked" : "Dounenglu_payPublicCall_findSuperShop",

        "code": "10008",

        "version": "1.0",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    findDataForAll(jsonPrama,findShopBack);

}

//查询商户返回

function findShopBack(da){

    //alert("查询商户成功"+da.code);



    $("#shjstbody").empty();

    if(da.code=="000"){

        $.each(da.list,function(index,enty){

            //alert("gl"+enty.id);



            var rd="<tr><td >"+enty.name+"</td>";

            rd+="<td >"+enty.agentName+"</td>";

            rd+="<td ><a onclick='xuzesh(\""+enty.id+"\",\""+enty.name+"\",\""+enty.agentId+"\",\""+enty.agentName+"\")'>选择</a> </td></tr>";

            $("#shjstbody").append(rd);

        });


    }else{

        alert(da.mess);

    }

    IsCreatePage=false;

    if(!IsCreatePage)

    {

        IsCreatePage=true;

        $("#pageId").createPage({

            count:da.count,//总条数

            pageCount:Math.ceil(da.count/pageSize),//viewdata.TotalNum

            current:pageCurrent,

            backFn:function(p){

                pageCurrent=p;

                //单击回调方法，p是当前页码

                findShop()

            }

        });

    }

    return;

}
//选择商户后信息
function xuzesh(da,db,bi,bn) {

    //alert("选择了什么"+da+"**"+db);
    //branchId=bi;
    agentId=bi;
    //branchName=bn;
    agentName=bn;
    $("#shjs").hide();

    $("#shopNameText").val(db);
    superShopName=db;
    superShopId = da;
    $("#dzsuperSP").val(db);
    findbianhao();
}
//生成网点编号
function  findbianhao(){
    var ob=new Object();
    ob.shopId=superShopId;
    var obw=new Object();
    obw.marked="Dounenglu_storesCallin_findStoresNum";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_findbianhao);
}
function callBack_findbianhao(data){
    $("#shopNum").val(data.mess);
}
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
    if(data.code==0){
        $('#branchText').html("");
        $('#branch').empty();
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li><a onclick='brahClick(\""+entry.id+"\",\""+entry.name+"\")'>"+entry.name+"</a></li>";
            $('#branch').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    //branchId=userBranchId;//如果不选分公司就为管理员的
    //$("#branchText").html(userBranchName);
    $("#branchText").html(branchName);
    pull_down();
    return;
}
function brahClick(a1,b){
    branchId=a1;
    branName=b;
}




/**
 * 查询所有省份
 */
function selectProvice(){
    var ob=new Object();
    ob.level=1;
    ob.parentId="0";
    var obw=new Object();
    obw.marked="findProviceOrCity";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_selectProvice);

}
//查询省返回
function callBack_selectProvice(data){

    if(data.code==0){
        $('#proviceText').html("");
        $('#provice').empty();
        $('#cityText').html("");
        $('#city').empty();
        $('#conText').html("");
        $('#con').empty();

        proviceId="";
        proviceName="";
        cityId="";
        cityName="";
        xianid="";
        xianName="";

        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li><a onclick='proviceClick(\""+entry.id+"\",\""+entry.name+"\")'>"+entry.name+"</a></li>";
            $('#provice').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();


    return;
}
//获取省信息
function proviceClick(a1,b){
    //a(a1+b);
    proviceId=a1;
    proviceName=b;
    selectCity(a1);
}
//查询市
function selectCity(p){
    var ob=new Object();
    ob.level=2;
    ob.parentId=p;
    var obw=new Object();
    obw.marked="findProviceOrCity";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_selectCity);
}
//查询市返回
function callBack_selectCity(data){
    if(data.code==0){

        $('#cityText').html("");
        $('#city').empty();
        $('#conText').html("");
        $('#con').empty();


        cityId="";
        cityName="";
        xianid="";
        xianName="";
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li><a onclick='cityClick(\""+entry.id+"\",\""+entry.name+"\")'>"+entry.name+"</a></li>";
            $('#city').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();
    return;
}
//获得市信息
function cityClick(a1,b){
    cityId=a1;
    cityName=b;

    var ob=new Object();

    ob.level=3;
    ob.parentId=cityId;

    var jsonPrama = {

        "marked": "findProviceOrCity",
        "code":"10008",
        "version":"1.0",
        "jsonStr": JSON.stringify(ob)

    };

    findDataForAll( jsonPrama, getxian_back);
}


function getxian_back(data){

    if(data.code=="000"){

        $('#conText').html("");
        $('#con').empty();


        xianid="";
        xianName="";

        $.each(data.list,function(entryIndex, entry){

            var str='<li><a onclick="getxianId(\''+entry.id+'\',\''+entry.name+'\')">'+entry.name+'</a></li>'

            $('#con').append(str);

        });

    }else{

        alert(data.mess)

    }

    pull_down();

}

function getxianId(da,b){

    xianid=da;
    xianName=b;

}


function addDZDP() {


    if(shopId==""){
        alert("请先保存门店信息");
        return;
    }
    if($("#dzdp_shopid").val()==""){
        alert("大众点评商户号dpShopID不能为空");
        return;
    }

    var jsonPrama = {
        "marked": "AddDZDPConfigAction_send",
        "code":"10000",
        "version":"1.0",
        "jsonStr": "{}"
    }
    //alert($("#shopname2").attr("data-value"));
    var myjsonStr = setJson(null, "dpShopId",$("#dzdp_shopid").val());
    myjsonStr = setJson(myjsonStr, "shanghuName", $("#dzsuperSP")[0].innerText);
    myjsonStr = setJson(myjsonStr, "wangdianName", $("#dzSP")[0].innerText);
    myjsonStr = setJson(myjsonStr, "branchCompanyID","");
    myjsonStr = setJson(myjsonStr, "shopId",shopId);
    jsonPrama.jsonStr = myjsonStr;
    //alert($("#shopname2").attr("data-value"));
    //jQuery.axjsonp(url, jsonPrama, callBack_send);
    findDataForAllOld(jsonPrama, callBack_send);
}

function callBack_send(data) {

    if (data.rspCode == "000") {
        alert("审核已通过");
        //location.href ="dazhongdianping.html";
    } else {
        alert(data.rspCode + "   " + data.rspDesc);
        //location.href ="dazhongdianping.html";
    }


}

function findSPone(){
    var json=new Object();

    json.spId=shopId;

    var jsonPrama = {

        "marked" : "Dounenglu_storesCallin_findShop",
        "code":"10008",
        "version":"1.0",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    findDataForAll(jsonPrama,findPJTBack);
}

//查询网点信息返回

function findPJTBack(da){

    if(da.code!="000"){

        //alert(da.mess);

        return;

    }

    //alert(JSON.stringify(da));

    //$("#checkShow").html("审批意见："+da.show+";发布意见："+
    branchId=da.superBranId;
    branchName=da.superBranName;

    superShopId=da.superShopId;
    superShopName=da.superShopName;

    $("#shopNameText").val(da.superShopName);

    $("#wdN").val(da.name);

    $("#wdJ").val(da.sortName);
    $("#poswdN").val(da.posShopName)
    $("#state").html(stateList[da.state==""?0:da.state]);

    proviceId=da.proviceId;

    cityId=da.cityId;

    xianid=da.xianid;

    proviceName=da.proviceName;

    cityName=da.cityName;

    xianName=da.xian;

    $("#proviceText").html(da.proviceName);

    $("#cityText").html(da.cityName);

    $("#conText").html(da.xian);

    $("#shopAddress").val(da.address);

    $("#shopNum").val(da.shopNum);

    $("#remarke").val(da.bz);

    $("#ztbgyj").val(da.yj);

    $("#customerServicePhone").val(da.servicePhone);

    $("#coordinates").val(da.location);

    var sttime=da.startTime;

    if(sttime!=null&&sttime!=""){

        $("#businessStartHours").val(sttime.substr(0,5));

    }

    var entime=da.endTime;

    if(entime!=null&&entime!=""){

        $("#businessEndHours").val(entime.substr(0,5));

    }





    $("#specialServices").val(da.service);

    //三张图片没处理

    tp1=da.im1;

    $("#tp1")[0].src=imgBaseUrl+"/uploads/"+da.im1;
    tp2=da.im2;

    $("#tp2")[0].src=imgBaseUrl+"/uploads/"+da.im2;
    tp3=da.im3;

    $("#tp3")[0].src=imgBaseUrl+"/uploads/"+da.im3;

    $("#yinshang").val(da.yinshang);



    $("#tbody").empty();

    var lxrarr=da.peoarr;

    $.each(lxrarr,function(index,enty){

        var str='<tr><td>'+enty.shopAssistantName+'</td><td>'+enty.shopAssistantPhone+'</td><td>'+enty.shopAssistantEmail+'</td><td>'+enty.position+'</td><td>'+enty.shopAssistantNote+'</td><td><a onclick="xiugai(this)">修改</a>  <a onclick="shanchu(this)">删除</a></td></tr>';

        $("#tbody").append(str);

    });

    findpos();//查询门店赋值后把pos查询出来

}
//弹出添加pos弹框
function addPosShow(){
    if(shopId==""){
        alert("请先保存门店,或选择门店");
        return;
    }
    ShowShelter();
    $('.pop-layer4').show();

    $("#posShopNum").val($("#shopNum").val());

    //branchId=userBranchId;//如果不选分公司就为管理员的
    //$("#branchText").html(userBranchName);
    $("#branchText").html(branchName);
    if(userBranchtype=="0"){
        selectBranch();
    }
}

function addposagentClick(b){
if(b=="0"){
    addposagentid="";
}else{
    findagent(b);//查询代理
}
}
function findagent(b){
//查询代理

        var ob=new Object();
        ob.branchId=branchId;
        ob.level=b;
        var obw=new Object();
        obw.marked="superShop_findAgent";
        obw.jsonStr=JSON.stringify(ob);
        findDataForAll(obw,callBack_selectAge);
    }
//查询代理返回
    function callBack_selectAge(data){
        $('#agentText').html("");
        $('#agent').empty();
        addposagentid="";
        if(data.code==0){

            $.each(data.list,function(entryIndex, entry){
                var strHtml = "<li><a onclick='agentClick(\""+entry.id+"\",\""+entry.name+"\")'>"+entry.name+"</a></li>";
                $('#agent').append(strHtml);
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
        addposagentid=a1;
    }

function peijian(c){
    youpeijian=$(c).is(":checked");

}
//pos合作方,一二级选择
function addposposparstateClick(e){
    findposhz(e);
}
function findposhz(b){
//查询pos合作方

    var ob=new Object();
    ob.branchID=$.cookie("branchId_d");
    ob.level=b;
    var obw=new Object();
    obw.marked="Dounenglu_storesCallin_getPOSParter";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_findposhz);
}
//查询pos合作方返回
function callBack_findposhz(data){
    $('#posparText').html("");
    $('#pospar').empty();
    addposhezuoid="";
    if(data.code==0){

        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li><a onclick='findposhzClick(\""+entry.id+"\",\""+entry.name+"\")'>"+entry.name+"</a></li>";
            $('#pospar').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();
    return;
}
//选择pos合作方
function findposhzClick(a1,b){
    addposhezuoid=a1;
}
//pos配件合作方,一二级选择
function peijianaddposposparstateClick(e){
    findpeijianposhz(e);
}

function findpeijianposhz(b){
//查询配件pos合作方

    var ob=new Object();
    ob.branchID=branchId;
    ob.level=b;
    var obw=new Object();
    obw.marked="Dounenglu_storesCallin_getPOSParter";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_findpeijianposhz);
}
//查询配件pos合作方返回
function callBack_findpeijianposhz(data){
    $('#peijianposparText').html("");
    $('#peijianpospar').empty();
    addpospeijianhezuoid="";
    if(data.code==0){

        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li><a onclick='findpeijianposhzClick(\""+entry.id+"\",\""+entry.name+"\")'>"+entry.name+"</a></li>";
            $('#peijianpospar').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();
    return;
}
//选择配件pos合作方
function findpeijianposhzClick(a1,b){
    addpospeijianhezuoid=a1;
}


<!--以下pos添加配件-->

//添加配件
function addPJ(b){
    //alert("pj"+b);
    ddpos=b;
    ShowShelter();
    $('.pop-layer15').show();
}

function addposposparstateClick1(b){
    findpeijianposhz1(b);
}

function findpeijianposhz1(b){
//查询配件pos合作方

    var ob=new Object();
    ob.branchID=$.cookie("branchId_d");
    ob.level=b;
    var obw=new Object();
    obw.marked="Dounenglu_storesCallin_getPOSParter";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_findpeijianposhz1);
}
//查询配件pos合作方返回
function callBack_findpeijianposhz1(data){
    $('#posparText1').html("");
    $('#pospar1').empty();
    if(data.code==0){

        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li><a onclick='findpeijianposhzClick1(\""+entry.id+"\",\""+entry.name+"\")'>"+entry.name+"</a></li>";
            $('#pospar1').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();
    return;
}
//选择配件pos合作方

function findpeijianposhzClick1(a1,b){
    ddpj=a1;
}
function addPosPJ(){
    var ob=new Object();
    ob.posId=ddpos;
    ob.pjid=ddpj;
    var obw=new Object();
    obw.marked="Dounenglu_storesCallin_addPosPJ";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_addPosPJ);
}
function callBack_addPosPJ(da){
    alert(da.mess);
    HideShelter();
    $('.pop-layer15').hide();
    findpos();
}

function outpos(){
    //导出pos列表
    var ob=new Object();
    ob.spId=shopId;
    ob.num=$("#zdh").val();
    var obw=new Object();
    obw.marked="storesCallin_outPos";
    obw.jsonStr=JSON.stringify(ob);
    //alert(JSON.stringify(obw))
    findDataForAll(obw,callBack_outpos);
}
function callBack_outpos(da){
    location.href=da.mess;
}

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
    //$('#branchText2').html("");
    $('#branch2').empty();
    if(data.code==0){
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li data-value="+entry.id+"><a >"+entry.name+"</a></li>";
            $('#branch2').append(strHtml);
        });
        //$("#branch2").html(branchName);

    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    //haha();
    pull_down();
    return;
}


function updatePOS(){
    var jsonPrama = {
        "marked": "Dounenglu_userInformation_updatePOS",
        "code":"10008",
        "version":"1.0",
        "jsonStr": "{}"
    }
    //alert($("#posid").attr("data-value"));
    var myjsonStr = setJson(null,"posId",$("#posid").attr("data-value"));
    if($("#branchText2").attr("data-value")==""){
        alert("请选择分公司");
        return ;
    }
    myjsonStr = setJson(myjsonStr,"branchId",$("#branchText2").attr("data-value"));
    if($("#posparText2").attr("data-value")==""){
        alert("请合作方名称");
        return ;
    }
    myjsonStr = setJson(myjsonStr,"posparterId",$("#posparText2").attr("data-value"));
    jsonPrama.jsonStr=myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack_updatePOS1);

}
function callBack_updatePOS1(data){
    //alert(data.code)
    if(data.code == 0){
        alert("修改成功");
        $(".pop-layer9").hide();
        findpos();
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }


}