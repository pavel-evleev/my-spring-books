DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: authors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS authors (
  id bigint NOT NULL,
  name character varying(255) NOT NULL
);


--
-- Name: authors_books; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS authors_books (
  id_book bigint NOT NULL,
  id_author bigint NOT NULL
);


--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS authors_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


--
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE authors_id_seq OWNED BY authors.id;


--
-- Name: books; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS books (
  id bigint NOT NULL,
  cover character varying(255),
  date_created date NOT NULL,
  date_publisher date NOT NULL,
  name_book character varying(255) NOT NULL,
  publisher character varying(255) NOT NULL,
  genre_id bigint NOT NULL
);


--
-- Name: books_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS books_comments (
  book_id bigint NOT NULL,
  comment_id bigint NOT NULL
);


--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS books_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE books_id_seq OWNED BY books.id;


--
-- Name: clientdetails; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS clientdetails (
  appid character varying(255) NOT NULL,
  resourceids character varying(255),
  appsecret character varying(255),
  scope character varying(255),
  granttypes character varying(255),
  redirecturl character varying(255),
  authorities character varying(255),
  access_token_validity integer,
  refresh_token_validity integer,
  additionalinformation character varying(4096),
  autoapprovescopes character varying(255)
);


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS comments (
  id bigint NOT NULL,
  date_published date NOT NULL,
  text character varying(255) NOT NULL,
  author_comment_fk bigint
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS comments_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- Name: genre; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS genre (
  id bigint NOT NULL,
  name_book character varying(255) NOT NULL
);


--
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS genre_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


--
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE genre_id_seq OWNED BY genre.id;


--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS hibernate_sequence
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


--
-- Name: login_schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS login_schedule (
  id bigint NOT NULL,
  current_login timestamp without time zone NOT NULL,
  last_login timestamp without time zone NOT NULL,
  user_id bigint NOT NULL
);


--
-- Name: login_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS login_schedule_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


--
-- Name: login_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE login_schedule_id_seq OWNED BY login_schedule.id;


--
-- Name: oauth_access_token; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS oauth_access_token (
  token_id character varying(255),
  token bytea,
  authentication_id character varying(255) NOT NULL,
  user_name character varying(255),
  client_id character varying(255),
  authentication bytea,
  refresh_token character varying(255)
);


--
-- Name: oauth_approvals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS oauth_approvals (
  userid character varying(255),
  clientid character varying(255),
  scope character varying(255),
  status character varying(10),
  expiresat timestamp without time zone,
  lastmodifiedat timestamp without time zone
);


--
-- Name: oauth_client_details; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS oauth_client_details (
  client_id character varying(255) NOT NULL,
  resource_ids character varying(255),
  client_secret character varying(255),
  scope character varying(255),
  authorized_grant_types character varying(255),
  web_server_redirect_uri character varying(255),
  authorities character varying(255),
  access_token_validity integer,
  refresh_token_validity integer,
  additional_information character varying(4096),
  autoapprove character varying(255)
);


--
-- Name: oauth_client_token; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS oauth_client_token (
  token_id character varying(255),
  token bigint,
  authentication_id character varying(255) NOT NULL,
  user_name character varying(255),
  client_id character varying(255)
);


--
-- Name: oauth_code; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS oauth_code (
  code character varying(255),
  authentication bytea
);


--
-- Name: oauth_refresh_token; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS oauth_refresh_token (
  token_id character varying(255),
  token bytea,
  authentication bytea
);


--
-- Name: rating_book; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS rating_book (
  id bigint NOT NULL,
  book_id bigint NOT NULL,
  user_id bigint NOT NULL
);


--
-- Name: rating_book_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS rating_book_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


--
-- Name: rating_book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE rating_book_id_seq OWNED BY rating_book.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS role (
  id bigint NOT NULL,
  role character varying(255)
);


--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS role_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE role_id_seq OWNED BY role.id;


--
-- Name: user_role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS user_role (
  user_id bigint NOT NULL,
  role_id bigint NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS users (
  id bigint NOT NULL,
  active boolean NOT NULL,
  user_avatar character varying(255),
  email character varying(255) NOT NULL,
  name character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  phone character varying(255) NOT NULL,
  uuid character varying(255) NOT NULL
);


--
-- Name: users_books; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS users_books (
  id_user bigint NOT NULL,
  id_books bigint NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS users_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY authors ALTER COLUMN id SET DEFAULT nextval('authors_id_seq'::regclass);


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY books ALTER COLUMN id SET DEFAULT nextval('books_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY genre ALTER COLUMN id SET DEFAULT nextval('genre_id_seq'::regclass);


--
-- Name: login_schedule id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY login_schedule ALTER COLUMN id SET DEFAULT nextval('login_schedule_id_seq'::regclass);


--
-- Name: rating_book id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY rating_book ALTER COLUMN id SET DEFAULT nextval('rating_book_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY role ALTER COLUMN id SET DEFAULT nextval('role_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY authors
  ADD CONSTRAINT  authors_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY books
  ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: clientdetails clientdetails_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY clientdetails
  ADD CONSTRAINT clientdetails_pkey PRIMARY KEY (appid);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments
  ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY genre
  ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- Name: login_schedule login_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY login_schedule
  ADD CONSTRAINT login_schedule_pkey PRIMARY KEY (id);


--
-- Name: oauth_access_token oauth_access_token_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY oauth_access_token
  ADD CONSTRAINT oauth_access_token_pkey PRIMARY KEY (authentication_id);


--
-- Name: oauth_client_details oauth_client_details_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY oauth_client_details
  ADD CONSTRAINT oauth_client_details_pkey PRIMARY KEY (client_id);


--
-- Name: oauth_client_token oauth_client_token_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY oauth_client_token
  ADD CONSTRAINT oauth_client_token_pkey PRIMARY KEY (authentication_id);


--
-- Name: rating_book rating_book_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rating_book
  ADD CONSTRAINT rating_book_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY role
  ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: books_comments uk_nxxyr35hbtswg2tmq1gr6uigy; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY books_comments
  ADD CONSTRAINT uk_nxxyr35hbtswg2tmq1gr6uigy UNIQUE (comment_id);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_role
  ADD CONSTRAINT user_role_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
  ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments fk1772grqowq9hj6tilwxpj9r23; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments
  ADD CONSTRAINT fk1772grqowq9hj6tilwxpj9r23 FOREIGN KEY (author_comment_fk) REFERENCES users(id);


--
-- Name: authors_books fk1vu2kc7yjk2hk90eysryoxaxj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY authors_books
  ADD CONSTRAINT fk1vu2kc7yjk2hk90eysryoxaxj FOREIGN KEY (id_author) REFERENCES authors(id);


--
-- Name: rating_book fk2odg78kcxmf4cr348velh4o8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rating_book
  ADD CONSTRAINT fk2odg78kcxmf4cr348velh4o8 FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: books_comments fk84hr92qei224ck9nphdxhcg6t; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY books_comments
  ADD CONSTRAINT fk84hr92qei224ck9nphdxhcg6t FOREIGN KEY (book_id) REFERENCES books(id);


--
-- Name: user_role fka68196081fvovjhkek5m97n3y; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_role
  ADD CONSTRAINT fka68196081fvovjhkek5m97n3y FOREIGN KEY (role_id) REFERENCES role(id);


--
-- Name: books fkad8kkytqpsb8n9wmbsi0nk6ce; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY books
  ADD CONSTRAINT fkad8kkytqpsb8n9wmbsi0nk6ce FOREIGN KEY (genre_id) REFERENCES genre(id);


--
-- Name: authors_books fkakuayyeujyrvcy7a6jwl18pok; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY authors_books
  ADD CONSTRAINT fkakuayyeujyrvcy7a6jwl18pok FOREIGN KEY (id_book) REFERENCES books(id);


--
-- Name: users_books fkegvkxmog61x77j71vwj8fl26q; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users_books
  ADD CONSTRAINT fkegvkxmog61x77j71vwj8fl26q FOREIGN KEY (id_books) REFERENCES books(id);


--
-- Name: users_books fkf3cbhlyxj8kunwa3ein5316pu; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users_books
  ADD CONSTRAINT fkf3cbhlyxj8kunwa3ein5316pu FOREIGN KEY (id_user) REFERENCES users(id);


--
-- Name: user_role fkj345gk1bovqvfame88rcx7yyx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_role
  ADD CONSTRAINT fkj345gk1bovqvfame88rcx7yyx FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: rating_book fkmgpubbptpmltxp6ewx47dkfq9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rating_book
  ADD CONSTRAINT fkmgpubbptpmltxp6ewx47dkfq9 FOREIGN KEY (book_id) REFERENCES books(id);


--
-- Name: books_comments fksmve5suvxr08sgmu6kppny9ft; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY books_comments
  ADD CONSTRAINT fksmve5suvxr08sgmu6kppny9ft FOREIGN KEY (comment_id) REFERENCES comments(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

