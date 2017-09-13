package app.services;

import app.rest.model.AuthorInfo;
import app.rest.model.BookInfo;
import app.rest.model.CreateAuthorCommand;
import app.model.Author;
import app.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }


    public AuthorInfo findOne(Long id) {
        return initAuthorInfo(authorRepository.findOne(id));
    }

    public List<AuthorInfo> findAll() {
        return authorRepository.findAll().stream()
                .map((authorItem) -> initAuthorInfo(authorItem)).collect(Collectors.toList());
    }

    @Transactional
    public AuthorInfo save(CreateAuthorCommand createAuthorCommand) {
        Author author = new Author(createAuthorCommand.getName());
        return initAuthorInfo(authorRepository.save(author));
    }

    @Transactional
    public void delete(Long id) {
        authorRepository.delete(id);
    }

    @Transactional
    public void deleteAll() {
        authorRepository.deleteAll();
    }

    private AuthorInfo initAuthorInfo(Author author) {
        return new AuthorInfo() {{
            setName(author.getName());
            setId(author.getId());
            if (author.getBooks() != null)
                setBooks(author.getBooks().stream().map((bookItem) -> new BookInfo() {{
                    setId(bookItem.getId());
                    setName(bookItem.getName());
                    setDatePublished(bookItem.getDatePublished());
                    setPublisher(bookItem.getPublisher());
                    if (bookItem.getAuthors() != null)
                        setAuthors(bookItem.getAuthors().stream()
                                .map((authorItem) -> authorItem.getName()).collect(Collectors.toList()));
                }}).collect(Collectors.toList()));
        }};
    }
}
