
const userservice = require( '../model/userservice' );
const utils = require( '../model/utils' );
const shajs = require('sha.js');
const Base64 = require('js-base64').Base64;

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
        console.log( results[0].password );
        //response.send( JSON.stringify( results ) );
        if( results.length ){
          let hash = new shajs.sha512().update( password ).digest('hex');
          console.log( "hash:" + hash );
          valid = ( hash === results[0].password );
        }
        if( valid ){
          response.setHeader( "X-Token", utils.generateToken( results[0] ) );
          response.send( { user: results[0], success: true } );
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
