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

    public Author findOneEntity(Long id) {
        return authorRepository.findOne(id);
    }

    public AuthorInfo findOne(Long id) {
        return initAuthorInfo(authorRepository.findOne(id));
    }

    public List<AuthorInfo> findAll() {
        return authorRepository.findAll().stream().map((i) -> initAuthorInfo(i)).collect(Collectors.toList());
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
                setBooks(author.getBooks().stream().map((i) -> new BookInfo() {{
                    setId(i.getId());
                    setName(i.getName());
                    setDatePublished(i.getDatePublished());
                    setPublisher(i.getPublisher());
                    if (i.getAuthors() != null)
                        setAuthors(i.getAuthors().stream().map((n) -> n.getName()).collect(Collectors.toList()));
                }}).collect(Collectors.toList()));
        }};
    }
}
