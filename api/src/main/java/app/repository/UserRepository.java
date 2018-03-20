package app.repository;

import app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u.name from User u where u.name LIKE ?1%")
    List<String> findByNameLike(String name);

    Optional<User> findByEmailAndActive(String userEmail, Boolean active);

    Optional<User> findByUuid(String uuid);

    Optional<User> findByEmail(String email);

    Optional<User> findByName(String name);

    @Query("SELECT u.avatar from User u where u.id =:id")
    Optional<String> findAvatarById(@Param("id") Long id);
}
