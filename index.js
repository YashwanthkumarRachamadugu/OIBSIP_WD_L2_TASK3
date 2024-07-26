const newTaskInput = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');

let tasks = []; // Array to store all tasks

// Function to add a new task
function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
        tasks.push({
            text: taskText,
            completed: false,
            // Optional: addedDate: new Date() // For tracking date/time
        });
        renderTasks();
        newTaskInput.value = "";
    }
}

// Function to render all tasks in the appropriate lists
function renderTasks() {
    pendingTasksList.innerHTML = ''; // Clear the lists
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        // Add an edit button to each task 
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            editTask(task); // You will need to implement the editTask function
        });
        li.appendChild(editButton);
        // Add a complete/uncomplete checkbox to each task
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed; // Set checked attribute based on the task's completion status
        checkbox.addEventListener("change", () => {
            toggleTaskCompletion(task);
        });
        li.appendChild(checkbox);
        
        // Add a delete button to each task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteTask(task);
        });
        li.appendChild(deleteButton);
        
        if (task.completed) {
            li.classList.add('completed');
            completedTasksList.appendChild(li);
        } else {
            pendingTasksList.appendChild(li);
        }
    });
}

// Function to toggle task completion
function toggleTaskCompletion(task) {
    task.completed = !task.completed;
    renderTasks();
}

// Function to delete a task
function deleteTask(task) {
    const taskIndex = tasks.indexOf(task);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        renderTasks();
    }
}

// Add event listener to the add task button
addTaskButton.addEventListener('click', addTask);

// Render tasks when the page loads
renderTasks();