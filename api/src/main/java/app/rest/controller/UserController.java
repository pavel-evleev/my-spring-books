package app.rest.controller;

import app.rest.model.*;
import app.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;

@RestController
@RequestMapping("/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService service) {
        this.userService = service;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public UserInfo create(@RequestBody CreateUserCommand createUserCommand) {
        return userService.save(createUserCommand);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/{userId}")
    public UserInfo addBooks(@RequestBody AddingBooks books){
        return userService.addBooks(books);
    }

    @GetMapping
    public List<UserInfo> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{userId}")
    public UserInfo findById(@PathVariable Long userId) {
        return userService.findOne(userId);
    }

    @GetMapping("/{userId}/books")
    public List<BookInfo> findBooks(@PathVariable Long userId) {
        return userService.findOne(userId).getBooks();
    }

    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{userId}/books/{bookId}")
    public void deleteBookFromUser(@PathVariable Long userId, @PathVariable Long bookId){
        userService.patch(userId, bookId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{userId}")
    public void delete(@PathVariable Long userId) {
        userService.delete(userId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping
    public void deleteAll() {
        userService.deleteAll();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleConstraintViolationException(ConstraintViolationException exception) {
        return new ApiError(exception.getMessage());
    }
}
