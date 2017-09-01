package app.services;

import app.command.CreateAuthorCommand;
import app.model.Author;
import app.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public Author findOne(int id) {
        return authorRepository.findOne(id);
    }

    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    @Transactional
    public Author save(CreateAuthorCommand createAuthorCommand) {
        Author author = new Author(createAuthorCommand.getName());
        return authorRepository.save(author);
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
