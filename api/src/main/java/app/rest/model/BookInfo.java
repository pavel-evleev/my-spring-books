package app.rest.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class BookInfo {

    private Long id;

    private String name;

    private String cover;

    private Boolean approve;

    private Integer rating;

    private GenreInfo genre;

    private String publisher;

    private LocalDate datePublished;

    private LocalDate dateCreated;

    private List<String> authors = new ArrayList<>();

    private List<CommentInfo> comments = new ArrayList<>();

    public BookInfo() {

    }

    public BookInfo(Long id, String name, String cover) {
        this.id = id;
        this.name = name;
        this.cover = cover;
    }

    public BookInfo(Long id, String name, String publisher, LocalDate datePublished) {
        this.id = id;
        this.name = name;
        this.publisher = publisher;
        this.datePublished = datePublished;
    }

    public BookInfo(Long id, String name, String publisher, LocalDate datePublished, String cover) {
        this.id = id;
        this.name = name;
        this.cover = cover;
        this.publisher = publisher;
        this.datePublished = datePublished;
    }

    public BookInfo(Long id) {
        this.id = id;
    }

    public BookInfo(Long id, String name, LocalDate dateCreated) {
        this.id = id;
        this.name = name;
        this.dateCreated = dateCreated;
    }

    public GenreInfo getGenre() {
        return genre;
    }

    public void setGenre(GenreInfo genre) {
        this.genre = genre;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
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

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public LocalDate getDatePublished() {
        return datePublished;
    }

    public void setDatePublished(LocalDate datePublished) {
        this.datePublished = datePublished;
    }

    public List<String> getAuthors() {
        return authors;
    }

    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }

    public List<CommentInfo> getComments() {
        return comments;
    }

    public void setComments(List<CommentInfo> comments) {
        this.comments = comments;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Boolean getApprove() {
        return approve;
    }

    public void setApprove(Boolean approve) {
        this.approve = approve;
    }
}
