package app.services;

import app.model.User;

import com.sendpulse.restapi.Sendpulse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Pavel on 26.10.2017.
 */
@Service
public class EmailVerifyService {
    private final String userId = "4c4b3aa37fdf1cbe8d6269eefb64b273";
    private final String secret = "1b554d0bb781e96348ccc7a5bffeb225";

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

        String fromSender = environment.getProperty("spring.mail.username");
        String host = environment.getProperty("verify.email.url") + user.getUuid();
        String innerText = "<a href=" + host + ">Confirm<a/>";
        String message = "<body><div>Thank you for registration, we hope the service will be useful for you.</div>" +
                "<div>Confirm please your email " + innerText + "</div>" +
                "<p>Email will be used to contact you and other users if you want.</p></body>";


        try {
            Sendpulse sendpulse = new Sendpulse(userId, secret);
            smtpSendMail(sendpulse, "From BeWorm", fromSender, "New user", user.getEmail(),
                    message, innerText, "Confirm your email for BeWorm", null);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void smtpSendMail(Sendpulse sendpulse, String from_name, String from_email,
                                             String name_to, String email_to, String html, String text, String subject,
                                             Map<String, String> attachments) {
        Map<String, Object> from = new HashMap<>();
        from.put("name", from_name);
        from.put("email", from_email);
        ArrayList<Map> to = new ArrayList<>();
        Map<String, Object> elementto = new HashMap<>();
        elementto.put("name", name_to);
        elementto.put("email", email_to);
        to.add(elementto);
        Map<String, Object> emaildata = new HashMap<>();
        emaildata.put("html", html);
        emaildata.put("text", text);
        emaildata.put("subject", subject);
        emaildata.put("from", from);
        emaildata.put("to", to);
        if (attachments != null) {
            emaildata.put("attachments_binary", attachments);
        }
        Map<String, Object> result = sendpulse.smtpSendMail(emaildata);
        System.out.println("Results: " + result);
    }
}
