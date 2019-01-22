import {a7} from '/lib/altseven/dist/a7.js';
// you only need to import the floatingpane if you use it as the container for the console
import {floatingpane} from '/lib/gadget-ui/dist/gadget-ui.es6.js';

var app = {
  main: (function() {
    "use strict";

    return {
      init: function(state) {
        // cache initial selectors
        a7.ui.setSelector( 'anonDiv', "div[name='anon']" );
        a7.ui.setSelector('secureDiv', "div[name='secure']");

        app.main.run(state.secure);
      },

      run: function(secure) {
        // render the login form
        a7.ui.register( app.components.LoginForm( { id: 'loginForm', selector: "div[name='anon']" } ) );

        var user = a7.model.get("a7.user");

        a7.ui.register( app.components.Header( { id: 'header', user: user, selector: "div[name='header']" } ) );

        a7.ui.register( app.components.Todo( {
          id: 'todo',
          todoList: app.components.TodoList( { id: 'todoList', items: [], selector: "div[data-id='todoList']" } ),
          selector: "div[name='app']"
        } ) );

        if( secure ){
          a7.events.publish( "task.getAll", { view: a7.ui.getView( 'todo' ) } );
        }
        app.ui.setLayout(secure);
      }
    };
  })(),

  auth: (function() {
    "use strict";

    var _authenticate = function() {
      var promise = new Promise(function(resolve, reject) {
        // check whether user is authenticated
        a7.security.isAuthenticated(resolve, reject);
      });

      promise.then(function(secure) {
        a7.ui.views['header'].setState( { user: a7.model.get( "a7.user" ) } );

        app.ui.setLayout(secure);
      });
    };

		var _logout;

    return {
      authenticate: _authenticate,
      loginHandler: function(json) {
        if( json.success ){
          a7.ui.views['header'].setState( { user: a7.model.get( "a7.user" ) } );
          a7.events.publish( "task.getAll", { view: a7.ui.getView( 'todo' ) } );
        }
        app.ui.setLayout(json.success);
      }
    };
  })(),
  components: (function() {

    function Todo(props) {
      var todo = a7.components.Constructor(a7.components.View, [props], true);
      todo.state = {
        text: "",
				dateDue: ""
      };

      todo.template = function() {
        return `<div name="todoForm">
				<h3>tasks</h3>
				<div data-id="todoList"></div>
				<form>
					<div class="row">
						<div class="col w10 bold">Task</div>
						<div class="col w10 bold">Date Due</div>
						<div class="col w10"></div>
					</div>
					<div class="row">
						<div class="col w10"><input name="taskInput" value="${todo.state.text}" data-onchange="changeTodoInput"  type="text" /> </div>
						<div class="col w10"><input name="dateDue" value="${todo.state.dateDue}" data-onchange="changeDateDue" size="8" type="date" /> </div>
						<div class="col w10"><button name="taskSubmit" data-onclick="clickSubmit">Add ${todo.props.todoList.state.items.length + 1}</button></div>
					</div>
				</form>
				</div>`;
      }

      todo.eventHandlers = {
        changeTodoInput: function(event) {
          todo.state.text = event.target.value;
        },
				changeDateDue: function(event){
					todo.state.dateDue = event.target.value;
				},
        clickSubmit: function(event) {
          event.preventDefault();
          var args = { taskName: todo.state.text, dateDue: todo.state.dateDue, view: todo };
          todo.setState( { text: "", dateDue: "" } );
	        a7.events.publish( "task.create", args );
        }
      };

      return todo;
    }

    function TodoList(props) {
      var todolist = a7.components.Constructor(a7.components.View, [props], true);
      todolist.state = {
        items: props.items
      };

      todolist.template = function() {
  			var str = `<div class="row">
  				<div class="col w10 bold">Task</div>
  				<div class="col w10 bold">Date Due</div>
  				<div class="col w5 bold centered">Complete</div>
  				<div class="col w5 bold centered">Delete</div>
  			</div>
  			<div id="taskList">`;

  			this.state.items.forEach(function(item) {
  				str += `<div class="row task" data-id="${item.taskID}">
  					<div class="col w10">${item.taskName}</div>
  					<div class="col w10">${item.dateDue}</div>
  					<div class="col w5 centered"><input name="complete" type="checkbox" value="${item.taskID}" data-date="${item.dateCompleted}" data-onclick="completeTask"/>${item.dateCompleted}</div>
  					<div class="col w5 centered"><input name="delete" type="checkbox" value="${item.taskID}" data-onclick="deleteTask"/></div>
  				</div>`;
  			});

  			str += `</div>`;
        return str;
      };

      todolist.on( "rendered", function(){
        var taskRows = document.querySelectorAll( "#taskList div.task" );
        taskRows.forEach( function( row ){
          var completed = document.querySelector("input[name='complete'][value='" + row.getAttribute( 'data-id' ) + "']" );
          if( completed.getAttribute('data-date').length > 0 ){
            row.className += ' completedTask';
            completed.style.display = 'none';
          }
        });
      });

			todolist.eventHandlers = {
				completeTask: function( event ){
					var task = todolist.state.items.find( function( obj, idx ){
						if( obj.taskID == event.target.value ){
							obj.complete = true;
							return true;
						}
					});
					a7.events.publish( "task.update", { task: task, view: todolist });
				},
				deleteTask: function( event ){
					var task = todolist.state.items.find( function( obj, idx ){
						if( obj.taskID == event.target.value ){
							return true;
						}
					});
					a7.events.publish( "task.delete", { task: task, view: todolist });
				}
			};

      return todolist;
    }

    function LoginForm(props) {
      var loginform = a7.components.Constructor(a7.components.View, [props], true);
      loginform.state = {
        username: "",
        password: ""
      };
      loginform.template = `<div name="loginDiv" class="pane" style="width:370px;">
						<div class="right-align">
							<div class="col md right-align"><label for="username">Username</label></div>
							<div class="col md"><input name="username" type="text" data-onchange="handleUsername"/></div>
						</div>
						<div class="right-align">
							<div class="col md right-align"><label for="password">Password</label></div>
							<div class="col md"><input name="password" type="password" data-onchange="handlePassword"/></div>
						</div>
						<div class="right-align">
							<div class="col md"></div>
							<div class="col md"><input name="login" type="button" value="Login" data-onclick="handleClick"/></div>
						</div>
					</div>
					<p>
						<h3>Instructions</h3>
					</p>
					<p>
						Login using the credentials:
					</p>
					<p>
						&nbsp;&nbsp;username : user
					</p>
					<p>
						&nbsp;&nbsp;password: password
					</p>`;

      loginform.eventHandlers = {
        handleClick: function(event) {
          a7.events.publish('auth.login', {
            username: loginform.state.username,
            password: loginform.state.password,
            callback: app.auth.loginHandler
          });
        },
        handleUsername: function(event) {
          loginform.state.username = event.target.value;
        },
        handlePassword: function(event) {
          loginform.state.password = event.target.value;
        }
      };

      return loginform;
    }

    function Header(props) {
      var header = a7.components.Constructor(a7.components.View, [props], true);

      header.state = {
        user: props.user
      };

			header.eventHandlers = {
				logout: function(){
					a7.events.publish( 'auth.logout', { callback: function(){
            //
            a7.model.set( "tasks", [] );
            a7.ui.getView( "todoList" ).setState( { items: [] } );
            app.auth.authenticate();
          }}) ;
				}
			};

      header.template = function(){
				return `Welcome, ${header.state.user.firstName} <a name="signout" data-onclick="logout">[ Sign out ]</a>`;
			};
      return header;
    }

    return {
      Todo: Todo,
      TodoList: TodoList,
      LoginForm: LoginForm,
      Header: Header
    };

  })(),
  remote: {
	  task: {
	    getAll: function( obj ){
	      var params = { method: 'GET' };
				var promise = a7.remote.fetch( "/tasks", params, true );

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
              obj.view.props.todoList.setState( { items: a7.model.get( "tasks" ) } );
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

				var promise = a7.remote.fetch( "/task", params, true );

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
	          // set the state of any view that was passed in
	          if( obj.view !== undefined ){
	            obj.view.props.todoList.setState( { items: a7.model.get( "tasks" ) } );
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

				var promise = a7.remote.fetch( "/task/" + obj.task.taskID, params, true );

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
              obj.view.setState( { items: a7.model.get( "tasks" ) } );
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

 				var promise = a7.remote.fetch( "/task/" + obj.task.taskID, params, true );

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
              obj.view.setState( { items: a7.model.get( "tasks" ) } );
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
	          a7.log.trace( obj.view );
	          // set the state of any view that was passed in
	          if( obj.view !== undefined ){
	            obj.view.setState( { items: a7.model.get( "tasks" ) } );
	          }
	        });
	    },
	  }
	},
  ui: (function() {
    "use strict";

    return {
      //	templates: _templates,
      setLayout: function(secure) {
        a7.ui.getNode( secure ? a7.ui.selectors['secureDiv'] : a7.ui.selectors['anonDiv'] ).style.display = 'block';
        a7.ui.getNode(!secure ?  a7.ui.selectors['secureDiv'] :  a7.ui.selectors['anonDiv'] ).style.display = 'none';
      }
    };
  })(),
	utils: {
	  formatDate: function( dateString ){
	    var date = new Date( dateString );
	    return ( date.getMonth() + 1 ) + "/" + date.getDate() + "/" + date.getFullYear();
	  }
	}
};

a7.events.subscribe("task.getAll", function( obj ) {
  a7.remote.invoke("task.getAll", obj );
});

a7.events.subscribe( "task.create", function( obj ){
    a7.remote.invoke("task.create", obj );
});

a7.events.subscribe( "task.update", function( obj ){
    a7.remote.invoke("task.update", obj );
});

a7.events.subscribe( "task.delete", function( obj ){
    a7.remote.invoke("task.delete", obj );
});

export var application = function init(){
	var
		options = {
			console: {
				enabled: true,
				container: floatingpane,
        left: 700
			},
			logging: {
				logLevel: "INFO,ERROR,FATAL,TRACE"
			},
			remote: {
				modules: app.remote,
			  loginURL: "/auth/login",
				logoutURL: "/auth/logout",
			  refreshURL: "/auth/refresh",
				useTokens: true // defaults to true for the auth system
			}
		};
	var p = new Promise(function(resolve,
		reject) {
		a7.init(options, resolve, reject);
	});
	p.then(function(state) {
		app.main.init(state);
	});
	p['catch'](function(message) {
		console.log(
			"Something went wrong.");
	});
}
