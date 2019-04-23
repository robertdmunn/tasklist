import {a7} from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';

export { getAll, create, read, update, deleteById };

var getAll = function( obj ){
    var params = { method: 'GET' };
    var promise = a7.remote.fetch( "/tasks", params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        json.forEach( function( task, idx ){
          task.dateDue = utils.formatDate( task.dateDue, "mm/dd/yyyy" );
          task.dateCompleted = ( task.dateCompleted === null ? "" : utils.formatDate( task.dateCompleted, "mm/dd/yyyy" ) );
        });
        a7.model.set( "tasks", json );

        a7.ui.views['todoList'].setState( { items: a7.model.get( "tasks" ) } );
        // request a render to the todo component so the item # is updated on the Add button
        a7.ui.views['todo'].fireEvent( "mustRender" );
      });
  },
  create = function( obj ){
    var request;

    var params = {  method: 'POST',
                    //encoding: 'application/x-www-form-urlencoded',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify( { taskName: obj.text,
                            dateDue: obj.dateDue } )
                  };

    var promise = a7.remote.fetch( "/task", params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        var task = json;
        var tasks = a7.model.get( "tasks" );
        task.dateDue = utils.formatDate( task.dateDue, "mm/dd/yyyy" );
        task.dateCompleted = ( task.dateCompleted === null ? "" : utils.formatDate( task.dateCompleted, "mm/dd/yyyy" ) );
        tasks.push( task );
        a7.model.set( "tasks", tasks );
        a7.ui.getView('todoList').setState( { items: a7.model.get( "tasks" ) } );
      });
  },
  read = function( obj ){
    var request;

    var params = {  method: 'GET',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    }
                  };

    var promise = a7.remote.fetch( "/task/" + obj.task.taskID, params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        var tasks = a7.model.get( "tasks" );
        var task = json;
        task.dateDue = utils.formatDate( task.dateDue, "mm/dd/yyyy" );
        task.dateCompleted = ( task.dateCompleted === null ? "" : utils.formatDate( task.dateCompleted, "mm/dd/yyyy" ) );

        var result = tasks.find( function( taskObj, idx ){
            if (taskObj.taskID === task.taskID) {
                tasks[idx] = task;
                return true;
            }
        });
        // if the task is there, result will be the task, otherwise result is undefined
        if( ! result ) tasks.push( json );

        a7.model.set( "tasks", tasks );
        a7.ui.getView('todoList').setState( { items: a7.model.get( "tasks" ) } );
      });
  },
  update = function( obj ){
    var request;

    var params = {  method: 'PUT',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify( { taskID: obj.task.taskID, taskName: obj.task.taskName,
                            dateDue: obj.task.dateDue, complete: obj.task.complete } )
                  };

    var promise = a7.remote.fetch( "/task/" + obj.task.taskID, params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        var task = json;
        task.dateDue = utils.formatDate( task.dateDue, "mm/dd/yyyy" );
        task.dateCompleted = ( task.dateCompleted === null ? "" : utils.formatDate( task.dateCompleted, "mm/dd/yyyy" ) );

        var tasks = a7.model.get( "tasks" );
        var result = tasks.find( function( taskObj, idx ){
            if (taskObj.taskID === task.taskID) {
                tasks[idx] = task;
                return true;
            }
        });
        a7.model.set( "tasks", tasks );
        a7.ui.getView('todoList').setState( { items: a7.model.get( "tasks" ) } );
      });
  },
  deleteById = function( obj ){
    var request;

    var params = {  method: 'DELETE',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    }
                  };

    var promise = a7.remote.fetch( "/task/" + obj.task.taskID, params, true );

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
        a7.ui.getView('todoList').setState( { items: a7.model.get( "tasks" ) } );
      });
  };
