package app.rest.model;

import java.util.List;


public class CommentsInfo {

    private Long bookId;

    private List<CommentInfo> comments;

    public CommentsInfo() {
    }

    public CommentsInfo(Long bookId, List<CommentInfo> comments) {
        this.bookId = bookId;
        this.comments = comments;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public List<CommentInfo> getComments() {
        return comments;
    }

    public void setComments(List<CommentInfo> comments) {
        this.comments = comments;
    }
}
