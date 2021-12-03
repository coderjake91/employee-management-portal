drop table if exists department;
drop table if exists role;
drop table if exists employee;


create table department (
    id integer auto_increment primary key,
    name varchar(30) not null
);

create table role (
    id integer auto_increment primary key,
    title varchar(30) not null,
    salary decimal not null,
    department_id integer,
    constraint fk_department foreign key (department_id) references department(id) on delete set null
);

create table employee (
    id integer auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30)  not null,
    manager_id integer,
    constraint fk_manager foreign key (manager_id) references employee(id) on delete set null,
    role_id integer,
    constraint fk_role foreign key (role_id) references role(id) on delete set null
);
