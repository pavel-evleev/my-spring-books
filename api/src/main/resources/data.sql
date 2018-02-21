/** Oauth - populate the oauth_client_details table */
TRUNCATE genre, users, authors, books, role, clientdetails, login_schedule, oauth_client_details, oauth_access_token, oauth_refresh_token RESTART IDENTITY CASCADE;


INSERT INTO oauth_client_details (client_id, client_secret, scope, authorized_grant_types, access_token_validity, additional_information, refresh_token_validity, authorities)
VALUES
  ('my-trusted-client', 'secret', 'read,write,trust', 'client_credentials,password,refresh_token', '3600', '{}',
   '2592000', 'ROLE_CLIENT,ROLE_TRUSTED_CLIENT')
ON CONFLICT (client_id)
  DO UPDATE
    SET client_secret        = 'secret',
      scope                  = 'read,write,trust',
      authorized_grant_types = 'client_credentials,password,refresh_token',
      access_token_validity  = '3600',
      additional_information = '{}';


INSERT INTO genre (name_book) VALUES ('Бизнес-книги');
INSERT INTO genre (name_book) VALUES ('Классическая литература');
INSERT INTO genre (name_book) VALUES ('Детская литература');
INSERT INTO genre (name_book) VALUES ('Детектив');
INSERT INTO genre (name_book) VALUES ('Фэнтези');
INSERT INTO genre (name_book) VALUES ('Фантастика');
INSERT INTO genre (name_book) VALUES ('Приключения');
INSERT INTO genre (name_book) VALUES ('Ужас, мистика');
INSERT INTO genre (name_book) VALUES ('Роман');
INSERT INTO genre (name_book) VALUES ('Психология');
INSERT INTO genre (name_book) VALUES ('Наука');
INSERT INTO genre (name_book) VALUES ('Компьютерная литература');


INSERT INTO role (role) VALUES ('USER');

-- INSERT INTO users (active, user_avatar, email, name, password, phone, uuid)
-- VALUES (TRUE, NULL, 'mr.malefiic@gmail.com', 'pasha', '$2a$10$oYlPxaknznuqOKbXtELwde.L1Q8Ck/RUNN20JKMPuQAUVVc.YpoPC', '354545454', 'asascaca');
--
-- INSERT INTO user_role (user_id, role_id) VALUES (1,1);
