"use strict";

// Select input and buttons
const form = document.getElementById("form");
const formInput = document.getElementById("formInput");
const formButton = document.getElementById("formButton");
const listItems = document.getElementById("listItems");
const deleteAllButton = document.getElementById("deleteAllButton");

// Set initial input focus
formInput.focus();

// Add event listeners to form and button
form.addEventListener("submit", addItem);
deleteAllButton.addEventListener("click", deleteAllItems);

// Set counter for each new item
let counter = 0;

// Set array for items
let items = [];

function initialItemRender() {
  let allCookies = document.cookie.split(";");
  console.log(allCookies);

  let itemsCookies = allCookies.find((cookie) =>
    cookie.trim().startsWith("list-items=")
  );
  console.log(itemsCookies);

  let itemsCookiesJSON = itemsCookies.split("=")[1];
  console.log(itemsCookiesJSON);

  let items = JSON.parse(itemsCookiesJSON);
  console.log(items);

  for (let i = 0; i < items.length; i++) {
    let item = document.createElement("li");
    item.classList.add("list__item");
    item.innerHTML = `        
      <span class="list__item-text">${items[i]}</span>
      <img
        id="editButton${i}"
        class="list__item-icon"
        src="./images/icon-edit.svg"
        alt="Edit Item"
        title="Edit Item"
      />
      <img
        id="deleteButton${i}"
        class="list__item-icon"
        src="./images/icon-delete.svg"
        alt="Delete Item"
        title="Delete Item"
      />`;
    listItems.append(item);
    const editButton = document.getElementById(`editButton${i}`);
    editButton.addEventListener("click", () => editItem(item));
    const deleteButton = document.getElementById(`deleteButton${i}`);
    deleteButton.addEventListener("click", () => deleteItem(item));
  }
}

initialItemRender();

// Add new item to list
function addItem() {
  if (!formInput.value || /^\s+$/.test(formInput.value)) {
    event.preventDefault();
  } else {
    event.preventDefault();
    counter++;
    let itemText = formInput.value;
    let item = document.createElement("li");
    item.id = `item${counter}`;
    item.classList.add("list__item");
    item.innerHTML = `        
    <span class="list__item-text">${itemText}</span>
    <img
      id="editButton${counter}"
      class="list__item-icon"
      src="./images/icon-edit.svg"
      alt="Edit Item"
      title="Edit Item"
    />
    <img
      id="deleteButton${counter}"
      class="list__item-icon"
      src="./images/icon-delete.svg"
      alt="Delete Item"
      title="Delete Item"
    />`;
    listItems.append(item);
    const editButton = document.getElementById(`editButton${counter}`);
    editButton.addEventListener("click", () => editItem(item));
    const deleteButton = document.getElementById(`deleteButton${counter}`);
    deleteButton.addEventListener("click", () => deleteItem(item));
    formInput.value = "";

    // Work with cookies
    items.push(itemText);
    console.log(items);
    let itemsJSON = JSON.stringify(items);
    console.log(itemsJSON);

    const date = new Date();
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `list-items=${itemsJSON}; ` + expires + "path=/";
    console.log(document.cookie);
  }
}

// Edit item
function editItem(item) {
  const allIcons = document.getElementsByTagName("img");
  [...allIcons].forEach((icon) => {
    icon.style.filter = "grayscale(100%)";
    icon.style.cursor = "not-allowed";
  });
  form.removeEventListener("submit", addItem);
  form.addEventListener("submit", saveItem);
  formInput.focus();
  formInput.value = item.querySelector(".list__item-text").innerText;
  formButton.innerText = "Save";

  // Save edited item
  function saveItem() {
    event.preventDefault();
    let itemText = formInput.value;
    item.querySelector(".list__item-text").innerText = itemText;
    formButton.innerText = "Add";
    form.removeEventListener("submit", saveItem);
    form.addEventListener("submit", addItem);
    const allIcons = document.getElementsByTagName("img");
    [...allIcons].forEach((icon) => {
      icon.style.filter = "none";
      icon.style.cursor = "pointer";
    });
    formInput.value = "";
  }
}

// Delete item from a list
function deleteItem(item) {
  item.remove();
}

// Delete all items in list
function deleteAllItems() {
  listItems.innerHTML = "";
  document.cookie = `list-items=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
