package app.rest.model;

/**
 * Created by Pavel on 18.02.2018.
 */
public class UserExistedException extends Exception {

    public UserExistedException(String s) {
        super(s);
    }
}
