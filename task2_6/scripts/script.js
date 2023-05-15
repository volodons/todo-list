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
form.addEventListener("submit", (event) =>
  getInput(event, todoItems, todoItemsList, todoCookiesName)
);
deleteAllButton.addEventListener("click", () =>
  deleteAllItems(todoItems, todoItemsList, todoCookiesName)
);

// Set name of ToDo cookies
const todoCookiesName = "todo-items";

// Set array of items
let todoItems = JSON.parse(getCookies(todoCookiesName));

// Set flag for editing operations
let editButtonIsActivated = false;

function renderItems(items, container, cookiesName) {
  container.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    const itemIndex = i;
    const itemHTML = document.createElement("li");
    itemHTML.classList.add("list__item");
    itemHTML.innerHTML = `
      <span class="list__item-text">${items[i]}</span>
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
    container.append(itemHTML);
    const editButton = document.getElementById(`editButton${itemIndex}`);
    editButton.addEventListener("click", () =>
      editItem(items, container, itemIndex, cookiesName)
    );
    const deleteButton = document.getElementById(`deleteButton${itemIndex}`);
    deleteButton.addEventListener("click", () =>
      deleteItem(items, container, itemIndex, cookiesName)
    );
  }
}

// Get data from client input
function getInput(event, items, container, cookiesName) {
  event.preventDefault();
  if (formInput.value && !/^\s*$/.test(formInput.value)) {
    const formData = new FormData(event.target);
    const input = formData.get("item");
    formInput.value = "";
    formInput.focus();
    addItem(input, items, container, cookiesName);
  }
}

// Add new item to list
function addItem(item, items, container, cookiesName) {
  todoItems.push(item);
  updateCookies(cookiesName, items);
  renderItems(items, container, cookiesName);
}

// Edit item
function editItem(items, container, itemIndex, cookiesName) {
  if (!editButtonIsActivated) {
    const allIcons = document.getElementsByClassName("list__item-icon");
    [...allIcons].forEach((icon) => {
      icon.classList.add("list__item-icon--inactive");
    });
    deleteAllButton.classList.add("list__footer-button--inactive");
    form.removeEventListener("submit", addItem);
    form.addEventListener("submit", saveItem);
    formInput.focus();
    formInput.value = items[itemIndex];
    formButton.innerText = "Save";
    editButtonIsActivated = true;
  }

  // Save edited item
  function saveItem(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const item = formData.get("item");
    items[itemIndex] = item;
    updateCookies(cookiesName, items);
    renderItems(items, container);
    formButton.innerText = "Add";
    form.removeEventListener("submit", saveItem);
    form.addEventListener("submit", addItem);
    const allIcons = document.getElementsByClassName("list__item-icon");
    [...allIcons].forEach((icon) => {
      icon.classList.remove("list__item-icon--inactive");
    });
    deleteAllButton.classList.remove("list__footer-button--inactive");
    formInput.value = "";
    editButtonIsActivated = false;
  }
}

// Delete item from a list
function deleteItem(items, itemsList, itemIndex, cookiesName) {
  if (!editButtonIsActivated) {
    delete items[itemIndex];
    items = items.filter(Boolean);
    updateCookies(cookiesName, items);
    renderItems(items, itemsList);
  }
}

// Delete all items in list
function deleteAllItems(items, itemsList, cookiesName) {
  if (!editButtonIsActivated) {
    itemsList.innerHTML = "";
    items = [];
    updateCookies(cookiesName, items);
  }
}

renderItems(todoItems, todoItemsList, todoCookiesName);
