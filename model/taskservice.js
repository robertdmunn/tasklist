const taskdao = require( './taskdao' );
const taskgateway = require( './taskgateway' );

const dao = taskdao();
const gateway = taskgateway();

module.exports = {
  getAll: function(){
    return( gateway.getAll() );
  },
  create: function( taskName, dateDue, complete ){
    return( dao.create( taskName, dateDue ) );
  },
  read: function( taskID ){
    return( dao.read( taskID ) );
  },
  update: function( taskID, taskName, dateDue, complete ){
    return( dao.update( taskID, taskName, dateDue, complete ) );
  },
  delete: function( taskID ){
    return( dao.delete( taskID ) );
  }
};
