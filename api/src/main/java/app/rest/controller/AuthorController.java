package app.rest.controller;


import app.rest.model.AuthorInfo;
import app.rest.model.BookInfo;
import app.rest.model.CreateAuthorCommand;
import app.services.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/authors")
public class AuthorController extends ApiErrorController {

    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @PostMapping
    public ResponseEntity<AuthorInfo> create(@RequestBody CreateAuthorCommand createAuthorCommand) {
        AuthorInfo result = authorService.save(createAuthorCommand);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/all")
    public ResponseEntity<List<AuthorInfo>> findAll() {
        List<AuthorInfo> result = authorService.findAll();
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/admin/edit")
    public ResponseEntity<AuthorInfo> editAuthor(@RequestParam(value = "authorId") Long authorId,
                                     @RequestParam(value = "newName", required = false) String newName,
                                     @RequestParam(value = "approve", required = false) Boolean approve) {
        AuthorInfo result = authorService.patch(authorId,newName,approve);
        return ResponseEntity.ok(result);
    }

    @GetMapping()
    public ResponseEntity<List<AuthorInfo>> findAllAndApprove() {
        List<AuthorInfo> result = authorService.findAllAndApproved();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{authorId}")
    public ResponseEntity<AuthorInfo> findById(@PathVariable Long authorId) {
        AuthorInfo result = authorService.findOne(authorId);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{authorId}")
    public ResponseEntity delete(@PathVariable Long authorId) {
        authorService.delete(authorId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping
    public ResponseEntity deleteAll() {
        authorService.deleteAll();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{authorId}/books")
    public ResponseEntity<List<BookInfo>> findBooks(@PathVariable Long authorId) {
        List<BookInfo> result = authorService.findOne(authorId).getBooks();
        return ResponseEntity.ok(result);
    }


}
