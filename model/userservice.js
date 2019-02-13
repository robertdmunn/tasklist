const userdao = require( './userdao' );
const usergateway = require( './usergateway' );

const dao = userdao();
const gateway = usergateway();

module.exports = {
  getAll: function(){
    return( gateway.getAll() );
  },
  getByUsername: function( username ){
    return( gateway.getByUsername( username ) );
  },
  create: function( username, password, firstName, lastName ){
    return( dao.create( username, password, firstName, lastName ) );
  },
  read: function( userID ){
    return( dao.read( userID ) );
  },
  update: function( userID, username, firstName, lastName ){
    return( dao.update( userID, username, firstName, lastName ) );
  },
  delete: function( userID ){
    return( dao.delete( userID ) );
  }
};
