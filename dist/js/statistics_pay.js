var agentId=$.cookie("agentId_d");
var tempData;
var StartDate;
var EndDate;
$(function(){
	if($.cookie("agentId_d")==null){
		window.close();
		window.open("./login.html");
	}
	var i=3;//当代理级别为3时
	var a;//当前的代理级别
	if($.cookie("userType_d")=="firstAgentAdmin"){
		a=1;
	}
	if($.cookie("userType_d")=="seoundAgentAdmin"){
		a=2;
	}
	if($.cookie("userType_d")=="thirdAgentAdmin"){
		a=3;
	}
	//alert($.cookie("userType_d"));
	//alert("a:"+a);
	//根据代理商的等级进行，下级的添加
	for(var j=0;j<i-a;j++){
		$('#agentLevellist').append("<li data-value=\""+(i-j)+"\"><a>"+(i-j)+"级</a></li>");
		//alert(i-j);
	}
	pull_down_menu('#agentLevellist li','#agentLevel');
	$('#agentLocationbutton').click(function(e) {
		selectFAgent();
	});
	$('#agentLevelbutton').click(function(e) {
		$('#agentLocation').text("--");
		$('#agentLocation').attr("data-value","");
	});

	$('#shjsBut').click(function(){
		$("#shjs").show();
	});
	$('#jssh').click(function () {
		//alert("aa");
		pageCurrent = 1;
		findShop();
	});
	$('#wangdianbtn').click(function () {
		//alert($("#shopNameText").val());
		if ($("#shopNameText").val() == "") {
			alert("请先选择商户");
			return;
		}
		getwangdian($("#shopNameText").attr("data-value"));
	});
	pull_down_menu('#industryNumlist li','#industryNum');
	pull_down_menu('#statelist li','#state');
	//getagent();
	$('#select').click(function () {
		pageCurrent = 1;
		selectORexport="0";
		select("0");
	});
	$('#outdata').click(function(){
		pageCurrent = 1;
		selectORexport="1";
		select("1");
	});
});

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
		$('#agentlist').append("<li data-value=\"\"><a >"+"全部"+"</a></li>");
		$.each(data.list,function(entryIndex, entry){
			var strHtml = "<li data-value="+entry.agentId+"><a >"+entry.agentName+"</a></li>";
			$('#agentlist').append(strHtml);
		});

	}else{
		alert(data.code+"  "+data.mess);
		return;
	}
	pull_down_menu('#agentlist li','#agent');
	return;
}

