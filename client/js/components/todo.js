import {a7} from '/lib/altseven/dist/a7.js';
import {TodoList} from '/js/components/todolist.js';

export var Todo = function Todo(props) {
  var todo = a7.components.Constructor(a7.components.View, [props], true);
  todo.state = {
    text: "",
		dateDue: ""
  };

  TodoList( { id: 'todoList', parentID: todo.props.id, items: [], selector: "div[data-id='todoList']" } )

  // set the defaults
  a7.model.set( "todo", todo.state );

  todo.template = function() {
    return `<div name="todoForm">
		<h3>tasks</h3>
		<div data-id="todoList"></div>
		<form>
			<div class="row">
				<div class="col w30 bold">Task</div>
				<div class="col w10 bold">Date Due</div>
				<div class="col w10"></div>
			</div>
			<div class="row">
				<div class="col w30"><input name="taskInput" value="${todo.state.text}" data-onchange="changeTodoInput"  type="text" /> </div>
				<div class="col w10"><input name="dateDue" value="${todo.state.dateDue}" data-onchange="changeDateDue" size="8" type="date" /> </div>
				<div class="col w10"><button name="taskSubmit" data-onclick="clickSubmit">Add ${todo.children.todoList.state.items.length + 1}</button></div>
			</div>
		</form>
		</div>`;
  }

  todo.eventHandlers = {
    changeTodoInput: function(event) {
      var todoData = a7.model.get( "todo" );
      todoData.text = event.target.value;
      a7.model.set( "todo", todoData );
    },
		changeDateDue: function(event){
      var todoData = a7.model.get( "todo" );
      todoData.dateDue = event.target.value;
      a7.model.set( "todo", todoData );
		},
    clickSubmit: function(event) {
      event.preventDefault();
      var args = a7.model.get( "todo" );
      a7.model.set( "todo",  { text: "", dateDue: "" } );
      todo.setState( a7.model.get( "todo" ) );
      a7.events.publish( "task.create", args );
    }
  };

  return todo;
}
