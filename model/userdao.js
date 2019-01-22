const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return dao;
}

var dao = {
  create: function ( username, password, firstName, lastName ){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('INSERT INTO users ( username, password, firstName, lastName, dateCreated ) VALUES ( ?, ?, ?, ?, curdate() )',
          [username, password, firstName, lastName],
          function (error, results, fields) {

            connection.release();

            if (error) reject( error );
            resolve( results.insertId );
          });
      });
    });
  },

  read: function( userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection){
        if (err) throw err;

        var query = connection.query('SELECT username, password, firstName, lastName, dateCreated FROM users WHERE userID = ?',
          [userID],
          function (error, results, fields){

            connection.release();

            if (error) reject( error );
            resolve( results[0] );
          });
      });
    });
  },

  update: function( userID, username, password, firstName, lastName ){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('UPDATE users SET username = ?, password = ?, firstName = ?, lastName = ? WHERE userID = ?',
          [ username, password, firstName, lastName, userID ],
          function (error, results, fields){

            connection.release();

            if (error) reject( error );

            resolve(true);
          });
      });
    });
  },

  delete: function( userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('DELETE FROM users WHERE userID = ?',
          [userID],
          function (error, results, fields){

            connection.release();

            if (error) reject( error );

            resolve( true ); // successful delete
          });
      });
    });
  }
};
