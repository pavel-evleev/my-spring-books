package app.controller;

import app.model.User;
import app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/home")
    public String home() {
        return "home";
    }
    @GetMapping("/addUser")
    public String addUser(@RequestParam String name,
                          @RequestParam String phone,
                          @RequestParam String password){
        User user = new User(name,phone,password);
        userService.save(user);
        return "ok";
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
}
