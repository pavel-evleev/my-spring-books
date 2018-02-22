package app.service;

import app.model.User;
import app.repository.UserRepository;
import app.rest.model.CreateUserCommand;
import app.rest.model.UserExistedException;
import app.rest.model.UserInfo;
import app.services.EmailVerifyService;
import app.services.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

/**
 * Created by Pavel on 05.09.2017.
 */
@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {

    @InjectMocks
    UserService userService;

    @Mock
    UserRepository userRepository;

    @Mock
    Environment environment;

    @Mock
    BCryptPasswordEncoder encoder;

    @Mock
    EmailVerifyService verifyService;

    @Before
    public void init() {
        given(environment.getProperty("image.url")).willReturn("MockEnv");
        doNothing().when(verifyService).verifyEmail(any());
    }

    @Test
    public void should_call_user_repository_find_one_method_in_user_service() {

        String name = "Pavel";
        String phone = "3777";
        String password = "redRabbit";
        String email = "mr.maadsc@gmail.com";

        User expectedUser = new User(name, phone, password, email);
        expectedUser.setId(1L);

        given(userRepository.findOne(1L)).willReturn(expectedUser);

        UserInfo returnedUser = userService.findOne(1L);

        assertThat(returnedUser.getId()).isEqualTo(1);
        assertThat(returnedUser.getName()).isEqualTo(name);
        assertThat(returnedUser.getPhone()).isEqualTo(phone);
        assertThat(returnedUser.getEmail()).isEqualTo(email);
    }

    @Test
    public void should_call_user_repository_find_all_method_in_user_service() {
        List<User> expectedUsers = Arrays.asList(new User() {{
            setId(1L);
        }}, new User() {{
            setId(2L);
        }});

        List<User> compareUsers = new ArrayList<>();
        compareUsers.addAll(expectedUsers);

        given(userRepository.findAll()).willReturn(expectedUsers);

        List<UserInfo> returnedUsers = userService.findAll();

        assertThat(returnedUsers.size()).isEqualTo(compareUsers.size());
    }

    @Test
    public void shouldCallUserRepositorySaveMethodInUserService_thenReturnSavedUser() {
        CreateUserCommand creCMD = new CreateUserCommand() {{
            setName("Piter Pen");
            setPassword("asdd");
            setPhone("46123");
            setEmail("mr.masdsac@gmail.com");
        }};

        User user = new User(creCMD.getName(),
                creCMD.getPhone(), creCMD.getPassword(), creCMD.getEmail());

        given(userRepository.save(user)).willReturn(user);
        given(userRepository.findByEmail(creCMD.getEmail())).willReturn(Optional.empty());
        given(encoder.encode(creCMD.getPassword())).willReturn(creCMD.getPassword());

        User returnedUser = null;
        try {
            returnedUser = userService.save(creCMD);
        } catch (UserExistedException e) {
            e.printStackTrace();
        }

        assertThat(returnedUser.getName()).isEqualTo(creCMD.getName());
        assertThat(returnedUser.getPhone()).isEqualTo(creCMD.getPhone());
        assertThat(returnedUser.getEmail()).isEqualTo(creCMD.getEmail());
    }

    @Test
    public void should_call_user_repository_delete_by_id_method_in_user_service() {
        userService.delete(1211L);
        verify(userRepository, times(1)).delete(anyLong());
    }

    @Test
    public void should_call_user_repository_delete_all_method_in_user_service() {
        userService.deleteAll();
        verify(userRepository, times(1)).deleteAll();
    }

    @Test
    public void should_call_user_repository_delete_user_entity_method_in_user_service() {
        userService.delete(new User());
        verify(userRepository, times(1)).delete(any(User.class));
    }
}
