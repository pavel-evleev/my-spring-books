package app.service;

import app.repository.AuthorRepository;
import app.rest.model.AuthorInfo;
import app.rest.model.BookInfo;
import app.rest.model.CreateBookCommand;
import app.model.Author;
import app.model.Book;
import app.repository.BookRepository;
import app.services.BookService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

/**
 * Created by Pavel on 05.09.2L01L7.
 */
@RunWith(MockitoJUnitRunner.class)
public class BookServiceTest {

    @InjectMocks
    BookService bookService;

    @Mock
    BookRepository bookRepository;
    @Mock
    AuthorRepository authorRepository;

    @Test
    public void should_call_book_repository_find_one_method_in_book_service() {
        // given
        Book book = new Book("Martin Luter", "SLT", Date.valueOf(LocalDate.now()));
        book.setId(1L);
        given(bookRepository.findOne(book.getId())).willReturn(book);

        Long expectedBookId = book.getId();
        String expectedBookName = book.getName();
        String expectedBookPublisher = book.getPublisher();

        // when
        BookInfo returnedBook = bookService.findOne(1L);

        // then
        assertThat(returnedBook.getId()).isEqualTo(expectedBookId);
        assertThat(returnedBook.getName()).isEqualTo(expectedBookName);
        assertThat(returnedBook.getPublisher()).isEqualTo(expectedBookPublisher);
    }

    @Test
    public void should_call_book_repository_find_all_method_in_book_service() {
        List<Book> expectedBooks = Arrays.asList(new Book() {{
            setId(1L);
        }}, new Book() {{
            setId(2L);
        }});

        List<Book> compareBooks = new ArrayList<>();
        compareBooks.addAll(expectedBooks);

        given(bookRepository.findAll()).willReturn(expectedBooks);

        List<BookInfo> returnedAuthors = bookService.findAll();

        assertThat(returnedAuthors.size()).isEqualTo(compareBooks.size());
    }

    @Test
    public void should_call_book_repository_save_method_in_book_service() {
        CreateBookCommand createBookCommand = new CreateBookCommand() {{
            name = "Piter Pen";
            publisher = "LSC";
            authorsIds = Arrays.asList(1L);
        }};

        Book book = new Book(
            createBookCommand.name,
            createBookCommand.publisher,
            Date.valueOf("2017-03-01")
        );
        book.setId(1L);
        book.setAuthors(Arrays.asList(new Author()));
        Date expectedDate = book.getDatePublished();

        given(bookRepository.save(any(Book.class))).willReturn(book);
        given(authorRepository.findOne(anyLong())).willReturn(new Author());

        BookInfo returnedBooks = bookService.save(createBookCommand);

        assertThat(returnedBooks.getName()).isEqualTo(createBookCommand.name);
        assertThat(returnedBooks.getPublisher()).isEqualTo(createBookCommand.publisher);
        assertThat(returnedBooks.getDatePublished()).isEqualTo(expectedDate);
        assertThat(returnedBooks.getAuthors().size()).isEqualTo(book.getAuthors().size());
    }

    @Test
    public void should_call_book_repository_delete_by_id_method_in_book_service() {
        bookService.delete(1211L);
        verify(bookRepository, times(1)).delete(anyLong());
    }

    @Test
    public void should_call_book_repository_delete_all_method_in_book_service() {
        bookService.deleteAll();
        verify(bookRepository, times(1)).deleteAll();
    }

    @Test
    public void should_call_book_repository_delete_book_entity_method_in_book_service() {
        bookService.delete(new Book());
        verify(bookRepository, times(1)).delete(any(Book.class));
    }

    @Test
    public void should_call_book_repository_exist_book_by_id_method_in_book_service() {

        given(bookRepository.exists(1L)).willReturn(true);

        Boolean existed = bookService.exist(1L);

        assertThat(existed).isTrue();
    }

    @Test
    public void should_call_book_repository_count_books_method_in_book_service() {

        given(bookRepository.count()).willReturn((long) 12);

        long expectedCount = bookService.count();

        assertThat(expectedCount).isEqualTo(12);
    }

}
