import {a7} from '/lib/altseven/dist/a7.js';
import {ui} from '/js/app.ui.js';

export var auth = (function() {
  "use strict";

  var _authenticate = function() {
    var promise = new Promise(function(resolve, reject) {
      // check whether user is authenticated
      a7.security.isAuthenticated(resolve, reject);
    });

    promise.then(function(secure) {
      a7.ui.views['header'].setState( { user: a7.model.get( "user" ) } );

      ui.setLayout(secure);
    });
  };

  var _logout;

  return {
    authenticate: _authenticate,
    loginHandler: function(json) {
      if( json.success ){
        a7.ui.views['header'].setState( { user: a7.model.get( "user" ) } );
        a7.events.publish( "task.getAll", {} );
      }
      ui.setLayout(json.success);
    }
  };
})();
