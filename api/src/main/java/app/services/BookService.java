package app.services;

import app.model.Book;
import app.repository.BookRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Book findOne(int id) {
        return bookRepository.findOne(id);
    }

    public void save(Book book) {
        bookRepository.save(book);
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
