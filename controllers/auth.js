
const userservice = require( '../model/userservice' );
const utils = require( '../model/utils' );
const Base64 = require('js-base64').Base64;
const bcrypt = require('bcryptjs');

module.exports = {

  login: function( request, response ){
    let authorization = request.header( "Authorization" ) || "";
    let username = "";
    let password = "";
    if( authorization.length ){
      let authArray = authorization.split(" ");
      authorization = Base64.decode( authArray[1] );
      username = authorization.split(":")[0];
      password = authorization.split(":")[1];
    }
    userservice.getByUsername( username )
      .then( function( results ){
        let valid = false;
        console.log(  "user: " );
        console.log( results[0] );
        if( results.length ){
          valid = bcrypt.compareSync( password, results[0].hash );
        }
        console.log( "valid: " + valid );
        if( valid ){
          let user = results[0];
          // remove the hash from the token so we don't send it outside the system
          delete user.hash;
          response.setHeader( "X-Token", utils.generateToken( user ) );
          response.send( { user: user, success: true } );
        }else{
          throw( "Invalid username/password combination." );
        }
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      })
  },
  logout: function( request, response ){
    response.send( { success: true } );
  },
  refresh: function( request, response ){
    //let token = request.header( "X-Token" );
    response.send( { success: true } );
  }
}
