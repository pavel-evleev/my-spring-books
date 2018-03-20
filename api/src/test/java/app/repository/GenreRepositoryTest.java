package app.repository;

import app.Application;
import app.model.Genre;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class GenreRepositoryTest {

    @Autowired
    private GenreRepository genreRepository;

    private Genre g1;

    private Genre g2;

    private Genre g3;

    @Before
    public void initDb() {
        Genre genre1 = new Genre("Scream", null);
        Genre genre2 = new Genre("Наука", null);
        Genre genre3 = new Genre("Фы", null);
        this.g1 = genreRepository.save(genre1);
        this.g2 = genreRepository.save(genre2);
        this.g3 = genreRepository.save(genre3);
    }

    @After
    public void cleanDB() {
        genreRepository.deleteAll();
    }


    @Test
    public void shouldFindById_thenReturnGenre(){

        Genre returnedGenre1 = genreRepository.findOne(g1.getId());
        Genre returnedGenre2 = genreRepository.findOne(g2.getId());
        Genre returnedGenre3 = genreRepository.findOne(g3.getId());

        assertThat(returnedGenre1.getName().equals(g1.getName())).isTrue();
        assertThat(returnedGenre2.getName().equals(g2.getName())).isTrue();
        assertThat(returnedGenre3.getName().equals(g3.getName())).isTrue();
    }

}
