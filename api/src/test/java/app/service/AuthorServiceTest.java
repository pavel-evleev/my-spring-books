package app.service;

import app.model.Author;
import app.repository.AuthorRepository;
import app.services.AuthorService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

/**
 * Created by Pavel on 05.09.2017.
 */
@RunWith(MockitoJUnitRunner.class)
public class AuthorServiceTest {

    @InjectMocks
    AuthorService authorService;

    @Mock
    AuthorRepository authorRepository;

    @Test
    public void should_call_author_repository_find_one_method_in_author_service() {
        // given
        Author expectedAuthor = new Author();
        expectedAuthor.setId(123);
        expectedAuthor.setName("My Name");
        given(authorRepository.findOne(1)).willReturn(expectedAuthor);

        // when
        Author author = authorService.findOne(1);

        // then
        assertThat(author.getId()).isEqualTo(123);
        assertThat(author.getName()).isEqualTo("My Name");
    }

}
