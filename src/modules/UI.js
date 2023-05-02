import "../app.css";
import { DOM, addProjects, appendTask, displayDropDownProjects, displayProjects, fetch_From_Form, removeTask, setHeader } from "./DOMStuff.js";
import { makeTask } from "./todo.js";

function toggle (element, element2) {
    element.dataset.active = element.dataset.active === 'false'? 'true': 'false';
    if (element2 === undefined) null
    else element2.dataset.active = element.dataset.active;
};

function handlerOne (e) {
    switch (e) {
        case DOM.navMain.sidebarToggler:
            toggle(DOM.sideNav.navbar);
            break;
        case DOM.navMain.addBtn:
            toggle(DOM.form.container, DOM.midlay);
            break;
        case DOM.midlay:
            if (DOM.form.projects.dataset.active === 'true') {
                toggle(DOM.form.projects);
                toggle(DOM.form.projectSelector);
            }
            else toggle(DOM.midlay, DOM.form.container);
            DOM.form.projects.dataset.active === 'false'?
            DOM.midlay.style.zIndex = 1: null;
            break;
        case DOM.form.cancelBtn:
            toggle(DOM.form.container, DOM.midlay)
            break;
        case DOM.form.projectSelector:
            toggle(DOM.form.projects);
            if (DOM.form.projects.dataset.active === 'true') {
                DOM.midlay.style.zIndex = 2;
                toggle(DOM.form.projectSelector);
                displayDropDownProjects();
            };
            break;
    };

    if (e.classList.contains('project-btn')) {
        DOM.sideNav.btns().forEach(btn => btn.dataset.active = 'false');
        e.dataset.active = 'true';
        setHeader();
        displayProjects();
    }

    else if (e.classList.contains('remover')) {
        removeTask(e.parentElement.parentElement.children[1].children[0].textContent.replaceAll(' ', ''))
    }
};

window.onload = function () {
    setHeader();
};

window.addEventListener('click', e => handlerOne(e.target));

DOM.form.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = fetch_From_Form();
    const task = makeTask(input.title, input.des);
    
    if (typeof task === 'string') {
        alert(task);
    }
    else {
        appendTask(task);
        toggle(DOM.form.container, DOM.midlay);
    };
    DOM.form.form.reset();
});