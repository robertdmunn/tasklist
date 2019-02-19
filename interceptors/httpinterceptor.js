const securityconfig = require( "../config/securityconfig.js" );
const utils = require( '../model/utils' );
const userservice = require( '../model/userservice' );
module.exports = {
  checkHTTPAuth : function( request, response, next ){
    console.log( "checkHTTPAuth: " + request.url );

    let securedRoute = securityconfig.routes.secured.find( function( route ){
      return request.url.match( route );
    });
    console.log( securedRoute );
    if( securedRoute !== null && securedRoute !== undefined ){
      // check token
      console.log( "Secured route check" );
      let token = request.headers[ "x-token" ];
      let auth = utils.checkAuthToken( token, securityconfig.ttl );

      userservice.read( auth.userID )
        .then( function( results ){
          let user = results;
          let now = new Date();
          let valid = false;
          if( user.userID > 0 && new Date( auth.expires ).getTime() > now.getTime() ){
            valid = true;
            // remove the password hash from the token so we don't send it outside the system
            delete user.hash;
            console.log( "checkHTTPAuth: user: " );
            console.log( user );

            // this call sets a user into the request
            request.user = user;
            // set a new header token
            response.setHeader( "X-Token", utils.generateToken( user ) );
            // move on to the route handlers
            next();
          }else{
            // denied
            //response.messages = "Authorization expired.";
            response.status( 401 );
            response.send( "Not authorized." );
          }
        })
        .catch( function( error ){
          console.log( error );
          response.status( 500 );
          response.send( "Error" );
        });

    }else{
      //open routes pass through
      next();
    }
  }
};
