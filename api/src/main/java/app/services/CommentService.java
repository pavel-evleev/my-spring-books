package app.services;

import app.model.Book;
import app.model.Comment;
import app.model.User;
import app.repository.BookRepository;
import app.repository.CommentRepository;
import app.repository.UserRepository;
import app.rest.exception.BookException;
import app.rest.model.CommentInfo;
import app.rest.model.CommentsInfo;
import app.rest.model.CreateCommentCommand;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Pavel on 13.02.2018.
 */
@Service
@Transactional
public class CommentService {

    private BookRepository bookRepository;
    private UserRepository userRepository;
    private CommentRepository commentRepository;

    public CommentService(UserRepository userRepository, BookRepository bookRepository, CommentRepository commentRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }


    public boolean saveComment(CreateCommentCommand createCommentCommand) throws BookException {
        User authorComment = userRepository.findOne(createCommentCommand.getAuthorCommentId());
        Optional<Book> bookOptional = bookRepository.findByIdAndApprove(createCommentCommand.getBookId(), true);
        Book book = null;

        if (bookOptional.isPresent()) {
            book = bookOptional.get();
        } else throw new BookException();

        Comment newComment = new Comment();
        newComment.setAuthorComment(authorComment);
        newComment.setDatePublished(Date.valueOf(LocalDate.now()));
        newComment.setText(createCommentCommand.getText());

        book.addComment(newComment);
        if(bookRepository.saveAndFlush(book) !=null){
            return true;
        }
        return false;
    }

}
