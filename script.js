// Task Tracker (LocalStorage-based)

const STORAGE_KEY = "tasks";
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.flexDirection = "column";
    left.style.gap = "4px";

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const meta = document.createElement("span");
    meta.className = "task-meta";

    const status = task.completed ? "Completed" : "Pending";
    meta.innerHTML = `Status: <span class="status-pill">${status}</span>`;

    left.appendChild(text);
    left.appendChild(meta);

    const actionBtn = document.createElement("button");
    actionBtn.type = "button";
    actionBtn.textContent = task.completed ? "Undo" : "Complete";
    actionBtn.addEventListener("click", () => toggleTask(index));

    li.appendChild(left);
    li.appendChild(actionBtn);

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// UX: Enter key adds task
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

addBtn.addEventListener("click", addTask);

renderTasks();
