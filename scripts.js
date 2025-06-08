const todos = [];

//? reading the data from our form

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  todos.push(createTodo(todoInput.value));
  console.log(todos);

  addTodo(todos);

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

//? adding todos into DOM
function addTodo(todosArray) {
  let todoItem = "";
  todosArray.forEach((todo) => {
    const todoList = document.querySelector(".todolist");
    todoItem += `<li class="todo">
                  <p class="todo__title">${todo.todo__title}</p>
                  <span class="createdAt">${todo.createdAt}</span>
                  <button class="todo__check">
                    <i class="fa-solid fa-check"></i>
                  </button>
                  <button class="todo__remove">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </li>`;
    todoList.innerHTML = todoItem;
  });
}
