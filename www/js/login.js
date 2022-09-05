var userIDReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
var count = 60;
var InterValObj1;
var curCount1;

function sendMessage1() {
    curCount1 = count;
    var userID = $.trim($('#userID').val());
    if (!userIDReg.test(userID))
    {
        alert(" 请输入有效的用户名");
        return false;
    }
    $("#btnSendCode1").attr("disabled", "true");
    $("#btnSendCode1").val( + curCount1 + "秒再获取");
    InterValObj1 = window.setInterval(SetRemainTime1, 1000);
}
function SetRemainTime1() {
    if (curCount1 == 0) {
        window.clearInterval(InterValObj1);			$("#btnSendCode1").removeAttr("disabled");
        $("#btnSendCode1").val("重新发送");
    }else {
        curCount1--;
        $("#btnSendCode1").val( + curCount1 + "秒再获取");
    }
}
function binding()
{
    alert('请输入用户名')
}
function login(){
    var userID=$("#userID").val();
    var pwd=$("#pwd").val();
    /*
    if ('WebSocket' in window) {
        var ws = new WebSocket("ws://192.168.131.107:8080/websocket/"+userID);
    }
    else {
        alert('当前浏览器 Not support websocket');
    }


     */
    window.location.href="index.html?userID="+userID;
}
