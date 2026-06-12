import 'dotenv/config';

import express from 'express';
import session from 'express-session';
import { fileURLToPath } from 'url';
import path from 'path';

import flash from './src/middleware/flash.js';
import { testConnection } from './src/models/db.js';
import router from './src/routes.js';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const SESSION_SECRET = process.env.SESSION_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/*
 * Session Management
 */
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60 * 60 * 1000
        }
    })
);

/*
 * Flash Messages
 */
app.use(flash);

/*
 * Middleware for POST requests
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

app.use((req, res, next) => {

    res.locals.isLoggedIn = false;

    if (
        req.session &&
        req.session.user
    ) {

        res.locals.isLoggedIn = true;

    }

    res.locals.user =
        req.session.user || null;

    res.locals.NODE_ENV = NODE_ENV;

    next();
});

app.use(router);

app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    const context = {
        title: status === 404
            ? 'Page Not Found'
            : 'Server Error',
        error: err.message,
        stack: err.stack
    };

    res.status(status).render(
        `errors/${template}`,
        context
    );
});

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);

    await testConnection();
});

process.stdin.resume();