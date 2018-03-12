package app.services;

import app.model.Author;
import app.model.Book;
import app.model.Genre;
import app.repository.AuthorRepository;
import app.repository.BookRepository;
import app.repository.GenreRepository;
import app.rest.exception.BookException;
import app.rest.model.BookInfo;
import app.rest.model.CommentInfo;
import app.rest.model.CreateBookCommand;
import app.rest.model.GenreInfo;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
public class BookService {

    private static String pathImg;
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    public BookService(BookRepository bookRepository,
                       AuthorRepository authorRepository,
                       GenreRepository genreRepository,
                       Environment env) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.genreRepository = genreRepository;
        this.pathImg = env.getProperty("image.url");
    }

    public static BookInfo toBookInfo(Book book) {
        BookInfo bookInfo = new BookInfo(book.getId(), book.getName(), book.getPublisher(), book.getDatePublished().toLocalDate());
        bookInfo.setAuthors(
                book.getAuthors().stream()
                        .map(Author::getName)
                        .collect(Collectors.toList())
        );
        if (book.getComments() != null) {
            bookInfo.setComments(
                    book.getComments().stream().filter(comment -> comment.getApprove()).map(comment ->
                            new CommentInfo(comment.getText(), comment.getAuthorComment(), comment.getDatePublished()))
                            .collect(Collectors.toList())
            );
        }
        if (book.getCover() != null && book.getCover().length() > 0) {
            bookInfo.setCover(pathImg + book.getCover());
        }

        bookInfo.setGenre(toGenreInfo(book.getGenre()));
        bookInfo.setApprove(book.getApprove());
        int resultRating = book.getLikeBooks().size();
        bookInfo.setRating(resultRating);
        return bookInfo;
    }

    public static BookInfo toBookInfoShortInformation(Book book) {
        BookInfo info = new BookInfo(book.getId(), book.getName(), book.getDateCreated().toLocalDate());
        if (book.getCover() != null && book.getCover().length() > 0) {
            info.setCover(pathImg + book.getCover());
        }
        info.setApprove(book.getApprove());
        info.setRating(book.getLikeBooks().size());
        return info;
    }

    public static GenreInfo toGenreInfo(Genre genre) {
        return new GenreInfo(genre.getId(), genre.getName());
    }

    public List<BookInfo> findAllAndApproved() {
        return bookRepository.findAllByApprove(true).stream()
                .map(BookService::toBookInfoShortInformation)
                .collect(Collectors.toList());
    }

    public BookInfo findByIdAndApproved(Long id) throws BookException {

        Optional<Book> optional = bookRepository.findByIdAndApprove(id, true);
        if (optional.isPresent())
            return toBookInfo(optional.get());

        throw new BookException("This book not existed or not approve");
    }

    public Book save(CreateBookCommand book, String compressImage) {

        Book newBook = null;

        // Get existing authors
        List<Author> authors = book.getAuthorsIds().stream()
                .map(authorRepository::findOne)
                .collect(Collectors.toList());

        // Create new authors
        if (!CollectionUtils.isEmpty(book.getNewAuthors())) {
            authors.addAll(authorRepository.save(book.getNewAuthors().stream()
                    .map(Author::new)
                    .collect(Collectors.toList())));
        }

        Genre genre = genreRepository.findOne(book.getGenreId());

        newBook = new Book(book.getName(), book.getPublisher(),
                Date.valueOf(book.getDatePublished()), Date.valueOf(book.getDateCreated()));
        newBook.setAuthors(authors);
        newBook.setGenre(genre);
        if (compressImage != null) {
            newBook.setCover(compressImage + ".jpg");
        }

        return bookRepository.save(newBook);
    }

    public void delete(Long id) {
        bookRepository.delete(id);
    }

    public void delete(Book book) {
        bookRepository.delete(book);
    }

    public void deleteAll() {
        bookRepository.deleteAll();
    }

    public List<GenreInfo> findAllGenre() {
        return genreRepository.findAll().stream()
                .map(BookService::toGenreInfo)
                .collect(Collectors.toList());
    }

    public List<BookInfo> findBookByNameLike(String bookLike) {

        Optional<List<Book>> listOptional = bookRepository.findByNameContaining(bookLike);
        List<BookInfo> listBookInfo = new ArrayList<>();
        if (listOptional.isPresent()) {
            List<Book> bookList = listOptional.get();
            for (Book b : bookList) {
                listBookInfo.add(toBookInfoShortInformation(b));
            }
        }
        return listBookInfo;
    }

    public BookInfo findById(Long bookId) {
            return toBookInfo(bookRepository.findById(bookId));
    }

    public List<BookInfo> findAll() {
        return bookRepository.findAll().stream()
                .map(BookService::toBookInfoShortInformation)
                .collect(Collectors.toList());
    }
}
