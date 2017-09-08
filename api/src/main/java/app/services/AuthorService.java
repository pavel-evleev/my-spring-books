package app.services;

import app.view_model.AuthorInfo;
import app.view_model.BookInfo;
import app.view_model.CreateAuthorCommand;
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

    public Author findOneEntity(int id) {
        return authorRepository.findOne(id);
    }

    public AuthorInfo findOne(int id) {
        return initAuthorInfo(authorRepository.findOne(id));
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

    public List<AuthorInfo> findAll() {
        return authorRepository.findAll().stream().map((i) -> initAuthorInfo(i)).collect(Collectors.toList());
    }

    @Transactional
    public AuthorInfo save(CreateAuthorCommand createAuthorCommand) {
        Author author = new Author(createAuthorCommand.getName());
        return initAuthorInfo(authorRepository.save(author));
    }

    @Transactional
    public void delete(int id) {
        authorRepository.delete(id);
    }

    @Transactional
    public void deleteAll() {
        authorRepository.deleteAll();
    }
}
