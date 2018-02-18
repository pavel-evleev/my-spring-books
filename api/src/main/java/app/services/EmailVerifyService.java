package app.services;

import app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * Created by Pavel on 26.10.2017.
 */
@Service
public class EmailVerifyService {

    @Autowired
    private JavaMailSender sender;
    @Autowired
    private Environment environment;

    @Autowired
    private ThreadPoolTaskExecutor executor;

    public void verifyEmail(User user) {

        executor.execute(() -> {
            try {
                sendVerify(user);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        });
    }

    private void sendVerify(User user) throws MessagingException {

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String host = environment.getProperty("verify.email.url") + user.getUuid();
        helper.setTo(user.getEmail());
        helper.setText("<html><body>Please confirm your email! <a href=" + host + ">Confirm<a/><body></html>", true);
        helper.setSubject("Confirm email for BeWorm service");

        sender.send(message);
    }


}
