CREATE DATABASE enrollis;
-- Tables Section
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

create table admin ( 
    user_type char(1) DEFAULT 'A', 
    user_id serial not null, 
    access_degree varchar,
    primary key (user_type, user_id)
    constraint check_degree CHECK (access_degree in ('H', 'L'))
    )inherits (users);

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
    user_id serial,
    user_type char(1) default 'T',
    primary key(pack_id), 
    foreign key (user_id, user_type) references tutor(user_id, user_type) on update cascade on delete cascade
    constraint check_time check (pack_edate>pack_sdate)
    );

create table enroll(
    user_type char(1) default 'S', 
    user_id serial, 
    pack_id serial, 
    enroll_date date, 
    primary key(user_type, user_id, pack_id), 
    foreign key (pack_id) references package (pack_id) on update cascade on delete cascade, 
    foreign key (user_type, user_id) references users(user_type, user_id) on update cascade on delete cascade
    );

create table session (
    sess_id serial, 
    pack_id serial, 
    sess_title text, 
    sess_description text, 
    sess_date date, 
    sess_link text, 
    duration int,     
    primary key (sess_id),
    foreign key(pack_id) references package(pack_id) on update cascade on delete cascade,  
    );

create table handout (
    doc_id serial primary key, 
    doc_title text, 
    doc_link text, 
    sess_id serial, 
    foreign key(sess_id) references session(sess_id) on update cascade on delete cascade
    );
-- End of Tables Section-------------------------

-- Triggers Section
    create function updateHrs() returns trigger 
    language plpgsql
    AS $$ 
    BEGIN
    update Tutor set tutor_worked_hrs = tutor_worked_hrs + NEW.duration 
    where user_id = (SELECT user_id from package where pack_id = new.pack_id);
    RETURN NEW;
    END;
    $$;
    create trigger trHrs after insert on session
    for each row execute function updateHrs();
    --****--
    create function updateEnrollNum() returns trigger.
    language plpgsql
    AS $$ 
    BEGIN
    update package set student_enrolled = student_enrolled + 1
    where pack_id = NEW.pack_id;
    RETURN NEW;
    END;
    $$;
    create trigger trEnroll after insert on enroll
    for each row execute function updateEnrollNum();
-- End of Triggers Section-------------------------
-- Views Section
    create view studentCount 
    select count(*) from student;

    create view tutorCount 
    select count(*) from tutor;

    create view packageCount 
    select count(*) from package;

    create view sessionCount 
    select count(*) from session;



