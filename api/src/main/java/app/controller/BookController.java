package app.controller;

import app.command.CreateBookCommand;
import app.model.Author;
import app.model.Book;
import app.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/books")
    public Book create(@RequestBody CreateBookCommand createBookCommand) {
        return bookService.save(createBookCommand);
    }

    @GetMapping("/books/{bookId}")
    public Book findById(@RequestParam int bookId) {
        return bookService.findOne(bookId);
    }

    @GetMapping("/books")
    public List<Book> findAll() {
        return bookService.findAll();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/books/{bookId}")
    public void deleteBook(int bookId) {
        bookService.delete(bookId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/books")
    public void deleteBook() {
        bookService.deleteAll();
    }
}
