package app.controller;

import app.Application;
import app.view_model.CreateBookCommand;
import app.model.Book;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Arrays;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
public class BookCRUDRestTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void createBookTest() throws Exception {

        CreateBookCommand creCMD = new CreateBookCommand() {{
            name = "Piter Pen";
            publisher = "LSC";
            authorsIds = Arrays.asList(1);
        }};


        final ResultActions createBookResult = mockMvc.perform(post("/books")
                .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(creCMD)));

        createBookResult.andExpect(status().isCreated());

        Book createdBook = objectMapper.readValue(
                createBookResult.andReturn().getResponse().getContentAsByteArray(),
                Book.class
        );

        assertThat(createdBook.getId()).isNotNull();
        assertThat(createdBook.getName()).isEqualTo(creCMD.name);
        assertThat(createdBook.getPublisher()).isEqualTo(creCMD.publisher);
        assertThat(createdBook.getAuthors().size()).isEqualTo(creCMD.authorsIds.size());

        deleteBook(createdBook.getId());
    }
//
//    @Test
//    public void shouldNotCreateBookWithEmptyField() throws Exception {
//        CreateAuthorCommand createAuthorCommand = new CreateAuthorCommand();
//
//        final ResultActions createAuthorResult = mockMvc.perform(post("/authors")
//                .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE)
//                .content(objectMapper.writeValueAsString(createAuthorCommand)));
//
//        createAuthorResult.andExpect(status().isBadRequest());
//    }
//
//    @Test
//    public void shouldReturnBookById() throws Exception {
//
//        CreateAuthorCommand authorToCreate = new CreateAuthorCommand();
//        authorToCreate.setName("Ron");
//
//        final ResultActions createAuthorResult = mockMvc.perform(post("/authors")
//                .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE)
//                .content(objectMapper.writeValueAsString(authorToCreate)));
//
//        createAuthorResult.andExpect(status().isCreated());
//
//        Author createdAuthor = objectMapper.readValue(createAuthorResult.andReturn().
//                getResponse().getContentAsByteArray(), Author.class);
//
//
//        final ResultActions getById = mockMvc.perform(get("/authors/" + createdAuthor.getId())
//                .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE));
//
//        Author getedById = objectMapper.readValue(
//                getById.andReturn().getResponse().getContentAsByteArray(), Author.class
//        );
//
//        assertThat(getedById.getId()).isEqualTo(createdAuthor.getId());
//
//        deleteBook(getedById.getId());
//    }


    private void deleteBook(final int id) throws Exception {
        mockMvc.perform(delete("/books/" + id));
    }

}
