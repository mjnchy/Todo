import { createTodo } from "./todo.js";

function makeTask () {
    const taskList = document.querySelector('#todo-list');

    function taskElements(taskName) {
        const li = document.createElement('li');
        li.classList.add('task-li');
        li.id = `${taskName}-li`;
        
        const div = document.createElement('div');
        div.classList.add('task-div');
        div.id = `${taskName}-div`;

        const header = document.createElement('h3');
        header.classList.add('task-header');
        header.id = `${taskName}-header`;

        const content = document.createElement('p');
        content.classList.add('task-content');
        content.id = `${taskName}-content`;

        return {
            div, li, header, content
        };
    };

    function addTaskContent (name, description) {
        const contentElements = taskElements(name);

        contentElements.header.textContent = name;
        contentElements.content.textContent = description;

        return contentElements;
    };

    function createTask (title, des, due, projects) {
        const taskObject = createTodo(title, des, due, projects);
        const task = taskObject.todoList[title];

        const elements = addTaskContent(task.title, task.description);

        elements.div.append(elements.header, elements.content);
        elements.li.append(elements.div);

        taskList.append(elements.li);
    };

    return {
        taskList,
        createTask
    };
};

function addTask () {
    const form = document.querySelector('#todo-form');
    const otherDetails = form.children['todo-other-details'].children;

    function fetch_From_Form () {
        const title = form.children.title.value;
        const des = form.children.description.value;
        const date = otherDetails.date.value;
        const projects = otherDetails.projects.value;
        const priority = otherDetails.priority.value;

        return {
            title, des, date, projects, priority
        };
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fetched = fetch_From_Form();
        makeTask().createTask(fetched.title, fetched.des, fetched.date, fetched.projects, fetched.priority);
        form.reset();
    });
};

addTask();