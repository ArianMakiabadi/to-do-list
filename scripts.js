//! global array to store all the todos
let todos = [];

//! DOM Elements
const todoInput = document.querySelector(".todo__input");
const todoForm = document.querySelector(".todo__form");
const todoList = document.querySelector(".todo__list");
const filterSelect = document.querySelector(".todo__filter");

//! Event Listeners
todoForm.addEventListener("submit", handleAddTodo);
filterSelect.addEventListener("change", handleFilterChange);

//! Handlers
function handleAddTodo(e) {
  e.preventDefault();
  if (!todoInput.value.trim()) return;

  const newTodo = createTodo(todoInput.value.trim());
  todos.push(newTodo);

  renderTodos(todos);

  clearInput();
}

function handleFilterChange(e) {
  const filter = e.target.value;
  let filtered = [];

  if (filter === "completed") {
    filtered = todos.filter((todo) => todo.isCompleted);
  } else if (filter === "incomplete") {
    filtered = todos.filter((todo) => !todo.isCompleted);
  } else {
    filtered = todos;
  }

  renderTodos(filtered);
}

function handlerRemoveTodo(e) {
  const todoId = Number(e.target.dataset.todo__id);
  todos = todos.filter((todo) => todo.id !== todoId);

  renderTodos(todos);
}

function handlerCheckTodo(e) {
  const todoId = Number(e.target.dataset.todo__id);
  const checkedTodo = todos.find((t) => t.id === todoId);
  checkedTodo.isCompleted = !checkedTodo.isCompleted;
  renderTodos(todos);
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
