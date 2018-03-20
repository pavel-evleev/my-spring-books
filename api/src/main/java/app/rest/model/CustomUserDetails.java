package app.rest.model;

import app.model.Role;
import app.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Pavel on 20.10.2017.
 */
public class CustomUserDetails implements UserDetails, Serializable {

    static final long serialVersionUID = 412124232L;
    private String password;
    private String username;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(final User user) {
        this.password = user.getPassword();
        this.username = user.getEmail();
        this.authorities = translate(user.getRoles());

    }

    private Collection<? extends GrantedAuthority> translate(List<Role> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_"+role.getRole().toUpperCase()))
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
