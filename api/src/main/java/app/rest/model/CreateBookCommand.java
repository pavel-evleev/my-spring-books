package app.rest.model;

import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Pavel on 26.08.2017.
 */
public class CreateBookCommand {

    private String name;

    private String publisher;

    private LocalDate datePublished;

    private List<Long> authorsIds = new ArrayList<>();

    private List<String> newAuthors = new ArrayList<>();

    public CreateBookCommand(String name, String publisher, LocalDate datePublished, List<Long> authorsIds) {
        this.name = name;
        this.publisher = publisher;
        this.datePublished = datePublished;
        this.authorsIds = authorsIds;
    }

    public CreateBookCommand(String name, String publisher, LocalDate datePublished, List<Long> authorsIds, List<String> newAuthors) {
        this.name = name;
        this.publisher = publisher;
        this.datePublished = datePublished;
        this.authorsIds = authorsIds;
        this.newAuthors = newAuthors;
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
}
