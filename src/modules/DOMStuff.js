import { taskMaker, taskDeleter } from "./todo.js";

function selector () {
    return {
        taskList: document.querySelector('#todo-list'),
        form: document.querySelector('#todo-form'),
        otherDetails: document.querySelector('#todo-form').children['todo-other-details'].children
    };
};

const DOM = selector();

function createLI (taskName) {
    const li = document.createElement('li');
    li.classList.add('task-li');
    li.id = `${taskName}-li`;

    return li;
};

function createDiv (taskName) {
    const div = document.createElement('div');
    div.classList.add('task-div');
    div.id = `${taskName}-div`;

    return div;
};

function createSpan (className) {
    const span = document.createElement('span');
    span.classList.add(`task-${className}-span`);

    return span;
};

function createHeader (taskName) {
    const header = document.createElement('h3');
    header.classList.add('task-header');
    header.id = `${taskName}-header`;

    return header;
};

function createDescription (taskName) {
    const description = document.createElement('p');
    description.classList.add('task-description');
    description.id = `${taskName}-description`;

    return description;
};

function createBtn (btnClasses, btnName, btnType) {
    const btn = document.createElement('button');
    btn.classList.add(`more-options`, 'button-default', btnType, ...btnClasses);
    btn.id = `${btnName}-${btnType}`;

    return btn;
};

function createTaskElements(taskName) {
    return {
        li: createLI(taskName),
        div: createDiv(taskName),
        completeSpan: createSpan('complete'),
        contentSpan: createSpan('content'),
        optionsSpan: createSpan('options'),
        header: createHeader(taskName),
        description: createDescription(taskName),
        optionsBtn: [
            createBtn(['fa-solid', 'fa-pen'], taskName, 'editor'),
            createBtn(['fa-solid', 'fa-trash'], taskName, 'remover'),
        ]
    };
};

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