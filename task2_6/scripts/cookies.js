function getCookies(name) {
  if (document.cookie.includes(name + "=")) {
    const cookies = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith(name + "="))
      .split("=")[1];
    return cookies;
  }
}

function updateCookies(name, value) {
  const cookies = JSON.stringify(value);
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${cookies};` + expires + "path=/";
}

export { getCookies, updateCookies };
