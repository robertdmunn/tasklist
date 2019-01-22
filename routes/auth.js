
module.exports = function(app) {
  const authcontroller = require( "../controllers/auth.js" );
  const bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  // get a auth by ID
  app.post( "/auth/login", authcontroller.login );

  app.post( "/auth/logout", authcontroller.logout );

  app.get( "/auth/refresh", authcontroller.refresh );
};
