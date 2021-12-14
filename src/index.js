import './style.css';
import "@fontsource/lato";

const addProject = document.querySelector('.add-new-project')
const projectsContainer = document.querySelector('.projects-container')
const projectNameInput = document.querySelector('.add-project')

const projects = []

function renderProjects() {
    reset(projectsContainer)
    projects.forEach(project => {
        const projectName = document.createElement('ul')
        projectName.textContent = project.name
        projectsContainer.appendChild(projectName)
    });
}

function reset(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function createProject(name) {
    return {
        name,
        tasks: [],
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

renderProjects();