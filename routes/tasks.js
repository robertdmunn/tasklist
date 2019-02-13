const interceptor = require( '../interceptors/httpinterceptor.js' );
const aop = require( "tiny-aop" );

module.exports = function(app) {
  const taskcontroller = require( "../controllers/tasks.js" );
  const bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  for( var method in taskcontroller ){
    if( typeof taskcontroller[ method ] == 'function' ){
      aop.before( method, function(){
        // checkHTTPAuth( request, response )
        interceptor.checkHTTPAuth( arguments[0], arguments[1] );
      }, [taskcontroller]);
    }
  }

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
