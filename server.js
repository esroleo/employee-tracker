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
    console.log("Connected!");
  });


    // View All Employees
connection.query(
  'select e.first_name, e.last_name, r.title, dep.name AS department, r.salary from employee AS e INNER JOIN role AS r ON e.role_id = r.id INNER JOIN department AS dep ON r.department_id = dep.id;',
  function(err, results, fields) {
    const table = cTable.getTable(results);
    console.table(table);
    //console.log(results);
    //console.log(results); // results contains rows returned by server
    //console.log(fields); // fields contains extra meta data about results, if available
  }
);


  // simple query
  connection.query(
    'SELECT * FROM role',
    function(err, results, fields) {
      const table = cTable.getTable(results);
      console.table(table);
      //console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
    }
  );

    // simple query
    connection.query(
      'SELECT * FROM employee',
      function(err, results, fields) {
        const table = cTable.getTable(results);
        console.table(table);
        //console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
      }
    );

