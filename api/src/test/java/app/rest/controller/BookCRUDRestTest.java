package app.rest.controller;

import app.Application;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.jayway.jsonpath.JsonPath.read;
import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
public class BookCRUDRestTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void createBookTest() throws Exception {

        String createBookJSON = "{\"name\":\"Piter Pen\"," +
                "\"publisher\":\"LSC\"," +
                " \"authorsIds\":[\"1\"]}";

        String nameCreateBookJSON = read(createBookJSON, "$.name");
        String publisherCreateBookJSON = read(createBookJSON, "$.publisher");
        List<Integer> authorsIdsCreateBookJSON = read(createBookJSON, "$.authorsIds");

        final ResultActions createBookResult = mockMvc.perform(post("/books")
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(createBookJSON));

        createBookResult.andExpect(status().isCreated());

        String createdBook = createBookResult.andReturn().getResponse().getContentAsString();

        Integer idCreatedBook = read(createdBook, "$.id");
        String nameCreatedBook = read(createdBook, "$.name");
        String publisherCreatedBook = read(createdBook, "$.publisher");
        List<String> authorsCreatedBook = read(createdBook, "$.authors");

        assertThat(idCreatedBook).isPositive();
        assertThat(nameCreatedBook).isEqualTo(nameCreateBookJSON);
        assertThat(publisherCreatedBook).isEqualTo(publisherCreateBookJSON);
        assertThat(authorsCreatedBook.size()).isEqualTo(authorsIdsCreateBookJSON.size());

        deleteBook(idCreatedBook.longValue());
    }

    @Test
    public void shouldNotCreateBookWithEmptyField() throws Exception {
        String createBookJSON = "{\"name\":\" \"}";

        final ResultActions createAuthorResult = mockMvc.perform(post("/books")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(createBookJSON));

        createAuthorResult.andExpect(status().isBadRequest());
    }

    @Test
    public void shouldReturnBookById() throws Exception {

        String createBookJSON = "{\"name\":\"Piter Pen\"," +
                "\"publisher\":\"LSC\"," +
                " \"authorsIds\":[\"7\"]}";

        final ResultActions createAuthorResult = mockMvc.perform(post("/books")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(createBookJSON));

        createAuthorResult.andExpect(status().isCreated());

        String createdBook = createAuthorResult.andReturn().
                getResponse().getContentAsString();
        Integer idCreatedBook = read(createdBook, "$.id");
        String nameCreatedBook = read(createdBook, "$.name");

        final ResultActions getById = mockMvc.perform(get("/books/" + idCreatedBook)
                .contentType(MediaType.APPLICATION_JSON_VALUE));

        String getedById = getById.andReturn().getResponse().getContentAsString();
        Integer idgetedBook = read(getedById, "$.id");
        String nameGetedBook = read(getedById, "$.name");

        assertThat(idgetedBook).isEqualTo(idCreatedBook);
        assertThat(nameGetedBook).isEqualTo(nameCreatedBook);

        deleteBook(idgetedBook.longValue());
    }


    private void deleteBook(final Long id) throws Exception {
        mockMvc.perform(delete("/books/" + id));
    }

}
