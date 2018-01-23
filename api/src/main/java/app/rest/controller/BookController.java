package app.rest.controller;


import app.rest.model.ApiError;
import app.rest.model.BookInfo;
import app.rest.model.CreateBookCommand;
import app.rest.model.CreateCommentCommand;
import app.services.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.validation.ConstraintViolationException;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Date;
import java.util.List;


@RestController
@RequestMapping("/v1/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public BookInfo create(@RequestParam("file") MultipartFile image,
                           @RequestParam("name") String name,
                           @RequestParam("publisher") String publisher,
                           @RequestParam("datePublished") String datePublished,
                           @RequestParam("authorsIds") List<Long> authorsIds) throws IOException {
        try (InputStream stream = image.getInputStream()) {
            String imgName = image.getOriginalFilename();
            BufferedImage im = null;
            im = ImageIO.read(stream);
            ImageIO.write(im, "jpg", new File("D:\\testImage\\" + imgName));
        }

        CreateBookCommand createBookCommand = new CreateBookCommand(name, publisher, Date.valueOf(datePublished), authorsIds);
        return bookService.save(createBookCommand);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/comment")
    public BookInfo addComment(@RequestBody CreateCommentCommand createCommentCommand) {
        return bookService.saveComment(createCommentCommand);
    }

    @GetMapping("/{bookId}")
    public BookInfo findById(@PathVariable Long bookId) {
        return bookService.findOne(bookId);
    }

    @GetMapping
    public List<BookInfo> findAll() {
        return bookService.findAll();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{bookId}")
    public void delete(@PathVariable Long bookId) {
        bookService.delete(bookId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping
    public void deleteAll() {
        bookService.deleteAll();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleConstraintViolationException(ConstraintViolationException exception) {
        return new ApiError(exception.getMessage());
    }
}
