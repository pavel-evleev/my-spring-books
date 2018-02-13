package app.repository;

import app.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * Created by Pavel on 16.01.2018.
 */
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "select * from books_comments " +
            "INNER JOIN comments ON  books_comments.comment_id = comments.id " +
            "INNER JOIN books ON books_comments.book_id = books.id WHERE book_id=:id", nativeQuery = true)
    Optional<List<Comment>> findCommentByBookId(@Param("id") Long id);


}
