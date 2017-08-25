package app.controller;

import app.model.User;
import app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public void addUser(@RequestParam String name,
                          @RequestParam String phone,
                          @RequestParam String password,
                          HttpServletResponse response){
        User user = new User(name,phone,password);
        userService.save(user);
        try {
            response.sendRedirect("/user?id="+user.getId());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/users")
    public String allUser(){
        return userService.findAll().toString();
    }

    @GetMapping(name = "/users/{user_id}")
    public String getUserFromId(@RequestParam int user_id ){
        return userService.findOne(user_id).toString();
    }

    @GetMapping(name = "/users/{user_id}/books")
    public String getUserBooks(@RequestParam int user_id){
        return userService.findOne(user_id).getBooks().toString();
    }

    @DeleteMapping(name = "/users/{user_id}")
    public HttpServletResponse deleteUser(int user_id, HttpServletResponse response) {
        userService.delete(user_id);
        if (!userService.exist(user_id))
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }

    @DeleteMapping(name = "/users")
    public HttpServletResponse deleteUsers(HttpServletResponse response) {
        userService.deleteAll();
        if (userService.count() == 0)
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }


}
