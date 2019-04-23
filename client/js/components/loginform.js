import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';

export var LoginForm = function LoginForm(props) {
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
          callback: auth.loginHandler
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
