// npm library mysql2 - allows node.js to interact with mysql
// Extra note - MySql server version is Ver 8.0.23 Win64
//const mysql = require('mysql2');

const RunApplication = require('../server')


    // get the client
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
            // Valdate inpust to contruct our queries

        }
        
        getViewAllEmployees() {
        
                 return connection.promise().query(
                  `select e.first_name, e.last_name, r.title, dep.name AS department, 
                  r.salary,
                  IFNULL(CONCAT(m.first_name, ' ' , m.last_name), 'No Manager') AS 'manager'
                  from employee AS e
                  INNER JOIN role AS r ON e.role_id = r.id 
                  INNER JOIN department AS dep ON r.department_id = dep.id
                  LEFT JOIN employee AS m ON m.id = e.manager_id
                  ORDER BY e.first_name;`
                  // ,
                  // function(err, results, fields) {
                  //   const table = cTable.getTable(results);
                  //   return table;
                  //   //console.log(results);
                  //   //console.log(results);
                  //   //console.log(results); // results contains rows returned by server
                  //   //console.log(fields); // fields contains extra meta data about results, if available
                  // }
                )
                .then( ([rows,fields]) => {
                  //console.log(rows);
                  const table = cTable.getTable(rows);
                  console.log(table);
                })
                .catch(console.log)
                //.then( () => connection.end());
               // .then( () => console.log("done"));
                  

                //return this.name;
              }

            getViewAllDepartments() {
        
          
                connection.query(
                  `select name, id from department dep;`,
                  function(err, results, fields) {
                    const table = cTable.getTable(results);
                    console.log("before output");
                    console.table(table);

                    //console.log(results);
                    //console.log(results);
                    //console.log(results); // results contains rows returned by server
                    //console.log(fields); // fields contains extra meta data about results, if available
                  }
                );
                    


                

              //return this.name;
            }


        getViewAllRoles() {

          connection.query(
            `select r.title, r.id AS 'role id', d.name AS 'department name', r.salary AS 'role salary' from role AS r
            inner join department AS d on r.department_id = d.id;`,
            function(err, results, fields) {
              const table = cTable.getTable(results);
              console.table(table);
              //console.log(results);
              //console.log(results);
              //console.log(results); // results contains rows returned by server
              //console.log(fields); // fields contains extra meta data about results, if available
            }
          );
          

        

            //return this.name;
        }

        getAddRole() {

          connection.query(
            `select * from department role;`,
            function(err, results, fields) {
              const table = cTable.getTable(results);
              console.table(table);
              //console.log(results);
              //console.log(results);
              //console.log(results); // results contains rows returned by server
              //console.log(fields); // fields contains extra meta data about results, if available
            }
          );
          

        

            //return this.name;
        }
            
            
        

          

        getViewAllEmployeesByDeparment() {
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
        }

        getViewAllEmployeesByManager() {
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

        getRole() {
            return 'Employee'
        }


    }
    module.exports = Sql



