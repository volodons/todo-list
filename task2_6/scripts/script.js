// Import cookies.js module to work with cookies
import { getCookies, updateCookies } from "./cookies.js";

// Select input and buttons
const form = document.getElementById("form");
const formInput = document.getElementById("formInput");
const formButton = document.getElementById("formButton");
const todoItemsList = document.getElementById("listItems");
const deleteAllButton = document.getElementById("deleteAllButton");

// Set initial input focus
formInput.focus();

// Add event listeners to form and button
form.addEventListener("submit", addItem);
deleteAllButton.addEventListener("click", deleteAllItems);

// Set name of ToDo cookies
const todoCookiesName = "todo-items";

// Set array of items
let todoItems = JSON.parse(getCookies(todoCookiesName));

// Set flag for editing operations
let editButtonIsActivated = false;

function renderItems(items, container) {
  if (document.cookie.includes(todoCookiesName)) {
    container.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
      const todoItemIndex = items.indexOf(items[i]);
      const todoItemHTML = document.createElement("li");
      todoItemHTML.classList.add("list__item");
      todoItemHTML.innerHTML = `
      <span class="list__item-text">${items[i]}</span>
        <img
          id="editButton${todoItemIndex}"
          class="list__item-icon"
          src="./images/icon-edit.svg"
          alt="Edit Item"
          title="Edit Item"
        />
        <img
          id="deleteButton${todoItemIndex}"
          class="list__item-icon"
          src="./images/icon-delete.svg"
          alt="Delete Item"
          title="Delete Item"
        />`;
      container.append(todoItemHTML);
      const editButton = document.getElementById(`editButton${todoItemIndex}`);
      editButton.addEventListener("click", () => editItem(todoItemIndex));
      const deleteButton = document.getElementById(
        `deleteButton${todoItemIndex}`
      );
      deleteButton.addEventListener("click", () => deleteItem(todoItemIndex));
    }
  }
}

// Add new item to list
function addItem(event) {
  event.preventDefault();
  if (formInput.value && !/^\s*$/.test(formInput.value)) {
    const todoItem = formInput.value;
    todoItems.push(todoItem);
    updateCookies(todoCookiesName, todoItems);
    renderItems(todoItems, todoItemsList);
    formInput.value = "";
    formInput.focus();
  }
}

// Edit item
function editItem(todoItemIndex) {
  if (!editButtonIsActivated) {
    const allIcons = document.getElementsByTagName("img");
    [...allIcons].forEach((icon) => {
      icon.style.filter = "grayscale(100%)";
      icon.style.cursor = "not-allowed";
    });
    deleteAllButton.style.filter = "grayscale(100%)";
    deleteAllButton.style.cursor = "not-allowed";
    form.removeEventListener("submit", addItem);
    form.addEventListener("submit", saveItem);
    formInput.focus();
    formInput.value = todoItems[todoItemIndex];
    formButton.innerText = "Save";
    editButtonIsActivated = true;
  }

  // Save edited item
  function saveItem() {
    event.preventDefault();
    const todoItem = formInput.value;
    todoItems[todoItemIndex] = todoItem;
    updateCookies(todoCookiesName, todoItems);
    renderItems(todoItems, todoItemsList);
    formButton.innerText = "Add";
    form.removeEventListener("submit", saveItem);
    form.addEventListener("submit", addItem);
    const allIcons = document.getElementsByTagName("img");
    [...allIcons].forEach((icon) => {
      icon.style.filter = "none";
      icon.style.cursor = "pointer";
    });
    deleteAllButton.style.filter = "none";
    deleteAllButton.style.cursor = "pointer";
    formInput.value = "";
    editButtonIsActivated = false;
  }
}

// Delete item from a list
function deleteItem(todoItemIndex) {
  if (!editButtonIsActivated) {
    delete todoItems[todoItemIndex];
    todoItems = todoItems.filter(Boolean);
    updateCookies(todoCookiesName, todoItems);
    renderItems(todoItems, todoItemsList);
  }
}

// Delete all items in list
function deleteAllItems() {
  if (!editButtonIsActivated) {
    todoItemsList.innerHTML = "";
    todoItems = [];
    updateCookies(todoCookiesName, todoItems);
  }
}

renderItems(todoItems, todoItemsList);
