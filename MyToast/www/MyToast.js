var exec = require('cordova/exec');

exports.showToast = function(msg, success, error) {
    //"showToast"为给MyToast.java判断的action名
    exec(success, error, "MyToast", "showToast", [msg]);
}