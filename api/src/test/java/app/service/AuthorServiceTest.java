package app.service;

import app.rest.model.AuthorInfo;
import app.rest.model.CreateAuthorCommand;
import app.model.Author;
import app.repository.AuthorRepository;
import app.services.AuthorService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

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
        expectedAuthor.setId(1L);
        expectedAuthor.setName("My Name");
        given(authorRepository.findOne(expectedAuthor.getId())).willReturn(expectedAuthor);

        Long expectedAuthorId = expectedAuthor.getId();
        String expectedAuthorName = expectedAuthor.getName();

        // when
        AuthorInfo author = authorService.findOne(1L);

        // then
        assertThat(author.getId()).isEqualTo(expectedAuthorId);
        assertThat(author.getName()).isEqualTo(expectedAuthorName);
    }

     @Test
    public void should_call_author_repository_find_all_method_in_author_service() {
        List<Author> expectedAuthors = Arrays.asList(new Author("Ivan"), new Author("Peta"));
        List<Author> compareAuthors = new ArrayList<>();
        compareAuthors.addAll(expectedAuthors);

        given(authorRepository.findAll()).willReturn(expectedAuthors);

        List<AuthorInfo> returnedAuthors = authorService.findAll();

        assertThat(returnedAuthors.size()).isEqualTo(compareAuthors.size());
    }

   @Test
    public void should_call_author_repository_save_method_in_author_service() {
        CreateAuthorCommand creCMD = new CreateAuthorCommand();
        creCMD.setName("Piter");

        Author author = new Author();
        author.setName(creCMD.getName());

        //here all right?
        given(authorRepository.save(author)).willReturn(author);

        AuthorInfo returnedAuthors = authorService.save(creCMD);

        assertThat(returnedAuthors.getName()).isEqualTo(author.getName());
        assertThat(returnedAuthors.getName()).isEqualTo(creCMD.getName());
    }

   @Test
    public void should_call_author_repository_delete_by_id_method_in_author_service() {
        authorService.delete(1211L);
        verify(authorRepository, times(1)).delete(anyLong());
    }

   @Test
    public void should_call_author_repository_delete_all_id_method_in_author_service() {
        authorService.deleteAll();
        verify(authorRepository, times(1)).deleteAll();
    }

}
