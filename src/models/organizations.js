import db from './db.js';

const getAllOrganizations = async () => {

    const query = `
        SELECT *
        FROM organization;
    `;

    console.log('Running organization query...');

    const result = await db.query(query);

    console.log('Organizations found:', result.rows);

    return result.rows;
};

export { getAllOrganizations };