import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';

export var Header = function Header(props) {
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
        auth.authenticate();
      }}) ;
		}
	};

  header.template = function(){
		return `<div class="profileHeader">Welcome, ${header.state.user.firstName} <a name="signout" data-onclick="logout">[ Sign out ]</a></div>`;
	};
  return header;
}
