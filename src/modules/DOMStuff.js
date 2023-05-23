import { taskDeleter, projects, makeTask } from "./todo.js";
import { createElem, } from "./elements.js";
import { Datepicker} from "vanillajs-datepicker";
import "vanillajs-datepicker/css/datepicker.css";

let today = new Date();
let projectsArray = ['all'];

let allDates = [];
const DOM = {
    navMain: {
        sidebarToggler: document.querySelector('#sidebar-toggle'),
        home: document.querySelector('#home'),
        addBtn: document.querySelector('#add-btn'),
        
    },
    sideNav: {
        navbar: document.querySelector('#side-nav'),
        btns: () => [...document.querySelectorAll('.project-btn')],
        activePanel: () => document.querySelector('.project-btn[data-active="true"]'),
        extraContainer: document.querySelector('#user-made-projects-container'),
        userPannels: document.querySelector('#user-made-projects-list'),
        extraPanels: () => [...document.querySelector('#user-made-projects-list').children],
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
        projectsDisplay: document.querySelector('#selected-projects-list'),
        projectRemover: () => document.querySelectorAll('.project-remover'),
        datepickerContainer: document.querySelector('#datepicker-container'),
        datepickerBtn: document.querySelector('#datepicker-btn'),
        datepicker: document.querySelector('#datepicker'),
        calender: new Datepicker(document.getElementById('datepicker'), {
            datesDisabled: function (date, viewId, rangeEnd) {
                let isDateDisabled;
                if (date.getDate() <= today.getDate() - 1 && date.getMonth() <= today.getMonth() && date.getFullYear() <= today.getFullYear())
                    return isDateDisabled = true
                else return isDateDisabled = false;
            },
        })
    },
    dropDownForm: {
        projects: document.querySelector('#project-dropdown-menu-container'),
        dropDownProjectForm: document.querySelector('#dropdown-project-form'),
        dropdownProjectInput: document.querySelector('#dropdown-project-input'),
        ul: document.querySelector('#dropdown-project-ul'),
        selected: () => document.querySelectorAll('.dropdown-project-btn[data-selected="true"]'),
        submitBtn: document.querySelector('#project-selection-submit-btn')
    },
    midlay: document.querySelector('#midlay'),
};


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
        
        const date = taskObj.due.toLocaleDateString();
        const dateID = date.replaceAll('/', '');
        const currentPanel = DOM.sideNav.activePanel();

        let dateDiv = document.getElementById(dateID);

    
        elements.header.textContent = taskObj.title;
        elements.description.textContent = taskObj.description;
        allDates.includes(date)? null: allDates.push(date);
    
        elements.contentSpan.append(elements.header, elements.description);
        elements.optionsBtn.forEach(btn => {
            elements.optionsSpan.append(btn);
        });
    
        elements.div.append(elements.completeSpan, elements.contentSpan, elements.optionsSpan);
        elements.li.append(elements.div);

        if (currentPanel.id !== 'today') {
            if(dateDiv !== null) {
                dateDiv.append(elements.li);
            }
    
            else {
                dateDiv = createElem('div', `d${dateID}`, ['date-div']);
                dateDiv.id = dateID;
                dateDiv.textContent = date;
                dateDiv.append(elements.li);
                DOM.tasks.list.append(dateDiv);
            };
        }   else DOM.tasks.list.append(elements.li);
        addProjects(projects.all[taskName]._projects);
    }
    else return task;
};

function createNewSideBarProjectelements (projectName) {
    return {
        li: createElem('li', `sidebar-${projectName.toLowerCase()}-li`, ['projects']),
        btn: createElem('button', `${projectName.toLowerCase()}`, ['button-default', 'project-btn'])
    };
};

function addProjects (arr) {
    arr.forEach(_project => {
        let project = _project.replaceAll(' ', '');
        if (DOM.sideNav.userPannels.querySelector([`#sidebar-${project}-li`]) !== null) null
        else {
            if (projects[project] !== projects.all && projects[project] !== projects.today && projects[project] !== projects.priority) {
                const elements = createNewSideBarProjectelements(project);
                elements.btn.textContent = `${_project.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}`;
                elements.btn.dataset.active = 'false';
                elements.li.append(elements.btn);
                DOM.sideNav.userPannels.append(elements.li);
            }   else null;
        };
    });
};

function removeTask (task) {
    const checkProjects = projects.all[task]._projects;
    taskDeleter(task);
    DOM.tasks.list.removeChild(document.getElementById(`${task}-li`));
    removeEmptyProject(checkProjects);
};

function removeEmptyProject (arr) {
    arr.forEach(_project => {
        if (projects.hasOwnProperty(_project)) null
        else {
            if (projects[_project] !== projects.all && projects[_project] !== projects.today && projects[_project] !== projects.favourites) {
                DOM.sideNav.userPannels.removeChild(document.getElementById(`sidebar-${_project}-li`));
            }   else null;
        };
    });
};

