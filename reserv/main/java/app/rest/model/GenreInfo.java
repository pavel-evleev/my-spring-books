package app.rest.model;

/**
 * Created by Pavel on 06.02.2018.
 */
public class GenreInfo {

    private Long id;

    private String name;

    public GenreInfo() {
    }

    public GenreInfo(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
