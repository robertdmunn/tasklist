
import {a7} from '/lib/altseven/dist/a7.js';
import * as task from '/js/remote/task.js';
import * as utils from '/js/app.utils.js';
import {events} from '/js/app.events.js';
import {auth} from '/js/app.auth.js';
import {main} from '/js/app.main.js';
import {ui} from '/js/app.ui.js';

// you only need to import the floatingpane if you use it as the container for the console
//import {floatingpane} from '/lib/gadget-ui/dist/gadget-ui.es6.js';

var app = {
  main: main,
  auth: auth,
  remote: {
    task: task
	},
  ui: ui,
	utils: utils
};

//initialize pub/sub events
events();

export var application = function init(){
	var
		options = {
		/* 	console: {
				enabled: true,
				container: floatingpane,
        //wsServer: 'ws://127.0.0.1:8000',
        left: 700
			}, */
			logging: {
				logLevel: "INFO,ERROR,FATAL,TRACE",
        toBrowserConsole: true
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
