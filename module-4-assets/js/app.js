const buttonEl = document.querySelector('#save-task');
const taskToDoEl = document.querySelector('#tasks-to-do');
const formEl = document.querySelector('#task-form');



const taskFormHandler = (e) => {
    e.preventDefault();
    const taskNameInput = document.querySelector('input[name="task-name"]').value;
    const taskTypeInput = document.querySelector('select[name="task-type"]').value;

    // package up data as an object
    const taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert('You need to fill out the task form!');
        return false;
    }
    // clear input
    formEl.reset();
}

const createTaskEl = (taskDataObj) => {
    // create a list item
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    // create a div to hold task info and add to list item
    const taskInfoEl = document.createElement('div');
    // give it a classname
    taskInfoEl.className = 'task-info';
    // add HTML content to div
    taskInfoEl.innerHTML = `
        <h3 class='task-name'>${taskDataObj.name}</h3>
        <span class='task-type'>${taskDataObj.name}</span>
    `;
    // add div to li
    listItemEl.appendChild(taskInfoEl);
    // add entire list item to list
    taskToDoEl.appendChild(listItemEl);
}


formEl.addEventListener('submit', taskFormHandler);
