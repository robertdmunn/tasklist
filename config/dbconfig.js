
var mysql = require( 'mysql' );

const pool = mysql.createPool({
  connectionLimit : 50,
  host            : 'localhost',
  user            : 'root',
  password        : '***REMOVED***',
  database        : 'project_master'
});

module.exports = {
  pool: pool
};
