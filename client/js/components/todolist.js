import {a7} from '/lib/altseven/dist/a7.js';

export var TodoList = function TodoList(props) {
  var todolist = a7.components.Constructor(a7.components.View, [props], true);
  todolist.state = {
    items: props.items
  };

  todolist.template = function() {
    var str = `<div class="row">
      <div class="col w30 bold">Task</div>
      <div class="col w10 bold">Date Due</div>
      <div class="col w5 bold centered">Complete</div>
      <div class="col w5 bold centered">Delete</div>
    </div>
    <div id="taskList">`;

    this.state.items.forEach(function(item) {
      str += `<div class="row task" data-id="${item.taskID}">
        <div class="col w30">${item.taskName}</div>
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
      a7.events.publish( "task.update", { task: task});
    },
    deleteTask: function( event ){
      var task = todolist.state.items.find( function( obj, idx ){
        if( obj.taskID == event.target.value ){
          return true;
        }
      });
      a7.events.publish( "task.delete", { task: task });
    }
  };

  return todolist;
}
