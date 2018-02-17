/** Oauth - populate the oauth_client_details table */
INSERT INTO `oauth_client_details` (`client_id`, `client_secret`, `scope`, `authorized_grant_types`, `access_token_validity`, `additional_information`, `refresh_token_validity`, `authorities`)
VALUES
('my-trusted-client', 'secret', 'read,write,trust', 'client_credentials,password,refresh_token', '3600', '{}', '2592000','ROLE_CLIENT,ROLE_TRUSTED_CLIENT')
ON DUPLICATE key UPDATE
client_secret = VALUES(`client_secret`),
scope = VALUES(`scope`),
authorized_grant_types = VALUES(`authorized_grant_types`),
access_token_validity = VALUES(`access_token_validity`),
additional_information = VALUES(`additional_information`);