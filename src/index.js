import './style.css';
import "@fontsource/lato";
import { renderSelectedProject } from './render.js'
import { addProject, addTask, deleteProject } from './add-edit-del.js'

const addProjectForm = document.querySelector('.add-new-project')
const addTaskForm = document.querySelector('.add-new-task')
const deleteProjectBtn = document.querySelector('.delete-project-btn')
const projectsContainer = document.querySelector('.projects-container')

export const projects = [
    {
        name: 'Gym',
        tasks: [
            {
            title: 'Bulgarian Split Squats',
            priority: 'Low',
            duedate: '12/20/2021',
            notes: '',
        },
        {
            title: 'Romanian Deadlifts',
            priority: 'High',
            duedate: '12/30/2021',
            notes: '',
        },
        ],
    },
    {
        name: 'Work',
        tasks: [
            {
            title: 'Data entry',
            priority: 'Low',
            duedate: '12/23/2021',
            notes: '',
        },
        {
            title: 'Complete weekly report',
            priority: 'Low',
            duedate: '12/30/2021',
            notes: '',
        },
        ],
    },
];

export function createProject(name) {
    return {
        name,
        tasks: [],
    };
}

export function createTask(title, priority, duedate) {
    return {
        title,
        priority,
        duedate,
        notes: '',
    };
}

addProjectForm.addEventListener('submit', e => addProject(e))
addTaskForm.addEventListener('submit', e => addTask(e))
deleteProjectBtn.addEventListener('click', e => deleteProject())
projectsContainer.addEventListener('click', e => renderSelectedProject(e))

