tasklist, and example app CRUD REST API app written using NodeJS on the server and the alt-seven JavaScript framework on the client.

alt-seven is a client-side JavaScript framework. You can see the framework at:

https://github.com/robertdmunn/altseven


v 0.5.0
========

This version of Tasklist updates the code to work with alteven v 5.1.0, which simplifies component lifecycle and configuration and contains many improvements over the previous version of altseven included with the application.


Installation
=============

The application depends on several packages, some of which are altseven dependencies and some of which are dependencies of the NodeJS application. To run the application, you need to install the dependencies from both Bower and npm.

    $ bower install
    $ npm install

To configure the database, create an empty database schema in MariaDB. Run /database/script.sql on the newly created database to create the tables you need. Then run:

     $ node hashpassword.js

Copy the console output and update the hash field of the users table with the hash value:

update users set hash = '&lt;hashvalue&gt;';


Make sure to update the name and username/password for the database in /config/dbconfig.js.

Then run the application from CLI:

    $ node index.js

Open the application in your browser at:

http://127.0.0.1:4000/
