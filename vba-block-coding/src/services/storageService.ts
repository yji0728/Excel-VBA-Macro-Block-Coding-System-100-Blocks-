/**
 * Storage Service
 * Handles saving and loading projects to/from localStorage
 */

import { Project, BlockInstance } from '../types/block';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY_PREFIX = 'vba-block-coding-';
const PROJECTS_LIST_KEY = `${STORAGE_KEY_PREFIX}projects-list`;

/**
 * Save a project to localStorage
 */
export const saveProject = (
  name: string,
  blocks: BlockInstance[],
  description?: string,
  existingProjectId?: string
): Project => {
  const now = new Date();
  
  const project: Project = {
    id: existingProjectId || uuidv4(),
    name,
    description,
    blocks: blocks.map(block => ({
      ...block,
      createdAt: new Date(block.createdAt),
      updatedAt: new Date(block.updatedAt)
    })),
    metadata: {
      tags: [],
      blockCount: blocks.length,
      codeLength: 0 // Can be calculated if needed
    },
    createdAt: existingProjectId ? getProjectById(existingProjectId)?.createdAt || now : now,
    updatedAt: now,
    version: '1.0'
  };

  // Save project data
  localStorage.setItem(
    `${STORAGE_KEY_PREFIX}project-${project.id}`,
    JSON.stringify(project)
  );

  // Update projects list
  const projectsList = getProjectsList();
  const existingIndex = projectsList.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    projectsList[existingIndex] = {
      id: project.id,
      name: project.name,
      blockCount: project.blocks.length,
      updatedAt: project.updatedAt
    };
  } else {
    projectsList.push({
      id: project.id,
      name: project.name,
      blockCount: project.blocks.length,
      updatedAt: project.updatedAt
    });
  }

  localStorage.setItem(PROJECTS_LIST_KEY, JSON.stringify(projectsList));

  return project;
};

/**
 * Load a project from localStorage
 */
export const loadProject = (projectId: string): Project | null => {
  const projectData = localStorage.getItem(`${STORAGE_KEY_PREFIX}project-${projectId}`);
  
  if (!projectData) {
    return null;
  }

  try {
    const project = JSON.parse(projectData);
    
    // Convert date strings back to Date objects
    project.createdAt = new Date(project.createdAt);
    project.updatedAt = new Date(project.updatedAt);
    project.blocks = project.blocks.map((block: any) => ({
      ...block,
      createdAt: new Date(block.createdAt),
      updatedAt: new Date(block.updatedAt)
    }));

    return project;
  } catch (error) {
    console.error('Error loading project:', error);
    return null;
  }
};

/**
 * Get a project by ID
 */
export const getProjectById = (projectId: string): Project | null => {
  return loadProject(projectId);
};

/**
 * Get list of all saved projects (metadata only)
 */
export const getProjectsList = (): Array<{
  id: string;
  name: string;
  blockCount: number;
  updatedAt: Date;
}> => {
  const listData = localStorage.getItem(PROJECTS_LIST_KEY);
  
  if (!listData) {
    return [];
  }

  try {
    const list = JSON.parse(listData);
    return list.map((item: any) => ({
      ...item,
      updatedAt: new Date(item.updatedAt)
    }));
  } catch (error) {
    console.error('Error loading projects list:', error);
    return [];
  }
};

/**
 * Delete a project
 */
export const deleteProject = (projectId: string): boolean => {
  try {
    // Remove project data
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}project-${projectId}`);

    // Update projects list
    const projectsList = getProjectsList();
    const updatedList = projectsList.filter(p => p.id !== projectId);
    localStorage.setItem(PROJECTS_LIST_KEY, JSON.stringify(updatedList));

    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

/**
 * Export project as JSON file
 */
export const exportProjectToFile = (project: Project): void => {
  const jsonString = JSON.stringify(project, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${project.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Import project from JSON file
 */
export const importProjectFromFile = (fileContent: string): Project | null => {
  try {
    const project = JSON.parse(fileContent);
    
    // Validate project structure
    if (!project.id || !project.name || !project.blocks) {
      throw new Error('Invalid project file format');
    }

    // Convert date strings to Date objects
    project.createdAt = new Date(project.createdAt);
    project.updatedAt = new Date(project.updatedAt);
    project.blocks = project.blocks.map((block: any) => ({
      ...block,
      createdAt: new Date(block.createdAt),
      updatedAt: new Date(block.updatedAt)
    }));

    // Generate new ID to avoid conflicts
    project.id = uuidv4();
    project.name = `${project.name} (가져오기)`;

    return project;
  } catch (error) {
    console.error('Error importing project:', error);
    return null;
  }
};

/**
 * Clear all projects (for testing)
 */
export const clearAllProjects = (): void => {
  const projectsList = getProjectsList();
  projectsList.forEach(project => {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}project-${project.id}`);
  });
  localStorage.removeItem(PROJECTS_LIST_KEY);
};
