import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

import {
    getUserByEmail,
    createUser,
    authenticateUser,
    getAllUsers
} from '../models/users.js';

import {
    getVolunteerProjectsByUserId
} from '../models/projects.js';

const registrationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),

    body('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Valid email is required'),

    body('password')
        .isLength({ min: 7 })
        .withMessage(
            'Password must be at least 7 characters long'
        )
];

const requireLogin = (
    req,
    res,
    next
) => {

    if (
        !req.session ||
        !req.session.user
    ) {

        req.flash(
            'error',
            'You must be logged in to access that page.'
        );

        return res.redirect('/login');
    }

    next();
};

const requireRole = (role) => {

    return (
        req,
        res,
        next
    ) => {

        if (
            !req.session ||
            !req.session.user
        ) {

            req.flash(
                'error',
                'You must be logged in to access this page.'
            );

            return res.redirect('/login');
        }

        if (
            req.session.user.role_name !== role
        ) {

            req.flash(
                'error',
                'You do not have permission to access this page.'
            );

            return res.redirect('/');
        }

        next();
    };
};

const showRegisterPage = async (
    req,
    res
) => {

    res.render(
        'register',
        {
            title: 'Register'
        }
    );
};

const showLoginPage = async (
    req,
    res
) => {

    res.render(
        'login',
        {
            title: 'Login'
        }
    );
};

const showDashboard = async (
    req,
    res,
    next
) => {

    try {

        const user = req.session.user;

        const volunteerProjects =
            await getVolunteerProjectsByUserId(
                user.user_id
            );

        res.render(
            'dashboard',
            {
                title: 'Dashboard',
                name: user.name,
                email: user.email,
                volunteerProjects
            }
        );

    } catch (err) {

        next(err);

    }
};

const showUsersPage = async (
    req,
    res,
    next
) => {

    try {

        const users =
            await getAllUsers();

        res.render(
            'users',
            {
                title: 'Registered Users',
                users
            }
        );

    } catch (err) {

        next(err);

    }
};

const processRegistration = async (
    req,
    res,
    next
) => {

    try {

        const errors =
            validationResult(req);

        if (!errors.isEmpty()) {

            errors.array().forEach(
                error => {

                    req.flash(
                        'error',
                        error.msg
                    );

                }
            );

            return res.redirect(
                '/register'
            );
        }

        const {
            name,
            email,
            password
        } = req.body;

        const existingUser =
            await getUserByEmail(email);

        if (existingUser) {

            req.flash(
                'error',
                'Email already registered'
            );

            return res.redirect(
                '/register'
            );
        }

        const passwordHash =
            await bcrypt.hash(
                password,
                10
            );

        await createUser(
            name,
            email,
            passwordHash
        );

        req.flash(
            'success',
            'Account created successfully'
        );

        res.redirect('/');

    } catch (err) {

        next(err);

    }
};

const processLoginForm = async (
    req,
    res
) => {

    const {
        email,
        password
    } = req.body;

    try {

        const user =
            await authenticateUser(
                email,
                password
            );

        if (user) {

            req.session.user = user;

            req.flash(
                'success',
                'Login successful!'
            );

            console.log(
                'User logged in:',
                user
            );

            return res.redirect('/dashboard');
        }

        req.flash(
            'error',
            'Invalid email or password.'
        );

        res.redirect('/login');

    } catch (error) {

        console.error(
            'Error during login:',
            error
        );

        req.flash(
            'error',
            'An error occurred during login.'
        );

        res.redirect('/login');
    }
};

const processLogout = async (
    req,
    res
) => {

    if (req.session.user) {

        delete req.session.user;

    }

    req.flash(
        'success',
        'Logout successful!'
    );

    res.redirect('/login');
};

export {
    showRegisterPage,
    showLoginPage,
    showDashboard,
    showUsersPage,
    processRegistration,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    registrationValidation
};