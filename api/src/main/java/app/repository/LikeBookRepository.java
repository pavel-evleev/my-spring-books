package app.repository;

import app.model.LikeBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Created by Pavel on 07.02.2018.
 */
public interface LikeBookRepository extends JpaRepository<LikeBook, Long> {
    Optional<LikeBook> findByBookIdAndUserId(Long bookId, Long userId);
}
