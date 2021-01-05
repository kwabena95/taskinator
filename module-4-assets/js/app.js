const buttonEl = document.querySelector('#save-task');
const taskToDoEl = document.querySelector('#tasks-to-do');
const formEl = document.querySelector('#task-form');



const createTaskHandler = (e) => {
    e.preventDefault();
    const taskNameInput = document.querySelector('input[name="task-name"]').value;
    const taskTypeInput = document.querySelector('select[name="task-type"]').value;

    // create a list item
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    // create a div to hold task info and add to list item
    const taskInfoEl = document.createElement('div');
    // give it a classname
    taskInfoEl.className = 'task-info';
    // add HTML content to div
    taskInfoEl.innerHTML = `
        <h3 class='task-name'>${taskNameInput}</h3>
        <span class='task-type'>${taskNameInput}</span>
    `;
    // add div to li
    listItemEl.appendChild(taskInfoEl);
    // add entire list item to list
    taskToDoEl.appendChild(listItemEl);

}

formEl.addEventListener('submit', createTaskHandler);