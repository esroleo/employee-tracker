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

    

class Update {
    constructor(answers) {
        const {employeName, newRole} = answers;
        this.employeName = employeName;
        // shift and pop to get first and last name.
        if (!this.employeName || !this.employeName) {
            // DO nothing
        } else { //split
            this.employeeFirstName =  this.employeName.split(' ').shift()
            this.employeeLastName = this.employeName.split(' ').pop()
        }

        this.newRole = newRole;
    }

    getUpdateEmployee() {

        return connection.promise().query(
            `UPDATE employee, (select id from employee where first_name = '${this.employeeFirstName}' and last_name = '${this.employeeLastName}') AS employeeTarget
            SET role_id = (select id FROM role where title = '${this.newRole}')
            WHERE employee.id = employeeTarget.id;`
            ,
)           .then( ([rows,fields]) => {
                //console.log(rows);
                const table = cTable.getTable(rows);
                let outputReturn = `Record for: ${this.employeeFirstName} ${this.employeeLastName} has been updated. New role is ${this.newRole}.`
                //console.log(`Record for: ${this.employeeFirstName} ${this.employeeLastName} has been updated. New role is ${this.newRole}`)
                //console.log(table);
                return outputReturn
                //return rows;
              })
              .catch(console.log)
              //.then( () => connection.end());
             // .then( () => console.log("done"));
              
        


    }

    getInsertRole() {

        // let sql = "INSERT INTO role (title, salary, department_id);"
        // let values = [
        //     [`${this.roleTitle}`, `${Number(this.salary)}`, `${Number(this.departmentId)}`]
        // ]

        // Final data insert - final stage

            connection.query(
                
            `INSERT INTO role SET ?;`,
            {
                title: `${this.roleTitle}`,
                salary: Number(`${this.salary}`),
                department_id: Number(`${this.id}`)
                //console.log(results);
                //console.log(results);
                //console.log(results); // results contains rows returned by server
                //console.log(fields); // fields contains extra meta data about results, if available
            }
        );


    }

    getInsertEmployee() {

        // let sql = "INSERT INTO role (title, salary, department_id);"
        // let values = [
        //     [`${this.roleTitle}`, `${Number(this.salary)}`, `${Number(this.departmentId)}`]
        // ]
      
       // choices: ['Ashley Rodriguez','John Doe', 'Sara Lourd', 'No Manager'],
       //manager_id: Number(`${this.employeeManager}`)
    //    `INSERT INTO employee SET ?;`,
    //    {
    //     first_name: `${this.firstName}`,
    //     last_name: `${this.lastName}`,
    //     role_id: Number(`select distinct r.id as id from role r WHERE r.title = 'Sales Lead'`),
    //     manager_id: Number(`select distinct e.id as id from employee e WHERE e.first_name = 'Ashley' and e.last_name = 'Rodriguez'`)
    // },

        return connection.promise().query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ('${this.firstName}', '${this.lastName}', (select distinct r.id as id from role r WHERE r.title = '${this.employeeRole}'), (select distinct e.id as id from employee e WHERE e.first_name = '${this.employeeManagerName}' and e.last_name = '${this.employeeManagerLastName}'));`)
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

    
}

module.exports = Update