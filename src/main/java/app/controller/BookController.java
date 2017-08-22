package app.controller;

import app.model.Book;
import app.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.time.LocalDate;


@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/addBook")
    public String addUser(@RequestParam String name,
                          @RequestParam String publisher
                          ){
        Book book = new Book(name,publisher,Date.valueOf(LocalDate.now()));
        bookService.save(book);
        return "ok";
    }

    @GetMapping("/allBooks")
    public String allUser(){
        return bookService.findAll().toString();
    }

    @GetMapping(value = "/Book")
    public String getUserFromId(@RequestParam int id ){
        return bookService.findOne(id).toString();
    }
}
