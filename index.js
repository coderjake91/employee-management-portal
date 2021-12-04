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
const roleObj = {
    title: 'Machine Learning Engineer',
    salary: '175000.00',
    department_id: '3'
}

const Interface = require('./lib/Interface');

const interface = new Interface();

interface.printMenuHeading('Employee Portal');
// console.log('----------------------------')
// interface.allDepartments();
// console.log('----------------------------')
//interface.allRoles();
// console.log('----------------------------')
interface.allEmployees();
// console.log('----------------------------')
// interface.addDepartment('Research');
// console.log('----------------------------')
// interface.addRole(roleObj);