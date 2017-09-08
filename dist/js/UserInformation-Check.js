/**
 * Created by WuZhenxin on 2016/3/8.
 */
//临时存储，用于开发测试，正式版去掉
// 存储一个带7天期限的 cookie
//$.cookie("branchID", "402890cd4e32fe28014e32fed9990001", {
//    expires : 7
//
//});
//$.cookie("branchType", "1", {
//    expries : 7
//});
//以下均是列表页面的参数
//当前分页号码
var pageCurrent = 1;
//分页条数
var pagesize = 10;
//弹出框是否需要分页
var IsCreatePage=false;
//商户ID
var superShopId="";
//网点ID
var ShopId="";
//省ID
var provinceId = "";
//市ID
var cityId = "";
//县ID
var countyId = "";
//当前状态
var thisState = "";
//POS渠道属性
var auStr="";
//管理员级别
var softPosType="";

$(function(){
    $('#provincebutton').click(function (e) {
        findProvince();
    });
    $('#citybutton').click(function (e) {
        findCity();
    });
    $('#checkButton').click(function(e){
        findShopAssistantByCriteria(pageCurrent);
    });
    $('#closeButton').click(function(e){
        //HideShelter();
        //$('.pop-layer.poy-layer2').hide();
        location.href="./UserInformation-Mgt.html";
    });
    checkByID(request.QueryString("id"));

//商户检索按键-查询
    $("#jssh").click(function(){
        pageCurrent = 1;
        findSuperShop();
    });



    //提交按钮单击事件
    $("#submitButton").click(function(){
        HideShelter();
        $('.pop-layer.poy-layer3').hide();
//        var tishi=check();
//        if(tishi=='0'){
//            //验证通过,可以提交
//            //alert(tishi);
//            add();
//        }else{
//            //无法提交
//            if(tishi!="001"){
//                alert(tishi);
//            }
//        }
////alert("提交中");
        return false;
    });
    //导出按钮触发事件
    $("#outputButton").click(function(e){
        userInformation_findShopAssistantToExcel();
    });
});
//findProvince();

function findProvince(){
    var json=new Object();

    json.level = "1";
    json.parentID = "0";

    var jsonPrama = {

        "marked" : "userInformation_getProvinceAndCity",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callback_findProvince);

}

function callback_findProvince(data){
    //alert("3333");
    if(data.rspCode=="000"){
        $('#selectProvinceName').text("");
        $('#selectCityName').text("");
        $("#city").text("--");
        //$('#selectProvinceName').html("<li><a href=\"#\">全部</a></li>");
        $.each(data.list,function(entryIndex, entry){
            var str="<li ><a  href=\"#\">" +entry.name + "</a></li>";
            var str =   "<li data-value='"+entry.id+"'><a href='#' onclick='selectProvince("+entry.id+")'>"+entry.name+"</a></li>";
            //var str =   "<li data-value='"+entry.id+"'onclick='selectProvince("+entry.id+")'>"+entry.name+"</li>";
            $('#selectProvinceName').append(str);
        });

    }else{
        alert(data.rspCode + "   " + data.rspDesc);
    }
    pull_down_menu('#selectProvinceName li','#province');
    pull_down_menu('#selectState li','#shopAssistantState');
    //findSuperShopByBranchID();
}

function selectProvince(id){
    provinceId = id;
}

function findCity(){
//alert("33");
    var json=new Object();


    if($('#province').attr("data-value")=="--"){
        return;
    }
    json.level = "2";
    json.parentID = $('#province').attr("data-value");

    var jsonPrama = {

        "marked" : "userInformation_getProvinceAndCity",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callback_findCity);

}

function callback_findCity(data){
    if(data.rspCode=="000"){
        $('#selectCityName').text("");
        $('#selectCountyName').text("");
        $.each(data.list,function(entryIndex, entry){
            var str="<li ><a  href=\"#\">" +entry.name + "</a></li>";
            var str = "<li data-value='"+entry.id+"'><a href='#' onclick='selectCity("+entry.id+")'>"+entry.name+"</a></li>";
            $('#selectCityName').append(str);
        });
    }else{
        alert(data.rspCode + "   " + data.rspDesc);
    }
    pull_down_menu('#selectCityName li','#city');
}

function selectCity(id){
    //alert("555");
    cityId = id;
}

