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
    constructor(answers, output) {
        const {departmentName, roleTitle, salary, roleDepartment, departmentId, firstName, lastName, employeeRole, employeeManager} = answers;
      //  console.log(answers);
     //   const {TextRow.id} = outputTest;
    // console.log(outputTest[0].id)
      //  this.id = id
     //   console.log(this.id)
        //const {id} = outputTest
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeRole = employeeRole;
        this.employeeManager = employeeManager; // We need to split the contents
        if (!this.employeeManagerName || !this.employeeManagerLastName) {
            // DO nothing
        } else { //split
            this.employeeManagerName =  this.employeeManager.split(' ').shift()
            this.employeeManagerLastName = this.employeeManager.split(' ').pop()
        }
        //console.log(this.employeeManagerName);
        //console.log(this.employeeManagerLastName);
        this.departmentName = departmentName;
        this.roleTitle = roleTitle;
        this.salary = salary;
       // this.departmentId = departmentId;

      // filter array of objects if availalbe into id and then map it to a variable to be sent to the insert (id)
        let outputTest = []
        outputTest = output;
        if (!outputTest) {
            // Do nothing
        } else {
            // If id exist used it, if not do not use
            outputTest.filter(({ id }) => id)
            .map(({ id }) => {
            //console.log(id)
            this.id = id;
            // console.log("inside of filter " + this.id);

            // outputTest = id
            //console.log(outputTest);
        });
        }



        //console.log(this.roleTitle)
        //console.log(this.salary)
        //console.log(this.id)
       // console.log("outside of filter " + this.id);


        //let departmentIdOutput = outputTest;
       // console.log(departmentIdOutput);
       // console.log(this.departmentIdOutput);
        //console.log(this.id)
        //console.log(this.id);
        //console.log(typeof(`${this.roleTitle}`))
        //console.log(typeof(Number(`${this.salary}`))),
        //console.log(typeof(Number(`${this.departmentId}`)))
        
        // this.id = id;
        // this.email = email;
        // this.id = id;
        // this.email = email;        
        // // Valdate inpust to contruct our queries
        // ${this.roleTitle},
        // ${Number(this.salary)},
        // ${Number(this.departmentId)`,)`,
    }

    getInsertDepartment() {

        // let sql = "INSERT INTO role (title, salary, department_id);"
        // let values = [
        //     [`${this.roleTitle}`, `${Number(this.salary)}`, `${Number(this.departmentId)}`]
        // ]

        
    
        return connection.promise().query(
            `INSERT INTO department SET ?;`,
            {
                name: `${this.departmentName}`
            })
            .then( ([rows,fields]) => {
                //console.log(rows);
                const table = cTable.getTable(rows);
                console.log(table);
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

module.exports = Insert