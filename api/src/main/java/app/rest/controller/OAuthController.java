package app.rest.controller;

import app.rest.model.DeleteRefreshToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2RefreshToken;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
public class OAuthController extends ApiErrorController{

    @Autowired
    private TokenStore tokenStore;


    @RequestMapping(value = "/oauth/revoke-token", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void logout(HttpServletRequest request, @RequestBody DeleteRefreshToken token) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            String tokenValue = authHeader.replace("Bearer", "").trim();
            OAuth2AccessToken accessToken = tokenStore.readAccessToken(tokenValue);
            tokenStore.removeAccessToken(accessToken);
            OAuth2RefreshToken refreshToken = tokenStore.readRefreshToken(token.getRefresh_token());
            tokenStore.removeRefreshToken(refreshToken);
        }
    }


}
