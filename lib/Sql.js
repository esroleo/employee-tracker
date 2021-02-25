// npm library mysql2 - allows node.js to interact with mysql
// Extra note - MySql server version is Ver 8.0.23 Win64
const mysql = require('mysql2');

// npm library console.table to display tabulated format at console log
const cTable = require('console.table');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cantimploras87=',
    database: 'employeeTracker_db'
  });
  
  connection.connect(function(err) {
      if (err) throw err;
      //console.log("Connected!");
      // initiqlize application and call our first prototype function 
      //new RunApplication().getInquirerOptions();
    });


class Sql {
    constructor(answers) {
        const {queryType} = answers;
        this.queryType = queryType;
        // this.id = id;
        // this.email = email;
        // this.id = id;
        // this.email = email;    
    }

    
    getAllEmployeesViewTypes() {

        if (this.queryType === "View all employees") {
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
                //console.log(results);
                //console.log(results); // results contains rows returned by server
                //console.log(fields); // fields contains extra meta data about results, if available
              }
            );
          } else if (this.queryType === "View All Employees By Department") {
            connection.query(
              `select dep.name AS department, e.first_name, e.last_name
              from employee AS e
              INNER JOIN role AS r ON e.role_id = r.id 
              INNER JOIN department AS dep ON r.department_id = dep.id
              LEFT JOIN employee AS m ON m.id = e.manager_id
              ORDER BY department;`,
              function(err, results, fields) {
                const table = cTable.getTable(results);
                console.table(table);
                //console.log(results);
                //console.log(results);
                //console.log(results); // results contains rows returned by server
                //console.log(fields); // fields contains extra meta data about results, if available
              }
            );
          } else if (this.queryType === "View All Employees by Manager") {
            connection.query(
              `select IFNULL(CONCAT(m.first_name, ' ' , m.last_name), 'No Manager') AS 'manager', e.first_name, e.last_name
              from employee AS e
              INNER JOIN role AS r ON e.role_id = r.id 
              INNER JOIN department AS dep ON r.department_id = dep.id
              INNER JOIN employee AS m ON m.id = e.manager_id
              ORDER BY manager;`,
              function(err, results, fields) {
                const table = cTable.getTable(results);
                console.table(table);
                //console.log(results);
                //console.log(results);
                //console.log(results); // results contains rows returned by server
                //console.log(fields); // fields contains extra meta data about results, if available
              }
            );
          }


        //return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email
    }

    getRole() {
        return 'Employee'
    }


}

module.exports = Sql
