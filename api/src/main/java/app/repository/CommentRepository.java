package app.repository;

import app.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Pavel on 16.01.2018.
 */
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
