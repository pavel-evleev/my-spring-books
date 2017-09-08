package app.controller;

import app.view_model.BookInfo;
import app.view_model.CreateBookCommand;
import app.model.Book;
import app.services.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    public BookInfo findById(@PathVariable int bookId) {
        return bookService.findOne(bookId);
    }

    @GetMapping("/books")
    public List<BookInfo> findAll() {
        return bookService.findAll();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/books/{bookId}")
    public void deleteBook(@PathVariable int bookId) {
        bookService.delete(bookId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/books")
    public void deleteBook() {
        bookService.deleteAll();
    }
}
