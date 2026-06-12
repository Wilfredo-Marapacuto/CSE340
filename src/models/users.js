import bcrypt from 'bcrypt';
import db from './db.js';

const getUserByEmail = async (email) => {

    const query = `
        SELECT
            user_id,
            name,
            email,
            password_hash,
            role_id
        FROM users
        WHERE email = $1;
    `;

    const result = await db.query(
        query,
        [email]
    );

    return result.rows.length > 0
        ? result.rows[0]
        : null;
};

const createUser = async (
    name,
    email,
    passwordHash,
    roleId = 1
) => {

    const query = `
        INSERT INTO users (
            name,
            email,
            password_hash,
            role_id
        )
        VALUES (
            $1,
            $2,
            $3,
            $4
        )
        RETURNING user_id;
    `;

    const result = await db.query(
        query,
        [
            name,
            email,
            passwordHash,
            roleId
        ]
    );

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {

    const query = `
        SELECT
            u.user_id,
            u.name,
            u.email,
            u.password_hash,
            r.role_name
        FROM users u
        JOIN roles r
            ON u.role_id = r.role_id
        WHERE u.email = $1;
    `;

    const result = await db.query(
        query,
        [email]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

const verifyPassword = async (
    password,
    passwordHash
) => {

    return bcrypt.compare(
        password,
        passwordHash
    );
};

const authenticateUser = async (
    email,
    password
) => {

    const user =
        await findUserByEmail(email);

    if (!user) {
        return null;
    }

    const passwordValid =
        await verifyPassword(
            password,
            user.password_hash
        );

    if (!passwordValid) {
        return null;
    }

    delete user.password_hash;

    return user;
};

const getAllUsers = async () => {

    const query = `
        SELECT
            u.name,
            u.email,
            r.role_name
        FROM users u
        JOIN roles r
            ON u.role_id = r.role_id
        ORDER BY u.name;
    `;

    const result = await db.query(query);

    return result.rows;
};

export {
    getUserByEmail,
    createUser,
    authenticateUser,
    getAllUsers
};