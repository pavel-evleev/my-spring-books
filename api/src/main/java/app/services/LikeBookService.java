package app.services;

import app.model.Book;
import app.model.LikeBook;
import app.model.User;
import app.repository.BookRepository;
import app.repository.LikeBookRepository;
import app.repository.UserRepository;
import app.rest.model.LikeBookCommand;
import app.rest.model.LikeBookInfo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Created by Pavel on 13.02.2018.
 */
@Service
public class LikeBookService {

    private LikeBookRepository likeBookRepository;
    private BookRepository bookRepository;
    private UserRepository userRepository;


    public LikeBookService(LikeBookRepository likeBookRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.likeBookRepository = likeBookRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public LikeBookInfo toggleLike(LikeBookCommand likeBookCommand) {
        Optional<LikeBook> ratingOptional = likeBookRepository.findByBookIdAndUserId(likeBookCommand.getBookId(), likeBookCommand.getUserId());

        LikeBook likeBook;
        LikeBookInfo likeBookInfo;

        if (ratingOptional.isPresent()) {
            likeBookRepository.delete(ratingOptional.get().getId());
        } else {
            Book book = bookRepository.findOne(likeBookCommand.getBookId());
            User user = userRepository.findOne(likeBookCommand.getUserId());
            likeBook = new LikeBook(book, user);
            likeBookRepository.saveAndFlush(likeBook);
        }

        Optional<List<LikeBook>> optional = likeBookRepository.findAllByBookId(likeBookCommand.getBookId());
        if (optional.isPresent()) {
            long count = optional.get().size();
            likeBookInfo = new LikeBookInfo(likeBookCommand.getBookId(), count);
            return likeBookInfo;
        }
        return new LikeBookInfo(likeBookCommand.getBookId(), 0L);
    }
}
