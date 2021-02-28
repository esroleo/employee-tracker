// npm library mysql2 - allows node.js to interact with mysql
// Extra note - MySql server version is Ver 8.0.23 Win64
const mysql = require('mysql2');

// import inquirer libraries
const inquirer = require('inquirer');

// Import employee class
const Sql = require('./lib/Sql');

// Import Insert class
const Insert = require('./lib/Insert');

// Import Update class
const Update = require('./lib/Update');



const message = `******************************** EMPLOYEE TRACKER APP ********************************\n`
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cantimploras87=',
  database: 'employeeTracker_db'
});

connection.connect(function(err) {
    if (err) throw err;
    // initiqlize application and call our first prototype function 
    console.clear();
    console.log(message);
    new RunApplication().getInquirerOptions();
  });


class RunApplication {
  constructor () {
      // *** N/A for this app. Could be used for the future. *** //
    }

    getInquirerOptions() {

          // Clear console.log
          //console.clear()
          //console.log(message)
          return inquirer
          .prompt([
            {
              type: 'list',
              name: 'queryType',
              message: "What would you like to do?",
              choices: ['View All Departments','View All Roles', 'View All employees', 'Add a Department', 'Add a Role', 'Add An Employee', 'Update Employee Role', 'View All Employees By Department', 'View All Employees by Manager']
            }
          ])
          // if answer is true go to next step
          .then(answers => {
            // Create a new instance of our Sql Class to run our Select statements
            const resultSet = new Sql(answers)
           
            switch(resultSet.queryType) {
              case "View All Departments":
                // Make the console clean and cleared before new ouput.
                // This will allow the output to always be top aligned.
                console.clear() 
                console.log(message)
                async function viewAllDepartments() {
                  return resultSet.getViewAllDepartments();
                }
                viewAllDepartments().then(output => {
                
                  // Restart Application
                  this.getInquirerOptions();
                });  
                break;

              case "View All Roles":
                console.clear() 
                console.log(message)
                async function viewAllRoles() {
                  return resultSet.getViewAllRoles();
                }
                viewAllRoles().then(output => {
                // Restart Application
                this.getInquirerOptions();
                });  
                break;

              case "View All employees":
                console.clear() 
                console.log(message)
                async function viewAllEmployees() {
                  return resultSet.getViewAllEmployees();
                }
                viewAllEmployees().then(output => {
                  // Restart Application
                  this.getInquirerOptions();
                }); // 1               
                break;

              case "Add a Department":
                // Run addDepartment prototype function to deal with insert inquirer questions for add department
                console.clear() 
                console.log(message)
                this.addDepartment();
                break;

              case "Add a Role":
                this.addRole()
                break;

              case "Add An Employee":
                this.addEmployee()
                break;

              case "Update Employee Role":
                this.updateEmployeRole();
                break;

                 
              case "View All Employees By Department":
                resultSet.getViewAllEmployeesByDeparment()
                break;

              case "View All Employees by Manager":
                resultSet.getViewAllEmployeesByManager()
                break;

              case "Add Employee":
                resultSet.getViewAllEmployeesByManager()
                break;

              default:
                //
            }
          });
          
    }


