package app.services;

import app.model.*;
import app.repository.AuthorRepository;
import app.repository.BookRepository;
import app.repository.GenreRepository;
import app.repository.UserRepository;
import app.rest.model.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository,
                       UserRepository userRepository, GenreRepository genreRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.userRepository = userRepository;
        this.genreRepository = genreRepository;
    }

    public List<BookInfo> findAll() {
        return bookRepository.findAll().stream()
                .map(BookService::toBookInfo)
                .collect(Collectors.toList());
    }

    public BookInfo findOne(Long id) {
        return toBookInfo(bookRepository.findOne(id));
    }

    @Transactional
    public BookInfo save(CreateBookCommand book, String compressImage) {

        String cover = compressImage + ".jpg";
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

        Book newBook = new Book(book.getName(), book.getPublisher(), Date.valueOf(book.getDatePublished()), cover);
        newBook.setAuthors(authors);
        newBook.setGenre(genre);
        return toBookInfo(bookRepository.save(newBook));
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

        if (book.getCover().length() > 0) {
            bookInfo.setCover("http://127.0.0.1:8080/v1/books/image/" + book.getCover());
        }

        bookInfo.setGenre(toGenreInfo(book.getGenre()));
        return bookInfo;
    }

    public static GenreInfo toGenreInfo(Genre genre) {
        return new GenreInfo(genre.getId(), genre.getName());
    }

    public List<GenreInfo> findAllGenre() {
        return genreRepository.findAll().stream()
                .map(BookService::toGenreInfo)
                .collect(Collectors.toList());
    }

    @Transactional
    public BookInfo saveComment(CreateCommentCommand createCommentCommand) {
        User authorComment = userRepository.findOne(createCommentCommand.getAuthorCommentId());
        Book book = bookRepository.findOne(createCommentCommand.getBookId());

        Comment newComment = new Comment();
        newComment.setAuthorComment(authorComment);
        newComment.setDatePublished(Date.valueOf(LocalDate.now()));
        newComment.setText(createCommentCommand.getText());

        book.addComment(newComment);
        return toBookInfo(bookRepository.saveAndFlush(book));
    }
}
