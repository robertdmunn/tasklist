const secured = [
  /\/post\/[0-9]+/,
  /\/posts/,
  /\/post/,
  /\/task\/[0-9]+/,
  /\/tasks/,
  /\/task/,
  /\/user\/[0-9]+/,
  /\/users/,
  /\/user/,
  /\/auth\/refresh/,
];

const open = [
  /\/auth\/login/,
  /\/auth\/logout/
];

module.exports = {
  routes:{
    secured: secured,
    open: open
  },
  ttl: 30 // in minutes
}
