package app.rest.controller;


import app.rest.model.ApiError;
import app.rest.model.AuthorInfo;
import app.rest.model.BookInfo;
import app.rest.model.CreateAuthorCommand;
import app.services.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;

@RestController
@RequestMapping("/v1/authors")
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public AuthorInfo create(@RequestBody CreateAuthorCommand createAuthorCommand) {
        return authorService.save(createAuthorCommand);
    }

    @GetMapping
    public List<AuthorInfo> findAll() {
        return authorService.findAll();
    }

    @GetMapping("/{authorId}")
    public AuthorInfo findById(@PathVariable Long authorId) {
        return authorService.findOne(authorId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{authorId}")
    public void delete(@PathVariable Long authorId) {
        authorService.delete(authorId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping
    public void deleteAll() {
        authorService.deleteAll();
    }

    @GetMapping("/{authorId}/books")
    public List<BookInfo> findBooks(@PathVariable Long authorId) {
        return authorService.findOne(authorId).getBooks();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleConstraintViolationException(ConstraintViolationException exception) {
        return new ApiError(exception.getMessage());
    }
}
