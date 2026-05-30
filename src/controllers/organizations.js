import {
    getAllOrganizations,
    getOrganizationDetails,
    addOrganization
} from '../models/organizations.js';

import {
    getProjectsByOrganizationId
} from '../models/projects.js';

const showOrganizationsPage = async (req, res, next) => {

    try {

        const organizations = await getAllOrganizations();

        const title = 'Our Partner Organizations';

        res.render('organizations', {
            title,
            organizations
        });

    } catch (err) {

        next(err);

    }
};

const showOrganizationDetailsPage = async (req, res, next) => {

    try {

        const organizationId = req.params.id;

        const organizationDetails =
            await getOrganizationDetails(organizationId);

        if (!organizationDetails) {

            const err = new Error('Organization Not Found');

            err.status = 404;

            return next(err);
        }

        const projects =
            await getProjectsByOrganizationId(organizationId);

        const title = 'Organization Details';

        res.render('organization', {
            title,
            organizationDetails,
            projects
        });

    } catch (err) {

        next(err);

    }
};

const showNewOrganizationPage = async (req, res) => {

    const title = 'Add New Organization';

    res.render('new-organization', {
        title
    });
};

const createOrganization = async (req, res, next) => {

    try {

        const {
            name,
            description,
            contactEmail
        } = req.body;

        const logoFilename = 'placeholder-logo.png';

        const organizationId = await addOrganization(
            name,
            description,
            contactEmail,
            logoFilename
        );

        req.flash(
            'success',
            'Organization added successfully!'
        );

        res.redirect(
            `/organization/${organizationId}`
        );

    } catch (err) {

        next(err);

    }
};

export {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationPage,
    createOrganization
};