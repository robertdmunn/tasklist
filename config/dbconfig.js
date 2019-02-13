
var mysql = require( 'mariadb' );

const pool = mysql.createPool({
  connectionLimit : 50,
  host            : 'localhost',
  user            : 'root',
  password        : 'password',
  database        : 'project_master'
});

module.exports = {
  pool: pool
};
