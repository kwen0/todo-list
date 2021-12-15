export { renderProjects, renderTasks, reset }
import { projects } from './index.js'

const projectsContainer = document.querySelector('.projects-container')
const taskTemplate = document.querySelector('.task-template')
const taskTable = document.querySelector('.task-table')

function renderProjects() {
    reset(projectsContainer)
    projects.forEach(project => {
        const projectName = document.createElement('ul')
        projectName.textContent = project.name
        projectsContainer.appendChild(projectName)
    })
}

function renderTasks(currentProject) {
    reset(taskTable)
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
}

function reset(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}
