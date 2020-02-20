CREATE TABLE public.users (
	id serial NOT NULL,
	first_name varchar(50) NULL,
	last_name varchar(100) NULL,
	email varchar(100) null,
	age int null
);

--for testing purposes
insert into users (first_name, last_name, email, age) values
('Penny', 'Lee', 'asdf@asdf.com', 24),
('Jake ', 'from SateFarm', 'car@insurance.com', 38);
