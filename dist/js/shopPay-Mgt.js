/**
 * Created by xiaohu on 2016/3/3.
 */
var DLid="";
var branchId="";
var proviceId="";
var cityId="";
var countId="";
var state="";
var buss="null";
var payNum="0";
var busNum="";
var indu="";
var shopStaList=["停用","启用","合同到期","","预注册","待审核","驳回","","","","","","","","","","","","","","","","","",""];
var conId="";//续约用
var sour="0";

var currentPageNum=1;
var IsCreatePage=false;
$(function(){

    //$("#findButton").attr("disabled",true);
    //$("#outButton").attr("disabled",true);
    //var machStr=request.QueryString("btns");
    //if(machStr!=""){
    //    var ss=machStr.split(",");
    //    $.each(ss,function(index,enty){
    //        if(enty=="findButton"){
    //            $("#findButton").attr("disabled",false);
    //        }else if(enty=="outButton"){
    //            $("#outButton").attr("disabled",false);
    //        }
    //    });
    //}
    //a('进入商户查询方法');
    pull_down();//先添加下拉
    //如果分公司人查代理,如果是总公司人查分公司
    selectProvice();//查询省

    $("#findButton").click(function(){
        currentPageNum=1;
        selectData();
    });
    $("#outButton").click(function(){
        outData();
        //$("#outButton").attr("disabled","true")
    });

    //
    //$('#shyjtj').click(function(){
    //    xuyueSubmit();
    //});


});

function outData(){
    var ob=new Object();
    ob.pageSize=pageSize;
    ob.currentPageNum=currentPageNum;
    ob.shopname=$("#shopname").val();
    ob.superShopShortName=$("#superShopShortName").val();
    ob.starttime=pieTime(0,$("#reservation1").val());
    ob.endtime=pieTime(1,$("#reservation1").val());
    ob.branchId=branchId;
    ob.state=state;
    ob.sourse=sour;
    ob.proviceId=proviceId;
    ob.cityId=cityId;
    ob.payNum=payNum;
    ob.bussNum="";
    ob.industry=indu;
    ob.countId=countId;
    ob.buss="";
    ob.bussZt=buss+payNum;
    ob.agentId=DLid;
    var obw=new Object();
    obw.marked="superShop_outSuperShop";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,outDataBack);

}
function outDataBack(data){
    //$("#outButton").attr("disabled","false")
    //alert(data.mess);
   location.href=data.mess;
}
/**
 * 查询数据
 */
