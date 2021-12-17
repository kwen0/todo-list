import { projects, createProject, createTask } from './index.js'
import { renderProjects, renderTasks } from './render.js'

const projectName = document.querySelector('#project-name')
const tasksContainer = document.querySelector('.tasks-container')
const deleteProjectBtn = document.querySelector('.delete-project-btn')

export function addProject(e) {
    e.preventDefault()
    const projectNameInput = document.querySelector('.project-name')
    const name = projectNameInput.value
    if (name == null || name == '') return
    if (projects.find(project => project.name.toLowerCase() == name.toLowerCase()) != null) {
        alert (`You already have a project named ${name}`) 
        return
    }
    const project = createProject(name)
    projects.push(project)
    renderProjects()
    projectNameInput.value = null
}

export function addTask(e) {
    e.preventDefault();
    const title = document.querySelector('.title').value
    const priority = document.querySelector('.priority').value
    const duedate = document.querySelector('.due-date').value
    if (title == null || title == '') return
    const task = createTask(title, priority, duedate)
    const currentProject = projects.find(project => project.name === projectName.textContent)
    currentProject.tasks.push(task)
    renderTasks(currentProject)
    document.querySelector('.title').value = null
    document.querySelector('.priority').selectedIndex = 0
    document.querySelector('.due-date').value = null
}

function editTaskBtn() {
    const editTaskBtn = document.querySelectorAll('#edit-task-btn')
    editTaskBtn.forEach(btn => {
        btn.addEventListener('click', e => {
            console.log('hi')
        })
    })
}

export function activateDeleteTaskBtn() {
    const deleteTaskBtn = document.querySelectorAll('#delete-task-btn')
    deleteTaskBtn.forEach(btn => {
        btn.addEventListener('click', e => {
            findAndDeleteTask(e);
        })
    })
}

function findAndDeleteTask(e) {
    const currentProject = projects.find(project => project.name === projectName.textContent)
    const currentTask = currentProject.tasks.find(task => task.title === e.target.parentNode.parentNode.parentNode.childNodes[1].textContent)
    currentProject.tasks.splice(currentProject.tasks.indexOf(currentTask), 1)
    e.target.parentNode.parentNode.parentNode.remove()
}

export function deleteProject() {
    if (confirm("Are you sure you want to delete this project?")) {
        const currentProject = projects.find(project => project.name === projectName.textContent)
        projects.splice(projects.indexOf(currentProject), 1)
        renderProjects()
        tasksContainer.style.visibility = 'hidden'
        deleteProjectBtn.style.visibility = 'hidden'
    }
}