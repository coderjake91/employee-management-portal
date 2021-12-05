//import db query methods
const Interface = require('./Interface');
const inquirer = require('inquirer');
inquirer.registerPrompt('search-list', require('inquirer-search-list'));
const artwork = require('ascii-art');

const queryInterface = new Interface();

class CommandLinePrompts {
    constructor() {

    }

    optionMenu() {

        console.log(`
        =======================================
                      Main Menu
        =======================================
        `);
                inquirer.prompt({
                    type: 'list',
                    name: 'option',
                    message: "Main Menu: Please select from the following options...",
                    choices: ["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Exit"]
                })
                .then(({ option }) => {
                    switch(option) {
                        case "View all Departments":
                            this.viewDepartments();
                            break;
                        case "View all Roles":
                            this.viewRoles();
                            break;
                        case "View all Employees":
                            this.viewEmployees();
                            break;
                        case "Add a Department":
                            this.addDepartmentMenu();
                            break;
                        case "Add a Role":
                            this.addRoleMenu();
                            break;
                        case "Add an Employee":
                            this.addEmployeeMenu();
                            break;
                        case "Update an Employee Role":
                            this.updateEmployeeRoleMenu();
                            break;
                        default:
                            console.log(`
                            ============================================================
                             Exiting Application...Thank you for using Employee Portal!
                            ============================================================
                                        `);
                            process.exit(1);
                    }
                });
    }

    viewDepartments(){
        queryInterface.allDepartments()
        .then(() => {
            inquirer.prompt({
                type: 'confirm',
                name: 'userChoice',
                message: "Return to Main Menu?"
            })
            .then(({ userChoice })=> {
                if(userChoice){
                    this.optionMenu();
                } else {
                    this.viewDepartments();
                }
            });
        });
    }

    viewRoles() {
        queryInterface.allRoles()
        .then(() => {
            inquirer.prompt({
                type: 'confirm',
                name: 'userChoice',
                message: "Return to Main Menu?"
            })
            .then(({ userChoice })=> {
                if(userChoice){
                    this.optionMenu();
                } else {
                    this.viewDepartments();
                }
            });
        });
    }

    viewEmployees() {
        queryInterface.allEmployees()
        .then(() => {
            inquirer.prompt({
                type: 'confirm',
                name: 'userChoice',
                message: "Return to Main Menu?"
            })
            .then(({ userChoice })=> {
                if(userChoice){
                    this.optionMenu();
                } else {
                    this.viewDepartments();
                }
            });
        });
    }

    addDepartmentMenu() {
        inquirer.prompt(
            {
                type: 'input',
                name: 'department',
                message: "Please enter the name of the Department you would like to add to the database...",
                validate: department => {
                        if(!department) {
                            console.log("Please enter your Department name!");
                            return false;
                        } else {
                            return true;
                        }
                }
            }
        )
        .then(({ department })=> {
            queryInterface.addDepartment(department)
                .then(() => {
                    inquirer.prompt({
                        type: 'confirm',
                        name: 'userChoice',
                        message: "Would you like to add another Department?"
                    })
                    .then(({ userChoice })=> {
                        if(userChoice){
                            this.addDepartmentMenu();
                        } else {
                            this.optionMenu();
                        }
                    });
                })
        });
    }

