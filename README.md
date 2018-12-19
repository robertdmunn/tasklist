tasklist, and example app CRUD REST API app written using NodeJS on the server and the alt-seven JavaScript framework on the client.

alt-seven is a client-side framework I built last year while exploring ideas in JavaScript. It isn't feature-complete, but it does enough to write a trivial example app.

The application depends on several packages, some of which are alt-seven dependencies and some of which are dependencies of the NodeJS application. To run the application, you need to install the dependencies from both Bower and npm. (Yes, I know, not ideal. Sue me. :-) )

    $ bower install
    $ npm install

Then run the application from CLI:

$ node index.js

Open the application in your browser at:

http://127.0.0.1:4000/
