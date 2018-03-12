package app.rest.exception;

/**
 * Created by Pavel on 18.02.2018.
 */
public class UserExistedException extends Exception {

    public UserExistedException(String s) {
        super(s);
    }
}
