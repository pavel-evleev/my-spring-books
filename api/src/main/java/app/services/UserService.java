package app.services;

import app.model.Book;
import app.model.Role;
import app.model.User;
import app.repository.BookRepository;
import app.repository.UserRepository;
import app.rest.exception.UserExistedException;
import app.rest.model.AddingBooks;
import app.rest.model.CreateUserCommand;
import app.rest.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
public class UserService {

    private static String pathImg;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final EmailVerifyService verifyService;
    private final BCryptPasswordEncoder encoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       BookRepository bookRepository,
                       EmailVerifyService verifyService,
                       BCryptPasswordEncoder encoder,
                       Environment env) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.verifyService = verifyService;
        this.encoder = encoder;
        this.pathImg = env.getProperty("image.url");
    }

    public static UserInfo toUserInfoShortInfo(User user) {
        UserInfo info = new UserInfo();
        info.setId(user.getId());
        info.setName(user.getName());
        return info;
    }

    public static UserInfo toUserInfo(User user) {
        UserInfo userInfo = new UserInfo(user.getId(), user.getName(), user.getPhone(), user.getEmail());
        userInfo.setBooks(
                user.getBooks().stream().filter(b -> b.getApprove() != null ? b.getApprove() : false)
                        .map(b->BookService.toBookInfoShortInformation(b,true))
                        .collect(Collectors.toList())
        );
        userInfo.setLikedBooksIds(user.getLikeBooks().stream()
                .map(rating -> rating.getBook().getId())
                .collect(Collectors.toList()));

        if (user.getAvatar() != null) {
            userInfo.setAvatar(pathImg + user.getAvatar());
        }
        if (user.getRoles().size() > 0) {
            for (Role s : user.getRoles()) {
                if (s.getRole().equals("ADMIN"))
                    userInfo.setOmnipotent(true);
            }
        }
        return userInfo;
    }

    public List<UserInfo> findAll() {
        return userRepository.findAll().stream().map(UserService::toUserInfoShortInfo).collect(Collectors.toList());
    }

    public UserInfo findOne(Long id) {
        return toUserInfo(userRepository.findOne(id));
    }

    public List<String> findNameLike(String name) {
        return userRepository.findByNameLike(name);
    }


    public User save(CreateUserCommand user) throws UserExistedException {
        Optional<User> existed = userRepository.findByEmail(user.getEmail());
        if (existed.isPresent())
            throw new UserExistedException("This email already exist in the system, please login or choose another email.");

        User newUser = new User(user.getName(), user.getPhone(), encoder.encode(user.getPassword()), user.getEmail());
        try {
            verifyService.verifyEmail(newUser);
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
        return userRepository.save(newUser);
    }

    public void delete(Long id) {
        userRepository.delete(id);
    }


    public UserInfo patch(Long id, Long bookId) {
        User user = userRepository.findOne(id);
        user.setBooks(user.getBooks().stream().filter(book -> !book.getId().equals(bookId)).collect(Collectors.toList()));
        return toUserInfo(userRepository.saveAndFlush(user));
    }

    public boolean addBook(Book book, Long userId) {
        User user = userRepository.findOne(userId);
        ArrayList<Long> existBookId = user.getBooks().stream().map(Book::getId).collect(Collectors.toCollection(ArrayList::new));
        if (existBookId.contains(book.getId())) {
            return true;
        }
        user.getBooks().add(book);
        return userRepository.saveAndFlush(user) != null ? true : false;
    }

    public UserInfo addBooks(AddingBooks books) {
        User user = userRepository.findOne(books.getUserId());
        ArrayList<Long> existBookId = user.getBooks().stream().map(Book::getId).collect(Collectors.toCollection(ArrayList::new));
        if (existBookId.contains(books.getIds())) {
            return toUserInfo(user);
        }
        Book findBook = bookRepository.findById(books.getIds());
        user.getBooks().add(findBook);
        return toUserInfo(userRepository.saveAndFlush(user));
    }


    public void delete(User user) {
        userRepository.delete(user);
    }

    public void deleteAll() {
        userRepository.deleteAll();
    }

    public UserInfo findEmail(String email) {
        Optional<User> optional = userRepository.findByEmail(email);
        return toUserInfo(optional.get());
    }

    public String changeAvatar(Long userId, String compressImage) {
        User user = userRepository.findOne(userId);
        user.setAvatar(compressImage + ".jpg");
        return userRepository.saveAndFlush(user).getAvatar();
    }

    public Optional<String> getAvatarIfExist(Long userId) {
        return userRepository.findAvatarById(userId);
    }

    public boolean confirmEmail(String uuid) {
        return verifyService.confirmEmail(uuid);
    }
}
