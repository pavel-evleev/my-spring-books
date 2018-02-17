package app.repository;

import app.Application;
import app.model.Comment;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by Pavel on 13.02.2018.
 */

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
public class BookRepositoryTest {

    @Autowired
    private CommentRepository commentRepository;

    @Test
    public void shoulReturnAllCommentsOfBook() {

        Optional<List<Comment>> optional = commentRepository.findCommentByBookId(1L);

        System.out.println(optional.isPresent());

        assertThat(optional).isNotNull();
    }


}