function getagentTwo(){
	var jsonPrama = {
		"marked": "getAgentTwoNameList",
		"code":"10008",
		"version":"1.0",
		"jsonStr": "{}"
	};
	var myjsonStr = setJson(null,"123", "");
	jsonPrama.jsonStr=myjsonStr;
	jQuery.axjsonp(url, jsonPrama, callBack_getagentTwo);
}
function callBack_getagentTwo(data){
	if(data.rspCode==0){
		$('#agentTwolist').html("");
		$.each(data.agentTwoNameList,function(entryIndex, entry){
			var strHtml = "<li data-value="+entry.agentTwoId+"><a href=\"#\">"+entry.agentTwoName+"</a></li>";
			$('#agentTwolist').append(strHtml);
		});

	}else{
		alert(data.rspCode+"  "+data.rspDesc);
		return;
	}
	pull_down_menu('#agentTwolist li','#agentTwo');
	return;

}
//检索商户
function select(da){
	var jsonPrama = {
		"marked": "getAgentPayStatisticsList",
		"code":"10008",
		"version":"1.0",
		"jsonStr": "{}"
	}
	if($("#reservation1").val()==""){
		alert("请选择日期");
		return;

	}
	var  s = $("#reservation1").val();

	var ctime = s.split(" - ");

	if(ctime[1]==null){

		ctime[1]="";
	}
	console.log(ctime[0]);
	StartDate=ctime[0];
	console.log(ctime[1]+"");
	EndDate=ctime[1]+"";
	//alert($("#shopNameText").attr("data-value"));
	var myjsonStr = setJson(null,"orderNo",$("#storeNum").val());
	myjsonStr = setJson(myjsonStr,"startDate",ctime[0]);
	myjsonStr = setJson(myjsonStr,"endDate",ctime[1]+"");
	//myjsonStr = setJson(myjsonStr,"termCode",$("#adress").val());
	myjsonStr = setJson(myjsonStr,"agentId",$.cookie("agentId_d"));
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
	myjsonStr = setJson(myjsonStr,"agentTwoId",$("#agentLocation").attr("data-value"));
	//alert($("#agentLevel").attr("data-value"));
	myjsonStr = setJson(myjsonStr,"agentTwoId_level",$("#agentLevel").attr("data-value"));
	myjsonStr = setJson(myjsonStr,"merchantShortNameId",$("#shopNameText").attr("data-value"));
	myjsonStr = setJson(myjsonStr,"shopNameId",$("#wangdianname").attr("data-value"));
	myjsonStr = setJson(myjsonStr,"orderStatus",$("#state").attr("data-value"));
	myjsonStr = setJson(myjsonStr,"pageCurrent",pageCurrent);
	myjsonStr = setJson(myjsonStr,"pageSize",pageSize);
	myjsonStr = setJson(myjsonStr,"channelId",$("#industryNum").attr("data-value"));
	myjsonStr = setJson(myjsonStr,"termCode",$("#shopName").val());
	myjsonStr = setJson(myjsonStr,"Query_type",da);
	myjsonStr = setJson(myjsonStr,"Terminal","0");
	myjsonStr = setJson(myjsonStr,"Terminal_version","1.0");
	myjsonStr = setJson(myjsonStr,"orderStatus",$("#state").attr("data-value"));
	//var myjsonStr = setJson(null,"orderNo",$("#storeNum").val());
	//myjsonStr = setJson(myjsonStr,"startDate","2012-04-15");
	//myjsonStr = setJson(myjsonStr,"endDate","2016-06-18");
	////myjsonStr = setJson(myjsonStr,"termCode",$("#adress").val());
	//var agent=$("#agent").attr("data-value");
	//if(agent==""){
	//	agent=$.cookie("agentId");
	//}
	//myjsonStr = setJson(myjsonStr,"agentTwoId","ff808081545267a3015452ad1b630011");
	//var aa=$("#shopNameText").attr("data-value");
	//if(aa=""){
    //
	//}
	//myjsonStr = setJson(myjsonStr,"merchantShortNameId","ff808081523557bd0152443238961d3d");
	//myjsonStr = setJson(myjsonStr,"shopNameId","ff808081523557bd015244363b5e1d50");
	//myjsonStr = setJson(myjsonStr,"orderStatus",$("#state").attr("data-value"));
	//myjsonStr = setJson(myjsonStr,"pageCurrent",pageCurrent);
	//myjsonStr = setJson(myjsonStr,"pageSize",pageSize);
	//myjsonStr = setJson(myjsonStr,"channelId","09");
	//myjsonStr = setJson(myjsonStr,"termCode","75647652");
	//myjsonStr = setJson(myjsonStr,"Query_type","0");
	//myjsonStr = setJson(myjsonStr,"Terminal","0");
	//myjsonStr = setJson(myjsonStr,"Terminal_version","1.0");
	jsonPrama.jsonStr=myjsonStr;
	console.log(jsonPrama);
	jQuery.axjsonp(jiaoyiurl, jsonPrama, callBack_select);
}
function callBack_select(data) {
	console.log(data);
	if (selectORexport == "0") {
		//alert("abc");
		if (data.rspCode == "000") {
			//alert("hh");
			$("#content").empty();
			//alert(data.DistributionList);
			$.each(data.Datalist, function (index, enty) {
				var strHtml = "<tr><td >" + enty.transDate + "</td>";
				strHtml += "<td >" + enty.channelDealMoney + "</td>";
				strHtml += "<td >" + enty.channelDealNumber + "</td>";
				strHtml += "<td >" + enty.channelOffMoney + "</td>";
				strHtml += "<td >" + enty.channelPayMoney + "</td>";
				strHtml += "</tr>"
				$('#content').append(strHtml);
			});

		} else {
			alert(data.rspCode + "   " + data.rspDesc);

		}
		$("#allDealNumber").html(data.allDealNumber); //累计交易笔数
		$("#allDealMoney").html(data.allDealMoney); //交易金额
		var chatdata = [];
		tempData = new Array();
		tempData.push([]);
		tempData.push([]);
		var dataTemp = sortUpJson(data.full_Datalist, "transDate");
		$.each(dataTemp, function(MainIndex, MainEntry) {
			tempData[0].push([MainIndex, MainEntry.channelDealMoney]);
			tempData[1].push([MainIndex, MainEntry.channelDealNumber]);
		});

		var strRgba = "";
		for (i = 0; i < 2; i++) {
			switch (i) {

				case 0:
					strRgba = "rgba(0,0,205,0)";
					break;
				case 1:
					strRgba = "rgba(0,255,127,0)";
					break;
				default:
					strRgba = "rgba(244, 169, 162,0)";
					break;
			}
			chatdata.push({
				lines: {
					fillColor: strRgba.toString()
				},
				data: tempData[i]
			});
		}
		DrawChart(chatdata);
		$('.btn.btn-primary.btn-sm').removeAttr("disabled");


		IsCreatePage = false;

		if (!IsCreatePage) {

			IsCreatePage = true;

			$("#pageId2").createPage({

				count: data.totalNum,//总条数totalNum

				pageCount: Math.ceil(data.totalNum / pageSize),//viewdata.TotalNum

				current: pageCurrent,

				backFn: function (p) {

					pageCurrent = p;

					//单击回调方法，p是当前页码
					selectORexport = "0"
					select("0");

				}

			});

		}

		return;
	}
	if (selectORexport == "1") {
		if (data.rspCode == "000") {
			location.href=data.fileUrl;
			return;
		} else {
			alert(data.rspCode + "   " + data.rspDesc);
			return;
		}

	}
}



