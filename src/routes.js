import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationPage,
    createOrganization,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryPage,
    createNewCategory,
    showEditCategoryPage,
    updateExistingCategory,
    categoryValidation,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';

import {
    showRegisterPage,
    showLoginPage,
    showDashboard,
    processRegistration,
    processLoginForm,
    processLogout,
    requireLogin,
    registrationValidation
} from './controllers/auth.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/register', showRegisterPage);

router.post(
    '/register',
    registrationValidation,
    processRegistration
);

router.get('/login', showLoginPage);

router.post(
    '/login',
    processLoginForm
);

router.get(
    '/logout',
    processLogout
);

router.get(
    '/dashboard',
    requireLogin,
    showDashboard
);

router.get('/organizations', showOrganizationsPage);

router.get('/new-organization', showNewOrganizationPage);

router.post(
    '/new-organization',
    organizationValidation,
    createOrganization
);

router.get(
    '/edit-organization/:id',
    showEditOrganizationForm
);

router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm
);

router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/projects', showProjectsPage);

router.get('/new-project', showNewProjectForm);

router.post(
    '/new-project',
    projectValidation,
    processNewProjectForm
);

router.get(
    '/edit-project/:id',
    showEditProjectForm
);

router.post(
    '/edit-project/:id',
    projectValidation,
    processEditProjectForm
);

router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', showCategoriesPage);

router.get('/new-category', showNewCategoryPage);

router.post(
    '/new-category',
    categoryValidation,
    createNewCategory
);

router.get(
    '/edit-category/:id',
    showEditCategoryPage
);

router.post(
    '/edit-category/:id',
    categoryValidation,
    updateExistingCategory
);

router.get('/category/:id', showCategoryDetailsPage);

router.get(
    '/assign-categories/:projectId',
    showAssignCategoriesForm
);

router.post(
    '/assign-categories/:projectId',
    processAssignCategoriesForm
);

router.get('/test-error', testErrorPage);

export default router;