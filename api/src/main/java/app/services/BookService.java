package app.services;

import app.model.Author;
import app.model.Book;
import app.model.Genre;
import app.repository.AuthorRepository;
import app.repository.BookRepository;
import app.repository.GenreRepository;
import app.rest.model.BookInfo;
import app.rest.model.CommentInfo;
import app.rest.model.CreateBookCommand;
import app.rest.model.GenreInfo;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.sql.Date;
import java.util.List;
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
                    book.getComments().stream().map(comment ->
                            new CommentInfo(comment.getText(), comment.getAuthorComment(), comment.getDatePublished()))
                            .collect(Collectors.toList())
            );
        }

        if (book.getCover() != null && book.getCover().length() > 0) {
            bookInfo.setCover(pathImg + book.getCover());
        }

        bookInfo.setGenre(toGenreInfo(book.getGenre()));

        int resultRating = book.getLikeBooks().size();

        bookInfo.setRating(resultRating);
        return bookInfo;
    }

    public static BookInfo toBookInfoShortInformation(Book book) {
        BookInfo info = new BookInfo(book.getId(), book.getName(), book.getDateCreated().toLocalDate());
        if (book.getCover() != null && book.getCover().length() > 0) {
            info.setCover(pathImg + book.getCover());
        }
        info.setRating(book.getLikeBooks().size());
        return info;
    }

    public static GenreInfo toGenreInfo(Genre genre) {
        return new GenreInfo(genre.getId(), genre.getName());
    }

    public List<BookInfo> findAll() {
        return bookRepository.findAll().stream()
                .map(BookService::toBookInfoShortInformation)
                .collect(Collectors.toList());
    }

    public BookInfo findOne(Long id) {
        return toBookInfo(bookRepository.findOne(id));
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

}
