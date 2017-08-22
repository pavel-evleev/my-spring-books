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

    @GetMapping("/addUser")
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

    @GetMapping("/allUser")
    public String allUser(){
        return userService.findAll().toString();
    }

    @GetMapping("/user")
    public String getUserFromId(@RequestParam int id ){
        return userService.findOne(id).toString();
    }

    @GetMapping("/userBooks")
    public String getUserBooks(@RequestParam int id){
        return userService.findOne(id).getBooks().toString();
    }

    @RequestMapping(name = "/deleteUser", method = RequestMethod.DELETE)
    public HttpServletResponse deleteUser(int id, HttpServletResponse response) {
        userService.delete(id);
        if (!userService.exist(id))
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }

    @RequestMapping(name = "/deleteUsers")
    public HttpServletResponse deleteUsers(HttpServletResponse response) {
        userService.deleteAll();
        if (userService.count() == 0)
            response.setStatus(HttpServletResponse.SC_OK);
        else
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return response;
    }


}
