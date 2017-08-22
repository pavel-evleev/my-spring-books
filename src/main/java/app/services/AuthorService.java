package app.services;

import app.model.Author;
import app.model.User;
import app.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    public Author findOne(int id) {
        return authorRepository.findOne(id);
    }

    public void save(Author author) {
        authorRepository.save(author);
    }

    public void save(Iterable<Author> list) {
        authorRepository.delete(list);
    }

    public void delete(int id) {
        authorRepository.delete(id);
    }

    public void delete(Author author) {
        authorRepository.delete(author);
    }

    public void deleteAll() {
        authorRepository.deleteAll();
    }


}
