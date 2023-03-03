// Displays current date and time on page
window.setInterval(function () {
  $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
}, 1000);

var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");

var todos = [];

// Shows the results of the inputs
function renderTodos() {
  // Blanks out the input form, and creates the count for todos
  todoList.innerHTML = "";

  // For each todo added, creates a list item, adds to index, and a button after it saying complete
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("BUTTON");
    var txt = document.createTextNode("\u00D7");
    button.className = "close";
    button.appendChild(txt);
    li.appendChild(button);

    todoList.appendChild(li);
  }
}

// Starts on refresh with stored todos
function init() {
  // Get stored info and parse it to objects, and save to storedtodos
  var storedTodos = JSON.parse(localStorage.getItem("todos"));
  // Makes stored todos into todos (current for user)
  if (storedTodos !== null) {
    todos = storedTodos;
  }
  // Displays on page
  renderTodos();
}

function storeTodos() {
  // Takes todos and stores them as string
  localStorage.setItem("todos", JSON.stringify(todos));
}
// Tells when user clicks on submit and stops from infinite repeat, removes beginning and ending spaces from whatever put in form
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var todoText = todoInput.value.trim();
  // If nothing is written don't do anything
  if (todoText === "") {
    return;
  }
  // Whatever valid is inputted gets saved as text in array for todos and re-sets form to blank
  todos.push(todoText);
  todoInput.value = "";

  // Takes all inputs and puts into local storage, shows local stored todos on screen (updates with new inputs)
  storeTodos();
  renderTodos();
});

// When click on todo item button complete...
todoList.addEventListener("click", function (event) {
  var element = event.target;
  // Click on button takes info on which item was clicked, and replaces next item to that spot (changes the array index to match the items left)
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);
    // Takes all inputs and puts into local storage, shows local stored todos on screen
    storeTodos();
    renderTodos();
  }
});

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

init();
