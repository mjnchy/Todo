import {createTodo} from"./todo.js";

function createTask (x) {
    const li = document.createElement('li');
    li.classList.add('task');
    li.id = `${x}`;

    return li;
};

function createTaskHeader (parent, header) {
    const taskHeader = document.createElement('h2');
    taskHeader.classList.add('task-header');
    taskHeader.id = `${header}-header`;
    taskHeader.textContent = header;
        
    parent.append(taskHeader);
    return parent;
};

function createTaskContent (parent, content) {
    const taskContent = document.createElement('p');
    taskContent.classList.add('task-content');
    taskContent.id = `${content}-content`;
    taskContent.textContent = content;

    parent.append(taskContent);
    return parent;
};

function makeTask (title, des, date, projects) {
    const details = createTodo(title, des, date, projects);
    const li = createTask(title);

    const task = details.todoList[title]
    createTaskHeader(li, task.title);
    createTaskContent(li, task.description);

    console.log(details.todoList, details.projects);

    return {
        details, li
    };
};

function appendTask (title, des, date, projects) {
    const taskContainer = document.querySelector('#todo-list');

    const div = document.createElement('div');
    div.classList.add('task-div');
    div.id = `${title}-div`;

    div.append(makeTask(title, des, date, projects).li);
    taskContainer.append(div);
};


function makeTodo () {
    const form = document.querySelector('#todo-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = form.children.title.value;
        const des = form.children.description.value;

        appendTask(title, des, 'due', ['all']);
        form.reset();
    });
};

makeTodo();