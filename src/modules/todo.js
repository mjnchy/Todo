const todoList = {};
const projects = {};

function createTodo (title, description, dueDate, _projects, priority) {
    todoList[title] = {
        title, description, dueDate, _projects
    };
    return todoList;
};

function listProjects () {
    const allProjects = [];
    Object.keys(todoList).map(key => {
        todoList[key]._projects.map(_project => {
            allProjects.push(_project);
        });
    });

    return allProjects;
};

function reduceProjects () {
    const filteredProjects = [...new Set(listProjects())];
    filteredProjects.forEach(project => {
        projects[project] = {};
    });

    return filteredProjects;
};

function addToProjects () {
    reduceProjects();
    Object.keys(todoList).map(key => {
        todoList[key]._projects.map(_project => {
            projects[_project][key] = todoList[key];
        });
    });

    return projects;
}

export {
    todoList,
    projects,
    createTodo
};