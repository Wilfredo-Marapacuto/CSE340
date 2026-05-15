DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project_category_project
        FOREIGN KEY (project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_project_category_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
(1, 'Neighborhood Park Repair', 'Repair benches, repaint playground equipment, and clean walking paths.', 'Provo City Park', '2026-05-20'),
(1, 'Community Center Painting', 'Paint interior rooms and improve the appearance of the community center.', 'Orem Community Center', '2026-05-22'),
(1, 'Sidewalk Safety Project', 'Help identify and repair small sidewalk hazards in a residential area.', 'Downtown Provo', '2026-05-25'),
(1, 'School Garden Build', 'Build raised garden beds for a local elementary school.', 'Wasatch Elementary School', '2026-05-27'),
(1, 'Home Repair Assistance', 'Assist elderly residents with minor home repairs and cleanup.', 'Provo Neighborhood Homes', '2026-05-30'),

(2, 'Urban Garden Planting', 'Plant vegetables and herbs in a neighborhood garden.', 'GreenHarvest Garden Lot', '2026-06-02'),
(2, 'Food Sustainability Workshop', 'Help organize a workshop about growing food at home.', 'Provo Library', '2026-06-04'),
(2, 'Farmers Market Support', 'Assist with setting up booths and distributing educational materials.', 'Orem Farmers Market', '2026-06-07'),
(2, 'Composting Education Day', 'Teach families how to begin composting at home.', 'GreenHarvest Learning Center', '2026-06-10'),
(2, 'Community Harvest Day', 'Harvest produce and prepare donations for local families.', 'Urban Farm Site', '2026-06-12'),

(3, 'Local Food Drive', 'Collect and sort donated food for families in need.', 'UnityServe Warehouse', '2026-06-15'),
(3, 'Charity Clothing Sort', 'Sort donated clothing and prepare it for distribution.', 'Provo Donation Center', '2026-06-17'),
(3, 'Senior Support Visits', 'Visit senior residents and assist with simple household tasks.', 'Orem Senior Living Center', '2026-06-20'),
(3, 'Community Tutoring Night', 'Help students with homework and basic study skills.', 'UnityServe Volunteer Center', '2026-06-22'),
(3, 'Emergency Kit Assembly', 'Assemble emergency preparedness kits for local families.', 'Provo Stake Center', '2026-06-25');

INSERT INTO category (name)
VALUES
('Community Service'),
('Environment'),
('Education'),
('Health and Wellness');

INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 2),
(5, 1),

(6, 2),
(7, 3),
(8, 2),
(9, 3),
(10, 2),

(11, 1),
(12, 1),
(13, 4),
(14, 3),
(15, 4);

SELECT * FROM organization;
SELECT * FROM project;
SELECT * FROM category;
SELECT * FROM project_category;