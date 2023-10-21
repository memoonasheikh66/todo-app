const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks);
        });
}

function displayTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task} <button onclick="editTask(${index})">Edit</button> <button onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
    });
}

function addTask() {
    const task = taskInput.value;
    if (task) {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: task })
        })
        .then(response => response.json())
        .then(() => {
            fetchTasks();
            taskInput.value = '';
        });
    }
}

function editTask(index) {
    const updatedTask = prompt('Edit task:', taskList.children[index].innerText.split('Edit')[0].trim());
    if (updatedTask !== null) {
        fetch(`/tasks/${index}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: updatedTask })
        })
        .then(response => response.json())
        .then(() => {
            fetchTasks();
        });
    }
}

function deleteTask(index) {
    fetch(`/tasks/${index}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        fetchTasks();
    });
}

fetchTasks();
