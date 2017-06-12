$(function ($) {
    //弹出选座
    $("#Chooseseat").on('click', function () {
        $("body").append("<div id='mask'></div>");
        $("#mask").addClass("mask").fadeIn("slow");
        $("#ChooseBox").fadeIn("slow");
    });

    //按钮的透明度
    $("#Chooseseat").hover(function () {
        $(this).stop().animate({
            opacity: '1'
        }, 500);
    }, function () {
        $(this).stop().animate({
            opacity: '0.8'
        }, 500);
    });

//关闭
    $(".close_signin").hover(function () { 
        $(this).css({ color: 'rgb(250,111,87)' })
    }, function () {
        $(this).css({ color: '#999' })
    }).on('click', function () {
        $("#ChooseBox").fadeOut("fast");
        $("#mask").css({ display: 'none' });
        $("#mask").remove();
    });
});