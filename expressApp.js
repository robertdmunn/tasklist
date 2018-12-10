
var express = require( 'express' );
var request = require ( 'request' );

var app = express();
app.set( 'view engine', 'jade' );
app.get( "/", function( req, response ){
  response.writeHead( 200, { 'Content-Type' : 'text/html' } );
  response.end( "Hey Man." );

/*   request( "https://www.google.com/", function( error, resp, body ){
    response.end( body );
  }); */
});

app.get( "/api", function( req, response){
    response.writeHead( 200, { 'Content-Type' : 'text/html' } );
    response.end( "You must provide an endpoint and action." );
});

app.get( "/jade", function( req, response ){
  response.render( "index", { title: "Jade Template Sample", message: "Simple Jade template example" } );
});

var server = app.listen( 3000, function(){

});
