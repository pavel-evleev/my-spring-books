package app.services;

import app.model.User;
import app.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
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

    public void save(User user) {
        userRepository.save(user);
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


}
