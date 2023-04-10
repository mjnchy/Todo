import "../app.css";
import "./todo.js";
import "./DOMStuff.js";

window.addEventListener('click', (e) => {
    if (e.target.id === 'add-btn' || e.target.classList.contains('fa-plus')) {
        const formContainer = document.querySelector('.form-container');
        formContainer.id = formContainer.id === 'form-container-hidden'? 'form-container-visible': 'form-container-hidden';
    }
})