package app.services;

import app.model.Role;
import app.model.User;
import app.repository.RoleRepository;
import app.repository.UserRepository;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.async.Callback;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Future;

/**
 * Created by Pavel on 26.03.2018.
 */
@Service
public class EmailNotifierService {

    private String DOMAIN_NAME;
    private String API_KEY;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    public EmailNotifierService(Environment environment) {
        this.DOMAIN_NAME = environment.getProperty("notify.domain");
        this.API_KEY = environment.getProperty("notify.apiKey");
    }

    private String getAdminEmail() {
        List<Role> roles = new ArrayList<Role>() {{
            add(roleRepository.findByRole("ADMIN"));
        }};
        String email = "";
        Optional<User> optionalAdmin = userRepository.findByRoles(roles);
        if (optionalAdmin.isPresent()) {
            email = optionalAdmin.get().getEmail();
        }
        return email;
    }

    public void notifyAdmin(String entity) {

        Future<HttpResponse<JsonNode>> future = Unirest.post("https://api.mailgun.net/v3/" + DOMAIN_NAME + "/messages")
                .basicAuth("api", API_KEY)
                .queryString("from", "My library <beworm.readedbooks@gmail.com>")
                .queryString("to", getAdminEmail())
                .queryString("subject", "Notify Admin")
                .queryString("text", "The new " + entity + " was add")
                .asJsonAsync(new Callback<JsonNode>() {
                    @Override
                    public void completed(HttpResponse<JsonNode> httpResponse) {
                        int code = httpResponse.getStatus();
                        JsonNode body = httpResponse.getBody();
                        InputStream rawBody = httpResponse.getRawBody();
                        System.out.println("NOTIFY Admin: The notify admin and with status " + code);
                    }

                    @Override
                    public void failed(UnirestException e) {
                        System.out.println(e.getMessage());
                    }

                    @Override
                    public void cancelled() {
                        System.out.println("NOTIFY Admin: The request notify admin has been cancelled");
                    }
                });

    }
}
