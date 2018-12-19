
a7.events.subscribe("task.getAll", function( obj ) {
  a7.remote.invoke("task.getAll", obj );
});

a7.events.subscribe( "task.create", function( obj ){
    a7.remote.invoke("task.create", obj );
});

a7.events.subscribe( "task.update", function( obj ){
    a7.remote.invoke("task.update", obj );
});

a7.events.subscribe( "task.delete", function( obj ){
    a7.remote.invoke("task.delete", obj );
});
