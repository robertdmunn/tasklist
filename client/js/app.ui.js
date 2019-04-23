import {a7} from '/lib/altseven/dist/a7.js';

export var ui = (function() {
  "use strict";

  return {
    //	templates: _templates,
    setLayout: function(secure) {
      a7.ui.getNode( secure ? a7.ui.selectors['secureDiv'] : a7.ui.selectors['anonDiv'] ).style.display = 'block';
      a7.ui.getNode(!secure ?  a7.ui.selectors['secureDiv'] :  a7.ui.selectors['anonDiv'] ).style.display = 'none';
      if( secure ){
        a7.ui.getNode( a7.ui.selectors['todo'] ).style.display='block';
      }
    }
  };
})();
