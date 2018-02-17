package app.rest.controller;


import app.rest.model.*;
import app.services.BookService;
import app.services.CommentService;
import app.services.ImageService;
import app.services.LikeBookService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;


@RestController
@RequestMapping("/v1/books")
public class BookController extends ApiErrorController {

    private final BookService bookService;
    private final LikeBookService likeBookService;
    private final CommentService commentService;

    private final ImageService imageService;


    public BookController(BookService bookService,
                          ImageService imageService,
                          CommentService commentService,
                          LikeBookService likeBookService) {
        this.bookService = bookService;
        this.imageService = imageService;
        this.likeBookService = likeBookService;
        this.commentService = commentService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity create(@RequestParam(value = "file", required = false) MultipartFile image,
                                 @RequestParam("name") String name,
                                 @RequestParam("publisher") String publisher,
                                 @RequestParam("datePublished") String datePublished,
                                 @RequestParam("authorsIds") List<Long> authorsIds,
                                 @RequestParam("genreId") Long genreId,
                                 @RequestParam(value = "newAuthors", required = false) List<String> newAuthors) throws IOException {

        CreateBookCommand createBookCommand = null;
        if (newAuthors != null) {
            createBookCommand = new CreateBookCommand(name, publisher, LocalDate.parse(datePublished, DateTimeFormatter.ISO_LOCAL_DATE), authorsIds, newAuthors, genreId);
        } else {
            createBookCommand = new CreateBookCommand(name, publisher, LocalDate.parse(datePublished, DateTimeFormatter.ISO_LOCAL_DATE), authorsIds, genreId);
        }

        if (image != null) {
            String compressImage = UUID.randomUUID().toString();

            imageService.compressAndSaveImage(image, compressImage);
            return bookService.save(createBookCommand, compressImage)
                    ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
        }
        return bookService.save(createBookCommand, null)
                ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();

    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/comment")
    public CommentsInfo addComment(@RequestBody CreateCommentCommand createCommentCommand) {
        return commentService.saveComment(createCommentCommand);
    }

    @GetMapping("genres")
    public ResponseEntity getAllGenre(HttpServletResponse response) {
        response.setHeader(HttpHeaders.CACHE_CONTROL, "public, max-age=" + TimeUnit.DAYS.toSeconds(365));
        response.setHeader(HttpHeaders.PRAGMA, null);

        List<GenreInfo> genres = bookService.findAllGenre();
        if (genres != null) {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON_UTF8).body(genres);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping(value = "/image/{image:.+}")
    public ResponseEntity<byte[]> getCover(@PathVariable String image, HttpServletResponse response) {

        byte[] img = imageService.getImage(image);

        if (img != null) {
            response.setHeader(HttpHeaders.CACHE_CONTROL, "public, max-age=" + TimeUnit.DAYS.toSeconds(365));
            response.setHeader(HttpHeaders.PRAGMA, null);

            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG)
                    .body(img);
        }
        return ResponseEntity.noContent().build();
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

    @PostMapping("/toggle_rating")
    public ResponseEntity toggleLike(@RequestBody LikeBookCommand likeBookCommand) {
        LikeBookInfo info = likeBookService.toggleLike(likeBookCommand);
        return ResponseEntity.ok(info);
    }

}
