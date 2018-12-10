
var mysql = require( 'mysql' );

module.exports = init;

const pool = mysql.createPool({
  connectionLimit : 50,
  host            : 'localhost',
  user            : 'root',
  password        : '***REMOVED***',
  database        : 'project_master'
});

function init(){
  return dao;
}

var dao = {
  create: function ( taskName, dateDue ){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('INSERT INTO tasks ( taskName, dateDue ) VALUES ( ?, ? )',
          [taskName, dateDue],
          function (error, results, fields) {

            connection.release();

            if (error) reject( error );

            console.log( results );

            resolve( read( results.insertID ) );
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

            resolve ( { results: results, fields: fields } );
          });
      });
    });
  },

  update: function( taskID, taskName, dateDue, complete ){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection) {
        if (err) throw err;
        var dateCompleted = ( complete ? new Date() : null );
        connection.query('UPDATE tasks SET taskName ?, dateDue = ?, dateCompleted = ? WHERE taskID = ?',
          [ taskName, dateDue, dateCompleted, taskID ],
          function (error, results, fields){

            connection.release();

            if (error) reject( error );

            resolve( read( taskID ) );
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
