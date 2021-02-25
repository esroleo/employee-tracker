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


class Insert {
    constructor(answers) {
        const {roleTitle, salary, departmentId} = answers
        this.roleTitle = roleTitle;
        this.salary = salary;
        this.departmentId = departmentId;
        console.log(typeof(`${this.roleTitle}`))
        console.log(typeof(Number(`${this.salary}`))),
        console.log(typeof(Number(`${this.departmentId}`)))
        
        // this.id = id;
        // this.email = email;
        // this.id = id;
        // this.email = email;        
        // // Valdate inpust to contruct our queries
        // ${this.roleTitle},
        // ${Number(this.salary)},
        // ${Number(this.departmentId)`,)`,
    }

        getInsert() {

            // let sql = "INSERT INTO role (title, salary, department_id);"
            // let values = [
            //     [`${this.roleTitle}`, `${Number(this.salary)}`, `${Number(this.departmentId)}`]
            // ]

            
        
            connection.query(
                `INSERT INTO role SET ?;`,
                {
                    title: `${this.roleTitle}`,
                    salary: Number(`${this.salary}`),
                    department_id: Number(`${this.departmentId}`)
                  },
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
    
}

module.exports = Insert