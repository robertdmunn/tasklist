const aop = require( "tiny-aop" );
const securityconfig = require( "../config/securityconfig.js" );
const utils = require( '../model/utils' );
const userservice = require( '../model/userservice' );

const checkHTTPAuth = function(){
  let uri = arguments[0];
  console.log( "arguments: " + arguments );
  if( securityconfig.routes.open.indexOf( uri ) >= 0 ){
    // open routes pass through

  }else if ( securityconfig.routes.secured.indexOf( uri ) >= 0 ){
    // check token
    console.log( "Secured route check" );
    let token = request.header( "X-Token" );
    let auth = utils.checkAuthToken( token, securityconfig.ttl );
    let user = userservice.read( auth.userID );
    let valid = false;
    if( user.userId > 0 && auth.expires > new Date() ){
			valid = true;
      // set the response header res.setHeader( "X-Token", utils.generateToken( user ) );
      // this call sets a user object into the request
			//SecurityService.setUser( local.user );
		}else{
      // denied
			//response.messages = "Authorization expired.";

		}
    console.log( valid );
  }
};

module.exports = function( app ){
  aop.before( "get", checkHTTPAuth, [ app ] );
};

module.exports = function( app ){
  aop.before( "post", checkHTTPAuth, [ app ] );
};

module.exports = function( app ){
  aop.before( "put", checkHTTPAuth, [ app ] );
};

module.exports = function( app ){
  aop.before( "delete", checkHTTPAuth, [ app ] );
};
