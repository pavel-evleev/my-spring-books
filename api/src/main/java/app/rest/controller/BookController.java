package app.rest.controller;


import app.rest.exception.BookException;
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

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity create(@RequestParam(value = "file", required = false) MultipartFile image,
                                 @RequestParam("name") String name,
                                 @RequestParam("publisher") String publisher,
                                 @RequestParam("datePublished") String datePublished,
                                 @RequestParam("dateCreated") String dateCreated,
                                 @RequestParam("authorsIds") List<Long> authorsIds,
                                 @RequestParam("genreId") Long genreId,
                                 @RequestParam(value = "newAuthors", required = false) List<String> newAuthors) {

        CreateBookCommand createBookCommand = null;
        if (newAuthors != null) {
            createBookCommand = new CreateBookCommand(name, publisher, LocalDate.parse(datePublished, DateTimeFormatter.ISO_LOCAL_DATE),
                    LocalDate.parse(dateCreated, DateTimeFormatter.ISO_LOCAL_DATE), authorsIds, newAuthors, genreId);
        } else {
            createBookCommand = new CreateBookCommand(name, publisher, LocalDate.parse(datePublished, DateTimeFormatter.ISO_LOCAL_DATE),
                    LocalDate.parse(dateCreated, DateTimeFormatter.ISO_LOCAL_DATE), authorsIds, genreId);
        }

        if (image != null) {
            String compressImage = UUID.randomUUID().toString();

            imageService.compressAndSaveImage(image, compressImage);
            return bookService.save(createBookCommand, compressImage) != null
                    ? ResponseEntity.status(HttpStatus.CREATED).build() : ResponseEntity.badRequest().build();
        }
        return bookService.save(createBookCommand, null) != null
                ? ResponseEntity.status(HttpStatus.CREATED).build() : ResponseEntity.badRequest().build();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/comment")
    public ResponseEntity<CommentsInfo> addComment(@RequestBody CreateCommentCommand createCommentCommand) throws
            BookException {
        return commentService.saveComment(createCommentCommand)
                ? ResponseEntity.status(HttpStatus.CREATED).build() :
                ResponseEntity.badRequest().build();
    }

    @GetMapping("/genres")
    public ResponseEntity getAllGenre(HttpServletResponse response) {
        response.setHeader(HttpHeaders.CACHE_CONTROL, "public, max-age=" + TimeUnit.DAYS.toSeconds(365));
        response.setHeader(HttpHeaders.PRAGMA, null);

        List<GenreInfo> genres = bookService.findAllGenre();
        if (genres != null) {
            return ResponseEntity.ok(genres);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<BookInfo> findOneAndApproved(@PathVariable Long bookId) throws BookException {
        BookInfo result = bookService.findByIdAndApproved(bookId);
        return ResponseEntity.ok(result);
    }

    @GetMapping()
    public ResponseEntity<List<BookInfo>> findAllAndApproved() {
        List<BookInfo> result = bookService.findAllAndApproved();
        return ResponseEntity.ok(result);
    }


    @PostMapping("/toggle_rating")
    public ResponseEntity<LikeBookInfo> toggleLike(@RequestBody LikeBookCommand likeBookCommand) {
        LikeBookInfo info = likeBookService.toggleLike(likeBookCommand);
        return ResponseEntity.ok(info);
    }

    @GetMapping("/search/{bookLike}")
    public ResponseEntity<List<BookInfo>> searchBook(@PathVariable String bookLike) {
        List<BookInfo> result = bookService.findBookByNameLike(bookLike);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/admin", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity patchBook(@RequestParam("bookId") Long bookId,
                                    @RequestParam(value = "file", required = false) MultipartFile image,
                                    @RequestParam(value = "name", required = false) String name,
                                    @RequestParam(value = "publisher", required = false) String publisher,
                                    @RequestParam(value = "authorsIds", required = false) List<Long> authorsIds,
                                    @RequestParam(value = "genreId", required = false) Long genreId,
                                    @RequestParam(value = "newAuthors", required = false) List<String> newAuthors) {

        return bookService.patchBook(bookId, name, image, publisher, authorsIds, genreId, newAuthors, imageService)
                ? ResponseEntity.ok().build() :
                ResponseEntity.badRequest().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/all")
    public ResponseEntity<List<BookInfo>> findAll() {
        List<BookInfo> result = bookService.findAll();
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/{bookId}")
    public ResponseEntity<BookInfo> findOne(@PathVariable Long bookId) throws BookException {
        BookInfo result = bookService.findById(bookId);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{bookId}")
    public ResponseEntity delete(@PathVariable Long bookId) {
        bookService.delete(bookId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/all")
    public ResponseEntity deleteAll() {
        bookService.deleteAll();
        return ResponseEntity.ok().build();
    }


}
