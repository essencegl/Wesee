$(function ($) {
	//弹出登录
	$("#Login").on('click', function () {
		$("body").append("<div id='mask'></div>");
		$("#mask").addClass("mask").fadeIn("slow");
		$("#LoginBox").fadeIn("slow");
	});

	$("#Register").on('click', function () {
		$("body").append("<div id='mask'></div>");
		$("#mask").addClass("mask").fadeIn("slow");
		$("#RegisterBox").fadeIn("slow");
	});

	//按钮的透明度
	$("#loginbtn").hover(function () {
		$(this).stop().animate({
			opacity: '1'
		}, 500);
	}, function () {
		$(this).stop().animate({
			opacity: '0.8'
		}, 500);
	});

	//登陆按钮时间,包括判断是否为空
	$("#loginbtn").on('click', function () {
		var txtName = $("#txtName").val();
		var txtPwd = $("#txtPwd").val();
		var temp = {
			username: txtName,
			password: txtPwd,
		}
		if (txtName == "" || txtName == undefined || txtName == null) {
			if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
				$(".warning").css({ display: 'block' });
			}
			else {
				$("#warn").css({ display: 'block' });
				$("#warn2").css({ display: 'none' });
			}
		}
		else {
			if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
				$("#warn").css({ display: 'none' });
				$(".warn2").css({ display: 'block' });
			}
			else {
				//两者都不为空
				$(".warning").css({ display: 'none' });
				$.post('signin_valid', temp, function(data) {
					if (data == "false") {
						$("#login_error_tips").css({ display: 'block' });
					} else {
						$("#LoginBox").fadeOut("fast");
						$("#mask").css({ display: 'none' });
						$("#mask").remove();
						$("#Login span").text(txtName);
					}
				});
			}
		}
	});

	//登陆文本框不允许为空---单个文本触发
	$("#txtName").on('blur', function () {
		var txtName = $("#txtName").val();
		if (txtName == "" || txtName == undefined || txtName == null) {
			$("#warn").css({ display: 'block' });
		}
		else {
			$("#warn").css({ display: 'none' });
		}
	});
	$("#txtName").on('focus', function () {
		$("#login_error_tips").css({ display: 'none' });
		$("#warn").css({ display: 'none' });
	});
	//
	$("#txtPwd").on('blur', function () {
		var txtName = $("#txtPwd").val();
		if (txtName == "" || txtName == undefined || txtName == null) {
			$("#warn2").css({ display: 'block' });
		}
		else {
			$("#warn2").css({ display: 'none' });
		}
	});
	$("#txtPwd").on('focus', function () {
		$("#login_error_tips").css({ display: 'none' });
		$("#warn2").css({ display: 'none' });
	});


	//注册提交
	$("#registerbtn").on("click", function () {
		var password_1 = $("#register_txtPwd").val();
		var password_2 = $("#again_txtPwd").val();
		if (password_1 != password_2) {
			$("#judge_same_password").css({display:"block"});
			return false;
		} else {

		}
	});

	$(".RegisterBox_content input").on('focus', function () {
		$("#judge_same_password").css({display:"none"});
	});



	//关闭
	$(".close_signin").hover(function () { 
		$(this).css({ color: 'rgb(250,111,87)' })
	}, function () {
		$(this).css({ color: '#999' })
	}).on('click', function () {
		$("#LoginBox").fadeOut("fast");
		$("#mask").css({ display: 'none' });
		$("#mask").remove();
	});

	$(".close_register").hover(function () { 
		$(this).css({ color: 'rgb(250,111,87)' })
	}, function () {
		$(this).css({ color: '#999' })
	}).on('click', function () {
		$("#RegisterBox").fadeOut("fast");
		$("#mask").css({ display: 'none' });
		$("#mask").remove();
	});
});