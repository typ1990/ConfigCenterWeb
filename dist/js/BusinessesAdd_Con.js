﻿var conArr=["01","02","11","12","13","14","15","16","17","21","22","23","24","25","26","27","28","29","81","82",
    "83","84","85","86","87","31","32","41","51","52","61","71"];//合同业务编号用于选择框反选
var conNum="";
var startTime="";
var endTime="";
var conBuss="";
var conSta="1";
var tpht="";
$(function(){
    //a("000")
    $("#xz").hide();
if(!editFlag){
    $(".checkbox input").prop("checked", true);  ;//添加时全部选择
}else{
    $(".checkbox input").prop("checked", false);
}
    //上传控制
    var upurl=imgUrl+'?redirect='+window.location.href.replace(/\/[^\/]*$/,'/jQueryfileupload/uploadresult.html');
    $('#fileuploadht').fileupload(
        {
            add: function(e, data) {
                var uploadErrors = [];
                var acceptFileTypes = /^image\/(jpe?g)$/i;
                if(data.originalFiles[0]['type']=="" || (data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type']))) {
                    uploadErrors.push('上传的文件类型不符合要求，请上传jpg类型的文件');
                }
                if(data.originalFiles[0].size > 1000000) {
                    uploadErrors.push('文件尺寸过大，限制文件大小1M');
                }
                if(uploadErrors.length > 0) {
                    alert(uploadErrors.join("\n"));
                } else {
                    data.submit();
                }
            },
            forceIframeTransport: true,
            url: upurl,
            dataType: 'json',
            done: function (e, data) {
                var na=data.result.files[0].name;
                $("#showht").html("上传成功！");
                tpht=na;
                $("#xz").attr("data-url",imgBaseUrl+"/uploads/"+na);
                $("#xz").show();
            },

        }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');


});
function conStaclick(a){

    if(editFlag){
        ShowShelter();
        $('.shyjht-layer').show();
        //存储来自哪里,审核状态(点提交时才生效)
        $("#shyjhttj").click(function(){

                conSta=a;
                conStateEdit="1";
                conStateEditText=$("#shyjhtText").val();
            HideShelter();
            $('.shyjht-layer').hide();
        });
    }else{
        conSta=a;
    }

}
//合同提交按钮
function ConSubmit(){
if(check()){//检查通过
    var ob=new Object();
    ob.contractNum=conNum;
    ob.payment=conBuss;
    ob.state=conSta;
    ob.img=tpht;
    ob.startDate=startTime;
    ob.finishDate=endTime;
    ob.YJ=conStateEdit;
    ob.userId=userId;
    ob.text=conStateEditText;
    jsonConStr=JSON.stringify(ob);
    //a("合同拼接--"+jsonConStr)
    HideShelter();
    $('.pop-layer').hide();
    alert("合同信息已缓存,请提交!");
}
}
//检查必填
function check(){
    jsonConStr="";
     conNum="";
     startTime="";
     endTime="";
     conBuss="";

    conNum=$('#conNum').val();
    var timeStr=$("#reservation1").val();
    if(conNum==""||conNum.trim()==""){
        a("请填写合同编号!");
        return false;
    }
    if(timeStr==""){
        a("请填写合同起止时间!");
        return false;
    }
    //if($("#conShopName").val()==""){
    //    a("请先填写商户基本信息!");
    //    return false;
    //}

    $.each($("input[type=checkbox]"),function(index,enty){
        if($(this).is(":checked")){
            //a($(this).data("value"))
            conBuss+=$(this).data("value")+"&&";
        }

    });
    //if(conBuss==""){
    //    a("请选择业务!");
    //    return false;
    //}


    startTime= pieTime(0,timeStr);
    endTime= pieTime(1,timeStr);
    return true;
}
//查询单条合同
function findOne(){
    //a("000")
        var ob=new Object();
        ob.conId=conId;
        var obw=new Object();
        obw.marked="Dounenglu_superShop_findCon";
        obw.code="10008";
        obw.version="1.0";
        obw.jsonStr=JSON.stringify(ob);
         if(editFlag){
           findDataForAll(obw,callBack_findOne);
         }
    }
function xiazai(){
    //alert($("#xz").data("url"));
    window.open($("#xz").data("url"));
}
//查询省返回
    function callBack_findOne(data){
        if(data.code==0){
          //a(data.mess)
            $('#conNum').val(data.conNum);
            tpht=data.img;
            if(tpht!=""&&tpht!=null&&tpht.trim!=""){
                $("#xz").attr("data-url",imgBaseUrl+"/uploads/"+data.img);
                $("#xz").show();
                $("#showht").html("已上传附件！");
            }else {
                $("#xz").hide();
                $("#showht").html("");
            }
            $('#reservation1').val(data.startDate+" - "+data.endDate);
            var busStr=data.buss;
            if(busStr!=""){
                for(var i=0;i<conArr.length;i++){
                  if( busStr.indexOf(conArr[i])!=-1){
                      var na="#yw"+conArr[i];
                      $(na).prop("checked", true);
                      //$(na).attr("checked", true);
                  }
                }
            }
        }else{
            alert(data.code+"   查询商户合同结果:"+data.mess);
            $("#xz").hide();
            return;
        }

        return;
    }