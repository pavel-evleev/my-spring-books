package app.rest.controller;

import app.rest.model.UserInfo;
import app.services.LoginScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2RefreshToken;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;

@Controller
public class OAuthController extends ApiErrorController {

    @Autowired
    private TokenStore tokenStore;

    @Autowired
    private LoginScheduleService scheduleService;


    @RequestMapping(value = "/oauth/revoke-token", method = RequestMethod.POST)
    public ResponseEntity logout(HttpServletRequest request, @RequestBody UserInfo user) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            String tokenValue = authHeader.replace("Bearer", "").trim();

            OAuth2AccessToken accessToken = tokenStore.readAccessToken(tokenValue);
            OAuth2RefreshToken refreshToken = accessToken.getRefreshToken();
            tokenStore.removeAccessToken(accessToken);
            tokenStore.removeRefreshToken(refreshToken);

            scheduleService.setLastLogin(user.getId(), LocalDate.now());

            return ResponseEntity.ok("Logout success");
        }
        return ResponseEntity.badRequest().body("Don't have token to revoke");

    }


}
