package app.repository;

import app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u.name from User u where u.name LIKE ?1%")
    List<String> findByNameLike(String name);

}
