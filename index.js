//(Interface Testing)=====================================

//const Interface = require('./lib/Interface');
//const interface = new Interface();

//Employee portal test data
//
// const roleObj = {
//     title: 'Paralegal',
//     salary: '40000.00',
//     department_id: '2'
// }

// const employeeObj = {
//     first_name: 'Jake',
//     last_name: 'Frazer',
//     role_id: '4',
//     manager_id: '2'
// }

// const updateRoleObj = {
//     id: '6',
//     role_id: '7'
// }

//interface.printMenuHeading('Employee Portal');
//interface.allDepartments();
//interface.allRoles();
//interface.allEmployees();
//interface.addDepartment('Research');
// interface.addRole(roleObj);
//interface.addEmployee(employeeObj);
//interface.updateRole(updateRoleObj);

//(Interface Testing)=====================================

const CommandLinePrompts = require('./lib/CLI');
const artwork = require('ascii-art');

const employeePortal = new CommandLinePrompts;


artwork.font("Employee Portal", 'doom')
    .then((heading) => {
        console.log(heading);
        employeePortal.optionMenu();
     });