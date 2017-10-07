package app.services;

import app.model.Book;
import app.model.User;
import app.repository.BookRepository;
import app.repository.UserRepository;
import app.rest.model.AddingBooks;
import app.rest.model.CreateUserCommand;
import app.rest.model.UserInfo;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public UserService(UserRepository userRepository, BookRepository bookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
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
    public void patch(Long id, Long bookId) {
       User user = userRepository.findOne(id);
       user.setBooks(user.getBooks().stream().filter(book -> !book.getId().equals(bookId)).collect(Collectors.toList()));
       User u = userRepository.saveAndFlush(user);
    }

    public UserInfo addBooks(AddingBooks books){
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
}
