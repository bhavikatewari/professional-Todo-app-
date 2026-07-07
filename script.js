// ================================
// Professional To-Do List App
// Developed by Bhavika Tewari
// ================================

// Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Current filter
let currentFilter = "all";

// -------------------------------
// Save tasks
// -------------------------------
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// -------------------------------
// Update counters
// -------------------------------
function updateCounter() {

    totalTasks.textContent = `Total : ${tasks.length}`;

    const completed = tasks.filter(task => task.completed).length;

    completedTasks.textContent = `Completed : ${completed}`;

}

// -------------------------------
// Display tasks
// -------------------------------
function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (currentFilter === "active")
            return !task.completed;

        if (currentFilter === "completed")
            return task.completed;

        return true;

    });

    filteredTasks.forEach(task => {

        const originalIndex = tasks.indexOf(task);

        const li = document.createElement("li");

        if (task.completed)
            li.classList.add("completed");

        li.innerHTML = `

        <span>${task.text}</span>

        <div class="actions">

        <button class="complete" data-index="${originalIndex}">
        ✔
        </button>

        <button class="edit" data-index="${originalIndex}">
        ✏
        </button>

        <button class="delete" data-index="${originalIndex}">
        🗑
        </button>

        </div>

        `;

        taskList.appendChild(li);

    });

    updateCounter();

}

// -------------------------------
// Add Task
// -------------------------------
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text: text,

        completed: false

    });

    saveTasks();

    displayTasks();

    taskInput.value = "";

    taskInput.focus();

}

// Add button
addBtn.addEventListener("click", addTask);

// Press Enter
taskInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        addTask();

    }

});

// -------------------------------
// Event Delegation
// -------------------------------
taskList.addEventListener("click", function(e){

    const index = e.target.dataset.index;

    if(index === undefined) return;

    // Delete
    if(e.target.classList.contains("delete")){

        tasks.splice(index,1);

    }

    // Complete
    else if(e.target.classList.contains("complete")){

        tasks[index].completed = !tasks[index].completed;

    }

    // Edit
    else if(e.target.classList.contains("edit")){

        const updatedTask = prompt("Edit your task", tasks[index].text);

        if(updatedTask !== null && updatedTask.trim() !== ""){

            tasks[index].text = updatedTask.trim();

        }

    }

    saveTasks();

    displayTasks();

});

// -------------------------------
// Filter Buttons
// -------------------------------
filterButtons.forEach(button=>{

    button.addEventListener("click",function(){

        document
        .querySelector(".filter.active")
        .classList
        .remove("active");

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        displayTasks();

    });

});

// -------------------------------
// Initial Load
// -------------------------------
displayTasks();
