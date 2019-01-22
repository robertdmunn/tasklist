
const shajs = require('sha.js');
let hash = new shajs.sha512().update( 'password' ).digest('hex');
console.log( hash );
