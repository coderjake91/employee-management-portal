/*
Psuedocode for CLI interface (using inquirer)

On app start,

instantiate Interface

Present inquirer options menu 
(
->view all departments 
    on select: (interface.allDepartments)
->view all roles 
    on select: (interface.allRoles)
->view all employees (interface.allEmployees)
->add a department (interface.addDepartment)
->add a role (interface)
->add an employeee
->update an employee role
)
*/
//test data
const roleObj = {
    title: 'Paralegal',
    salary: '40000.00',
    department_id: '2'
}

const employeeObj = {
    first_name: 'Jake',
    last_name: 'Frazer',
    role_id: '4',
    manager_id: '2'
}

const updateRoleObj = {
    id: '6',
    role_id: '7'
}

const Interface = require('./lib/Interface');

const interface = new Interface();

interface.printMenuHeading('Employee Portal');
// console.log('----------------------------')
//interface.allDepartments();
// console.log('----------------------------')
//interface.allRoles();
// console.log('----------------------------')
//interface.allEmployees();
// console.log('----------------------------')
//interface.addDepartment('Research');
// console.log('----------------------------')
// interface.addRole(roleObj);
// console.log('----------------------------')
//interface.addEmployee(employeeObj);
// console.log('----------------------------')
//interface.updateRole(updateRoleObj);