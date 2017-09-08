
var agentId=$.cookie("agentId_d");
var selectORexport;
$(function(){
	if($.cookie("agentId_d")==null){
		//location.href="./login.html";
		window.close();
		window.open("./login.html");
	}
	getagent();
	$('#shjsBut').click(function(){
		$("#shjs").show();
	});
	$('#jssh').click(function(){
		//alert("aa");
		pageCurrent = 1;
		findShop();
	});
	$('#select2').click(function(){
		pageCurrent = 1;
		selectORexport="0";
		select("0");
	});
	$('#outdata2').click(function(){
		pageCurrent = 1;
		selectORexport="1";
		select("1");
	});

});


//检索商户
function findShop(){
	var json=new Object();

	json.agentId=$.cookie("agentId_d");

	json.pageSize=pageSize;

	json.currPage=pageCurrent;

	json.belongShopId="0";

	json.name=$("#shanghuName").val();

	var jsonPrama = {

		"marked" : "Dounenglu_payPublicCall_findSuperShop",

		"code": "10008",

		"version": "1.0",

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

			rd+="<td >"+enty.agentName+"</td>";

			rd+="<td ><a onclick='xuzesh(\""+enty.id+"\",\""+enty.name+"\",\""+enty.agentId+"\",\""+enty.agentName+"\")'>选择</a> </td></tr>";

			$("#shjstbody").append(rd);

		});


	}else{

		alert(da.mess);

	}

	IsCreatePage=false;

	if(!IsCreatePage)

	{

		IsCreatePage=true;

		$("#pageId2").createPage({

			count:da.count,//总条数

			pageCount:Math.ceil(da.count/pageSize),//viewdata.TotalNum

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
function xuzesh(id,name,bi,bn) {

	$('#shopNameText').val(name);
	$("#shopNameText").attr("data-value",id);
	$("#shjs").hide();
}
function getagent(){
	var jsonPrama = {
		"marked": "Dounenglu_getdownAgent",
		"code":"10008",
		"version":"1.0",
		"jsonStr": "{}"
	};
	var myjsonStr = setJson(null,"agentId", agentId);
	jsonPrama.jsonStr=myjsonStr;
	jQuery.axjsonp(url, jsonPrama, callBack_getagentOne);
}

function callBack_getagentOne(data){
	if(data.code==0){
		$('#agentlist').html("");
		$('#agentlist').append("<li data-value=\"\" data-level=\"\"><a>"+"全部"+"</a></li>");
		$.each(data.list,function(entryIndex, entry){
			var strHtml = "<li data-value="+entry.agentId+" data-level="+entry.agentLevel+"><a>"+entry.agentName+"</a></li>";
			$('#agentlist').append(strHtml);
		});

	}else{
		alert(data.code+"  "+data.mess);
		return;
	}
	pull_down_menu1('#agentlist li','#agent');
	return;
}

//检索商户
function select(da){
	var jsonPrama = {
		"marked": "getDistributionStatistics",
		"code":"10008",
		"version":"1.0",
		"jsonStr": "{}"
	}
	var  s = $("#reservation1").val();

	var ctime = s.split(" - ");

	if(ctime[1]==null){

		ctime[1]="";
	}

	var myjsonStr = setJson(null,"merchantShortNameId",$("#shopNameText").attr("data-value"));
	myjsonStr = setJson(myjsonStr,"startDate",ctime[0]);
	myjsonStr = setJson(myjsonStr,"endDate",ctime[1]+"");
	myjsonStr = setJson(myjsonStr,"channelId",$("#industryNum").attr("data-value"));
	var a;//当前的代理级别
	if($.cookie("userType_d")=="firstAgentAdmin"){
		a="1";
	}
	if($.cookie("userType_d")=="seoundAgentAdmin"){
		a="2";
	}
	if($.cookie("userType_d")=="thirdAgentAdmin"){
		a="3";
	}
	myjsonStr = setJson(myjsonStr,"agentId_level",a);
	myjsonStr = setJson(myjsonStr,"agentId",$.cookie("agentId_d"));
	myjsonStr = setJson(myjsonStr,"agentTwoId",$("#agent").attr("data-value"));
	myjsonStr = setJson(myjsonStr,"agentTwoId_level","");
	myjsonStr = setJson(myjsonStr,"pageCurrent",pageCurrent);
	myjsonStr = setJson(myjsonStr,"pageSize",pageSize);
	myjsonStr = setJson(myjsonStr,"Query_type",da);
	myjsonStr = setJson(myjsonStr,"Terminal","0");
	myjsonStr = setJson(myjsonStr,"Terminal_version","1.0");

	jsonPrama.jsonStr=myjsonStr;
	jQuery.axjsonp(jiaoyiurl, jsonPrama, callBack_select);
}
function callBack_select(data){
	console.log(data)
	if(selectORexport=="0"){
	//alert("abc");
	if(data.rspCode=="000"){
		//alert("hh");
		$("#content").empty();
		//alert(data.DistributionList);
		$.each(data.DistributionList,function(index,enty){
			var strHtml = "<tr><td >"+enty.id+"</td>";
			strHtml+="<td >"+enty.transDate+"</td>";
			strHtml+="<td >"+enty.channelDealNumber+"</td>";
			strHtml+="<td >"+enty.orderMoney+"</td>";
			strHtml+="<td >"+enty.channelPayMoney+"</td>";
			strHtml+="<td >"+enty.clearMoney+"</td>";
			strHtml+="<td >"+enty.clearProportion+"</td>";
			strHtml+="</tr>"
			$('#content').append(strHtml);
		});

	}else{
	alert(data.rspCode+"   "+data.rspDesc);

	}

	IsCreatePage=false;

	if(!IsCreatePage)

	{

		IsCreatePage=true;

		$("#pageId").createPage({

			count:data.totalNum,//总条数

			pageCount:Math.ceil(data.totalNum/pageSize),//viewdata.TotalNum

			current:pageCurrent,

			backFn:function(p){

				pageCurrent=p;

				//单击回调方法，p是当前页码

				select("0");

			}

		});

	}

	return;
	}
	if(selectORexport=="1"){
		//console.log(data)
		if(data.rspCode=="000"){
			location.href=data.fileUrl;
			//window.open(data.fileUrl);
			return;
		}else{
			alert(data.rspCode+"   "+data.rspDesc);
			return;
		}

	}


}

