import "../app.css";
import { DOM, fetch_From_Form, makeTask, removeTask } from "./DOMStuff.js";

const eventElements = function () {
    return {
        form: document.querySelector('#todo-form')
    }
}();

function setHeader () {
    const header = document.querySelector('#header');
    const panel = document.querySelector('.project-btn[data-active="true"]');
    header.textContent = panel.textContent;
};

window.onload = function () {
    setHeader();
};

window.addEventListener('click', (e) => {
    const formContainer = document.querySelector('#form-container');
    const midlay = document.querySelector('#midlay');
    const sideNav = document.querySelector('#side-nav');

    if (e.target.id === 'add-btn' || e.target.classList.contains('fa-plus')) {
        formContainer.dataset.status = 'active'
        midlay.dataset.status = 'active';
    };

    if (e.target.id === 'midlay') {
        formContainer.dataset.status = 'inactive';
        midlay.dataset.status = 'inactive';
    };

    if (e.target.id === 'sidebar-toggle' || e.target.classList.contains('fa-bars')) {
        sideNav.dataset.active = sideNav.dataset.active === 'true'? 'false': 'true';
    };

    if (e.target.classList.contains('remover')) {
        const item = e.target.parentElement.parentElement.children[1].children[0].textContent;
        removeTask(item);
    };

    if (e.target.classList.contains('project-btn')) {
        const btns = document.querySelectorAll('.project-btn');
        btns.forEach(btn => btn.dataset.active = 'false');
        e.target.dataset.active = 'true';
        setHeader();
    }
});

DOM.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = fetch_From_Form();
    makeTask(input.title, input.des, input.date, [...input.projects]);
    DOM.form.reset();
});