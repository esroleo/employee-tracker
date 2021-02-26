// npm library mysql2 - allows node.js to interact with mysql
// Extra note - MySql server version is Ver 8.0.23 Win64
const mysql = require('mysql2');

// import inquirer libraries
const inquirer = require('inquirer');

// npm library console.table to display tabulated format at console log
const cTable = require('console.table');

// Import employee class
const Sql = require('./lib/Sql');

// Import employee class
const Insert = require('./lib/Insert');


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
    console.log("Connected!");
    // initiqlize application and call our first prototype function 
    new RunApplication().getInquirerOptions();
  });


class RunApplication {
  constructor () {
      // *** Hold object arrays *** //
      this.manager = [];
      this.engineer = [];
      this.intern = []
      // *** Used for conditional chesk **//
      //this.resultSet = "";
    }

    getInquirerOptions() {

          return inquirer
          .prompt([
            {
              type: 'list',
              name: 'queryType',
              message: "What would you like to do?",
              choices: ['View All Departments','View All Roles', 'View All employees', 'Add a Department', 'Add a Role', 'Add An Employee', 'Update Employee Role', 'View All Employees By Department', 'View All Employees by Manager', 'Add Employee']
            }
          ])
          // if answer is true go to next step
          .then(answers => {
            //console.log(answers);
            
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
                //resultSet.getAddRole()
                console.clear() 
                console.log(message)
                this.addDepartment();
                
                break;
                // async function addInsertDepartment() {
                //   return this.addDepartment();
                // }
                // addInsertDepartment().then(output => {
                
                //   // Restart Application
                //   this.getInquirerOptions();
                // }); // 1               
                break;

              case "Add a Role":
                this.addRole()
                //resultSet.getAddRole()
                break;

              case "Add An Employee":
                this.addEmployee()
                //resultSet.getAddRole()
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
            //this.resultSet = new Sql(answers)
            //resultSet.getAllEmployeesViewTypes();
            //console.log(this.resultSet)
            
            
            // if (queryType === "View all employees") {
            //   connection.query(
            //     `select e.first_name, e.last_name, r.title, dep.name AS department, 
            //     r.salary,
            //     IFNULL(CONCAT(m.first_name, ' ' , m.last_name), 'No Manager') AS 'manager'
            //     from employee AS e
            //     INNER JOIN role AS r ON e.role_id = r.id 
            //     INNER JOIN department AS dep ON r.department_id = dep.id
            //     LEFT JOIN employee AS m ON m.id = e.manager_id
            //     ORDER BY e.first_name;`,
            //     function(err, results, fields) {
            //       const table = cTable.getTable(results);
            //       console.table(table);
            //       //console.log(results);
            //       //console.log(results);
            //       //console.log(results); // results contains rows returned by server
            //       //console.log(fields); // fields contains extra meta data about results, if available
            //     }
            //   );
            // }
            //this.employeeType = employeeType;
            //this.getFurtherInformation();
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
      // if answer is true go to next step
      .then(answers => {
        const resultSet = new Insert(answers)
        
        async function runInsert() {
          return resultSet.getInsertDepartment();;
        }
        runInsert().then(output => {
          this.getInquirerOptions();
          // No action required - Placeholder
        });        


      });

    }


    

    addRole() {


      // Create a new instance of our Sql Class to run our Select statements
      // Pass View All Departments Joined with Roles 
      const queryName = "View All Departments"
      const resultSet = new Sql(queryName)
      //console.log(resultSet.getViewAllDepartments())
      async function viewAllDepartments() {
        return resultSet.getViewAllDepartments();
      }

      viewAllDepartments().then(output => {
        // Output is the sect query
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
        name: 'queryType',
        message: "To what department this role should be assigned to ?",
        choices: output
      },
      ])
      // if answer is true go to next step
      .then(answers => {
        const resultSet = new Insert(answers)
        resultSet.getInsertRole();
      });
        //return output
        // Restart Application
       // this.getInquirerOptions();
      }); 
      
      //console.log(queryOutput)
      
     // let variable2 = "test"
     // let variable1 = [];




    }

    addEmployee() {

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
      type: 'input',
      name: 'employeeRole',
      message: "What is the employee's role?",
      validate: employeeRole => {
          if (employeeRole) {
            return true;
          } else {
            console.log("Please enter employee's role");
            return false;
          }
        }
    },
    {
      type: 'list',
      name: 'employeeManager',
      message: "Who is the employee's manager?",
      choices: ['Ashley Rodriguez','John Doe', 'Sara Lourd', 'No Manager'],
      validate: employeeManager => {
          if (employeeManager) {
            return true;
          } else {
            console.log("Please enter employee's role");
            return false;
          }
        }
    },
      ])
      // if answer is true go to next step
      .then(answers => {
        const resultSet = new Insert(answers)
        resultSet.getInsertEmployee();
      });

    }




}

//new RunApplication().getInquirerOptions();



/*
    // View All Employees
connection.query(
  `select e.first_name, e.last_name, r.title, dep.name AS department, 
  r.salary,
  IFNULL(CONCAT(m.first_name, ' ' , m.last_name), 'No Manager') AS 'manager'
  from employee AS e
  INNER JOIN role AS r ON e.role_id = r.id 
  INNER JOIN department AS dep ON r.department_id = dep.id
  LEFT JOIN employee AS m ON m.id = e.manager_id
  ORDER BY e.first_name;`,
  function(err, results, fields) {
    const table = cTable.getTable(results);
    console.table(table);
    //console.log(results);
    //console.log(results); // results contains rows returned by server
    //console.log(fields); // fields contains extra meta data about results, if available
  }
);

    // View employee with manager
    connection.query(
      `select IFNULL(CONCAT(m.first_name, ', ' , m.last_name), 'No Manager') AS 'Manager', e.first_name AS 'Direct report'
      from employee AS e LEFT JOIN employee m ON m.id = e.manager_id 
      ORDER BY Manager;`,
      function(err, results, fields) {
        const table = cTable.getTable(results);
        console.table(table);
        //console.log(results);
        //console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
      }
    );

  // // simple query
  // connection.query(
  //   'SELECT * FROM role',
  //   function(err, results, fields) {
  //     const table = cTable.getTable(results);
  //     console.table(table);
  //     //console.log(results); // results contains rows returned by server
  //     //console.log(fields); // fields contains extra meta data about results, if available
  //   }
  // );

    // // simple query
    // connection.query(
    //   'SELECT * FROM employee',
    //   function(err, results, fields) {
    //     const table = cTable.getTable(results);
    //     console.table(table);
    //     //console.log(results); // results contains rows returned by server
    //     //console.log(fields); // fields contains extra meta data about results, if available
    //   }
    // );

*/ 

