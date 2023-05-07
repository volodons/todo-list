// Select input and buttons
const submitForm = document.getElementById("submitForm");
const submitFormInput = document.getElementById("submitFormInput");
const listItems = document.getElementById("listItems");
const editButton = document.getElementById("editButton");
const deleteAllButton = document.getElementById("deleteAllButton");

// Add event listeners to buttons
submitForm.addEventListener("submit", submitItem);
deleteAllButton.addEventListener("click", deleteAllItems);

// Counter for each new item
let counter = 0;

// Submits an item to list
function submitItem(event) {
  counter++;
  event.preventDefault();
  const itemText = submitFormInput.value;
  const item = document.createElement("li");
  item.classList.add("list__item");
  item.innerHTML = `        
    <span class="list__item-text">${itemText}</span>
    <img
      id="editButton"
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
  const deleteButton = document.getElementById(`deleteButton${counter}`);
  deleteButton.addEventListener("click", () => deleteItem(item));
}

// Delete item from a list
function deleteItem(item) {
  item.remove();
}

// Delete all items in list
function deleteAllItems() {
  listItems.innerHTML = "";
}
