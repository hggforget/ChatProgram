var input=document.getElementById("inputdata");
var out=document.getElementById("out");
var send=document.getElementById("send");

function getUrlParam(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象\
    var r = decodeURI(window.location.search.substr(1)).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}
send.addEventListener("click",clickFeedback,false);
function clickFeedback(){
    var str=input.innerText;
    input.innerText="";
    sendmessage(str);
   // cordova.plugins.MyToast.showToast(str,success,error); //后两个success, error参数省略不写
}
var back=document.getElementById("back");
back.addEventListener("click",jump,false);
function jump(){
    window.location.href="index.html?userID="+userID;
}
var userID=getUrlParam('userID');
var userName=getUrlParam('userName');
var chatType=getUrlParam('chatType');
var myimg=getUrlParam("myimg");
if(chatType=="contact")
{
    var firendName=getUrlParam('friendName');
    document.getElementById("chatName").innerText=firendName;
}
else
{
    var groupName=getUrlParam('groupName');
    document.getElementById("chatName").innerText=groupName;
}
function sendright(msg)
{
    var toast;
    toast = '\
               <div class="aui-chat-item aui-chat-right">\
                    <div class="aui-chat-media">\
                         <img src="'+myimg+'"/>\
                    </div>\
                <div class="aui-chat-inner">\
                     <div class="aui-chat-name">'+userName+'</div>\
                        <div class="aui-chat-content">\
                            <div class="aui-chat-arrow"></div>\
                            '+msg+'\
                             </div>\
                            </div>\
                            </div>\
        ';
    $("#out").append(toast);
}
function sendleft(from,msg,friendimg)
{
    var toappend;
    toappend = '\
       <div class="aui-chat-item aui-chat-left">\
        <div class="aui-chat-media">\
        <img src="'+friendimg+'" />\
        </div>\
    <div class="aui-chat-inner">\
        <div class="aui-chat-name">'+from+'<span class="aui-label aui-label-warning">2.0</span></div>\
        <div class="aui-chat-content">\
            <div class="aui-chat-arrow"></div>\
            ' + msg + '\
        </div>\
        <div class="aui-chat-status aui-chat-status-refresh">\
            <i class="aui-iconfont aui-icon-correct aui-text-success"></i>\
        </div>\
    </div>\
</div>\
    ';
    $("#out").append(toappend);
}
function sendmessage(msg){
    sendright(msg);
    if(chatType=="contact")
    {
        var jsonmsg = JSON.stringify({
            type: "sendMsg",
            userID: userID,
            friendID:getUrlParam('friendID'),
            timestamp:timestamp,
            tosend:msg,
        });
        ws.send(jsonmsg);
    }
    else{
        var jsonmsg = JSON.stringify({
            type: "groupTalk",
            userID: userID,
            groupID:getUrlParam('groupID'),
            timestamp:timestamp,
            tosend:msg,
        });
        ws.send(jsonmsg);
    }
}
function queryCon(){
    if(chatType=="contact") {
        var jsonmsg = JSON.stringify({
            type: "queryCon",
            userID: userID,
            friendID: getUrlParam('friendID'),
        });
    }
    else{
        var jsonmsg = JSON.stringify({
            type: "queryGroupMsg",
            userID: userID,
            groupID: getUrlParam('groupID'),
        });
    }
    ws.send(jsonmsg);
}
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
    console.log("connected");
    queryCon();
  //  sendmessage('hello');        // transmit "hello" after connecting
}
function onmessage(event) {
    var json=$.parseJSON(event.data);
    var type=json.type;
    if(type=="txMsg") {
        var srcName=json.srcName;
        var msg=json.msg;
        var srcimg=json.srcimg;
        sendleft(srcName,msg,srcimg);
    }
    else if(type=="conMsg" || type=="groupMsg")
    {
        var from=json.from;
        var fromName=json.fromName;
        var msg=json.msg;
        var img=json.friendimg;
        for(var i=0;i<from.length;i++)
        {
            if(from[i]==userID)
                sendright(msg[i]);
            else
            {
                if(type=="conMsg")
                {
                    sendleft(fromName,msg[i],img);
                }
                else
                {
                    sendleft(fromName[i],msg[i],img[i]);
                }

            }

        }
    }
}

function onerror () {
    alert('error occurred!');
}

function onclose (event) {
    alert('close code=' + event.code);
}

function error(data){
    alert(data);
}
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
    var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
    return Y+M+D+h+m+s;
}
var timestamp=new Date().getTime();