import { DOM, appendTask, createNewProject, displayDropDownProjects, displayTasks, fetch_From_Form, removeTask, setHeader, displaySelectedProjects, removeSelectedProject, } from "./DOMStuff.js";
import { makeTask } from "./todo.js";
import "../app.css";

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
            if (DOM.dropDownForm.projects.dataset.active === 'true') {
                toggle(DOM.dropDownForm.projects);
                toggle(DOM.form.projectSelector);
            }
            else if (DOM.form.datepicker.dataset.active === 'true') {
                toggle(DOM.form.datepicker);
                toggle(DOM.form.datepickerBtn);
            }
            else toggle(DOM.midlay, DOM.form.container);
            DOM.dropDownForm.projects.dataset.active === 'false'?
            DOM.midlay.style.zIndex = 1: null;
            break;
        case DOM.form.cancelBtn:
            toggle(DOM.form.container, DOM.midlay)
            break;
        case DOM.form.projectSelector:
            toggle(DOM.dropDownForm.projects);
            if (DOM.dropDownForm.projects.dataset.active === 'true') {
                DOM.midlay.style.zIndex = 2;
                toggle(DOM.form.projectSelector);
                displayDropDownProjects();
            };
            break;
        case DOM.dropDownForm.submitBtn:
            displaySelectedProjects();
            toggle(DOM.dropDownForm.projects);
            DOM.midlay.style.zIndex = 1;
        case DOM.form.datepickerBtn:
            toggle(DOM.form.datepicker);
            if (DOM.form.datepicker.dataset.active === 'true') {
                DOM.midlay.style.zIndex = 2;
                toggle(DOM.form.datepickerBtn);
            };
    };

    if (e.classList.contains('project-btn')) {
        DOM.sideNav.btns().forEach(btn => btn.dataset.active = 'false');
        e.dataset.active = 'true';
        setHeader();
        displayTasks();
    }

    else if (e.classList.contains('remover')) {
        removeTask(e.parentElement.parentElement.children[1].children[0].textContent.replaceAll(' ', ''))
    }

    else if (e.classList.contains('dropdown-project-btn')) {
        if (e.name !== 'all') {
            e.dataset.selected = e.dataset.selected === 'false'? 'true': 'false';
        }   else null;
    }

    else if (e.classList.contains('project-remover')) {
        removeSelectedProject(e.id);
    }

    else if (e.classList.contains('datepicker-cell')) {
        if (!e.classList.contains('disabled')) {
            toggle(DOM.form.datepicker, DOM.form.datepickerBtn);
            DOM.midlay.style.zIndex = 1;
        };
    }
};

window.onload = function () {
    setHeader();
    displaySelectedProjects();
};

window.addEventListener('click', e => handlerOne(e.target));

DOM.form.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = fetch_From_Form();
    const task = makeTask(input.title, input.des, input.date(), input.projects);
    
    if (typeof task === 'string') {
        alert(task);
    }
    else {
        appendTask(task);
        toggle(DOM.form.container, DOM.midlay);
    };
    DOM.form.form.reset();
    DOM.dropDownForm.selected().forEach(item => item.dataset.selected = 'false');
    DOM.form.calender.setDate(today.toLocaleDateString());
    displaySelectedProjects();
});

DOM.dropDownForm.dropDownProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let input = DOM.dropDownForm.dropdownProjectInput.value;
    if (input !== '') {
        createNewProject(input);
        DOM.dropDownForm.dropDownProjectForm.reset();
    }   else null;
});