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
class Interface {
    constructor() {

    }

}
allDepartments() {

}
allRoles() {

}
allEmployees() {

}
addDepartment() {

}
addRole() {

}
addEmployee() {

}
updateRole() {

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

  module.exports = Interface;