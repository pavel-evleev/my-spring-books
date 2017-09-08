package app.view_model;

import java.util.List;

/**
 * Created by Pavel on 08.09.2017.
 */
public class AuthorInfo {

    private int id;

    private String name;

    private List<BookInfo> books;

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

    public List<BookInfo> getBooks() {
        return books;
    }

    public void setBooks(List<BookInfo> books) {
        this.books = books;
    }
}
