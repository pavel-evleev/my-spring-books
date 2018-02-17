package app.rest.controller;

import app.rest.model.AddingBooks;
import app.rest.model.BookInfo;
import app.rest.model.CreateUserCommand;
import app.rest.model.UserInfo;
import app.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/v1/users")
public class UserController extends ApiErrorController {

    private final UserService userService;

    public UserController(UserService service) {
        this.userService = service;
    }

    @PostMapping
    public ResponseEntity create(@RequestBody CreateUserCommand createUserCommand) {
        return userService.save(createUserCommand)
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


    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void logoutPage(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public void loginPage() {
    }

    @RequestMapping("/verify/{uuid}")
    public void confirmEmail(@PathVariable String uuid, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (userService.confirmEmail(uuid))
                response.sendRedirect("//localhost:8888");
            else
                response.sendRedirect("//localhost:8888/login");
        } catch (IOException e) {
            e.printStackTrace();

        }
    }
}
