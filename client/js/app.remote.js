app.remote = {
  task: {
    getAll: function( obj ){
      var request,
          params = { method: 'GET' };

      request = new Request( "/tasks" , params );

      var promise = fetch( request );

      promise
        .then( function( response ) {
          // get json response and pass to handler to resolve
          return response.json();
        })
        .then( function( json ){
          json.forEach( function( task, idx ){
            task.dateDue = app.utils.formatDate( task.dateDue );
            task.dateCompleted = ( task.dateCompleted === null ? "" : app.utils.formatDate( task.dateCompleted ) );
          });
          a7.model.set( "tasks", json );
          // set the state of any view that was passed in
          if( obj.view !== undefined ){

            obj.view.state.items = a7.model.get( "tasks" );
            obj.view.render();
          }
        });
    },
    create: function( obj ){
      var request;

      var params = {  method: 'POST',
                      //encoding: 'application/x-www-form-urlencoded',
                      headers: {
                        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                        'Content-Type': 'application/json; charset=utf-8'
                      },
                      body: JSON.stringify( { taskName: obj.taskName,
                              dateDue: obj.dateDue } )
                    };

      request = new Request( "/task" , params );

      var promise = fetch( request );

      promise
        .then( function( response ) {
          // get json response and pass to handler to resolve
          return response.json();
        })
        .then( function( json ){
          var task = json;
          var tasks = a7.model.get( "tasks" );
          task.dateDue = app.utils.formatDate( task.dateDue );
          task.dateCompleted = ( task.dateCompleted === null ? "" : app.utils.formatDate( task.dateCompleted ) );
          tasks.push( task );
          a7.model.set( "tasks", tasks );
          a7.log.trace( obj.view );
          // set the state of any view that was passed in
          if( obj.view !== undefined ){
            obj.view.state.items = a7.model.get( "tasks" );
            obj.view.render();
          }
        });
    },
    read: function( obj ){
      var request;

      var params = {  method: 'GET',
                      headers: {
                        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                        'Content-Type': 'application/json; charset=utf-8'
                      }
                    };

      request = new Request( "/task/" + obj.task.taskID, params );

      var promise = fetch( request );

      promise
        .then( function( response ) {
          // get json response and pass to handler to resolve
          return response.json();
        })
        .then( function( json ){
          var tasks = a7.model.get( "tasks" );
          var task = json;
          task.dateDue = app.utils.formatDate( task.dateDue );
          task.dateCompleted = ( task.dateCompleted === null ? "" : app.utils.formatDate( task.dateCompleted ) );

          var result = tasks.find( function( taskObj, idx ){
              if (taskObj.taskID === task.taskID) {
                  tasks[idx] = task;
                  return true;
              }
          });
          // if the task is there, result will be the task, otherwise result is undefined
          if( ! result ) tasks.push( json );

          a7.model.set( "tasks", tasks );
          a7.log.trace( obj.view );
          // set the state of any view that was passed in
          if( obj.view !== undefined ){
            obj.view.state.items = a7.model.get( "tasks" );
            obj.view.render();
          }
        });
    },
    update: function( obj ){
      var request;

      var params = {  method: 'PUT',
                      headers: {
                        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                        'Content-Type': 'application/json; charset=utf-8'
                      },
                      body: JSON.stringify( { taskID: obj.task.taskID, taskName: obj.task.taskName,
                              dateDue: obj.task.dateDue, complete: obj.task.complete } )
                    };

      request = new Request( "/task/" + obj.task.taskID, params );

      var promise = fetch( request );

      promise
        .then( function( response ) {
          // get json response and pass to handler to resolve
          return response.json();
        })
        .then( function( json ){
          var task = json;
          task.dateDue = app.utils.formatDate( task.dateDue );
          task.dateCompleted = ( task.dateCompleted === null ? "" : app.utils.formatDate( task.dateCompleted ) );

          var tasks = a7.model.get( "tasks" );
          var result = tasks.find( function( taskObj, idx ){
              if (taskObj.taskID === task.taskID) {
                  tasks[idx] = task;
                  return true;
              }
          });
          a7.model.set( "tasks", tasks );
          a7.log.trace( obj.view );
          // set the state of any view that was passed in
          if( obj.view !== undefined ){
            obj.view.state.items = a7.model.get( "tasks" );
            obj.view.render();
          }
        });
    },
    delete: function( obj ){
      var request;

      var params = {  method: 'DELETE',
                      headers: {
                        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                        'Content-Type': 'application/json; charset=utf-8'
                      }
                    };

      request = new Request( "/task/" + obj.task.taskID, params );

      var promise = fetch( request );

      promise
        .then( function( response ) {
          // get json response and pass to handler to resolve
          return response.json();
        })
        .then( function( json ){
          if( json ){
            var tasks = a7.model.get( "tasks" );

            var deleted = tasks.find( function( task, idx ){
                if (task.taskID === obj.task.taskID) {
                  tasks.splice( idx, 1 );
                    return true;
                }
            });
          }

          a7.model.set( "tasks", tasks );
          a7.log.trace( obj.view );
          // set the state of any view that was passed in
          if( obj.view !== undefined ){
            obj.view.state.items = a7.model.get( "tasks" );
            obj.view.render();
          }
        });
    },
  }
};
