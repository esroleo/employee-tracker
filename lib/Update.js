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
                return outputReturn
              })
              .catch(console.log)
    }
}

module.exports = Update