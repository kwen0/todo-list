import './style.css';
import "@fontsource/lato";
import { renderProjects, renderSelectedProject, renderTasks } from './render.js'
import { addProject, addTask, deleteProject, sortPriority, sortDuedate } from './add-edit-del.js'

const addProjectForm = document.querySelector('.add-new-project')
const addTaskForm = document.querySelector('.add-new-task')
const deleteProjectBtn = document.querySelector('.delete-project-btn')
const projectsContainer = document.querySelector('.projects-container')
const sortByPriority = document.querySelector('#sort-priority')
const sortByDuedate = document.querySelector('#sort-duedate')

export function createProject(name) {
    return { name, tasks: [] }
}

export function createTask(title, priority, duedate) {
    return { title, priority, duedate, notes: '' }
}

addProjectForm.addEventListener('submit', e => addProject(e))
addTaskForm.addEventListener('submit', e => addTask(e))
deleteProjectBtn.addEventListener('click', () => deleteProject())
projectsContainer.addEventListener('click', e => renderSelectedProject(e))
sortByPriority.addEventListener('click', () => sortPriority())
sortByDuedate.addEventListener('click', () => sortDuedate())

// default to-do list
export let projects = JSON.parse(localStorage.getItem('localStorageProjects')) || [
    {
        name: 'Misc',
        tasks: [
            {
                title: 'Buy ingredients for cake',
                priority: 'Low',
                duedate: '2022-02-20',
                notes: 'Eggs, flour, milk, cocoa',
            },
            {
                title: 'Schedule doctor\'s appointment',
                priority: 'High',
                duedate: '2022-01-25',
                notes: '',
            },
        ],
    },
    {
        name: 'Work',
        tasks: [
            {
                title: 'Schedule team meeting',
                priority: 'Low',
                duedate: '2021-12-29',
                notes: 'review notes from last week\'s meeting',
            },
            {
                title: 'Finish weekly sales report',
                priority: 'High',
                duedate: '2021-12-20',
                notes: '',
            },
            {
                title: 'Draft budget',
                priority: 'Med',
                duedate: '2021-12-24',
                notes: '',
            },
        ],
    },
    {
        name: 'Gym',
        tasks: [
            {
                title: 'Buy new running shoes',
                priority: 'Low',
                duedate: '2022-01-29',
                notes: '',
            },
            {
                title: 'Renew gym membership',
                priority: 'Med',
                duedate: '2022-02-01',
                notes: '',
            },
            {
                title: 'Work on hip mobility',
                priority: 'Med',
                duedate: '2022-02-20',
                notes: '',
            },
        ],
    },
]

let currentProject = JSON.parse(localStorage.getItem('localStorageCurrentProj')) || projects[0]
renderProjects()
renderTasks(currentProject)
const lists = document.querySelectorAll('ul')
lists.forEach(list => { if (list.innerHTML === currentProject.name) list.classList.add('current-project') })

