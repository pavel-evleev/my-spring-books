package app.services;

import app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

/**
 * Created by Pavel on 26.10.2017.
 */
@Service
public class EmailVerifyService {

    @Autowired
    private JavaMailSender sender;


    public void verifyEmail(User user) throws Exception {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String host = "http://localhost:8080/v1/users/verify/" + user.getUuid();
        helper.setTo(user.getEmail());
        helper.setText("<html><body>Pleas confirm your email! <a href=" + host + ">Confirm<a/><body></html>", true);
        helper.setSubject("Confirm email for BeWorm service");

        sender.send(message);

    }

}
