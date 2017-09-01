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
    private AuthorRepository authorRepository;

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Book findOne(int id) {
        return bookRepository.findOne(id);
    }

    public Book save(CreateBookCommand book) {
        List<Integer> authorsId = book.getAuthorsIds();
        List<Author> authors = authorsId.stream().map(id->authorRepository.findOne(id)).collect(Collectors.toList());
        Book newBook = new Book(book.name,book.publisher, Date.valueOf(LocalDate.now()));
        newBook.setAuthors(authors);
        bookRepository.save(newBook);
        return newBook;
    }

    public void delete(int id) {
        bookRepository.delete(id);
    }

    public void delete(Book book) {
        bookRepository.delete(book);
    }

    public void deleteAll() {
        bookRepository.deleteAll();
    }

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
