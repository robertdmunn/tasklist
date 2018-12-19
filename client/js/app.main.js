var app = {
	main: (function() {
		"use strict";

		return {
			init: function( state ){
				// cache initial selectors from index.html
				a7.ui.setSelector( 'mainDiv', document.querySelector( "div[name='main']" ) );
				a7.ui.setSelector( 'app', document.querySelector( "div[name='app']" ) );

				app.main.run();
			},

			run : function( secure ){
				a7.ui.setView( 'todo', a7.components.Constructor( app.components.Todo, [ { selector : a7.ui.selectors[ 'app' ] } ], true ) );
				// retrieve the list of tasks
				a7.events.publish( "task.getAll", { view: a7.ui.getView( 'todo' ) } );
			}
		};
	})()
};
