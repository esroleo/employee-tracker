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

          inquirer
          .prompt([
            {
              type: 'list',
              name: 'queryType',
              message: "What would you like to do?",
              choices: ['View All Departments','View All Roles', 'View All employees', 'Add a Role', 'Add An Employee', 'Update Employee Role', 'View All Employees By Department', 'View All Employees by Manager', 'Add Employee']
            }
          ])
          // if answer is true go to next step
          .then(answers => {
            //console.log(answers);
            
            const resultSet = new Sql(answers)
           // console.log(resultSet.queryType);
            switch(resultSet.queryType) {
              case "View All Departments":
                resultSet.getViewAllDepartments()
                break;
              case "View All Roles":
                resultSet.getViewAllRoles()
                break;
              case "View All employees":
                resultSet.getViewAllEmployees()
                break;
              case "Add a Role":
                this.addRole()
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
                text = "I have never heard of that fruit...";
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

    addRole() {

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
      type: 'input',
      name: 'departmentId',
      message: "Plese enter department id",
      validate: employeeName => {
          if (employeeName) {
            return true;
          } else {
            console.log("Please enter department id");
            return false;
          }
        }
    },
      ])
      // if answer is true go to next step
      .then(answers => {
        const resultSet = new Insert(answers)
        resultSet.getInsert();
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