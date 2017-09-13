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

import static com.jayway.jsonpath.JsonPath.read;
import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
public class AuthorCRUDRestTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void createAuthorTest() throws Exception {
        // given
        String createAuthorJson = "{ \"name\": \"Ron\" }";

        // when
        ResultActions result = mockMvc.perform(post("/authors")
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(createAuthorJson));

        // then
        String json = result.andReturn().getResponse().getContentAsString();

        Integer createdAuthorId = read(json, "$.id");
        assertThat(createdAuthorId).isPositive();

        String name = read(json, "$.name");
        assertThat(name).isEqualTo("Ron");

        deleteAuthor(createdAuthorId.longValue());
    }


    @Test
    public void shouldNotCreateAuthorWithEmptyField() throws Exception {

        String createAuthorJSONEmpty = "{\"name\":\"\"}";
        final ResultActions createAuthorResult = mockMvc.perform(post("/authors")
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(createAuthorJSONEmpty));

        createAuthorResult.andExpect(status().isBadRequest());
    }


    @Test
    public void shouldReturnAuthorById() throws Exception {

        String createAuthorJson = "{ \"name\": \"Ron\" }";

        final ResultActions createAuthorResult = mockMvc.perform(post("/authors")
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(createAuthorJson));

        createAuthorResult.andExpect(status().isCreated());

        String json = createAuthorResult.andReturn().getResponse().getContentAsString();

        Integer idSavedAuthor = read(json, "$.id");

        assertThat(idSavedAuthor).isPositive();

        final ResultActions getById = mockMvc.perform(get("/authors/" + idSavedAuthor)
                .contentType(MediaType.APPLICATION_JSON_VALUE));

        String getedById = getById.andReturn().getResponse().getContentAsString();

        Integer idAuthor = read(getedById,"$.id");

        assertThat(idAuthor).isEqualTo(idSavedAuthor);

        deleteAuthor(idAuthor.longValue());
    }

    private void deleteAuthor(final Long id) throws Exception {
        mockMvc.perform(delete("/authors/" + id));
    }

}
