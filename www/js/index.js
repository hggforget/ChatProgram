/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
function getUrlParam(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象\
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}
var userName;
var namelist;
var idlist;
var groupNamelist;
var groupIDlist;
var myimg;
var imgs;
function jump(index){
    window.location.href=encodeURI("chat.html?chatType=contact&userID="+userID+"&friendID="+idlist[index]+"&userName="+userName+"&friendName="+namelist[index]+"&myimg="+myimg);
}
var userID=getUrlParam('userID');
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

function querymydata()
{
    var msg = JSON.stringify({
        type: "query_mydata",
        userID: userID,
    });
    ws.send(msg);
}
function queryuser()
{
    var msg = JSON.stringify({
        type: "query_Friendlist",
        userID: userID,
    });
    ws.send(msg);
}
function querygroup()
{
    var msg = JSON.stringify({
        type: "query_group",
        userID: userID,
    });
    ws.send(msg);
}


function onopen() {
  //  alert('connected!');
   querymydata();
    queryuser();
    querygroup();
  // sendmessage('hello');        // transmit "hello" after connecting
}

function onmessage(event) {
 //   alert(event.data);

    var json=$.parseJSON(event.data);
    var type=json.type;
    if(type=="MyData")
    {
        userName=json.userName;
        myimg=json.img;
        var userNamediv=document.getElementById("userName");
        userNamediv.innerText=userName;
        $("#myimg").attr("src",myimg);
    }
    else if(type=="FriendList")
    {
        namelist=json.friendsName;
        idlist=json.friendsID;
        imgs=json.friendsimg;
        for(var i=0;i<namelist.length;i++)
        {
            var contact='\
            <li class="aui-list-item aui-list-item-middle aui-clearfix aui-padded-l-0" onclick="jump('+i+')">\
    <!--  <p class="letter_left_single color_white" id="first">#</p>-->\
    <div class="aui-media-list-item-inner">\
    <div class="aui-list-item-media">\
    <img src="'+imgs[i]+'" class="aui-img-round aui-list-img-sm" style="object-fit: cover;">\
    <!--<i class="aui-iconfont aui-icon-qq" style="font-size:30px; color: red;"></i>-->\
    </div>\
<div class="aui-list-item-inner">\
    <div class="aui-list-item-text">\
        <div class="aui-list-item-title">\
            <div class="aui-list-item-text aui-list-item-left">\
                <div class="aui-list-item-title aui-font-size-16 name">好友</div>\
                <div class="aui-list-item-text aui-font-size-14 career aui-margin-l-10">'+namelist[i]+'</div>\
            </div>\
            <div class="aui-list-item-text">'+idlist[i]+'</div>\
        </div>\
        <a href="">\
            <div class="aui-list-item-right icon-more-info">\
                <i class="aui-iconfont aui-icon-phone" style="font-size:20px; color: red;"></i>\
            </div>\
        </a>\
    </div>\
</div>\
</div>\
</li>';
            $("#contacts").append(contact);
        }
    }
    else if(type=="groupList") {
        groupIDlist=json.groupIDlist;
        groupNamelist=json.groupNamelist;
        for (var i = 0; i < groupIDlist.length; i++) {
            var contact = '\
            <li class="aui-list-item aui-list-item-middle aui-clearfix aui-padded-l-0" onclick="groupchat(' + i + ')">\
    <!--  <p class="letter_left_single color_white" id="first">#</p>-->\
    <div class="aui-media-list-item-inner">\
    <div class="aui-list-item-media">\
    <img src="img/头像.jpg" class="aui-img-round aui-list-img-sm">\
    <!--<i class="aui-iconfont aui-icon-qq" style="font-size:30px; color: red;"></i>-->\
    </div>\
<div class="aui-list-item-inner">\
    <div class="aui-list-item-text">\
        <div class="aui-list-item-title">\
            <div class="aui-list-item-text aui-list-item-left">\
                <div class="aui-list-item-title aui-font-size-16 name">群聊</div>\
                <div class="aui-list-item-text aui-font-size-14 career aui-margin-l-10">' + groupNamelist[i] + '</div>\
            </div>\
            <div class="aui-list-item-text">' + groupIDlist[i] + '</div>\
        </div>\
        <a href="tel:10086">\
            <div class="aui-list-item-right icon-more-info">\
                <i class="aui-iconfont aui-icon-phone" style="font-size:20px; color: red;"></i>\
            </div>\
        </a>\
    </div>\
</div>\
</div>\
</li>';
            $("#contacts").append(contact);
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
function creategroup(){
    window.location.href="creategroup.html?userID="+userID;
}
function addfriend(){
    window.location.href="addfriend.html?userID="+userID;
}
function groupchat(index){
    window.location.href=encodeURI("chat.html?chatType=group&userID="+userID+"&groupID="+groupIDlist[index]+"&userName="+userName+"&groupName="+groupNamelist[index]+"&myimg="+myimg);
}