function changeState(state){
    //alert(state);
    //以下是修改状态时需要添加的修改说明
    //首先判断修改的选项是否与之前相同，如果相同就不修改
    //alert("opinion:"+$('#shopAssistantState').text());
    thisState = state;
    //新增页面暂时不用填写修改说明
    //ShowShelter();
    //$('.pop-layer1').show();
}

function findShopAssistantByCriteria(p){

        var json=new Object();

        json.pageSize=pagesize.toString();

        json.curragePage= p.toString();

        json.shopAssistantNum = $("#shopAssistantNum").val();

        json.shopAssistantName = $('#shopAssistantName').val();

        json.phoneNum = $('#phoneNum').val();

        json.address = $('#address').val();

        json.dateStr = $("#dateStr").val();

        json.provinceId = provinceId.toString();//省ID

        json.cityId = cityId.toString();//市ID

        json.state = thisState.toString();//当前状态

        var jsonPrama = {

            "marked" : "userInformation_findShopAssistantByCriteria",

            "callbackparam" : "success_jsonpCallback",

            "jsonStr":JSON.stringify(json)

        };

        //alert('json=='+JSON.stringify(json));

        findData1(jsonPrama,callBack_findShopAssistantByCriteria);

    //}
}

//查询商户

function callBack_findShopAssistantByCriteria(da){

    //alert('成功方法'+da.rspCode );
    $("#table tbody").empty();

    if(da.rspCode=="000"){
        //$("#table tbody").append(' <tr> <td><input type="checkbox">&nbsp;175</td> <td>张学友</td> <td>13800138000</td> <td>自定义</td> <td>总部</td> <td>总部</td> <td>总部</td> <td><span class="label label-danger">停用</span></td> <td> <label class="label label-info ">修改&nbsp;<i class="fa fa-edit"></i></label> <label class="label label-info   ">查看&nbsp;<i class="fa  fa-building-o"></i></label> <label class="label label-info ">支付配置&nbsp;<i class="fa  fa-cc-visa"></i></label> </td> </tr>');
        $.each(da.list,function(index,enty){

            //alert("gl"+enty.id);

            var rd="<tr><td >"+enty.Sequence+"</td>";

            rd+="<td >"+enty.shopAssistantNum+"</td>";

            rd+="<td onclick='checkByID(\""+enty.userId+"\")'><a href=\"#\">"+enty.shopAssistantName+"</a></td>";

            rd+="<td >"+enty.shopAssistantRole+"</td>";

            rd+="<td >"+enty.shopAssistantPhone+"</td>";

            rd+="<td >"+enty.provinceName+"</td>";

            rd+="<td >"+enty.cityName+"</td>";

            rd+="<td >"+enty.shopAssistantAddress+"</td>";

            rd+="<td >"+enty.state+"</td>";

            //rd+="<td >"+enty.userId+"</td>";

            rd+="<td><label class='label label-info ' onclick='editByID(\""+enty.userId+"\")'>修改&nbsp;<i class='fa fa-edit' onclick='editByID(\""+enty.userId+"\")'></i></label> </td></tr>";

            $("#table tbody").append(rd);
            //alert(enty.id+";"+enty.buss+";"+enty.name);

        });

        //haha();

    }else{

        alert(da.rspDesc);

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

                //findSuperShop()
                findShopAssistantByCriteria(p);
            }

        });

    }

    return;

}

function userInformation_findShopAssistantToExcel(p){

    var json=new Object();

    json.shopAssistantNum = $("#shopAssistantNum").val();

    json.shopAssistantName = $('#shopAssistantName').val();

    json.phoneNum = $('#phoneNum').val();

    json.address = $('#address').val();

    json.dateStr = $("#dateStr").val();

    json.provinceId = provinceId.toString();//省ID

    json.cityId = cityId.toString();//市ID

    json.state = thisState.toString();//当前状态

    var jsonPrama = {

        "marked" : "userInformation_findShopAssistantToExcel",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callBack_findShopAssistantToExcel);

    //}
}

function callBack_findShopAssistantToExcel(data){
    if(data.code==000){
        //location.href ="agentManagement.html";
        window.open(data.url) ;
    }else{
        alert(data.code+"   "+data.mess);
        return;
    }
    return;
}



//进入查看页面
function checkByID(id){
    //alert("userId:"+id);
    //location.href="./UserInformation-Check.html?id="+id+"";

    //ShowShelter();
    //$('.pop-layer.poy-layer2').show();
    var json=new Object();

    json.userId=id;

    var jsonPrama = {

        "marked" : "userInformation_getShopAssistantById",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callBack_getShopAssistantById);
}

