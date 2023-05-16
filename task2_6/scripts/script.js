// Import cookies.js module to work with cookies
import { getCookies, updateCookies } from "./cookies.js";

// Select input and buttons
const form = document.getElementById("form");
const formInput = document.getElementById("formInput");
const formButton = document.getElementById("formButton");
const todoItemsList = document.getElementById("listItems");
const deleteAllButton = document.querySelector(".list__footer-button");

// Set initial input focus
formInput.focus();

// Add event listeners to form and button
form.addEventListener("submit", (event) => onAddItem(event));
deleteAllButton.addEventListener("click", () => deleteAllItems());

// Set name of ToDo cookies
const todoCookiesName = "todo-items";

// Set array of items
let todoItems = JSON.parse(getCookies(todoCookiesName));

// Set flag for editing operations
let editButtonIsActivated = false;

// Render (or re-render) items
function renderItems(todoItems) {
  todoItemsList.innerHTML = "";
  for (let i = 0; i < todoItems.length; i++) {
    const itemIndex = i;
    const itemHTML = document.createElement("li");
    itemHTML.classList.add("list__item");
    itemHTML.innerHTML = `
      <span class="list__item-text">${todoItems[i]}</span>
        <img
          id="editButton${itemIndex}"
          class="list__item-icon"
          src="./images/icon-edit.svg"
          alt="Edit Item"
          title="Edit Item"
        />
        <img
          id="deleteButton${itemIndex}"
          class="list__item-icon"
          src="./images/icon-delete.svg"
          alt="Delete Item"
          title="Delete Item"
        />`;
    todoItemsList.append(itemHTML);
    const editButton = document.getElementById(`editButton${itemIndex}`);
    editButton.addEventListener("click", () => onClickEdit(itemIndex));
    const deleteButton = document.getElementById(`deleteButton${itemIndex}`);
    deleteButton.addEventListener("click", () => deleteItem(itemIndex));
  }
}

// Get data from client input
function onAddItem(event) {
  event.preventDefault();
  if (formInput.value && !/^\s*$/.test(formInput.value)) {
    const formData = new FormData(event.target);
    const newItem = formData.get("item");
    formInput.value = "";
    formInput.focus();
    addItem(newItem);
  }
}

// Add new item to list
function addItem(newItem) {
  todoItems.push(newItem);
  updateCookies(todoCookiesName, todoItems);
  renderItems(todoItems);
}

// Handle click event on Edit Button
function onClickEdit(itemIndex) {
  if (!editButtonIsActivated) {
    const allIcons = document.getElementsByClassName("list__item-icon");
    [...allIcons].forEach((icon) => {
      icon.classList.add("list__item-icon--inactive");
    });
    deleteAllButton.classList.add("list__footer-button--inactive");
    form.removeEventListener("submit", (event) => onAddItem(event));
    form.addEventListener("submit", (event) => onEditItem(event, itemIndex));
    formInput.focus();
    formInput.value = todoItems[itemIndex];
    formButton.innerText = "Save";
    editButtonIsActivated = true;
  }
}

// Handle click event on Save Button
function onEditItem(event, itemIndex) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newValue = formData.get("item");
  editItem(itemIndex, newValue);
  form.removeEventListener("submit", (event) => onEditItem(event, itemIndex));
  form.addEventListener("submit", (event) => onAddItem(event));
  const allIcons = document.getElementsByClassName("list__item-icon");
  [...allIcons].forEach((icon) => {
    icon.classList.remove("list__item-icon--inactive");
  });
  deleteAllButton.classList.remove("list__footer-button--inactive");
  formInput.value = "";
  formButton.innerText = "Add";
  editButtonIsActivated = false;
}

// Edit item
function editItem(itemIndex, newValue) {
  todoItems[itemIndex] = newValue;
  updateCookies(todoCookiesName, todoItems);
  renderItems(todoItems);
}

// Delete item from a list
function deleteItem(itemIndex) {
  if (!editButtonIsActivated) {
    delete todoItems[itemIndex];
    const filteredTodoItems = todoItems.filter(Boolean);
    updateCookies(todoCookiesName, filteredTodoItems);
    renderItems(filteredTodoItems);
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

// Initial call of function to render all items from cookies (in case there are any)
renderItems(todoItems);
