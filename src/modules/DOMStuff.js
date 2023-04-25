import { taskMaker, taskDeleter, projects } from "./todo.js";
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
}

function makeTask (title, des, due, projects) {
    const task = taskMaker(title, des, due, projects);
    if (typeof task !== 'object') alert(task);
    else {
        const elements = createTaskElements(title);
    
        elements.header.textContent = task.title;
        elements.description.textContent = task.description;

        elements.contentSpan.append(elements.header, elements.description);
        elements.optionsBtn.forEach(btn => {
            elements.optionsSpan.append(btn);
        });

        elements.div.append(elements.completeSpan, elements.contentSpan, elements.optionsSpan);
        elements.li.append(elements.div);

        DOM.taskList.append(elements.li);
        return task;
    };
};

function removeTask (task) {
    taskDeleter(task);
    DOM.taskList.removeChild(document.getElementById(`${task}-li`));
};

function fetch_From_Form () {
    return {
        title: DOM.form.children.title.value,
        des: DOM.form.children.description.value,
        date: DOM.otherDetails.date.value,
        projects: DOM.otherDetails.projects.value,
        priority: DOM.otherDetails.priority.value,
    };
};

export {
    DOM, makeTask, removeTask, fetch_From_Form
}