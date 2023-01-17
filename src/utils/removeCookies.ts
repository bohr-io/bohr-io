export default function removeCookies() {
  document
    .cookie
    .split(";")
    .forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}
