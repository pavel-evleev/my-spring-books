package app.controller;

import app.command.CreateUserCommand;
import app.model.Book;
import app.model.User;
import app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService service){
        this.userService=service;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users")
    public User create(@RequestBody CreateUserCommand createUserCommand) {
        return userService.save(createUserCommand);
    }

    @GetMapping("/users")
    public List<User> allUser() {
        return userService.findAll();
    }

    @GetMapping("/users/{userId}")
    public User getUserFromId(@PathVariable int userId) {
        return userService.findOne(userId);
    }

    @GetMapping("/users/{userId}/books")
    public List<Book> getUserBooks(@PathVariable int userId) {
        return userService.findOne(userId).getBooks();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/users/{userId}")
    public void deleteUser(@PathVariable int userId) {
        userService.delete(userId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/users")
    public void deleteUsers() {
        userService.deleteAll();
    }
}
