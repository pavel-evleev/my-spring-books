package app.repository;

import app.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AuthorRepository extends JpaRepository<Author, Long> {

    List<Author> findAllByApprove(Boolean b);
}
