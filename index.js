
const express = require( 'express' );

const app = express();

// map our client-side libraries
app.use( express.static( 'client' ) );
app.use( "/lib/gadget-ui", express.static( 'node_modules/gadget-ui' ) );
app.use( "/lib/altseven", express.static( 'node_modules/altseven' ) );
app.use( "/lib/modlazy", express.static( 'node_modules/modlazy' ) );
app.use( "/lib/velocity", express.static( 'bower_components/velocity' ) );
app.use( "/lib/mustache.js", express.static( 'bower_components/mustache.js' ) );
app.use( "/lib/open-iconic", express.static( 'node_modules/open-iconic' ) );

// routes for the API
require( './routes/tasks.js' )(app);
require( './routes/auth.js' )(app);
require( './routes/users.js' )(app);

// set our listener
var server = app.listen( 4000, function(){

});
