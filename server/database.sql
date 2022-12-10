CREATE DATABASE enrollis;
create table users(
    user_type char(1) NOT NULL, 
    user_id serial not null,
    user_fname varchar(20), 
    user_lname varchar(20), 
    user_email varchar UNIQUE, 
    user_phone varchar(15), 
    CONSTRAINT pk_user PRIMARY KEY(user_type, user_id), 
    constraint check_type CHECK (user_type in ('S', 'T' , 'A'))
    );

create table student ( 
    user_type char(1) DEFAULT 'S', 
    user_id serial not null, 
    stu_level varchar,
    primary key (user_type, user_id)
    )inherits (users);

create table tutor ( 
    user_type char(1) DEFAULT 'T', 
    user_id serial not null, 
    tutor_worked_hrs int,
    primary key (user_type, user_id)
    ) inherits (users);

create table package (
    pack_id serial, 
    pack_type varchar(20), 
    test_title varchar(10), 
    pack_price decimal(6,2), 
    pack_n_session int, 
    pack_sdate date, 
    pack_edate date, 
    pack_days varchar(7), 
    pack_stime text, 
    pack_etime text, 
    primary key(pack_id), 
    constraint check_time check (pack_edate>pack_sdate)
    );

create table enroll(
    user_type char(1) default 'S', 
    user_id serial, 
    pack_id serial, 
    enroll_date date, 
    primary key(user_type, user_id, pack_id), 
    foreign key (pack_id) references package (pack_id), 
    foreign key (user_type, user_id) references users(user_type, user_id)
    );

create table session (
    sess_id serial, 
    pack_id serial, 
    sess_title text, 
    sess_description text, 
    sess_date date, 
    sess_link text, 
    duration int, 
    user_id serial,
    user_type char(1) default 'T',
    primary key(sess_id, pack_id), 
    foreign key(pack_id) references package(pack_id), 
    foreign key (user_id, user_type) references tutor(user_id, user_type)
    );

create table handout (
    doc_id serial primary key, 
    doc_title text, 
    doc_link text, 
    sess_id serial, 
    pack_id serial, 
    foreign key(sess_id, pack_id) references session(sess_id, pack_id)
    );