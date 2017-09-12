package app.rest.controller;


import app.rest.model.BookInfo;
import app.rest.model.CreateBookCommand;
import app.services.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;


@RestController
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/books")
    public BookInfo create(@RequestBody CreateBookCommand createBookCommand) {
        return bookService.save(createBookCommand);
    }

    @GetMapping("/books/{bookId}")
    public BookInfo findById(@PathVariable Long bookId) {
        return bookService.findOne(bookId);
    }

    @GetMapping("/books")
    public List<BookInfo> findAll() {
        return bookService.findAll();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/books/{bookId}")
    public void deleteBook(@PathVariable Long bookId) {
        bookService.delete(bookId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/books")
    public void deleteBook() {
        bookService.deleteAll();
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void handleConstraintErrors() {
    }
}
