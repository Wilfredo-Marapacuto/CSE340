import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DB_URL
});

const db = {
    async query(text, params) {

        console.log('Executing query:', text);

        const result = await pool.query(text, params);

        console.log('Rows returned:', result.rows);

        return result;
    }
};

const testConnection = async () => {

    const result = await db.query('SELECT NOW()');

    console.log(
        'Database connection successful:',
        result.rows[0]
    );
};

export { testConnection };
export default db;