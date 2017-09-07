package app.service;

import app.command.CreateBookCommand;
import app.command.CreateUserCommand;
import app.model.Author;
import app.model.Book;
import app.model.User;
import app.repository.BookRepository;
import app.repository.UserRepository;
import app.services.AuthorService;
import app.services.BookService;
import app.services.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

    @Test
    public void should_call_user_repository_find_one_method_in_user_service() {

        String name = "Pavel";
        String phone = "3777";
        String password = "redRabbit";

        User expectedUser = new User(name, phone, password);
        expectedUser.setId(1);

        given(userRepository.findOne(1)).willReturn(expectedUser);

        User returnedUser = userService.findOne(1);

        assertThat(returnedUser.getId()).isEqualTo(1);
        assertThat(returnedUser.getName()).isEqualTo(name);
        assertThat(returnedUser.getPassword()).isEqualTo(password);
        assertThat(returnedUser.getPhone()).isEqualTo(phone);
    }

    @Test
    public void should_call_user_repository_find_all_method_in_user_service() {
        List<User> expectedUsers = Arrays.asList(new User() {{
            setId(1);
        }}, new User() {{
            setId(2);
        }});

        List<User> a = new ArrayList<>();
        a.addAll(expectedUsers);

        given(userRepository.findAll()).willReturn(expectedUsers);

        List<User> returnedUsers = userService.findAll();

        assertThat(returnedUsers).isEqualTo(a);
    }

    @Test
    public void should_call_user_repository_save_method_in_user_service() {
        CreateUserCommand creCMD = new CreateUserCommand() {{
            setName("Piter Pen");
            setPassword("asdd");
            setPhone("46123");
        }};

        User user = new User(creCMD.getName(),
                creCMD.getPhone(), creCMD.getPassword());

        given(userRepository.save(user)).willReturn(user);

        User returnedUser = userService.save(creCMD);

        assertThat(returnedUser.getName()).isEqualTo(creCMD.getName());
        assertThat(returnedUser.getPassword()).isEqualTo(creCMD.getPassword());
        assertThat(returnedUser.getPhone()).isEqualTo(creCMD.getPhone());
    }

    @Test
    public void should_call_user_repository_delete_by_id_method_in_user_service() {
        userService.delete(1211);
        verify(userRepository, times(1)).delete(anyInt());
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

    @Test
    public void should_call_user_repository_exist_user_by_id_method_in_user_service() {

        given(userRepository.exists(1)).willReturn(true);

        Boolean existed = userService.exist(1);

        assertThat(existed).isTrue();
    }

    @Test
    public void should_call_user_repository_count_books_method_in_user_service() {

        given(userRepository.count()).willReturn((long) 12);

        long expectedCount = userService.count();

        assertThat(expectedCount).isEqualTo(12);
    }

}
