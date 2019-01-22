
const userservice = require( '../model/userservice' );

module.exports = {

  getAll: function( request, response ){
    userservice.getAll()
      .then( function( results ){
        response.send( JSON.stringify( results ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  getByUsername: function( request, response ){
    userservice.getByUsername( request.body.username )
      .then( function( results ){
        response.send( JSON.stringify( results ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      })
  },

  create: function( request, response){
    userservice.create( request.body.username, request.body.password, request.body.firstName, request.body.lastName )
      .then( function( results ){
        //we are reading back the inserted row
        userservice.read( results )
          .then( function( user ){
            response.send( JSON.stringify( user ) );
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
    userservice.read( request.params.ID )
      .then( function( results ){
        response.send( JSON.stringify( results ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  update: function( request, response){
     userservice.update( request.params.ID, request.body.username, request.body.password, request.body.firstName, request.body.lastName )
      .then( function( user ){
        //we are reading back the updated row
        userservice.read( request.body.userID )
          .then( function( user ){
            response.send( JSON.stringify( user ) );
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
    userservice.delete( request.params.ID )
      .then( function( success ){
        response.send( JSON.stringify( success ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  }
}
