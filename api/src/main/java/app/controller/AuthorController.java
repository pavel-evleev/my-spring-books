package app.controller;

import app.command.CreateAuthorCommand;
import app.model.Author;
import app.model.Book;
import app.services.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/authors")
    public Author create(@RequestBody CreateAuthorCommand createAuthorCommand) {
        return authorService.save(createAuthorCommand);
    }
    @GetMapping("/authors")
    public List<Author> findAll() {
        return authorService.findAll();
    }

    @GetMapping("/authors/{authorId}")
    public Author findById(@RequestParam int authorId) {
        return authorService.findOne(authorId);
    }

    @GetMapping("/authors/{authorId}/books")
    public List<Book> findBooksAuthorById(@RequestParam int authorId){
        return authorService.findOne(authorId).getWrittenBooks();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/authors/{authorId}")
    public void deleteAuthor(int authorId) {
        authorService.delete(authorId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/authors")
    public void deleteAuthors() {
        authorService.deleteAll();
    }
}
