
$(document).ready(function(){

//	if($.cookie("userName")==null || $.cookie("userName")==undefined)
//	{
//		location.href="login.html";
//	}
//	else
//	{
//		alert($.cookie("name"));
		
		$('.username').text($.cookie("shopName"));
		$('.num').text($.cookie("userName"));
		
		switch($.cookie("userType"))
	    {
	    	case '0':
	    	  $("#userType").text('门店管理员');
	    	 break;
	    	case '1':
	    	  $("#userType").text('门店业务员');
//	    	  alert($.cookie("userType"));
	    	 break;
	    	case '2':
	    	  $("#userType").text('商户管理员');
	    	 break;
	    	default:
	    	 break;
	    }

          //console.log($.cookie("photo_url"));
		if($.cookie("photo_url")!="" && $.cookie("photo_url")!=null && $.cookie("photo_url")!=undefined)
		{
			$("#imgIndexUserPhoto").attr("src", $.cookie("photo_url"));
		}

		$('.username').abridgeTitle();
		if($.cookie("signing")==1)
		{
			$("#signing").text('签约');
			$('#content_box').load("./html/PayStatistics.html");
		}
		else 
		{
			$("#signing").text('未签约');
            $('#content_box').load("./html/BusinessInformation.html");
		}
//	}
	 /*
 * 功能：index页面退出按钮
 * 创建人：liql
 * 创建时间：2015-9-29
 */
$("#exit").click(function(){
      var r=confirm("确定退出系统吗？");
      if (r==true)
      {
      	clearCookies();
        location.href="login.html";
      }
   
});
});
/*
   * 功能：清空cookie
   * 创建人：liql
   * 创建时间：2015-9-28
   */
function clearCookies(){
	    $.cookie("rembUser","false",{expires :-1,path:"/"});
		$.cookie("userName",'',{expires :-1,path:"/"});
		$.cookie("passWord",'',{expires :-1,path:"/"});
		$.cookie("shopId",'',{expires :-1,path:"/"});
		$.cookie("shopName",'',{expires :-1,path:"/"});
		$.cookie("signing",'',{expires :-1,path:"/"});
		$.cookie("photo_url",'',{expires :-1,path:"/"});
		$.cookie("userType",'',{expires :-1,path:"/"});
		$.cookie("enable",'',{expires :-1,path:"/"});
		$.cookie("userid",'',{expires :-1,path:"/"});
	    $.cookie("id",'',{expires :-1,path:"/"});
		$.cookie("name",'',{expires :-1,path:"/"});
		$.cookie("shopNumber",'',{expires :-1,path:"/"});
		$.cookie("terminalNum",'',{expires :-1,path:"/"});
		$.cookie("wangDianNumber",'',{expires :-1,path:"/"});
};


