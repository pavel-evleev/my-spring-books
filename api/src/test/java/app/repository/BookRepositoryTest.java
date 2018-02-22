package app.repository;

import app.Application;
import app.model.Book;
import app.model.Genre;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Date;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class BookRepositoryTest {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private GenreRepository genreRepository;

    private Book harryPotter;

    @Before
    public void initDb() {
        Genre genre = new Genre();
        genre.setName("Magic");
        genre = genreRepository.saveAndFlush(genre);
        // given
        Book harryPotter = new Book();
        harryPotter.setName("Harry Potter");
        harryPotter.setGenre(genre);
        harryPotter.setDatePublished(Date.valueOf(LocalDate.now()));
        harryPotter.setPublisher("Soc");
        harryPotter.setDateCreated(Date.valueOf(LocalDate.now()));

        this.harryPotter = bookRepository.saveAndFlush(harryPotter);
    }

    @After
    public void cleanDB() {
        genreRepository.deleteAll();
        bookRepository.deleteAll();
    }


    @Test
    public void whenFindByBookId_thenReturnBook() {

        // when
        Book found = bookRepository.findOne(1L);

        // then
        assertThat(found.getName())
                .isEqualTo(harryPotter.getName());
    }


}