    addDepartment() {

     return inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: "What is the department name?",
          validate: departmentName => {
              if (departmentName) {
                return true;
              } else {
                console.log("Please enter the department's name");
                return false;
              }
            }
      }
      ])
      .then(answers => {
        
        const resultSet = new Insert(answers )
        async function runInsert() {
          return resultSet.getInsertDepartment();
        }
        runInsert().then(output => {
          this.getInquirerOptions();
        });        
      });

    }


    addRole() {

      // Create a new instance of our Sql Class to run our Select statements
      // Pass View All Departments Joined with Roles 
      const queryName = "View All Departments"
      const resultSet = new Sql(queryName)
      async function viewAllDepartments() {
        return resultSet.getViewAllDepartmentsNames();
      }

      viewAllDepartments().then(output => {

      inquirer
      .prompt([
        {
          type: 'input',
          name: 'roleTitle',
          message: "What is the role title?",
          validate: employeeName => {
              if (employeeName) {
                return true;
              } else {
                console.log("Please enter the role's title");
                return false;
              }
            }
      },
      {
        type: 'input',
        name: 'salary',
        message: "What is the role's salary?",
        validate: employeeName => {
            if (employeeName) {
              return true;
            } else {
              console.log("Please enter role's salary");
              return false;
            }
          }
      },
      {
        type: 'list',
        name: 'roleDepartment',
        message: "To what department this role should be assigned to ?",
        choices: output
      },
      ])
      // if answer is true go to next step
      .then(answers => {
        // I need to get the deparment ID based on the role selected
        // from roleDepartment anwer
        // get deparemnt id only and then pass it to the insert.
       const resultDepIdByName = new Sql(answers)
       let resultDepIdByNameOutput = ""
        // Query for unqiue id based on the roleDepartment selection 
        async function selectQuery() {
          return resultDepIdByName.getViewAllDepartmentsIdByName();
        }
        selectQuery().then(output => {
          // Create a varialbe to hold the output from our getViewAllDepartmentsIdByName query.
          let outputTest = []
          outputTest = output;
          // filter array of objects if availalbe into id and then map it to a variable to be sent to the insert (id) 
          outputTest.filter(({ id }) => id)
          .map(({ id }) => {
            //console.log(id)
            outputTest = id

          });

          const InsertRecord = new Insert(answers, output)
          async function selectQuery() {
            return InsertRecord.getInsertRole();;
          }
          selectQuery().then(output => {
            console.clear();
            console.log(message);
            console.log("Record Inserted\n");
            this.getInquirerOptions();
          });
        });    
      });
    }); 
  };

    addEmployee() {

      const queryName = "View All Departments"
      const resultSet = new Sql(queryName)
      //resultSet.getTestQuery();

      async function mutipleQuery() {
        return resultSet.getMultipleQuery();
      }

      mutipleQuery().then(output => {

        // Assign variables to hold the array of object from our multiple query statement.
        let employeeRoleObject = output[0]
        let employeeManagerObject = output[1]
        // Add a No Manager at end of list of managers.
        // When attempted to insert after answers a 'No Manager' it will return undefined = null at DB.
        output[1].push({name: 'No Manager'});
        
        
      inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "What is the employee's first name?",
          validate: firstName => {
              if (firstName) {
                return true;
              } else {
                console.log("Please enter employee first name");
                return false;
              }
            }
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        validate: lastName => {
            if (lastName) {
              return true;
            } else {
              console.log("Please enter employee's last name");
              return false;
            }
          }
      },
      {
        type: 'list',
        name: 'employeeRole',
        message: "To what department this role should be assigned to ?",
        choices: employeeRoleObject
      },
    {
      type: 'list',
      name: 'employeeManager',
      message: "To what manager would you like the user to be added to?",
      choices: employeeManagerObject
    }
      ])
      // if answer is true go to next step
      .then(answers => {
    
        const InsertRecord = new Insert(answers)
        async function insertQuery() {
          return InsertRecord.getInsertEmployee();
        }
        insertQuery().then(output => {
         // console.clear();
          console.log(message);
          console.log("Record Inserted\n");
          this.getInquirerOptions();
        });
      });
    });
  };

  updateEmployeRole() {
    
    const queryName = "View All Departments"
    const resultSet = new Sql(queryName)
    async function multipleQuery() {
      return resultSet.getMultipleQuery();
    }
    multipleQuery().then(output => {
      // Assign variables to hold the array of object from our multiple query statement.
      let employeeList = output[2]
      let roleList = output[3]


      inquirer
      .prompt([
        {
          type: 'list',
          name: 'employeName',
          message: "Please choose an employee to update their role",
          choices: employeeList
        },
        {
          type: 'list',
          name: 'newRole',
          message: "Please enter a new role?",
          choices: roleList
        }
      ])
      .then(answers => {

        const InsertRecord = new Update(answers)
        async function updateQuery() {
          return InsertRecord.getUpdateEmployee();
        }
        updateQuery().then(output => {
          console.clear();
          console.log(message);
          console.log(output + '\n');
          //console.log("Record Updated\n");
          this.getInquirerOptions();
        })
      })
    })
  }
}
