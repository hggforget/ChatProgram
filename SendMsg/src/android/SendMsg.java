package cordova.plugin.sendmsg;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import android.app.Activity;
import android.content.Intent;
import android.widget.Toast;
import android.os.Bundle;
import android.util.Log;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class SendMsg extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("SendMsg")) {
            String message = args.getString(0);
            this.SendMsg(message, callbackContext);
            return true;
        }
        return false;
    }

    private void SendMsg(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            Activity activity = this.cordova.getActivity();
            Toast.makeText(activity, message, Toast.LENGTH_SHORT).show();
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
