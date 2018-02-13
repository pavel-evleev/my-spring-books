package app.rest.model;

/**
 * Created by Pavel on 13.02.2018.
 */
public class DeleteRefreshToken {

    private String refresh_token;

    public DeleteRefreshToken() {
    }

    public DeleteRefreshToken(String refresh_token) {
        this.refresh_token = refresh_token;
    }

    public String getRefresh_token() {
        return refresh_token;
    }

    public void setRefresh_token(String refresh_token) {
        this.refresh_token = refresh_token;
    }
}
