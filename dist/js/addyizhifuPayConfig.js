var shopId="";
var shopName="";
$(function () {
    shopId=request.QueryString("superShopId");
    shopName=decodeURIComponent(request.QueryString("superShopName"));
    $("#shopName").val(shopName);
        updateShop();

    $('#addbaiduPayConfig').click(function (e) {
        addjingdongPayConfig();
    });
});


function addjingdongPayConfig() {

    if($("#securekey").val()==""){
        alert("securekey不能为空");
        return;
    }
    if($("#mchID").val()==""){
        alert("商户id不能为空");
        return;
    }
    if($("#interfpw").val()==""){
        alert("接口密码不能为空");
        return;
    }
    var myjsonStr = setJson(null, "contract_businessID", "");
    myjsonStr = setJson(myjsonStr,"closed","1");
    myjsonStr = setJson(myjsonStr,"busCode","16");
    myjsonStr = setJson(myjsonStr, "securekey", $("#securekey").val());
    myjsonStr = setJson(myjsonStr, "mchID", $("#mchID").val());
    myjsonStr = setJson(myjsonStr, "interfacePassword", $("#interfpw").val());
    myjsonStr = setJson(myjsonStr, "accountNo", $("#accountNo").val());
    myjsonStr = setJson(myjsonStr, "cashierChannelNo", $("#cashierChannelNo").val());
    myjsonStr = setJson(myjsonStr, "securekeyB", $("#securekeyB").val());
    myjsonStr = setJson(myjsonStr, "remarke", $("#remarke").val());
    myjsonStr = setJson(myjsonStr,"ShopPublishingSetID","");
    myjsonStr = setJson(myjsonStr,"shopId",shopId);
    var jsonPrama = {
        "marked": "payPublicCall_addAndEditYZF",
        "jsonStr": "{}"
    }
    jsonPrama.jsonStr = myjsonStr;
    findDataForAll(jsonPrama, addsucess);
    //jQuery.axjsonp(url, jsonPrama, addsucess);
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
        "marked": "payPublicCall_findOneYZF",
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

        $("#securekey").val(data.securekey);
        $("#mchID").val(data.mchID);
        $("#interfpw").val(data.interfacePassword);
        $("#accountNo").val(data.accountNo);
        $("#cashierChannelNo").val(data.cashierChannelNo);
        $("#securekeyB").val(data.securekeyB);
        $("#remarke").val(data.description);

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