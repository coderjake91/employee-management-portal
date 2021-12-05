//import db query methods
const Interface = require('./Interface');
const inquirer = require('inquirer');
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
                            ===========================================================
                             Exiting Application! Thank you for using Employee Portal!
                            ===========================================================
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
                message: "Return to Main Menu?",
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
                message: "Return to Main Menu?",
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
                message: "Return to Main Menu?",
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
        
    }

    addRoleMenu() {
    
    }

    addEmployeeMenu() {

    }

    updateEmployeeRoleMenu() {

    }
}

module.exports = CommandLinePrompts;

