import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM project
        ORDER BY project_date;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM project
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

    const queryParams = [organizationId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM project p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1;
    `;

    const queryParams = [numberOfProjects];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (projectId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM project p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0
        ? result.rows[0]
        : null;
};

export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails
};
