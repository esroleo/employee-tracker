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
        database: 'employeeTracker_db',
        multipleStatements: true // to allow mutiple queries at once
      });

      connection.connect(function(err) {
          if (err) throw err;
          //console.log("Connected!");
          // initiqlize application and call our first prototype function 
          //new RunApplication().getInquirerOptions();
        });


    class Sql {
        constructor(answers) {

        const {queryType, roleDepartment} = answers;
            this.queryType = queryType;
            this.roleDepartment = roleDepartment;

            // this.id = id;
            // this.email = email;
            // this.id = id;
            // this.email = email;        
            // Valdate inpust to contruct our queries

        }

        getTestQuery () {

          // var sq = "select id from role where title = " + mysql.escape(res.emprole); 
          //   connection.query(sq, function (err, result) {
          //       if (err) throw err;
          //       roleid = result[0].id;
          //   })

          // return connection.promise().query('SELECT * from role; Select * from department;', [1, 2], function(err, results) {
          //   if (err) throw err;
          // return connection.promise().query('SELECT * from role; Select * from department;', [1, 2], function(err, results) {
          //   if (err) throw err;
          
          //   // `results` is an array with one element for every statement in the query:
          //   //console.log(results[0]); // [{1: 1}]
          //   //console.log(results[1]); // [{2: 2}]
          //   return results;
          // });

          // select r.title, r.id AS 'role id', d.name AS 'department name', r.salary AS 'salary' from role AS r
          //   inner join department AS d on r.department_id = d.id;

          // inquirer need the name as the column to use regardless of the actual source column.
          return connection.promise().query(`
          select r.title AS name from role AS r inner join department AS d on r.department_id = d.id; 
          select  DISTINCT CONCAT(m.first_name, ' ' , m.last_name) AS name
                  from employee AS e    
                  INNER JOIN employee AS m ON m.id = e.manager_id
                  ORDER BY e.first_name;
          select CONCAT(e.first_name, ' ' , e.last_name) AS name from employee e ORDER BY name;
          select DISTINCT title as name from role ORDER BY name`)
          .then( ([rows,fields]) => {
            //console.log(rows);
            const table = cTable.getTable(rows);
            return rows
            //const table = cTable.getTable(rows);
         //   console.log(table);
          })
          .catch(console.log)
          //.then( () => connection.end());
         // .then( () => console.log("done"));

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

    getViewAllDepartmentsNames() {
        return connection.promise().query(
          //`select name, id from department dep;`
          `select name from department dep;`
        ) 
        .then( ([rows,fields]) => {
          //console.log(rows);
          const table = cTable.getTable(rows);
          //console.log(table);
          return rows
          // const table = cTable.getTable(rows);
          // console.log(table);
        })
        .catch(console.log)
        //.then( () => connection.end());
      // .then( () => console.log("done"));
            
      //return this.name;

    }

    getViewAllDepartmentsIdByName() {
      
      return connection.promise().query(
        //`select name, id from department dep;`
        //`select DISTINCT d.id from department d LEFT JOIN role r ON d.id = r.department_id WHERE d.name = '${this.roleDepartment}';`
        `select DISTINCT d.id from department d WHERE d.name = '${this.roleDepartment}';`
      ) 
      .then( ([rows,fields]) => {
        //console.log(rows);
        const table = cTable.getTable(rows);
        //console.log(table);
        return rows
        // const table = cTable.getTable(rows);
        // console.log(table);
      })
      .catch(console.log)
      //.then( () => connection.end());
      // .then( () => console.log("done"));
          
      //return this.name;
    
    }


            getViewAllDepartments() {
        
          
                return connection.promise().query(
                  //`select name, id from department dep;`
                  `select id, name from department dep;`
                ) 
                .then( ([rows,fields]) => {
                  //console.log(rows);
                  const table = cTable.getTable(rows);
                  console.log(table);
                  //return rows
                  // const table = cTable.getTable(rows);
                  // console.log(table);
                })
                .catch(console.log)
                //.then( () => connection.end());
               // .then( () => console.log("done"));
                    
               //return this.name;
            }


        getViewAllRoles() {

          return connection.promise().query(
            `select r.title, r.id AS 'role id', d.name AS 'department name', r.salary AS 'salary' from role AS r
            inner join department AS d on r.department_id = d.id;`
            
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



