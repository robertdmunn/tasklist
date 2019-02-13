const dbConfig = require( "../config/dbconfig.js" );
const bcrypt = require('bcryptjs');

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return dao;
}

var dao = {
  create: function ( username, password, firstName, lastName ){
    var salt = bcrypt.genSaltSync( 10 );
    var hash = bcrypt.hashSync( password, salt );

    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query('INSERT INTO users ( username, hash, firstName, lastName, dateCreated ) VALUES ( ?, ?, ?, ?, curdate() )',
            [username, hash, firstName, lastName] )
            .then( ( results ) => {
              connection.end();
              resolve( results.insertId );
            })
            .catch( err => {
              connection.end();
              reject( error );
            });
        })
        .catch( err => {
          //not connected
          reject( err );
        });
    });
  },

  read: function( userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query('SELECT userID, username, hash, firstName, lastName, dateCreated FROM users WHERE userID = ?',
            [userID] )
          .then( ( results ) => {
            connection.end();
            resolve( results[0] );
          })
          .catch( err => {
            connection.end();
            reject( err );
          });
        })
        .catch( err => {
          reject( err );
        });
    });
  },

  update: function( userID, username, firstName, lastName ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query('UPDATE users SET username = ?, firstName = ?, lastName = ? WHERE userID = ?',
            [ username, firstName, lastName, userID ] )
            .then( ( results ) => {
              connection.end();
              resolve( true );
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

  delete: function( userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query('DELETE FROM users WHERE userID = ?', [userID] )
            .then( ( results ) => {
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
