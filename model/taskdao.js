const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return dao;
}

var dao = {
  create: function ( taskName, dateDue ){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('INSERT INTO tasks ( taskName, dateCreated, dateDue ) VALUES ( ?, curdate(), ? )',
          [taskName, dateDue],
          function (error, results, fields) {

            connection.release();

            if (error) reject( error );
            resolve( results.insertId );
          });
      });
    });
  },

  read: function( taskID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection){
        if (err) throw err;

        var query = connection.query('SELECT taskID, taskName, dateCreated, dateDue, dateCompleted FROM tasks WHERE taskID = ?',
          [taskID],
          function (error, results, fields){

            connection.release();

            if (error) reject( error );
            resolve( results[0] );
          });
      });
    });
  },

  update: function( taskID, taskName, dateDue, complete ){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection) {
        if (err) throw err;
        var dateCompleted = ( complete ? new Date() : null );
        var due = new Date( dateDue );
        connection.query('UPDATE tasks SET taskName = ?, dateDue = ?, dateCompleted = ? WHERE taskID = ?',
          [ taskName, due, dateCompleted, taskID ],
          function (error, results, fields){

            connection.release();

            if (error) reject( error );

            resolve(true);
          });
      });
    });
  },

  delete: function( taskID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('DELETE FROM tasks WHERE taskID = ?',
          [taskID],
          function (error, results, fields){

            connection.release();

            if (error) reject( error );

            resolve( true ); // successful delete
          });
      });
    });
  }
};
