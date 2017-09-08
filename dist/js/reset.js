$(document).ready(function() {
	/*
	 * 功能：重设密码事件
	 * 创建人：liql
	 * 创建时间：2015-9-25
	 */
	$("#resetPassword").click(function() {
		if (ResetOtherValidate()) {
			retrievePassword();
		}
	});
	/*
	 * 功能：返回按钮事件
	 * 创建人：liql
	 * 创建时间：2015-10-15
	 */
	$("#backBtn").click(function() {
		location.href = "../html/login.html";
	});
	/*
	 * 功能：获取验证码点击事件
	 * 创建人：liql
	 * 创建时间：2015-9-25
	 */

	$("#getCode").click(function() {
		if ($('#getCode').html() == '发送短信验证码') {
			if (ResetPhoneValidate()) {
				wait = 60;
				TimeEvent('#getCode', 'btn btn-disabled btn-block btn-flat', 'btn btn-primary btn-block btn-flat');
				sendVerCode();
			}
		}

	});
	/*
	 * 功能：失去焦点事件,当密码输入一致时，改变再次输入密码框的颜色
	 * 创建人：liql
	 * 创建时间：2015-10-13
	 */
	$("#setPasswordTwo").blur(function() {
		//验证两次密码输入是否相同
		if ($("#setPasswordTwo").val() == $("#setPassword").val()) {
			document.getElementById('passwordT').className = 'form-group has-feedback';
		} else {
			document.getElementById('passwordT').className = 'form-group has-error';
		}
	});
});
/*
 * 功能：手机格式验证
 * 创建人：liql
 * 创建时间：2015-10-14
 */
function ResetPhoneValidate() {
	var isValidate = true;
	var phone = $("#phoneNumUser").val();
	var reg = new RegExp("^[0-9]*$");
	if (phone == "" || phone == null || phone == undefined) {
		alert("手机号不能为空");
		isValidate = false;
	} else {

		if (phone.length < 11 || phone.length > 11 || phone.substr(0, 1) != 1 || !reg.test(phone)) {
			alert('手机号格式不正确,请重新输入');
			isValidate = false;
		}
	}
	return isValidate;
};
/*
 * 功能：其他验证
 * 创建人：liql
 * 创建时间：2015-10-14
 */
function ResetOtherValidate() {
	var isValidate = true;
	var phone = $("#phoneNumUser").val();
	var reg = new RegExp("^[0-9]*$");
	var passw1 = $("#setPassword").val();
	var passw2 = $("#setPasswordTwo").val();
	var code = $("#verificationcode").val();
	var regPass = new RegExp("^[A-Za-z0-9]+$");
	var strAlert = "";

	if (phone == "" || phone == null || phone == undefined) {
		strAlert = "手机号不能为空;\r\n";
		isValidate = false;
	} else {

		if (phone.length < 11 || phone.length > 11 || phone.substr(0, 1) != 1 || !reg.test(phone)) {
			strAlert = strAlert + '手机号格式不正确,请重新输入;\r\n';
			isValidate = false;
		}
	}
	if (code == '' || code == null || code == undefined) {
		strAlert = strAlert + '验证码不能为空;\r\n';
		isValidate = false;
	} else if (code.length < 6) {
		strAlert = strAlert + '验证码不正确;\r\n';
		isValidate = false;
	} else {
		if (!/^\S+$/gi.test(code)) {
			strAlert = strAlert + "验证码不能包含空格;\r\n";
			isValidate = false;
		}
	}

	if (passw1 == "" || passw1 == null || passw1 == undefined) {
		strAlert = strAlert + '新密码不能为空;\r\n';
		isValidate = false;
	} else {
		//      if(!/^\S+$/gi.test(passw1))
		//      {
		//      	strAlert=strAlert+"新密码:不能包含空格;\r\n";
		//      	isValidate=false;
		//      }
		if (!regPass.test(passw1)) {
			strAlert = strAlert + "新密码:格式不正确,密码只能为数字或字母;\r\n";
			isValidate = false;
		}
		if (passw1.length < 6) {
			strAlert = strAlert + '新密码:请至少输入6位密码;\r\n';
			isValidate = false;
		}
	}

	if (passw2 == "" || passw2 == null || passw2 == undefined) {
		strAlert = strAlert + '确认密码不能为空;\r\n';
		isValidate = false;
	} else {

		//      if(!/^\S+$/gi.test(passw2))
		//      {
		//      	strAlert=strAlert+"确认密码:不能包含空格;\r\n";
		//      	isValidate=false;
		//      }
		if (!regPass.test(passw2)) {
			strAlert = strAlert + "确认密码:格式不正确,密码只能为数字或字母;\r\n";
			isValidate = false;
		}
		if (passw2.length < 6) {
			strAlert = strAlert + '确认密码:请至少输入6位密码;\r\n';
			isValidate = false;
		}
	}
	if (passw1 != passw2) {
		strAlert = strAlert + "两次密码输入不一致,请重新输入;";
		$("#setPasswordTwo").val('');
		isValidate = false;
	}
	if (!isValidate) {
		alert(strAlert);
	}

	return isValidate;
};

