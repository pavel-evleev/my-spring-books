package app.rest.model;

/**
 * Created by Pavel on 16.01.2018.
 */
public class CreateCommentCommand {

    private Long bookId;

    private  String text;

    private Long authorCommentId;


    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getAuthorCommentId() {
        return authorCommentId;
    }

    public void setAuthorCommentId(Long authorCommenId) {
        this.authorCommentId = authorCommenId;
    }
}
