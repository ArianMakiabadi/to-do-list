const todos = [];

//? reading the data from our form

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(todoInput.value);
  todoInput.value = "";
});
