const todos = [];

//? reading the data from our form

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  todos.push(createTodo(todoInput.value));
  todoInput.value = "";
});

//? creating todos

function createTodo(title) {
  const now = new Date();
  const date = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
  return {
    todo__title: title,
    createdAt: date,
    id: new Date().getTime(),
    iscompleted: false,
  };
}
