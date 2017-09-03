package app.services;

import app.command.CreateBookCommand;
import app.model.Author;
import app.model.Book;
import app.repository.AuthorRepository;
import app.repository.BookRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDate;
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

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Book findOne(int id) {
        return bookRepository.findOne(id);
    }

    @Transactional
    public Book save(CreateBookCommand book) {
        List<Integer> authorsId = book.getAuthorsIds();
        List<Author> authors = authorsId.stream().map(id -> authorService.findOne(id)).collect(Collectors.toList());
        Book newBook = new Book(book.name, book.publisher, Date.valueOf(LocalDate.now()));
        newBook.setAuthors(authors);
        bookRepository.save(newBook);
        return newBook;
    }

    @Transactional
    public void delete(int id) {
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

    @Transactional
    public void save(Iterable<Book> list) {
        bookRepository.save(list);
    }

    public boolean exist(int id) {
        return bookRepository.exists(id);

    }

    public long count() {
        return bookRepository.count();
    }
}
