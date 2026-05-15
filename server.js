import 'dotenv/config';

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.get('/', async (req, res) => {

    const title = 'Home';

    res.render('home', {
        title
    });
});

app.get('/organizations', async (req, res) => {

    const organizations = await getAllOrganizations();

    const title = 'Our Partner Organizations';

    res.render('organizations', {
        title,
        organizations
    });
});

app.get('/projects', async (req, res) => {

    const projects = await getAllProjects();

    const title = 'Service Projects';

    res.render('projects', {
        title,
        projects
    });
});

app.get('/categories', async (req, res) => {

    const categories = await getAllCategories();

    const title = 'Service Categories';

    res.render('categories', {
        title,
        categories
    });
});

app.listen(PORT, async () => {

    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);

    await testConnection();
});

process.stdin.resume();