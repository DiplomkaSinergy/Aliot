--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9
-- Dumped by pg_dump version 14.9

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: basket_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.basket_products (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    quantity bigint NOT NULL,
    basket_id bigint,
    product_id bigint
);


ALTER TABLE public.basket_products OWNER TO postgres;

--
-- Name: basket_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.basket_products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.basket_products_id_seq OWNER TO postgres;

--
-- Name: basket_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.basket_products_id_seq OWNED BY public.basket_products.id;


--
-- Name: baskets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.baskets (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    user_id bigint
);


ALTER TABLE public.baskets OWNER TO postgres;

--
-- Name: baskets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.baskets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baskets_id_seq OWNER TO postgres;

--
-- Name: baskets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.baskets_id_seq OWNED BY public.baskets.id;


--
-- Name: brands_chars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands_chars (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    characteristic_name_id bigint
);


ALTER TABLE public.brands_chars OWNER TO postgres;

--
-- Name: brands_chars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_chars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brands_chars_id_seq OWNER TO postgres;

--
-- Name: brands_chars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_chars_id_seq OWNED BY public.brands_chars.id;


--
-- Name: breaking_capacity_chars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.breaking_capacity_chars (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    characteristic_name_id bigint
);


ALTER TABLE public.breaking_capacity_chars OWNER TO postgres;

--
-- Name: breaking_capacity_chars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.breaking_capacity_chars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.breaking_capacity_chars_id_seq OWNER TO postgres;

--
-- Name: breaking_capacity_chars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.breaking_capacity_chars_id_seq OWNED BY public.breaking_capacity_chars.id;


--
-- Name: characteristic_names; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.characteristic_names (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text NOT NULL
);


ALTER TABLE public.characteristic_names OWNER TO postgres;

--
-- Name: characteristic_names_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.characteristic_names_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.characteristic_names_id_seq OWNER TO postgres;

--
-- Name: characteristic_names_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.characteristic_names_id_seq OWNED BY public.characteristic_names.id;


--
-- Name: degree_protection_chars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.degree_protection_chars (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    characteristic_name_id bigint
);


ALTER TABLE public.degree_protection_chars OWNER TO postgres;

--
-- Name: degree_protection_chars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.degree_protection_chars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.degree_protection_chars_id_seq OWNER TO postgres;

--
-- Name: degree_protection_chars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.degree_protection_chars_id_seq OWNED BY public.degree_protection_chars.id;


--
-- Name: display_chars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.display_chars (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    characteristic_name_id bigint
);


ALTER TABLE public.display_chars OWNER TO postgres;

--
-- Name: display_chars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.display_chars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.display_chars_id_seq OWNER TO postgres;

--
-- Name: display_chars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.display_chars_id_seq OWNED BY public.display_chars.id;


--
-- Name: number_poles_chars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.number_poles_chars (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    characteristic_name_id bigint
);


ALTER TABLE public.number_poles_chars OWNER TO postgres;

--
-- Name: number_poles_chars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.number_poles_chars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.number_poles_chars_id_seq OWNER TO postgres;

--
-- Name: number_poles_chars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.number_poles_chars_id_seq OWNED BY public.number_poles_chars.id;


--
-- Name: order_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_products (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    quantity bigint NOT NULL,
    order_id bigint,
    product_id bigint
);


ALTER TABLE public.order_products OWNER TO postgres;

--
-- Name: order_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_products_id_seq OWNER TO postgres;

--
-- Name: order_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_products_id_seq OWNED BY public.order_products.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    price bigint NOT NULL,
    status text DEFAULT 'Не оплачен'::text NOT NULL,
    address text NOT NULL,
    payment_id text,
    user_id bigint
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: product_infos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_infos (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    title text NOT NULL,
    description text NOT NULL,
    product_id bigint
);


ALTER TABLE public.product_infos OWNER TO postgres;

--
-- Name: product_infos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_infos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_infos_id_seq OWNER TO postgres;

--
-- Name: product_infos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_infos_id_seq OWNED BY public.product_infos.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    price bigint NOT NULL,
    rating bigint DEFAULT 0,
    img text NOT NULL,
    breaking_capacity_char_id bigint,
    type_of_mechanism_char_id bigint,
    rated_current_char_id bigint,
    rated_voltage_char_id bigint,
    degree_protection_char_id bigint,
    number_poles_char_id bigint,
    shutdown_cruve_char_id bigint,
    display_char_id bigint,
    brands_char_id bigint
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: rated_current_chars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rated_current_chars (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    characteristic_name_id bigint
);


