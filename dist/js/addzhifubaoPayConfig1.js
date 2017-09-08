//支付宝众联
var shopId="";
var shopName="";
var sq="0";
var sqlist=["未授权","已授权"];
$(function () {

    shopId=request.QueryString("superShopId");
    shopName=decodeURIComponent(request.QueryString("superShopName"));
    $("#shopName").val(shopName);
    pull_down();
   updateShop();

    $('#addbaiduPayConfig').click(function (e) {
        addzhifubaoPayConfig();
    });


});
function sqClick(a1,b){
    //是否授权按钮
    sq=a1;
}
function addzhifubaoPayConfig() {
    //alert(document.getElementByIdx_x_x("shopname").getAttribute("data-type1"));
    //alert($("#shopname").attr("data-value"));
    //alert("添加成功"+$("#shopname").data('type'))
    //if($("#shopname").attr("data-value")==null){
    //    alert("操作失败，请选择商户名称");
    //    return;
    //}
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
    if($("#public_key").val()==""){
        alert("支付宝为众联分配的公钥(public_key) 不能为空");
        return;
    }
    if($("#mchID").val()==""){
        alert("众联享付商户号（mchID）不能为空");
        return;
    }
    if($("#shopPID").val()==""){
        alert("商户PID（shopPID）不能为空");
        return;
    }
    if($("#myPID").val()==""){
        alert("众联享付PID不能为空");
        return;
    }
    if($("#shopPub_key").val()==""){
        alert("众联享付公钥(shopPub_key) 不能为空");
        return;
    }
    if($("#shopPri_key").val()==""){
        alert("众联享付私钥(shopPri_key) 不能为空");
        return;
    }
    //if($("#token").val()==""){
    //    alert("商户token不能为空");
    //    return;
    //}


    var myjsonStr = setJson(null, "contract_businessID","");
    myjsonStr = setJson(myjsonStr,"closed","1");
    myjsonStr = setJson(myjsonStr,"busCode","142");
    myjsonStr = setJson(myjsonStr, "isWFT", "0");
    myjsonStr = setJson(myjsonStr, "WFTShopid", "");
    myjsonStr = setJson(myjsonStr, "WFTPassWord", "");
    myjsonStr = setJson(myjsonStr, "shopPID", $("#shopPID").val());
    myjsonStr = setJson(myjsonStr, "myPID", $("#myPID").val());

     myjsonStr = setJson(myjsonStr, "public_key", $("#public_key").val());
    myjsonStr = setJson(myjsonStr, "mchID", $("#mchID").val());
    myjsonStr = setJson(myjsonStr, "shopPub_key", $("#shopPub_key").val());
    myjsonStr = setJson(myjsonStr, "shopPri_key", $("#shopPri_key").val());
    myjsonStr = setJson(myjsonStr, "state", sq);
    myjsonStr = setJson(myjsonStr, "token", $("#token").val());
    myjsonStr = setJson(myjsonStr,"ShopPublishingSetID","");
    myjsonStr = setJson(myjsonStr,"shopId",shopId);
    myjsonStr = setJson(myjsonStr,"shopIddata","");
//    var url = baseUrl + "html5Callin!tietie.action";
    var jsonPrama = {
        "marked": "payPublicCall_addAndEditZFBZL",
        "jsonStr": "{}"
    }
    jsonPrama.jsonStr = myjsonStr;
    //jQuery.axjsonp(url, jsonPrama, addsucess);
    findDataForAll(jsonPrama, addsucess);
}
function addsucess(data) {
    alert(data.mess);
    if(data.code=="000"){
        closeMy();
    }

}


//修改页面反添数据查询方法
function updateShop(){
//    var url = baseUrl+"html5Callin!tietie.action";
    var jsonPrama = {
        "marked": "payPublicCall_findOneZFBZL",
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
        sq=data.state;
       $("#public_key").val(data.public_key);
        $("#mchID").val(data.mchID);
        $("#shopPub_key").val(data.shopPub_key);
        $("#sqText").val(sqlist[data.state]);
        $("#shopPri_key").val(data.shopPri_key);
        $("#shopPID").val(data.shopPID);
        $("#myPID").val(data.myPID);
        $("#token").val(data.token);
    }else{
        //alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    return ;
}

//关闭ifram方法
function closeMy(){
    window.parent.closeIfram()
}