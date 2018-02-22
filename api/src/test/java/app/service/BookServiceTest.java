package app.service;

import app.model.Author;
import app.model.Book;
import app.model.Genre;
import app.repository.AuthorRepository;
import app.repository.BookRepository;
import app.repository.GenreRepository;
import app.rest.model.BookInfo;
import app.rest.model.CreateBookCommand;
import app.services.BookService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.core.env.Environment;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;


@RunWith(MockitoJUnitRunner.class)
public class BookServiceTest {

    @InjectMocks
    BookService bookService;

    @Mock
    GenreRepository genreRepository;
    @Mock
    BookRepository bookRepository;
    @Mock
    AuthorRepository authorRepository;
    @Mock
    Environment environment;

    @Before
    public void init() {
        given(environment.getProperty("image.url")).willReturn("MockEnv");
        given(genreRepository.findOne(1L)).willReturn(new Genre() {{
            setName("Magic");
        }});
    }

    @Test
    public void shouldCallBookRepositoryFindOneMethodInBookService_thenReturnBookInfo() {
        // given
        Book harryPotter = new Book();
        harryPotter.setName("Harry Potter");
        harryPotter.setDatePublished(Date.valueOf(LocalDate.now()));
        harryPotter.setPublisher("Soc");
        harryPotter.setDateCreated(Date.valueOf(LocalDate.now()));
        harryPotter.setId(1L);
        harryPotter.setGenre(new Genre() {{
            setId(1L);
            setName("Magic");
        }});
        given(bookRepository.findOne(harryPotter.getId())).willReturn(harryPotter);

        Long expectedBookId = harryPotter.getId();
        String expectedBookName = harryPotter.getName();
        String expectedBookPublisher = harryPotter.getPublisher();

        // when
        BookInfo returnedBook = bookService.findOne(1L);

        // then
        assertThat(returnedBook.getId()).isEqualTo(expectedBookId);
        assertThat(returnedBook.getName()).isEqualTo(expectedBookName);
        assertThat(returnedBook.getPublisher()).isEqualTo(expectedBookPublisher);
    }

    @Test
    public void shouldCallBookRepositoryFindAllMethodInBookService_thenReturnListOfBookInfo() {
        //given
        List<Book> expectedBooks = Arrays.asList(new Book() {{
            setId(1L);
            setName("Harry Potter");
            setDateCreated(Date.valueOf(LocalDate.now()));
        }}, new Book() {{
            setId(2L);
            setName("Java");
            setDateCreated(Date.valueOf(LocalDate.now()));
        }});

        List<Book> compareBooks = new ArrayList<>();
        compareBooks.addAll(expectedBooks);

        given(bookRepository.findAll()).willReturn(expectedBooks);
        //when
        List<BookInfo> returnedAuthors = bookService.findAll();
        //then
        assertThat(returnedAuthors.size()).isEqualTo(compareBooks.size());
    }

    @Test
    public void shouldCallBookRepositorySaveMethodInBookService_thenReturnBook() {
        //given
        LocalDate localDate = LocalDate.now();
        Date date = Date.valueOf(localDate);

        CreateBookCommand createBookCommand = new CreateBookCommand() {{
            setName("Piter Pen");
            setPublisher("LSC");
            setAuthorsIds(Arrays.asList(1L));
            setDatePublished(localDate);
            setDateCreated(localDate);
        }};

        Book book = new Book() {{
            setName(createBookCommand.getName());
            setPublisher(createBookCommand.getPublisher());
            setDatePublished(date);
            setDateCreated(date);
        }};
        book.setId(1L);
        book.setAuthors(Arrays.asList(new Author()));

        given(bookRepository.save(any(Book.class))).willReturn(book);
        given(authorRepository.findOne(anyLong())).willReturn(new Author());
        //when
        Book returnedBooks = bookService.save(createBookCommand, null);
        //then
        assertThat(returnedBooks).isNotNull();
        assertThat(returnedBooks.getName()).isEqualTo(createBookCommand.getName());
        assertThat(returnedBooks.getPublisher()).isEqualTo(createBookCommand.getPublisher());
        assertThat(returnedBooks.getDatePublished()).isEqualTo(date);
        assertThat(returnedBooks.getAuthors().size()).isEqualTo(book.getAuthors().size());
    }

    @Test
    public void shouldCallBookRepositoryDeleteByIdMethodInBookService() {
        bookService.delete(1211L);
        verify(bookRepository, times(1)).delete(anyLong());
    }

    @Test
    public void shouldCallBookRepositoryDeleteAllMethodInBookService() {
        bookService.deleteAll();
        verify(bookRepository, times(1)).deleteAll();
    }

    @Test
    public void shouldCallBookRepositoryDeleteBookEntityMethodInBookService() {
        bookService.delete(new Book());
        verify(bookRepository, times(1)).delete(any(Book.class));
    }
}
