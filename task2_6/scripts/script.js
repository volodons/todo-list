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

// Set array of items
let todoItems = [];

// Set flag for editing operations
let editButtonIsActivated = false;

function renderItems() {
  if (document.cookie.includes("todo-items=")) {
    todoItemsList.innerHTML = "";
    todoItems = getCookies();
    for (let i = 0; i < todoItems.length; i++) {
      const todoItemIndex = todoItems.indexOf(todoItems[i]);
      const todoItemHTML = document.createElement("li");
      todoItemHTML.classList.add("list__item");
      todoItemHTML.innerHTML = `
      <span class="list__item-text">${todoItems[i]}</span>
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
      todoItemsList.append(todoItemHTML);
      const editButton = document.getElementById(`editButton${todoItemIndex}`);
      editButton.addEventListener("click", () =>
        editItem(todoItemHTML, todoItemIndex)
      );
      const deleteButton = document.getElementById(
        `deleteButton${todoItemIndex}`
      );
      deleteButton.addEventListener("click", () =>
        deleteItem(todoItemHTML, todoItemIndex)
      );
    }
  }
}

// Add new item to list
function addItem(event) {
  event.preventDefault();
  if (formInput.value && !/^\s*$/.test(formInput.value)) {
    const todoItem = formInput.value;
    todoItems.push(todoItem);
    const todoItemsJSON = JSON.stringify(todoItems);
    updateCookies(todoItemsJSON);
    renderItems();
    formInput.value = "";
    formInput.focus();
  }
}

// Edit item
function editItem(todoItemHTML, todoItemIndex) {
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
    formInput.value = todoItemHTML.querySelector(".list__item-text").innerText;
    formButton.innerText = "Save";
    editButtonIsActivated = true;
  }

  // Save edited item
  function saveItem() {
    event.preventDefault();
    const todoItem = formInput.value;
    todoItems[todoItemIndex] = todoItem;
    const todoItemsJSON = JSON.stringify(todoItems);
    updateCookies(todoItemsJSON);
    renderItems();
    todoItemHTML.querySelector(".list__item-text").innerText = todoItem;
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
function deleteItem(todoItemHTML, todoItemIndex) {
  if (!editButtonIsActivated) {
    todoItemHTML.remove();
    delete todoItems[todoItemIndex];
    todoItems = todoItems.filter(Boolean);
    const todoItemsJSON = JSON.stringify(todoItems);
    updateCookies(todoItemsJSON);
    renderItems();
  }
}

// Delete all items in list
function deleteAllItems() {
  if (!editButtonIsActivated) {
    todoItemsList.innerHTML = "";
    todoItems = [];
    const todoItemsJSON = JSON.stringify(todoItems);
    updateCookies(todoItemsJSON);
  }
}

renderItems();
