import './style.css';
import "@fontsource/lato";
import { format } from 'date-fns'

const addProject = document.querySelector('.add-new-project')
const addTask = document.querySelector('add-new-task')
const projectsContainer = document.querySelector('.projects-container')
const projectNameInput = document.querySelector('.add-project')
const taskTemplate = document.querySelector('.task-template')
const tasksTable = document.querySelector('.tasks-table')
const taskTitle = document.querySelector('.title')
const taskPriority = document.querySelector('.priority')
const taskDueDate = document.querySelector('.due-date')


const projects = [];

function renderProjects() {
    reset(projectsContainer);
    projects.forEach(project => {
        const projectName = document.createElement('ul');
        projectName.textContent = project.name;
        projectsContainer.appendChild(projectName);
    });
}

function reset(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

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
        notes
    };
}

addProject.addEventListener('submit', e => {
    e.preventDefault();
    const name = projectNameInput.value;
    if (name == null || name == '') return
    const project = createProject(name);
    projects.push(project);
    renderProjects();
    projectNameInput.value = null;
})

function renderTasks(project) {
    const taskElement = document.importNode(taskTemplate.content, true)
    const title = taskElement.querySelector('#title')
    const priority = taskElement.querySelector('#priority')
    const duedate = taskElement.querySelector('#duedate')
    title.textContent = project.title
    priority.textContent = project.priority
    duedate.textContent = format(project.duedate, 'MMM dd')
    tasksTable.appendChild(taskElement);
}

addTask.addEventListener('submit', e => {
    e.preventDefault();
    const title = taskTitle.value
    const priority = taskPriority.value
    const duedate = taskDueDate.value
    const task = createTask(title, priority, duedate);
    renderTasks();
})