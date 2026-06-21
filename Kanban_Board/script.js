let col1 = document.querySelector(".col1");
let col2 = document.querySelector(".col2");
let col3 = document.querySelector(".col3");
let tasks = document.querySelectorAll(".task");
let addTask = document.querySelector(".add-task");
let modal = document.querySelector(".modal");
let modalBtn = document.querySelector(".modal-btn");
let titleInput = document.querySelector(".modal-task input");
let descInput = document.querySelector(".modal-desc textarea");
let todoContainer = document.querySelector(".todo");

let droppedElement = null;

function createTask(title, detail, container) {
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("draggable", "true");

  task.innerHTML = `
    <div class="task-heading">${title}</div>
    <div class="task-detail">${detail}</div>
    <div class="delete"><button>Delete</button></div>
  `;

  task.addEventListener("dragstart", (e) => {
    droppedElement = e.target;
  });

  container.appendChild(task);

  updateCounts();
  saveToLocalStorage();
}

function updateCounts() {
  const col1Count = col1.querySelectorAll(".task").length;
  const col2Count = col2.querySelectorAll(".task").length;
  const col3Count = col3.querySelectorAll(".task").length;

  col1.querySelector(".right").textContent = col1Count;
  col2.querySelector(".right").textContent = col2Count;
  col3.querySelector(".right").textContent = col3Count;
}

function draggingListeners(x) {
  x.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  x.addEventListener("drop", function (e) {
    e.preventDefault();
    if (!droppedElement) return;
    x.querySelector(".tasks").appendChild(droppedElement);
    updateCounts();
    x.classList.remove("highlight");
    saveToLocalStorage();
  });
  x.addEventListener("dragenter", function (e) {
    e.preventDefault();
    x.classList.add("highlight");
  });
  x.addEventListener("dragleave", function (e) {
    e.preventDefault();
    x.classList.remove("highlight");
  });
}
function saveToLocalStorage() {
  const allTasks = [];

  document.querySelectorAll(".task").forEach((task) => {
    const title = task.querySelector(".task-heading").textContent;
    const detail = task.querySelector(".task-detail").textContent;

    let column = task.closest(".tasks").classList[1];

    allTasks.push({ title, detail, column });
  });

  localStorage.setItem("kanbanTasks", JSON.stringify(allTasks));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("kanbanTasks"));

  if (!data) return;

  data.forEach((task) => {
    let container;

    if (task.column === "todo") container = document.querySelector(".todo");
    if (task.column === "progress")
      container = document.querySelector(".progress");
    if (task.column === "done") container = document.querySelector(".done");

    createTask(task.title, task.detail, container);
  });
}

draggingListeners(col1);
draggingListeners(col2);
draggingListeners(col3);

tasks.forEach((task) => {
  task.addEventListener("dragstart", (e) => {
    droppedElement = e.target;
  });
});

document.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON" && e.target.textContent === "Delete") {
    const task = e.target.closest(".task");
    if (task) task.remove();
    updateCounts();
    saveToLocalStorage();
  }
});

addTask.addEventListener("click", function () {
  modal.classList.add("toggle");
});

document.querySelector(".modal-bg").addEventListener("click", function () {
  modal.classList.remove("toggle");
});

modalBtn.addEventListener("click", function () {
  const title = titleInput.value.trim();
  const detail = descInput.value.trim();

  if (!title || !detail) return;

  createTask(title, detail, todoContainer);

  titleInput.value = "";
  descInput.value = "";

  modal.classList.remove("toggle");
});

window.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  updateCounts();
});
