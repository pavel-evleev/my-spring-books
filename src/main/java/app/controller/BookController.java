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

    @GetMapping("/addBook")
    public void addBook(@RequestParam String name,
                        @RequestParam String publisher, HttpServletResponse response
    ) {
        Book book = new Book(name, publisher, Date.valueOf(LocalDate.now()));
        bookService.save(book);
        try {
            response.sendRedirect("/book?id=" + book.getId());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/book")
    public String getBookFromId(@RequestParam int id) {
        return bookService.findOne(id).toString();
    }

    @GetMapping("/allBooks")
    public String allBooks() {
        return bookService.findAll().toString();
    }

    @RequestMapping(name = "/deleteBook", method = RequestMethod.DELETE)
    public HttpServletResponse deleteBook(int id, HttpServletResponse response) {
        bookService.delete(id);
        if (!bookService.exist(id))
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }

    @RequestMapping(name = "/deleteBooks")
    public HttpServletResponse deleteBook(HttpServletResponse response) {
        bookService.deleteAll();
        if (bookService.count() == 0)
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }
}
