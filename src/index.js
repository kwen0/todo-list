import './style.css';
import "@fontsource/lato";
import { renderProjects, renderSelectedProject, renderTasks } from './render.js'
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
            duedate: '2021-12-23',
            notes: 'test',
        },
        {
            title: 'Romanian Deadlifts',
            priority: 'High',
            duedate: '2021-12-30',
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
            duedate: '2021-12-29',
            notes: '',
        },
        {
            title: 'Complete weekly report',
            priority: 'Low',
            duedate: '2021-12-20',
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
    }
}

addProjectForm.addEventListener('submit', e => addProject(e))
addTaskForm.addEventListener('submit', e => addTask(e))
deleteProjectBtn.addEventListener('click', e => deleteProject())
projectsContainer.addEventListener('click', e => renderSelectedProject(e))

// default
renderProjects()
renderTasks(projects[0])
const lists = document.querySelectorAll('ul')
lists[0].classList.add('current-project')