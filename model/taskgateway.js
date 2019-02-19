const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return gateway;
}

gateway = {
  getAll : function( userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query('SELECT taskID, taskName, dateDue, dateCreated, dateCompleted FROM tasks WHERE userID = ? ORDER BY dateDue', [userID])
            .then( ( results ) =>{
              connection.end();
              resolve( results );
            })
            .catch( err =>{
              //not connected
              connection.end();
              reject( err );
            });
        })
        .catch( err => {
          //not connected
          reject( err );
        });
    });
  }
}