ALTER TABLE public.rated_current_chars OWNER TO postgres;

--
-- Name: rated_current_chars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rated_current_chars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rated_current_chars_id_seq OWNER TO postgres;

--
-- Name: rated_current_chars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rated_current_chars_id_seq OWNED BY public.rated_current_chars.id;


--
-- Name: rated_voltage_chars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rated_voltage_chars (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    characteristic_name_id bigint
);


ALTER TABLE public.rated_voltage_chars OWNER TO postgres;

--
-- Name: rated_voltage_chars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rated_voltage_chars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rated_voltage_chars_id_seq OWNER TO postgres;

--
-- Name: rated_voltage_chars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rated_voltage_chars_id_seq OWNED BY public.rated_voltage_chars.id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    rate text NOT NULL,
    user_id bigint,
    product_id bigint
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- Name: ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ratings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_id_seq OWNER TO postgres;

--
-- Name: ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;


--
-- Name: shutdown_cruve_chars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shutdown_cruve_chars (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    characteristic_name_id bigint
);


ALTER TABLE public.shutdown_cruve_chars OWNER TO postgres;

--
-- Name: shutdown_cruve_chars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shutdown_cruve_chars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shutdown_cruve_chars_id_seq OWNER TO postgres;

--
-- Name: shutdown_cruve_chars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shutdown_cruve_chars_id_seq OWNED BY public.shutdown_cruve_chars.id;


--
-- Name: type_of_mechanism_chars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_of_mechanism_chars (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    characteristic_name_id bigint
);


ALTER TABLE public.type_of_mechanism_chars OWNER TO postgres;

--
-- Name: type_of_mechanism_chars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_of_mechanism_chars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_of_mechanism_chars_id_seq OWNER TO postgres;

--
-- Name: type_of_mechanism_chars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_of_mechanism_chars_id_seq OWNED BY public.type_of_mechanism_chars.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    email text NOT NULL,
    password text NOT NULL,
    first_name text,
    last_name text,
    phone text,
    role text DEFAULT 'USER'::text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: basket_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.basket_products ALTER COLUMN id SET DEFAULT nextval('public.basket_products_id_seq'::regclass);


--
-- Name: baskets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.baskets ALTER COLUMN id SET DEFAULT nextval('public.baskets_id_seq'::regclass);


--
-- Name: brands_chars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands_chars ALTER COLUMN id SET DEFAULT nextval('public.brands_chars_id_seq'::regclass);


--
-- Name: breaking_capacity_chars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.breaking_capacity_chars ALTER COLUMN id SET DEFAULT nextval('public.breaking_capacity_chars_id_seq'::regclass);


--
-- Name: characteristic_names id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characteristic_names ALTER COLUMN id SET DEFAULT nextval('public.characteristic_names_id_seq'::regclass);


--
-- Name: degree_protection_chars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.degree_protection_chars ALTER COLUMN id SET DEFAULT nextval('public.degree_protection_chars_id_seq'::regclass);


--
-- Name: display_chars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.display_chars ALTER COLUMN id SET DEFAULT nextval('public.display_chars_id_seq'::regclass);


--
-- Name: number_poles_chars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.number_poles_chars ALTER COLUMN id SET DEFAULT nextval('public.number_poles_chars_id_seq'::regclass);


--
-- Name: order_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products ALTER COLUMN id SET DEFAULT nextval('public.order_products_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: product_infos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_infos ALTER COLUMN id SET DEFAULT nextval('public.product_infos_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: rated_current_chars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rated_current_chars ALTER COLUMN id SET DEFAULT nextval('public.rated_current_chars_id_seq'::regclass);


--
-- Name: rated_voltage_chars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rated_voltage_chars ALTER COLUMN id SET DEFAULT nextval('public.rated_voltage_chars_id_seq'::regclass);


--
-- Name: ratings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);


--
-- Name: shutdown_cruve_chars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shutdown_cruve_chars ALTER COLUMN id SET DEFAULT nextval('public.shutdown_cruve_chars_id_seq'::regclass);


