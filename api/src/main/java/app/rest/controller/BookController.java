package app.rest.controller;


import app.rest.model.ApiError;
import app.rest.model.BookInfo;
import app.rest.model.CreateBookCommand;
import app.rest.model.CreateCommentCommand;
import app.services.BookService;
import app.services.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.ConstraintViolationException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/v1/books")
public class BookController {

    private final BookService bookService;

    private final ImageService imageService;

    public BookController(BookService bookService, ImageService imageService) {
        this.bookService = bookService;
        this.imageService = imageService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public BookInfo create(@RequestParam("file") MultipartFile image,
                           @RequestParam("name") String name,
                           @RequestParam("publisher") String publisher,
                           @RequestParam("datePublished") String datePublished,
                           @RequestParam("authorsIds") List<Long> authorsIds,
                           @RequestParam(value = "newAuthors", required = false) List<String> newAuthors) throws IOException {
        String compressImage = UUID.randomUUID().toString();

        imageService.compressAndSaveImage(image, compressImage);
        CreateBookCommand createBookCommand = null;
        if (newAuthors != null && newAuthors.size() > 0) {
            createBookCommand = new CreateBookCommand(name, publisher, LocalDate.parse(datePublished, DateTimeFormatter.ISO_LOCAL_DATE), authorsIds, newAuthors);
        } else {
            createBookCommand = new CreateBookCommand(name, publisher, LocalDate.parse(datePublished, DateTimeFormatter.ISO_LOCAL_DATE), authorsIds);
        }
        return bookService.save(createBookCommand, compressImage);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/comment")
    public BookInfo addComment(@RequestBody CreateCommentCommand createCommentCommand) {
        return bookService.saveComment(createCommentCommand);
    }

    @GetMapping(value = "/image/{image:.+}")
    public ResponseEntity<byte[]> getCover(@PathVariable String image) {
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageService.getImage(image));
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
