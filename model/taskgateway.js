var mysql = require( 'mysql' );

module.exports = init;

var pool  = mysql.createPool({
  connectionLimit : 50,
  host            : 'localhost',
  user            : 'root',
  password        : '***REMOVED***',
  database        : 'project_master'
});

function init(){
  return gateway;
}

gateway = {
  getAll : function(){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('SELECT taskID, taskName, dateDue, dateCreated, dateCompleted FROM tasks ORDER BY dateDue',
          function (error, results, fields) {

            connection.release();
            if (error) reject( error );

            resolve( { results: results, fields: fields } );
          });
      });
    });
  }
}
