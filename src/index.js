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
const deleteProjectBtn = document.querySelector('.delete-project-btn')
const projectsContainer = document.querySelector('.projects-container')
const projectName = document.querySelector('#project-name')
const tasksContainer = document.querySelector('.tasks-container')
const deleteTaskBtn = document.querySelectorAll("#delete-task-btn")

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

function createProject(name) {
    return {
        name,
        tasks: [],
    };
}

function createTask(title, priority, duedate) {
    return {
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
    if (projects.find(project => project.name.toLowerCase() == name.toLowerCase()) != null) {
        alert (`You already have a project named ${name}!`)
        return
    }
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
    if (title == null || title == '') return
    const task = createTask(title, priority, duedate)
    const currentProject = projects.find(project => project.name === projectName.textContent)
    currentProject.tasks.push(task)
    renderTasks(currentProject)
    titleInput.value = null
    priorityInput.selectedIndex = 0
    duedateInput.value = null
})

deleteProjectBtn.addEventListener('click', e => {
    if (confirm("Are you sure you want to delete this project?")) {
        const currentProject = projects.find(project => project.name === projectName.textContent)
        projects.splice(projects.indexOf(currentProject), 1)
        renderProjects()
        tasksContainer.style.visibility = 'hidden'
        deleteProjectBtn.style.visibility = 'hidden'
    }
})

projectsContainer.addEventListener('click', e => {
    if (e.target.tagName === 'UL') {
        const currentProject = projects.find(project => project.name === e.target.textContent)
        renderTasks(currentProject)
        tasksContainer.style.visibility = 'visible'
        deleteProjectBtn.style.visibility = 'visible'
    }
})