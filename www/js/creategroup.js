function getUrlParam(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象\
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}
var userID=getUrlParam('userID');
var namelist;
var idlist;
if ('WebSocket' in window) {
    var ws = new WebSocket("ws://192.168.131.107:8080/websocket/"+userID);
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
    QueryAlluser();
}
function QueryAlluser(){
    var jsonmsg = JSON.stringify({
        type: "QueryAlluser",
        userID: userID,
    });
    ws.send(jsonmsg);
}
function onmessage(event) {
    var json=$.parseJSON(event.data);
    var type=json.type;
    if(type=="Alluser")
    {
        idlist=json.idlist;
        namelist=json.namelist;
        for(var i=0;i<idlist.length;i++)
        {
            var contact='\
            <li class="aui-list-item aui-list-item-middle aui-clearfix aui-padded-l-15 aui-padded-r-15">\
    <!--  <p class="letter_left_single color_white" id="first">#</p>-->\
    <div class="aui-media-list-item-inner">\
    <label><input class="aui-radio" type="checkbox" name="check" value="'+idlist[i]+'"></label>\
    <div class="aui-list-item-media">\
    <img src="img/头像.jpg" class="aui-img-round aui-list-img-sm">\
    <!--<i class="aui-iconfont aui-icon-qq" style="font-size:30px; color: red;"></i>-->\
    </div>\
<div class="aui-list-item-inner">\
    <div class="aui-list-item-text">\
        <div class="aui-list-item-title">\
            <div class="aui-list-item-text aui-list-item-left">\
                <div class="aui-list-item-title aui-font-size-16 name">'+i+'</div>\
                <div class="aui-list-item-text aui-font-size-14 career aui-margin-l-10">'+namelist[i]+'</div>\
            </div>\
            <div class="aui-list-item-text">'+idlist[i]+'</div>\
        </div>\
    </div>\
</div>\
</div>\
</li>';
            $("#contacts").append(contact);
        }
    }
    else if(type=="addRet")
    {
        var ret=json.ret;
        if(ret==-1)
            alert("已添加该好友");
        else
            alert("添加成功");
    }
}

function onerror () {
    alert('error occurred!');
}

function onclose (event) {
    alert('close code=' + event.code);
}
function add(index){
    var jsonmsg = JSON.stringify({
        type: "addFriend",
        userID:userID,
        friendID: idlist[index],
    });
    ws.send(jsonmsg);
}
function jump(){
    window.location.href="index.html?userID="+userID;
}
function creategroup(){
        var  obj = document.getElementsByName("check");
        var name=document.getElementById("search-input").value;
        var checkbox=new Array();
        for(var i in obj){
            if(obj[i].checked){
                checkbox.push(obj[i].value);
            }
        }
    var jsonmsg = JSON.stringify({
        type: "createGroup",
        userID: userID,
        groupName:name,
        members:checkbox,
    });
    ws.send(jsonmsg);
    alert("创建成功");
}