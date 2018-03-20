package app.rest.model;

import app.model.Author;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Pavel on 08.09.2017.
 */
public class AuthorInfo {

    public AuthorInfo(){

    }

    public AuthorInfo(Author author){
        this.id = author.getId();
        this.name = author.getName();
    }

    public AuthorInfo(Long id, String name) {
      this.id = id;
      this.name = name;
    }

    private Long id;

    private String name;

    private List<BookInfo> books = null;

    private boolean approve;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public boolean isApprove() {
        return approve;
    }

    public void setApprove(boolean approve) {
        this.approve = approve;
    }
}
