const taskdao = require( './taskdao' );
const taskgateway = require( './taskgateway' );

const dao = taskdao();
const gateway = taskgateway();

module.exports = {
  getAll: function( userID ){
    return( gateway.getAll( userID ) );
  },
  create: function( userID, taskName, dateDue, complete ){
    return( dao.create( userID, taskName, dateDue ) );
  },
  read: function( taskID, userID ){
    return( dao.read( taskID, userID ) );
  },
  update: function( taskID, userID, taskName, dateDue, complete ){
    return( dao.update( taskID, userID, taskName, dateDue, complete ) );
  },
  delete: function( taskID, userID ){
    return( dao.delete( taskID, userID ) );
  }
};
