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

        connection.query('SELECT userID, username, password, firstName, lastName from users ORDER BY userID',
          function (error, results, fields) {

            connection.release();
            if (error) reject( error );

            resolve( results );
          });
      });
    });
  },
  getByUsername : function( username ){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('SELECT userID, username, password, firstName, lastName from users WHERE username = ?',
          [ username ],
          function (error, results, fields) {

            connection.release();
            if (error) reject( error );

            resolve( results );
          });
      });
    });
  }
}
