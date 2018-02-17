package app.rest.model;

import app.model.User;

import java.sql.Date;

/**
 * Created by Pavel on 16.01.2018.
 */
public class CommentInfo {

    private String text;

    private UserInfo authorComment;

    private Date datePublished;

    public CommentInfo(String text, User authorComment, Date datePublished) {
        this.text = text;
        this.authorComment = new UserInfo(authorComment.getId(), authorComment.getName());
        this.datePublished = datePublished;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public UserInfo getAuthorComment() {
        return authorComment;
    }

    public void setAuthorComment(UserInfo authorComment) {
        this.authorComment = authorComment;
    }

    public Date getDatePublished() {
        return datePublished;
    }

    public void setDatePublished(Date datePublished) {
        this.datePublished = datePublished;
    }
}
