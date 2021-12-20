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
    return { name, tasks: [], }
}

export function createTask(title, priority, duedate) {
    return { title, priority, duedate, notes: '', }
}

addProjectForm.addEventListener('submit', e => addProject(e))
addTaskForm.addEventListener('submit', e => addTask(e))
deleteProjectBtn.addEventListener('click', e => deleteProject())
projectsContainer.addEventListener('click', e => renderSelectedProject(e))
sortByPriority.addEventListener('click', e => sortPriority())
sortByDuedate.addEventListener('click', e => sortDuedate())

// default to-do list

export const projects = [
    {
        name: 'Misc',
        tasks: [
            {
            title: 'Buy ingredients for cake',
            priority: 'Low',
            duedate: '2022-12-23',
            notes: 'Eggs, flour, milk, cocoa',
        },
        {
            title: 'Schedule doctor\'s appointment',
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
            title: 'Zoom meeting with HR',
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
            title: 'Coordinate lunch and learn',
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
            title: 'Squat 225 lbs',
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
            duedate: '2021-12-24',
            notes: '',
        },
        ],
    },
]

renderProjects()
renderTasks(projects[1])
const lists = document.querySelectorAll('ul')
lists[1].classList.add('current-project')
