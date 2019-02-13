const Base64 = require('js-base64').Base64;
const shajs = require('sha.js');
const securityconfig = require('../config/securityconfig.js');

module.exports = {
  generateToken: function( user ){
    let authtoken = Object.assign( {}, user );
    let now = new Date();
    authtoken.expires =  new Date( now );
    authtoken.expires.setMinutes( now.getMinutes() + securityconfig.ttl );
    let base64Token = Base64.encode( JSON.stringify( authtoken ) );
    let hash = new shajs.sha512().update( base64Token ).digest('hex');

    return JSON.stringify( { token: base64Token, hash: hash } );
  },

  checkAuthToken: function( authtoken, timeout ){
    let auth = { userID : 0, expires : new Date() };
    let tokenhash = JSON.parse( authtoken );
    let token = tokenhash.token;
    let hashCode = tokenhash.hash;

    if( hashCode == new shajs.sha512().update( token ).digest('hex') ){
      // token is valid
      auth = JSON.parse( Base64.decode( token ) );
    }
    return auth;
  }
}
