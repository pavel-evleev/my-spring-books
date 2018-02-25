//package app.rest.controller;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.runners.MockitoJUnitRunner;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//
//import java.io.FileInputStream;
//import java.util.Arrays;
//
//import static com.jayway.jsonpath.JsonPath.read;
//import static org.assertj.core.api.Java6Assertions.assertThat;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Matchers.anyString;
//import static org.mockito.Matchers.isNull;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@RunWith(MockitoJUnitRunner.class)
//@WebMvcTest(BookController.class)
////@AutoConfigureMockMvc
//public class BookCRUDRestTest {
//
//
//    @Autowired
//    private MockMvc mockMvc;
//
//
//    @MockBean
//    private BookController controller;
////    @Mock
////    private BookService bookService;
////
////    @Before
////    public void init() {
////        when(bookService.save(
////                new CreateBookCommand("Piter Pen","LSC", LocalDate.parse("2111-01-15"),LocalDate.parse("2111-01-15"), Arrays.asList(1L),1L),"asasdasd"))
////                .thenReturn(new Book("Piter Pen","LSC", Date.valueOf("2111-01-15"),Date.valueOf("2111-01-15")));
////    }
//
//    @Test
//    public void createBookTest() throws Exception {
//
//
//        given(controller.create(null, "Piter Pen", "LSC",
//                "2111-01-15", "2111-01-15",
//                 Arrays.asList(1L), 1L,null)).willReturn(ResponseEntity.ok().build());
//
//
////        String createAuthorJson = "{ \"name\": \"Ron\" }";
////
////        final ResultActions createAuthorResult = mockMvc.perform(post("/v1/authors")
////                .contentType(MediaType.APPLICATION_JSON_VALUE).content(createAuthorJson));
////
////        Integer idAuthor = read(createAuthorResult.andReturn().getResponse().getContentAsString(), "$.id");
////
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("name", "Piter Pen");
//        params.add("publisher", "LSC");
//        params.add("authorsIds", String.valueOf(1L));
//        params.add("datePublished", "2111-01-15");
//        params.add("dateCreated", "2111-01-15");
//        params.add("genreId", String.valueOf(1L));
//        final ResultActions createBookResult = mockMvc.perform(post("/v1/books")
//                .params(params)
//                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE));
//
//        createBookResult.andExpect(status().isCreated());
////
////        String createdBook = createBookResult.andReturn().getResponse().getContentAsString();
////
////        Integer idCreatedBook = read(createdBook, "$.id");
////
////        assertThat(idCreatedBook).isPositive();
////
////        deleteBook(idCreatedBook.longValue());
////        mockMvc.perform(delete("/v1/authors/" + idAuthor));
//    }
//
//    // @Test
//    public void shouldNotCreateBookWithEmptyField() throws Exception {
//        String createBookJSON = "{\"name\":\" \"}";
//
//        final ResultActions createAuthorResult = mockMvc.perform(post("/v1/books")
//                .contentType(MediaType.APPLICATION_JSON_VALUE)
//                .content(createBookJSON));
//
//        createAuthorResult.andExpect(status().isBadRequest());
//    }
//
//    // @Test
//    public void shouldReturnBookById() throws Exception {
//
//        String createAuthorJson = "{ \"name\": \"Ron\" }";
//
//        final ResultActions createAuthorResult = mockMvc.perform(post("/v1/authors")
//                .contentType(MediaType.APPLICATION_JSON_VALUE).content(createAuthorJson));
//
//        Integer idAuthor = read(createAuthorResult.andReturn().getResponse().getContentAsString(), "$.id");
//
//        String createBookJSON = "{\"name\":\"Piter Pen\"," +
//                "\"publisher\":\"LSC\"," +
//                " \"authorsIds\":[\"" + idAuthor + "\"]}";
//
//        final ResultActions createBookResult = mockMvc.perform(post("/v1/books")
//                .contentType(MediaType.APPLICATION_JSON_VALUE)
//                .content(createBookJSON));
//
//        createBookResult.andExpect(status().isCreated());
//
//        String createdBook = createBookResult.andReturn().
//                getResponse().getContentAsString();
//        Integer idCreatedBook = read(createdBook, "$.id");
//        String nameCreatedBook = read(createdBook, "$.name");
//
//        final ResultActions getById = mockMvc.perform(get("/v1/books/" + idCreatedBook)
//                .contentType(MediaType.APPLICATION_JSON_VALUE));
//
//        String getedById = getById.andReturn().getResponse().getContentAsString();
//        Integer idgetedBook = read(getedById, "$.id");
//        String nameGetedBook = read(getedById, "$.name");
//
//        assertThat(idgetedBook).isEqualTo(idCreatedBook);
//        assertThat(nameGetedBook).isEqualTo(nameCreatedBook);
//
//        deleteBook(idgetedBook.longValue());
//        mockMvc.perform(delete("/v1/authors/" + idAuthor));
//    }
//
//
//    private void deleteBook(final Long id) throws Exception {
//        mockMvc.perform(delete("/v1/books/" + id));
//    }
//
//}
