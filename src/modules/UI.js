import "../app.css";
import "./todo.js";
import "./DOMStuff.js";

window.addEventListener('click', (e) => {
    const formContainer = document.querySelector('#form-container');
    const midlay = document.querySelector('#midlay');
    const sideNav = document.querySelector('#side-nav');

    if (e.target.id === 'add-btn' || e.target.classList.contains('fa-plus')) {
        formContainer.dataset.status = 'active'
        midlay.dataset.status = 'active';
    }

    if (e.target.id === 'midlay') {
        formContainer.dataset.status = 'inactive';
        midlay.dataset.status = 'inactive';
    }

    if (e.target.id === 'sidebar-toggle' || e.target.classList.contains('fa-bars')) {
        sideNav.dataset.active = sideNav.dataset.active === 'true'? 'false': 'true';
    }
});