
var express = require( 'express' );
var request = require( 'request' );
const taskdao = require( './model/taskdao' );
const taskgateway = require( './model/taskgateway' );
var app = express();
const dao = taskdao();
const gateway = taskgateway();

app.get( "/", function( request, response ){
  gateway.getAll()
    .then( function( results ){
      response.send( JSON.stringify( results ) );
    })
    .catch( function( error ){
      console.log( error );
      response.send( JSON.stringify( error ) );
    })

});

app.post( "/task", function( request, response){
  dao.create( request.taskName, request.dateDue )
    .then( function( results ){
      response.send( JSON.stringify( results ) );
    })
    .catch( function( error ){
      console.log( error );
      response.send( JSON.stringify( error ) );
    });

});

app.get( "/task", function( request, response){
  dao.read( request.query.taskID )
    .then( function( results ){
      response.send( JSON.stringify( results.results[0] ) );
    })
    .catch( function( error ){
      console.log( error );
      response.send( JSON.stringify( error ) );
    });
});

app.put( "/task", function( request, response){
  dao.update( request.taskID, request.taskName, request.dateDue, request.complete )
    .then( function( results ){
      response.send( JSON.stringify( results ) );
    })
    .catch( function( error ){
      console.log( error );
      response.send( JSON.stringify( error ) );
    });
});

app.delete( "/task", function( request, response){
  dao.delete( request.taskID )
    .then( function( results ){
      response.send( JSON.stringify( results ) );
    })
    .catch( function( error ){
      console.log( error );
      response.send( JSON.stringify( error ) );
    });
});

var server = app.listen( 3000, function(){

});
