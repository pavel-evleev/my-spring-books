package app.services;

import app.model.User;
import app.repository.UserRepository;
import app.rest.model.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

/**
 * Created by Pavel on 20.10.2017.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoginScheduleService scheduleService;

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        //it's need for get user which confirm email, so that active:true
        Optional<User> optionalUser = userRepository.findByEmailAndActive(userEmail, true);
        optionalUser
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        scheduleService.setCurrentLogin(optionalUser.get().getId(), LocalDate.now());
        return optionalUser
                .map(CustomUserDetails::new).get();
    }
}
