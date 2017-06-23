$(function ($) {
    //弹出选座
    $("#Chooseseat").on('click', function () {
        $("body").append("<div id='mask'></div>");
        $("#mask").addClass("mask").fadeIn("slow");
        $("#ChooseBox").fadeIn("slow");
        $("#movieName").attr("id");

        //右边数据栏清空：
        $("#seat_number").text("0");
        $("#total_movie").text("0");  //总价
        $("#seat_position").text("");  //总位置
        //电影座位表打开后根据
        var movieTitle = $("#movieTitle").text();
        $.post('getSeatData', {movie_title : movieTitle}, function(data, status) {
            var seatData = data;
            for (var i = 0; i < 54; ++i) {
                if (seatData[i] == "1") {
                    $("#ChooseBox a").eq(i+1).removeClass("active").addClass("sold");
                    $("#ChooseBox a").eq(i+1).attr("data-type", 1);
                } else {
                    $("#ChooseBox a").eq(i+1).removeClass("selected").addClass("active");
                    $("#ChooseBox a").eq(i+1).attr("data-type", 0);
                }
            }
        });
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

    //点击以后票数，位置和总价的行为：
    $("#ChooseBox a").on('click', function () {
        var seat_number = parseInt($("#seat_number").text());
        var total_movie = parseInt($("#total_movie").text());  //总价
        var single_price = parseInt($("#single_price").text()); //单价
        var seat_position = $("#seat_position").text();  //总位置
        var single_position = $(this).attr("title"); //当前位置
        var has_active = $(this).hasClass("active");
        var has_selected = $(this).hasClass("selected");
        if (has_active) {
            seat_number++;
            $("#seat_number").text(seat_number);
            $(this).removeClass("active").addClass("selected");
            $("#seat_position").text(seat_position+single_position+"; ");
            $(this).attr("data-type", "1");
        }
        if (has_selected) {
            seat_number--;
            $("#seat_number").text(seat_number);
            $(this).removeClass("selected").addClass("active");
            $("#seat_position").text(getNewPosition(seat_position, single_position+"; "));
            $(this).attr("data-type", "0");
        }
        $("#total_movie").text(seat_number*single_price);
    });

    //点击购买
    $("#buybtn").on("click", function () {
        var seat_number = parseInt($("#seat_number").text());
        var user_check = $("#Login span").text();
        if (user_check == "登陆") {
            alert("请先登陆");
            $("#ChooseBox").fadeOut("slow");
            $("#LoginBox").fadeIn("slow");
            $(".inputBox input").val("");
        } else if (seat_number == 0) {
            alert("未选择电影座位，当前选择票数为0！");
        } else {
            var sendSeat = "";
            var d = new Date();
            var seatNumber = parseInt($("#seat_number").text());
            var seatPosition = $("#seat_position").text();  //总位置
            var orderUsername = $("#Login span").text();
            var movieTitle = $("#movieTitle").text();
            var moviePrice = parseInt($("#single_price").text());
            for (var i = 0; i < 54; ++i) {
                var single_send = $("#ChooseBox a").eq(i+1).attr("data-type");
                sendSeat += single_send;
            }
            var orderId = getOrderId(orderUsername);
            
            var temp = {
                order_id: orderId, //电影票据ID
                date: d.toLocaleString(), //下订单时间
                hall: "1号影厅", //电影影厅
                showtime: "未确认", //电影开映时间
                seat_number: seatNumber, //票数
                seat_position: seatPosition, //座位的文字描述
                send_seat : sendSeat, //座位的01编号
                order_username: orderUsername, //用户名
                movie_title: movieTitle, //电影名称
                movie_price: moviePrice //电影价格
            }
            
            $.post("order_seat", temp, function(data) {
                alert("购票成功, 请前往个人中心查收票据.");
                $("#ChooseBox").fadeOut("fast");
                $("#mask").css({ display: 'none' });
                $("#mask").remove();
            });      
        }
    });
});

function getNewPosition(seat_position, single_position) {
    return seat_position.replace(single_position, "");
}

function getOrderId(orderUsername) {
    var temp = "A";
    for (var i = 0; i < orderUsername.length; ++i) {
        temp += orderUsername.charCodeAt(i).toString();
    }
    if (temp.length > 10) {
        temp.substr(0, 10);
    }
    var Rand = Math.random();
    var num = 1 + Math.round(Rand * 1000) 
    temp += num.toString();
    return temp;
}