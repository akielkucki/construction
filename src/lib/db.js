// lib/db.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Singleton to maintain a single database connection
let db = null;

async function getDb() {
    if (!db) {
        db = await open({
            filename: './portfolio.db',
            driver: sqlite3.Database
        });
    }
    return db;
}

// Initialize database and create tables
async function initializeDatabase() {
    const db = await getDb();

    // Create projects table
    await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      src TEXT NOT NULL,
      name TEXT NOT NULL,
      logo TEXT,
      description TEXT,
      class_name TEXT,
      about_description TEXT
    );
  `);

    // Create tags table
    await db.exec(`
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL
    );
  `);

    // Create project_tags junction table
    await db.exec(`
    CREATE TABLE IF NOT EXISTS project_tags (
      project_id INTEGER,
      tag_id INTEGER,
      FOREIGN KEY (project_id) REFERENCES projects (id),
      FOREIGN KEY (tag_id) REFERENCES tags (id),
      PRIMARY KEY (project_id, tag_id)
    );
  `);

    // Create project_images table
    await db.exec(`
    CREATE TABLE IF NOT EXISTS project_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      src TEXT NOT NULL,
      alt TEXT,
      hover_title TEXT,
      hover_subtitle TEXT,
      FOREIGN KEY (project_id) REFERENCES projects (id)
    );
  `);
}

// Function to insert a new project
async function insertProject(projectData) {
    const db = await getDb();

    // Insert project
    const result = await db.run(`
    INSERT INTO projects (
      src, name, logo, description, class_name, about_description
    ) VALUES (?, ?, ?, ?, ?, ?)
  `, [
        projectData.src,
        projectData.name,
        projectData.logo,
        projectData.description,
        projectData.className,
        projectData.page.about
    ]);

    const projectId = result.lastID;

    // Insert tags
    for (const tag of projectData.info.tags) {
        // Insert tag if it doesn't exist
        const tagResult = await db.run(
            'INSERT OR IGNORE INTO tags (category) VALUES (?)',
            [tag.category]
        );

        // Get tag ID
        const tagRow = await db.get(
            'SELECT id FROM tags WHERE category = ?',
            [tag.category]
        );

        // Create project-tag relationship
        await db.run(
            'INSERT INTO project_tags (project_id, tag_id) VALUES (?, ?)',
            [projectId, tagRow.id]
        );
    }

    // Insert images
    for (const image of projectData.page.images) {
        await db.run(`
      INSERT INTO project_images (
        project_id, src, alt, hover_title, hover_subtitle
      ) VALUES (?, ?, ?, ?, ?)
    `, [
            projectId,
            image.src,
            image.alt,
            image.hoverTitle,
            image.hoverSubtitle
        ]);
    }

    return projectId;
}

// Function to get a project by ID with all related data
async function getProject(id) {
    const db = await getDb();

    // Get project data
    const project = await db.get('SELECT * FROM projects WHERE id = ?', [id]);

    if (!project) return null;

    // Get project tags
    const tags = await db.all(`
    SELECT t.category
    FROM tags t
    JOIN project_tags pt ON t.id = pt.tag_id
    WHERE pt.project_id = ?
  `, [id]);

    // Get project images
    const images = await db.all(`
    SELECT src, alt, hover_title as hoverTitle, hover_subtitle as hoverSubtitle
    FROM project_images
    WHERE project_id = ?
  `, [id]);

    // Construct full project object
    return {
        id: project.id,
        src: project.src,
        name: project.name,
        logo: project.logo,
        description: project.description,
        className: project.class_name,
        info: {
            description: project.description,
            tags: tags.map(t => ({ category: t.category })),
        },
        page: {
            about: project.about_description,
            images: images,
        }
    };
}

// Function to get all projects
async function getAllProjects() {
    const db = await getDb();
    const projects = await db.all('SELECT id FROM projects');
    return Promise.all(projects.map(p => getProject(p.id)));
}

export {
    initializeDatabase,
    insertProject,
    getProject,
    getAllProjects
};