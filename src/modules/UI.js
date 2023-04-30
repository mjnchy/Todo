import "../app.css";
import { DOM, fetch_From_Form, makeProjects, makeTask, removeTask, setHeader } from "./DOMStuff.js";

const eventElements = {
    navMain: {
        sidebarToggler: document.querySelector('#sidebar-toggle'),
        home: document.querySelector('#home'),
        addBtn: document.querySelector('#add-btn'),
        
    },
    sideNav: {
        navbar: document.querySelector('#side-nav'),
        lis: document.querySelectorAll('.projects'),
        btns: document.querySelectorAll('.project-btn'),
    },
    form: {
        container: document.querySelector('#form-container'),
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

window.onload = function () {
    setHeader();
};

window.addEventListener('click', (e) => {
    switch (e.target) {
        case eventElements.navMain.sidebarToggler:
            toggle(eventElements.sideNav.navbar);
            break;
        case eventElements.navMain.addBtn:
            toggle(eventElements.form.container, eventElements.midlay);
            break;
        case eventElements.midlay:
            eventElements.form.projects.dataset.active === 'true'?
            toggle(eventElements.form.projects):
            toggle(eventElements.midlay, eventElements.form.container);
            eventElements.midlay.style.zIndex = eventElements.form.projects.dataset.active === 'false'? 1: 2;
            break;
        case eventElements.form.cancelBtn:
            toggle(eventElements.form.container, eventElements.midlay)
            break;
        case eventElements.form.projectSelector:
            toggle(eventElements.form.projects);
            eventElements.midlay.style.zIndex = eventElements.form.projects.dataset.active === 'true'? 2: 1;
            break;
    };
});