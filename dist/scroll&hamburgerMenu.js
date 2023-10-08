window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

const navMenu = document.getElementById("nav-menu");
const hamburger = document.querySelector("#hamburger");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("-translate-y-80");
  navMenu.classList.toggle("opacity-0");
});

document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target)) {
    navMenu.classList.add("-translate-y-80");
    navMenu.classList.add("opacity-0");
  }
});

const loginBtn = document.getElementById("login-btn");
const authenticationModal = document.getElementById("authentication-modal");
document.addEventListener("click", (e) => {
  if (!loginBtn.contains(e.target) && !navMenu) {
    authenticationModal.classList.add("hidden");
  }
});
const settingBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("small-modal");
document.addEventListener("click", (e) => {
  if (!settingBtn.contains(e.target) && !navMenu) {
    settingsModal.classList.add("hidden");
  }
});
