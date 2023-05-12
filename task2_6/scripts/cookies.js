function getCookies() {
  if (document.cookie.includes("todo-items=")) {
    const todoCookies = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("todo-items="))
      .split("=")[1];
    return todoCookies;
  }
}

function updateCookies(todoItems) {
  const todoCookies = JSON.stringify(todoItems);
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `todo-items=${todoCookies};` + expires + "path=/";
}

export { getCookies, updateCookies };
