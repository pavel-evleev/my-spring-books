package app.rest.model;

import java.util.List;

/**
 * Created by Pavel on 06.10.2017.
 */
public class AddingBooks {

    private Long userId;

    private List<Long> ids;

    public List<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
