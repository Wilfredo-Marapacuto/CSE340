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
    showUsersPage,
    processRegistration,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
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

router.get(
    '/users',
    requireRole('admin'),
    showUsersPage
);

router.get('/organizations', showOrganizationsPage);

router.get(
    '/new-organization',
    requireRole('admin'),
    showNewOrganizationPage
);

router.post(
    '/new-organization',
    requireRole('admin'),
    organizationValidation,
    createOrganization
);

router.get(
    '/edit-organization/:id',
    requireRole('admin'),
    showEditOrganizationForm
);

router.post(
    '/edit-organization/:id',
    requireRole('admin'),
    organizationValidation,
    processEditOrganizationForm
);

router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/projects', showProjectsPage);

router.get(
    '/new-project',
    requireRole('admin'),
    showNewProjectForm
);

router.post(
    '/new-project',
    requireRole('admin'),
    projectValidation,
    processNewProjectForm
);

router.get(
    '/edit-project/:id',
    requireRole('admin'),
    showEditProjectForm
);

router.post(
    '/edit-project/:id',
    requireRole('admin'),
    projectValidation,
    processEditProjectForm
);

router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', showCategoriesPage);

router.get(
    '/new-category',
    requireRole('admin'),
    showNewCategoryPage
);

router.post(
    '/new-category',
    requireRole('admin'),
    categoryValidation,
    createNewCategory
);

router.get(
    '/edit-category/:id',
    requireRole('admin'),
    showEditCategoryPage
);

router.post(
    '/edit-category/:id',
    requireRole('admin'),
    categoryValidation,
    updateExistingCategory
);

router.get('/category/:id', showCategoryDetailsPage);

router.get(
    '/assign-categories/:projectId',
    requireRole('admin'),
    showAssignCategoriesForm
);

router.post(
    '/assign-categories/:projectId',
    requireRole('admin'),
    processAssignCategoriesForm
);

router.get('/test-error', testErrorPage);

export default router;