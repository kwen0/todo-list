import { activateDeleteTaskBtn, activateEditTaskBtn } from './add-edit-del.js'
import { projects } from './index.js'

const taskTemplate = document.querySelector('.task-template')
const taskTable = document.querySelector('.task-table')
const projectsContainer = document.querySelector('.projects-container')
const projectName = document.querySelector('#project-name')
const tasksContainer = document.querySelector('.tasks-container')
const deleteProjectBtn = document.querySelector('.delete-project-btn')

export function renderProjects() {
    reset(projectsContainer)
    projects.forEach(project => {
        const projectUl = document.createElement('ul')
        projectUl.textContent = project.name
        projectsContainer.appendChild(projectUl)
    })
}

export function renderSelectedProject(e) {
    if (e.target.tagName === 'UL') {
        const previousProject = document.querySelector(".current-project")
        if (previousProject != null) previousProject.classList.remove("current-project")
        e.target.classList.add("current-project")
        const currentProject = projects.find(project => project.name === e.target.textContent)
        renderTasks(currentProject)
        tasksContainer.style.visibility = 'visible'
        deleteProjectBtn.style.visibility = 'visible'
    }
}

export function renderTasks(currentProject) {
    reset(taskTable)
    projectName.textContent = currentProject.name
    currentProject.tasks.forEach(task => { 
        const taskElement = document.importNode(taskTemplate.content, true)
        const title = taskElement.querySelector('#title')
        const priority = taskElement.querySelector('#priority')
        const duedate = taskElement.querySelector('#duedate')
        title.textContent = task.title
        priority.textContent = task.priority
        duedate.textContent = task.duedate
        taskTable.appendChild(taskElement)
    })
    activateEditTaskBtn()
    activateDeleteTaskBtn()
}

export function reset(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}