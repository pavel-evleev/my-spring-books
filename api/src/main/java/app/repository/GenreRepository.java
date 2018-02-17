package app.repository;

import app.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Pavel on 05.02.2018.
 */
public interface GenreRepository extends JpaRepository<Genre, Long> {
}
