package app.repository;

import app.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Pavel on 22.02.2018.
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRole(String role);
}
