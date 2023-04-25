const todoList = {};
const projects = {};

function taskMaker (title, description, due, _projects) {
    const parsed = title.replaceAll(' ', '');
    let error;
    if (parsed === '') return error = 'Invalid task. Task must contain at least some character.'
    else if (todoList.hasOwnProperty(parsed)) {
        return error = 'Task already exists, please pass a new task';
    }
    else {
        todoList[parsed] = {
            title, description, due, _projects
        };
        sortProjects(parsed);
        return todoList[parsed];
    };
};

function taskDeleter (task) {
    delete(todoList[task]);
    return todoList;
};

function sortProjects (task) {
    todoList[task]._projects.unshift('all');
    todoList[task]._projects.forEach(_project => {
        if (!projects.hasOwnProperty(_project)) {
            projects[_project] = {};
            projects[_project][task] = todoList[task];
        }
        else projects[_project][task] = todoList[task];
    });
    return projects;
};

export {
    projects,
    taskMaker,
    taskDeleter,
}