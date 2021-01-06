const buttonEl = document.querySelector('#save-task');
const taskToDoEl = document.querySelector('#tasks-to-do');
const formEl = document.querySelector('#task-form');
const pageContentEl = document.querySelector('#page-content');
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");
let taskIdCounter = 0;


const taskButtonHandler = (event) => {
    // get target element from event
    let targetEl = event.target;

    // edit button
    if (targetEl.matches('.edit-btn')) {
        // get the elemwnt attribute
        const taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    }

    // delete button
    if (targetEl.matches('.delete-btn')) {
        // get the element's task id
        const taskId = targetEl.getAttribute('data-task-id');
        deleteTask(taskId);
    }
}
pageContentEl.addEventListener('click', taskButtonHandler);

// delete function
const deleteTask = (taskId) => {
    const taskSleceted = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSleceted.remove();
}

// edit function
const editTask = (taskId) => {
    // get task list item element
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    const taskName = taskSelected.querySelector('h3.task-name').textContent;
    const taskType = taskSelected.querySelector('span.task-type').textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = 'Save Task';
    formEl.setAttribute('data-task-id', taskId);
}

const taskFormHandler = (e) => {
    e.preventDefault();
    const taskNameInput = document.querySelector('input[name="task-name"]').value;
    const taskTypeInput = document.querySelector('select[name="task-type"]').value;
    const isEdit = formEl.hasAttribute('data-task-id');

    // package up data as an object
    const taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    if (isEdit) {
        const taskId = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        taskDataObj;
    }

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert('You need to fill out the task form!');
        return false;
    }
    // clear input
    formEl.reset();
}

const completeEditTask = (taskName, taskType, taskId) => {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    formEl.removeAttribute('data-task-id');
    document.querySelector('#save-task').textContent = 'Add Task';
}

const createTaskEl = (taskDataObj) => {
    // create a list item
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    // add task id as a  custom attribute
    listItemEl.setAttribute('data-task-id', taskIdCounter);
    // set draggable atrribute ti list
    listItemEl.setAttribute('draggable', 'true');
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
    deleteButton.textContent = 'Delete';
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
const taskStatusChangeHandler = (event) => {
    // get the task item's id
    const taskId = event.target.getAttribute('data-task-id');
    // get the currently selected option's value and convert to lowercase
    const statusValue = event.target.value.toLowerCase();
    // find the parent task item element based on the id
    const taskSelecetd = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === 'to do') {
        taskToDoEl.appendChild(taskSelecetd);
    } else if (statusValue === 'in progress') {
        tasksInProgressEl.appendChild(taskSelecetd);
    } else if (statusValue === 'completed') {
        tasksCompletedEl.appendChild(taskSelecetd);
    }
};

// drag task
const dragTaskHandler = (event) => {
    const taskId = event.target.getAttribute('data-task-id');
    const getId = event.dataTransfer.setData('text/plain', taskId);
    console.log("getId:", getId, typeof getId);
}

// drag zone 
const dropZoneDragHandler = (event) => {
    const taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        console.dir(taskListEl);
    }
}

// drop zone
const dropTaskHandler = (event) => {
    const id = event.dataTransfer.getData("text/plain");
    const draggableElement = document.querySelector("[data-task-id='" + id + "']");
    const dropZoneEl = event.target.closest(".task-list");
    const statusType = dropZoneEl.id;
    // set status of task based on dropZone id
    const statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    }
    else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.appendChild(draggableElement);
}

formEl.addEventListener('submit', taskFormHandler);
pageContentEl.addEventListener('change', taskStatusChangeHandler);
pageContentEl.addEventListener('dragstart', dragTaskHandler);
pageContentEl.addEventListener('dragover', dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
