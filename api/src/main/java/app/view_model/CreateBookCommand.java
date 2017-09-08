package app.view_model;

import java.sql.Date;
import java.util.List;

/**
 * Created by Pavel on 26.08.2017.
 */
public class CreateBookCommand {

    public String name;

    public String publisher;

    public Date datePublished;

    public List<Integer> authorsIds;

    public List<Integer> getAuthorsIds() {
        return authorsIds;
    }
}
