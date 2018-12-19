app.utils = {
  formatDate: function( dateString ){
    var date = new Date( dateString );
    return ( date.getMonth() + 1 ) + "/" + date.getDate() + "/" + date.getFullYear();
  }
}
