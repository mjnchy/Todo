import "../app.css";
import { DOM, appendTask, displayProjects, fetch_From_Form, makeProjects, removeTask, setHeader } from "./DOMStuff.js";
import { makeTask } from "./todo.js";

const eventElements = {
    navMain: {
        sidebarToggler: document.querySelector('#sidebar-toggle'),
        home: document.querySelector('#home'),
        addBtn: document.querySelector('#add-btn'),
        
    },
    sideNav: {
        navbar: document.querySelector('#side-nav'),
        btns: [...document.querySelectorAll('.project-btn')],
    },
    form: {
        container: document.querySelector('#form-container'),
        form: document.querySelector('#todo-form'),
        addBtn: document.querySelector('#add-btn'),
        cancelBtn: document.querySelector('#cancel-todo'),
        projectSelector: document.querySelector('#project-selection'),
        projects: document.querySelector('#project-dropdown-menu-container')
    },
    midlay: document.querySelector('#midlay'),
};

function toggle (element, element2) {
    element.dataset.active = element.dataset.active === 'false'? 'true': 'false';
    if (element2 === undefined) null
    else element2.dataset.active = element.dataset.active;
};

function handlerOne (e) {
    switch (e) {
        case eventElements.navMain.sidebarToggler:
            toggle(eventElements.sideNav.navbar);
            break;
        case eventElements.navMain.addBtn:
            toggle(eventElements.form.container, eventElements.midlay);
            break;
        case eventElements.midlay:
            if (eventElements.form.projects.dataset.active === 'true') {
                toggle(eventElements.form.projects);
                toggle(eventElements.form.projectSelector);
            }
            else toggle(eventElements.midlay, eventElements.form.container);
            eventElements.form.projects.dataset.active === 'false'?
            eventElements.midlay.style.zIndex = 1: null;
            break;
        case eventElements.form.cancelBtn:
            toggle(eventElements.form.container, eventElements.midlay)
            break;
        case eventElements.form.projectSelector:
            toggle(eventElements.form.projects);
            if (eventElements.form.projects.dataset.active === 'true') {
                eventElements.midlay.style.zIndex = 2;
                toggle(eventElements.form.projectSelector);
                makeProjects();
            };
            break;
    };

    if (e.classList.contains('project-btn')) {
        eventElements.sideNav.btns.forEach(btn => btn.dataset.active = 'false');
        e.dataset.active = 'true';
        setHeader();
        displayProjects();
    }

    else if (e.classList.contains('remover')) {
        removeTask(e.parentElement.parentElement.children[1].children[0].textContent)
    }
};

window.onload = function () {
    setHeader();
};

window.addEventListener('click', e => handlerOne(e.target));

eventElements.form.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = fetch_From_Form();
    appendTask(makeTask(input.title, input.des));
    eventElements.form.form.reset();
    toggle(eventElements.form.container, eventElements.midlay);
});