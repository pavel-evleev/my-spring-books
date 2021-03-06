package app.rest.controller;


import app.rest.exception.BookException;
import app.rest.model.*;
import app.services.*;
import com.mashape.unirest.http.exceptions.UnirestException;
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
    private final UserService userService;
    private final EmailNotifierService notifierService;

    public BookController(BookService bookService,
                          ImageService imageService,
                          CommentService commentService,
                          LikeBookService likeBookService,
                          EmailNotifierService notifierService,
                          UserService userService) {
        this.bookService = bookService;
        this.imageService = imageService;
        this.likeBookService = likeBookService;
        this.commentService = commentService;
        this.userService = userService;
        this.notifierService = notifierService;
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
                                 @RequestParam("userId") Long userId,
                                 @RequestParam(value = "newAuthors", required = false) List<String> newAuthors) throws BookException {

        CreateBookCommand createBookCommand = new CreateBookCommand(name, publisher,
                LocalDate.parse(datePublished, DateTimeFormatter.ISO_LOCAL_DATE),
                LocalDate.parse(dateCreated, DateTimeFormatter.ISO_LOCAL_DATE),
                authorsIds, newAuthors != null ? newAuthors : null, genreId);

        String compressImage = UUID.randomUUID().toString();
        if (image != null) {
            imageService.compressAndSaveImage(image, compressImage);
        }

        ResponseEntity responseEntity = userService.addBook(bookService.save(createBookCommand, image != null ? compressImage : null), userId)
                ? ResponseEntity.status(HttpStatus.CREATED).build() : ResponseEntity.badRequest().build();

        if (responseEntity.getStatusCode() == HttpStatus.CREATED) {
                notifierService.notifyAdmin("book");
        }

        return responseEntity;
    }

    @PostMapping("/comment")
    public ResponseEntity<CommentsInfo> addComment(@RequestBody CreateCommentCommand newEntity) throws BookException {
        return commentService.saveComment(newEntity)
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

    @PostMapping(value = "/search")
    public ResponseEntity<List<BookInfo>> searchBook(@RequestBody BookInfo book) {
        List<BookInfo> result = bookService.findBookLike(book);
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
                                    @RequestParam(value = "newAuthors", required = false) List<String> newAuthors,
                                    @RequestParam(value = "approve", required = false) Boolean approve) {

        return bookService.patchBook(bookId, name, image, publisher, authorsIds, genreId, newAuthors, imageService, approve)
                ? ResponseEntity.ok().build() :
                ResponseEntity.badRequest().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/admin/comment/approve")
    public ResponseEntity approveComment(@RequestParam("comId") Long id) {
        return ResponseEntity.ok(commentService.toggleApprove(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/comment/all")
    public ResponseEntity<List<CommentInfo>> findAllComments() {
        List<CommentInfo> result = commentService.findAll();
        return ResponseEntity.ok(result);
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
