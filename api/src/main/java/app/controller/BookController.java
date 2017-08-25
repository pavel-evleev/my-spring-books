package app.controller;

import app.model.Book;
import app.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;


@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/books")
    public void addBook(@RequestParam String name,
                        @RequestParam String publisher, HttpServletResponse response
    ) {
        Book book = new Book(name, publisher, Date.valueOf(LocalDate.now()));
        bookService.save(book);
        try {
            response.sendRedirect("/books/" + book.getId());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GetMapping(name = "/books/{book_id}")
    public String getBookFromId(@RequestParam int book_id) {
        return bookService.findOne(book_id).toString();
    }

    @GetMapping("/books")
    public String allBooks() {
        return bookService.findAll().toString();
    }

    @DeleteMapping(name = "/books/{book_id}")
    public HttpServletResponse deleteBook(int book_id, HttpServletResponse response) {
        bookService.delete(book_id);
        if (!bookService.exist(book_id))
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }

    @DeleteMapping(name = "/books")
    public HttpServletResponse deleteBook(HttpServletResponse response) {
        bookService.deleteAll();
        if (bookService.count() == 0)
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }
}
