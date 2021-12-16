export { renderProjects, renderTasks, reset }
import { projects } from './index.js'

const taskTemplate = document.querySelector('.task-template')
const taskTable = document.querySelector('.task-table')
const projectsContainer = document.querySelector('.projects-container')
const projectName = document.querySelector('#project-name')

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
    editTaskBtn()
    deleteTaskBtn()
}

function reset(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function editTaskBtn() {
    const editTaskBtn = document.querySelectorAll('#edit-task-btn')
    editTaskBtn.forEach(btn => {
        btn.addEventListener('click', e => {
            e.target.parentNode.parentNode.parentNode.childNodes[1].contentEditable = 'true'
        })
    })
}

function deleteTaskBtn() {
    const deleteTaskBtn = document.querySelectorAll('#delete-task-btn')
    deleteTaskBtn.forEach(btn => {
        btn.addEventListener('click', e => {
            const currentProject = projects.find(project => project.name === projectName.textContent)
            const currentTask = currentProject.tasks.find(task => task.title === e.target.parentNode.parentNode.parentNode.childNodes[1].textContent)
            currentProject.tasks.splice(currentProject.tasks.indexOf(currentTask), 1)
            e.target.parentNode.parentNode.parentNode.remove()
        })
    })
}