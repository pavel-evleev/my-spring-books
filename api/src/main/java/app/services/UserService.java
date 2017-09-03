package app.services;

import app.command.CreateUserCommand;
import app.model.User;
import app.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findOne(int id) {
        return userRepository.findOne(id);
    }

    public User save(CreateUserCommand user) {
        User newUser = new User(user.getName(),user.getPhone(),user.getPassword());
        userRepository.save(newUser);
        return newUser;
    }

    public void delete(int id) {
        userRepository.delete(id);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }

    public void deleteAll() {
        userRepository.deleteAll();
    }

    public void save(Iterable<User> list) {
        userRepository.save(list);
    }


    public boolean exist(int id) {
        return userRepository.exists(id);
    }

    public long count() {
        return userRepository.count();
    }
}
