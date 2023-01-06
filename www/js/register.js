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
/**
 *
 * @param img html的img标签
 * @param ext 图片格式
 * @returns {string}
 */
function getImageBase64(img, ext) {
    var canvas = document.createElement("canvas");   //创建canvas DOM元素，并设置其宽高和图片一样
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
    var dataURL = canvas.toDataURL("image/" + ext);  //返回的是一串Base64编码的URL并指定格式
    canvas = null; //释放
    return dataURL;
}
function uploadphoto(){
    $(".imgInput").click();
}
var img;
function readAsDataURL()
{
    if(typeof FileReader=='undifined')          //判断浏览器是否支持filereader
    {
        result.innerHTML="<p>抱歉，你的浏览器不支持 FileReader</p>";
        return false;
    }
    var file=$(".imgInput")[0].files[0];
    if(!/image\/\w+/.test(file.type))           //判断获取的是否为图片文件
    {
        alert("请确保文件为图像文件");
        return false;
    }
    var reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=function(e)
    {
        img=this.result;
        $(".img").attr("src",this.result);
    }

}
$(".imgInput").change(function() {
    readAsDataURL();
});
var userID=0;
if ('WebSocket' in window) {
    var ws = new WebSocket("ws://192.168.10.105:8080/websocket/"+userID);
}
else {
    alert('当前浏览器 Not support websocket');
}
ws.addEventListener("open",onopen,false);
ws.addEventListener("message",onmessage,false);
ws.addEventListener("error",onerror,false);
ws.addEventListener("close",onclose,false);

function onopen() {
      console.log('connected!');
    // sendmessage('hello');        // transmit "hello" after connecting
}
function onmessage(event){

    var json=$.parseJSON(event.data);
    var type=json.type;
    if(type=="regFd"){
        var userID=json.userID;
        alert("已分配黄宝号:"+userID);
        window.location.href="login.html";
    }
}
function onerror () {
    alert('error occurred!');
}

function onclose (event) {
    alert('close code=' + event.code);
}

function  register(){
    console.log(img);
    var msg = JSON.stringify({
        type: "register",
        img:img,
        userName:$("#userName").val(),
        pwd:$("#pwd").val(),
    });
    ws.send(msg);
}
/*
$(".imgInput").change(function(){
    $(".img").attr("src",URL.createObjectURL($(this)[0].files[0]));
    console.log()
});

 */
function jump(){
    window.location.href="login.html";
}


