var shopId="";
var shopName="";
$(function () {
    shopId=request.QueryString("superShopId");
    shopName=decodeURIComponent(request.QueryString("superShopName"));
    $("#shopName").val(shopName);
        updateShop();//查询

    $('#addbaiduPayConfig').click(function (e) {
        addjingdongPayConfig();
    });
});
//关闭ifram方法
function closeMy(){
    window.parent.closeIfram()
}


function addjingdongPayConfig() {

    //if($("#appSecret").val()==""){
    //    alert("密钥不能为空");
    //    return;
    //}
    if($("#mchID").val()==""){
        alert("商户号不能为空");
        return;
    }

    var myjsonStr = setJson(null, "contract_businessID", "");
    myjsonStr = setJson(myjsonStr,"closed","1");
    myjsonStr = setJson(myjsonStr,"busCode","131");
    myjsonStr = setJson(myjsonStr, "appSecret", $("#appSecret").val());
    myjsonStr = setJson(myjsonStr, "mchID", $("#mchID").val());
    myjsonStr = setJson(myjsonStr, "remarke", $("#remarke").val());
    myjsonStr = setJson(myjsonStr, "appk", $("#appk").val());
    myjsonStr = setJson(myjsonStr, "appkb", $("#appkb").val());
    myjsonStr = setJson(myjsonStr, "securtykeyZ", $("#securtykeyZ").val());
    myjsonStr = setJson(myjsonStr, "securtykeyB", $("#securtykeyB").val());
    myjsonStr = setJson(myjsonStr,"ShopPublishingSetID","");
    myjsonStr = setJson(myjsonStr,"shopId",shopId);
    myjsonStr = setJson(myjsonStr,"shopIddata","");
    var jsonPrama = {
        "marked": "payPublicCall_addAndEditJDLXF",
        "jsonStr": "{}"
    }
    jsonPrama.jsonStr = myjsonStr;
    findDataForAll(jsonPrama, addsucess);
    //jQuery.axjsonp(url, jsonPrama, addsucess);
}
function addsucess(data) {
    alert(data.mess);
    if (data.code == "000") {
       closeMy();
    }
}


//修改页面反添数据查询方法
function updateShop(){
//    var url = baseUrl+"html5Callin!tietie.action";
    var jsonPrama = {
        "marked": "payPublicCall_findOneJDLXF",
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

        $("#appSecret").val(data.PrivateKey);
        $("#mchID").val(data.MchID);
        $("#appk").val(data.appk);
        $("#appkb").val(data.appkb);
        $("#securtykeyZ").val(data.securtykeyZ);
        $("#securtykeyB").val(data.securtykeyB);
        $("#remarke").val(data.Description);

    }else{
        //alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
    return ;
}