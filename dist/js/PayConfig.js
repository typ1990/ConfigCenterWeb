/**
 * Created by xiaohu on 2016/3/4.
 */
var pageCurrent=1;
var tt=false;//是否是从商户进来的
var superShopId="";
var superShopName="";
var shopFlag=false;//是不是从商户列表进来的
var payArr=new Array;
var bussSTR="";
var bussSta="";
var ywList=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
$(function(){

    //alert("窗口宽度"+document.body.clientWidth +"窗口高度"+document.body.clientHeight );
    //$('#nononoshow').height(document.body.clientHeight-100);
    //$('#nononoshow').width(document.body.clientWidth-300);
    //$('#nononoshow').attr("height",document.body.clientHeight);
    //$('#nononoshow').attr("width",document.body.clientWidth);
    superShopId=request.QueryString("shopId");
    superShopName=decodeURIComponent(request.QueryString("shopName"));

    tt=request.QueryString("editFla");
    if(tt){
        shopFlag=true;
        $('#shjsBut').attr("disabled",true);//商户跳进来的不许选择
        //a(superShopId+"**"+decodeURIComponent(superShopName) )
        $("#shopNameText").val(superShopName);
        findOne();
    }else{
        shopFlag=false;
        $('#shjsBut').attr("disabled",false);//菜单跳进来的可以选择
    }

    pull_down();
    //a("进入payconfig");
    //点击弹出商户检索
    $('#shjsBut').click(function(){
        $("#shjs").show();
    });
    //商户检索按键-查询

    $("#jssh").click(function(){

        pageCurrent = 1;

        findShop();

    });
    //提交信息
    $("#submitButton").click(function(){
        if(check()){
            //a("检查必填完成")
            submit();
        }
    });

});//初始化结束
//提交方法
function submit(){
    var ob=new Object();
    ob.shopId=superShopId;
    ob.bussStr=bussSTR;
    ob.bussSta=bussSta;
    var obw=new Object();
    obw.marked="payPublicCall_addAndEditShopPay";
    obw.jsonStr=JSON.stringify(ob);
    //a(JSON.stringify(obw))
    findDataForAll(obw,callBack_submit);
}
function callBack_submit(data){
    alert(data.mess);
    if(data.code=="000"&&!tt){
        qkxz();
        superShopId="";
        $("#shopNameText").val("");
    }
}

