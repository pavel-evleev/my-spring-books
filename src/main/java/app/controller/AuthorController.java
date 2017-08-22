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

    @GetMapping("/addAuthor")
    public void addAuthor(@RequestParam String name,
                        HttpServletResponse response
    ) {
        Author book = new Author(name);
        authorService.save(book);
        try {
            response.sendRedirect("/author?id=" + book.getId());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/author")
    public String getAuthorFromId(@RequestParam int id) {
        return authorService.findOne(id).toString();
    }

    @GetMapping("/allAuthor")
    public String allAuthor() {
        return authorService.findAll().toString();
    }

    @RequestMapping(name = "/deleteAuthor", method = RequestMethod.DELETE)
    public HttpServletResponse deleteAuthor(int id, HttpServletResponse response) {
        authorService.delete(id);
        if (!authorService.exist(id))
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }

    @RequestMapping(name = "/deleteAuthors")
    public HttpServletResponse deleteAuthors(HttpServletResponse response) {
        authorService.deleteAll();
        if (authorService.count() == 0)
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }
}
