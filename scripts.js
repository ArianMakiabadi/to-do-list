//! global variables
let filterValue = "all";

//! DOM Elements
const todoInput = document.querySelector(".todo__input");
const todoForm = document.querySelector(".todo__form");
const todoList = document.querySelector(".todo__list");
const filterSelect = document.querySelector(".todo__filter");

//! Event Listeners
todoForm.addEventListener("submit", handleAddTodo);
filterSelect.addEventListener("change", (e) => {
  filterValue = e.target.value;
  handleFilter();
});

window.addEventListener("DOMContentLoaded", () => {
  // to reset the filter after each reload
  filterSelect.value = "all";

  // getting data from local storage
  const todos = getAllTodos();
  renderTodos(todos);
});

//! Handlers
function handleAddTodo(e) {
  e.preventDefault();
  if (!todoInput.value.trim()) return;

  const newTodo = createTodo(todoInput.value.trim());
  saveTodo(newTodo);

  handleFilter();

  clearInput();
}

function handleFilter() {
  let filtered = [];
  const todos = getAllTodos();

  if (filterValue === "completed") {
    filtered = todos.filter((todo) => todo.isCompleted);
  } else if (filterValue === "incomplete") {
    filtered = todos.filter((todo) => !todo.isCompleted);
  } else {
    filtered = todos;
  }

  renderTodos(filtered);
}

function handlerRemoveTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todo__id);
  todos = todos.filter((todo) => todo.id !== todoId);

  saveAllTodos(todos);
  handleFilter();
}

function handlerCheckTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todo__id);
  const checkedTodo = todos.find((t) => t.id === todoId);
  checkedTodo.isCompleted = !checkedTodo.isCompleted;

  saveAllTodos(todos);
  handleFilter();
}

//! Helpers
function createTodo(title) {
  return {
    id: Date.now(),
    title,
    createdAt: new Date().toLocaleString(),
    isCompleted: false,
  };
}

function renderTodos(todoArray) {
  todoList.innerHTML = todoArray.map((todo) => generateTodoHTML(todo)).join("");
  attachRemoveListeners(); // has to be added after each render
  attachCheckedListeners(); // has to be added after each render
}

function generateTodoHTML(todo) {
  return `
    <li class="todo">
      <p class="todo__title ${todo.isCompleted ? "completed" : ""}">${
    todo.title
  }</p>
      <span class="createdAt">${todo.createdAt}</span>
      <button class="todo__check" data-todo__id=${todo.id}>
        <i class="fa-solid fa-check"></i>
      </button>
      <button class="todo__remove" data-todo__id=${todo.id}>
        <i class="far fa-trash-alt"></i>
      </button>
    </li>
  `;
}

function clearInput() {
  todoInput.value = "";
}

function attachRemoveListeners() {
  const removeBtns = document.querySelectorAll(".todo__remove");
  removeBtns.forEach((btn) => btn.addEventListener("click", handlerRemoveTodo));
}

function attachCheckedListeners() {
  const checkedBtns = document.querySelectorAll(".todo__check");
  checkedBtns.forEach((btn) => btn.addEventListener("click", handlerCheckTodo));
}

//! using local storage (for training purposes)

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  saveAllTodos(savedTodos);
}

function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
