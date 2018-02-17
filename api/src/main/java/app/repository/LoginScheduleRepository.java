package app.repository;

import app.model.LoginSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


/**
 * Created by Pavel on 13.02.2018.
 */
public interface LoginScheduleRepository extends JpaRepository<LoginSchedule, Long> {

    Optional<LoginSchedule> findByUserid(Long userId);
}
