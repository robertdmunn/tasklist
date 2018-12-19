app.components = ( function(){

  function Todo( props ){
    this.config( props );
    this.state = { text : "", dateDue: "", items: [] };
    this.render();
  }

  Todo.prototype = {
    config : function( props ){
      this.selector = props.selector;
    },

    render: function(){
      this.selector.innerHTML = a7.ui.render( "taskForm", { text : this.state.text, dateDue: this.state.dateDue, next : this.state.items.length + 1, items :  this.state.items }, { taskList : a7.ui.getTemplate( "taskList" ) } );
      var taskRows = document.querySelectorAll( "#taskList div.task" );
      taskRows.forEach( function( row ){
        var completed = document.querySelector("input[name='complete'][value='" + row.getAttribute( 'data-id' ) + "']" );
        if( completed.getAttribute('data-date').length > 0 ){
          row.className += ' completedTask';
          completed.style.display = 'none';
        }
      });
      this.taskSelector = document.querySelector( "div[name='taskForm']" );
      this.inputSelector = document.querySelector( "input[name='taskInput']" );
      this.dateDueSelector = document.querySelector( "input[name='dateDue']" );
      this.buttonSelector = document.querySelector( "button[name='taskSubmit']" );
      this.completedSelectors = document.querySelectorAll( "input[name='complete']" );
      this.deleteSelectors = document.querySelectorAll( "input[name='delete']" );
      this.setEventHandlers();
    },

    setEventHandlers : function(){
      var self = this;
      this.inputSelector.addEventListener( "change", function( event ){
        self.state.text = event.target.value;
      });
      this.dateDueSelector.addEventListener( "change", function( event ){
        self.state.dateDue = event.target.value;
      });
      this.buttonSelector.addEventListener( "click", function( event ){
        event.preventDefault();

        a7.events.publish( "task.create", { taskName: self.state.text, dateDue: self.state.dateDue, view: self } );
      });
      if( this.completedSelectors.length > 0 ){
        this.completedSelectors.forEach( function( sel ){
          sel.addEventListener( "click", function( event ){
            var task = self.state.items.find( function( obj, idx ){
              if( obj.taskID == event.target.value ){
                obj.complete = true;
                return true;
              }
            });
            a7.events.publish( "task.update", { task: task, view: self });
          });
        });
      }
      if( this.deleteSelectors.length > 0 ){
        this.deleteSelectors.forEach( function( sel ){
          sel.addEventListener( "click", function( event ){
            var task = self.state.items.find( function( obj, idx ){
              if( obj.taskID == event.target.value ){
                return true;
              }
            });
            a7.events.publish( "task.delete", { task: task, view: self });
          });
        });
      }
    }
  };


  return{
    Todo : Todo
  };

}());