//检索商户
function findShop() {
	var json = new Object();
	json.agentId = $.cookie("agentId_d");
	json.pageSize = pageSize;
	json.currPage = pageCurrent;
	json.belongShopId = "0";
	json.name = $("#shanghuName").val();
	var jsonPrama = {

		"marked": "Dounenglu_payPublicCall_findSuperShop",

		"code": "10008",

		"version": "1.0",

		"callbackparam": "success_jsonpCallback",

		"jsonStr": JSON.stringify(json)

	};

	findDataForAll(jsonPrama, findShopBack);

}

//查询商户返回

function findShopBack(da) {

	//alert("查询商户成功"+da.code);


	$("#shjstbody").empty();

	if (da.code == "000") {

		$.each(da.list, function (index, enty) {

			//alert("gl"+enty.id);


			var rd = "<tr><td >" + enty.name + "</td>";

			rd += "<td >" + enty.agentName + "</td>";

			rd += "<td ><a onclick='xuzesh(\"" + enty.id + "\",\"" + enty.name + "\",\"" + enty.agentId + "\",\"" + enty.agentName + "\")'>选择</a> </td></tr>";

			$("#shjstbody").append(rd);

		});


	} else {

		alert(da.mess);

	}

	IsCreatePage = false;

	if (!IsCreatePage) {

		IsCreatePage = true;

		$("#pageId").createPage({

			count: da.count,//总条数

			pageCount: Math.ceil(da.count / pageSize),//viewdata.TotalNum

			current: pageCurrent,

			backFn: function (p) {

				pageCurrent = p;

				//单击回调方法，p是当前页码

				findShop()

			}

		});

	}

	return;

}

function getwangdian(shopId) {


	var json = new Object();
	json.shopId = shopId;
	var jsonPrama = {
		"marked": "Dounenglu_getShopWangdian",
		"code": "10008",
		"version": "1.0",
		"callbackparam": "success_jsonpCallback",
		"jsonStr": JSON.stringify(json)
	};
	//findDataForAll(jsonPrama, getwangdianBack);
	jQuery.axjsonp(url, jsonPrama, getwangdianBack);
}
function getwangdianBack(data) {

	if(data.Code=="000"){
		$('#wangdiannamelist').html("");
		$("#wangdiannamelist").html("<li data-value=\"\"><a >" + "全部" + "</a></li>");
		$.each(data.list, function (index, entry) {
			var strHtml = "<li data-value=" + entry.id + "><a >" + entry.name + "</a></li>";
			$('#wangdiannamelist').append(strHtml);
		});
	}
	else{
		alert(data.Code + "  " + data.Mess);
		return;
	}
	pull_down_menu('#wangdiannamelist li', '#wangdianname');
	return;
}
function xuzesh(id, name, bi, bn) {

	$('#shopNameText').val(name);
	$("#shopNameText").attr("data-value", id);
	$("#shjs").hide();
	$("#wangdiannamelist").html("");
	$('#wangdianname').text("");
}

/*
 * 功能：绘制图表函数
 */
