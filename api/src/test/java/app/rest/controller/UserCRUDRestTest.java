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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
public class UserCRUDRestTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void createUserTest() throws Exception {

        String name = "Piter";
        String phone = "7667131";
        String pass = "4568awdacs";

        String createUserJSON = "{\"name\":\"" + name + "\"," +
                "\"phone\":\"" + phone + "\"," +
                "\"password\":\"" + pass + "\"}";

        final ResultActions result = mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(createUserJSON));

        String resultUser = result.andReturn().getResponse().getContentAsString();

        Integer idUser = read(resultUser, "$.id");
        String nameUser = read(resultUser, "$.name");
        String passwordUser = read(resultUser, "$.password");

        assertThat(idUser).isPositive();
        assertThat(nameUser).isEqualTo(name);
        assertThat(passwordUser).isEqualTo(pass);

        deleteUser(idUser.longValue());
    }


    @Test
    public void shouldNotCreateUserWithEmptyField() throws Exception{
        String createUserJSON = "{\"name\":\"\"," +
                "\"phone\":\"\"," +
                "\"password\":\"\"}";
        final ResultActions createUserResult = mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(createUserJSON));

        createUserResult.andExpect(status().isBadRequest());
    }

    @Test
    public void shouldReturnAuthorById() throws Exception {

        String name = "Piter";
        String phone = "7667131";
        String pass = "4568awdacs";

        String createUserJSON = "{\"name\":\"" + name + "\"," +
                "\"phone\":\"" + phone + "\"," +
                "\"password\":\"" + pass + "\"}";

        final ResultActions result = mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(createUserJSON));

        String resultUser = result.andReturn().getResponse().getContentAsString();

        Integer idUser = read(resultUser, "$.id");

        assertThat(idUser).isPositive();

        final ResultActions getById = mockMvc.perform(get("/users/" + idUser)
                .contentType(MediaType.APPLICATION_JSON_VALUE));

        String getedById = getById.andReturn().getResponse().getContentAsString();

        Integer resultIdUser = read(getedById,"$.id");

        assertThat(resultIdUser).isEqualTo(idUser);

        deleteUser(resultIdUser.longValue());
    }


    private void deleteUser(Long id) throws Exception {
        mockMvc.perform(delete("/users/" + id));
    }
}
