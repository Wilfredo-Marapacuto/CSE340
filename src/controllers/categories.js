import { body, validationResult } from 'express-validator';

import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    createCategory,
    updateCategory,
    getCategoriesByServiceProjectId,
    updateCategoryAssignments
} from '../models/categories.js';

import {
    getProjectDetails
} from '../models/projects.js';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage(
            'Category name must be between 3 and 100 characters'
        )
];

const showCategoriesPage = async (req, res, next) => {

    try {

        const categories = await getAllCategories();

        const title = 'Service Categories';

        res.render('categories', {
            title,
            categories
        });

    } catch (err) {

        next(err);

    }
};

const showCategoryDetailsPage = async (req, res, next) => {

    try {

        const categoryId = req.params.id;

        const category =
            await getCategoryDetails(categoryId);

        if (!category) {

            const err = new Error('Category Not Found');

            err.status = 404;

            return next(err);
        }

        const projects =
            await getProjectsByCategoryId(categoryId);

        const title = 'Category Details';

        res.render('category', {
            title,
            category,
            projects
        });

    } catch (err) {

        next(err);

    }
};

const showNewCategoryPage = async (req, res, next) => {

    try {

        const title = 'Add New Category';

        res.render('new-category', {
            title
        });

    } catch (err) {

        next(err);

    }
};

const createNewCategory = async (req, res, next) => {

    try {

        const results = validationResult(req);

        if (!results.isEmpty()) {

            results.array().forEach((error) => {

                req.flash(
                    'error',
                    error.msg
                );

            });

            return res.redirect('/new-category');
        }

        const { name } = req.body;

        const categoryId =
            await createCategory(name);

        req.flash(
            'success',
            'Category created successfully!'
        );

        res.redirect(`/category/${categoryId}`);

    } catch (err) {

        next(err);

    }
};

const showEditCategoryPage = async (req, res, next) => {

    try {

        const categoryId = req.params.id;

        const category =
            await getCategoryDetails(categoryId);

        if (!category) {

            const err = new Error('Category Not Found');

            err.status = 404;

            return next(err);
        }

        const title = 'Edit Category';

        res.render('edit-category', {
            title,
            category
        });

    } catch (err) {

        next(err);

    }
};

const updateExistingCategory = async (req, res, next) => {

    try {

        const results = validationResult(req);

        if (!results.isEmpty()) {

            results.array().forEach((error) => {

                req.flash(
                    'error',
                    error.msg
                );

            });

            return res.redirect(
                `/edit-category/${req.params.id}`
            );
        }

        const categoryId = req.params.id;

        const { name } = req.body;

        await updateCategory(
            categoryId,
            name
        );

        req.flash(
            'success',
            'Category updated successfully!'
        );

        res.redirect(`/category/${categoryId}`);

    } catch (err) {

        next(err);

    }
};

const showAssignCategoriesForm = async (
    req,
    res,
    next
) => {

    try {

        const projectId =
            req.params.projectId;

        const projectDetails =
            await getProjectDetails(
                projectId
            );

        const categories =
            await getAllCategories();

        const assignedCategories =
            await getCategoriesByServiceProjectId(
                projectId
            );

        const title =
            'Assign Categories to Project';

        res.render(
            'assign-categories',
            {
                title,
                projectId,
                projectDetails,
                categories,
                assignedCategories
            }
        );

    } catch (err) {

        next(err);

    }
};

const processAssignCategoriesForm = async (
    req,
    res,
    next
) => {

    try {

        const projectId =
            req.params.projectId;

        const selectedCategoryIds =
            req.body.categoryIds || [];

        const categoryIdsArray =
            Array.isArray(
                selectedCategoryIds
            )
                ? selectedCategoryIds
                : [selectedCategoryIds];

        await updateCategoryAssignments(
            projectId,
            categoryIdsArray
        );

        req.flash(
            'success',
            'Categories updated successfully.'
        );

        res.redirect(
            `/project/${projectId}`
        );

    } catch (err) {

        next(err);

    }
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryPage,
    createNewCategory,
    showEditCategoryPage,
    updateExistingCategory,
    categoryValidation,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};