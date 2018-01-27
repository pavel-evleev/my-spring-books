package app.config;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.servlet.MultipartConfigElement;
import javax.sql.DataSource;

/**
 * The @EnableResourceServer annotation adds a filter of type OAuth2AuthenticationProcessingFilter automatically
 * to the Spring Security filter chain.
 */
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Autowired
    Environment env;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/v1/books/image/**",
                        "/v1/users/verify/*").permitAll()
                .antMatchers("/v1/users/**", "/v1/users").authenticated()
                .antMatchers("/v1/books/**").authenticated()
                .antMatchers(HttpMethod.POST, "/v1/users").permitAll()
                .antMatchers(HttpMethod.DELETE, "/post/**").hasAuthority("ROLE_ADMIN");

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
    public DataSource getDataSource() {
        MysqlDataSource dataSource = new MysqlDataSource();
        dataSource.setUrl(env.getProperty("spring.datasource.url"));
        dataSource.setUser(env.getProperty("spring.datasource.username"));
        dataSource.setPassword(env.getProperty("spring.datasource.password"));
        return dataSource;
    }

//    @Bean
//    public WebMvcConfigurerAdapter webConfigurer () {
//        return new WebMvcConfigurerAdapter() {
//            @Override
//            public void addResourceHandlers (ResourceHandlerRegistry registry) {
//                registry.addResourceHandler("D:/testImage/**")
//                        .addResourceLocations("/testImage/")
//                        .setCachePeriod(60*60*60*24*90);
//            }
//        };
//    }

}
