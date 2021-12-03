drop table if exists department;
drop table if exists postion;
drop table if exists employee


create table department (
    id integer auto_increment primary key,
    name varchar(30) not null
);

create table position (
    id integer auto_increment primary key,
    title varchar(30) not null,
    salary decimal not null,
    constraint fk_department foreign key (department_id) references departments(id) on delete set null
);

create table employee (
    id integer auto_increment primary key,
    first_name varchar(30) not null
    last_name varchar(30)  not null
    constraint fk_position foreign key (position_id) references positions(id) on delete set null
    constraint fk_employee foreign key (employee_id) references employees(id) on delete set null
);
