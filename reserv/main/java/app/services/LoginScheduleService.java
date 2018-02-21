package app.services;

import app.model.LoginSchedule;
import app.repository.LoginScheduleRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class LoginScheduleService {

    private LoginScheduleRepository repository;

    public LoginScheduleService(LoginScheduleRepository repository) {
        this.repository = repository;
    }

    public void setCurrentLogin(Long userId, LocalDate currentLogin) {
        Optional<LoginSchedule> optional = repository.findByUserid(userId);
        LoginSchedule schedule = null;
        if (optional.isPresent()) {
            schedule = optional.get();
            schedule.setCurrentLogin(Date.valueOf(currentLogin));
        } else {
            schedule = new LoginSchedule(Date.valueOf(currentLogin), Date.valueOf(currentLogin), userId);
        }
        repository.saveAndFlush(schedule);
    }

    public void setLastLogin(Long id, LocalDate lastLogin) {
        Optional<LoginSchedule> optional = repository.findByUserid(id);
        LoginSchedule schedule = null;
        if (optional.isPresent()) {
            schedule = optional.get();
            schedule.setLastLogin(Date.valueOf(lastLogin));
        } else {
            schedule = new LoginSchedule(Date.valueOf(lastLogin), Date.valueOf(lastLogin), id);
        }
        repository.saveAndFlush(schedule);
    }
}
