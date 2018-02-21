package app.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;


@Entity
@Table(name = "login_schedule")
public class LoginSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "current_login", nullable = false)
    private Date currentLogin;

    @NotNull
    @Column(name = "last_login", nullable = false)
    private Date lastLogin;

    @Column(name = "userId", nullable = false)
    private Long userid;

    public LoginSchedule() {
    }

    public LoginSchedule(Date currentLogin, Date lastLogin, Long user) {
        this.currentLogin = currentLogin;
        this.lastLogin = lastLogin;
        this.userid = user;
    }

    public Date getCurrentLogin() {
        return currentLogin;
    }

    public void setCurrentLogin(Date currentLogin) {
        this.currentLogin = currentLogin;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Long getUser() {
        return userid;
    }

    public void setUser(Long user) {
        this.userid = user;
    }


}
