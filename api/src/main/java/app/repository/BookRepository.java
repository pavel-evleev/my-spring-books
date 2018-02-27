package app.repository;

import app.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface BookRepository extends JpaRepository<Book, Long> {
    Book findById(Long ids);

    Optional<List<Book>> findByNameContaining(String bookLike);
}
