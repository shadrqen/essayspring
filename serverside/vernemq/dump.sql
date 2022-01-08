--
-- PostgreSQL database dump
--

-- Dumped from database version 11.10
-- Dumped by pg_dump version 11.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: vmq_auth_acl; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vmq_auth_acl (
    mountpoint character varying(10) NOT NULL,
    client_id character varying(128) NOT NULL,
    username character varying(128) NOT NULL,
    password character varying(128),
    publish_acl json,
    subscribe_acl json
);


ALTER TABLE public.vmq_auth_acl OWNER TO postgres;

--
-- Data for Name: vmq_auth_acl; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.vmq_auth_acl VALUES ('', 'web-client', 'web-client-mqtt-2021', '$2a$06$PtxDwhIWjNjTh2MZlQF/p.ydUXTEDVfffU90c0dbgpC.dX399Mgyy', '[]', '[{"pattern": "orders/ws/bid/new/+"}, {"pattern": "payments/ws/mpesa/stk_push/+"}]');
INSERT INTO public.vmq_auth_acl VALUES ('', 'web-server', 'web-server-mqtt-2021', '$2a$06$JCJvv9NH29pZdB8bOUi5ZebIIk0HEeGWTd2rKsfJ5W5hfMTxef2Bu', '[{"pattern": "orders/ws/bid/new/+"}, {"pattern": "payments/ws/mpesa/stk_push/+"}]', '[{"pattern": "orders/wr/bid/new/+"}]');
INSERT INTO public.vmq_auth_acl VALUES ('', 'writeray', 'writeray-mqtt-2021', '$2a$06$/j5d9/rgOgvBpdqA2CQ4QeWjgBLU82bHu1i.jxHP443ycGPK9G6na', '[]', '[{"pattern": "orders/ws/bid/new/+"}]');


--
-- Name: vmq_auth_acl vmq_auth_acl_primary_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vmq_auth_acl
    ADD CONSTRAINT vmq_auth_acl_primary_key PRIMARY KEY (mountpoint, client_id, username);


--
-- PostgreSQL database dump complete
--

