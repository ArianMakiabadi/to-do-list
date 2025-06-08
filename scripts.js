const todos = [];

//? reading the data from our form

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");

todoForm.addEventListener("submit", addNewTodo);

function addNewTodo(e) {
  e.preventDefault();

  //? creating todo
  const now = new Date();
  const date = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
  const newTodo = {
    todo__title: todoInput.value,
    createdAt: date,
    id: new Date().getTime(),
    iscompleted: false,
  };

  todos.push(newTodo);

  //? adding todos to DOM
  renderTodos(todos);
}

function renderTodos(todos) {
  let todoItem = "";
  todos.forEach((todo) => {
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
  });

  todoList.innerHTML = todoItem;
  todoInput.value = "";
}

//? filtering todos
const selectedFilter = document.querySelector(".filter-todos");

selectedFilter.addEventListener("change", filterTodos);

function filterTodos(e) {
  const filter = e.target.value;
  switch (filter) {
    case "all": {
      renderTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => t.iscompleted);
      console.log(filteredTodos);
      renderTodos(filteredTodos);
      break;
    }
    case "incomplete": {
      const filteredTodos = todos.filter((t) => !t.iscompleted);
      console.log(filteredTodos);
      renderTodos(filteredTodos);
      break;
    }
    default: {
      renderTodos(todos);
      break;
    }
  }
}
