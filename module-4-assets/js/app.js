const buttonEl = document.querySelector('#save-task');
const taskToDoEl = document.querySelector('#tasks-to-do');
const formEl = document.querySelector('#task-form');
let taskIdCounter = 0;


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
    // add task id as a  custom attribute
    listItemEl.setAttribute('data-task-id', taskIdCounter);
    // create a div to hold task info and add to list item
    const taskInfoEl = document.createElement('div');
    // give it a classname
    taskInfoEl.className = 'task-info';
    // add HTML content to div
    taskInfoEl.innerHTML = `
        <h3 class='task-name'>${taskDataObj.name}</h3>
        <span class='task-type'>${taskDataObj.type}</span>
    `;
    // add div to li
    listItemEl.appendChild(taskInfoEl);

    const taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // add entire list item to list
    taskToDoEl.appendChild(listItemEl);
    // increase task counter for next unique id
    taskIdCounter++;
}

const createTaskActions = (taskId) => {
    const actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';
    // create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'btn edit-btn';
    editButton.setAttribute('data-task-id', taskId);
    actionContainerEl.appendChild(editButton);

    // create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Edit';
    deleteButton.className = 'btn delete-btn';
    deleteButton.setAttribute('data-task-id', taskId);
    actionContainerEl.appendChild(deleteButton);

    // create dropdown button
    const statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);
    actionContainerEl.appendChild(statusSelectEl);

    const statusChoices = ['To Do', 'In Progress', 'Completed'];
    for (let i = 0; i < statusChoices.length; i++) {
        // create option element
        const statusOption = document.createElement('option');
        statusOption.textContent = statusChoices[i];
        statusOption.setAttribute('value', statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOption);
    }
    return actionContainerEl;
}

formEl.addEventListener('submit', taskFormHandler);
