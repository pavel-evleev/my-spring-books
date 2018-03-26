package app.config;

import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

import javax.servlet.MultipartConfigElement;
import javax.sql.DataSource;

/**
 * The @EnableResourceServer annotation adds a filter of type OAuth2AuthenticationProcessingFilter automatically
 * to the Spring Security filter chain.
 */
@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/v1/users/verify/*").permitAll()
                .antMatchers(HttpMethod.POST, "/v1/users").permitAll()
                .antMatchers(HttpMethod.GET,"/v1/users/heroku/awake").permitAll()
                .antMatchers(HttpMethod.POST, "/v1/img/**").access("hasRole('ADMIN') or hasRole('USER')")
                .antMatchers(HttpMethod.GET, "/v1/img/**").permitAll()
                .antMatchers("/v1/users/**").authenticated()
                .antMatchers("/v1/books/**").authenticated()
                .antMatchers("/v1/authors/admin/**").authenticated()
                .antMatchers(HttpMethod.DELETE, "/post/**").hasAuthority("ROLE_ADMIN")
                .and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());

    }


    @Bean
    public TokenStore tokenStore() {
        return new JdbcTokenStore(getDataSource());
    }

    @Bean(name = "commonsMultipartResolver")
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }


    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();

        factory.setMaxFileSize("5MB");
        factory.setMaxRequestSize("5MB");

        return factory.createMultipartConfig();
    }

    @Bean
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor pool = new ThreadPoolTaskExecutor();
        pool.setCorePoolSize(5);
        pool.setMaxPoolSize(10);
        pool.setWaitForTasksToCompleteOnShutdown(true);
        return pool;
    }


    @Bean
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource getDataSource() {
        return DataSourceBuilder.create().build();
    }


}
