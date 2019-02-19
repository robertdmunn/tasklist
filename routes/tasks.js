const interceptor = require( '../interceptors/httpinterceptor.js' );

module.exports = function(app) {
  const taskcontroller = require( "../controllers/tasks.js" );
  const bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  // get all tasks
  app.get( "/tasks", taskcontroller.getAll );

  // create a new task
  app.post( "/task", jsonParser, taskcontroller.create );

  // get a task by ID
  app.get( "/task/:ID", taskcontroller.read );

  //update a task
  app.put( "/task/:ID", jsonParser, taskcontroller.update );

  //delete a task
  app.delete( "/task/:ID", taskcontroller.delete );

};
