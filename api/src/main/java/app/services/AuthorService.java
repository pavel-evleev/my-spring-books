package app.services;

import app.rest.model.AuthorInfo;
import app.rest.model.BookInfo;
import app.rest.model.CreateAuthorCommand;
import app.model.Author;
import app.repository.AuthorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }


    public AuthorInfo findOne(Long id) {
        return toAuthorInfo(authorRepository.findOne(id));
    }

    public List<AuthorInfo> findAll() {
        return authorRepository.findAll().stream()
            .map(AuthorService::toAuthorInfo)
            .collect(Collectors.toList());
    }

    public AuthorInfo save(CreateAuthorCommand createAuthorCommand) {
        Author author = new Author(createAuthorCommand.getName());
        return toAuthorInfo(authorRepository.save(author));
    }

    public void delete(Long id) {
        authorRepository.delete(id);
    }

    public void deleteAll() {
        authorRepository.deleteAll();
    }

    public static AuthorInfo toAuthorInfo(Author author) {
        AuthorInfo authorInfo = new AuthorInfo(author.getId(), author.getName());
        return authorInfo;
    }

    public List<AuthorInfo> findAllAndApproved() {

        return authorRepository.findAllByApprove(true).stream()
                .map(AuthorService::toAuthorInfo)
                .collect(Collectors.toList());
    }
}
