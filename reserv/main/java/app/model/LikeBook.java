package app.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by Pavel on 07.02.2018.
 */
@Entity
@Table(name = "rating_book")
public class LikeBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "book_Id", nullable = false)
    private Book book;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_Id", nullable = false)
    private User user;


    public LikeBook() {
    }

    public LikeBook(Book book, User user) {
        this.book = book;
        this.user = user;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
