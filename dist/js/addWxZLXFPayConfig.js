var shopId="";
var shopName="";
var machId="";
$(function () {
    //alert("loc=="+location.href)
    shopId=request.QueryString("superShopId");
    shopName=decodeURIComponent(request.QueryString("superShopName"));
    $("#shopName").val(shopName);
    //alert("shopId=="+shopId+"shopName=="+shopName);
    findOneWX();
    //mchID离开时查询后台
    $("#addbaiduPayConfig").click(function(){
        machId=$("#mchID").val();
        if(machId!=""){
            findMchId(machId);
        }else{
            a("微信子商户ID不能为空!")
        }
    });
});
//查询是否被占用
function findMchId(a){
    var ob=new Object();
    ob.mchId=a;
    var obw=new Object();
    obw.marked="payPublicCall_checkWXZLXF";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_findMchId);

}
//查询machId返回
function callBack_findMchId(data) {
    if (data.code != '000') {
     var deloal= window.confirm(data.mess);
        if(deloal){
            //alert("点确定了");
            gogo();
        }else{
            //alert("点取消了");
        }
    }else{
        gogo();
    }
}
//打算继续执行
function gogo(){
    var ob=new Object();
    ob.shopId=shopId;
    ob.machId=machId;
    ob.busCode="112";
    var obw=new Object();
    obw.marked="payPublicCall_addAndEditWXZLXF";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_addMchId);
}
function callBack_addMchId(data){
    alert(data.mess);
    if(data.code=="000"){
        closeMy();
    }
}
//关闭ifram方法
function closeMy(){
    window.parent.closeIfram()
}
//进入时查询是否配置过信息
function findOneWX(){
    var ob=new Object();
    ob.shopId=shopId;
    //ob.machId=machId;
    var obw=new Object();
    obw.marked="payPublicCall_findOneWXZLXF";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_findOneWX);
}
function callBack_findOneWX(data){
    if(data.code=="000"){
        $("#mchID").val(data.machId);
    }
}