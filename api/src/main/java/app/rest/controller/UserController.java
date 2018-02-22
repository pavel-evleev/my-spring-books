package app.rest.controller;

import app.rest.model.*;
import app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/v1/users")
public class UserController extends ApiErrorController {

    private final UserService userService;

    @Autowired
    Environment environment;

    public UserController(UserService service) {
        this.userService = service;
    }

    @PostMapping
    public ResponseEntity create(@RequestBody CreateUserCommand createUserCommand) throws UserExistedException {
        return userService.save(createUserCommand) != null
                ? new ResponseEntity(HttpStatus.CREATED) : new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/{userId}")
    public UserInfo addBooks(@RequestBody AddingBooks books) {
        return userService.addBooks(books);
    }

    @GetMapping
    public List<UserInfo> findAll() {
        return userService.findAll();
    }

    @GetMapping("/findNames/{name}")
    public List<String> findNameLike(@PathVariable String name) {
        return userService.findNameLike(name);
    }

    @GetMapping("/{userId}")
    public UserInfo findById(@PathVariable Long userId) {
        return userService.findOne(userId);
    }

    @PostMapping("findEmail")
    public UserInfo findEmail(@RequestBody CreateUserCommand userCommand) {
        return userService.findEmail(userCommand.getEmail());
    }

    @GetMapping("/{userId}/books")
    public List<BookInfo> findBooks(@PathVariable Long userId) {
        return userService.findOne(userId).getBooks();
    }

    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{userId}/books/{bookId}")
    public UserInfo deleteBookFromUser(@PathVariable Long userId, @PathVariable Long bookId) {
        return userService.patch(userId, bookId);
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

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public void loginPage() {
    }

    @RequestMapping("/verify/{uuid}")
    public void confirmEmail(@PathVariable String uuid, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (userService.confirmEmail(uuid))
                response.sendRedirect(environment.getProperty("verify.redirect.url"));
            else
                response.sendRedirect(environment.getProperty("verify.redirect.url") + "/registration");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
