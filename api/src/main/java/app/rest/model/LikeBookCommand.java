package app.rest.model;

/**
 * Created by Pavel on 07.02.2018.
 */
public class LikeBookCommand {

    private Long userId;

    private Long bookId;

    public LikeBookCommand() {
    }

    public LikeBookCommand(Long userId, Long bookId) {
        this.userId = userId;
        this.bookId = bookId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

}