function DrawChart(displayData) {
	//获取y轴最大值
	var len = tempData[0].length;
	var yMax = 0;

	for (var i = 0; i < len; i++) {

		if (parseFloat(yMax) < parseFloat(tempData[0][i][1])) {
			yMax = tempData[0][i][1];
		}
		if (parseFloat(tempData[1][i][1]) > parseFloat(yMax)) {
			yMax = tempData[1][i][1];
		}
	}

	var buchang = Math.ceil(yMax / 10);
	var yTicks = new Array([0, "0"]);
	for (var i = 1; i < 10; i++) {
		yTicks.push([i * buchang]);
		//yTicks=yTicks+i*buchang+",";
	}
	yTicks.push([10 * buchang]);
	//yTicks=yTicks+10*buchang+"]";

	yMax = 10 * buchang;

	$("#Tooltip").remove();

	//	<!-- 绘制图表-->
	//+-----------------------------------------
	//| X轴坐标格式化开始
	var sDate = new Date(StartDate);
	var eDate = new Date(addDate(EndDate, 1));
	var xData = [];

	var i = 0;
	while (sDate.getFullYear() != eDate.getFullYear() || sDate.getMonth() != eDate.getMonth() || sDate.getDate() != eDate.getDate()) {
		xData.push([i, sDate.getMonth() + 1 + "月" + sDate.getDate() + "日".toString()]);
		sDate = new Date(addDate(sDate, 1));
		i++;

		//		if(i==7)break;
	}

	//| X轴坐标格式化结束
	//+-----------------------------------------

	$.plot(
		//绑定容器
		$("#placeholder"),
		displayData,
		//设置统一样式
		{
			// 自定义数据系列
			series: {
				//共有属性：点、线、柱状图的显示方式
				lines: {
					// 是否显示
					show: true,
					// 线宽度
					lineWidth: 1,
					// 是否填充
					fill: true,
					// 填充色，如rgba(255, 255, 255, 0.8)
					// fillColor: "rgba(72, 166, 217, 0.1)"
				},
				//阴影大小
				shadowSize: 0
			},
			//线颜色
			//			colors: ["#32bb9d", "#48a6d9", "#f9dea3", "#f4a9a2"],
			colors: ["#1E90FF", "#B22222", "#f9dea3", "#f4a9a2"],
			//坐标标记x轴
			xaxis: {
				ticks: xData, //[[1,"day1"],[2,"day2"],[3,"day3"],[4,"day4"],[5,"day5"],[6,"day6"],[7,"day7"]],
				min: 0,
				max: xData.length - 1
			},
			//坐标标记y轴
			yaxis: {
				ticks: yTicks, // [[0,"0"], 2000, 4000, 6000, 8000, 10000],
				min: 0,
				max: yMax
			},
			grid: {
				// 是否显示格子
				show: true,
				// 数据的线是否绘制在网格线下
				aboveData: false,
				// 边框宽度
				borderWidth: 1,
				// 边框颜色
				borderColor: "white",
				// 网格线颜色
				tickColor: "#e8e8e8",
				// 监听鼠标点击，会生成plotclick事件
				clickable: true,
				// 监听鼠标移动，会生成plothover事件
				hoverable: true,
				// 鼠标附近元素高亮显示
				autoHighlight: true,
				mouseActiveRadius: 10
			}
		}
	);
	$('#placeholder').unbind("plothover");
	var previousPoint = null;
	//绑定鼠标在图表上的事件
	$("#placeholder").bind("plothover", function(event, pos, item) {
		if (item) {
			$(this).css("cursor", "pointer");
			if (previousPoint != item.dataIndex) {
				previousPoint = item.dataIndex;
				var name;
				if (item.series.lines.fillColor == "rgba(0,255,127,0)") {
					name = "交易笔数";
				} else if (item.series.lines.fillColor == "rgba(0,0,205,0)") {
					name = "交易金额";
				}
				$("#Tooltip").remove();
				showTooltip(item.pageX, item.pageY,
					xData[item.datapoint[0]][1] + "-" + name + " : " + item.datapoint[1]);
			}
		} else {
			$("#Tooltip").remove();
			previousPoint = null;
		}

	});

};

//查询该代理商下相应级别的代理
function selectFAgent(){
	var jsonPrama = {
		"marked": "AgentAction_findlevelAgent",
		"code":"10008",
		"version":"1.0",
		"jsonStr": "{}"
	};
	if($("#agentLevel").attr("data-value")==""){
		alert("请先选择代理商级别！");
		return;
	}
	//if($('#agentLevel').attr("data-value")==1){
	//    $('#agentLocationlist').html("");
	//    $('#agentLocation').html("--");
	//    $('#agentLocation').attr("data-value","");
	//    alert("一级代理不存在上级代理，无需填写");
	//    return;
	//}branchId
	var myjsonStr = setJson(null,"branchId",$.cookie("branchId_d"));
	myjsonStr = setJson(myjsonStr,"level",$("#agentLevel").attr("data-value"));
	myjsonStr = setJson(myjsonStr,"agentLocation",agentId);
	jsonPrama.jsonStr=myjsonStr;
	jQuery.axjsonp(url, jsonPrama, callBack_selectFAgent);
}

function callBack_selectFAgent(data){
	if(data.code==0){
		$('#agentLocationlist').html("");
		$('#agentLocation').html("--");
		$('#agentLocation').attr("data-value","");
		$.each(data.list,function(entryIndex, entry){
			var strHtml = "<li data-value="+entry.agentId+"><a href=\"#\">"+entry.agentName+"</a></li>";
			$('#agentLocationlist').append(strHtml);
		});
	}else{
		alert(data.code+"   "+data.mess);
		return;
	}
	pull_down_menu('#agentLocationlist li','#agentLocation');
	return;
}