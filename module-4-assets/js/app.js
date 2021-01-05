const buttonEl = document.querySelector('#save-task');
const taskToDoEl = document.querySelector('#tasks-to-do');
const formEl = document.querySelector('#task-form');
const createTaskHandler = (e) => {
    e.preventDefault();
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.textContent = 'This is a new task';
    taskToDoEl.appendChild(listItemEl);
}

formEl.addEventListener('click', createTaskHandler);