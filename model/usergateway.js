const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return gateway;
}

gateway = {
  getAll : function(){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
      .then( connection => {
        connection.query('SELECT userID, username, hash, firstName, lastName from users ORDER BY userID' )
          .then( ( results ) =>{
            connection.end();
            resolve( results );
          })
          .catch( err =>{
            connection.end();
            reject( err );
          });
      })
      .catch( err =>{
        reject( err );
      });
    });
  },
  getByUsername : function( username ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query('SELECT userID, username, hash, firstName, lastName from users WHERE username = ?', [ username ] )
            .then( ( results ) =>{
              connection.end();
              resolve( results );
            })
            .catch( err =>{
              connection.end();
              reject( err );
            });
        })
        .catch( err =>{
          reject( err );
        });
    });
  }
}
