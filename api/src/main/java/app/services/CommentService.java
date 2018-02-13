package app.services;

import app.model.Book;
import app.model.Comment;
import app.model.User;
import app.repository.BookRepository;
import app.repository.CommentRepository;
import app.repository.UserRepository;
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


    public CommentsInfo saveComment(CreateCommentCommand createCommentCommand) {
        User authorComment = userRepository.findOne(createCommentCommand.getAuthorCommentId());
        Book book = bookRepository.findOne(createCommentCommand.getBookId());

        Comment newComment = new Comment();
        newComment.setAuthorComment(authorComment);
        newComment.setDatePublished(Date.valueOf(LocalDate.now()));
        newComment.setText(createCommentCommand.getText());

        book.addComment(newComment);
        bookRepository.saveAndFlush(book);

        Optional<List<Comment>> optional = commentRepository.findCommentByBookId(book.getId());


        List<Comment> comments;
        List<CommentInfo> commentInfos;
        if (optional.isPresent()) {
            comments = optional.get();

            commentInfos = comments.stream().map(comment ->
                    new CommentInfo(comment.getText(), comment.getAuthorComment(), comment.getDatePublished()))
                    .collect(Collectors.toList());
        } else {
            commentInfos = new ArrayList<>();
        }
        return new CommentsInfo(book.getId(), commentInfos);
    }

}
