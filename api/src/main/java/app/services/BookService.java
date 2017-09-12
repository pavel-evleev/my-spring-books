package app.services;

import app.view_model.BookInfo;
import app.view_model.CreateBookCommand;
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
    private AuthorService authorService;

    public BookService(BookRepository bookRepository, AuthorService authorService) {
        this.bookRepository = bookRepository;
        this.authorService = authorService;
    }

    public List<BookInfo> findAll() {
        return bookRepository.findAll().stream().map((i) -> initBookInfo(i)).collect(Collectors.toList());
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
                setAuthors(book.getAuthors().stream().map((i) -> i.getName()).collect(Collectors.toList()));
        }};
    }

    @Transactional
    public BookInfo save(CreateBookCommand book) {
        List<Long> authorsId = book.getAuthorsIds();
        List<Author> authors = authorsId.stream()
                .map(id -> authorService.findOneEntity(id)).collect(Collectors.toList());
        Book newBook = new Book(book.name,
                book.publisher, Date.valueOf("2017-03-01"));
        newBook.setAuthors(authors);
        return initBookInfo(bookRepository.save(newBook));

    }

    @Transactional
    public List<BookInfo> save(Iterable<Book> list) {
        return bookRepository.save(list).stream().map((i)->initBookInfo(i)).collect(Collectors.toList());
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
