function getCookies() {
  if (document.cookie.includes("todo-items=")) {
    const todoCookies = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("todo-items="))
      .split("=")[1];
    let todoItems = JSON.parse(todoCookies);
    return todoItems;
  }
}

function updateCookies(todoItemsJSON) {
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `todo-items=${todoItemsJSON};` + expires + "path=/";
}

export { getCookies, updateCookies };
