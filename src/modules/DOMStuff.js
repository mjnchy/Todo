import { taskDeleter, projects } from "./todo.js";
import { createElem, } from "./elements.js";

const DOM = {
    navMain: {
        sidebarToggler: document.querySelector('#sidebar-toggle'),
        home: document.querySelector('#home'),
        addBtn: document.querySelector('#add-btn'),
        
    },
    sideNav: {
        navbar: document.querySelector('#side-nav'),
        btns: [...document.querySelectorAll('.project-btn')],
        activePanel: () => document.querySelector('.project-btn[data-active="true"]'),
    },
    tasks: {
        header: document.querySelector('#header'),
        list: document.querySelector('#todo-list'),
    },
    form: {
        container: document.querySelector('#form-container'),
        form: document.querySelector('#todo-form'),
        otherDetails: document.querySelector('#todo-form').children['todo-other-details'].children,
        addBtn: document.querySelector('#add-btn'),
        cancelBtn: document.querySelector('#cancel-todo'),
        projectSelector: document.querySelector('#project-selection'),
        projects: document.querySelector('#project-dropdown-menu-container')
    },
    midlay: document.querySelector('#midlay'),
}


function setHeader () {
    DOM.tasks.header.dataset.value = DOM.tasks.header.textContent = DOM.sideNav.activePanel().textContent;
};

function createTaskElements(taskName) {
    return {
        li: createElem('li', `${taskName}-li`, ['task-li']),
        div: createElem('div', `${taskName}-div`, ['task-div']),
        completeSpan: createElem('span', `${taskName}-complete-span`, ['task-complete-span']),
        contentSpan: createElem('span', `${taskName}-content-span`, ['task-content-span']),
        optionsSpan: createElem('span', `${taskName}-options-span`, ['task-options-span']),
        header: createElem('h3', `${taskName}-header`, ['task-header']),
        description: createElem('p', `${taskName}-description`, ['task-description']),
        optionsBtn: [
            createElem('button', `${taskName}-edit-btn`, ['button-default', 'more-options', 'fa-solid',  'fa-pen', 'editor']),
            createElem('button', `${taskName}-remove-btn`, ['button-default', 'more-options', 'fa-solid', 'fa-trash', 'remover'])
        ],
    };
};

function appendTask (task) {
    if (typeof task === 'object') {
        const taskName = task.title.replaceAll(' ', '');
        const taskObj = (projects.all[taskName]);
        const elements = createTaskElements(taskName);
    
        elements.header.textContent = taskObj.title;
        elements.description.textContent = taskObj.description;
    
        elements.contentSpan.append(elements.header, elements.description);
        elements.optionsBtn.forEach(btn => {
            elements.optionsSpan.append(btn);
        });
    
        elements.div.append(elements.completeSpan, elements.contentSpan, elements.optionsSpan);
        elements.li.append(elements.div);
        
        DOM.tasks.list.append(elements.li);
    }
    else return task;
};

function removeTask (task) {
    taskDeleter(task);
    DOM.tasks.list.removeChild(document.getElementById(`${task}-li`));
};

function fetch_From_Form () {
    return {
        title: DOM.form.form.children.title.value,
        des: DOM.form.form.children.description.value,
        // date: DOM.otherDetails.date.value,
        // projects: DOM.otherDetails.projects.value,
    };
};

function projectDivElems (num) {
    return {
        div: createElem('div', 'project-container', ['project-container'], 1),
        ul: createElem('ul', 'project-ul', ['project-ul', 'ul-default'], 1),
        li: createElem('li', undefined, ['dropdown-project-li'], num),
        btn: createElem('button', undefined, ['dropdown-project-btn', 'button-default'], num)
    };
};

function makeProjects () {
    const projectList = Object.keys(projects);
    const elements = projectDivElems(projectList.length);
    
    elements.btn.forEach(btn => {
        const _projectName = projectList[elements.btn.indexOf(btn)];
        btn.id = `dropdown-${_projectName}-btn`;
        btn.textContent = `${_projectName.charAt(0).toUpperCase()}` + `${_projectName.slice(1)}`;
        elements.li[elements.btn.indexOf(btn)].append(btn)
    });

    elements.li.forEach(li => {
        const _projectName = projectList[elements.li.indexOf(li)];
        li.id = `dropdown-${_projectName}-li`;
        elements.ul.append(li);
    });

    elements.div.append(elements.ul);
    DOM.form.projects.replaceChildren(elements.div);
};

function displayProjects () {
    DOM.tasks.list.replaceChildren()
    const project = document.querySelector('.project-btn[data-active="true"]');
    Object.keys(projects[project.id]).forEach(item => {
        appendTask(projects[project.id][item]);
    });
};

export {
    DOM, setHeader, removeTask, fetch_From_Form, makeProjects, appendTask, displayProjects
};