/*
 * 功能：倒计时60s
 * 创建人：Liql
 * 创建时间：2015-10-22
 */
var wait = 0;

function TimeEvent(viewElement, classname, classOld) {
	if (wait == 0) {
		$(viewElement).removeAttr('disabled');
		$(viewElement).html('发送短信验证码');
		document.getElementById(viewElement.substring(1)).className = classOld;
	} else {
		$(viewElement).attr('disabled', 'disabled');
		$(viewElement).html('重新发送(' + wait + 's)');
		wait--;
		document.getElementById(viewElement.substring(1)).className = classname;
		setTimeout(function() {
			TimeEvent(viewElement, classname, classOld);
		}, 1000);

	}

};

/*
 * 功能：获取验证码
 * 创建人：liql
 * 创建时间：2015-9-25
 */
function sendVerCode() {
	//var url = baseUrl;
	var jsonParam = {
		"marked": "sendmessage_dounenglu",
		"code": "10008",
		"version": "1.0",
		"jsonStr": {}
	};
	//alert("a");
	jsonParam.jsonStr = setJson(null, "username", $("#phoneNumUser").val());
	  console.log(jsonParam);
	jQuery.axjsonp(url, jsonParam, callback_sendVerCodeData);

};

/*
 * 功能：回调函数
 * 创建人：liql
 * 创建时间：2015-9-25
 */
function callback_sendVerCodeData(data) {
	console.log(data);
	if (data.code != "000") {
		wait = 0;
		$('#getCode').removeAttr('disabled');
		$('#getCode').html('发送短信验证码');
		//注册页面
		$('#getCodeRegister').removeAttr('disabled');
		$('#getCodeRegister').html('发送短信验证码');

		alert(data.mess);
		return;
	} else {
		//		alert(data.mess);
	}
};

/*
 * 功能：重设密码
 * 创建人：liql
 * 创建时间：2015-9-25
 */
function retrievePassword() {
	var jsonParam = {
		"marked": "retrievePassword_dounenglu",
		"code": "10008",
		"version": "1.0",
		"jsonStr": {}
	};

	var myjsonStr = setJson(null, "username", $("#phoneNumUser").val());
	myjsonStr = setJson(myjsonStr, "verificationcode", $("#verificationcode").val());
	myjsonStr = setJson(myjsonStr, "password", $("#setPassword").val());
	jsonParam.jsonStr = myjsonStr;
		console.log(jsonParam);
	jQuery.axjsonp(url, jsonParam, callback_retrievePasswordData);

};

function callback_retrievePasswordData(data) {
	console.log(data);
	if (data.code != "000") {
		alert(data.mess);
		return;
	} else {
		alert(data.mess);
		location.href = "../html/login.html";
	}
};