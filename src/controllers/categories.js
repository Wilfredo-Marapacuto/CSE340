import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByServiceProjectId,
    updateCategoryAssignments
} from '../models/categories.js';

import {
    getProjectDetails
} from '../models/projects.js';

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
    showAssignCategoriesForm,
    processAssignCategoriesForm
};