//查看页面回调函数
function callBack_getShopAssistantById(da){

    //alert('成功方法'+da.shopAssistantNum);
    if(da.rspCode=="000"){
        $("#shopAssistantNumcheck").val(da.shopAssistantNum);
        $("#shopAssistantNamecheck").val(da.shopAssistantName);
        $("#provincecheck").html(da.provinceName);
        $("#citycheck").html(da.cityName);
        $("#countycheck").html(da.countyName);
        var state = da.state;
        if("0"==state){
            state = "停用";
        }else if("1"==state){
            state = "启用";
        }else if("2"==state){
            state = "合同到期";
        }
        $("#shopAssistantStatecheck").html(state);
        $("#addresscheck").val(da.address);
        $("#phoneNumcheck").val(da.phoneNum);
        $("#terminalNumcheck").val(da.terNum);
        //$("#posShopNamecheck").val(da.posShopName);
        $("#changeTextcheck tbody").empty();
         $.each(da.list,function(index,enty){

            //alert("gl"+enty.shopAssistantViewID);

            var rd="<tr><td >"+(index+1)+"</td>";

            rd+="<td>"+enty.createDate+"</td>";

             rd+="<td >"+enty.view+"</td>";

            rd+="<td >"+enty.adminId+"</td>";

            rd+="<td >"+enty.adminName+"</td></tr>";

            $("#changeTextcheck tbody").append(rd);
        });
        //管理员权限初始化清零
        $('input[type="checkbox"]').prop("checked",false);
        $("#shjsButtoncheck").html(da.superShopName);
        $("#wdnamecheck").html(da.shopName);
        var softPosType = da.softPosType;
        if("contraAdmin"==softPosType){
            softPosType = "商铺管理员";
            $("#superShopManagercheck").prop("checked",true);
            $('#shopcheck').attr('disabled',true);
            $('#wdnamecheck').text("");
        }else if("shopAdmin"==softPosType){
            softPosType = "网点管理员";
            $("#childShopManagercheck").prop("checked",true);
        }else if("shopBusiness"==softPosType){
            softPosType = "网点业务员";
            $("#childShopEmployeecheck").prop("checked",true);
        }

        var auStr = da.auStr;
        $.each($('input.zhifu[type="checkbox"]'),function(){

                var indexs=$(this).data("index");
                //alert("顺序号"+indexs);
               var flag =auStr.substr(indexs,1);
               //alert('22:'+flag);
                if(flag==0){
                    $(this).prop("checked",false);
                }else{
                    $(this).prop("checked",true);
                }
        });
        $.each($('input.chengdui[type="checkbox"]'),function(){

            var indexs=$(this).data("index");
            //alert("顺序号"+indexs);
            var flag =auStr.substr(indexs,1);
            //alert('22:'+flag);
            if(flag==0){
                $(this).prop("checked",false);
            }else{
                $(this).prop("checked",true);
            }
        });
        $.each($('input.yinhangka[type="checkbox"]'),function(){

            var indexs=$(this).data("index");
            //alert("顺序号"+indexs);
            var flag =auStr.substr(indexs,1);
            //alert('22:'+flag);
            if(flag==0){
                $(this).prop("checked",false);
            }else{
                $(this).prop("checked",true);
            }
        });
        //haha();

    }else{

        alert(da.rspDesc);

    }

    //IsCreatePage=false;
    //
    //if(!IsCreatePage)
    //
    //{
    //
    //    IsCreatePage=true;
    //
    //    $("#pageId").createPage({
    //
    //        count:da.count,//总条数
    //
    //        pageCount:Math.ceil(da.count/pagesize),//viewdata.TotalNum
    //
    //        current:pageCurrent,
    //
    //        backFn:function(p){
    //
    //            pageCurrent=p;
    //
    //            //单击回调方法，p是当前页码
    //
    //            //findSuperShop()
    //            findShopAssistantByCriteria(p);
    //        }
    //
    //    });
    //
    //}

    return;

}