--
-- Name: type_of_mechanism_chars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_of_mechanism_chars ALTER COLUMN id SET DEFAULT nextval('public.type_of_mechanism_chars_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: basket_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.basket_products (id, created_at, updated_at, deleted_at, quantity, basket_id, product_id) FROM stdin;
\.


--
-- Data for Name: baskets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.baskets (id, created_at, updated_at, deleted_at, user_id) FROM stdin;
6	2024-05-04 17:59:03.354943+03	2024-05-04 17:59:03.354943+03	\N	7
\.


--
-- Data for Name: brands_chars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands_chars (id, created_at, updated_at, deleted_at, name, characteristic_name_id) FROM stdin;
\.


--
-- Data for Name: breaking_capacity_chars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.breaking_capacity_chars (id, created_at, updated_at, deleted_at, name, characteristic_name_id) FROM stdin;
\.


--
-- Data for Name: characteristic_names; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.characteristic_names (id, created_at, updated_at, deleted_at, name) FROM stdin;
\.


--
-- Data for Name: degree_protection_chars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.degree_protection_chars (id, created_at, updated_at, deleted_at, name, characteristic_name_id) FROM stdin;
\.


--
-- Data for Name: display_chars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.display_chars (id, created_at, updated_at, deleted_at, name, characteristic_name_id) FROM stdin;
\.


--
-- Data for Name: number_poles_chars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.number_poles_chars (id, created_at, updated_at, deleted_at, name, characteristic_name_id) FROM stdin;
\.


--
-- Data for Name: order_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_products (id, created_at, updated_at, deleted_at, quantity, order_id, product_id) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, created_at, updated_at, deleted_at, price, status, address, payment_id, user_id) FROM stdin;
\.


--
-- Data for Name: product_infos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_infos (id, created_at, updated_at, deleted_at, title, description, product_id) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, created_at, updated_at, deleted_at, name, price, rating, img, breaking_capacity_char_id, type_of_mechanism_char_id, rated_current_char_id, rated_voltage_char_id, degree_protection_char_id, number_poles_char_id, shutdown_cruve_char_id, display_char_id, brands_char_id) FROM stdin;
\.


--
-- Data for Name: rated_current_chars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rated_current_chars (id, created_at, updated_at, deleted_at, name, characteristic_name_id) FROM stdin;
\.


--
-- Data for Name: rated_voltage_chars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rated_voltage_chars (id, created_at, updated_at, deleted_at, name, characteristic_name_id) FROM stdin;
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratings (id, created_at, updated_at, deleted_at, rate, user_id, product_id) FROM stdin;
\.


--
-- Data for Name: shutdown_cruve_chars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shutdown_cruve_chars (id, created_at, updated_at, deleted_at, name, characteristic_name_id) FROM stdin;
\.


--
-- Data for Name: type_of_mechanism_chars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_of_mechanism_chars (id, created_at, updated_at, deleted_at, name, characteristic_name_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, created_at, updated_at, deleted_at, email, password, first_name, last_name, phone, role) FROM stdin;
1	2024-05-04 16:18:26.605151+03	2024-05-04 16:18:26.605151+03	\N	admin@mail.ru	$2a$10$Y7ltI8OzUAUsB3VMgIDE7usyCJswEFQmsfTnkUiKkwE.eory/IeRu				admin
7	2024-05-04 17:59:03.350926+03	2024-05-04 17:59:03.350926+03	\N	mmm@mail.ru	$2a$10$4EbZLefPKrGlCClUvxbNE.sQfaE7PPUvTh.VIxGpe6yuKZXZw1Kcy			8 (123) 123 32-23	user
\.


--
-- Name: basket_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.basket_products_id_seq', 1, false);


--
-- Name: baskets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.baskets_id_seq', 6, true);


--
-- Name: brands_chars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_chars_id_seq', 1, false);


--
-- Name: breaking_capacity_chars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.breaking_capacity_chars_id_seq', 1, false);


--
-- Name: characteristic_names_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.characteristic_names_id_seq', 1, false);


--
-- Name: degree_protection_chars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.degree_protection_chars_id_seq', 1, false);


--
-- Name: display_chars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.display_chars_id_seq', 1, false);


--
-- Name: number_poles_chars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.number_poles_chars_id_seq', 1, false);


--
-- Name: order_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_products_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: product_infos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_infos_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- Name: rated_current_chars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rated_current_chars_id_seq', 1, false);


--
-- Name: rated_voltage_chars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rated_voltage_chars_id_seq', 1, false);


--
-- Name: ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ratings_id_seq', 1, false);


--
-- Name: shutdown_cruve_chars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shutdown_cruve_chars_id_seq', 1, false);


--
-- Name: type_of_mechanism_chars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_of_mechanism_chars_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: basket_products basket_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT basket_products_pkey PRIMARY KEY (id);


--
-- Name: baskets baskets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.baskets
    ADD CONSTRAINT baskets_pkey PRIMARY KEY (id);


