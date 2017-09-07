package app.controller;

import app.Application;
import app.command.CreateAuthorCommand;
import app.model.Author;
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

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
public class AuthorCRUDRestTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void createAuthorTest() throws Exception {

        CreateAuthorCommand authorToCreate = new CreateAuthorCommand();
        authorToCreate.setName("Ron");

        final ResultActions createAuthorResult = mockMvc.perform(post("/authors")
                .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(authorToCreate)));

        createAuthorResult.andExpect(status().isCreated());

        Author createdAuthor = objectMapper.readValue(
                createAuthorResult.andReturn().getResponse().getContentAsByteArray(),
                Author.class
        );

        assertThat(createdAuthor.getId()).isNotNull();
        assertThat(createdAuthor.getName()).isEqualTo("Ron");

        deleteAuthor(createdAuthor.getId());
    }

    @Test
    public void shouldNotCreateAuthorWithEmptyField() throws Exception {
        CreateAuthorCommand createAuthorCommand = new CreateAuthorCommand();

        final ResultActions createAuthorResult = mockMvc.perform(post("/authors")
                .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(createAuthorCommand)));

        createAuthorResult.andExpect(status().isBadRequest());
    }

    @Test
    public void shouldReturnAuthorById() throws Exception {

        CreateAuthorCommand authorToCreate = new CreateAuthorCommand();
        authorToCreate.setName("Ron");

        final ResultActions createAuthorResult = mockMvc.perform(post("/authors")
                .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(authorToCreate)));

        createAuthorResult.andExpect(status().isCreated());

        Author createdAuthor = objectMapper.readValue(createAuthorResult.andReturn().
                getResponse().getContentAsByteArray(), Author.class);


        final ResultActions getById = mockMvc.perform(get("/authors/" + createdAuthor.getId())
                .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE));

        Author getedById = objectMapper.readValue(
                getById.andReturn().getResponse().getContentAsByteArray(),Author.class
        );

        assertThat(getedById.getId()).isEqualTo(createdAuthor.getId());

        deleteAuthor(getedById.getId());
    }


    private void deleteAuthor(final int id) throws Exception {
        mockMvc.perform(delete("/authors/" + id));
    }

}
