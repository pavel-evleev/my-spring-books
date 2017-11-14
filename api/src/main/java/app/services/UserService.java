package app.services;

import app.model.Book;
import app.model.User;
import app.repository.BookRepository;
import app.repository.UserRepository;
import app.rest.model.AddingBooks;
import app.rest.model.CreateUserCommand;
import app.rest.model.UserInfo;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final EmailVerifyService verifyService;
    private final BCryptPasswordEncoder encoder;

    public UserService(UserRepository userRepository, BookRepository bookRepository, EmailVerifyService verifyService, BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.verifyService = verifyService;
        this.encoder = encoder;
    }

    public List<UserInfo> findAll() {
        return userRepository.findAll().stream()
                .map(UserService::toUserInfo)
                .collect(Collectors.toList());
    }

    public UserInfo findOne(Long id) {
        return toUserInfo(userRepository.findOne(id));
    }

    public List<String> findNameLike(String name) {
        return userRepository.findByNameLike(name);
    }

    public static UserInfo toUserInfo(User user) {
        UserInfo userInfo = new UserInfo(user.getId(), user.getName(), user.getPhone(), user.getPassword(), user.getEmail());
        userInfo.setBooks(
                user.getBooks().stream()
                        .map(BookService::toBookInfo)
                        .collect(Collectors.toList())
        );
        return userInfo;
    }

    public boolean confirmEmail(String uuid) {
        Optional<User> optionalUser = userRepository.findByUuid(uuid);
        optionalUser.orElseThrow(() -> new ConstraintViolationException("Username not found", null));
        User user = optionalUser.get();
        user.setActive(true);
        userRepository.saveAndFlush(user);
        return true;
    }

    @Transactional
    public UserInfo save(CreateUserCommand user) {
        User newUser = new User(user.getName(), user.getPhone(), encoder.encode(user.getPassword()), user.getEmail());
        try {
            verifyService.verifyEmail(newUser);
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
        newUser = userRepository.save(newUser);
        System.out.println(newUser.getId());
        return toUserInfo(newUser);
    }

    @Transactional
    public void delete(Long id) {
        userRepository.delete(id);
    }


    @Transactional
    public void patch(Long id, Long bookId) {
        User user = userRepository.findOne(id);
        user.setBooks(user.getBooks().stream().filter(book -> !book.getId().equals(bookId)).collect(Collectors.toList()));
        User u = userRepository.saveAndFlush(user);
    }

    public UserInfo addBooks(AddingBooks books) {
        User user = userRepository.findOne(books.getUserId());
        List<Book> findBooks = bookRepository.findAll(books.getIds());
        user.getBooks().addAll(findBooks);
        return toUserInfo(userRepository.saveAndFlush(user));
    }


    @Transactional
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Transactional
    public void deleteAll() {
        userRepository.deleteAll();
    }

    public UserInfo findEmail(String email) {
        Optional<User> optional = userRepository.findByEmail(email);
        return toUserInfo(optional.get());
    }
}
