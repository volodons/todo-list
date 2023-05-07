// Select input and buttons
const submitForm = document.getElementById("submitForm");
const submitFormInput = document.getElementById("submitFormInput");
const listItems = document.getElementById("listItems");
const editButton = document.getElementById("editButton");
const deleteAllButton = document.getElementById("deleteAllButton");

// Add event listeners to buttons
submitForm.addEventListener("submit", submitItem);

// Submits an item to list
function submitItem(event) {
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
      id="deleteButton"
      class="list__item-icon"
      src="./images/icon-delete.svg"
      alt="Delete Item"
      title="Delete Item"
    />`;
  listItems.append(item);
  const deleteButton = document.getElementById("deleteButton");
  deleteButton.addEventListener("click", deleteItem);
}
