package app.repository;

import app.Application;
import app.model.User;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private User userWithAvatar;

    private User userWithNULLAvatar;

    @Before
    public void initDb() {
        User user1 = new User("Pasha", "54654654", "csdcsdc", "t2est@sdf.com");
        user1.setActive(true);
        user1.setAvatar("asdasdsad");
        User user2 = new User("P", "54654654", "csdcsdc", "tes3t@sdf.com");
        this.userWithNULLAvatar = user2;
        User user3 = new User("asha", "54654654", "csdcsdc", "test@sdqwdf.com");
        this.userWithAvatar = userRepository.save(user1);
        userRepository.save(Arrays.asList(user2, user3));
    }

    @After
    public void cleanDB() {
        userRepository.deleteAll();
    }

    @Test
    public void shouldSaveUser_thenReturnUser() {
        User user = new User("Alex", "54654654", "csdcsdc", "tasdest@sads.com");
        User returnUser = userRepository.save(user);

        assertThat(returnUser.getName()).isEqualTo(user.getName());
        assertThat(returnUser.getPhone()).isEqualTo(user.getPhone());
        assertThat(returnUser.getPassword()).isEqualTo(user.getPassword());
        assertThat(returnUser.getEmail()).isEqualTo(user.getEmail());
        assertThat(returnUser.getId()).isPositive();
        userRepository.delete(returnUser);

    }

    @Test
    public void shouldFindUserByNameLike_thenReturnListOfStringWithUserName() {
        List<String> listUserName = userRepository.findByNameLike("P");

        assertThat(listUserName.size()).isEqualTo(2);
        for (String u : listUserName) {
            assertThat(u.startsWith("P")).isTrue();
        }
    }

    @Test
    public void shouldFindByEmailAndActive_thenReturnOptionalUser() {
        Optional<User> optional = userRepository.findByEmailAndActive(userWithAvatar.getEmail(), true);

        assertionTemplate(optional);
    }

    @Test
    public void shouldFindByUuid_thenReturnOptionalUser() {
        Optional<User> optional = userRepository.findByUuid(userWithAvatar.getUuid());

        assertionTemplate(optional);
    }

    @Test
    public void shouldFindByEmail_thenReturnOptionalUser() {
        Optional<User> optional = userRepository.findByEmail(userWithAvatar.getEmail());

        assertionTemplate(optional);
    }

    @Test
    public void shouldFindByName_thenReturnOptionalUser() {
        Optional<User> optional = userRepository.findByName(userWithAvatar.getName());

        assertionTemplate(optional);
    }

    @Test
    public void shouldFindUserAvatarById_thenReturnStringNameAvatar() {
        Optional<String> optionalWithAvatar = userRepository.findAvatarById(userWithAvatar.getId());
        Optional<String> optionalWithoutAvatar = userRepository.findAvatarById(userWithNULLAvatar.getId());

        if (optionalWithAvatar.isPresent()) {
            String returnedAvatar = optionalWithAvatar.get();
            assertThat(returnedAvatar.equals(userWithAvatar.getAvatar())).isTrue();
        } else {
            assertThat(userWithAvatar.getAvatar()).isNull();
        }

        if (optionalWithoutAvatar.isPresent()) {
            String returnedAvatar = optionalWithAvatar.get();
            assertThat(returnedAvatar.equals(userWithNULLAvatar.getAvatar())).isTrue();
        } else {
            assertThat(userWithNULLAvatar.getAvatar()).isNull();
        }
    }

    private void assertionTemplate(Optional<User> optional) {
        assertThat(optional.isPresent()).isTrue();
        User returnedUser = optional.get();
        boolean b = returnedUser.equals(userWithAvatar);
        System.out.println(b);
        assertThat(returnedUser.getEmail()).isEqualTo(userWithAvatar.getEmail());
        assertThat(returnedUser.getAvatar()).isEqualTo(userWithAvatar.getAvatar());
        assertThat(returnedUser.getPassword()).isEqualTo(userWithAvatar.getPassword());
        assertThat(returnedUser.getUuid()).isEqualTo(userWithAvatar.getUuid());
    }
}
