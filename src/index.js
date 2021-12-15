import './style.css';
import "@fontsource/lato";
import { format } from 'date-fns';
import { renderProjects, renderTasks } from './render.js'

const addProjectForm = document.querySelector('.add-new-project')
const addTaskForm = document.querySelector('.add-new-task')
const projectNameInput = document.querySelector('.project-name')
const titleInput = document.querySelector('.title')
const priorityInput = document.querySelector('.priority')
const duedateInput = document.querySelector('.due-date')

export const projects = [
    {
        id: '1',
        name: 'gym',
        tasks: [
            {
            id: '22',
            title: 'lifting',
            priority: 'low',
            duedate: '12-2',
            notes: '',
        },
        {
            id: '23',
            title: 'fres',
            priority: 'fs2',
            duedate: '12-2',
            notes: '',
        },
        ],
    },
    {
        id: '2',
        name: 'grocery',
        tasks: [],
    },
];

function createProject(name) {
    return {
        id: Date.now().toString(),
        name,
        tasks: [],
    };
}

function createTask(title, priority, duedate) {
    return {
        id: Date.now().toString(),
        title,
        priority,
        duedate,
        notes: '',
    };
}

addProjectForm.addEventListener('submit', e => {
    e.preventDefault()
    const name = projectNameInput.value
    if (name == null || name == '') return
    const project = createProject(name)
    projects.push(project)
    renderProjects()
    projectNameInput.value = null
})

addTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = titleInput.value
    const priority = priorityInput.value
    const duedate = duedateInput.value
    const task = createTask(title, priority, duedate)
    const currentProject = projects.find(project => project.id === '2')
    currentProject.tasks.push(task)
    renderTasks(currentProject)
    titleInput.value = null
    priorityInput.selectedIndex = 0
    duedateInput.value = null
})
