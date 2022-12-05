/*

  References:
    http://expressjs.com/
    https://node-postgres.com/apis/client
    https://www.postgresqltutorial.com/ (Rolse & Privileges)
    For API best practices - https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/
    Why to use bcrypt instead of sha-1-3 - https://codahale.com/how-to-safely-store-a-password/
    - Why use index.js in a foulder for exporting a module - https://stackoverflow.com/questions/21063587/what-is-index-js-used-for-in-node-js-projects


    Could possibly use this for message checking: 
      https://stackoverflow.com/questions/951483/how-to-check-if-a-json-response-element-is-an-array

  Notes:
    - Since its always an array of rows that gets returned from postgres, we can handle messages by returning a array with on object that has the message inside it so we can manage messages easier on the front end
    - We are using a global variable to determine the logged in user since understanding and handling session cookies is a different beast but is necessary for server security

*/
'use strict';

// Express
const express = require('express');
const app = express();
const PORT = 3000;

// Bcrypt
const bcrypt = require('bcrypt');
const SALTROUNDS = 10;

// Cors module for localhost testing
const cors = require('cors');

// Pool db query function
const db = require('./db');

// Currently logged in user
let currUser;

app.use(express.json());
app.use(cors()); // Allows cross origin access

app.post('/register', async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  const email = request.body.email;
  const SALARY = 25000;

  // Manually detect if input is not sanatized
  if (isNotSanitized(username, password)) {
    response.json([{ message: 'Attempted SQL injection' }]);
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
    const sql = `INSERT INTO employees(username, password, email, salary, created_on) VALUES('${username}', '${hashedPassword}', '${email}', '${SALARY}', NOW())`;
    const { rows } = await db.query(sql);

    response.json([{ message: 'Account created' }]);
  } catch (err) {
    console.log(err.stack());
  }
});

app.delete('/employee/:id', async (request, response) => {
  console.log(request.params); // {id: 41}
  let sql = `DELETE FROM employees WHERE user_id=${request.params.id} RETURNING *`;

  try {
    let { rows } = await db.query(sql);

    response.json(rows);
  } catch (err) {
    console.log(err.stack);
  }
});

app.post('/query', async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  let sql;
  currUser = username; // Set the current logged in user

  // Manually detect if input is not sanatized
  if (isNotSanitized(username, password)) {
    response.json([{ message: 'Attempted SQL injection' }]);
    return;
  }

  sql = `SELECT password FROM employees WHERE username='${username}'`;

  // Start async code
  try {
    const { rowCount, rows } = await db.query(sql);

    if (rowCount != 0) {
      const dbPassword = rows[0].password;
      const isMatchingPassword = await bcrypt.compare(password, dbPassword);

      // Create sql string depending on username
      if (username == 'admin') {
        db.setNewPool('admin');
        sql = `SELECT * FROM employees`;
        console.log('Admin logged in');
      } else {
        db.setNewPool('client');
        sql = `SELECT * FROM employees WHERE username='${username}' AND password='${dbPassword}'`;
      }

      if (isMatchingPassword) {
        // Get and send the employees based off username
        const { rows } = await db.query(sql);
        response.json(rows);
      } else {
        // Password did not match
        response.json([{ message: 'Wrong password' }]);
      }
    } else {
      // Supplied wrong username
      response.json([{ message: 'Invalid credentials' }]);
    }
  } catch (err) {
    console.log(err.stack);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Checks if the username or password has SQL injection characters
function isNotSanitized(username, password) {
  let regex = /-|--|=|'|"/;

  return regex.test(username) || regex.test(password);
}
