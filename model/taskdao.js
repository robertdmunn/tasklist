const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return dao;
}

var dao = {
  create: function ( userID, taskName, dateDue ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query('INSERT INTO tasks ( userID, taskName, dateCreated, dateDue ) VALUES ( ?, ?, curdate(), ? )', [userID, taskName, dateDue] )
            .then( ( results ) =>{
              connection.end();
              resolve( results.insertId );
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

  read: function( taskID, userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection =>{
          connection.query('SELECT userID, taskID, taskName, dateCreated, dateDue, dateCompleted FROM tasks WHERE taskID = ? AND userID = ?', [taskID, userID] )
            .then( ( results ) =>{
              connection.end();
              resolve( results[0] );
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

  update: function( taskID, userID, taskName, dateDue, complete ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          var dateCompleted = ( complete ? new Date() : null );
          var due = new Date( dateDue );
          connection.query('UPDATE tasks SET taskName = ?, dateDue = ?, dateCompleted = ? WHERE taskID = ? AND userID = ?', [ taskName, due, dateCompleted, taskID, userID ] )
            .then( ( results ) =>{
              connection.end();
              resolve(true);
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

  delete: function( taskID, userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
        connection.query('DELETE FROM tasks WHERE taskID = ? AND userID = ?', [taskID, userID])
          .then( ( results ) =>{
            connection.end();
            resolve( true ); // successful delete
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
};
