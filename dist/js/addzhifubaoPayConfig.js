//支付宝联鑫付
var shopId="";
var shopName="";
$(function () {
//alert('111'+location.search)
    shopId=request.QueryString("superShopId");
    shopName=decodeURIComponent(request.QueryString("superShopName"));
    $("#shopName").val(shopName);
     updateShop();


    $('#addbaiduPayConfig').click(function (e) {
        addzhifubaoPayConfig();
    });

    $('#addkeys').click(function (e) {
        putOutKeys();
    });

});



function addzhifubaoPayConfig() {
    //alert(document.getElementByIdx_x_x("shopname").getAttribute("data-type1"));
    //alert($("#shopname").attr("data-value"));
    //alert("添加成功"+$("#shopname").data('type'))
    //if($("#shopname").attr("data-value")==null){
    //    alert("操作失败，请选择商户名称");
    //    return;
    //}
    /*if((!$('#ischild').is(':checked'))&&(!$('#notchild').is(':checked'))){
        alert("请选择商户是否为餐饮");
        return;
    }
    if($('#ischild').is(':checked')){
        isrepast="1";
        //alert("餐饮");
    }*/
    //if((!$('#isOpen').is(':checked'))&&(!$('#noOpen').is(':checked'))){
    //    alert("请选择商户是否是否开通威富通支付");
    //    return;
    //}
    //if($('#isOpen').is(':checked')){
    //    isWFT="1";
    //    if($("#WFTShopid").val()==""){
    //        alert("威富通商户编号不能为空");
    //        return;
    //    }
    //    if($("#WFTPassWord").val()==""){
    //        alert("威富通初始密钥不能为空");
    //        return;
    //    }
    //
    //}
    //if($('#noOpen').is(':checked')){
    //    isWFT="0";
    //}
    if($("#shopPub_key").val()==""){
        alert("商户公钥不能为空");
        return;
    }
    if($("#shopPri_key").val()==""){
        alert("商户私钥不能为空");
        return;
    }

    /*if($("#public_key").val()==""){
        alert("支付宝公钥不能为空");
        return;
    }
    if($("#mchID").val()==""){
        alert("商户号不能为空");
        return;
    }*/
    //$("#shopPub_key").
    //alert($("#shopPub_key").val());
    //alert($("#shopPub_key").val());
    var myjsonStr = setJson(null, "contract_businessID","");
    myjsonStr = setJson(myjsonStr,"closed","1");
    myjsonStr = setJson(myjsonStr,"busCode","14");
    myjsonStr = setJson(myjsonStr, "isWFT", "0");
    myjsonStr = setJson(myjsonStr, "lxfPID", $("#superPID").val());
    myjsonStr = setJson(myjsonStr, "WFTShopid", "");
    myjsonStr = setJson(myjsonStr, "WFTPassWord", "");
    myjsonStr = setJson(myjsonStr, "shopPri_key", $("#shopPri_key").val());
    myjsonStr = setJson(myjsonStr, "shopPub_key", $("#shopPub_key").val());
    myjsonStr = setJson(myjsonStr, "public_key", $("#public_key").val());
    myjsonStr = setJson(myjsonStr, "mchID", $("#mchID").val());
    myjsonStr = setJson(myjsonStr, "isrepast","1");
    myjsonStr = setJson(myjsonStr, "remarke", "");
    myjsonStr = setJson(myjsonStr,"ShopPublishingSetID","");
    myjsonStr = setJson(myjsonStr,"shopId",shopId);
    myjsonStr = setJson(myjsonStr,"shopIddata","");
//    var url = baseUrl + "html5Callin!tietie.action";
    var jsonPrama = {
        "marked": "payPublicCall_addAndEditZFBLXF",
        "jsonStr": "{}"
    }
    jsonPrama.jsonStr = myjsonStr;
    //jQuery.axjsonp(url, jsonPrama, addsucess);
    findDataForAll( jsonPrama, addsucess);
}
function addsucess(data) {
    alert(data.mess);
    if(data.code=='000'){
        closeMy();
    }

}


//修改页面反添数据查询方法
function updateShop(){
//    var url = baseUrl+"html5Callin!tietie.action";
    var jsonPrama = {
        "marked": "payPublicCall_findOneZFBLXF",
        "jsonStr": "{}"
    }
    //alert(request.QueryString("theshopId"));
    var myjsonStr = setJson(null,"shopId",shopId);
    jsonPrama.jsonStr=myjsonStr;
    //jQuery.axjsonp(url, jsonPrama, callBack_updateShop);
    findDataForAll( jsonPrama, callBack_updateShop);
}

function callBack_updateShop(data){
    if(data.code=="000"){

        $("#shopPri_key").val(data.shopPri_key);
        $("#shopPub_key").val(data.shopPub_key);
        $("#public_key").val(data.public_key);
        $("#mchID").val(data.MchID);
        //$("#remarke").val(data.Description);
        //$("#superPID").val(data.lxfPID);
    }else{
        //alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    return ;
}

function putOutKeys() {
//    var url = baseUrl + "html5Callin!tietie.action";
    var jsonPrama = {
        "marked": "AddZhifubaoPayConfigAction_putOutKeys",
        "jsonStr": "{}"
    }
    var myjsonStr = setJson(null, "branchCompanyID", "");
    jsonPrama.jsonStr = myjsonStr;
    //jQuery.axjsonp(url, jsonPrama, callBack_putOutKeys);
    findDataForAllOld(jsonPrama, callBack_putOutKeys);
}

function callBack_putOutKeys(data) {
    if (data.rspCode == "000") {
        $("#shopPri_key").val(data.PRIVATE_KEY);
        $("#shopPub_key").val(data.PUBLIC_KEY);
    } else {
        alert(data.rspCode + "   " + data.rspDesc);
        return;
    }
    return;
}

//关闭ifram方法
function closeMy(){
    window.parent.closeIfram()
}