    addRoleMenu() {
        queryInterface.allDepartments()
            .then(RowDataPacket => {
                //valid RowDataPacket conversion solution #1
                //let packetObj = Object.assign({}, RowDataPacket);
                //valid RowDataPacket conversion solution #2
                const packetArr = Array.from(RowDataPacket);
                //console.log(packetObj);
                console.log(packetArr);

                const departmentNamesArr = packetArr.map(packet => {
                    return packet.name;
                });

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role',
                        message: "Please enter the name of the Role you would like to add to the database...",
                        validate: role => {
                                if(!role) {
                                    console.log("Please enter your Role name!");
                                    return false;
                                } else {
                                    return true;
                                }
                        }
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: "Please enter the salary for the Role you would like to add to the database...",
                        validate: salary => {
                                let salaryInt = Number.parseInt(salary);
        
                                console.log(salaryInt);
        
                                if(!salaryInt || salaryInt === NaN) {
                                    console.log("Please enter a salary value!");
                                    return false;
                                } else if(!Number.isSafeInteger(salaryInt) || salaryInt < 0) {
                                    console.log("Please enter a valid salary value!");
                                    return false;
                                } else {
                                    return true;
                                }
                        }
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: "Please select a Department for the Role you would like to add to the database...",
                        choices: departmentNamesArr
                    }
                    ])
                    .then((answers)=> {
                        console.log(answers);
                        answers.salary = Number.parseFloat(answers.salary).toFixed(2);
                        console.log(answers);
                        const updatedRole = {
                            title: answers.role,
                            salary: Number.parseFloat(answers.salary).toFixed(2),
                        }

                        //find the chosen department's id
                        let packetFound = packetArr.filter(packet => {
                                            if(answers.department === packet.name) {
                                                return packet.id;
                                            }
                                          });
                        
                        //package up the data to send to the db
                        updatedRole.department_id = packetFound[0].id.toString();

                        console.log(updatedRole);

                        queryInterface.addRole(updatedRole)
                            .then(() => {
                                inquirer.prompt({
                                    type: 'confirm',
                                    name: 'userChoice',
                                    message: "Would you like to add another Role?"
                                })
                                .then(({ userChoice })=> {
                                    if(userChoice){
                                        this.addRoleMenu();
                                    } else {
                                        this.optionMenu();
                                    }
                                });
                            });
                    });
            });
    }

    addEmployeeMenu() {
        queryInterface.allEmployees()
            .then(RowDataPacketEmployees => {
                    //valid RowDataPacket conversion solution #2
                    const employeePacketArr = Array.from(RowDataPacketEmployees);

                    const managerNamesArr = employeePacketArr.filter(packet => {
                                                if(packet.Manager === 'manager'){
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            }).map(manager => {
                                                return manager.Employee;
                                            });
                    console.log(managerNamesArr);

                    queryInterface.allRoles()
                        .then(RowDataPacketRoles => {
                            //valid RowDataPacket conversion solution #2
                            const rolesPacketArr = Array.from(RowDataPacketRoles);

                            const rolesArr = rolesPacketArr.map(role => {
                                                        return role.title;
                                                    });
                            console.log(rolesArr);

                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'first_name',
                                    message: "Please enter the first name of the Employee you would like to add to the database...",
                                    validate: role => {
                                            if(!role) {
                                                console.log("Please enter your Employee's first name!");
                                                return false;
                                            } else {
                                                return true;
                                            }
                                    }
                                },
                                {
                                    type: 'input',
                                    name: 'last_name',
                                    message: "Please enter the last name of the Employee you would like to add to the database...",
                                    validate: role => {
                                            if(!role) {
                                                console.log("Please enter your Employee's last name!");
                                                return false;
                                            } else {
                                                return true;
                                            }
                                    }
                                },
                                {
                                    type: 'list',
                                    name: 'role',
                                    message: "Please select the new Employee's role from the list of current roles...",
                                    choices: rolesArr
                                },
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: "Please select a the Employee's manager (Last Name, First Name) from the list of current managers (if Employee has no manager select 'no manager')...",
                                    choices: [ ...managerNamesArr, 'no manager']
                                },

                                ])
                                .then((answers)=> {

                                    console.log(answers);

                                    const newEmployee = {
                                        first_name: answers.first_name,
                                        last_name: answers.last_name,
                                        manager_id: '',
                                        role_id: ''
                                    }

                                    if(answers.manager === 'no manager'){
                                        //if no manager, set manager to null for storage in the db
                                        newEmployee.manager_id = null;

                                    } else {
                                        //find the chosen department's id
                                        let manager = employeePacketArr.filter(packet => {
                                                        if(answers.manager === packet.Employee) {
                                                            return packet.id;
                                                        }
                                                    });

                                        let role = rolesPacketArr.filter(packet => {
                                                        if(answers.role === packet.title) {
                                                            return packet.id;
                                                        }
                                                    });
                                        //package up the data to send to the db
                                        newEmployee.manager_id = manager[0].id.toString();
                                        newEmployee.role_id = role[0].id.toString();
                                    }

                                    console.log(newEmployee);

                                    queryInterface.addEmployee(newEmployee)
                                        .then(() => {
                                            inquirer.prompt({
                                                type: 'confirm',
                                                name: 'userChoice',
                                                message: "Would you like to add another Employee?"
                                            })
                                            .then(({ userChoice })=> {
                                                if(userChoice){
                                                    this.addEmployeeMenu();
                                                } else {
                                                    this.optionMenu();
                                                }
                                            });
                                        });
                                });
                        });
            });
    }

    updateEmployeeRoleMenu() {
        queryInterface.allEmployees()
            .then(RowDataPacketEmployees => {
                    //valid RowDataPacket conversion solution #2
                    const employeePacketArr = Array.from(RowDataPacketEmployees);

                    const employeeNamesArr = employeePacketArr.map(employee => {
                                                    return employee.Employee;
                                                });

                    console.log(employeeNamesArr);

                    queryInterface.allRoles()
                        .then(RowDataPacketRoles => {
                            //valid RowDataPacket conversion solution #2
                            const rolesPacketArr = Array.from(RowDataPacketRoles);

                            const rolesArr = rolesPacketArr.map(role => {
                                                    return role.title;
                                                });
                            console.log(rolesArr);

                            inquirer.prompt([
                                {
                                    type: 'search-list',
                                    name: 'employee_name',
                                    message: "(Optional: Start Typing to Search Employee!) Please select an Employee (Last Name, First Name) from the list of current Employees who's role you would like to update...",
                                    choices: employeeNamesArr
                                },
                                {
                                    type: 'list',
                                    name: 'role',
                                    message: "Please select a the Employee's manager (Last Name, First Name) from the list of current managers (if Employee has no manager select 'no manager')...",
                                    choices: rolesArr
                                },

                                ])
                                .then((answers) => {
                                    console.log(answers);

                                    const updatedEmployee = {
                                        id: '',
                                        role_id: ''
                                    }

                                    //find the chosen department's id
                                    let employee = employeePacketArr.filter(packet => {
                                                        if(answers.employee_name === packet.Employee) {
                                                            return packet.id;
                                                        }
                                                    });
                                    let role = rolesPacketArr.filter(packet => {
                                                        if(answers.role === packet.title) {
                                                            return packet.id;
                                                        }
                                                    });

                                    //package up the data to send to the db
                                    updatedEmployee.id = employee[0].id.toString();
                                    updatedEmployee.role_id = role[0].id.toString();

                                    console.log(updatedEmployee);

                                    queryInterface.updateRole(updatedEmployee)
                                    .then(() => {
                                        inquirer.prompt({
                                            type: 'confirm',
                                            name: 'userChoice',
                                            message: "Would you like to update another Employee's Role?"
                                        })
                                        .then(({ userChoice })=> {
                                            if(userChoice){
                                                this.updateEmployeeRoleMenu();
                                            } else {
                                                this.optionMenu();
                                            }
                                        });
                                    });
                                    
                                })
                        });
                
            });
    }
}

module.exports = CommandLinePrompts;

