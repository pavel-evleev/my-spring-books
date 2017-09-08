package app.controller;

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
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(createAuthorJson));

        // then
        String json = result.andReturn().getResponse().getContentAsString();

        Integer createdAuthorId = read(json, "$.id");
        assertThat(createdAuthorId).isPositive();

        String name = read(json, "$.name");
        assertThat(name).isEqualTo("Ron");

        deleteAuthor(createdAuthorId);
    }

    /**
     * @Test public void shouldNotCreateAuthorWithEmptyField() throws Exception {
     * CreateAuthorCommand createAuthorCommand = new CreateAuthorCommand();
     * <p>
     * final ResultActions createAuthorResult = mockMvc.perform(post("/authors")
     * .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE)
     * .content(objectMapper.writeValueAsString(createAuthorCommand)));
     * <p>
     * createAuthorResult.andExpect(status().isBadRequest());
     * }
     * @Test public void shouldReturnAuthorById() throws Exception {
     * <p>
     * CreateAuthorCommand authorToCreate = new CreateAuthorCommand();
     * authorToCreate.setName("Ron");
     * <p>
     * final ResultActions createAuthorResult = mockMvc.perform(post("/authors")
     * .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE)
     * .content(objectMapper.writeValueAsString(authorToCreate)));
     * <p>
     * createAuthorResult.andExpect(status().isCreated());
     * <p>
     * Author createdAuthor = objectMapper.readValue(createAuthorResult.andReturn().
     * getResponse().getContentAsByteArray(), Author.class);
     * <p>
     * <p>
     * final ResultActions getById = mockMvc.perform(get("/authors/" + createdAuthor.getId())
     * .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE));
     * <p>
     * Author getedById = objectMapper.readValue(
     * getById.andReturn().getResponse().getContentAsByteArray(),Author.class
     * );
     * <p>
     * assertThat(getedById.getId()).isEqualTo(createdAuthor.getId());
     * <p>
     * deleteAuthor(getedById.getId());
     * }
     */
    private void deleteAuthor(final Integer id) throws Exception {
        mockMvc.perform(delete("/authors/" + id));
    }

}
