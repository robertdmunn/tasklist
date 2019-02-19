
const taskservice = require( '../model/taskservice' );

module.exports = {

  getAll: function( request, response ){
    taskservice.getAll( request.user.userID )
      .then( function( results ){
        response.send( JSON.stringify( results ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  create: function( request, response){
    taskservice.create( request.user.userID, request.body.taskName, request.body.dateDue )
      .then( function( results ){
        //we are reading back the inserted row
        taskservice.read( results, request.user.userID )
          .then( function( task ){
            response.send( JSON.stringify( task ) );
          })
          .catch( function( error ){
            console.log( error );
            response.send( JSON.stringify( error ) );
          });
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  read: function( request, response){
    taskservice.read( request.params.ID, request.user.userID )
      .then( function( results ){
        response.send( JSON.stringify( results ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  update: function( request, response){
    //response.send( JSON.stringify( request.body ) );
     taskservice.update( request.params.ID, request.user.userID, request.body.taskName, request.body.dateDue, request.body.complete )
      .then( function( results ){
        //we are reading back the updated row
        taskservice.read( request.params.ID, request.user.userID )
          .then( function( task ){
            response.send( JSON.stringify( task ) );
          })
          .catch( function( error ){
            console.log( error );
            response.send( JSON.stringify( error ) );
          });
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  delete: function( request, response){
    taskservice.delete( request.params.ID )
      .then( function( success ){
        response.send( JSON.stringify( success ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  }
}
