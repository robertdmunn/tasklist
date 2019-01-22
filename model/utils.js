const Base64 = require('js-base64').Base64;
const shajs = require('sha.js');

module.exports = {
  generateToken: function( user ){
    let authtoken = Object.assign( {}, arguments.user );
    //authtoken.expires = dateAdd( 'n', config.sessionTTL, new Date() );
    let base64Token = Base64.encode( JSON.stringify( authtoken ) );
    let hash = new shajs.sha512().update( base64Token ).digest('hex');

    return JSON.stringify( { token: base64Token, hash: hash } );
  },

  checkAuthToken: function( authtoken, timeout ){
    let auth = { userId : 0, expires : now() };
    let tokenhash = authtoken.split( " " );
    let token = tokenhash[0];
    let hashCode = tokenhash[1];
    if( hashCode === new shajs.sha512().update( token ).digest('hex') ){
      // token is valid
      auth = JSON.parse( Base64.decode( token ) );
    }
    return auth;
  }
}