//进入查询以前信息
function findOne(){
    var ob=new Object();
    ob.shopId=superShopId;
    var obw=new Object();
    obw.marked="payPublicCall_findShopPay";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_findOne);
}
function callBack_findOne(data){
    qkxz();
    if(data.code=="000"){
        var bus=data.bussStr==""?"":data.bussStr.toString();
        if(bus!=""){
            for(var i=0;i<ywList.length;i++){
                if(bus.indexOf(ywList[i])!=-1){
                    var ywRadio="#qd"+ywList[i];
                    $(ywRadio).prop("checked",true);
                }
            }
        }

        var bua=data.bussSta==""?"":data.bussSta.toString();
        if(bua!=""){
            if(bua.indexOf("wx0")!=-1){
                $("#wxText").html("未申请");
                $("#wxText").attr("data-value","0");
            }else if(bua.indexOf("wx1")!=-1){
                $("#wxText").html("审核中");
                $("#wxText").attr("data-value","1");
            }else if(bua.indexOf("wx2")!=-1){
                $("#wxText").html("通过");
                $("#wxText").attr("data-value","2");
            }else if(bua.indexOf("wx3")!=-1){
                $("#wxText").html("驳回");
                $("#wxText").attr("data-value","3");
            }
            if(bua.indexOf("zfb0")!=-1){
                $("#zfbText").html("未申请");
                $("#zfbText").attr("data-value","0");
            }else if(bua.indexOf("zfb1")!=-1){
                $("#zfbText").html("审核中");
                $("#zfbText").attr("data-value","1");
            }else if(bua.indexOf("zfb2")!=-1){
                $("#zfbText").html("通过");
                $("#zfbText").attr("data-value","2");
            }else if(bua.indexOf("zfb3")!=-1){
                $("#zfbText").html("驳回");
                $("#zfbText").attr("data-value","3");
            }
            if(bua.indexOf("bdqb0")!=-1){
                $("#bdqbText").html("未申请");
                $("#bdqbText").attr("data-value","0");
            }else if(bua.indexOf("bdqb1")!=-1){
                $("#bdqbText").html("审核中");
                $("#bdqbText").attr("data-value","1");
            }else if(bua.indexOf("bdqb2")!=-1){
                $("#bdqbText").html("通过");
                $("#bdqbText").attr("data-value","2");
            }else if(bua.indexOf("bdqb3")!=-1){
                $("#bdqbText").html("驳回");
                $("#bdqbText").attr("data-value","3");
            }
            if(bua.indexOf("jdqb0")!=-1){
                $("#jdqbText").html("未申请");
                $("#jdqbText").attr("data-value","0");
            }else if(bua.indexOf("jdqb1")!=-1){
                $("#jdqbText").html("审核中");
                $("#jdqbText").attr("data-value","1");
            }else if(bua.indexOf("jdqb2")!=-1){
                $("#jdqbText").html("通过");
                $("#jdqbText").attr("data-value","2");
            }else if(bua.indexOf("jdqb3")!=-1){
                $("#jdqbText").html("驳回");
                $("#jdqbText").attr("data-value","3");
            }
            if(bua.indexOf("qq0")!=-1){
                $("#qqText").html("未申请");
                $("#qqText").attr("data-value","0");
            }else if(bua.indexOf("qq1")!=-1){
                $("#qqText").html("审核中");
                $("#qqText").attr("data-value","1");
            }else if(bua.indexOf("qq2")!=-1){
                $("#qqText").html("通过");
                $("#qqText").attr("data-value","2");
            }else if(bua.indexOf("qq3")!=-1){
                $("#qqText").html("驳回");
                $("#qqText").attr("data-value","3");
            }
            if(bua.indexOf("dzsh0")!=-1){
                $("#dzshText").html("未申请");
                $("#dzshText").attr("data-value","0");
            }else if(bua.indexOf("dzsh1")!=-1){
                $("#dzshText").html("审核中");
                $("#dzshText").attr("data-value","1");
            }else if(bua.indexOf("dzsh2")!=-1){
                $("#dzshText").html("通过");
                $("#dzshText").attr("data-value","2");
            }else if(bua.indexOf("dzsh3")!=-1){
                $("#dzshText").html("驳回");
                $("#dzshText").attr("data-value","3");
            }
            if(bua.indexOf("mt0")!=-1){
                $("#mtText").html("未申请");
                $("#mtText").attr("data-value","0");
            }else if(bua.indexOf("mt1")!=-1){
                $("#mtText").html("审核中");
                $("#mtText").attr("data-value","1");
            }else if(bua.indexOf("mt2")!=-1){
                $("#mtText").html("通过");
                $("#mtText").attr("data-value","2");
            }else if(bua.indexOf("mt3")!=-1){
                $("#mtText").html("驳回");
                $("#mtText").attr("data-value","3");
            }
            if(bua.indexOf("yzf0")!=-1){
                $("#yzfText").html("未申请");
                $("#yzfText").attr("data-value","0");
            }else if(bua.indexOf("yzf1")!=-1){
                $("#yzfText").html("审核中");
                $("#yzfText").attr("data-value","1");
            }else if(bua.indexOf("yzf2")!=-1){
                $("#yzfText").html("通过");
                $("#yzfText").attr("data-value","2");
            }else if(bua.indexOf("yzf3")!=-1){
                $("#yzfText").html("驳回");
                $("#yzfText").attr("data-value","3");
            }
            if(bua.indexOf("ydhb0")!=-1){
                $("#ydhbText").html("未申请");
                $("#ydhbText").attr("data-value","0");
            }else if(bua.indexOf("ydhb1")!=-1){
                $("#ydhbText").html("审核中");
                $("#ydhbText").attr("data-value","1");
            }else if(bua.indexOf("ydhb2")!=-1){
                $("#ydhbText").html("通过");
                $("#ydhbText").attr("data-value","2");
            }else if(bua.indexOf("ydhb3")!=-1){
                $("#ydhbText").html("驳回");
                $("#ydhbText").attr("data-value","3");
            }
            if(bua.indexOf("dzdp0")!=-1){
                $("#dzdpText").html("未申请");
                $("#dzdpText").attr("data-value","0");
            }else if(bua.indexOf("dzdp1")!=-1){
                $("#dzdpText").html("审核中");
                $("#dzdpText").attr("data-value","1");
            }else if(bua.indexOf("dzdp2")!=-1){
                $("#dzdpText").html("通过");
                $("#dzdpText").attr("data-value","2");
            }else if(bua.indexOf("dzdp3")!=-1){
                $("#dzdpText").html("驳回");
                $("#dzdpText").attr("data-value","3");
            }
            if(bua.indexOf("mttg0")!=-1){
                $("#mttgText").html("未申请");
                $("#mttgText").attr("data-value","0");
            }else if(bua.indexOf("mttg1")!=-1){
                $("#mttgText").html("审核中");
                $("#mttgText").attr("data-value","1");
            }else if(bua.indexOf("mttg2")!=-1){
                $("#mttgText").html("通过");
                $("#mttgText").attr("data-value","2");
            }else if(bua.indexOf("mttg3")!=-1){
                $("#mttgText").html("驳回");
                $("#mttgText").attr("data-value","3");
            }
        }
    }
}
//查询可用商户
function check(){
    //payArr=new Array;
    bussSTR="";
    bussSta="wx"+$("#wxText").attr("data-value")+"&#&"+"zfb"+$("#zfbText").attr("data-value")+"&#&"+
        "bdqb"+$("#bdqbText").attr("data-value")+"&#&"+"jdqb"+$("#jdqbText").attr("data-value")+"&#&"+
        "qq"+$("#qqText").attr("data-value")+"&#&"+"dzsh"+$("#dzshText").attr("data-value")+"&#&"+
        "mt"+$("#mtText").attr("data-value")+"&#&"+"yzf"+$("#yzfText").attr("data-value")+"&#&"+
        "ydhb"+$("#ydhbText").attr("data-value")+"&#&"+"dzdp"+$("#dzdpText").attr("data-value")+"&#&"+
        "mttg"+$("#mttgText").attr("data-value")+"&#&";
    $.each($(".allinit"),function(index,enty){
        if($(this)[0].checked){
            //payArr.push($(this).data("value"));
            bussSTR+=$(this).data("value")+"&#&";
        }
    });
    //a("选择了什么..."+payArr.toString());
    if(superShopId==""){
        a("请选择商户或重新进入!")
        return false;
    }
    //if(payArr.length==0){
    if(bussSTR==""){
        a("请选择要配置的渠道!")
        return false;
    }
    return true;
}
function findShop(){
    var json=new Object();

    json.branchId=userBranchId;

    json.pageSize=pageSize;

    json.currPage=pageCurrent;

    json.belongShopId="0";

    json.name=$("#shanghuName").val();

    var jsonPrama = {

        "marked" : "payPublicCall_findSuperShop",

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

            rd+="<td >"+enty.bran+"</td>";

            rd+="<td ><a href='#'onclick='xuzesh(\""+enty.id+"\",\""+enty.name+"\")'>选择</a> </td></tr>";

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

            pageCount:Math.ceil(da.count/pagesize),//viewdata.TotalNum

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
function xuzesh(da,db) {

    //alert("选择了什么"+da+"**"+db);

    $("#shjs").hide();

    $("#shopNameText").val(db);
    superShopName=db;
    superShopId = da;
    qkxz();
    findOne();
}
//清空选择
function qkxz(){
    $(".allinit").attr("checked",false);//所有选项清空
    $(".paySta").html("未申请");
    $(".paySta").attr("data-value","0");

}
//所有跳转
function setMess(b,c){
    if(superShopId==""||superShopName==""){
        alert("请先选择商户!");
        return ;
    }
    $("#nononoshow").css("display",'block');

    var url=c+"?superShopId="+superShopId+"&superShopName="+encodeURIComponent(superShopName);
    //a('url=='+url)
    $("#nononoshow").attr("src",url);
    //$("#nononoshow")[0].src=c;//这个方法用了不能传送参数
}

//子窗口调用关闭iframe方法
function closeIfram(){
    //alert("将要写入关闭iframe方法");
    //$("#nononoshow").attr("src","");
    $("#nononoshow").css("display",'none');
}