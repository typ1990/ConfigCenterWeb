var shopId="";
var shopName="";
$(function () {
    shopId=request.QueryString("superShopId");
    shopName=decodeURIComponent(request.QueryString("superShopName"));
    $("#shopName").val(shopName);

    updateShop();//查询数据

    $('#addbaiduPayConfig').click(function (e) {
        addbaiduPayConfig();
    });
});

//修改页面反添数据查询方法
function updateShop(){
//    var url = baseUrl+"html5Callin!tietie.action";
    var jsonPrama = {
        "marked": "payPublicCall_findOneBD",
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


        $("#appSecret").val(data.PrivateKey);
        $("#mchID").val(data.MchID);
        $("#remarke").val(data.Description);

    }else{
        //alert(data.rspCode+"   "+data.rspDesc);
        return;
    }
 return ;
}


function addbaiduPayConfig() {

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
    myjsonStr = setJson(myjsonStr,"busCode","12");
    myjsonStr = setJson(myjsonStr, "appSecret", $("#appSecret").val());
    myjsonStr = setJson(myjsonStr, "mchID", $("#mchID").val());
    myjsonStr = setJson(myjsonStr, "remarke", $("#remarke").val());
    myjsonStr = setJson(myjsonStr,"ShopPublishingSetID","");
    myjsonStr = setJson(myjsonStr,"shopId",shopId);
    myjsonStr = setJson(myjsonStr,"shopIddata","");

    var jsonPrama = {
        "marked": "payPublicCall_addAndEditBD",
        "jsonStr": "{}"
    }
    jsonPrama.jsonStr = myjsonStr;

    jQuery.axjsonp(url, jsonPrama, addsucess);
}
function addsucess(data) {
    alert(data.mess);
    if (data.code == "000") {
      closeMy();
    }
}
//关闭ifram方法
function closeMy(){
    window.parent.closeIfram()
}