//进入修改页面
function editByID(id){
    //alert("userId:"+id);
    ShowShelter();
    $('.pop-layer.poy-layer3').show();
    var json=new Object();

    json.userId=id;

    var jsonPrama = {

        "marked" : "userInformation_getShopAssistantById",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callBack_getShopAssistantByIdEdit);

}
//修改页面回调函数
//查看页面回调函数
function callBack_getShopAssistantByIdEdit(da){

    //alert('成功方法'+da);

    if(da.rspCode=="000"){
        $("#shopAssistantNumedit").val(da.shopAssistantNum);
        $("#shopAssistantNameedit").val(da.shopAssistantName);
        $("#provinceedit").html(da.provinceName);
        $("#cityedit").html(da.cityName);
        $("#countyedit").html(da.countyName);
        var state = da.state;
        if("0"==state){
            state = "停用";
        }else if("1"==state){
            state = "启用";
        }else if("2"==state){
            state = "合同到期";
        }
        $("#shopAssistantStateedit").html(state);
        $("#addressedit").val(da.address);
        $("#phoneNumedit").val(da.phoneNum);
        $("#terminalNumedit").val(da.terNum);
        //$("#posShopNameedit").val(da.posShopName);
        $("#changeTextedit tbody").empty();
        $.each(da.list,function(index,enty){

            //alert("gl"+enty.shopAssistantViewID);

            var rd="<tr><td >"+(index+1)+"</td>";

            rd+="<td>"+enty.createDate+"</td>";

            rd+="<td >"+enty.view+"</td>";

            rd+="<td >"+enty.adminId+"</td>";

            rd+="<td >"+enty.adminName+"</td></tr>";

            $("#changeTextedit tbody").append(rd);
        });
        //管理员权限初始化清零
        $('input[type="checkbox"]').prop("checked",false);
        $("#shjsButtonedit").html(da.superShopName);
        $("#wdnameedit").html(da.shopName);
        var softPosType = da.softPosType;
        if("contraAdmin"==softPosType){
            softPosType = "商铺管理员";
            $("#superShopManageredit").prop("checked",true);
            $('#shopedit').attr('disabled',true);
            $('#wdnameedit').text("");
            softPosTypeEdit="2";
            ShopIdEdit="";


        }else if("shopAdmin"==softPosType){
            softPosType = "网点管理员";
            $("#childShopManageredit").prop("checked",true);
            $('#shopedit').attr('disabled',false);
            softPosTypeEdit="0";
        }else if("shopBusiness"==softPosType){
            softPosType = "网点业务员";
            $("#childShopEmployeeedit").prop("checked",true);
            $('#shopedit').attr('disabled',false);
            softPosTypeEdit="1";

        }
        var auStr = da.auStr;
        $.each($('input.zhifu[type="checkbox"]'),function(){

            var indexs=$(this).data("index");
            //alert("顺序号"+indexs);
            var flag =auStr.substr(indexs,1);
            //alert('22:'+flag);
            if(flag==0){
                $(this).prop("checked",false);
            }else{
                $(this).prop("checked",true);
            }
        });
        $.each($('input.chengdui[type="checkbox"]'),function(){

            var indexs=$(this).data("index");
            //alert("顺序号"+indexs);
            var flag =auStr.substr(indexs,1);
            //alert('22:'+flag);
            if(flag==0){
                $(this).prop("checked",false);
            }else{
                $(this).prop("checked",true);
            }
        });
        //haha();
        //查找省份
        findProvince();
    }else{

        alert(da.rspDesc);

    }

    return;

}

//查询手机号码唯一性

function findProvinceEdit(){
//alert("33");
    var json=new Object();

    json.level = "1";
    json.parentID = "0";

    var jsonPrama = {

        "marked" : "userInformation_getProvinceAndCity",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callback_findProvinceEdit);

}

function callback_findProvinceEdit(data){

    if(data.rspCode=="000"){
        $('#selectProvinceNameedit').text("");
        $('#selectCityNameedit').text("");
        $("#cityedit").text("--");
        $('#selectCountyNameedit').text("");
        $("#countyedit").text("--");
        //$('#selectProvinceName').html("<li><a href=\"#\">全部</a></li>");
        $.each(data.list,function(entryIndex, entry){
            var str="<li ><a  href=\"#\">" +entry.name + "</a></li>";
            var str =   "<li data-value='"+entry.id+"'><a href='#' onclick='selectProvinceEdit("+entry.id+")'>"+entry.name+"</a></li>";
            //var str =   "<li data-value='"+entry.id+"'onclick='selectProvince("+entry.id+")'>"+entry.name+"</li>";
            $('#selectProvinceNameedit').append(str);
        });

    }else{
        alert(data.rspCode + "   " + data.rspDesc);
    }
    pull_down_menu('#selectProvinceNameedit li','#provinceedit');
    pull_down_menu('#selectStateedit li','#shopAssistantStateedit');
    //findSuperShopByBranchID();
}

