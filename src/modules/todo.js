const projects = {
    all: {},
    today: {},
    favourites: {}
};
const taskList = projects.all;

function makeTask (title, description, due, _projects = []) {
    const parsed = title.replaceAll(' ', '');
    let error;

    if (parsed !== '' && !taskList.hasOwnProperty(parsed)) {
        taskList[parsed] = {
            title, description, due, _projects: [...new Set(_projects)]
        };

        !_projects.includes('all')? _projects.unshift('all'): null;
        sortProjects(parsed);
        
        return taskList[parsed];
    }

    else if (parsed === '') return error = `Invalid task. Task must have a name`
    else return `Task already exists. Please enter a new valid task`
};

function taskDeleter (taskName) {
    const task = taskName.replaceAll(' ', '');
    
    taskList[task]._projects.forEach(_project => {
        delete(projects[_project][task]);
        deleteProject(_project);
    });

    delete(taskList[task]);
    return projects;
};

function deleteProject (project) {
    if (projects[project] !== taskList && projects[project] !== projects.today && projects[project] !== projects.favourites ) {
        Object.keys(projects[project]).length < 1? delete(projects[project]): null;
    };
};

function sortProjects (task) {
    if (!taskList.hasOwnProperty(task)) null
    else {
        taskList[task]._projects.forEach(_project => {
            let project = _project.replaceAll(' ', '')
            if (!projects.hasOwnProperty(project)) {
                projects[project] = {};
            };
            projects[project][task] = taskList[task];
        });
    };
};

export {
    makeTask,
    taskDeleter,
    projects
}