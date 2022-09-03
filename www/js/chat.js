var input=document.getElementById("inputdata");
var out=document.getElementById("out");
var send=document.getElementById("send");


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
    window.location.href="index.html";
}
function sendmessage(msg){
    var toast;
    toast = '\
               <div class="aui-chat-item aui-chat-right">\
                    <div class="aui-chat-media">\
                         <img src="img/头像.jpg"/>\
                    </div>\
                <div class="aui-chat-inner">\
                     <div class="aui-chat-name">Anpu </div>\
                        <div class="aui-chat-content">\
                            <div class="aui-chat-arrow"></div>\
                            '+msg+'\
                             </div>\
                            </div>\
                            </div>\
        ';
    $("#out").append(toast);
    ws.send(msg);
}
if ('WebSocket' in window) {
    var ws = new WebSocket("ws://192.168.131.107:8080/websocket");
}

else {
    alert('当前浏览器 Not support websocket');
}
ws.addEventListener("open",onopen,false);
ws.addEventListener("message",onmessage,false);
ws.addEventListener("error",onerror,false);
ws.addEventListener("close",onclose,false);
function onopen() {
    sendmessage('hello');        // transmit "hello" after connecting
}
function onmessage(event) {
    var toappend;
    toappend='\
       <div class="aui-chat-item aui-chat-left">\
        <div class="aui-chat-media">\
        <img src="img/头像.jpg" />\
        </div>\
    <div class="aui-chat-inner">\
        <div class="aui-chat-name">Server <span class="aui-label aui-label-warning">2.0</span></div>\
        <div class="aui-chat-content">\
            <div class="aui-chat-arrow"></div>\
            '+event.data+'\
        </div>\
        <div class="aui-chat-status aui-chat-status-refresh">\
            <i class="aui-iconfont aui-icon-correct aui-text-success"></i>\
        </div>\
    </div>\
</div>\
    ';
    $("#out").append(toappend);
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

