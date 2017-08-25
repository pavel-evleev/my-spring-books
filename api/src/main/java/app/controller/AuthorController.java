package app.controller;

import app.model.Author;
import app.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;



@RestController
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @PostMapping(value = "/authors")
    public void addAuthor(@RequestParam String name,
                        HttpServletResponse response
    ) {
        Author book = new Author(name);
        authorService.save(book);
        try {
            response.sendRedirect("/authors/" + book.getId());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GetMapping(name = "/authors/{author_id}")
    public String getAuthorFromId(@RequestParam int author_id) {
        return authorService.findOne(author_id).toString();
    }

    @GetMapping("/authors")
    public String allAuthor() {
        return authorService.findAll().toString();
    }

    @DeleteMapping(name = "/authors/{author_id}")
    public HttpServletResponse deleteAuthor(int author_id, HttpServletResponse response) {
        authorService.delete(author_id);
        if (!authorService.exist(author_id))
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }

    @DeleteMapping(name = "/authors")
    public HttpServletResponse deleteAuthors(HttpServletResponse response) {
        authorService.deleteAll();
        if (authorService.count() == 0)
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }
}
