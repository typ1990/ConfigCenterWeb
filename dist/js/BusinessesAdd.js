﻿var shopStateEdit="0";
var conStateEdit="0";
var shopStateEditText="0";
var conStateEditText="0";

//商户属性
//var conId="ff808081513e107301513e592b56005e";
var shEd="";
var conId="";
var shopId="";
var jsonConStr="";//合同信息
var jsonDLStr=""//代理信息
var editFlag=false;
var shopState="1";
var industry='0';
var industryName="美食";
var proviceId="";
var proviceName="";
var cityId="";
var cityName="";
var xianid="";
var xianName="";
var branName="";
var isBigMarket="0";
var lxrarr=new Array;
var shopStaList=["停用","启用","合同到期","","预注册","待审核","驳回","","","","","","","","","","","","",""];//商户状态反填用
var conStaList=["停用","启用","预注册","合同到期","","","","","","","","","","","","",""];//合同状态反填用
var ss=null;//联系人修改时候判断是不是要删除的
var branchId=$.cookie("branchId_d");
var branchName=$.cookie("branchName_d");
var agentId=$.cookie("agentId_d");
var agentName=$.cookie("agentName_d");

$(function(){
    
    if($.cookie("agentId_d")==null){
        parent.ssaa();
    }
    $('#branchText').text(branchName);
    $("#branchText").attr("data-value",branchId);
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
    for(var j=0;j<=i-a;j++){
        //$('#agentLevellistx').append("<li data-value=\""+i-j+"\"><a>"+i-j+"级</a></li>");
        var aaa=i-j;
        $('#agentLevellist').append("<li data-value=\""+aaa+"\"><a onclick=\"jibieClick('"+aaa+"')\">"+aaa+"级</a></li>");
    }

    $('#download').click(function(e) {
        window.open(excelDownUrl+"business.xls");
    });
    shopId=request.QueryString("shopId");
    var tt=request.QueryString("editFla");
    if(tt){
        editFlag=true;
    }else{
        editFlag=false;
    }
    //a("录入角色"+userRoleName+userId);


    //$("#kz").attr("disabled",false);
    //shopState="5";
    //$("#stateText").html("待审核");

    pull_down();
    selectProvice();//查询省
    //截取简称
    $("#shopName").focusout(function(){
        if( $("#shopName").val()!=""){
            //$("#conShopName").val( $("#shopName").val());
            if( $("#shopName").val().length<=20){
                $("#shopShortName").val($("#shopName").val());
            }else{
                $("#shopShortName").val($("#shopName").val().substr(0,20));
            }
        }
    });
    //弹出添加联系人弹框
    $("#addPeople").click(function(){
        ShowShelter();
        $('.add_people_pop').show();

        $("#name1").val("");
        $("#phone1").val("");
        $("#email1").val("");
        $("#position1").val("");
        $("#personRemarke1").val("");
    });

    //触发添加联系人控件
    $('#personyes').click(function(e) {
        if(ss!=null){
            deleterow(ss);
        }
        addperson();
    });
    //取消添加联系人
    $("#personno").click(function(){
        HideShelter();
        $('.add_people_pop').hide();
    });

    //提交
    $('#submit').click(function(){
        if(checkshop()){
            submitClick();
        }
    });
    $('#getLevel').click(function(){
        $('#agentText').html("");
        $("#agentText").attr("data-value","");
    });

    var upurl=preRegistShopUrl+'?redirect='+window.location.href.replace(/\/[^\/]*$/,'/jQueryfileupload/uploadresult.html');
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
        "marked": "superShop_import",
        "code":"10000",
        "version":"1.0",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null, "url", p);
    jsonPrama.jsonStr = myjsonStr;
    jQuery.axjsonp(url, jsonPrama, callBack);
}
function bigMarket(b){
    isBigMarket=b;
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



//检查必填项
function checkshop(){
    if(getRealLen($("#shopAdvertising").val())>128){
        alert("广告语太长,请修改!");
        return false;
    }
    if(getRealLen($("#shopQrCode").val())>128){
        alert("二维码信息太长,请修改!");
        return false;
    }

    if($("#shopName").val().trim()==""){
        alert("请填写商户全称!");
        return false;
    }
    //alert($.cookie("branchId"));
    //if(branchId==""){
    //    alert("请选择分公司!");
    //    return false;
    //}
    if(DLid==""){
        alert("请填写所属代理!");
        return false;
    }
    lxrarr=new Array;
    var tableObj=$("#persontable")[0];
    for (var i = 0; i < tableObj.rows.length; i++) {    //遍历Table的所有Row
        //遍历Row中的每一列
        var ob=new Object();
        ob.name=tableObj.rows[i].cells[0].innerHTML;
        ob.phone= tableObj.rows[i].cells[1].innerHTML;
        ob.email=tableObj.rows[i].cells[2].innerHTML;
        ob.position=tableObj.rows[i].cells[3].innerHTML;
        ob.personRemarke=tableObj.rows[i].cells[4].innerHTML;
        lxrarr.push(ob);

    }
    //添加代理信息
    var dl=new Object();
    dl.agentId=DLid;
    dl.agentUserId=DLUser;
    jsonDLStr=JSON.stringify(dl);
    //alert("商户联系人=="+lxrarr.toString());

    return true;
}
//提交信息
function submitClick(){

    var ob=new Object();
    ob.id=shopId;
    ob.name=$("#shopName").val().trim();
    ob.single=$("#singleShopChecked")[0].checked?"1":"0";
    ob.superShopShortName=$("#shopShortName").val();
    ob.branchCompanyName=$.cookie("branchName_d");
    ob.branchID=$.cookie("branchId_d");
    ob.state=shopState;
    ob.conState=conSta;
    ob.isBigMarket=isBigMarket;
    ob.shopQrCode=$("#shopQrCode").val();
    ob.shopAdvertising=$("#shopAdvertising").val();
    ob.industry=industryName;
    ob.industryNum=industry;
    ob.shopSource="10007";//商户来源
    ob.proname=proviceName;
    ob.proviceID=proviceId;
    ob.city=cityName;
    ob.cityID=cityId;
    ob.xianID=xianid;
    ob.xianName=xianName;
    ob.remark=$("#remark").val();
    ob.logourl="";
    ob.shopmessage="";//商户简介
    ob.shopAddress=$("#shopAddress").val();
    ob.agent=DLid;
    ob.jsonConStr=jsonConStr;
    ob.jsonDLStr=jsonDLStr;
    ob.userid=$.cookie("userNickName_d");
    ob.autext=shopStateEditText;
    ob.sh=shopStateEdit;
    ob.conPeople=lxrarr;
    //ob.images=JSON.stringify(new Object());
    var tpO=new Object();
    tpO.businessLicense="";
    tpO.taxRegistrationCertificate="";
    tpO.organizationCode="";
    tpO.legalPersonIDCard="";
    tpO.legalPersonIDCard2="";
    tpO.openAccountLicense="";
    tpO.legalPersonBankCard="";
    tpO.cooperativeContract="";
    tpO.accountInformation="";
    tpO.doorheadPhoto="";
    tpO.doorplatePhoto="";
    tpO.insidePhoto="";
    tpO.insidePhoto2="";
    tpO.foodLicense="";
    tpO.restaurantLicense="";
    tpO.travelAgencyLicense="";
    tpO.publicationLicense="";
    tpO.medicalLicense="";
    tpO.recreationLicense="";
    tpO.foodLicense2="";
    tpO.otherLicense="";
    tpO.shopRefundPermissionBlank="";
    tpO.weixinRefundCertificate="";
    tpO.weixinChildShopCertificate="";
    tpO.jingdongAuthorization="";
    tpO.jingdongPaymentAgreement="";
    tpO.zhifubaoInformation="";
    tpO.childShopPhoto1="";
    tpO.childShopPhoto2="";
    tpO.childShopPhoto3="";
    tpO.companyNameStr="";
    tpO.openAccountNameStr="";
    tpO.openAccountBankStr="";
    tpO.bankAccountNumberStr="";
    tpO.legalPersonIDCardStr="";
    tpO.name="";
    ob.images=JSON.stringify(tpO);
    shopId="";//添加完id清空
    var obw=new Object();
    obw.marked="Dounenglu_superShop_addAndEdit";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    //alert("传入参数"+JSON.stringify(obw));
    findDataForAll(obw,addAndeditBack);
}
function addAndeditBack(data){
    alert("操作返回:"+data.mess);
    if(data.code!="000"){
        shopId=data.shopId;//如果创建不成功但商户已添加了,所以再提交的时候不能再建一条了
    }else{
        location.href="./Businesses-Mgt.html";
    }

}

/**
 * 添加联系人
 */
function addperson(){
    //alert("1");
    ss=null;
    var name1 = $('#name1').val();
    var phone11 = $('#phone1').val();
    var email1 = $('#email1').val();
    if(name1 == ""){
        alert("联系人姓名不能为空！");
        return;
    }
    if(phone11=="")
    {
        alert("联系人电话不能为空！");
        return;
    }
    if(CheckIsMobile(phone11)){
        var tr_id= 1;
        if(!email1 == ""){
            var ff=checkvalue(email1);
            if(ff){

            }else{
                return;
            }
        }
        var strHtml = "<tr id=tr_id><th>"+$('#name1').val()+ "</th>" +
            "<th>"+$('#phone1').val()+ "</th>"+
            "<th>"+$('#email1').val()+ "</th>"+
            "<th>"+$('#position1').val()+ "</th>"+
            "<th>"+$('#personRemarke1').val()+ "</th>"+
            "<th><a href='#' onclick='xiugai(this)'>修改</a><a  href='#' onclick='deleterow(this)'>删除</a></th>"+
            "</tr>";
        $('#persontable').append(strHtml);
        HideShelter();
        $('.add_people_pop').hide();
    }else{
        return;
    }

}

function xiugai(da){
    ShowShelter();
    $(".add_people_pop").show();
    //alert($(da).parent().parent().find("th").eq(0).html());
    $("#name1").val($(da).parent().parent().find("th").eq(0).html());
    $("#phone1").val($(da).parent().parent().find("th").eq(1).html());
    $("#email1").val($(da).parent().parent().find("th").eq(2).html());
    $("#position1").val($(da).parent().parent().find("th").eq(3).html());
    $("#personRemarke1").val($(da).parent().parent().find("th").eq(4).html());
    ss=da;
    //var s=$(da).parent().parent().find("td").eq(0).html();
    // alert(s)
}

function deleterow(obj){
    var vbtnDel=$(obj);//得到点击的按钮对象
    var vTr=vbtnDel.parent("th").parent("tr");//得到父tr对象;
    vTr.remove();
}



//商户状态
function shopStateClick(a){
    if(editFlag){
        ShowShelter();
        $('.shyjsh-layer').show();
        //存储来自哪里,审核状态(点提交时才生效)
        $("#shyjshtj").click(function(){
            shopState=a;
            shopStateEdit="1";
            shopStateEditText=$("#shyjshText").val();
            HideShelter();
            $('.shyjsh-layer').hide();
        });
    }else{
        shopState=a;
    }

}
function shenhe(a1,b1){
    //$("#saveMes").attr("data-where",a1);
    //$("#saveMes").attr("data-value",b1);
    $("#shyjtj").click(function(){
        if(shEd=="0"){
            shopState=b1;
            shopStateEdit="1";
            shopStateEditText=$("#shyjText").val();
        }else  if(shEd=="1"){
            conSta=b1;
            conStateEdit="1";
            conStateEditText=$("#shyjText").val();
        }

    });
}

function industryClick(a,b){
    industry=a;
    industryName=b;
}



//审核弹出框
function pass_pop(inde,da){
    var setId=da;
    // alert(inde+"***"+da);

    $('.pass_pop_ht').show();
    $("#passyes").click(function(){
        $('.pass_pop_ht').hide();
        var text=$("#passInput").val();
        //alert(text);
        if(setId==""||inde==""){
            alert("渠道信息或审核状态有误");
        }else{
            var json=new Object();
            json.userId= $.cookie("userId_d");
            json.ticId=setId;//id
            json.mark=inde;//
            json.text=text;

            var jsonPrama = {
                "marked" : "bussinessAction_checkPublish",
                "code":"10000",
                "version":"1.0",
                "callbackparam" : "success_jsonpCallback",
                "jsonStr":JSON.stringify(json)
            };
            //alert(JSON.stringify(jsonPrama));
            findData(jsonPrama,caozuoBack);
        }
        $("#passyes").unbind('click');
    });
    $("#passno").click(function(){
        $("#passyes").unbind('click');
    });
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
        $('#proname').empty();
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
            $('#proname').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();

    //如果是总公司人查询所有分公司
    //if(userBranchtype=="0"){
    //    selectBranch();
    //    branchId="";
    //}else{
    $("#branchText").val($.cookie("branchName_d"));
    branchId=$.cookie("branchId_d");
    //如果是编辑状态查询单条记录
    if(editFlag){
        var edit=request.QueryString("edit");
        //alert("edit:"+edit);
        if(edit=="true"){
            $("#kz").attr("disabled",true);
        }else{
            $("#kz").attr("disabled",false);
        }
        seleOne();
    }
    //}
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
        "version": "1.0",
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

            var str='<li><a href="#" onclick="getxianId(\''+entry.id+'\',\''+entry.name+'\')">'+entry.name+'</a></li>'

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


//查询单条记录
function seleOne(){
    var ob=new Object();
    ob.shopId=shopId;
    var obw=new Object();
    obw.marked="Dounenglu_superShop_findSuperShopOne";
    obw.code="10008";
    obw.version="1.0";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_selectOne);
}
//查询单条记录
function callBack_selectOne(data){
    if(data.code==0){
        //a("查询单条记录成功");
        conId=data.ConId;
        shopId=data.id;
        shopState=data.state;
        industryName=data.industry;
        industry=data.industryNum;
        proviceName=data.proname;
        proviceId=data.proviceID;
        cityName=data.city;
        cityId=data.cityID;
        xianName=data.xianName;
        xianid=data.xianid;
        branName=data.branchCompanyName;
        branchId=data.branchID;
        DLid=data.agentId;
        lxrarr=data.list;
        isBigMarket=data.isBigMarket==""?"0":data.isBigMarket;
        if(isBigMarket=="1"){
            $("#bigMarket").html("是");
        }else {
            $("#bigMarket").html("否");
        }
        $("#shopQrCode").val(data.shopQrCode);
        $("#shopAdvertising").val(data.shopAdvertising);
        jsonConStr="";
        jsonDLStr="";
        shopStateEditText="";
        shopStateEdit="0";
        $("singleShopChecked").prop("checked",false);
        $("#singleShopChecked")[0].checked=false;
        if(data.isSingle=="1"){
            $("singleShopChecked").prop("checked",true);
            $("#singleShopChecked")[0].checked=true;
        }
        if(data.singleShop=="0"){
            $('#singleDiv').hide();
        }else{
            $('#singleDiv').show();
        }

        $('#shopName').val(data.name);
        $('#shopShortName').val(data.shortName);
        $('#stateText').html(shopStaList[data.state]);
        $('#hyText').html(data.industry);
        $('#proviceText').html(data.proname);
        $('#cityText').html(data.city);
        $('#conText').html(data.xianName);
        $('#shopAddress').val(data.shopAddress);
        $('#branchText').html(data.branchCompanyName);
        $('#remark').val(data.remark);
        $('#opinion').val(data.opinion);
        $('#jibieText').html(data.agentLevel==""?"":data.agentLevel+"级代理");
        $('#agentText').html(data.agentName);

        $('#conStateStr').html(conStaList[data.conSta]);
        lxr(data.list);//添加联系人
        dllxr(data.agentUsers);//添加代理联系人
        findTP();
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();
    return;
}

//查询商户进件神器的图片
function findTP(){
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
        if(da.businessLicense!=null&&da.businessLicense!=""&&da.businessLicense!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.businessLicense+"' target='_blank' >营业执照</a>   ";
        }
        if(da.taxRegistrationCertificate!=null&&da.taxRegistrationCertificate!=""&&da.taxRegistrationCertificate!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.taxRegistrationCertificate+"' target='_blank' >税务登记证</a>   ";
        }
        if(da.organizationCode!=null&&da.organizationCode!=""&&da.organizationCode!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.organizationCode+"' target='_blank' >组织机构代码证</a>   ";
        }
        if(da.legalPersonIDCard!=null&&da.legalPersonIDCard!=""&&da.legalPersonIDCard!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.legalPersonIDCard+"' target='_blank' >法人身份证(正面)</a>   ";
        }
        if(da.legalPersonIDCard2!=null&&da.legalPersonIDCard2!=""&&da.legalPersonIDCard2!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.legalPersonIDCard2+"' target='_blank' >法人身份证(反面)</a>   ";
        }
        if(da.openAccountLicense!=null&&da.openAccountLicense!=""&&da.openAccountLicense!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.openAccountLicense+"' target='_blank' >开户许可证</a>   ";
        }
        if(da.legalPersonBankCard!=null&&da.legalPersonBankCard!=""&&da.legalPersonBankCard!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.legalPersonBankCard+"' target='_blank' >法人银行卡</a>   ";
        }
        if(da.cooperativeContract!=null&&da.cooperativeContract!=""&&da.cooperativeContract!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.cooperativeContract+"' target='_blank' >合作合同</a>   ";
        }
        if(da.accountInformation!=null&&da.accountInformation!=""&&da.accountInformation!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.accountInformation+"' target='_blank' >账户信息</a>   ";
        }
        if(da.doorheadPhoto!=null&&da.doorheadPhoto!=""&&da.doorheadPhoto!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.doorheadPhoto+"' target='_blank' >经营场所门头照</a>   ";
        }
        if(da.doorplatePhoto!=null&&da.doorplatePhoto!=""&&da.doorplatePhoto!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.doorplatePhoto+"' target='_blank' >经营场所门牌照</a>   ";
        }
        if(da.insidePhoto!=null&&da.insidePhoto!=""&&da.insidePhoto!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.insidePhoto+"' target='_blank' >内部照</a>   ";
        }
        if(da.foodLicense!=null&&da.foodLicense!=""&&da.foodLicense!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.foodLicense+"' target='_blank' >卫生许可证</a>   ";
        }
        if(da.restaurantLicense!=null&&da.restaurantLicense!=""&&da.restaurantLicense!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.restaurantLicense+"' target='_blank' >餐饮服务许可证</a>   ";
        }
        if(da.travelAgencyLicense!=null&&da.travelAgencyLicense!=""&&da.travelAgencyLicense!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.travelAgencyLicense+"' target='_blank' >旅行社业务经营许可证</a>   ";
        }
        if(da.publicationLicense!=null&&da.publicationLicense!=""&&da.publicationLicense!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.publicationLicense+"' target='_blank' >音像制品经营许可证</a>   ";
        }
        if(da.medicalLicense!=null&&da.medicalLicense!=""&&da.medicalLicense!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.medicalLicense+"' target='_blank' >医疗机构许可证</a>   ";
        }
        if(da.recreationLicense!=null&&da.recreationLicense!=""&&da.recreationLicense!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.recreationLicense+"' target='_blank' >娱乐经营许可证</a>   ";
        }
        if(da.foodLicense2!=null&&da.foodLicense2!=""&&da.foodLicense2!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.foodLicense2+"' target='_blank' >食品流通许可证</a>   ";
        }
        if(da.shopRefundPermissionBlank!=null&&da.shopRefundPermissionBlank!=""&&da.shopRefundPermissionBlank!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.shopRefundPermissionBlank+"' target='_blank' >商户退款权限变更申请表</a>   ";
        }
        if(da.weixinRefundCertificate!=null&&da.weixinRefundCertificate!=""&&da.weixinRefundCertificate!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.weixinRefundCertificate+"' target='_blank' >微信退款指令授权证明书</a>   ";
        }
        if(da.weixinChildShopCertificate!=null&&da.weixinChildShopCertificate!=""&&da.weixinChildShopCertificate!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.weixinChildShopCertificate+"' target='_blank' >微信子商户授权证明书</a>   ";
        }
        if(da.jingdongAuthorization!=null&&da.jingdongAuthorization!=""&&da.jingdongAuthorization!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.jingdongAuthorization+"' target='_blank' >京东委托书</a>   ";
        }
        if(da.jingdongPaymentAgreement!=null&&da.jingdongPaymentAgreement!=""&&da.jingdongPaymentAgreement!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.jingdongPaymentAgreement+"' target='_blank' >京东“码支付”服务协议</a>   ";
        }
        if(da.zhifubaoInformation!=null&&da.zhifubaoInformation!=""&&da.zhifubaoInformation!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.zhifubaoInformation+"' target='_blank' >支付宝信息采集表</a>   ";
        }
        if(da.childShopPhoto1!=null&&da.childShopPhoto1!=""&&da.childShopPhoto1!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.childShopPhoto1+"' target='_blank' >门店照片1</a>   ";
        }
        if(da.childShopPhoto2!=null&&da.childShopPhoto2!=""&&da.childShopPhoto2!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.childShopPhoto2+"' target='_blank' >门店照片2</a>   ";
        }
        if(da.childShopPhoto3!=null&&da.childShopPhoto3!=""&&da.childShopPhoto3!="null"){
            ss+="<a href='"+imgBaseUrl+"/uploads/"+da.childShopPhoto3+"' target='_blank' >门店照片3</a>   ";
        }

        $("#tp").html(ss);
    }
}
//反填联系人
function lxr(da){
    $('#persontable').empty();
    $.each(da,function(index,enty){
        var strHtml = "<tr id=tr_id><td>"+enty.name+ "</td>" +
            "<td>"+enty.phone+ "</td>"+
            "<td>"+enty.email+ "</td>"+
            "<td>"+enty.position+ "</td>"+
            "<td>"+enty.personRemarke+ "</td>"+
            "<td><a href='#' onclick='xiugai(this)'>修改</a><a  href='#' onclick='deleterow(this)'>删除</a></td></tr>";
        $('#persontable').append(strHtml);
    });

}
//反填代理联系人
function dllxr(da){
    $('#agentUserTable').empty();
    $.each(da,function(index,enty){
        DLUser.push(enty.id);
        var strHtml = "<tr id=tr_id><th>"+enty.name+ "</th>" +
            "<th>"+enty.num+ "</th><th><input data-va='999' type='checkbox' checked onclick='selectAgentUser(this,\""+enty.id+"\")'>选择</td></th></tr>";
        $('#agentUserTable').append(strHtml);
    });

}
