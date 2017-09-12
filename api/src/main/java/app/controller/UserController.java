package app.controller;

import app.view_model.BookInfo;
import app.view_model.CreateUserCommand;
import app.services.UserService;
import app.view_model.UserInfo;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService service) {
        this.userService = service;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users")
    public UserInfo create(@RequestBody CreateUserCommand createUserCommand) {
        return userService.save(createUserCommand);
    }

    @GetMapping("/users")
    public List<UserInfo> allUser() {
        return userService.findAll();
    }

    @GetMapping("/users/{userId}")
    public UserInfo findById(@PathVariable Long userId) {
        return userService.findOne(userId);
    }

    @GetMapping("/users/{userId}/books")
    public List<BookInfo> getUserBooks(@PathVariable Long userId) {
        return userService.findOne(userId).getBooks();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/users/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.delete(userId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/users")
    public void deleteUsers() {
        userService.deleteAll();
    }
}
