package app.controller;

import app.view_model.AuthorInfo;
import app.view_model.BookInfo;
import app.view_model.CreateAuthorCommand;
import app.services.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;

@RestController
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/authors")
    public AuthorInfo create(@RequestBody CreateAuthorCommand createAuthorCommand) {
        return authorService.save(createAuthorCommand);
    }

    @GetMapping("/authors")
    public List<AuthorInfo> findAll() {
        return authorService.findAll();
    }

    @GetMapping("/authors/{authorId}")
    public AuthorInfo findById(@PathVariable Long authorId) {
        return authorService.findOne(authorId);
    }

    @GetMapping("/authors/{authorId}/books")
    public List<BookInfo> findBooksByAuthorId(@PathVariable Long authorId) {
        return authorService.findOne(authorId).getBooks();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/authors/{authorId}")
    public void deleteAuthor(@PathVariable Long authorId) {
        authorService.delete(authorId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/authors")
    public void deleteAuthors() {
        authorService.deleteAll();
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void handleConstraintErrors() {
    }
}
