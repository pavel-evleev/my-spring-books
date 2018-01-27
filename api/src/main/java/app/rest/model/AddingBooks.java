package app.rest.model;

/**
 * Created by Pavel on 06.10.2017.
 */
public class AddingBooks {

    private Long userId;

    private Long ids;

    public Long getIds() {
        return ids;
    }

    public void setIds(Long ids) {
        this.ids = ids;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
