import {a7} from '/lib/altseven/dist/a7.js';
import {Header} from '/js/components/header.js';
import {LoginForm} from '/js/components/loginform.js';
import {Todo} from '/js/components/todo.js';
import {TodoList} from '/js/components/todolist.js';
import {ui} from '/js/app.ui.js';

export var main = (function() {
  "use strict";

  return {
    init: function(state) {
      // cache initial selectors
      a7.ui.setSelector( 'anonDiv', "#anon" );
      a7.ui.setSelector( 'secureDiv', "#secure");
      a7.ui.setSelector( 'todo', "#todo" );
      this.run(state.secure);
    },

    run: function(secure) {
      // render the login form
      LoginForm( { id: 'loginForm', selector: a7.ui.selectors['anonDiv'] } );

      var user = a7.model.get("user");

      Header( { id: 'header', user: user, selector: "div[name='header']" } );

      Todo( {
        id: 'todo',
        selector: a7.ui.selectors['todo']
      } );

      if( secure ){
        a7.events.publish( "task.getAll", {} );
      }
      ui.setLayout(secure);
    }
  };
})();
