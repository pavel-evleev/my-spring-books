package app.services;

import app.repository.AuthorRepository;
import app.rest.model.BookInfo;
import app.rest.model.CreateBookCommand;
import app.model.Author;
import app.model.Book;
import app.repository.BookRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class BookService {

    private BookRepository bookRepository;

    private final AuthorRepository authorRepository;

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    public List<BookInfo> findAll() {
        return bookRepository.findAll().stream().map((bookItem) -> initBookInfo(bookItem)).collect(Collectors.toList());
    }

    public BookInfo findOne(Long id) {
        return initBookInfo(bookRepository.findOne(id));
    }

    private BookInfo initBookInfo(Book book) {
        return new BookInfo() {{
            setId(book.getId());
            setName(book.getName());
            setPublisher(book.getPublisher());
            setDatePublished(book.getDatePublished());
            if (book.getAuthors() != null)
                setAuthors(book.getAuthors().stream().map((authorItem) -> authorItem.getName()).collect(Collectors.toList()));
        }};
    }

    @Transactional
    public BookInfo save(CreateBookCommand book) {
        List<Long> authorsId = book.getAuthorsIds();
        Book newBook = new Book(book.name, book.publisher, Date.valueOf("2017-03-01"));
        if (authorsId != null) {
            List<Author> authors = authorsId.stream()
                    .map(id -> authorRepository.findOne(id)).collect(Collectors.toList());
            newBook.setAuthors(authors);
        }
        return initBookInfo(bookRepository.save(newBook));
    }

    @Transactional
    public List<BookInfo> save(Iterable<Book> list) {
        return bookRepository.save(list).stream().map((bookItem) -> initBookInfo(bookItem)).collect(Collectors.toList());
    }

    @Transactional
    public void delete(Long id) {
        bookRepository.delete(id);
    }

    @Transactional
    public void delete(Book book) {
        bookRepository.delete(book);
    }

    @Transactional
    public void deleteAll() {
        bookRepository.deleteAll();
    }


    public boolean exist(Long id) {
        return bookRepository.exists(id);

    }

    public long count() {
        return bookRepository.count();
    }
}
