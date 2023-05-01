import { taskDeleter, projects } from "./todo.js";
import { createElem, } from "./elements.js";

function selector () {
    return {
        taskList: document.querySelector('#todo-list'),
        form: document.querySelector('#todo-form'),
        otherDetails: document.querySelector('#todo-form').children['todo-other-details'].children,
        projectDiv: document.querySelector('#project-dropdown-menu-container')
    };
};

const DOM = selector();


function setHeader () {
    const header = document.querySelector('#header');
    const panel = document.querySelector('.project-btn[data-active="true"]');
    header.dataset.value = header.textContent = panel.textContent;
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
        
        DOM.taskList.append(elements.li);
    }
    else alert(task);
};

function removeTask (task) {
    taskDeleter(task);
    DOM.taskList.removeChild(document.getElementById(`${task}-li`));
};

function fetch_From_Form () {
    return {
        title: DOM.form.children.title.value,
        des: DOM.form.children.description.value,
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
    DOM.projectDiv.replaceChildren(elements.div);
};

function displayProjects () {
    DOM.taskList.replaceChildren()
    const project = document.querySelector('.project-btn[data-active="true"]');
    Object.keys(projects[project.id]).forEach(item => {
        appendTask(projects[project.id][item]);
    });
};

export {
    DOM, setHeader, removeTask, fetch_From_Form, makeProjects, appendTask, displayProjects
};