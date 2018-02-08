package app.rest.model;

import java.util.ArrayList;
import java.util.List;


public class UserInfo {

    public UserInfo(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public UserInfo(Long id, String name, String phone, String email) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    private Long id;

    private String name;

    private String phone;

    private String email;

    private List<BookInfo> books = new ArrayList<>();

    private List<Long> likedBooksIds = new ArrayList<>();

    public List<Long> getLikedBooksIds() {
        return likedBooksIds;
    }

    public void setLikedBooksIds(List<Long> likedBooksIds) {
        this.likedBooksIds = likedBooksIds;
    }

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<BookInfo> getBooks() {
        return books;
    }

    public void setBooks(List<BookInfo> books) {
        this.books = books;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
