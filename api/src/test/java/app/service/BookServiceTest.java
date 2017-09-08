package app.service;

import app.view_model.AuthorInfo;
import app.view_model.BookInfo;
import app.view_model.CreateBookCommand;
import app.model.Author;
import app.model.Book;
import app.repository.BookRepository;
import app.services.AuthorService;
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
 * Created by Pavel on 05.09.2017.
 */
@RunWith(MockitoJUnitRunner.class)
public class BookServiceTest {

    @InjectMocks
    BookService bookService;

    @Mock
    BookRepository bookRepository;
    @Mock
    AuthorService authorService;

    @Test
    public void should_call_book_repository_find_one_method_in_book_service() {
        // given
        Book book = new Book("Martin Luter", "SLT", Date.valueOf(LocalDate.now()));
        book.setId(1);
        given(bookRepository.findOne(book.getId())).willReturn(book);

        int expectedBookId = book.getId();
        String expectedBookName = book.getName();
        String expectedBookPublisher = book.getPublisher();

        // when
        BookInfo returnedBook = bookService.findOne(1);

        // then
        assertThat(returnedBook.getId()).isEqualTo(expectedBookId);
        assertThat(returnedBook.getName()).isEqualTo(expectedBookName);
        assertThat(returnedBook.getPublisher()).isEqualTo(expectedBookPublisher);
    }

    @Test
    public void should_call_book_repository_find_all_method_in_book_service() {
        List<Book> expectedBooks = Arrays.asList(new Book() {{
            setId(1);
        }}, new Book() {{
            setId(2);
        }});

        List<Book> compareBooks = new ArrayList<>();
        compareBooks.addAll(expectedBooks);

        given(bookRepository.findAll()).willReturn(expectedBooks);

        List<BookInfo> returnedAuthors = bookService.findAll();

        assertThat(returnedAuthors.size()).isEqualTo(compareBooks.size());
    }

    @Test
    public void should_call_book_repository_save_method_in_book_service() {
        CreateBookCommand creCMD = new CreateBookCommand() {{
            name = "Piter Pen";
            publisher = "LSC";
            authorsIds = Arrays.asList(1);
        }};

        Book book = new Book(creCMD.name,
                creCMD.publisher, Date.valueOf("2017-03-01"));

        book.setId(1);
        book.setAuthors(Arrays.asList(new Author()));
        Date expectedDate = book.getDatePublished();

        given(bookRepository.save(any(Book.class))).willReturn(book);
        given(authorService.findOne(anyInt())).willReturn(new AuthorInfo());

        BookInfo returnedBooks = bookService.save(creCMD);

        assertThat(returnedBooks.getName()).isEqualTo(creCMD.name);
        assertThat(returnedBooks.getPublisher()).isEqualTo(creCMD.publisher);
        assertThat(returnedBooks.getDatePublished()).isEqualTo(expectedDate);
        assertThat(returnedBooks.getAuthors().size()).isEqualTo(book.getAuthors().size());
    }

    @Test
    public void should_call_book_repository_delete_by_id_method_in_book_service() {
        bookService.delete(1211);
        verify(bookRepository, times(1)).delete(anyInt());
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

        given(bookRepository.exists(1)).willReturn(true);

        Boolean existed = bookService.exist(1);

        assertThat(existed).isTrue();
    }

    @Test
    public void should_call_book_repository_count_books_method_in_book_service() {

        given(bookRepository.count()).willReturn((long) 12);

        long expectedCount = bookService.count();

        assertThat(expectedCount).isEqualTo(12);
    }

}