--
-- Name: brands_chars brands_chars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands_chars
    ADD CONSTRAINT brands_chars_pkey PRIMARY KEY (id);


--
-- Name: breaking_capacity_chars breaking_capacity_chars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.breaking_capacity_chars
    ADD CONSTRAINT breaking_capacity_chars_pkey PRIMARY KEY (id);


--
-- Name: characteristic_names characteristic_names_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characteristic_names
    ADD CONSTRAINT characteristic_names_pkey PRIMARY KEY (id);


--
-- Name: degree_protection_chars degree_protection_chars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.degree_protection_chars
    ADD CONSTRAINT degree_protection_chars_pkey PRIMARY KEY (id);


--
-- Name: display_chars display_chars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.display_chars
    ADD CONSTRAINT display_chars_pkey PRIMARY KEY (id);


--
-- Name: number_poles_chars number_poles_chars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.number_poles_chars
    ADD CONSTRAINT number_poles_chars_pkey PRIMARY KEY (id);


--
-- Name: order_products order_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: product_infos product_infos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_infos
    ADD CONSTRAINT product_infos_pkey PRIMARY KEY (id);


--
-- Name: products products_img_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_img_key UNIQUE (img);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: rated_current_chars rated_current_chars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rated_current_chars
    ADD CONSTRAINT rated_current_chars_pkey PRIMARY KEY (id);


--
-- Name: rated_voltage_chars rated_voltage_chars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rated_voltage_chars
    ADD CONSTRAINT rated_voltage_chars_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- Name: shutdown_cruve_chars shutdown_cruve_chars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shutdown_cruve_chars
    ADD CONSTRAINT shutdown_cruve_chars_pkey PRIMARY KEY (id);


--
-- Name: type_of_mechanism_chars type_of_mechanism_chars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_of_mechanism_chars
    ADD CONSTRAINT type_of_mechanism_chars_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_basket_products_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_basket_products_deleted_at ON public.basket_products USING btree (deleted_at);


--
-- Name: idx_baskets_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_baskets_deleted_at ON public.baskets USING btree (deleted_at);


--
-- Name: idx_brands_chars_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_brands_chars_deleted_at ON public.brands_chars USING btree (deleted_at);


--
-- Name: idx_breaking_capacity_chars_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_breaking_capacity_chars_deleted_at ON public.breaking_capacity_chars USING btree (deleted_at);


--
-- Name: idx_characteristic_names_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_characteristic_names_deleted_at ON public.characteristic_names USING btree (deleted_at);


--
-- Name: idx_degree_protection_chars_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_degree_protection_chars_deleted_at ON public.degree_protection_chars USING btree (deleted_at);


--
-- Name: idx_display_chars_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_display_chars_deleted_at ON public.display_chars USING btree (deleted_at);


--
-- Name: idx_number_poles_chars_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_number_poles_chars_deleted_at ON public.number_poles_chars USING btree (deleted_at);


--
-- Name: idx_order_products_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_products_deleted_at ON public.order_products USING btree (deleted_at);


--
-- Name: idx_orders_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_deleted_at ON public.orders USING btree (deleted_at);


--
-- Name: idx_product_infos_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_product_infos_deleted_at ON public.product_infos USING btree (deleted_at);


--
-- Name: idx_products_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_products_deleted_at ON public.products USING btree (deleted_at);


--
-- Name: idx_rated_current_chars_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rated_current_chars_deleted_at ON public.rated_current_chars USING btree (deleted_at);


--
-- Name: idx_rated_voltage_chars_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rated_voltage_chars_deleted_at ON public.rated_voltage_chars USING btree (deleted_at);


--
-- Name: idx_ratings_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ratings_deleted_at ON public.ratings USING btree (deleted_at);


--
-- Name: idx_shutdown_cruve_chars_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_shutdown_cruve_chars_deleted_at ON public.shutdown_cruve_chars USING btree (deleted_at);


--
-- Name: idx_type_of_mechanism_chars_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_type_of_mechanism_chars_deleted_at ON public.type_of_mechanism_chars USING btree (deleted_at);


--
-- Name: idx_users_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_deleted_at ON public.users USING btree (deleted_at);


--
-- Name: basket_products fk_baskets_basket_products; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT fk_baskets_basket_products FOREIGN KEY (basket_id) REFERENCES public.baskets(id);


--
-- Name: brands_chars fk_characteristic_names_brands_chars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands_chars
    ADD CONSTRAINT fk_characteristic_names_brands_chars FOREIGN KEY (characteristic_name_id) REFERENCES public.characteristic_names(id);


