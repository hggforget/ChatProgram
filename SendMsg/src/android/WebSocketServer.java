import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/test/ws/{user_name}")
public class WebSocketServer {
    private String userName;
    private Session session;

    /**
     * To execute when it connected
     * @param userName
     * @param session
     */
    @OnOpen
    public void onOpen(@PathParam("user_name") String userName, Session session) {
        this.userName = userName;
        this.session = session;
        WebSocketUtils.serverClients.put(session.getId(), this);
    }

    /**
     * To execute when get message
     * @param message
     * @param session
     * @return
     */
    @OnMessage
    public String onMessage(String message, Session session) {
        System.out.println(this.userName + "：" + message);
        return this.userName + "：" + message;
    }

    /**
     * To execute when closed the connector
     * @param session
     * @param closeReason
     */
    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        WebSocketUtils.serverClients.remove(session.getId());
        System.out.println(String.format("Session %s closed because of %s", session.getId(), closeReason));
    }

    /**
     * To execute when an error occurs
     * @param t
     */
    @OnError
    public void onError(Throwable t) {
        t.printStackTrace();
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}
