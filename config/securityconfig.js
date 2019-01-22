const secured = [
  '/task',
  '/task/',
  '/tasks',
  '/user',
  '/user/',
  '/users',
  '/auth/refresh'
];

const open = [
  '/auth/login',
  '/auth/logout'
];

module.exports = {
  routes:{
    secured: secured,
    open: open
  },
  ttl: 1800 // in seconds
}