--
-- Name: breaking_capacity_chars fk_characteristic_names_breaking_capacity_chars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.breaking_capacity_chars
    ADD CONSTRAINT fk_characteristic_names_breaking_capacity_chars FOREIGN KEY (characteristic_name_id) REFERENCES public.characteristic_names(id);


--
-- Name: degree_protection_chars fk_characteristic_names_degree_protection_chars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.degree_protection_chars
    ADD CONSTRAINT fk_characteristic_names_degree_protection_chars FOREIGN KEY (characteristic_name_id) REFERENCES public.characteristic_names(id);


--
-- Name: display_chars fk_characteristic_names_display_chars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.display_chars
    ADD CONSTRAINT fk_characteristic_names_display_chars FOREIGN KEY (characteristic_name_id) REFERENCES public.characteristic_names(id);


--
-- Name: number_poles_chars fk_characteristic_names_number_poles_chars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.number_poles_chars
    ADD CONSTRAINT fk_characteristic_names_number_poles_chars FOREIGN KEY (characteristic_name_id) REFERENCES public.characteristic_names(id);


--
-- Name: rated_current_chars fk_characteristic_names_rated_current_chars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rated_current_chars
    ADD CONSTRAINT fk_characteristic_names_rated_current_chars FOREIGN KEY (characteristic_name_id) REFERENCES public.characteristic_names(id);


--
-- Name: rated_voltage_chars fk_characteristic_names_rated_voltage_chars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rated_voltage_chars
    ADD CONSTRAINT fk_characteristic_names_rated_voltage_chars FOREIGN KEY (characteristic_name_id) REFERENCES public.characteristic_names(id);


--
-- Name: shutdown_cruve_chars fk_characteristic_names_shutdown_cruve_chars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shutdown_cruve_chars
    ADD CONSTRAINT fk_characteristic_names_shutdown_cruve_chars FOREIGN KEY (characteristic_name_id) REFERENCES public.characteristic_names(id);


--
-- Name: type_of_mechanism_chars fk_characteristic_names_type_of_mechanism_chars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_of_mechanism_chars
    ADD CONSTRAINT fk_characteristic_names_type_of_mechanism_chars FOREIGN KEY (characteristic_name_id) REFERENCES public.characteristic_names(id);


--
-- Name: order_products fk_orders_order_products; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT fk_orders_order_products FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: basket_products fk_products_basket_products; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT fk_products_basket_products FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: products fk_products_brands_char; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_brands_char FOREIGN KEY (brands_char_id) REFERENCES public.brands_chars(id);


--
-- Name: products fk_products_breaking_capacity_char; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_breaking_capacity_char FOREIGN KEY (breaking_capacity_char_id) REFERENCES public.breaking_capacity_chars(id);


--
-- Name: products fk_products_degree_protection_char; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_degree_protection_char FOREIGN KEY (degree_protection_char_id) REFERENCES public.degree_protection_chars(id);


--
-- Name: products fk_products_display_char; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_display_char FOREIGN KEY (display_char_id) REFERENCES public.display_chars(id);


--
-- Name: products fk_products_number_poles_char; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_number_poles_char FOREIGN KEY (number_poles_char_id) REFERENCES public.number_poles_chars(id);


--
-- Name: order_products fk_products_order_products; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT fk_products_order_products FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: product_infos fk_products_product_infos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_infos
    ADD CONSTRAINT fk_products_product_infos FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: products fk_products_rated_current_char; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_rated_current_char FOREIGN KEY (rated_current_char_id) REFERENCES public.rated_current_chars(id);


--
-- Name: products fk_products_rated_voltage_char; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_rated_voltage_char FOREIGN KEY (rated_voltage_char_id) REFERENCES public.rated_voltage_chars(id);


--
-- Name: ratings fk_products_ratings; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT fk_products_ratings FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: products fk_products_shutdown_cruve_char; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_shutdown_cruve_char FOREIGN KEY (shutdown_cruve_char_id) REFERENCES public.shutdown_cruve_chars(id);


--
-- Name: products fk_products_type_of_mechanism_char; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_type_of_mechanism_char FOREIGN KEY (type_of_mechanism_char_id) REFERENCES public.type_of_mechanism_chars(id);


--
-- Name: baskets fk_users_basket; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.baskets
    ADD CONSTRAINT fk_users_basket FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: orders fk_users_orders; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_users_orders FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: ratings fk_users_ratings; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT fk_users_ratings FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

