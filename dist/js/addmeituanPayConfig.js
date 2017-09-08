var shopId="";
var shopName="";
$(function () {
    shopId=request.QueryString("superShopId");
    shopName=decodeURIComponent(request.QueryString("superShopName"));
    $("#shopName").val(shopName);
    updateShop();

    $('#addbaiduPayConfig').click(function (e) {
        addmeituanPayConfig();
    });
});

function addmeituanPayConfig() {

    if($("#appSecret").val()==""){
        alert("密钥不能为空");
        return;
    }
    if($("#mchID").val()==""){
        alert("商户号不能为空");
        return;
    }

    var myjsonStr = setJson(null, "contract_businessID", "");
    myjsonStr = setJson(myjsonStr,"closed","1");
    myjsonStr = setJson(myjsonStr,"busCode","31");
    myjsonStr = setJson(myjsonStr, "appSecret", $("#appSecret").val());
    myjsonStr = setJson(myjsonStr, "mchID", $("#mchID").val());
    myjsonStr = setJson(myjsonStr, "remarke", $("#remarke").val());
    myjsonStr = setJson(myjsonStr,"ShopPublishingSetID","");
    myjsonStr = setJson(myjsonStr,"shopId",shopId);
    var jsonPrama = {
        "marked": "payPublicCall_addAndEditMT",
        "jsonStr": "{}"
    }
    jsonPrama.jsonStr = myjsonStr;
    findDataForAll( jsonPrama, addsucess);
    //jQuery.axjsonp(url, jsonPrama, addsucess);
}
function addsucess(data) {
    alert(data.mess)
    if(data.code=="000"){
        closeMy();
    }

}


//修改页面反添数据查询方法
function updateShop(){
//    var url = baseUrl+"html5Callin!tietie.action";
    var jsonPrama = {
        "marked": "payPublicCall_findOneMT",
        "jsonStr": "{}"
    }
    //alert(request.QueryString("theshopId"));
    var myjsonStr = setJson(null,"shopId",shopId);
    jsonPrama.jsonStr=myjsonStr;
    findDataForAll(jsonPrama, callBack_updateShop);
    //jQuery.axjsonp(url, jsonPrama, callBack_updateShop);
}

function callBack_updateShop(data){
    if(data.code=="000"){

        $("#appSecret").val(data.appSecret);
        $("#mchID").val(data.mchID);
        $("#remarke").val(data.Description);

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