function selectData(){
    var ob=new Object();
    ob.pageSize=pageSize;
    ob.currentPageNum=currentPageNum;
    ob.shopname=$("#shopname").val();
    ob.superShopShortName=$("#superShopShortName").val();
    ob.starttime=pieTime(0,$("#reservation1").val());
    ob.endtime=pieTime(1,$("#reservation1").val());
    ob.branchId=branchId;
    ob.state=state;
    ob.sourse=sour;
    ob.proviceId=proviceId;
    ob.cityId=cityId;
    ob.countId=countId;
    ob.payNum="";
    ob.bussNum="";
    ob.bussZt=buss+payNum;
    ob.industry=indu;
    ob.buss="";
    ob.agentId=DLid;
    var obw=new Object();
    obw.marked="superShop_findSuperShopList";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,findDataBack);

}
function  sourse(b){
    sour=b;
}
function findDataBack(data){
//alert(data.code)

    if(data.code=="000"){
        $('#tbody').html("");
        $.each(data.list,function(entryIndex, entry){
           //var strHtml="<tr><td>"+(pageSize*(currentPageNum-1)+(entryIndex+1))+"</td>" +
           //    "<td onclick='chakan(\""+entry.id+"\")'><a href=\"#\">"+entry.name+"</a></td>" +
           //    //"<td>"+entry.name+"</td>" +
           //    "<td>"+entry.shortName+
           //    "</td><td>"+entry.agent+"</td><td>"+entry.industry+"</td><td>"+entry.cdate+"</td><td>"+entry.agentUsers+"</td><td>"+shopStaList[entry.state]+
           //    "</td><td><a onclick='xiugai(\""+entry.id+"\")'>修改</a>&nbsp;<a onclick='xuyue(\""+entry.conId+"\")'>续约</a>&nbsp;<a onclick='zhifu(\""+entry.id+"\",\""+entry.name+"\")'>支付配置</a></td></tr>"
           // $('#tbody').append(strHtml);

            var strHtml="<tr><td>"+(pageSize*(currentPageNum-1)+(entryIndex+1))+"</td>" +
                "<td>"+entry.name+"</td><td>"+entry.shortName+
                "</td><td>"+entry.industry+"</td><td>"+entry.cdate+
                "</td><td><a onclick='zhifu(\""+entry.id+"\",\""+entry.name+"\")'>支付配置</a></td></tr>"
            $('#tbody').append(strHtml);

        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    IsCreatePage=false;
    if(!IsCreatePage)
    {
        IsCreatePage=true;
        $("#pageId").createPage({
            count:data.count,//总条数
            pageCount:Math.ceil(data.count/pageSize),//viewdata.TotalNum
            current:currentPageNum,
            backFn:function(p){
                currentPageNum=p;
                //单击回调方法，p是当前页码
                selectData();
            }
        });
    }
    return;
}
function xiugai(b){
    //$('#nononoshow').show();
    //$("#nononoshow")[0].src= 'html/Businesses-Add.html?shopId='+b;
   location.href="./Businesses-Add.html?editFla=true&shopId="+b+"";
}

function chakan(b){
    //$('#nononoshow').show();
    //$("#nononoshow")[0].src= 'html/Businesses-Add.html?shopId='+b;
    location.href="./Businesses-Check.html?editFla=true&shopId="+b+"";
}
//续约
function xuyue(b){
    if(b==""){
        alert("此商户没有合同!")
        return;
    }
    conId=b;
    ShowShelter();
    $('.shyj-layer').show();
}
//续约提交
function xuyueSubmit(){

    var ob=new Object();
    ob.conId=conId;
    ob.year=Number($("#xysj").val());
    var obw=new Object();
    obw.marked="superShop_AddYear";
    obw.jsonStr=JSON.stringify(ob);
    //a("xy=="+JSON.stringify(obw))
    findDataForAll(obw,xuyueBack);
    HideShelter();
    $('.pop-layer').hide();
}
function xuyueBack(da){
    conId="";
    a(da.mess);

}
function zhifu(b,n){
    location.href="./PayConfig.html?editFla=true&shopId="+b+"&shopName="+encodeURIComponent(n) +"";
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
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_selectProvice);

}
//查询省返回
function callBack_selectProvice(data){
    if(data.code==0){
        $('#provice1').html("");
        $('#provice').empty();
        $('#city1').html("");
        $('#city').empty();
        $('#conText').html("");
        $('#con').empty();
        proviceId="";
        cityId="";
        countId="";
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li><a onclick='proviceClick(\""+entry.id+"\",\""+entry.name+"\")'>"+entry.name+"</a></li>";
            $('#provice').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();

    //如果是总公司人查询所有分公司
    if(userBranchtype=="0"){
        selectBranch();
        branchId="";
    }else{
        $("#branchText").val(userBranchName);
        branchId=userBranchId;
        //如果是分公司人查询代理
        selectAge();
    }
    return;
}
//获取省信息
function proviceClick(a1,b){
    //a(a1+b);
    proviceId=a1;
    selectCity(a1);
}
//查询市
function selectCity(p){
    var ob=new Object();
    ob.level=2;
    ob.parentId=p;
    var obw=new Object();
    obw.marked="findProviceOrCity";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_selectCity);
}
//查询市返回
function callBack_selectCity(data){
    if(data.code==0){
        $('#city1').html("");
        $('#city').empty();
        $('#conText').html("");
        $('#con').empty();
        cityId="";
        countId="";
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
    getXian(a1);
}
function getXian(b){

var ob=new Object();

ob.level=3;
ob.parentId=b;

var jsonPrama = {

    "marked": "findProviceOrCity",

    "jsonStr": JSON.stringify(ob)

};

findDataForAll( jsonPrama, getxian_back);
}


function getxian_back(data){

    if(data.code=="000"){

        $('#conText').html("");
        $('#con').empty();
        countId="";

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
    countId=da;
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
        $('#branch1').html("");
        $('#branch').empty();
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li><a onclick='brahClick(\""+entry.id+"\",\""+entry.name+"\")'>"+entry.name+"</a></li>";
            $('#branch').append(strHtml);
        });
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();
    return;
}
function brahClick(a1,b){
    branchId=a1;
    selectAge();
}

//查询代理
function selectAge(){
    var ob=new Object();
    ob.branchId=branchId;

    var obw=new Object();
    obw.marked="findAllAgentByBranch";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_selectAge);
}
//查询代理返回
function callBack_selectAge(data){
    if(data.code==0){
        $('#agent1').html("");
        $('#agent').empty();
        $.each(data.list,function(entryIndex, entry){
            var strHtml = "<li><a onclick='agentClick(\""+entry.id+"\",\""+entry.name+"\")'>"+entry.name+"</a></li>";
            $('#agent').append(strHtml);
        });
    }else{
        //alert(data.code+"   "+data.mess);
        return;
    }
    pull_down();
    return;
}
//选择代理后查询代理人员
function agentClick(a1,b){
    DLid=a1;
    selectAgeUser(a1);
}

function staClick(b){
    state=b;
}
function busClick(b){
    buss=b;
}
function busnumClick(b){
    busNum=b;
}
function payClick(b){
    payNum=b;
}
function indClick(b){
    indu=b;
}

function downExcel(){
    window.open(urlBase+"/excelDownload/allShop.xls")
}
function jiexi(na){
    var ob=new Object();
    ob.fileName=na;
    var obw=new Object();
    obw.marked="superShop_importAllMess";
    obw.jsonStr=JSON.stringify(ob);
    findDataForAll(obw,callBack_upLoad);
}
function callBack_upLoad(da){
    $("#show").html("");
    alert("导入信息请查看文件!");
    window.open(urlBase+"/outexcel/"+da.mess);

}