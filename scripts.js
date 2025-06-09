const todos = [];

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
}

function generateTodoHTML(todo) {
  return `
    <li class="todo">
      <p class="todo__title">${todo.title}</p>
      <span class="createdAt">${todo.createdAt}</span>
      <button class="todo__check">
        <i class="fa-solid fa-check"></i>
      </button>
      <button class="todo__remove">
        <i class="far fa-trash-alt"></i>
      </button>
    </li>
  `;
}

function clearInput() {
  todoInput.value = "";
}
