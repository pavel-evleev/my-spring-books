package app.rest.exception;

/**
 * Created by Pavel on 12.03.2018.
 */
public class BookException extends Exception {

    public BookException(){
        super("Book not existed or not approved");
    }

    public BookException(String s) {
        super(s);
    }
}
