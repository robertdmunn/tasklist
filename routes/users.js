const interceptor = require( '../interceptors/httpinterceptor.js' );

module.exports = function(app) {
  const usercontroller = require( "../controllers/users.js" );
  const bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  // get all users
  app.get( "/users", usercontroller.getAll );

  // create a new user
  app.post( "/user", jsonParser, usercontroller.create );

  // get a user by ID
  app.get( "/user/:ID", usercontroller.read );

  //update a user
  app.put( "/user/:ID", jsonParser, usercontroller.update );

  //delete a user
  app.delete( "/user/:ID", usercontroller.delete );

};
