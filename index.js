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

const Interface = require('./lib/Interface');
