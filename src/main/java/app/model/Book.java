package app.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name_book")
    private String name;
    @Column(name = "publisher")
    private String publisher;

    @Column(name = "date_publisher")
    private Date datePublished;
    @ManyToMany(mappedBy = "books")
    private List<User> users;

    @ManyToMany(mappedBy = "writedBooks")
    private List<Author> authors;


    public Book(){}

    public Book(String name, String publisher, Date datePublished) {
        this.name = name;
        this.publisher = publisher;
        this.datePublished = datePublished;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Date getDatePublished() {
        return datePublished;
    }

    public void setDatePublished(Date datePublished) {
        this.datePublished = datePublished;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Book book = (Book) o;

        if (id != book.id) return false;
        if (name != null ? !name.equals(book.name) : book.name != null) return false;
        if (publisher != null ? !publisher.equals(book.publisher) : book.publisher != null) return false;
        if (datePublished != null ? !datePublished.equals(book.datePublished) : book.datePublished != null)
            return false;
        if (users != null ? !users.equals(book.users) : book.users != null) return false;
        return authors != null ? authors.equals(book.authors) : book.authors == null;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (publisher != null ? publisher.hashCode() : 0);
        result = 31 * result + (datePublished != null ? datePublished.hashCode() : 0);
        result = 31 * result + (users != null ? users.hashCode() : 0);
        result = 31 * result + (authors != null ? authors.hashCode() : 0);
        return result;
    }


    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", publisher='" + publisher + '\'' +
                ", datePublished=" + datePublished +
//                ", users=" + users +
//                ", authors=" + authors +
                '}';
    }
}
