CREATE EXTENSION pgcrypto;
CREATE TABLE vmq_auth_acl
 (
   mountpoint character varying(10) NOT NULL,
   client_id character varying(128) NOT NULL,
   username character varying(128) NOT NULL,
   password character varying(128),
   publish_acl json,
   subscribe_acl json,
   CONSTRAINT vmq_auth_acl_primary_key PRIMARY KEY (mountpoint, client_id, username)
 );

 WITH x AS (
     SELECT
         ''::text AS mountpoint,
            'ep-ws-2021'::text AS client_id,
            'wser'::text AS username,
            'FgP9iUQQHZdglXEEgWmqNaVW9qTAcPEDBgXRZ2i6OJ84XJ4Aac'::text AS password,
            gen_salt('bf')::text AS salt,
            '[{"pattern": "orders/ws/bid/new/+"}, {"pattern": "payments/ws/mpesa/stk_push/+"}]'::json AS publish_acl,
            '[{"pattern": "orders/wr/bid/new/+"}]'::json AS subscribe_acl
     )
 INSERT INTO vmq_auth_acl (mountpoint, client_id, username, password, publish_acl, subscribe_acl)
     SELECT
         x.mountpoint,
         x.client_id,
         x.username,
         crypt(x.password, x.salt),
         publish_acl,
         subscribe_acl
     FROM x;

 WITH x AS (
     SELECT
         ''::text AS mountpoint,
            'ep-wc-2021'::text AS client_id,
            'wcer'::text AS username,
            'ugHY1DUsL5C0TiYaTITFkWgsr6XL7M7on6neKPAhXe7U2sVSXj'::text AS password,
            gen_salt('bf')::text AS salt,
            '[]'::json AS publish_acl,
            '[{"pattern": "orders/ws/bid/new/+"}, {"pattern": "payments/ws/mpesa/stk_push/+"}]'::json AS subscribe_acl
     )
 INSERT INTO vmq_auth_acl (mountpoint, client_id, username, password, publish_acl, subscribe_acl)
     SELECT
         x.mountpoint,
         x.client_id,
         x.username,
         crypt(x.password, x.salt),
         publish_acl,
         subscribe_acl
     FROM x;

 WITH x AS (
     SELECT
         ''::text AS mountpoint,
            'ep-wr-2021'::text AS client_id,
            'wrer'::text AS username,
            'akvtSbrFISamkasTUg61OZXaLLVnGeaqQRDO15rRxm9jg0THbV'::text AS password,
            gen_salt('bf')::text AS salt,
            '[]'::json AS publish_acl,
            '[{"pattern": "orders/ws/bid/new/+"}]'::json AS subscribe_acl
     )
 INSERT INTO vmq_auth_acl (mountpoint, client_id, username, password, publish_acl, subscribe_acl)
     SELECT
         x.mountpoint,
         x.client_id,
         x.username,
         crypt(x.password, x.salt),
         publish_acl,
         subscribe_acl
     FROM x;

-- PASSWORD('OlE...WS...2021')

--ep-ws-2021 - clientId
--wser - username
--FgP9iUQQHZdglXEEgWmqNaVW9qTAcPEDBgXRZ2i6OJ84XJ4Aac - p

--ep-wc-2021 - clientIdh
--wcer - username
--fhx^zkIHoRjn2usVAqlWrjv*6%I1NDyJi!e#w^h21os0T&l&jb - p

--ep-wr-2021 - clientId
--wrer - username
--w2m%FKUmne8%COb@beVBUDcsJ!5dX1W*!HzTXStWd9k!d7w%Ss - p

-- mqttx-ui-2021 - clientId
-- mqttx - username
-- jIG*47$*Z#bL5aVZ##WZeKsm3bXuIeEJZ9jO&^qO*Lbk18tQSX - p

-- mqttexplorer-ui-2021 - clientId
-- mqttexplorer - username
-- *omaAFL1cQe1dp2xU896Z4zHtm0WML8%Le4JeZne%tf4KPOFs0 - p


ws: md9hYDsbBNwkvEFgXKKs8y8vYhxDHaBqh5pegYTac3Nzgv9WWK
wc: 3w2TURStzpby6QqfwAKNBb4x44CMdCQNcdwt2PHGqRz7rQQqyT