function projectDivElems (num) {
    return {
        li: createElem('li', undefined, ['dropdown-project-li'], num),
        btn: createElem('button', undefined, ['dropdown-project-btn', 'button-default'], num),
    };
};

function displayDropDownProjects () {
    const projectList = Object.keys(projects);
    const elements = projectDivElems(projectList.length);
    
    elements.btn.forEach(btn => {
        const _projectName = projectList[elements.btn.indexOf(btn)];
        btn.name = `${_projectName}`;
        btn.id = `dropdown-${_projectName}-btn`;
        btn.textContent = `${_projectName.charAt(0).toUpperCase()}` + `${_projectName.slice(1)}`;
        btn.dataset.selected = projectsArray.includes(btn.name)? 'true': 'false';
        btn.append(
            createElem('i', `dropdown-${_projectName}-check`, ['fa-solid', 'fa-check', 'nonclickable'])
        );
        elements.li[elements.btn.indexOf(btn)].append(btn);
        elements.li[elements.btn.indexOf(btn)].id = `dropdown-${_projectName}-li`;
    });

    DOM.dropDownForm.ul.replaceChildren(...elements.li);
};

function createNewProject (projectName) {
    const elements = projectDivElems(1);
        
    if (!projects.all.hasOwnProperty(projectName)) {
        elements.btn.name = projectName;
        elements.btn.textContent = projectName;
        elements.btn.id = `dropdown-${projectName}-btn`;
        elements.btn.dataset.selected = 'true';
        elements.btn.append(
            createElem('i', `dropdown-${projectName}-check`, ['fa-solid', 'fa-check', 'nonclickable'])
        );
        elements.li.append(elements.btn);
        elements.li.id = `dropdown-${projectName}-li`;
        DOM.dropDownForm.ul.append(elements.li);
    }   else document.getElementById(`dropdown-${projectName}-btn`).dataset.selected = 'true';
};

function displayTasks () {
    DOM.tasks.list.replaceChildren()
    const project = document.querySelector('.project-btn[data-active="true"]');
    Object.keys(projects[project.id]).forEach(item => {
        appendTask(projects[project.id][item]);
    });
};

function getSelectedProjects () {
    projectsArray = ['all'];
    const selected = DOM.dropDownForm.selected();
    selected.forEach(item => item.name !== 'all'? projectsArray.push(item.name): null);

    return projectsArray;
};

function createProjectDisplayElems (num) {
    return {
        li: createElem('li', undefined, ['selected-project-li'], num),
        h3: createElem('h3', undefined, ['selected-project-name'], num),
        btn: createElem('button', undefined, ['project-remover', 'button-default', 'fa-solid', 'fa-xmark'], num)
    };
};

function displaySelectedProjects () {
    const projectsArray = getSelectedProjects();
    const elements = createProjectDisplayElems(projectsArray.length);

    if (elements.h3.length > 1) {
        elements.h3.forEach(header => {
            let li = elements.li[elements.h3.indexOf(header)];
            let btn = elements.btn[elements.h3.indexOf(header)];
            let projectName = projectsArray[elements.h3.indexOf(header)];
    
            li.id = `${projectName}-selected-li`;
            header.id = `${projectName}-selected-header`;
            header.textContent = projectName;
            btn.id = `${projectName}-selected-btn`;
            btn.type = 'button';
    
            li.append(header);
            li.append(btn);
        });
    
        DOM.form.projectsDisplay.replaceChildren(...elements.li);
    }   else {
            elements.h3.id = `${projectsArray[0]}-selected-header`;
            elements.h3.textContent = projectsArray[0];

            elements.li.id = `${projectsArray[0]}-selected-li`;
            elements.btn.id = `${projectsArray[0]}-selected-btn`;
            elements.btn.type = 'button';
           
            elements.li.append(elements.h3);
            elements.li.append(elements.btn);

            DOM.form.projectsDisplay.replaceChildren(elements.li);
    };
};

function removeSelectedProject (id) {
    const name = id.substring(0, id.indexOf('-'));
    if (name !== 'all') {
        document.getElementById(`dropdown-${name}-btn`).dataset.selected = 'false';
        displaySelectedProjects();
    }   else null;
};

function getDate () {
    let date = DOM.form.calender.getDate();
    if (date !== undefined) return date
    else return today;
};

function fetch_From_Form () {
    return {
        title: DOM.form.form.children.title.value,
        des: DOM.form.form.children.description.value,
        date: function () {
            const date = getDate();
            if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
                projectsArray.push('today');
            };
            return date;
        },
        projects: function () {
            let currentPanel = DOM.sideNav.activePanel();
            if (currentPanel.id !== 'all' && currentPanel.id !== 'today') {
                projectsArray.push(currentPanel.id);
            };
            return projectsArray;
        }
    };
};

export {
    DOM, today, createNewProject, setHeader, removeTask, fetch_From_Form, displayDropDownProjects, displaySelectedProjects, appendTask, displayTasks, removeSelectedProject
};