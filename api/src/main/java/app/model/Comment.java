package app.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;


/**
 * Created by Pavel on 16.01.2018.
 */
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(name = "text", nullable = false)
    private String text;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH},
            fetch = FetchType.EAGER)
    @JoinColumn(name = "author_comment_fk")
    private User authorComment;

    @NotNull
    @Column(name = "date_published", nullable = false)
    private Date datePublished;


    public Comment() {
    }

    public Comment(String text, User authorComment, Date datePublished) {
        this.text = text;
        this.authorComment = authorComment;
        this.datePublished = datePublished;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public User getAuthorComment() {
        return authorComment;
    }

    public Date getDatePublished() {
        return datePublished;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setAuthorComment(User authorComment) {
        this.authorComment = authorComment;
    }

    public void setDatePublished(Date datePublished) {
        this.datePublished = datePublished;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Comment comment = (Comment) o;

        if (id != null ? !id.equals(comment.id) : comment.id != null) return false;
        if (text != null ? !text.equals(comment.text) : comment.text != null) return false;
        if (authorComment != null ? !authorComment.equals(comment.authorComment) : comment.authorComment != null)
            return false;
        return datePublished != null ? datePublished.equals(comment.datePublished) : comment.datePublished == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (text != null ? text.hashCode() : 0);
        result = 31 * result + (authorComment != null ? authorComment.hashCode() : 0);
        result = 31 * result + (datePublished != null ? datePublished.hashCode() : 0);
        return result;
    }
}
