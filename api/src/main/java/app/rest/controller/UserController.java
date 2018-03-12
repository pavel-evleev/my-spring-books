package app.rest.controller;

import app.rest.exception.UserExistedException;
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

    @PostMapping("/{userId}")
    public ResponseEntity<UserInfo> addBooks(@RequestBody AddingBooks books) {
        UserInfo result = userService.addBooks(books);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<List<UserInfo>> findAll() {
        List<UserInfo> result = userService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/findNames/{name}")
    public ResponseEntity<List<String>> findNameLike(@PathVariable String name) {
        List<String> result = userService.findNameLike(name);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserInfo> findById(@PathVariable Long userId) {
        UserInfo result = userService.findOne(userId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("findEmail")
    public ResponseEntity<UserInfo> findEmail(@RequestBody CreateUserCommand userCommand) {
        UserInfo result = userService.findEmail(userCommand.getEmail());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{userId}/books")
    public ResponseEntity<List<BookInfo>> findBooks(@PathVariable Long userId) {
        List<BookInfo> result = userService.findOne(userId).getBooks();
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/{userId}/books/{bookId}")
    public ResponseEntity<UserInfo> deleteBookFromUser(@PathVariable Long userId, @PathVariable Long bookId) {
        UserInfo result = userService.patch(userId, bookId);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity delete(@PathVariable Long userId) {
        userService.delete(userId);
        return ResponseEntity.ok().build();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping
    public ResponseEntity deleteAll() {
        userService.deleteAll();
        return ResponseEntity.ok().build();
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
