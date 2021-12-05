//constructor class that contains query logic for interfacing with the database
/*
Psuedocode for dbInterface Constructor Class

(x7 db-query methods + 1 utility method):
-> allDepartments
    on call: presented with a formatted table showing department names and department ids

-> allRoles
    on call: presented with the job title, role id, the department that role belongs to, and the salary for that role

-> allEmployees
    on call: present employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

-> addDepartment
    on call: name of department is added to the database

-> addRole
    on call: name, salary, and department for the role and that role is added to the database

-> addEmployee
    on call: the employee’s first name, last name, role, and manager and that employee is added to the database
-> updateRole
    on call: select employee and new role information is updated in the database
-> inputCheck
    on call: validate query imput where necessary

*/
const db = require('../db/connection');
const mysql = require('mysql2');
const cTable = require('console.table');

class Interface {
    constructor() {
        //used by printTable method
        this.printValues = [
            //example according to console.table README
            //['name', 'age'],
            //['max', 20],
            //['joe', 30]
        ];
    }
    async allDepartments() {

        console.log(`
        =======================================
                   All Departments
        =======================================
        `);

        const sql = `select department.id, name from department`;

        db.promise().query(sql)
            .then( ([rows]) => {
            console.log(rows);
            this.printValues = rows;
            this.printTable();
        });
    }

    async allRoles() {

        console.log(`
        =======================================
                      All Roles
        =======================================
        `);

        const sql = `select role.id, title, department.name as department_name, salary
                    from role
                    left join department
                    on role.department_id = department.id`;

        db.promise().query(sql)
            .then( ([rows]) => {
            console.log(rows);
            this.printValues = rows;
            this.printTable();
        });
    }

    async allEmployees() {

        console.log(`
        =======================================
                    All Employees
        =======================================
        `);

        const sql = `select e.id, 
                    ifnull(concat(m.last_name, ',', m.first_name), 'manager') as 'Manager',
                    concat(e.last_name, ',', e.first_name) as 'Employee',
                    role.title as Title, role.salary as Salary, 
                    department.name as Department 
                    from employee e 
                    left join employee m on m.id = e.manager_id 
                    left join role on e.role_id = role.id 
                    left join department on role.department_id = department.id;`;

        db.promise().query(sql)
            .then( ([rows]) => {
            console.log(rows);
            this.printValues = rows;
            this.printTable();
        });
    }

    async addDepartment(departmentName) {

        console.log(`
        =======================================
                    Add Department
        =======================================
        `);

        const sql = `insert into department (name) values (?)`;
        const params = departmentName;

        db.promise().query(sql, params)
            .then( ([rows]) => {
            console.log(rows);
            this.printValues = rows;
            this.printTable();
        });
    }
    async addRole({ title, salary, department_id }) {

        console.log(`
        =======================================
                    Add Role
        =======================================
        `);

        //expect title, salary, and department id

        const sql = `insert into role (title, salary, department_id) values (?, ?, ?)`;
        const params = [title, salary, department_id];

        db.promise().query(sql, params)
            .then( ([rows]) => {
            console.log(rows);
            this.printValues = rows;
            this.printTable();
        });
    }
    async addEmployee({ first_name, last_name, role_id, manager_id }) {

        console.log(`
        =======================================
                    Add Employee
        =======================================
        `);

        //expect first_name, last_name, manager_id, role_id

        const sql = `insert into employee (first_name, last_name, role_id, manager_id ) values (?, ?, ?, ?)`;
        const params = [first_name, last_name, role_id, manager_id];

        db.promise().query(sql, params)
            .then( ([rows]) => {
            console.log(rows);
            this.printValues = rows;
            this.printTable();
        });
    }
    async updateRole({ id, role_id }) {

        console.log(`
        =======================================
                    Update Role
        =======================================
        `);

        //expect employee.id, and role_id

        const sql = `update employee
                    set role_id = ?
                    where id = ?`
        const params = [role_id, id];
        let formatSQL = mysql.format(sql, params);


        db.promise().query(formatSQL)
            .then( ([rows]) => {
            console.log(rows);
            this.printValues = rows;
            this.printTable();
        });
    }
    printTable() {
        console.table(this.printValues);
    }
    inputCheck(obj, ...props) {
        const errors = [];
  
        props.forEach((prop) => {
        // if property is blank or doesn't exist, add to errors array
        if (obj[prop] === undefined || obj[prop] === '') {
            errors.push(`No ${prop} specified.`);
        }
        });
  
        if (errors.length) {
            return {
                error: errors.join(' ')
            };
        }
    
        return null;
    };
}

module.exports = Interface;