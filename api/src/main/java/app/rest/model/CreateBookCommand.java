package app.rest.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class CreateBookCommand {

    private String name;

    private String publisher;

    private Long genreId;

    private LocalDate datePublished;

    private LocalDate dateCreated;

    private List<Long> authorsIds = new ArrayList<>();

    private List<String> newAuthors = new ArrayList<>();

    public CreateBookCommand() {
    }

    public CreateBookCommand(String name, String publisher,
                             LocalDate datePublished, LocalDate dateCreated,
                             List<Long> authorsIds, List<String> newAuthors, Long genreId) {
        this.name = name;
        this.publisher = publisher;
        this.datePublished = datePublished;
        this.authorsIds = authorsIds;
        this.newAuthors = newAuthors != null ? newAuthors : new ArrayList<>();
        this.genreId = genreId;
        this.dateCreated = dateCreated;
    }

    public Long getGenreId() {
        return genreId;
    }

    public void setGenreId(Long genreId) {
        this.genreId = genreId;
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

    public List<Long> getAuthorsIds() {
        return authorsIds;
    }

    public void setAuthorsIds(List<Long> authorsIds) {
        this.authorsIds = authorsIds;
    }

    public List<String> getNewAuthors() {
        return newAuthors;
    }

    public void setNewAuthors(List<String> newAuthors) {
        this.newAuthors = newAuthors;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }
}
