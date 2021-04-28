const app = require('./app');

// Start server
app.listen(app.get('port'), () => {
    console.log(`App listening at http://localhost:${app.get('port')}`);
});

/* 
    VER:
    https://www.youtube.com/watch?v=jP2DNQyOE90&t=5275s
    WATCHING EXTENSIONS NODEMON:
    https://bluuweb.github.io/node/20-hbs/#nodemon-hbs
*/