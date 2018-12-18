const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

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

            resolve( results );
          });
      });
    });
  }
}