function selectProvinceEdit(id){
    provinceIdEdit = id;
}

function findCityEdit(){
//alert("33");
    var json=new Object();


    if($('#provinceedit').attr("data-value")=="--"){
        return;
    }
    json.level = "2";
    json.parentID = $('#provinceedit').attr("data-value");

    var jsonPrama = {

        "marked" : "userInformation_getProvinceAndCity",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callback_findCityEdit);

}

function callback_findCityEdit(data){
    if(data.rspCode=="000"){
        $('#selectCityNameedit').text("");
        $('#selectCountyNameedit').text("");
        $("#countyedit").text("--");
        $.each(data.list,function(entryIndex, entry){
            var str="<li ><a  href=\"#\">" +entry.name + "</a></li>";
            var str = "<li data-value='"+entry.id+"'><a href='#' onclick='selectCityEdit("+entry.id+")'>"+entry.name+"</a></li>";
            $('#selectCityNameedit').append(str);
        });
    }else{
        alert(data.rspCode + "   " + data.rspDesc);
    }
    pull_down_menu('#selectCityNameedit li','#cityedit');
}

function selectCityEdit(id){
    //alert("555");
    cityIdEdit = id;
}

function findCountyEdit(){
//alert("33");
    var json=new Object();


    if($('#cityedit').attr("data-value")=="--"){
        return;
    }
    json.level = "3";
    json.parentID = $('#cityedit').attr("data-value");

    var jsonPrama = {

        "marked" : "userInformation_getProvinceAndCity",

        "callbackparam" : "success_jsonpCallback",

        "jsonStr":JSON.stringify(json)

    };

    //alert('json=='+JSON.stringify(json));

    findData1(jsonPrama,callback_findCountyEdit);

}

function callback_findCountyEdit(data){

    if(data.rspCode=="000"){
        $('#selectCountyNameedit').text("");

        $.each(data.list,function(entryIndex, entry){
            var str="<li ><a  href=\"#\">" +entry.name + "</a></li>";
            var str = "<li data-value='"+entry.id+"'><a href='#' onclick='selectCountyEdit("+entry.id+")'>"+entry.name+"</a></li>";
            $('#selectCountyNameedit').append(str);
        });
    }else{
        alert(data.rspCode + "   " + data.rspDesc);
    }
    pull_down_menu('#selectCountyNameedit li','#countyedit');
}

function selectCountyEdit(id){
    //alert("555");
    countyIdEdit = id;
}


//店员级别只允许选择其中一项
function onlySelectOne(str){
    if(str=="superShopManager"){
        $('#childShopManageredit').prop('checked',false);
        $('#childShopEmployeeedit').prop('checked',false);
        //商户管理员不允许选择网点
        $('#shopedit').attr('disabled',true);
        $('#wdnameedit').text("");
        ShopIdEdit="";
        softPosTypeEdit="2";
    }else if(str=="childShopManager"){
        $('#superShopManageredit').prop('checked',false);
        $('#childShopEmployeeedit').prop('checked',false);
        $('#shopedit').attr('disabled',false);
        softPosTypeEdit="0";
    }else if(str=="childShopEmployee"){
        $('#superShopManageredit').prop('checked',false);
        $('#childShopManageredit').prop('checked',false);
        $('#shopedit').attr('disabled',false);
        softPosTypeEdit="1";
    }
}








function findData1(Str,callBack_Login){

    $.ajax({
        // 提交数据的类型 POST GET
        type : "POST",
        // async:false,
        // 提交的网址
        url : url,
        // 提交的数据
        //data : JSON.stringify(json),
        data:Str,
        // 返回数据的格式
        dataType : "jsonp",// "xml", "html", "script", "json", "jsonp", "text".
        jsonp : "callbackparam",// 传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",// 自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名

        // 在请求之前调用的函数
        beforeSend : function() { /* $("#btn_loading").css('display',''); */
        },

        // 成功返回之后调用的函数
        success : function(data) {
            // alert("AJAX请求错误：请求状态码：");
            callBack_Login(data);
        },

        // 调用执行后调用的函数
        complete : function(XMLHttpRequest, textStatus) {
            // $("#btn_loading").css('display','none');
        },

        // 调用出错执行的函数
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            alert("AJAX请求错误：请求状态码：" + XMLHttpRequest.status + " readyState:"
                + XMLHttpRequest.readyState + "错误：" + textStatus);}

    });


}

