package app.services;

import app.model.Author;
import app.model.Book;
import app.model.Genre;
import app.repository.AuthorRepository;
import app.repository.BookRepository;
import app.repository.GenreRepository;
import app.rest.exception.BookException;
import app.rest.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookService {

    private static String pathImg;
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    @Autowired
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
                        .map(AuthorInfo::new)
                        .collect(Collectors.toList())
        );
        if (book.getComments() != null) {
            bookInfo.setComments(
                    book.getComments().stream().filter(c -> c.getApprove() != null ? c.getApprove() : false).map(c ->
                            new CommentInfo(c.getText(), c.getAuthorComment(), c.getDatePublished()))
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

    public static BookInfo toBookInfoShortInformation(Book book, boolean addGenre) {
        BookInfo info = new BookInfo(book.getId(), book.getName(), book.getDateCreated().toLocalDate());
        if (book.getCover() != null && book.getCover().length() > 0) {
            info.setCover(pathImg + book.getCover());
        }
        if (book.getApprove() != null) {
            info.setApprove(book.getApprove());
        } else info.setApprove(false);
        info.setRating(book.getLikeBooks().size());
        if (addGenre) {
            info.setGenre(toGenreInfo(book.getGenre()));
        }
        return info;
    }

    public static GenreInfo toGenreInfo(Genre genre) {
        return new GenreInfo(genre.getId(), genre.getName());
    }

    public List<BookInfo> findAllAndApproved() {
        return bookRepository.findAllByApprove(true).stream()
                .map(b -> toBookInfoShortInformation(b, false))
                .collect(Collectors.toList());
    }

    public BookInfo findByIdAndApproved(Long id) throws BookException {
        Optional<Book> optional = bookRepository.findByIdAndApprove(id, true);
        if (optional.isPresent())
            return toBookInfo(optional.get());

        throw new BookException("This book not existed or not approve");
    }

    public Book save(CreateBookCommand book, String compressImage) throws BookException {
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

        if (newBook.getAuthors().size() == 0)
            throw new BookException("Book can't be create without author");

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

        Optional<List<Book>> listOptional = bookRepository.findByNameContainingAndApprove(bookLike, true);
        List<BookInfo> listBookInfo = new ArrayList<>();
        if (listOptional.isPresent()) {
            List<Book> bookList = listOptional.get();
            for (Book b : bookList) {
                listBookInfo.add(toBookInfoShortInformation(b, false));
            }
        }
        return listBookInfo;
    }

    public BookInfo findById(Long bookId) {
        return toBookInfo(bookRepository.findById(bookId));
    }

    public String getCoverByBookId(Long bookId){
        return bookRepository.findOne(bookId).getCover();
    }

    public List<BookInfo> findAll() {
        return bookRepository.findAll().stream()
                .map(b -> toBookInfoShortInformation(b, false))
                .collect(Collectors.toList());
    }

    public boolean patchBook(Long bookId, String name, MultipartFile imgFile, String publisher,
                             List<Long> authorsIds, Long genreId, List<String> newAuthors,
                             ImageService imageService, Boolean approve) {
        Book book = bookRepository.findOne(bookId);
        List<Author> authors = new ArrayList<>();

        if (name != null) {
            book.setName(name);
        }
        if (genreId != null) {
            book.setGenre(genreRepository.findOne(genreId));
        }
        if (publisher != null) {
            book.setPublisher(publisher);
        }
        if (authorsIds != null) {
            authors = authorRepository.findAll(authorsIds);
        }
        if (newAuthors != null) {
            List<Author> authorList = newAuthors.stream().map(Author::new).collect(Collectors.toList());
            List<Author> result = new ArrayList<>();
            for (Author a : authorList) {
                result.add(authorRepository.saveAndFlush(a));
            }
            authors.addAll(result);
        }
        if (authors != null && authors.size() > 0) {
            book.setAuthors(authors);
        }
        if (approve != null) {
            book.setApprove(approve);
        }
        if (imgFile != null) {
            String currentImg = book.getCover();
            String newName = UUID.randomUUID().toString();
            if (currentImg != null) {
                if (currentImg.length() > 0) {
                    imageService.remove(currentImg);
                }
            }
            imageService.compressAndSaveImage(imgFile, newName);
            book.setCover(newName + ".jpg");
        }
        if (bookRepository.saveAndFlush(book) != null) {
            return true;
        }
        return false;
    }

    public List<BookInfo> findBookLike(BookInfo book) {
        List<Book> books = new ArrayList<>();
        CharSequence nameLike = book.getName();
        if (book.getAuthors() != null) {
            Optional<List<Book>> optional = bookRepository.findByAuthors(book.getAuthors().stream()
                    .map(a -> new Author(a.getId())).collect(Collectors.toList()));
            if (optional.isPresent()) {
                books = optional.get();
            }
            if (book.getGenre() != null) {
                books = books.stream().filter(b -> b.getGenre().getId() == book.getGenre().getId()).collect(Collectors.toList());
            }
        } else if (book.getGenre() != null) {
            Optional<List<Book>> optional = bookRepository.findByGenreId(book.getGenre().getId());
            if (optional.isPresent()) {
                books = optional.get();
            }
        } else {
            Optional<List<Book>> optional = bookRepository.findByNameContainingAndApprove(book.getName(), true);
            if (optional.isPresent()) {
                books = optional.get();
            }
        }
        books = books.stream().filter(b -> b.getName().contains(nameLike)).collect(Collectors.toList());
        return books.stream().map(b -> toBookInfoShortInformation(b, false)).collect(Collectors.toList());
    }

}
