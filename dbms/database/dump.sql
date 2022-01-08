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
-- Name: admin; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA admin;


ALTER SCHEMA admin OWNER TO postgres;

--
-- Name: chats; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA chats;


ALTER SCHEMA chats OWNER TO postgres;

--
-- Name: client; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA client;


ALTER SCHEMA client OWNER TO postgres;

--
-- Name: general; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA general;


ALTER SCHEMA general OWNER TO postgres;

--
-- Name: logs; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA logs;


ALTER SCHEMA logs OWNER TO postgres;

--
-- Name: orders; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA orders;


ALTER SCHEMA orders OWNER TO postgres;

--
-- Name: payments; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA payments;


ALTER SCHEMA payments OWNER TO postgres;

--
-- Name: writer; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA writer;


ALTER SCHEMA writer OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: admin; Type: TABLE; Schema: admin; Owner: postgres
--

CREATE TABLE admin.admin (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    mobile character varying(15) NOT NULL,
    surname character varying(20) NOT NULL,
    "otherNames" character varying(20) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE admin.admin OWNER TO postgres;

--
-- Name: admin_id_seq; Type: SEQUENCE; Schema: admin; Owner: postgres
--

CREATE SEQUENCE admin.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE admin.admin_id_seq OWNER TO postgres;

--
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: admin; Owner: postgres
--

ALTER SEQUENCE admin.admin_id_seq OWNED BY admin.admin.id;


--
-- Name: admin_role; Type: TABLE; Schema: admin; Owner: postgres
--

CREATE TABLE admin.admin_role (
    id integer NOT NULL,
    "adminId" integer NOT NULL,
    "roleId" integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE admin.admin_role OWNER TO postgres;

--
-- Name: admin_role_id_seq; Type: SEQUENCE; Schema: admin; Owner: postgres
--

CREATE SEQUENCE admin.admin_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE admin.admin_role_id_seq OWNER TO postgres;

--
-- Name: admin_role_id_seq; Type: SEQUENCE OWNED BY; Schema: admin; Owner: postgres
--

ALTER SEQUENCE admin.admin_role_id_seq OWNED BY admin.admin_role.id;


--
-- Name: administrative_role; Type: TABLE; Schema: admin; Owner: postgres
--

CREATE TABLE admin.administrative_role (
    id integer NOT NULL,
    role character varying(20) NOT NULL,
    "roleCode" character varying(5) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE admin.administrative_role OWNER TO postgres;

--
-- Name: administrative_role_id_seq; Type: SEQUENCE; Schema: admin; Owner: postgres
--

CREATE SEQUENCE admin.administrative_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE admin.administrative_role_id_seq OWNER TO postgres;

--
-- Name: administrative_role_id_seq; Type: SEQUENCE OWNED BY; Schema: admin; Owner: postgres
--

ALTER SEQUENCE admin.administrative_role_id_seq OWNED BY admin.administrative_role.id;


--
-- Name: writer_management; Type: TABLE; Schema: admin; Owner: postgres
--

CREATE TABLE admin.writer_management (
    id integer NOT NULL,
    "currentSeason" character varying(10) NOT NULL,
    "registrationOpen" boolean DEFAULT false NOT NULL,
    "expectedWriterCount" integer DEFAULT 0 NOT NULL,
    "currentWriterCount" integer DEFAULT 0 NOT NULL,
    "writerCountVariance" integer DEFAULT 0 NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE admin.writer_management OWNER TO postgres;

--
-- Name: writer_management_id_seq; Type: SEQUENCE; Schema: admin; Owner: postgres
--

CREATE SEQUENCE admin.writer_management_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE admin.writer_management_id_seq OWNER TO postgres;

--
-- Name: writer_management_id_seq; Type: SEQUENCE OWNED BY; Schema: admin; Owner: postgres
--

ALTER SEQUENCE admin.writer_management_id_seq OWNED BY admin.writer_management.id;


--
-- Name: chat; Type: TABLE; Schema: chats; Owner: postgres
--

CREATE TABLE chats.chat (
    id integer NOT NULL,
    "user1Id" integer NOT NULL,
    "user2Id" integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE chats.chat OWNER TO postgres;

--
-- Name: chat_content; Type: TABLE; Schema: chats; Owner: postgres
--

CREATE TABLE chats.chat_content (
    id integer NOT NULL,
    "chatId" integer NOT NULL,
    message text NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE chats.chat_content OWNER TO postgres;

--
-- Name: chat_content_id_seq; Type: SEQUENCE; Schema: chats; Owner: postgres
--

CREATE SEQUENCE chats.chat_content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chats.chat_content_id_seq OWNER TO postgres;

--
-- Name: chat_content_id_seq; Type: SEQUENCE OWNED BY; Schema: chats; Owner: postgres
--

ALTER SEQUENCE chats.chat_content_id_seq OWNED BY chats.chat_content.id;


--
-- Name: chat_id_seq; Type: SEQUENCE; Schema: chats; Owner: postgres
--

CREATE SEQUENCE chats.chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chats.chat_id_seq OWNER TO postgres;

--
-- Name: chat_id_seq; Type: SEQUENCE OWNED BY; Schema: chats; Owner: postgres
--

ALTER SEQUENCE chats.chat_id_seq OWNED BY chats.chat.id;


--
-- Name: client; Type: TABLE; Schema: client; Owner: postgres
--

CREATE TABLE client.client (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    name character varying(100),
    mobile character varying(15),
    picture character varying(200),
    "facebookId" character varying(30),
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE client.client OWNER TO postgres;

--
-- Name: client-otp-code; Type: TABLE; Schema: client; Owner: postgres
--

CREATE TABLE client."client-otp-code" (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "otpCode" character varying(10),
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE client."client-otp-code" OWNER TO postgres;

--
-- Name: client-otp-code_id_seq; Type: SEQUENCE; Schema: client; Owner: postgres
--

CREATE SEQUENCE client."client-otp-code_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE client."client-otp-code_id_seq" OWNER TO postgres;

--
-- Name: client-otp-code_id_seq; Type: SEQUENCE OWNED BY; Schema: client; Owner: postgres
--

ALTER SEQUENCE client."client-otp-code_id_seq" OWNED BY client."client-otp-code".id;


--
-- Name: client_activity; Type: TABLE; Schema: client; Owner: postgres
--

CREATE TABLE client.client_activity (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "numOfSuccessfulOrders" integer DEFAULT 0 NOT NULL,
    "numOfFailedOrders" integer DEFAULT 0 NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE client.client_activity OWNER TO postgres;

--
-- Name: client_activity_id_seq; Type: SEQUENCE; Schema: client; Owner: postgres
--

CREATE SEQUENCE client.client_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE client.client_activity_id_seq OWNER TO postgres;

--
-- Name: client_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: client; Owner: postgres
--

ALTER SEQUENCE client.client_activity_id_seq OWNED BY client.client_activity.id;


--
-- Name: client_id_seq; Type: SEQUENCE; Schema: client; Owner: postgres
--

CREATE SEQUENCE client.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE client.client_id_seq OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: client; Owner: postgres
--

ALTER SEQUENCE client.client_id_seq OWNED BY client.client.id;


--
-- Name: client_order_posting_step; Type: TABLE; Schema: client; Owner: postgres
--

CREATE TABLE client.client_order_posting_step (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "orderId" integer NOT NULL,
    "lastStep" integer DEFAULT 0 NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE client.client_order_posting_step OWNER TO postgres;

--
-- Name: client_order_posting_step_id_seq; Type: SEQUENCE; Schema: client; Owner: postgres
--

CREATE SEQUENCE client.client_order_posting_step_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE client.client_order_posting_step_id_seq OWNER TO postgres;

--
-- Name: client_order_posting_step_id_seq; Type: SEQUENCE OWNED BY; Schema: client; Owner: postgres
--

ALTER SEQUENCE client.client_order_posting_step_id_seq OWNED BY client.client_order_posting_step.id;


--
-- Name: assgnmnt_type_category; Type: TABLE; Schema: general; Owner: postgres
--

CREATE TABLE general.assgnmnt_type_category (
    id integer NOT NULL,
    category character varying(50) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE general.assgnmnt_type_category OWNER TO postgres;

--
-- Name: assgnmnt_type_category_id_seq; Type: SEQUENCE; Schema: general; Owner: postgres
--

CREATE SEQUENCE general.assgnmnt_type_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE general.assgnmnt_type_category_id_seq OWNER TO postgres;

--
-- Name: assgnmnt_type_category_id_seq; Type: SEQUENCE OWNED BY; Schema: general; Owner: postgres
--

ALTER SEQUENCE general.assgnmnt_type_category_id_seq OWNED BY general.assgnmnt_type_category.id;


--
-- Name: assignment_type; Type: TABLE; Schema: general; Owner: postgres
--

CREATE TABLE general.assignment_type (
    id integer NOT NULL,
    category integer NOT NULL,
    tier integer NOT NULL,
    type character varying(50) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE general.assignment_type OWNER TO postgres;

--
-- Name: assignment_type_id_seq; Type: SEQUENCE; Schema: general; Owner: postgres
--

CREATE SEQUENCE general.assignment_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE general.assignment_type_id_seq OWNER TO postgres;

--
-- Name: assignment_type_id_seq; Type: SEQUENCE OWNED BY; Schema: general; Owner: postgres
--

ALTER SEQUENCE general.assignment_type_id_seq OWNED BY general.assignment_type.id;


--
-- Name: citation_style; Type: TABLE; Schema: general; Owner: postgres
--

CREATE TABLE general.citation_style (
    id integer NOT NULL,
    citation character varying(20) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE general.citation_style OWNER TO postgres;

--
-- Name: citation_style_documentation; Type: TABLE; Schema: general; Owner: postgres
--

CREATE TABLE general.citation_style_documentation (
    id integer NOT NULL,
    "citationStyleId" integer NOT NULL,
    "documentationUrl" character varying(20) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE general.citation_style_documentation OWNER TO postgres;

--
-- Name: citation_style_documentation_id_seq; Type: SEQUENCE; Schema: general; Owner: postgres
--

CREATE SEQUENCE general.citation_style_documentation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE general.citation_style_documentation_id_seq OWNER TO postgres;

--
-- Name: citation_style_documentation_id_seq; Type: SEQUENCE OWNED BY; Schema: general; Owner: postgres
--

ALTER SEQUENCE general.citation_style_documentation_id_seq OWNED BY general.citation_style_documentation.id;


--
-- Name: citation_style_id_seq; Type: SEQUENCE; Schema: general; Owner: postgres
--

CREATE SEQUENCE general.citation_style_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE general.citation_style_id_seq OWNER TO postgres;

--
-- Name: citation_style_id_seq; Type: SEQUENCE OWNED BY; Schema: general; Owner: postgres
--

ALTER SEQUENCE general.citation_style_id_seq OWNED BY general.citation_style.id;


--
-- Name: country; Type: TABLE; Schema: general; Owner: postgres
--

CREATE TABLE general.country (
    id integer NOT NULL,
    country character varying(60),
    "countryCode" character varying(3) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE general.country OWNER TO postgres;

--
-- Name: country_id_seq; Type: SEQUENCE; Schema: general; Owner: postgres
--

CREATE SEQUENCE general.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE general.country_id_seq OWNER TO postgres;

--
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: general; Owner: postgres
--

ALTER SEQUENCE general.country_id_seq OWNED BY general.country.id;


--
-- Name: discipline; Type: TABLE; Schema: general; Owner: postgres
--

CREATE TABLE general.discipline (
    id integer NOT NULL,
    discipline character varying(50) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE general.discipline OWNER TO postgres;

--
-- Name: discipline_id_seq; Type: SEQUENCE; Schema: general; Owner: postgres
--

CREATE SEQUENCE general.discipline_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE general.discipline_id_seq OWNER TO postgres;

--
-- Name: discipline_id_seq; Type: SEQUENCE OWNED BY; Schema: general; Owner: postgres
--

ALTER SEQUENCE general.discipline_id_seq OWNED BY general.discipline.id;


--
-- Name: education_level; Type: TABLE; Schema: general; Owner: postgres
--

CREATE TABLE general.education_level (
    id integer NOT NULL,
    level character varying(15) NOT NULL,
    "academicInclined" boolean DEFAULT true NOT NULL,
    "orderInclined" boolean DEFAULT true NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE general.education_level OWNER TO postgres;

--
-- Name: education_level_id_seq; Type: SEQUENCE; Schema: general; Owner: postgres
--

CREATE SEQUENCE general.education_level_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE general.education_level_id_seq OWNER TO postgres;

--
-- Name: education_level_id_seq; Type: SEQUENCE OWNED BY; Schema: general; Owner: postgres
--

ALTER SEQUENCE general.education_level_id_seq OWNED BY general.education_level.id;


--
-- Name: gender; Type: TABLE; Schema: general; Owner: postgres
--

CREATE TABLE general.gender (
    id integer NOT NULL,
    gender character varying(6) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE general.gender OWNER TO postgres;

--
-- Name: gender_id_seq; Type: SEQUENCE; Schema: general; Owner: postgres
--

CREATE SEQUENCE general.gender_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE general.gender_id_seq OWNER TO postgres;

--
-- Name: gender_id_seq; Type: SEQUENCE OWNED BY; Schema: general; Owner: postgres
--

ALTER SEQUENCE general.gender_id_seq OWNED BY general.gender.id;


--
-- Name: time_am_pm; Type: TABLE; Schema: general; Owner: postgres
--

CREATE TABLE general.time_am_pm (
    id integer NOT NULL,
    "time" character varying(5) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE general.time_am_pm OWNER TO postgres;

--
-- Name: time_am_pm_id_seq; Type: SEQUENCE; Schema: general; Owner: postgres
--

CREATE SEQUENCE general.time_am_pm_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE general.time_am_pm_id_seq OWNER TO postgres;

--
-- Name: time_am_pm_id_seq; Type: SEQUENCE OWNED BY; Schema: general; Owner: postgres
--

ALTER SEQUENCE general.time_am_pm_id_seq OWNED BY general.time_am_pm.id;


--
-- Name: access_log; Type: TABLE; Schema: logs; Owner: postgres
--

CREATE TABLE logs.access_log (
    id integer NOT NULL,
    "ipAddress" character varying(20),
    origin character varying(100),
    "originalUrl" character varying(500),
    referer character varying(500),
    "partyTypeId" integer NOT NULL,
    "partyEmail" character varying(50),
    "formData" json,
    suspect boolean NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE logs.access_log OWNER TO postgres;

--
-- Name: access_log_id_seq; Type: SEQUENCE; Schema: logs; Owner: postgres
--

CREATE SEQUENCE logs.access_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE logs.access_log_id_seq OWNER TO postgres;

--
-- Name: access_log_id_seq; Type: SEQUENCE OWNED BY; Schema: logs; Owner: postgres
--

ALTER SEQUENCE logs.access_log_id_seq OWNED BY logs.access_log.id;


--
-- Name: client_order; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.client_order (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "orderId" integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders.client_order OWNER TO postgres;

--
-- Name: client_order_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.client_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.client_order_id_seq OWNER TO postgres;

--
-- Name: client_order_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.client_order_id_seq OWNED BY orders.client_order.id;


--
-- Name: extra_order_service; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.extra_order_service (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "serviceTypeId" integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders.extra_order_service OWNER TO postgres;

--
-- Name: extra_order_service_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.extra_order_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.extra_order_service_id_seq OWNER TO postgres;

--
-- Name: extra_order_service_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.extra_order_service_id_seq OWNED BY orders.extra_order_service.id;


--
-- Name: order; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders."order" (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "serviceTypeId" integer NOT NULL,
    "statusId" integer NOT NULL,
    "subjectId" integer NOT NULL,
    "assignmentType" integer NOT NULL,
    "citationStyleId" integer NOT NULL,
    "orderFormatId" integer NOT NULL,
    "studyLevelId" integer NOT NULL,
    "deadlineDate" timestamp with time zone NOT NULL,
    "deadlineTime" integer NOT NULL,
    "pageCount" integer NOT NULL,
    sources integer NOT NULL,
    topic character varying(200) NOT NULL,
    instructions text,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders."order" OWNER TO postgres;

--
-- Name: order_bid; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.order_bid (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "orderId" integer NOT NULL,
    successful boolean DEFAULT false NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders.order_bid OWNER TO postgres;

--
-- Name: order_bid_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.order_bid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.order_bid_id_seq OWNER TO postgres;

--
-- Name: order_bid_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.order_bid_id_seq OWNED BY orders.order_bid.id;


--
-- Name: order_file; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.order_file (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    type integer NOT NULL,
    "fileUrl" character varying(50) NOT NULL,
    "submittedPaper" boolean NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders.order_file OWNER TO postgres;

--
-- Name: order_file_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.order_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.order_file_id_seq OWNER TO postgres;

--
-- Name: order_file_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.order_file_id_seq OWNED BY orders.order_file.id;


--
-- Name: order_file_type; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.order_file_type (
    id integer NOT NULL,
    type character varying(50) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders.order_file_type OWNER TO postgres;

--
-- Name: order_file_type_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.order_file_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.order_file_type_id_seq OWNER TO postgres;

--
-- Name: order_file_type_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.order_file_type_id_seq OWNED BY orders.order_file_type.id;


--
-- Name: order_format; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.order_format (
    id integer NOT NULL,
    "wordsPerPage" integer DEFAULT 0 NOT NULL,
    spacing character varying(30) NOT NULL,
    "currentlyInUse" boolean DEFAULT false NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders.order_format OWNER TO postgres;

--
-- Name: order_format_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.order_format_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.order_format_id_seq OWNER TO postgres;

--
-- Name: order_format_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.order_format_id_seq OWNED BY orders.order_format.id;


--
-- Name: order_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.order_id_seq OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.order_id_seq OWNED BY orders."order".id;


--
-- Name: order_revision; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.order_revision (
    id integer NOT NULL,
    "orderId" integer,
    "revisionInstructions" jsonb NOT NULL,
    deadline timestamp with time zone NOT NULL,
    submitted boolean DEFAULT false NOT NULL,
    creator integer NOT NULL,
    editor integer,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders.order_revision OWNER TO postgres;

--
-- Name: order_revision_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.order_revision_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.order_revision_id_seq OWNER TO postgres;

--
-- Name: order_revision_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.order_revision_id_seq OWNED BY orders.order_revision.id;


--
-- Name: order_service_type; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.order_service_type (
    id integer NOT NULL,
    type character varying(30) NOT NULL,
    extra boolean DEFAULT false NOT NULL,
    description character varying(100) NOT NULL,
    price character varying(10) NOT NULL,
    "currencyId" integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders.order_service_type OWNER TO postgres;

--
-- Name: order_service_type_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.order_service_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.order_service_type_id_seq OWNER TO postgres;

--
-- Name: order_service_type_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.order_service_type_id_seq OWNED BY orders.order_service_type.id;


--
-- Name: order_status; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.order_status (
    id integer NOT NULL,
    status character varying(30) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders.order_status OWNER TO postgres;

--
-- Name: order_status_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.order_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.order_status_id_seq OWNER TO postgres;

--
-- Name: order_status_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.order_status_id_seq OWNED BY orders.order_status.id;


--
-- Name: submission_checklist; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.submission_checklist (
    id integer NOT NULL,
    aspect character varying(50) NOT NULL,
    "aspectDescription" character varying(500) NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders.submission_checklist OWNER TO postgres;

--
-- Name: submission_checklist_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.submission_checklist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.submission_checklist_id_seq OWNER TO postgres;

--
-- Name: submission_checklist_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.submission_checklist_id_seq OWNED BY orders.submission_checklist.id;


--
-- Name: writer_order; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.writer_order (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "orderId" integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE orders.writer_order OWNER TO postgres;

--
-- Name: writer_order_id_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.writer_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders.writer_order_id_seq OWNER TO postgres;

--
-- Name: writer_order_id_seq; Type: SEQUENCE OWNED BY; Schema: orders; Owner: postgres
--

ALTER SEQUENCE orders.writer_order_id_seq OWNED BY orders.writer_order.id;


--
-- Name: base_price; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.base_price (
    id integer NOT NULL,
    "serviceType" integer NOT NULL,
    tier integer NOT NULL,
    currency integer NOT NULL,
    price integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.base_price OWNER TO postgres;

--
-- Name: base_price_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.base_price_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.base_price_id_seq OWNER TO postgres;

--
-- Name: base_price_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.base_price_id_seq OWNED BY payments.base_price.id;


--
-- Name: client_balance; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.client_balance (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "currencyId" integer NOT NULL,
    amount double precision DEFAULT '0'::double precision NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.client_balance OWNER TO postgres;

--
-- Name: client_balance_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.client_balance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.client_balance_id_seq OWNER TO postgres;

--
-- Name: client_balance_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.client_balance_id_seq OWNED BY payments.client_balance.id;


--
-- Name: client_payment; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.client_payment (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "currencyId" integer NOT NULL,
    "orderId" integer NOT NULL,
    "statusId" integer NOT NULL,
    "transactionId" character varying(60) NOT NULL,
    "checkoutRequestId" character varying(255) NOT NULL,
    mobile character varying(15) NOT NULL,
    amount double precision DEFAULT '0'::double precision NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.client_payment OWNER TO postgres;

--
-- Name: client_payment_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.client_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.client_payment_id_seq OWNER TO postgres;

--
-- Name: client_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.client_payment_id_seq OWNED BY payments.client_payment.id;


--
-- Name: currency; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.currency (
    id integer NOT NULL,
    currency character varying(30) NOT NULL,
    "currencyCode" character varying(3) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.currency OWNER TO postgres;

--
-- Name: currency_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.currency_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.currency_id_seq OWNER TO postgres;

--
-- Name: currency_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.currency_id_seq OWNED BY payments.currency.id;


--
-- Name: mpesa; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.mpesa (
    id integer NOT NULL,
    "checkoutRequestId" character varying(50) NOT NULL,
    "merchantRequestId" character varying(30) NOT NULL,
    amount integer NOT NULL,
    "receiptNumber" character varying(15) NOT NULL,
    "transactionDate" character varying(15) NOT NULL,
    mobile character varying(13) NOT NULL,
    "resultCodeId" integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.mpesa OWNER TO postgres;

--
-- Name: mpesa_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.mpesa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.mpesa_id_seq OWNER TO postgres;

--
-- Name: mpesa_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.mpesa_id_seq OWNED BY payments.mpesa.id;


--
-- Name: mpesa_result_codes; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.mpesa_result_codes (
    id integer NOT NULL,
    "resultCode" integer NOT NULL,
    "resultDesc" character varying(100) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.mpesa_result_codes OWNER TO postgres;

--
-- Name: mpesa_result_codes_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.mpesa_result_codes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.mpesa_result_codes_id_seq OWNER TO postgres;

--
-- Name: mpesa_result_codes_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.mpesa_result_codes_id_seq OWNED BY payments.mpesa_result_codes.id;


--
-- Name: order_payment_detail; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.order_payment_detail (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "currencyId" integer NOT NULL,
    extras character varying(6),
    "extrasTotalPrice" double precision DEFAULT '0'::double precision NOT NULL,
    "totalPrice" double precision DEFAULT '0'::double precision NOT NULL,
    cpp double precision DEFAULT '0'::double precision NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.order_payment_detail OWNER TO postgres;

--
-- Name: order_payment_detail_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.order_payment_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.order_payment_detail_id_seq OWNER TO postgres;

--
-- Name: order_payment_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.order_payment_detail_id_seq OWNED BY payments.order_payment_detail.id;


--
-- Name: paper_discount; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.paper_discount (
    id integer NOT NULL,
    discount double precision DEFAULT '0'::double precision NOT NULL,
    "lowerLimit" integer NOT NULL,
    "upperLimit" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.paper_discount OWNER TO postgres;

--
-- Name: paper_discount_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.paper_discount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.paper_discount_id_seq OWNER TO postgres;

--
-- Name: paper_discount_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.paper_discount_id_seq OWNED BY payments.paper_discount.id;


--
-- Name: payment_ratio; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.payment_ratio (
    id integer NOT NULL,
    company integer NOT NULL,
    writer integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.payment_ratio OWNER TO postgres;

--
-- Name: payment_ratio_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.payment_ratio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.payment_ratio_id_seq OWNER TO postgres;

--
-- Name: payment_ratio_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.payment_ratio_id_seq OWNED BY payments.payment_ratio.id;


--
-- Name: payment_status; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.payment_status (
    id integer NOT NULL,
    status character varying(20) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.payment_status OWNER TO postgres;

--
-- Name: payment_status_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.payment_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.payment_status_id_seq OWNER TO postgres;

--
-- Name: payment_status_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.payment_status_id_seq OWNED BY payments.payment_status.id;


--
-- Name: price_increment; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.price_increment (
    id integer NOT NULL,
    "serviceType" integer NOT NULL,
    tier integer NOT NULL,
    hr12 double precision DEFAULT '0'::double precision NOT NULL,
    day1 double precision DEFAULT '0'::double precision NOT NULL,
    day2 double precision DEFAULT '0'::double precision NOT NULL,
    day3 double precision DEFAULT '0'::double precision NOT NULL,
    day5 double precision DEFAULT '0'::double precision NOT NULL,
    college double precision DEFAULT '0'::double precision NOT NULL,
    bachelors double precision DEFAULT '0'::double precision NOT NULL,
    masters double precision DEFAULT '0'::double precision NOT NULL,
    doctorate double precision DEFAULT '0'::double precision NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.price_increment OWNER TO postgres;

--
-- Name: price_increment_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.price_increment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.price_increment_id_seq OWNER TO postgres;

--
-- Name: price_increment_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.price_increment_id_seq OWNED BY payments.price_increment.id;


--
-- Name: price_tier; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.price_tier (
    id integer NOT NULL,
    tier character varying(10) NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.price_tier OWNER TO postgres;

--
-- Name: price_tier_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.price_tier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.price_tier_id_seq OWNER TO postgres;

--
-- Name: price_tier_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.price_tier_id_seq OWNED BY payments.price_tier.id;


--
-- Name: writer_balance; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.writer_balance (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "currencyId" integer NOT NULL,
    amount double precision DEFAULT '0'::double precision NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.writer_balance OWNER TO postgres;

--
-- Name: writer_balance_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.writer_balance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.writer_balance_id_seq OWNER TO postgres;

--
-- Name: writer_balance_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.writer_balance_id_seq OWNED BY payments.writer_balance.id;


--
-- Name: writer_payment; Type: TABLE; Schema: payments; Owner: postgres
--

CREATE TABLE payments.writer_payment (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "currencyId" integer NOT NULL,
    "orderId" integer NOT NULL,
    "statusId" integer NOT NULL,
    amount double precision DEFAULT '0'::double precision NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE payments.writer_payment OWNER TO postgres;

--
-- Name: writer_payment_id_seq; Type: SEQUENCE; Schema: payments; Owner: postgres
--

CREATE SEQUENCE payments.writer_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments.writer_payment_id_seq OWNER TO postgres;

--
-- Name: writer_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: payments; Owner: postgres
--

ALTER SEQUENCE payments.writer_payment_id_seq OWNED BY payments.writer_payment.id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: account_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_status (
    id integer NOT NULL,
    status character varying(15) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.account_status OWNER TO postgres;

--
-- Name: account_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_status_id_seq OWNER TO postgres;

--
-- Name: account_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_status_id_seq OWNED BY public.account_status.id;


--
-- Name: account_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_type (
    id integer NOT NULL,
    type character varying(15) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.account_type OWNER TO postgres;

--
-- Name: account_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_type_id_seq OWNER TO postgres;

--
-- Name: account_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_type_id_seq OWNED BY public.account_type.id;


--
-- Name: login_via; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login_via (
    id integer NOT NULL,
    via character varying(30) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.login_via OWNER TO postgres;

--
-- Name: login_via_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.login_via_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.login_via_id_seq OWNER TO postgres;

--
-- Name: login_via_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.login_via_id_seq OWNED BY public.login_via.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(256),
    "accountStatus" integer NOT NULL,
    "userType" integer NOT NULL,
    "loginVia" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: academic_certification; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.academic_certification (
    id integer NOT NULL,
    achievement character varying(50) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.academic_certification OWNER TO postgres;

--
-- Name: academic_certification_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.academic_certification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.academic_certification_id_seq OWNER TO postgres;

--
-- Name: academic_certification_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.academic_certification_id_seq OWNED BY writer.academic_certification.id;


--
-- Name: english_as; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.english_as (
    id integer NOT NULL,
    "as" character varying(30) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.english_as OWNER TO postgres;

--
-- Name: english_as_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.english_as_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.english_as_id_seq OWNER TO postgres;

--
-- Name: english_as_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.english_as_id_seq OWNED BY writer.english_as.id;


--
-- Name: grammar_answer; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.grammar_answer (
    id integer NOT NULL,
    "questionId" integer,
    answer character varying(200) NOT NULL,
    "answerLetter" character varying(2) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.grammar_answer OWNER TO postgres;

--
-- Name: grammar_answer_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.grammar_answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.grammar_answer_id_seq OWNER TO postgres;

--
-- Name: grammar_answer_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.grammar_answer_id_seq OWNED BY writer.grammar_answer.id;


--
-- Name: grammar_question; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.grammar_question (
    id integer NOT NULL,
    instruction character varying(200),
    question character varying(500) NOT NULL,
    "correctAnswerId" integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.grammar_question OWNER TO postgres;

--
-- Name: grammar_question_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.grammar_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.grammar_question_id_seq OWNER TO postgres;

--
-- Name: grammar_question_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.grammar_question_id_seq OWNED BY writer.grammar_question.id;


--
-- Name: sample_essay_theme; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.sample_essay_theme (
    id integer NOT NULL,
    topic character varying(100) NOT NULL,
    description character varying(500) NOT NULL,
    "subjectId" integer NOT NULL,
    "educationLevelId" integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.sample_essay_theme OWNER TO postgres;

--
-- Name: sample_essay_theme_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.sample_essay_theme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.sample_essay_theme_id_seq OWNER TO postgres;

--
-- Name: sample_essay_theme_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.sample_essay_theme_id_seq OWNED BY writer.sample_essay_theme.id;


--
-- Name: skill_level; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.skill_level (
    id integer NOT NULL,
    level character varying(30) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.skill_level OWNER TO postgres;

--
-- Name: skill_level_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.skill_level_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.skill_level_id_seq OWNER TO postgres;

--
-- Name: skill_level_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.skill_level_id_seq OWNED BY writer.skill_level.id;


--
-- Name: writer; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    surname character varying(20),
    "otherNames" character varying(60) NOT NULL,
    "nIdFront" character varying(50) NOT NULL,
    "nIdBack" character varying(50) NOT NULL,
    "nationalID" character varying(10) NOT NULL,
    "mobileNo" character varying(15) NOT NULL,
    "availableNightCalls" boolean DEFAULT false NOT NULL,
    "skypeProfile" character varying(50),
    "nativeLanguage" character varying(50) NOT NULL,
    "genderId" integer NOT NULL,
    "citizenshipId" integer NOT NULL,
    "countyState" character varying(100) NOT NULL,
    "englishAsId" integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer OWNER TO postgres;

--
-- Name: writer_application; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_application (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_application OWNER TO postgres;

--
-- Name: writer_application_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_application_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_application_id_seq OWNER TO postgres;

--
-- Name: writer_application_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_application_id_seq OWNED BY writer.writer_application.id;


--
-- Name: writer_average_rating; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_average_rating (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    rating double precision NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_average_rating OWNER TO postgres;

--
-- Name: writer_average_rating_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_average_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_average_rating_id_seq OWNER TO postgres;

--
-- Name: writer_average_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_average_rating_id_seq OWNED BY writer.writer_average_rating.id;


--
-- Name: writer_bid; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_bid (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "orderId" integer NOT NULL,
    successful boolean NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_bid OWNER TO postgres;

--
-- Name: writer_bid_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_bid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_bid_id_seq OWNER TO postgres;

--
-- Name: writer_bid_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_bid_id_seq OWNED BY writer.writer_bid.id;


--
-- Name: writer_citation_style; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_citation_style (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "citationStyleIds" integer[] NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_citation_style OWNER TO postgres;

--
-- Name: writer_citation_style_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_citation_style_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_citation_style_id_seq OWNER TO postgres;

--
-- Name: writer_citation_style_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_citation_style_id_seq OWNED BY writer.writer_citation_style.id;


--
-- Name: writer_discipline; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_discipline (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "disciplineIds" integer[] NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_discipline OWNER TO postgres;

--
-- Name: writer_discipline_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_discipline_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_discipline_id_seq OWNER TO postgres;

--
-- Name: writer_discipline_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_discipline_id_seq OWNED BY writer.writer_discipline.id;


--
-- Name: writer_education; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_education (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "highestLevelId" integer NOT NULL,
    "highestAchievementId" integer NOT NULL,
    certificate character varying(50) NOT NULL,
    "graduationYear" integer NOT NULL,
    "institutionName" character varying(200) NOT NULL,
    "schoolDepartment" character varying(200) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_education OWNER TO postgres;

--
-- Name: writer_education_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_education_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_education_id_seq OWNER TO postgres;

--
-- Name: writer_education_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_education_id_seq OWNED BY writer.writer_education.id;


--
-- Name: writer_email_submission; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_email_submission (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "confirmationToken" character varying(500),
    "accountConfirmed" boolean DEFAULT false NOT NULL,
    "termsPoliciesAgreed" boolean DEFAULT true NOT NULL,
    "promoMessagesAgreed" boolean DEFAULT false NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_email_submission OWNER TO postgres;

--
-- Name: writer_email_submission_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_email_submission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_email_submission_id_seq OWNER TO postgres;

--
-- Name: writer_email_submission_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_email_submission_id_seq OWNED BY writer.writer_email_submission.id;


--
-- Name: writer_grammar_test; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_grammar_test (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "totalScore" integer NOT NULL,
    "correctQuestions" integer[] NOT NULL,
    "wrongQuestions" integer[] NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_grammar_test OWNER TO postgres;

--
-- Name: writer_grammar_test_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_grammar_test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_grammar_test_id_seq OWNER TO postgres;

--
-- Name: writer_grammar_test_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_grammar_test_id_seq OWNED BY writer.writer_grammar_test.id;


--
-- Name: writer_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_id_seq OWNER TO postgres;

--
-- Name: writer_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_id_seq OWNED BY writer.writer.id;


--
-- Name: writer_profile; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_profile (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "confirmationToken" character varying(500) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_profile OWNER TO postgres;

--
-- Name: writer_profile_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_profile_id_seq OWNER TO postgres;

--
-- Name: writer_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_profile_id_seq OWNED BY writer.writer_profile.id;


--
-- Name: writer_rating; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_rating (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "orderId" integer NOT NULL,
    rating double precision NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_rating OWNER TO postgres;

--
-- Name: writer_rating_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_rating_id_seq OWNER TO postgres;

--
-- Name: writer_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_rating_id_seq OWNED BY writer.writer_rating.id;


--
-- Name: writer_registration_record; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_registration_record (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "lastStepReached" integer DEFAULT 0 NOT NULL,
    "detailReached" character varying(50),
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_registration_record OWNER TO postgres;

--
-- Name: writer_registration_record_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_registration_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_registration_record_id_seq OWNER TO postgres;

--
-- Name: writer_registration_record_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_registration_record_id_seq OWNED BY writer.writer_registration_record.id;


--
-- Name: writer_sample_essay; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_sample_essay (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "themeId" integer NOT NULL,
    essay text,
    "timeAssigned" timestamp with time zone NOT NULL,
    "timeSubmitted" timestamp with time zone,
    "timeTaken" double precision,
    "marksAttained" double precision,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_sample_essay OWNER TO postgres;

--
-- Name: writer_sample_essay_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_sample_essay_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_sample_essay_id_seq OWNER TO postgres;

--
-- Name: writer_sample_essay_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_sample_essay_id_seq OWNED BY writer.writer_sample_essay.id;


--
-- Name: writer_skill_level; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_skill_level (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "skillLevelId" integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_skill_level OWNER TO postgres;

--
-- Name: writer_skill_level_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_skill_level_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_skill_level_id_seq OWNER TO postgres;

--
-- Name: writer_skill_level_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_skill_level_id_seq OWNED BY writer.writer_skill_level.id;


--
-- Name: writer_work_experience; Type: TABLE; Schema: writer; Owner: postgres
--

CREATE TABLE writer.writer_work_experience (
    id integer NOT NULL,
    "writerId" integer NOT NULL,
    "companyName" character varying(100),
    "fieldOfWork" character varying(50),
    "position" character varying(50),
    "aboutMe" character varying(200) NOT NULL,
    "profStatement" character varying(1000) NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE writer.writer_work_experience OWNER TO postgres;

--
-- Name: writer_work_experience_id_seq; Type: SEQUENCE; Schema: writer; Owner: postgres
--

CREATE SEQUENCE writer.writer_work_experience_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE writer.writer_work_experience_id_seq OWNER TO postgres;

--
-- Name: writer_work_experience_id_seq; Type: SEQUENCE OWNED BY; Schema: writer; Owner: postgres
--

ALTER SEQUENCE writer.writer_work_experience_id_seq OWNED BY writer.writer_work_experience.id;


--
-- Name: admin id; Type: DEFAULT; Schema: admin; Owner: postgres
--

ALTER TABLE ONLY admin.admin ALTER COLUMN id SET DEFAULT nextval('admin.admin_id_seq'::regclass);


--
-- Name: admin_role id; Type: DEFAULT; Schema: admin; Owner: postgres
--

ALTER TABLE ONLY admin.admin_role ALTER COLUMN id SET DEFAULT nextval('admin.admin_role_id_seq'::regclass);


--
-- Name: administrative_role id; Type: DEFAULT; Schema: admin; Owner: postgres
--

ALTER TABLE ONLY admin.administrative_role ALTER COLUMN id SET DEFAULT nextval('admin.administrative_role_id_seq'::regclass);


--
-- Name: writer_management id; Type: DEFAULT; Schema: admin; Owner: postgres
--

ALTER TABLE ONLY admin.writer_management ALTER COLUMN id SET DEFAULT nextval('admin.writer_management_id_seq'::regclass);


--
-- Name: chat id; Type: DEFAULT; Schema: chats; Owner: postgres
--

ALTER TABLE ONLY chats.chat ALTER COLUMN id SET DEFAULT nextval('chats.chat_id_seq'::regclass);


--
-- Name: chat_content id; Type: DEFAULT; Schema: chats; Owner: postgres
--

ALTER TABLE ONLY chats.chat_content ALTER COLUMN id SET DEFAULT nextval('chats.chat_content_id_seq'::regclass);


--
-- Name: client id; Type: DEFAULT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.client ALTER COLUMN id SET DEFAULT nextval('client.client_id_seq'::regclass);


--
-- Name: client-otp-code id; Type: DEFAULT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client."client-otp-code" ALTER COLUMN id SET DEFAULT nextval('client."client-otp-code_id_seq"'::regclass);


--
-- Name: client_activity id; Type: DEFAULT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.client_activity ALTER COLUMN id SET DEFAULT nextval('client.client_activity_id_seq'::regclass);


--
-- Name: client_order_posting_step id; Type: DEFAULT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.client_order_posting_step ALTER COLUMN id SET DEFAULT nextval('client.client_order_posting_step_id_seq'::regclass);


--
-- Name: assgnmnt_type_category id; Type: DEFAULT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.assgnmnt_type_category ALTER COLUMN id SET DEFAULT nextval('general.assgnmnt_type_category_id_seq'::regclass);


--
-- Name: assignment_type id; Type: DEFAULT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.assignment_type ALTER COLUMN id SET DEFAULT nextval('general.assignment_type_id_seq'::regclass);


--
-- Name: citation_style id; Type: DEFAULT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.citation_style ALTER COLUMN id SET DEFAULT nextval('general.citation_style_id_seq'::regclass);


--
-- Name: citation_style_documentation id; Type: DEFAULT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.citation_style_documentation ALTER COLUMN id SET DEFAULT nextval('general.citation_style_documentation_id_seq'::regclass);


--
-- Name: country id; Type: DEFAULT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.country ALTER COLUMN id SET DEFAULT nextval('general.country_id_seq'::regclass);


--
-- Name: discipline id; Type: DEFAULT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.discipline ALTER COLUMN id SET DEFAULT nextval('general.discipline_id_seq'::regclass);


--
-- Name: education_level id; Type: DEFAULT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.education_level ALTER COLUMN id SET DEFAULT nextval('general.education_level_id_seq'::regclass);


--
-- Name: gender id; Type: DEFAULT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.gender ALTER COLUMN id SET DEFAULT nextval('general.gender_id_seq'::regclass);


--
-- Name: time_am_pm id; Type: DEFAULT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.time_am_pm ALTER COLUMN id SET DEFAULT nextval('general.time_am_pm_id_seq'::regclass);


--
-- Name: access_log id; Type: DEFAULT; Schema: logs; Owner: postgres
--

ALTER TABLE ONLY logs.access_log ALTER COLUMN id SET DEFAULT nextval('logs.access_log_id_seq'::regclass);


--
-- Name: client_order id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.client_order ALTER COLUMN id SET DEFAULT nextval('orders.client_order_id_seq'::regclass);


--
-- Name: extra_order_service id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.extra_order_service ALTER COLUMN id SET DEFAULT nextval('orders.extra_order_service_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders."order" ALTER COLUMN id SET DEFAULT nextval('orders.order_id_seq'::regclass);


--
-- Name: order_bid id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_bid ALTER COLUMN id SET DEFAULT nextval('orders.order_bid_id_seq'::regclass);


--
-- Name: order_file id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_file ALTER COLUMN id SET DEFAULT nextval('orders.order_file_id_seq'::regclass);


--
-- Name: order_file_type id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_file_type ALTER COLUMN id SET DEFAULT nextval('orders.order_file_type_id_seq'::regclass);


--
-- Name: order_format id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_format ALTER COLUMN id SET DEFAULT nextval('orders.order_format_id_seq'::regclass);


--
-- Name: order_revision id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_revision ALTER COLUMN id SET DEFAULT nextval('orders.order_revision_id_seq'::regclass);


--
-- Name: order_service_type id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_service_type ALTER COLUMN id SET DEFAULT nextval('orders.order_service_type_id_seq'::regclass);


--
-- Name: order_status id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_status ALTER COLUMN id SET DEFAULT nextval('orders.order_status_id_seq'::regclass);


--
-- Name: submission_checklist id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.submission_checklist ALTER COLUMN id SET DEFAULT nextval('orders.submission_checklist_id_seq'::regclass);


--
-- Name: writer_order id; Type: DEFAULT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.writer_order ALTER COLUMN id SET DEFAULT nextval('orders.writer_order_id_seq'::regclass);


--
-- Name: base_price id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.base_price ALTER COLUMN id SET DEFAULT nextval('payments.base_price_id_seq'::regclass);


--
-- Name: client_balance id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.client_balance ALTER COLUMN id SET DEFAULT nextval('payments.client_balance_id_seq'::regclass);


--
-- Name: client_payment id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.client_payment ALTER COLUMN id SET DEFAULT nextval('payments.client_payment_id_seq'::regclass);


--
-- Name: currency id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.currency ALTER COLUMN id SET DEFAULT nextval('payments.currency_id_seq'::regclass);


--
-- Name: mpesa id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.mpesa ALTER COLUMN id SET DEFAULT nextval('payments.mpesa_id_seq'::regclass);


--
-- Name: mpesa_result_codes id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.mpesa_result_codes ALTER COLUMN id SET DEFAULT nextval('payments.mpesa_result_codes_id_seq'::regclass);


--
-- Name: order_payment_detail id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.order_payment_detail ALTER COLUMN id SET DEFAULT nextval('payments.order_payment_detail_id_seq'::regclass);


--
-- Name: paper_discount id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.paper_discount ALTER COLUMN id SET DEFAULT nextval('payments.paper_discount_id_seq'::regclass);


--
-- Name: payment_ratio id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.payment_ratio ALTER COLUMN id SET DEFAULT nextval('payments.payment_ratio_id_seq'::regclass);


--
-- Name: payment_status id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.payment_status ALTER COLUMN id SET DEFAULT nextval('payments.payment_status_id_seq'::regclass);


--
-- Name: price_increment id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.price_increment ALTER COLUMN id SET DEFAULT nextval('payments.price_increment_id_seq'::regclass);


--
-- Name: price_tier id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.price_tier ALTER COLUMN id SET DEFAULT nextval('payments.price_tier_id_seq'::regclass);


--
-- Name: writer_balance id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.writer_balance ALTER COLUMN id SET DEFAULT nextval('payments.writer_balance_id_seq'::regclass);


--
-- Name: writer_payment id; Type: DEFAULT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.writer_payment ALTER COLUMN id SET DEFAULT nextval('payments.writer_payment_id_seq'::regclass);


--
-- Name: account_status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_status ALTER COLUMN id SET DEFAULT nextval('public.account_status_id_seq'::regclass);


--
-- Name: account_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_type ALTER COLUMN id SET DEFAULT nextval('public.account_type_id_seq'::regclass);


--
-- Name: login_via id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_via ALTER COLUMN id SET DEFAULT nextval('public.login_via_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: academic_certification id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.academic_certification ALTER COLUMN id SET DEFAULT nextval('writer.academic_certification_id_seq'::regclass);


--
-- Name: english_as id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.english_as ALTER COLUMN id SET DEFAULT nextval('writer.english_as_id_seq'::regclass);


--
-- Name: grammar_answer id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.grammar_answer ALTER COLUMN id SET DEFAULT nextval('writer.grammar_answer_id_seq'::regclass);


--
-- Name: grammar_question id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.grammar_question ALTER COLUMN id SET DEFAULT nextval('writer.grammar_question_id_seq'::regclass);


--
-- Name: sample_essay_theme id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.sample_essay_theme ALTER COLUMN id SET DEFAULT nextval('writer.sample_essay_theme_id_seq'::regclass);


--
-- Name: skill_level id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.skill_level ALTER COLUMN id SET DEFAULT nextval('writer.skill_level_id_seq'::regclass);


--
-- Name: writer id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer ALTER COLUMN id SET DEFAULT nextval('writer.writer_id_seq'::regclass);


--
-- Name: writer_application id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_application ALTER COLUMN id SET DEFAULT nextval('writer.writer_application_id_seq'::regclass);


--
-- Name: writer_average_rating id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_average_rating ALTER COLUMN id SET DEFAULT nextval('writer.writer_average_rating_id_seq'::regclass);


--
-- Name: writer_bid id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_bid ALTER COLUMN id SET DEFAULT nextval('writer.writer_bid_id_seq'::regclass);


--
-- Name: writer_citation_style id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_citation_style ALTER COLUMN id SET DEFAULT nextval('writer.writer_citation_style_id_seq'::regclass);


--
-- Name: writer_discipline id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_discipline ALTER COLUMN id SET DEFAULT nextval('writer.writer_discipline_id_seq'::regclass);


--
-- Name: writer_education id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_education ALTER COLUMN id SET DEFAULT nextval('writer.writer_education_id_seq'::regclass);


--
-- Name: writer_email_submission id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_email_submission ALTER COLUMN id SET DEFAULT nextval('writer.writer_email_submission_id_seq'::regclass);


--
-- Name: writer_grammar_test id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_grammar_test ALTER COLUMN id SET DEFAULT nextval('writer.writer_grammar_test_id_seq'::regclass);


--
-- Name: writer_profile id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_profile ALTER COLUMN id SET DEFAULT nextval('writer.writer_profile_id_seq'::regclass);


--
-- Name: writer_rating id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_rating ALTER COLUMN id SET DEFAULT nextval('writer.writer_rating_id_seq'::regclass);


--
-- Name: writer_registration_record id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_registration_record ALTER COLUMN id SET DEFAULT nextval('writer.writer_registration_record_id_seq'::regclass);


--
-- Name: writer_sample_essay id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_sample_essay ALTER COLUMN id SET DEFAULT nextval('writer.writer_sample_essay_id_seq'::regclass);


--
-- Name: writer_skill_level id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_skill_level ALTER COLUMN id SET DEFAULT nextval('writer.writer_skill_level_id_seq'::regclass);


--
-- Name: writer_work_experience id; Type: DEFAULT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_work_experience ALTER COLUMN id SET DEFAULT nextval('writer.writer_work_experience_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: admin; Owner: postgres
--



--
-- Data for Name: admin_role; Type: TABLE DATA; Schema: admin; Owner: postgres
--



--
-- Data for Name: administrative_role; Type: TABLE DATA; Schema: admin; Owner: postgres
--

INSERT INTO admin.administrative_role VALUES (1, 'Editing/formatting', 'EF', false, '2021-05-23 11:46:06.22+00', '2021-05-23 11:46:06.22+00');
INSERT INTO admin.administrative_role VALUES (2, 'Payments', 'PMNT', false, '2021-05-23 11:46:06.22+00', '2021-05-23 11:46:06.22+00');
INSERT INTO admin.administrative_role VALUES (3, 'Accounts', 'ACNT', false, '2021-05-23 11:46:06.22+00', '2021-05-23 11:46:06.22+00');


--
-- Data for Name: writer_management; Type: TABLE DATA; Schema: admin; Owner: postgres
--

INSERT INTO admin.writer_management VALUES (1, 'Low', true, 2, 2, 0, false, '2021-05-23 11:46:06.336+00', '2021-05-23 11:46:06.336+00');


--
-- Data for Name: chat; Type: TABLE DATA; Schema: chats; Owner: postgres
--



--
-- Data for Name: chat_content; Type: TABLE DATA; Schema: chats; Owner: postgres
--



--
-- Data for Name: client; Type: TABLE DATA; Schema: client; Owner: postgres
--



--
-- Data for Name: client-otp-code; Type: TABLE DATA; Schema: client; Owner: postgres
--



--
-- Data for Name: client_activity; Type: TABLE DATA; Schema: client; Owner: postgres
--



--
-- Data for Name: client_order_posting_step; Type: TABLE DATA; Schema: client; Owner: postgres
--



--
-- Data for Name: assgnmnt_type_category; Type: TABLE DATA; Schema: general; Owner: postgres
--

INSERT INTO general.assgnmnt_type_category VALUES (1, 'Type of Paperwork', false, '2021-05-23 11:46:06.585+00', '2021-05-23 11:46:06.585+00');
INSERT INTO general.assgnmnt_type_category VALUES (2, 'Coursework', false, '2021-05-23 11:46:06.585+00', '2021-05-23 11:46:06.585+00');
INSERT INTO general.assgnmnt_type_category VALUES (3, 'Questions & Problems', false, '2021-05-23 11:46:06.585+00', '2021-05-23 11:46:06.585+00');


--
-- Data for Name: assignment_type; Type: TABLE DATA; Schema: general; Owner: postgres
--

INSERT INTO general.assignment_type VALUES (1, 1, 4, 'Essay(any type)', false, '2021-05-23 11:46:06.679+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (2, 1, 2, 'Admission Essay', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (3, 1, 4, 'Annotated Bibliography', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (4, 1, 4, 'Article Review', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (5, 1, 4, 'Book / Movie Review', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (6, 1, 4, 'Business Plan', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (7, 1, 4, 'Case Study', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (8, 1, 4, 'Creative Writing', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (9, 1, 4, 'Critical Thinking / Review', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (10, 1, 4, 'Literature Review', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (11, 1, 2, 'Presentation or Speech', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (12, 1, 4, 'Reflective Writing', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (13, 1, 4, 'Report', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (14, 1, 3, 'Research Paper', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (15, 1, 4, 'Research Proposal', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (16, 1, 3, 'Term Paper', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (17, 1, 3, 'Thesis / Dissertation', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (18, 1, 4, 'Other', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (19, 2, 4, 'Homework Assignment (Any Type)', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (20, 2, 3, 'Biology Assignment', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (21, 2, 2, 'Chemistry Assignment', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (22, 2, 1, 'Engineering Assignment', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (23, 2, 4, 'Geography Assignment', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (24, 2, 2, 'Math Assignment', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (25, 2, 2, 'Physics Assignment', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (26, 2, 2, 'Statistics Assignment', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (27, 2, 3, 'Other Assignment', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (28, 3, 2, 'Multiple choice questions', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (29, 3, 2, 'Short Answer Questions', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');
INSERT INTO general.assignment_type VALUES (30, 3, 4, 'Word Problems', false, '2021-05-23 11:46:06.68+00', '2021-05-23 11:46:06.68+00');


--
-- Data for Name: citation_style; Type: TABLE DATA; Schema: general; Owner: postgres
--

INSERT INTO general.citation_style VALUES (1, 'APA', false, '2021-05-23 11:46:05.316+00', '2021-05-23 11:46:05.316+00');
INSERT INTO general.citation_style VALUES (2, 'Chicago', false, '2021-05-23 11:46:05.316+00', '2021-05-23 11:46:05.316+00');
INSERT INTO general.citation_style VALUES (3, 'Harvard', false, '2021-05-23 11:46:05.316+00', '2021-05-23 11:46:05.316+00');
INSERT INTO general.citation_style VALUES (4, 'IEEE', false, '2021-05-23 11:46:05.316+00', '2021-05-23 11:46:05.316+00');
INSERT INTO general.citation_style VALUES (5, 'MLA', false, '2021-05-23 11:46:05.316+00', '2021-05-23 11:46:05.316+00');
INSERT INTO general.citation_style VALUES (6, 'Other', false, '2021-05-23 11:46:05.316+00', '2021-05-23 11:46:05.316+00');


--
-- Data for Name: citation_style_documentation; Type: TABLE DATA; Schema: general; Owner: postgres
--



--
-- Data for Name: country; Type: TABLE DATA; Schema: general; Owner: postgres
--

INSERT INTO general.country VALUES (1, 'Afghanistan', 'AFG', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (2, 'Albania', 'ALB', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (3, 'Algeria', 'DZA', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (4, 'American Samoa', 'ASM', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (5, 'Andorra', 'AND', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (6, 'Angola', 'AGO', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (7, 'Anguilla', 'AIA', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (8, 'Antarctica', 'ATA', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (9, 'Antigua and Barbuda', 'ATG', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (10, 'Argentina', 'ARG', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (11, 'Armenia', 'ARM', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (12, 'Aruba', 'ABW', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (13, 'Australia', 'AUS', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (14, 'Austria', 'AUT', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (15, 'Azerbaijan', 'AZE', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (16, 'Bahamas (the)', 'BHS', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (17, 'Bahrain', 'BHR', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (18, 'Bangladesh', 'BGD', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (19, 'Barbados', 'BRB', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (20, 'Belarus', 'BLR', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (21, 'Belgium', 'BEL', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (22, 'Belize', 'BLZ', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (23, 'Benin', 'BEN', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (24, 'Bermuda', 'BMU', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (25, 'Bhutan', 'BTN', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (26, 'Bolivia (Plurinational State of)', 'BOL', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (27, 'Bonaire, Sint Eustatius and Saba', 'BES', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (28, 'Bosnia and Herzegovina', 'BIH', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (29, 'Botswana', 'BWA', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (30, 'Bouvet Island', 'BVT', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (31, 'Brazil', 'BRA', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (32, 'British Indian Ocean Territory (the)', 'IOT', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (33, 'Brunei Darussalam', 'BRN', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (34, 'Bulgaria', 'BGR', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (35, 'Burkina Faso', 'BFA', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (36, 'Burundi', 'BDI', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (37, 'Cape Verde', 'CPV', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (38, 'Cambodia', 'KHM', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (39, 'Cameroon', 'CMR', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (40, 'Canada', 'CAN', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (41, 'Cayman Islands (the)', 'CYM', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (42, 'Central African Republic (the)', 'CAF', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (43, 'Chad', 'TCD', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (44, 'Chile', 'CHL', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (45, 'China', 'CHN', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (46, 'Christmas Island', 'CXR', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (47, 'Cocos (Keeling) Islands (the)', 'CCK', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (48, 'Colombia', 'COL', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (49, 'Comoros (the)', 'COM', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (50, 'Congo (the Democratic Republic of the)', 'COD', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (51, 'Congo (the)', 'COG', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (52, 'Cook Islands (the)', 'COK', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (53, 'Costa Rica', 'CRI', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (54, 'Croatia', 'HRV', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (55, 'Cuba', 'CUB', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (56, 'Curaçao', 'CUW', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (57, 'Cyprus', 'CYP', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (58, 'Czech Republic', 'CZE', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (59, 'Côte d''Ivoire', 'CIV', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (60, 'Denmark', 'DNK', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (61, 'Djibouti', 'DJI', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (62, 'Dominica', 'DMA', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (63, 'Dominican Republic (the)', 'DOM', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (64, 'Ecuador', 'ECU', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (65, 'Egypt', 'EGY', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (66, 'El Salvador', 'SLV', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (67, 'Equatorial Guinea', 'GNQ', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (68, 'Eritrea', 'ERI', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (69, 'Estonia', 'EST', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (70, 'Eswatini', 'SWZ', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (71, 'Ethiopia', 'ETH', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (72, 'Falkland Islands (the) [Malvinas]', 'FLK', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (73, 'Faroe Islands (the)', 'FRO', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (74, 'FIJI', 'FJI', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (75, 'Finland', 'FIN', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (76, 'France', 'FRA', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (77, 'French Guiana', 'GUF', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (78, 'French Polynesia', 'PYF', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (79, 'French Southern Territories (the)', 'ATF', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (80, 'Gabon', 'GAB', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (81, 'Gambia (the)', 'GMB', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (82, 'Georgia', 'GEO', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (83, 'Germany', 'DEU', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (84, 'Ghana', 'GHA', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (85, 'Gibraltar', 'GIB', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (86, 'Greece', 'GRC', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (87, 'Greenland', 'GRL', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (88, 'Grenada', 'GRD', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (89, 'Guadeloupe', 'GLP', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (90, 'Guam', 'GUM', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (91, 'Guatemala', 'GTM', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (92, 'Guernsey', 'GGY', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (93, 'Guinea', 'GIN', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (94, 'Guinea-Bissau', 'GNB', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (95, 'Guyana', 'GUY', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (96, 'Haiti', 'HTI', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (97, 'Heard Island and McDonald Islands', 'HMD', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (98, 'Holy See (the)', 'VAT', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (99, 'Honduras', 'HND', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (100, 'Hong Kong', 'HKG', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (101, 'Hungary', 'HUN', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (102, 'Iceland', 'ISL', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (103, 'India', 'IND', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (104, 'Indonesia', 'IDN', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (105, 'Iran (Islamic Republic of)', 'IRN', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (106, 'Iraq', 'IRQ', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (107, 'Ireland', 'IRL', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (108, 'Island of Man', 'IMN', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.435+00');
INSERT INTO general.country VALUES (109, 'Israel', 'ISR', false, '2021-05-23 11:46:05.435+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (110, 'Italy', 'ITA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (111, 'Jamaica', 'JAM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (112, 'Japan', 'JPN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (113, 'Jersey', 'JEY', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (114, 'Jordan', 'JOR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (115, 'Kazakhstan', 'KAZ', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (116, 'Kenya', 'KEN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (117, 'Kiribati', 'KIR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (118, 'Korea (the Democratic People''s Republic of)', 'PRK', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (119, 'Korea (the Republic of)', 'KOR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (120, 'Kuwait', 'KWT', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (121, 'Kyrgyzstan', 'KGZ', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (122, 'Lao People''s Democratic Republic (the)', 'LAO', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (123, 'Latvia', 'LVA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (124, 'Lebanon', 'LBN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (125, 'Lesotho', 'LSO', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (126, 'Liberia', 'LBR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (127, 'Libya', 'LBY', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (128, 'Liechtenstein', 'LIE', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (129, 'Lithuania', 'LTU', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (130, 'Luxembourg', 'LUX', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (131, 'Macao', 'MAC', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (132, 'Madagascar', 'MDG', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (133, 'Malawi', 'MWI', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (134, 'Malaysia', 'MYS', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (135, 'Maldives', 'MDV', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (136, 'Mali', 'MLI', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (137, 'Malta', 'MLT', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (138, 'Marshall Islands (the)', 'MHL', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (139, 'Martinique', 'MTQ', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (140, 'Mauritania', 'MRT', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (141, 'Mauritius', 'MUS', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (142, 'Mayotte', 'MYT', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (143, 'Mexico', 'MEX', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (144, 'Micronesia (Federated States of)', 'FSM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (145, 'Moldova (the Republic of)', 'MDA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (146, 'Monaco', 'MCO', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (147, 'Mongolia', 'MNG', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (148, 'Montenegro', 'MNE', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (149, 'Montserrat', 'MSR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (150, 'Morocco', 'MAR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (151, 'Mozambique', 'MOZ', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (152, 'Myanmar', 'MMR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (153, 'Namibia', 'NAM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (154, 'Nauru', 'NRU', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (155, 'Nepal', 'NPL', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (156, 'Netherlands (the)', 'NLD', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (157, 'New Caledonia', 'NCL', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (158, 'New Zealand', 'NZL', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (159, 'Nicaragua', 'NIC', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (160, 'Niger (the)', 'NER', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (161, 'Nigeria', 'NGA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (162, 'Niue', 'NIU', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (163, 'Norfolk Island', 'NFK', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (164, 'Northern Mariana Islands (the)', 'MNP', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (165, 'Norway', 'NOR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (166, 'Oman', 'OMN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (167, 'Pakistan', 'PAK', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (168, 'Palau', 'PLW', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (169, 'Palestine, State of', 'PSE', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (170, 'Panama', 'PAN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (171, 'Papua New Guinea', 'PNG', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (172, 'Paraguay', 'PRY', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (173, 'Peru', 'PER', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (174, 'Philippines (the)', 'PHL', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (175, 'Pitcairn', 'PCN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (176, 'Poland', 'POL', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (177, 'Portugal', 'PRT', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (178, 'Puerto Rico', 'PRI', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (179, 'Qatar', 'QAT', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (180, 'Republic of North Macedonia', 'MKD', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (181, 'Romania', 'ROU', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (182, 'Russian Federation (the)', 'RUS', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (183, 'Rwanda', 'RWA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (184, 'Réunion', 'REU', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (185, 'Saint Barthélemy', 'BLM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (186, 'Saint Helena, Ascension and Tristan da Cunha', 'SHN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (187, 'Saint Kitts and Nevis', 'KNA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (188, 'Saint Lucia', 'LCA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (189, 'Saint Martin (French part)', 'MAF', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (190, 'Saint Pierre and Miquelon', 'SPM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (191, 'Saint Vincent and the Grenadines', 'VCT', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (192, 'Samoa', 'WSM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (193, 'San Marino', 'SMR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (194, 'Sao Tome and Principe', 'STP', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (195, 'Saudi Arabia', 'SAU', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (196, 'Senegal', 'SEN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (197, 'Serbia', 'SRB', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (198, 'Seychelles', 'SYC', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (199, 'Sierra Leone', 'SLE', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (200, 'Singapore', 'SGP', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (201, 'Sint Maarten (Dutch part)', 'SXM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (202, 'Slovakia', 'SVK', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (203, 'Slovenia', 'SVN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (204, 'Solomon Islands', 'SLB', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (205, 'Somalia', 'SOM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (206, 'South Africa', 'ZAF', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (207, 'South Georgia and the South Sandwich Islands', 'SGS', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (208, 'South Sudan', 'SSD', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (209, 'Spain', 'ESP', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (210, 'Sri Lanka', 'LKA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (211, 'Sudan (the)', 'SDN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (212, 'Suriname', 'SUR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (213, 'Svalbard and Jan Mayen', 'SJM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (214, 'Sweden', 'SWE', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (215, 'Switzerland', 'CHE', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (216, 'Syrian Arab Republic', 'SYR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (217, 'Taiwan (Province of China)', 'TWN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (218, 'Tajikistan', 'TJK', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (219, 'Tanzania, United Republic of', 'TZA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (220, 'Thailand', 'THA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (221, 'Timor-Leste', 'TLS', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (222, 'Togo', 'TGO', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (223, 'Tokelau', 'TKL', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (224, 'Tonga', 'TON', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (225, 'Trinidad and Tobago', 'TTO', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (226, 'Tunisia', 'TUN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (227, 'Turkey', 'TUR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (228, 'Turkmenistan', 'TKM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (229, 'Turks and Caicos Islands (the)', 'TCA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (230, 'Tuvalu', 'TUV', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (231, 'Uganda', 'UGA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (232, 'Ukraine', 'UKR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (233, 'United Arab Emirates (the)', 'ARE', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (234, 'United Kingdom of Great Britain and Northern Ireland (the)', 'GBR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (235, 'United States Minor Outlying Islands (the)', 'UMI', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (236, 'United States of America (the)', 'USA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (237, 'Uruguay', 'URY', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (238, 'Uzbekistan', 'UZB', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (239, 'Vanuatu', 'VUT', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (240, 'Venezuela (Bolivarian Republic of)', 'VEN', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (241, 'Vietnam', 'VNM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (242, 'Virgin Islands (British)', 'VGB', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (243, 'Virgin Islands (U.S.)', 'VIR', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (244, 'Wallis and Futuna', 'WLF', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (245, 'Western Sahara', 'ESH', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (246, 'Yemen', 'YEM', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (247, 'Zambia', 'ZMB', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (248, 'Zimbabwe', 'ZWE', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');
INSERT INTO general.country VALUES (249, 'Åland Islands', 'ALA', false, '2021-05-23 11:46:05.436+00', '2021-05-23 11:46:05.436+00');


--
-- Data for Name: discipline; Type: TABLE DATA; Schema: general; Owner: postgres
--

INSERT INTO general.discipline VALUES (1, 'Art', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (2, 'Business and Management', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (3, 'Computer Science', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (4, 'Economics', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (5, 'Education', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (6, 'Engineering', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (7, 'English and Literature', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (8, 'Health Care and Live Sciences', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (9, 'Humanities', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (10, 'Law', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (11, 'Marketing', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (12, 'Mathematics and Statistics', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (13, 'Natural Sciences', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (14, 'Philosophy', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (15, 'Political Science', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (16, 'Psychology', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (17, 'Religion', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (18, 'Social Science', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');
INSERT INTO general.discipline VALUES (19, 'Other', false, '2021-05-23 11:46:05.905+00', '2021-05-23 11:46:05.905+00');


--
-- Data for Name: education_level; Type: TABLE DATA; Schema: general; Owner: postgres
--

INSERT INTO general.education_level VALUES (1, 'Primary', true, false, false, '2021-05-23 11:46:06.054+00', '2021-05-23 11:46:06.054+00');
INSERT INTO general.education_level VALUES (2, 'High School', true, true, false, '2021-05-23 11:46:06.054+00', '2021-05-23 11:46:06.054+00');
INSERT INTO general.education_level VALUES (3, 'College', true, true, false, '2021-05-23 11:46:06.054+00', '2021-05-23 11:46:06.054+00');
INSERT INTO general.education_level VALUES (4, 'University', true, false, false, '2021-05-23 11:46:06.054+00', '2021-05-23 11:46:06.054+00');
INSERT INTO general.education_level VALUES (5, 'Bachelor''s', false, true, false, '2021-05-23 11:46:06.054+00', '2021-05-23 11:46:06.054+00');
INSERT INTO general.education_level VALUES (6, 'Master''s', false, true, false, '2021-05-23 11:46:06.054+00', '2021-05-23 11:46:06.054+00');
INSERT INTO general.education_level VALUES (7, 'Doctorate', false, true, false, '2021-05-23 11:46:06.054+00', '2021-05-23 11:46:06.054+00');


--
-- Data for Name: gender; Type: TABLE DATA; Schema: general; Owner: postgres
--

INSERT INTO general.gender VALUES (1, 'Male', false, '2021-05-23 11:46:05.009+00', '2021-05-23 11:46:05.009+00');
INSERT INTO general.gender VALUES (2, 'Female', false, '2021-05-23 11:46:05.009+00', '2021-05-23 11:46:05.009+00');


--
-- Data for Name: time_am_pm; Type: TABLE DATA; Schema: general; Owner: postgres
--

INSERT INTO general.time_am_pm VALUES (1, '12AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (2, '1AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (3, '2AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (4, '3AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (5, '4AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (6, '5AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (7, '6AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (8, '7AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (9, '8AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (10, '9AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (11, '10AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (12, '11AM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (13, '12PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (14, '1PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (15, '2PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (16, '3PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (17, '4PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (18, '5PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (19, '6PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (20, '7PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (21, '8PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (22, '9PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (23, '10PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');
INSERT INTO general.time_am_pm VALUES (24, '11PM', false, '2021-05-23 11:46:06.262+00', '2021-05-23 11:46:06.262+00');


--
-- Data for Name: access_log; Type: TABLE DATA; Schema: logs; Owner: postgres
--



--
-- Data for Name: client_order; Type: TABLE DATA; Schema: orders; Owner: postgres
--



--
-- Data for Name: extra_order_service; Type: TABLE DATA; Schema: orders; Owner: postgres
--



--
-- Data for Name: order; Type: TABLE DATA; Schema: orders; Owner: postgres
--



--
-- Data for Name: order_bid; Type: TABLE DATA; Schema: orders; Owner: postgres
--



--
-- Data for Name: order_file; Type: TABLE DATA; Schema: orders; Owner: postgres
--



--
-- Data for Name: order_file_type; Type: TABLE DATA; Schema: orders; Owner: postgres
--

INSERT INTO orders.order_file_type VALUES (1, 'Client Supporting', false, '2021-05-23 11:46:06.89+00', '2021-05-23 11:46:06.89+00');
INSERT INTO orders.order_file_type VALUES (2, 'Writer Supporting', false, '2021-05-23 11:46:06.89+00', '2021-05-23 11:46:06.89+00');
INSERT INTO orders.order_file_type VALUES (3, 'Paper', false, '2021-05-23 11:46:06.89+00', '2021-05-23 11:46:06.89+00');
INSERT INTO orders.order_file_type VALUES (4, 'Revision Supporting', false, '2021-05-23 11:46:06.89+00', '2021-05-23 11:46:06.89+00');


--
-- Data for Name: order_format; Type: TABLE DATA; Schema: orders; Owner: postgres
--

INSERT INTO orders.order_format VALUES (1, 550, 'single spaced', false, false, '2021-05-23 11:46:06.306+00', '2021-05-23 11:46:06.306+00');
INSERT INTO orders.order_format VALUES (2, 275, 'double spaced', true, false, '2021-05-23 11:46:06.306+00', '2021-05-23 11:46:06.306+00');


--
-- Data for Name: order_revision; Type: TABLE DATA; Schema: orders; Owner: postgres
--



--
-- Data for Name: order_service_type; Type: TABLE DATA; Schema: orders; Owner: postgres
--

INSERT INTO orders.order_service_type VALUES (1, 'Writing', false, '', '0', 1, false, '2021-05-23 11:46:06.123+00', '2021-05-23 11:46:06.123+00');
INSERT INTO orders.order_service_type VALUES (2, 'Editing', false, '', '0', 1, false, '2021-05-23 11:46:06.123+00', '2021-05-23 11:46:06.123+00');
INSERT INTO orders.order_service_type VALUES (3, 'Rewriting', false, '', '0', 1, false, '2021-05-23 11:46:06.123+00', '2021-05-23 11:46:06.123+00');
INSERT INTO orders.order_service_type VALUES (4, 'Progressive delivery', true, 'Receive your half-done paper long before the deadline', '300', 1, false, '2021-05-23 11:46:06.123+00', '2021-05-23 11:46:06.123+00');
INSERT INTO orders.order_service_type VALUES (5, 'Dedicated Support', true, 'Get a dedicated personal manager and contact him/her 24/7', '400', 1, false, '2021-05-23 11:46:06.123+00', '2021-05-23 11:46:06.123+00');
INSERT INTO orders.order_service_type VALUES (6, '1-page abstract', true, 'Get a 1-page extract that highlights the key points in your paper', '400', 1, false, '2021-05-23 11:46:06.123+00', '2021-05-23 11:46:06.123+00');


--
-- Data for Name: order_status; Type: TABLE DATA; Schema: orders; Owner: postgres
--

INSERT INTO orders.order_status VALUES (1, 'Pending payment', false, '2021-05-23 11:46:06.166+00', '2021-05-23 11:46:06.166+00');
INSERT INTO orders.order_status VALUES (2, 'Pending writer acknowledgement', false, '2021-05-23 11:46:06.166+00', '2021-05-23 11:46:06.166+00');
INSERT INTO orders.order_status VALUES (3, 'Ongoing', false, '2021-05-23 11:46:06.166+00', '2021-05-23 11:46:06.166+00');
INSERT INTO orders.order_status VALUES (4, 'Submitted', false, '2021-05-23 11:46:06.166+00', '2021-05-23 11:46:06.166+00');
INSERT INTO orders.order_status VALUES (5, 'Completed', false, '2021-05-23 11:46:06.166+00', '2021-05-23 11:46:06.166+00');
INSERT INTO orders.order_status VALUES (6, 'Pending revision', false, '2021-05-23 11:46:06.166+00', '2021-05-23 11:46:06.166+00');
INSERT INTO orders.order_status VALUES (7, 'Undergoing revision', false, '2021-05-23 11:46:06.166+00', '2021-05-23 11:46:06.166+00');
INSERT INTO orders.order_status VALUES (8, 'Available', false, '2021-05-23 11:46:06.166+00', '2021-05-23 11:46:06.166+00');
INSERT INTO orders.order_status VALUES (9, 'Bidding ongoing', false, '2021-05-23 11:46:06.166+00', '2021-05-23 11:46:06.166+00');
INSERT INTO orders.order_status VALUES (10, 'Disputed', false, '2021-05-23 11:46:06.166+00', '2021-05-23 11:46:06.166+00');


--
-- Data for Name: submission_checklist; Type: TABLE DATA; Schema: orders; Owner: postgres
--

INSERT INTO orders.submission_checklist VALUES (1, 'Page count', 'The paper doesn''t contain the right number of pages', false, '2021-05-23 11:46:06.94+00', '2021-05-23 11:46:06.94+00');
INSERT INTO orders.submission_checklist VALUES (2, 'Topic', 'The paper fails to discuss the right topic', false, '2021-05-23 11:46:06.94+00', '2021-05-23 11:46:06.94+00');
INSERT INTO orders.submission_checklist VALUES (3, 'Instructions', 'The paper doesn''t follow the instructions fully', false, '2021-05-23 11:46:06.94+00', '2021-05-23 11:46:06.94+00');
INSERT INTO orders.submission_checklist VALUES (4, 'Deadline', 'The submission is not on time', false, '2021-05-23 11:46:06.94+00', '2021-05-23 11:46:06.94+00');
INSERT INTO orders.submission_checklist VALUES (5, 'Sources', 'The paper doesn''t make use of at least a minimum of number of the prescribed sources', false, '2021-05-23 11:46:06.94+00', '2021-05-23 11:46:06.94+00');
INSERT INTO orders.submission_checklist VALUES (6, 'Formatting', 'The paper doesn''t follow the prescribed format', false, '2021-05-23 11:46:06.94+00', '2021-05-23 11:46:06.94+00');
INSERT INTO orders.submission_checklist VALUES (7, 'Type of service', 'The paper doesn''t adhere to the prescribed type of service', false, '2021-05-23 11:46:06.94+00', '2021-05-23 11:46:06.94+00');
INSERT INTO orders.submission_checklist VALUES (8, 'Other', 'The paper fails to address another aspect(s), not defined above', false, '2021-05-23 11:46:06.94+00', '2021-05-23 11:46:06.94+00');


--
-- Data for Name: writer_order; Type: TABLE DATA; Schema: orders; Owner: postgres
--



--
-- Data for Name: base_price; Type: TABLE DATA; Schema: payments; Owner: postgres
--

INSERT INTO payments.base_price VALUES (1, 1, 1, 1, 610, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');
INSERT INTO payments.base_price VALUES (2, 1, 2, 1, 554, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');
INSERT INTO payments.base_price VALUES (3, 1, 3, 1, 518, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');
INSERT INTO payments.base_price VALUES (4, 1, 4, 1, 498, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');
INSERT INTO payments.base_price VALUES (5, 2, 1, 1, 305, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');
INSERT INTO payments.base_price VALUES (6, 2, 2, 1, 277, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');
INSERT INTO payments.base_price VALUES (7, 2, 3, 1, 259, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');
INSERT INTO payments.base_price VALUES (8, 2, 4, 1, 249, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');
INSERT INTO payments.base_price VALUES (9, 3, 1, 1, 427, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');
INSERT INTO payments.base_price VALUES (10, 3, 2, 1, 388, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');
INSERT INTO payments.base_price VALUES (11, 3, 3, 1, 363, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');
INSERT INTO payments.base_price VALUES (12, 3, 4, 1, 349, false, '2021-05-23 11:46:06.764+00', '2021-05-23 11:46:06.764+00');


--
-- Data for Name: client_balance; Type: TABLE DATA; Schema: payments; Owner: postgres
--



--
-- Data for Name: client_payment; Type: TABLE DATA; Schema: payments; Owner: postgres
--



--
-- Data for Name: currency; Type: TABLE DATA; Schema: payments; Owner: postgres
--

INSERT INTO payments.currency VALUES (1, 'Kenya Shilling', 'KES', false, '2021-05-23 11:46:03.931+00', '2021-05-23 11:46:03.931+00');
INSERT INTO payments.currency VALUES (2, 'Uganda Shilling', 'UGX', false, '2021-05-23 11:46:03.931+00', '2021-05-23 11:46:03.931+00');
INSERT INTO payments.currency VALUES (3, 'Tanzania Shilling', 'TZS', false, '2021-05-23 11:46:03.931+00', '2021-05-23 11:46:03.931+00');
INSERT INTO payments.currency VALUES (4, 'US Dollar', 'USD', false, '2021-05-23 11:46:03.931+00', '2021-05-23 11:46:03.931+00');
INSERT INTO payments.currency VALUES (5, 'Pound Sterling', 'GBP', false, '2021-05-23 11:46:03.931+00', '2021-05-23 11:46:03.931+00');
INSERT INTO payments.currency VALUES (6, 'Euro', 'EUR', false, '2021-05-23 11:46:03.931+00', '2021-05-23 11:46:03.931+00');
INSERT INTO payments.currency VALUES (7, 'Yen', 'JPY', false, '2021-05-23 11:46:03.931+00', '2021-05-23 11:46:03.931+00');
INSERT INTO payments.currency VALUES (8, 'Yuan Renminbi', 'CNY', false, '2021-05-23 11:46:03.931+00', '2021-05-23 11:46:03.931+00');
INSERT INTO payments.currency VALUES (9, 'Canadian Dollar', 'CAD', false, '2021-05-23 11:46:03.931+00', '2021-05-23 11:46:03.931+00');


--
-- Data for Name: mpesa; Type: TABLE DATA; Schema: payments; Owner: postgres
--



--
-- Data for Name: mpesa_result_codes; Type: TABLE DATA; Schema: payments; Owner: postgres
--

INSERT INTO payments.mpesa_result_codes VALUES (1, 0, 'Success', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (2, 1, 'Insufficient Funds', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (3, 2, 'Less Than Minimum Transaction Value', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (4, 3, 'More Than Maximum Transaction Value', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (5, 4, 'Would Exceed Daily Transfer Limit', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (6, 5, 'Would Exceed Minimum Balance', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (7, 6, 'Unresolved Primary Party', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (8, 7, 'Unresolved Receiver Party', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (9, 8, 'Would Exceed Maximum Balance', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (10, 11, 'Debit Account Invalid', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (11, 12, 'Credit Account Invalid', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (12, 13, 'Unresolved Debit Account', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (13, 14, 'Unresolved Credit Account', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (14, 15, 'Duplicate Detected', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (15, 17, 'Internal Failure', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (16, 20, 'Unresolved Initiator', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (17, 26, 'Traffic blocking condition in place', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (18, 1032, 'Request cancelled by user', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');
INSERT INTO payments.mpesa_result_codes VALUES (19, 1037, 'DS timeout', false, '2021-05-23 11:46:06.504+00', '2021-05-23 11:46:06.504+00');


--
-- Data for Name: order_payment_detail; Type: TABLE DATA; Schema: payments; Owner: postgres
--



--
-- Data for Name: paper_discount; Type: TABLE DATA; Schema: payments; Owner: postgres
--

INSERT INTO payments.paper_discount VALUES (1, 5, 2, 4, false, '2021-05-23 11:46:06.853+00', '2021-05-23 11:46:06.853+00');
INSERT INTO payments.paper_discount VALUES (2, 10, 5, 9, false, '2021-05-23 11:46:06.853+00', '2021-05-23 11:46:06.853+00');
INSERT INTO payments.paper_discount VALUES (3, 15, 10, 15, false, '2021-05-23 11:46:06.853+00', '2021-05-23 11:46:06.853+00');
INSERT INTO payments.paper_discount VALUES (4, 20, 16, 20, false, '2021-05-23 11:46:06.853+00', '2021-05-23 11:46:06.853+00');
INSERT INTO payments.paper_discount VALUES (5, 25, 21, 50, false, '2021-05-23 11:46:06.853+00', '2021-05-23 11:46:06.853+00');
INSERT INTO payments.paper_discount VALUES (6, 30, 51, 70, false, '2021-05-23 11:46:06.853+00', '2021-05-23 11:46:06.853+00');
INSERT INTO payments.paper_discount VALUES (7, 35, 71, 100, false, '2021-05-23 11:46:06.853+00', '2021-05-23 11:46:06.853+00');


--
-- Data for Name: payment_ratio; Type: TABLE DATA; Schema: payments; Owner: postgres
--

INSERT INTO payments.payment_ratio VALUES (1, 15, 85, false, '2021-05-23 11:46:06.73+00', '2021-05-23 11:46:06.73+00');


--
-- Data for Name: payment_status; Type: TABLE DATA; Schema: payments; Owner: postgres
--

INSERT INTO payments.payment_status VALUES (1, 'Pending payment', false, '2021-05-23 11:46:06.2+00', '2021-05-23 11:46:06.2+00');
INSERT INTO payments.payment_status VALUES (2, 'Processing payment', false, '2021-05-23 11:46:06.2+00', '2021-05-23 11:46:06.2+00');
INSERT INTO payments.payment_status VALUES (3, 'Success', false, '2021-05-23 11:46:06.2+00', '2021-05-23 11:46:06.2+00');
INSERT INTO payments.payment_status VALUES (4, 'Failed', false, '2021-05-23 11:46:06.2+00', '2021-05-23 11:46:06.2+00');
INSERT INTO payments.payment_status VALUES (5, 'Success with balance', false, '2021-05-23 11:46:06.2+00', '2021-05-23 11:46:06.2+00');
INSERT INTO payments.payment_status VALUES (6, 'User cancelled', false, '2021-05-23 11:46:06.2+00', '2021-05-23 11:46:06.2+00');


--
-- Data for Name: price_increment; Type: TABLE DATA; Schema: payments; Owner: postgres
--

INSERT INTO payments.price_increment VALUES (1, 1, 1, 6, 3, 3, 4, 4, 5.58000000000000007, 5.23899999999999988, 10, 9.0909999999999993, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');
INSERT INTO payments.price_increment VALUES (2, 1, 2, 6, 3, 3, 4, 4, 5.50900000000000034, 5.27799999999999958, 10.0269999999999992, 9.06400000000000006, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');
INSERT INTO payments.price_increment VALUES (3, 1, 3, 6, 3, 3, 4, 4, 5.53699999999999992, 5.24600000000000044, 10.0310000000000006, 9.0600000000000005, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');
INSERT INTO payments.price_increment VALUES (4, 1, 4, 6, 3, 3, 4, 4, 7.40700000000000003, 3.44799999999999995, 10, 9.0909999999999993, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');
INSERT INTO payments.price_increment VALUES (5, 2, 1, 6, 3, 3, 4, 4, 5.58000000000000007, 5.23899999999999988, 10, 9.0909999999999993, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');
INSERT INTO payments.price_increment VALUES (6, 2, 2, 6, 3, 3, 4, 4, 5.50900000000000034, 5.27799999999999958, 10.0269999999999992, 9.06400000000000006, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');
INSERT INTO payments.price_increment VALUES (7, 2, 3, 6, 3, 3, 4, 4, 5.53699999999999992, 5.24600000000000044, 10.0310000000000006, 9.0600000000000005, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');
INSERT INTO payments.price_increment VALUES (8, 2, 4, 6, 3, 3, 4, 4, 7.40700000000000003, 3.44799999999999995, 10, 9.0909999999999993, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');
INSERT INTO payments.price_increment VALUES (9, 3, 1, 6, 3, 3, 4, 4, 5.58000000000000007, 5.23899999999999988, 10, 9.0909999999999993, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');
INSERT INTO payments.price_increment VALUES (10, 3, 2, 6, 3, 3, 4, 4, 5.50900000000000034, 5.27799999999999958, 10.0269999999999992, 9.06400000000000006, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');
INSERT INTO payments.price_increment VALUES (11, 3, 3, 6, 3, 3, 4, 4, 5.53699999999999992, 5.24600000000000044, 10.0310000000000006, 9.0600000000000005, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');
INSERT INTO payments.price_increment VALUES (12, 3, 4, 6, 3, 3, 4, 4, 7.40700000000000003, 3.44799999999999995, 10, 9.0909999999999993, false, '2021-05-23 11:46:06.813+00', '2021-05-23 11:46:06.813+00');


--
-- Data for Name: price_tier; Type: TABLE DATA; Schema: payments; Owner: postgres
--

INSERT INTO payments.price_tier VALUES (1, 'Tier1', false, '2021-05-23 11:46:06.635+00', '2021-05-23 11:46:06.635+00');
INSERT INTO payments.price_tier VALUES (2, 'Tier2', false, '2021-05-23 11:46:06.635+00', '2021-05-23 11:46:06.635+00');
INSERT INTO payments.price_tier VALUES (3, 'Tier3', false, '2021-05-23 11:46:06.635+00', '2021-05-23 11:46:06.635+00');
INSERT INTO payments.price_tier VALUES (4, 'Tier4', false, '2021-05-23 11:46:06.635+00', '2021-05-23 11:46:06.635+00');


--
-- Data for Name: writer_balance; Type: TABLE DATA; Schema: payments; Owner: postgres
--



--
-- Data for Name: writer_payment; Type: TABLE DATA; Schema: payments; Owner: postgres
--



--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SequelizeMeta" VALUES ('20201214030034-login-via.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083597-account_type.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083598-account_status.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083599-user.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083602-admin.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083604-chat.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083609-administrative_role.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083613-admin_role.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083617-chat_content.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083632-client.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083636-client_activity.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083717-citation_style.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083720-citation_style_documentation.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083723-country.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083730-currency.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083732-price_tier.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083737-discipline.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083738-assgnmnt_type_category.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083739-assignment_type.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083743-gender.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083753-time_am_pm.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083809-access_log.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214083838-education_level.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214084017-order_format.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214084018-order_service_type.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214084019-order_status.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214084020-order.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214084024-client_order.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214084045-extra_order_service.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214084058-order_file_type.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214084059-order_file.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085003-client_balance.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085005-english_as.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085008-writer_email_submission.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085010-writer.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085011-writer_order.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085015-writer_balance.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085018-payment_status.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085029-client_payment.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085328-writer_payment.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085559-academic_certification.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085620-grammar_questions.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085628-skill_level.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085650-writer_average_rating.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085658-writer_bid.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085707-writer_citation_style.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085718-writer_discipline.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085724-writer_education.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085854-writer_grammar_test.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085900-writer_profile.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085913-writer_rating.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085920-sample-essay-theme.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085921-writer_sample_essay.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085929-writer_skill_level.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201214085938-writer_work_experience.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201221151049-order_payment_details.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201222225752-writer_management.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201223111412-writer_application.js');
INSERT INTO public."SequelizeMeta" VALUES ('20201230052850-writer-registration-record.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210103101232-grammar_answer.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210107201244-client_order_posting_step.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210309083633-client-add-column.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210309123548-mpesa_result_codes.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210309161925-mpesa.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210324185519-create-client-otp-codes.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210428184935-order_bid.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210504141806-payment_ratio.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210504141853-base_price.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210504141941-price_increment.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210505143947-paper_discount.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210518062838-submission_checklist.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210519111707-order_revision.js');


--
-- Data for Name: account_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account_status VALUES (1, 'Active', false, '2021-05-23 11:46:05.194+00', '2021-05-23 11:46:05.194+00');
INSERT INTO public.account_status VALUES (2, 'Inactive', false, '2021-05-23 11:46:05.194+00', '2021-05-23 11:46:05.194+00');
INSERT INTO public.account_status VALUES (3, 'Suspended', false, '2021-05-23 11:46:05.194+00', '2021-05-23 11:46:05.194+00');
INSERT INTO public.account_status VALUES (4, 'Deactivated', false, '2021-05-23 11:46:05.194+00', '2021-05-23 11:46:05.194+00');


--
-- Data for Name: account_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account_type VALUES (1, 'Admin', false, '2021-05-23 11:46:06.24+00', '2021-05-23 11:46:06.24+00');
INSERT INTO public.account_type VALUES (2, 'Client', false, '2021-05-23 11:46:06.24+00', '2021-05-23 11:46:06.24+00');
INSERT INTO public.account_type VALUES (3, 'Writer', false, '2021-05-23 11:46:06.24+00', '2021-05-23 11:46:06.24+00');
INSERT INTO public.account_type VALUES (4, 'Other', false, '2021-05-23 11:46:06.24+00', '2021-05-23 11:46:06.24+00');


--
-- Data for Name: login_via; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.login_via VALUES (1, 'Email', false, '2021-05-23 11:46:06.471+00', '2021-05-23 11:46:06.471+00');
INSERT INTO public.login_via VALUES (2, 'Google', false, '2021-05-23 11:46:06.471+00', '2021-05-23 11:46:06.471+00');
INSERT INTO public.login_via VALUES (3, 'Facebook', false, '2021-05-23 11:46:06.471+00', '2021-05-23 11:46:06.471+00');


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: academic_certification; Type: TABLE DATA; Schema: writer; Owner: postgres
--

INSERT INTO writer.academic_certification VALUES (1, 'Certificate', false, '2021-05-23 11:46:06.023+00', '2021-05-23 11:46:06.023+00');
INSERT INTO writer.academic_certification VALUES (2, 'Diploma', false, '2021-05-23 11:46:06.023+00', '2021-05-23 11:46:06.023+00');
INSERT INTO writer.academic_certification VALUES (3, 'Undergraduate', false, '2021-05-23 11:46:06.023+00', '2021-05-23 11:46:06.023+00');
INSERT INTO writer.academic_certification VALUES (4, 'Postgraduate (Masters)', false, '2021-05-23 11:46:06.023+00', '2021-05-23 11:46:06.023+00');
INSERT INTO writer.academic_certification VALUES (5, 'PhD', false, '2021-05-23 11:46:06.023+00', '2021-05-23 11:46:06.023+00');


--
-- Data for Name: english_as; Type: TABLE DATA; Schema: writer; Owner: postgres
--

INSERT INTO writer.english_as VALUES (1, 'English as a Native Language', false, '2021-05-23 11:46:05.774+00', '2021-05-23 11:46:05.774+00');
INSERT INTO writer.english_as VALUES (2, 'English as a Second Language', false, '2021-05-23 11:46:05.774+00', '2021-05-23 11:46:05.774+00');


--
-- Data for Name: grammar_answer; Type: TABLE DATA; Schema: writer; Owner: postgres
--

INSERT INTO writer.grammar_answer VALUES (1, 1, 'had been finishing, appeared', 'A', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (2, 1, 'has finished, had appeared', 'B', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (3, 1, 'has been finishing, appears', 'C', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (4, 1, 'was finishing, had appeared', 'D', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (5, 2, 'was, seen', 'A', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (6, 2, 'is, saw', 'B', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (7, 2, 'was, had been seeing', 'C', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (8, 2, 'is, has seen ', 'D', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (9, 3, 'will still be, must be disposed of, can be turned into, will be stored', 'A', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (10, 3, 'still would be, has been disposed of, must be turned into, is stored', 'B', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (11, 3, 'still will be, can be disposed in, must be turned into, will store', 'C', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (12, 3, 'would still be, must be disposed in, can be turned into, will be stored', 'D', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (13, 4, '---, an, the, a', 'A', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (14, 4, 'the, ---, the, a', 'B', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (15, 4, 'the, an, ---, an', 'C', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (16, 4, 'an, ---, a, a', 'D', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (17, 5, '---, the, ---, the, provides', 'A', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (18, 5, '---, ---, a, ---, provide', 'B', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (19, 5, 'the, the, the, the, provides', 'C', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (20, 5, 'the, the, a, the, provides', 'D', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (21, 6, 'would grow, have existed, will not have changed, will look', 'A', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (22, 6, 'would have grown, existed, would not have changed, would look', 'B', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (23, 6, 'could have grown, exist, will not change, look', 'C', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (24, 6, 'would grow, exist, would have changed, would looked', 'D', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (25, 7, 'was not driving, would not run in, would not be at', 'A', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (26, 7, 'were not driving, would not have run to, would not have been in', 'B', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (27, 7, 'had not driven, would not run into, would not be at', 'C', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (28, 7, 'had not driven, would not have run into, would not have been in', 'D', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (29, 8, 'was four hours when, on, for, wanted to', 'A', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (30, 8, 'has been four hours since, on for, want to', 'B', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (31, 8, 'has had four hours since, at, to, want to', 'C', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (32, 8, 'has been four hours since, at, to, wanted to', 'D', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (33, 9, 'in, at, mediocre', 'A', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.405+00');
INSERT INTO writer.grammar_answer VALUES (34, 9, 'for, at, commonplace', 'B', false, '2021-05-23 11:46:06.405+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (35, 9, 'with, in, plodding', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (36, 9, 'at, in, pedestrian', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (37, 10, 'Once being at university, at, popular within, at', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (38, 10, 'Once being in university, at, popular for, in', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (39, 10, 'Once at university, in, popular with, in', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (40, 10, 'Once in university, in, popular within, at', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (41, 11, ' - A spokesman insisted', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (42, 11, ' - there had been no security problems', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (43, 11, ' - neither of', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (44, 11, ' - held secret information', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (45, 12, ' - A lot of people', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (46, 12, ' - sit around', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (47, 12, ' - jobs founded', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (48, 12, ' - the main town', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (49, 13, ' - All EU countries agreed to', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (50, 13, ' - the new regulations on', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (51, 13, ' - but so far only', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (52, 13, ' - German have done so', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (53, 14, ' - an absolutely old building', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (54, 14, ' - was totally renovated', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (55, 14, ' - did not have to do much decorating', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (56, 14, ' - I moved in', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (57, 15, ' - some discussion along the day', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (58, 15, ' - before my descent from the mountain', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (59, 15, ' - but I never imagined ', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (60, 15, ' - the conditions would be', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (61, 16, ' - On the bus on the way back', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (62, 16, ' - I got to talking to', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (63, 16, ' - was concerned learning ', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (64, 16, ' - it got very cold in the hills', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (65, 17, ' - changing someone''s hairdo', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (66, 17, ' - would also extract teeth', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (67, 17, ' - you could say that an old-fashioned barber ', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (68, 17, ' - Jack of all trades', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (69, 18, ' - be felt by alive', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (70, 18, ' - through sight (apparitions)', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (71, 18, ' - smell (fragrances and odors) ', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (72, 18, ' - sometimes they can just be sensed', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (73, 19, ' - With advance notice', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (74, 19, ' - having thought about your agenda', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (75, 19, ' - prepared presentations', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (76, 19, ' - coming up with solutions to problems', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (77, 20, ' - For his amazement and his admiration', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (78, 20, ' - he had once hoped to kiss', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (79, 20, ' - her untimely death', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (80, 20, ' - at once in front of him', 'D', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (81, 21, 'flush left, bolded, and uppercase', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (82, 21, 'flush left, underlined, and lowercase', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (83, 21, 'centered, bolded, and title case', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (84, 22, '"&"', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (85, 22, '"and"', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (86, 22, 'whatever you like', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (87, 23, 'require a URL or DOI', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (88, 23, 'do not require a URL or DOI', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (89, 23, 'require DOI', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (90, 24, 'italicized', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (91, 24, 'bolded and italicized', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (92, 24, 'underlined', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (93, 25, '"Bibliography"', 'A', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (94, 25, '"Bibliography" or "References"', 'B', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');
INSERT INTO writer.grammar_answer VALUES (95, 25, '"References"', 'C', false, '2021-05-23 11:46:06.406+00', '2021-05-23 11:46:06.406+00');


--
-- Data for Name: grammar_question; Type: TABLE DATA; Schema: writer; Owner: postgres
--

INSERT INTO writer.grammar_question VALUES (1, 'Choose the word or phrase that best completes the sentence.', 'James _____________ some papers in the living room when Jane _____________.', 4, false, '2021-05-23 11:46:06.356+00', '2021-05-23 11:46:06.356+00');
INSERT INTO writer.grammar_question VALUES (2, 'Choose the word or phrase that best completes the sentence.', 'That _____________ the second time Peter _____________ his bride look shy and uncomfortable.', 8, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (3, 'Choose the word or phrase that best completes the sentence.', 'Nuclear waste _____________ radioactive after 10,000 years, so it _____________ carefully; the most dangerous waste _____________ glass which _____________ in deep underground mines.', 9, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (4, 'Choose the word or phrase that best completes the sentence.', 'Researchers have discovered that _____________ Earth''s surface is entirely covered with _____________ ice, but scientists believe that beneath _____________ frozen layer lies _____________ river.', 13, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (5, 'Choose the word or phrase that best completes the sentence.', 'Many people have speculated on _____________ reasons for _____________ western population movements in the European subcontinent during _____________ 16th century, but none of _____________ historical records identified so far _____________ an answer.', 19, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (6, 'Choose the word or phrase that best completes the sentence.', 'The general view is that perhaps dinosaurs brains _____________ larger, but if they _____________ today, dinosaurs _____________ very much in general, and, _____________ much the same.', 22, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (7, 'Choose the word or phrase that best completes the sentence.', 'If you _____________ so fast, you _____________ a tree, and you _____________ this mess now.', 28, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (8, 'Choose the word or phrase that best completes the sentence.', 'It _____________ I started working _____________ my project; at this point, I absolutely have to ask _____________ help if I _____________ finish it today.', 30, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (9, 'Choose the word or phrase that best completes the sentence.', 'You are not allowed to drive _____________ such a high speed _____________ the _____________ area.', 36, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (10, 'Choose the word or phrase that best completes the sentence.', '_____________, she also became interested _____________ student politics and, _____________ her fellow students, was elected University President _____________ her second year.', 39, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (11, 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the sentence.', '__A spokesman insisted__ that __there had been no security problems__ as __neither of__ the computers __held secret information__.', 43, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (12, 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the sentence.', '__A lot of people__ just __sit around__ all day -- there are no __jobs founded__ outside __the main town__.', 47, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (13, 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the sentence.', '__All EU countries agreed to__ implement __the new regulations on__ recycling plastic, __but so far only__ Ukraine and __German have done so__.', 52, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (14, 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the sentence.', 'The flat is in __an absolutely old building__ which __was totally renovated__ last year; fortunately, I __did not have to do much decorating__ when I __moved in__.', 54, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (15, 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the sentence.', 'There was __some discussion along the day__ as to whether the snow would arrive __before my descent from the mountain__, __but I never imagined__ how hard __the conditions would be__.', 57, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (16, 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the sentence.', '__On the bus on the way back__ to the hotel, __I got to talking to__ a local woman and __was concerned learning__ that __it got very cold in the hills__ at night.', 61, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (17, 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the sentence.', 'As well as __changing someone''s hairdo__, a barber __would also extract teeth__ and perform other minor surgeries, so __you could say that an old-fashioned barber__ really was __Jack of all trades__.', 66, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (18, 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the sentence.', 'Ghosts can __be felt by alive__ in a number of ways: __through sight (apparitions)__, sound (voices), __smell (fragrances and odors)__, touch, and __sometimes they can just be sensed__.', 69, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (19, 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the sentence.', '__With advance notice__, participants will come to your meeting __having thought about your agenda__, read through the background papers, __prepared presentations__, and __coming up with solutions to problems__.', 76, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (20, 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the sentence.', '__For his amazement and his admiration__, the figure of the woman __he had once hoped to kiss__ before __her untimely death__ appeared __at once in front of him__.', 77, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (21, NULL, 'In the APA style, a Level 1 heading should be:', 83, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (22, NULL, 'In the references section in the Chicago style, for multiple-author entries you should use:', 85, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (23, NULL, 'In every formatting style, online sources:', 87, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (24, NULL, 'In the MLA style, titles of published works (books, journals, films, etc) mentioned in the text have to be:', 90, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');
INSERT INTO writer.grammar_question VALUES (25, NULL, 'In the Chicago style, you should label the reference list as:', 94, false, '2021-05-23 11:46:06.357+00', '2021-05-23 11:46:06.357+00');


--
-- Data for Name: sample_essay_theme; Type: TABLE DATA; Schema: writer; Owner: postgres
--

INSERT INTO writer.sample_essay_theme VALUES (1, 'Employee motivation and organizational success', 'Describe the impacts of employee motivation on organizational success', 2, 5, false, '2021-05-23 11:46:06.547+00', '2021-05-23 11:46:06.547+00');
INSERT INTO writer.sample_essay_theme VALUES (2, 'Fallacies of distributed computing', 'Discuss the effects of the fallacies of distributed computing', 3, 5, false, '2021-05-23 11:46:06.547+00', '2021-05-23 11:46:06.547+00');


--
-- Data for Name: skill_level; Type: TABLE DATA; Schema: writer; Owner: postgres
--

INSERT INTO writer.skill_level VALUES (1, 'Probation', false, '2021-05-23 11:46:06.088+00', '2021-05-23 11:46:06.088+00');
INSERT INTO writer.skill_level VALUES (2, 'Beginner', false, '2021-05-23 11:46:06.088+00', '2021-05-23 11:46:06.088+00');
INSERT INTO writer.skill_level VALUES (3, 'Intermediate', false, '2021-05-23 11:46:06.088+00', '2021-05-23 11:46:06.088+00');
INSERT INTO writer.skill_level VALUES (4, 'Advanced', false, '2021-05-23 11:46:06.088+00', '2021-05-23 11:46:06.088+00');
INSERT INTO writer.skill_level VALUES (5, 'Expert', false, '2021-05-23 11:46:06.088+00', '2021-05-23 11:46:06.088+00');


--
-- Data for Name: writer; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_application; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_average_rating; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_bid; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_citation_style; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_discipline; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_education; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_email_submission; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_grammar_test; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_profile; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_rating; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_registration_record; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_sample_essay; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_skill_level; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Data for Name: writer_work_experience; Type: TABLE DATA; Schema: writer; Owner: postgres
--



--
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: admin; Owner: postgres
--

SELECT pg_catalog.setval('admin.admin_id_seq', 1, false);


--
-- Name: admin_role_id_seq; Type: SEQUENCE SET; Schema: admin; Owner: postgres
--

SELECT pg_catalog.setval('admin.admin_role_id_seq', 1, false);


--
-- Name: administrative_role_id_seq; Type: SEQUENCE SET; Schema: admin; Owner: postgres
--

SELECT pg_catalog.setval('admin.administrative_role_id_seq', 3, true);


--
-- Name: writer_management_id_seq; Type: SEQUENCE SET; Schema: admin; Owner: postgres
--

SELECT pg_catalog.setval('admin.writer_management_id_seq', 1, true);


--
-- Name: chat_content_id_seq; Type: SEQUENCE SET; Schema: chats; Owner: postgres
--

SELECT pg_catalog.setval('chats.chat_content_id_seq', 1, false);


--
-- Name: chat_id_seq; Type: SEQUENCE SET; Schema: chats; Owner: postgres
--

SELECT pg_catalog.setval('chats.chat_id_seq', 1, false);


--
-- Name: client-otp-code_id_seq; Type: SEQUENCE SET; Schema: client; Owner: postgres
--

SELECT pg_catalog.setval('client."client-otp-code_id_seq"', 1, false);


--
-- Name: client_activity_id_seq; Type: SEQUENCE SET; Schema: client; Owner: postgres
--

SELECT pg_catalog.setval('client.client_activity_id_seq', 1, false);


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: client; Owner: postgres
--

SELECT pg_catalog.setval('client.client_id_seq', 1, false);


--
-- Name: client_order_posting_step_id_seq; Type: SEQUENCE SET; Schema: client; Owner: postgres
--

SELECT pg_catalog.setval('client.client_order_posting_step_id_seq', 1, false);


--
-- Name: assgnmnt_type_category_id_seq; Type: SEQUENCE SET; Schema: general; Owner: postgres
--

SELECT pg_catalog.setval('general.assgnmnt_type_category_id_seq', 3, true);


--
-- Name: assignment_type_id_seq; Type: SEQUENCE SET; Schema: general; Owner: postgres
--

SELECT pg_catalog.setval('general.assignment_type_id_seq', 30, true);


--
-- Name: citation_style_documentation_id_seq; Type: SEQUENCE SET; Schema: general; Owner: postgres
--

SELECT pg_catalog.setval('general.citation_style_documentation_id_seq', 1, false);


--
-- Name: citation_style_id_seq; Type: SEQUENCE SET; Schema: general; Owner: postgres
--

SELECT pg_catalog.setval('general.citation_style_id_seq', 6, true);


--
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: general; Owner: postgres
--

SELECT pg_catalog.setval('general.country_id_seq', 249, true);


--
-- Name: discipline_id_seq; Type: SEQUENCE SET; Schema: general; Owner: postgres
--

SELECT pg_catalog.setval('general.discipline_id_seq', 19, true);


--
-- Name: education_level_id_seq; Type: SEQUENCE SET; Schema: general; Owner: postgres
--

SELECT pg_catalog.setval('general.education_level_id_seq', 7, true);


--
-- Name: gender_id_seq; Type: SEQUENCE SET; Schema: general; Owner: postgres
--

SELECT pg_catalog.setval('general.gender_id_seq', 2, true);


--
-- Name: time_am_pm_id_seq; Type: SEQUENCE SET; Schema: general; Owner: postgres
--

SELECT pg_catalog.setval('general.time_am_pm_id_seq', 24, true);


--
-- Name: access_log_id_seq; Type: SEQUENCE SET; Schema: logs; Owner: postgres
--

SELECT pg_catalog.setval('logs.access_log_id_seq', 1, false);


--
-- Name: client_order_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.client_order_id_seq', 1, false);


--
-- Name: extra_order_service_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.extra_order_service_id_seq', 1, false);


--
-- Name: order_bid_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.order_bid_id_seq', 1, false);


--
-- Name: order_file_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.order_file_id_seq', 1, false);


--
-- Name: order_file_type_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.order_file_type_id_seq', 4, true);


--
-- Name: order_format_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.order_format_id_seq', 2, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.order_id_seq', 1, false);


--
-- Name: order_revision_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.order_revision_id_seq', 1, false);


--
-- Name: order_service_type_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.order_service_type_id_seq', 6, true);


--
-- Name: order_status_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.order_status_id_seq', 10, true);


--
-- Name: submission_checklist_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.submission_checklist_id_seq', 8, true);


--
-- Name: writer_order_id_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.writer_order_id_seq', 1, false);


--
-- Name: base_price_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.base_price_id_seq', 12, true);


--
-- Name: client_balance_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.client_balance_id_seq', 1, false);


--
-- Name: client_payment_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.client_payment_id_seq', 1, false);


--
-- Name: currency_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.currency_id_seq', 9, true);


--
-- Name: mpesa_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.mpesa_id_seq', 1, false);


--
-- Name: mpesa_result_codes_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.mpesa_result_codes_id_seq', 19, true);


--
-- Name: order_payment_detail_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.order_payment_detail_id_seq', 1, false);


--
-- Name: paper_discount_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.paper_discount_id_seq', 7, true);


--
-- Name: payment_ratio_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.payment_ratio_id_seq', 1, true);


--
-- Name: payment_status_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.payment_status_id_seq', 6, true);


--
-- Name: price_increment_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.price_increment_id_seq', 12, true);


--
-- Name: price_tier_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.price_tier_id_seq', 4, true);


--
-- Name: writer_balance_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.writer_balance_id_seq', 1, false);


--
-- Name: writer_payment_id_seq; Type: SEQUENCE SET; Schema: payments; Owner: postgres
--

SELECT pg_catalog.setval('payments.writer_payment_id_seq', 1, false);


--
-- Name: account_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_status_id_seq', 4, true);


--
-- Name: account_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_type_id_seq', 4, true);


--
-- Name: login_via_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.login_via_id_seq', 3, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: academic_certification_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.academic_certification_id_seq', 5, true);


--
-- Name: english_as_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.english_as_id_seq', 2, true);


--
-- Name: grammar_answer_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.grammar_answer_id_seq', 95, true);


--
-- Name: grammar_question_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.grammar_question_id_seq', 25, true);


--
-- Name: sample_essay_theme_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.sample_essay_theme_id_seq', 2, true);


--
-- Name: skill_level_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.skill_level_id_seq', 5, true);


--
-- Name: writer_application_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_application_id_seq', 1, false);


--
-- Name: writer_average_rating_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_average_rating_id_seq', 1, false);


--
-- Name: writer_bid_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_bid_id_seq', 1, false);


--
-- Name: writer_citation_style_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_citation_style_id_seq', 1, false);


--
-- Name: writer_discipline_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_discipline_id_seq', 1, false);


--
-- Name: writer_education_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_education_id_seq', 1, false);


--
-- Name: writer_email_submission_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_email_submission_id_seq', 1, false);


--
-- Name: writer_grammar_test_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_grammar_test_id_seq', 1, false);


--
-- Name: writer_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_id_seq', 1, false);


--
-- Name: writer_profile_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_profile_id_seq', 1, false);


--
-- Name: writer_rating_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_rating_id_seq', 1, false);


--
-- Name: writer_registration_record_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_registration_record_id_seq', 1, false);


--
-- Name: writer_sample_essay_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_sample_essay_id_seq', 1, false);


--
-- Name: writer_skill_level_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_skill_level_id_seq', 1, false);


--
-- Name: writer_work_experience_id_seq; Type: SEQUENCE SET; Schema: writer; Owner: postgres
--

SELECT pg_catalog.setval('writer.writer_work_experience_id_seq', 1, false);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: admin; Owner: postgres
--

ALTER TABLE ONLY admin.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- Name: admin_role admin_role_pkey; Type: CONSTRAINT; Schema: admin; Owner: postgres
--

ALTER TABLE ONLY admin.admin_role
    ADD CONSTRAINT admin_role_pkey PRIMARY KEY (id);


--
-- Name: administrative_role administrative_role_pkey; Type: CONSTRAINT; Schema: admin; Owner: postgres
--

ALTER TABLE ONLY admin.administrative_role
    ADD CONSTRAINT administrative_role_pkey PRIMARY KEY (id);


--
-- Name: writer_management writer_management_pkey; Type: CONSTRAINT; Schema: admin; Owner: postgres
--

ALTER TABLE ONLY admin.writer_management
    ADD CONSTRAINT writer_management_pkey PRIMARY KEY (id);


--
-- Name: chat_content chat_content_pkey; Type: CONSTRAINT; Schema: chats; Owner: postgres
--

ALTER TABLE ONLY chats.chat_content
    ADD CONSTRAINT chat_content_pkey PRIMARY KEY (id);


--
-- Name: chat chat_pkey; Type: CONSTRAINT; Schema: chats; Owner: postgres
--

ALTER TABLE ONLY chats.chat
    ADD CONSTRAINT chat_pkey PRIMARY KEY (id);


--
-- Name: client-otp-code client-otp-code_pkey; Type: CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client."client-otp-code"
    ADD CONSTRAINT "client-otp-code_pkey" PRIMARY KEY (id);


--
-- Name: client_activity client_activity_pkey; Type: CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.client_activity
    ADD CONSTRAINT client_activity_pkey PRIMARY KEY (id);


--
-- Name: client_order_posting_step client_order_posting_step_pkey; Type: CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.client_order_posting_step
    ADD CONSTRAINT client_order_posting_step_pkey PRIMARY KEY (id);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: assgnmnt_type_category assgnmnt_type_category_pkey; Type: CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.assgnmnt_type_category
    ADD CONSTRAINT assgnmnt_type_category_pkey PRIMARY KEY (id);


--
-- Name: assignment_type assignment_type_pkey; Type: CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.assignment_type
    ADD CONSTRAINT assignment_type_pkey PRIMARY KEY (id);


--
-- Name: citation_style_documentation citation_style_documentation_pkey; Type: CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.citation_style_documentation
    ADD CONSTRAINT citation_style_documentation_pkey PRIMARY KEY (id);


--
-- Name: citation_style citation_style_pkey; Type: CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.citation_style
    ADD CONSTRAINT citation_style_pkey PRIMARY KEY (id);


--
-- Name: country country_countryCode_key; Type: CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.country
    ADD CONSTRAINT "country_countryCode_key" UNIQUE ("countryCode");


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- Name: discipline discipline_pkey; Type: CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.discipline
    ADD CONSTRAINT discipline_pkey PRIMARY KEY (id);


--
-- Name: education_level education_level_pkey; Type: CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.education_level
    ADD CONSTRAINT education_level_pkey PRIMARY KEY (id);


--
-- Name: gender gender_pkey; Type: CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.gender
    ADD CONSTRAINT gender_pkey PRIMARY KEY (id);


--
-- Name: time_am_pm time_am_pm_pkey; Type: CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.time_am_pm
    ADD CONSTRAINT time_am_pm_pkey PRIMARY KEY (id);


--
-- Name: access_log access_log_pkey; Type: CONSTRAINT; Schema: logs; Owner: postgres
--

ALTER TABLE ONLY logs.access_log
    ADD CONSTRAINT access_log_pkey PRIMARY KEY (id);


--
-- Name: client_order client_order_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.client_order
    ADD CONSTRAINT client_order_pkey PRIMARY KEY (id);


--
-- Name: extra_order_service extra_order_service_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.extra_order_service
    ADD CONSTRAINT extra_order_service_pkey PRIMARY KEY (id);


--
-- Name: order_bid order_bid_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_bid
    ADD CONSTRAINT order_bid_pkey PRIMARY KEY (id);


--
-- Name: order_file order_file_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_file
    ADD CONSTRAINT order_file_pkey PRIMARY KEY (id);


--
-- Name: order_file_type order_file_type_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_file_type
    ADD CONSTRAINT order_file_type_pkey PRIMARY KEY (id);


--
-- Name: order_format order_format_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_format
    ADD CONSTRAINT order_format_pkey PRIMARY KEY (id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: order_revision order_revision_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_revision
    ADD CONSTRAINT order_revision_pkey PRIMARY KEY (id);


--
-- Name: order_service_type order_service_type_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_service_type
    ADD CONSTRAINT order_service_type_pkey PRIMARY KEY (id);


--
-- Name: order_status order_status_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_status
    ADD CONSTRAINT order_status_pkey PRIMARY KEY (id);


--
-- Name: submission_checklist submission_checklist_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.submission_checklist
    ADD CONSTRAINT submission_checklist_pkey PRIMARY KEY (id);


--
-- Name: writer_order writer_order_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.writer_order
    ADD CONSTRAINT writer_order_pkey PRIMARY KEY (id);


--
-- Name: base_price base_price_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.base_price
    ADD CONSTRAINT base_price_pkey PRIMARY KEY (id);


--
-- Name: client_balance client_balance_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.client_balance
    ADD CONSTRAINT client_balance_pkey PRIMARY KEY (id);


--
-- Name: client_payment client_payment_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.client_payment
    ADD CONSTRAINT client_payment_pkey PRIMARY KEY (id);


--
-- Name: currency currency_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.currency
    ADD CONSTRAINT currency_pkey PRIMARY KEY (id);


--
-- Name: mpesa mpesa_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.mpesa
    ADD CONSTRAINT mpesa_pkey PRIMARY KEY (id);


--
-- Name: mpesa_result_codes mpesa_result_codes_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.mpesa_result_codes
    ADD CONSTRAINT mpesa_result_codes_pkey PRIMARY KEY (id);


--
-- Name: order_payment_detail order_payment_detail_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.order_payment_detail
    ADD CONSTRAINT order_payment_detail_pkey PRIMARY KEY (id);


--
-- Name: paper_discount paper_discount_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.paper_discount
    ADD CONSTRAINT paper_discount_pkey PRIMARY KEY (id);


--
-- Name: payment_ratio payment_ratio_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.payment_ratio
    ADD CONSTRAINT payment_ratio_pkey PRIMARY KEY (id);


--
-- Name: payment_status payment_status_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.payment_status
    ADD CONSTRAINT payment_status_pkey PRIMARY KEY (id);


--
-- Name: price_increment price_increment_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.price_increment
    ADD CONSTRAINT price_increment_pkey PRIMARY KEY (id);


--
-- Name: price_tier price_tier_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.price_tier
    ADD CONSTRAINT price_tier_pkey PRIMARY KEY (id);


--
-- Name: writer_balance writer_balance_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.writer_balance
    ADD CONSTRAINT writer_balance_pkey PRIMARY KEY (id);


--
-- Name: writer_payment writer_payment_pkey; Type: CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.writer_payment
    ADD CONSTRAINT writer_payment_pkey PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: account_status account_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_status
    ADD CONSTRAINT account_status_pkey PRIMARY KEY (id);


--
-- Name: account_type account_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_type
    ADD CONSTRAINT account_type_pkey PRIMARY KEY (id);


--
-- Name: login_via login_via_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_via
    ADD CONSTRAINT login_via_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: academic_certification academic_certification_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.academic_certification
    ADD CONSTRAINT academic_certification_pkey PRIMARY KEY (id);


--
-- Name: english_as english_as_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.english_as
    ADD CONSTRAINT english_as_pkey PRIMARY KEY (id);


--
-- Name: grammar_answer grammar_answer_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.grammar_answer
    ADD CONSTRAINT grammar_answer_pkey PRIMARY KEY (id);


--
-- Name: grammar_question grammar_question_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.grammar_question
    ADD CONSTRAINT grammar_question_pkey PRIMARY KEY (id);


--
-- Name: sample_essay_theme sample_essay_theme_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.sample_essay_theme
    ADD CONSTRAINT sample_essay_theme_pkey PRIMARY KEY (id);


--
-- Name: skill_level skill_level_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.skill_level
    ADD CONSTRAINT skill_level_pkey PRIMARY KEY (id);


--
-- Name: writer_application writer_application_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_application
    ADD CONSTRAINT writer_application_pkey PRIMARY KEY (id);


--
-- Name: writer_average_rating writer_average_rating_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_average_rating
    ADD CONSTRAINT writer_average_rating_pkey PRIMARY KEY (id);


--
-- Name: writer_bid writer_bid_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_bid
    ADD CONSTRAINT writer_bid_pkey PRIMARY KEY (id);


--
-- Name: writer_citation_style writer_citation_style_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_citation_style
    ADD CONSTRAINT writer_citation_style_pkey PRIMARY KEY (id);


--
-- Name: writer_discipline writer_discipline_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_discipline
    ADD CONSTRAINT writer_discipline_pkey PRIMARY KEY (id);


--
-- Name: writer_education writer_education_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_education
    ADD CONSTRAINT writer_education_pkey PRIMARY KEY (id);


--
-- Name: writer_email_submission writer_email_submission_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_email_submission
    ADD CONSTRAINT writer_email_submission_pkey PRIMARY KEY (id);


--
-- Name: writer_grammar_test writer_grammar_test_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_grammar_test
    ADD CONSTRAINT writer_grammar_test_pkey PRIMARY KEY (id);


--
-- Name: writer writer_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer
    ADD CONSTRAINT writer_pkey PRIMARY KEY (id);


--
-- Name: writer_profile writer_profile_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_profile
    ADD CONSTRAINT writer_profile_pkey PRIMARY KEY (id);


--
-- Name: writer_rating writer_rating_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_rating
    ADD CONSTRAINT writer_rating_pkey PRIMARY KEY (id);


--
-- Name: writer_registration_record writer_registration_record_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_registration_record
    ADD CONSTRAINT writer_registration_record_pkey PRIMARY KEY (id);


--
-- Name: writer_sample_essay writer_sample_essay_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_sample_essay
    ADD CONSTRAINT writer_sample_essay_pkey PRIMARY KEY (id);


--
-- Name: writer_skill_level writer_skill_level_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_skill_level
    ADD CONSTRAINT writer_skill_level_pkey PRIMARY KEY (id);


--
-- Name: writer_work_experience writer_work_experience_pkey; Type: CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_work_experience
    ADD CONSTRAINT writer_work_experience_pkey PRIMARY KEY (id);


--
-- Name: admin_role admin_role_adminId_fkey; Type: FK CONSTRAINT; Schema: admin; Owner: postgres
--

ALTER TABLE ONLY admin.admin_role
    ADD CONSTRAINT "admin_role_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES admin.admin(id);


--
-- Name: admin_role admin_role_roleId_fkey; Type: FK CONSTRAINT; Schema: admin; Owner: postgres
--

ALTER TABLE ONLY admin.admin_role
    ADD CONSTRAINT "admin_role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES admin.administrative_role(id);


--
-- Name: admin admin_userId_fkey; Type: FK CONSTRAINT; Schema: admin; Owner: postgres
--

ALTER TABLE ONLY admin.admin
    ADD CONSTRAINT "admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: chat_content chat_content_chatId_fkey; Type: FK CONSTRAINT; Schema: chats; Owner: postgres
--

ALTER TABLE ONLY chats.chat_content
    ADD CONSTRAINT "chat_content_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES chats.chat(id);


--
-- Name: client-otp-code client-otp-code_clientId_fkey; Type: FK CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client."client-otp-code"
    ADD CONSTRAINT "client-otp-code_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES client.client(id);


--
-- Name: client_activity client_activity_clientId_fkey; Type: FK CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.client_activity
    ADD CONSTRAINT "client_activity_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES client.client(id);


--
-- Name: client_order_posting_step client_order_posting_step_clientId_fkey; Type: FK CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.client_order_posting_step
    ADD CONSTRAINT "client_order_posting_step_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES client.client(id);


--
-- Name: client_order_posting_step client_order_posting_step_orderId_fkey; Type: FK CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.client_order_posting_step
    ADD CONSTRAINT "client_order_posting_step_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: client client_userId_fkey; Type: FK CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.client
    ADD CONSTRAINT "client_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: assignment_type assignment_type_category_fkey; Type: FK CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.assignment_type
    ADD CONSTRAINT assignment_type_category_fkey FOREIGN KEY (category) REFERENCES general.assgnmnt_type_category(id);


--
-- Name: assignment_type assignment_type_tier_fkey; Type: FK CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.assignment_type
    ADD CONSTRAINT assignment_type_tier_fkey FOREIGN KEY (tier) REFERENCES payments.price_tier(id);


--
-- Name: citation_style_documentation citation_style_documentation_citationStyleId_fkey; Type: FK CONSTRAINT; Schema: general; Owner: postgres
--

ALTER TABLE ONLY general.citation_style_documentation
    ADD CONSTRAINT "citation_style_documentation_citationStyleId_fkey" FOREIGN KEY ("citationStyleId") REFERENCES general.citation_style(id);


--
-- Name: access_log access_log_partyTypeId_fkey; Type: FK CONSTRAINT; Schema: logs; Owner: postgres
--

ALTER TABLE ONLY logs.access_log
    ADD CONSTRAINT "access_log_partyTypeId_fkey" FOREIGN KEY ("partyTypeId") REFERENCES public.account_type(id);


--
-- Name: client_order client_order_clientId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.client_order
    ADD CONSTRAINT "client_order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES client.client(id);


--
-- Name: client_order client_order_orderId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.client_order
    ADD CONSTRAINT "client_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: extra_order_service extra_order_service_orderId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.extra_order_service
    ADD CONSTRAINT "extra_order_service_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: extra_order_service extra_order_service_serviceTypeId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.extra_order_service
    ADD CONSTRAINT "extra_order_service_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES orders.order_service_type(id);


--
-- Name: order order_assignmentType_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders."order"
    ADD CONSTRAINT "order_assignmentType_fkey" FOREIGN KEY ("assignmentType") REFERENCES general.assignment_type(id);


--
-- Name: order_bid order_bid_orderId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_bid
    ADD CONSTRAINT "order_bid_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: order_bid order_bid_writerId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_bid
    ADD CONSTRAINT "order_bid_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: order order_citationStyleId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders."order"
    ADD CONSTRAINT "order_citationStyleId_fkey" FOREIGN KEY ("citationStyleId") REFERENCES general.citation_style(id);


--
-- Name: order order_clientId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders."order"
    ADD CONSTRAINT "order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES client.client(id);


--
-- Name: order order_deadlineTime_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders."order"
    ADD CONSTRAINT "order_deadlineTime_fkey" FOREIGN KEY ("deadlineTime") REFERENCES general.time_am_pm(id);


--
-- Name: order_file order_file_orderId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_file
    ADD CONSTRAINT "order_file_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: order_file order_file_type_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_file
    ADD CONSTRAINT order_file_type_fkey FOREIGN KEY (type) REFERENCES orders.order_file_type(id);


--
-- Name: order order_orderFormatId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders."order"
    ADD CONSTRAINT "order_orderFormatId_fkey" FOREIGN KEY ("orderFormatId") REFERENCES orders.order_format(id);


--
-- Name: order_revision order_revision_orderId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_revision
    ADD CONSTRAINT "order_revision_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: order order_serviceTypeId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders."order"
    ADD CONSTRAINT "order_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES orders.order_service_type(id);


--
-- Name: order_service_type order_service_type_currencyId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_service_type
    ADD CONSTRAINT "order_service_type_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES payments.currency(id);


--
-- Name: order order_statusId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders."order"
    ADD CONSTRAINT "order_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES orders.order_status(id);


--
-- Name: order order_studyLevelId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders."order"
    ADD CONSTRAINT "order_studyLevelId_fkey" FOREIGN KEY ("studyLevelId") REFERENCES general.education_level(id);


--
-- Name: order order_subjectId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders."order"
    ADD CONSTRAINT "order_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES general.discipline(id);


--
-- Name: writer_order writer_order_orderId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.writer_order
    ADD CONSTRAINT "writer_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: writer_order writer_order_writerId_fkey; Type: FK CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.writer_order
    ADD CONSTRAINT "writer_order_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: base_price base_price_currency_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.base_price
    ADD CONSTRAINT base_price_currency_fkey FOREIGN KEY (currency) REFERENCES payments.currency(id);


--
-- Name: base_price base_price_serviceType_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.base_price
    ADD CONSTRAINT "base_price_serviceType_fkey" FOREIGN KEY ("serviceType") REFERENCES orders.order_service_type(id);


--
-- Name: base_price base_price_tier_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.base_price
    ADD CONSTRAINT base_price_tier_fkey FOREIGN KEY (tier) REFERENCES payments.price_tier(id);


--
-- Name: client_balance client_balance_clientId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.client_balance
    ADD CONSTRAINT "client_balance_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES client.client(id);


--
-- Name: client_balance client_balance_currencyId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.client_balance
    ADD CONSTRAINT "client_balance_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES payments.currency(id);


--
-- Name: client_payment client_payment_clientId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.client_payment
    ADD CONSTRAINT "client_payment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES client.client(id);


--
-- Name: client_payment client_payment_currencyId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.client_payment
    ADD CONSTRAINT "client_payment_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES payments.currency(id);


--
-- Name: client_payment client_payment_orderId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.client_payment
    ADD CONSTRAINT "client_payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: client_payment client_payment_statusId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.client_payment
    ADD CONSTRAINT "client_payment_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES payments.payment_status(id);


--
-- Name: mpesa mpesa_resultCodeId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.mpesa
    ADD CONSTRAINT "mpesa_resultCodeId_fkey" FOREIGN KEY ("resultCodeId") REFERENCES payments.mpesa_result_codes(id);


--
-- Name: order_payment_detail order_payment_detail_currencyId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.order_payment_detail
    ADD CONSTRAINT "order_payment_detail_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES payments.currency(id);


--
-- Name: order_payment_detail order_payment_detail_orderId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.order_payment_detail
    ADD CONSTRAINT "order_payment_detail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: price_increment price_increment_serviceType_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.price_increment
    ADD CONSTRAINT "price_increment_serviceType_fkey" FOREIGN KEY ("serviceType") REFERENCES orders.order_service_type(id);


--
-- Name: price_increment price_increment_tier_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.price_increment
    ADD CONSTRAINT price_increment_tier_fkey FOREIGN KEY (tier) REFERENCES payments.price_tier(id);


--
-- Name: writer_balance writer_balance_currencyId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.writer_balance
    ADD CONSTRAINT "writer_balance_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES payments.currency(id);


--
-- Name: writer_balance writer_balance_writerId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.writer_balance
    ADD CONSTRAINT "writer_balance_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: writer_payment writer_payment_currencyId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.writer_payment
    ADD CONSTRAINT "writer_payment_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES payments.currency(id);


--
-- Name: writer_payment writer_payment_orderId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.writer_payment
    ADD CONSTRAINT "writer_payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: writer_payment writer_payment_statusId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.writer_payment
    ADD CONSTRAINT "writer_payment_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES payments.payment_status(id);


--
-- Name: writer_payment writer_payment_writerId_fkey; Type: FK CONSTRAINT; Schema: payments; Owner: postgres
--

ALTER TABLE ONLY payments.writer_payment
    ADD CONSTRAINT "writer_payment_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: user user_accountStatus_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "user_accountStatus_fkey" FOREIGN KEY ("accountStatus") REFERENCES public.account_status(id);


--
-- Name: user user_loginVia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "user_loginVia_fkey" FOREIGN KEY ("loginVia") REFERENCES public.login_via(id);


--
-- Name: user user_userType_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "user_userType_fkey" FOREIGN KEY ("userType") REFERENCES public.account_type(id);


--
-- Name: grammar_answer grammar_answer_questionId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.grammar_answer
    ADD CONSTRAINT "grammar_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES writer.grammar_question(id);


--
-- Name: sample_essay_theme sample_essay_theme_educationLevelId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.sample_essay_theme
    ADD CONSTRAINT "sample_essay_theme_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES general.discipline(id);


--
-- Name: sample_essay_theme sample_essay_theme_subjectId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.sample_essay_theme
    ADD CONSTRAINT "sample_essay_theme_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES general.discipline(id);


--
-- Name: writer_average_rating writer_average_rating_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_average_rating
    ADD CONSTRAINT "writer_average_rating_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: writer_bid writer_bid_orderId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_bid
    ADD CONSTRAINT "writer_bid_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: writer_bid writer_bid_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_bid
    ADD CONSTRAINT "writer_bid_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: writer_citation_style writer_citation_style_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_citation_style
    ADD CONSTRAINT "writer_citation_style_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: writer writer_citizenshipId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer
    ADD CONSTRAINT "writer_citizenshipId_fkey" FOREIGN KEY ("citizenshipId") REFERENCES general.country(id);


--
-- Name: writer_discipline writer_discipline_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_discipline
    ADD CONSTRAINT "writer_discipline_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: writer_education writer_education_highestAchievementId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_education
    ADD CONSTRAINT "writer_education_highestAchievementId_fkey" FOREIGN KEY ("highestAchievementId") REFERENCES writer.academic_certification(id);


--
-- Name: writer_education writer_education_highestLevelId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_education
    ADD CONSTRAINT "writer_education_highestLevelId_fkey" FOREIGN KEY ("highestLevelId") REFERENCES general.education_level(id);


--
-- Name: writer_education writer_education_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_education
    ADD CONSTRAINT "writer_education_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: writer_email_submission writer_email_submission_userId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_email_submission
    ADD CONSTRAINT "writer_email_submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: writer writer_englishAsId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer
    ADD CONSTRAINT "writer_englishAsId_fkey" FOREIGN KEY ("englishAsId") REFERENCES writer.english_as(id);


--
-- Name: writer writer_genderId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer
    ADD CONSTRAINT "writer_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES general.gender(id);


--
-- Name: writer_grammar_test writer_grammar_test_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_grammar_test
    ADD CONSTRAINT "writer_grammar_test_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: writer_profile writer_profile_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_profile
    ADD CONSTRAINT "writer_profile_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: writer_rating writer_rating_orderId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_rating
    ADD CONSTRAINT "writer_rating_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES orders."order"(id);


--
-- Name: writer_rating writer_rating_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_rating
    ADD CONSTRAINT "writer_rating_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: writer_registration_record writer_registration_record_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_registration_record
    ADD CONSTRAINT "writer_registration_record_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer_email_submission(id);


--
-- Name: writer_sample_essay writer_sample_essay_themeId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_sample_essay
    ADD CONSTRAINT "writer_sample_essay_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES writer.sample_essay_theme(id);


--
-- Name: writer_sample_essay writer_sample_essay_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_sample_essay
    ADD CONSTRAINT "writer_sample_essay_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: writer_skill_level writer_skill_level_skillLevelId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_skill_level
    ADD CONSTRAINT "writer_skill_level_skillLevelId_fkey" FOREIGN KEY ("skillLevelId") REFERENCES writer.skill_level(id);


--
-- Name: writer_skill_level writer_skill_level_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_skill_level
    ADD CONSTRAINT "writer_skill_level_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- Name: writer writer_userId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer
    ADD CONSTRAINT "writer_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: writer_work_experience writer_work_experience_writerId_fkey; Type: FK CONSTRAINT; Schema: writer; Owner: postgres
--

ALTER TABLE ONLY writer.writer_work_experience
    ADD CONSTRAINT "writer_work_experience_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES writer.writer(id);


--
-- PostgreSQL database dump complete
--

