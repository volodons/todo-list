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

// Add new item to list
function addItem() {
  counter++;
  event.preventDefault();
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
}

// Edit item
function editItem(item) {
  const allIcons = document.getElementsByTagName("img");
  const allIconButtons = document.getElementsByClassName("list__item-button");
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
    itemText = formInput.value;
    item.querySelector(".list__item-text").innerText = itemText;
    formButton.innerText = "Add";
    form.removeEventListener("submit", saveItem);
    form.addEventListener("submit", addItem);
    const allIcons = document.getElementsByTagName("img");
    [...allIcons].forEach((icon) => {
      icon.style.filter = "none";
      icon.style.cursor = "pointer";
    });
  }
}

// Delete item from a list
function deleteItem(item) {
  item.remove();
}

// Delete all items in list
function deleteAllItems() {
  listItems.innerHTML = "";
}
