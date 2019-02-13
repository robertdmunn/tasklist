//const aop = require( "tiny-aop" );
const securityconfig = require( "../config/securityconfig.js" );
const utils = require( '../model/utils' );
const userservice = require( '../model/userservice' );
module.exports = {
  checkHTTPAuth : function(request, response){
    console.log( "checkHTTPAuth: " + request.url );
    if( securityconfig.routes.open.indexOf( request.url ) >= 0 ){
      // open routes pass through

    }else if ( securityconfig.routes.secured.indexOf( request.url ) >= 0 ){
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
            // remove the hash from the token so we don't send it outside the system
            delete user.hash;
            response.setHeader( "X-Token", utils.generateToken( user ) );
            // set the response header res.setHeader( "X-Token", utils.generateToken( user ) );
            // this call sets a user object into the request
            //SecurityService.setUser( local.user );
          }else{
            // denied
            //response.messages = "Authorization expired.";
            response.status( 401 );
            response.send( "Not authorized." );
          }
          console.log( "token check- valid? " + valid );
        })
        .catch( function( error ){
          console.log( error );

        });

    }
  }
};
