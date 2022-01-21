import { projects, createProject, createTask } from './index.js'
import { renderProjects, renderTasks, save } from './render.js'

const projectName = document.querySelector('#project-name')
const tasksContainer = document.querySelector('.tasks-container')
const deleteProjectBtn = document.querySelector('.delete-project-btn')

export function addProject(e) {
    e.preventDefault()
    const projectNameInput = document.querySelector('.project-name')
    const name = projectNameInput.value
    if (name == null || name == '') return
    if (projects.find(project => project.name.toLowerCase() == name.toLowerCase()) != null) {
        alert(`You already have a project named ${name}`)
        return
    }
    const project = createProject(name)
    projects.push(project)
    save()
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
    localStorage.setItem('localStorageCurrentProj', JSON.stringify(currentProject))
    save()
    renderTasks(currentProject)
    document.querySelector('.title').value = null
    document.querySelector('.priority').selectedIndex = 0
    document.querySelector('.due-date').value = null
}

export function activateEditTaskBtn() {
    const editTaskBtn = document.querySelectorAll('#edit-task-btn')
    editTaskBtn.forEach(btn => {
        btn.addEventListener('click', e => {
            renderModal(e)
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
    const target = e.target.parentNode.parentNode.parentNode.childNodes[1]
    const currentProject = projects.find(project => project.name === projectName.textContent)
    const currentTask = currentProject.tasks.find(task => task.title === target.textContent)
    currentProject.tasks.splice(currentProject.tasks.indexOf(currentTask), 1)
    e.target.parentNode.parentNode.parentNode.remove()
    localStorage.setItem('localStorageCurrentProj', JSON.stringify(currentProject))
    save()
}

export function deleteProject() {
    if (confirm("Are you sure you want to delete this project?")) {
        const currentProject = projects.find(project => project.name === projectName.textContent)
        projects.splice(projects.indexOf(currentProject), 1)
        localStorage.setItem('localStorageCurrentProj', null)
        save()
        renderProjects()
        tasksContainer.style.visibility = 'hidden'
        deleteProjectBtn.style.visibility = 'hidden'
    }
}

function renderModal(e) {
    const modal = document.querySelector(".modal");
    modal.classList.add('visible')
    const target = e.target.parentNode.parentNode.parentNode.childNodes[1]
    const currentProject = projects.find(project => project.name === projectName.textContent)
    let currentTask = currentProject.tasks.find(task => task.title === target.textContent)
    const title = document.querySelector('.edit-title')
    const priority = document.querySelector('.edit-priority')
    const duedate = document.querySelector('.edit-due-date')
    const notes = document.querySelector('.notes')
    title.value = currentTask.title
    priority.value = currentTask.priority
    duedate.value = currentTask.duedate
    notes.value = currentTask.notes
    const saveBtn = document.querySelector(".save-btn")
    saveBtn.addEventListener('click', () => {
        currentTask.title = title.value
        currentTask.priority = priority.value
        currentTask.duedate = duedate.value
        currentTask.notes = notes.value
        modal.classList.remove('visible')
        localStorage.setItem('localStorageCurrentProj', JSON.stringify(currentProject))
        save()
        renderTasks(currentProject)
    }, { once: true })
}

export function sortDuedate() {
    const currentProject = projects.find(project => project.name === projectName.textContent)
    currentProject.tasks.sort((a, b) => a.duedate > b.duedate ? 1 : -1)
    localStorage.setItem('localStorageCurrentProj', JSON.stringify(currentProject))
    save()
    renderTasks(currentProject)
}

export function sortPriority() {
    const currentProject = projects.find(project => project.name === projectName.textContent)
    const order = ['High', 'Med', 'Low', '']
    currentProject.tasks.sort((a, b) => order.indexOf(a.priority) - order.indexOf(b.priority))
    localStorage.setItem('localStorageCurrentProj', JSON.stringify(currentProject))
    save()
    renderTasks(currentProject)
}
