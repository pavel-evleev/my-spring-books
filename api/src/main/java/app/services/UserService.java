package app.services;

import app.model.User;
import app.repository.UserRepository;
import app.rest.model.CreateUserCommand;
import app.rest.model.UserInfo;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserInfo> findAll() {
        return userRepository.findAll().stream()
            .map(UserService::toUserInfo)
            .collect(Collectors.toList());
    }

    public UserInfo findOne(Long id) {
        return toUserInfo(userRepository.findOne(id));
    }

    public static UserInfo toUserInfo(User user) {
        UserInfo userInfo = new UserInfo(user.getId(), user.getName(), user.getPhone(), user.getPassword());
        userInfo.setBooks(
            user.getBooks().stream()
                .map(BookService::toBookInfo)
                .collect(Collectors.toList())
        );
        return userInfo;
    }

    @Transactional
    public UserInfo save(CreateUserCommand user) {
        User newUser = new User(user.getName(), user.getPhone(), user.getPassword());
        return toUserInfo(userRepository.save(newUser));
    }

    @Transactional
    public void delete(Long id) {
        userRepository.delete(id);
    }

    @Transactional
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Transactional
    public void deleteAll() {
        userRepository.deleteAll();
    }
}
