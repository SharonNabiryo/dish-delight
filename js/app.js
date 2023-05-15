// ------------HOME PAGE-----

const searchField = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  if (searchField.value)
    window.location = `recipes.html?q=${searchField.value}`;
});
// ----------enter key
searchField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

let lastActivePanel = tabPanels[0];
let lastActiveBtn = tabBtns[0];

function addEventOnElements(elements, eventName, listener) {
  elements.forEach((element) => {
    element.addEventListener(eventName, listener);
  });
}

addEventOnElements(tabBtns, "click", function () {
  lastActivePanel.classList.add("hidden");
  lastActiveBtn.setAttribute("aria-selected", "false");
  lastActiveBtn.setAttribute("tabindex", "-1");

  const currentActivePanel = document.querySelector(
    `#${this.getAttribute("aria-controls")}`
  );
  currentActivePanel.classList.remove("hidden");
  this.setAttribute("aria-selected", "true");
  this.setAttribute("tabindex", "0");

  lastActivePanel = currentActivePanel;
  lastActiveBtn = this;
});

// -------Navigate tabs with arrow keys
addEventOnElements(tabBtns, "keydown", (e) => {
  const nextElment = this.nextElementSibling;
  const previousElement = this.previousElementSibling;

  if (e.key === "ArrowRight" && nextElment) {
    this.setAttribute("tabindex", -1);
    nextElment.setAttribute("tabindex", 0);
    nextElment.focus();
  } else if (e.key === "ArrowLeft" && previousElement) {
    this.setAttribute("tabindex", -1);
    previousElement.setAttribute("tabindex", 0);
    previousElement.focus();
  } else if (e.key === "Tab") {
    this.setAttribute("tabindex", -1);
    lastActiveBtn.setAttribute("tabindex", 0);
  }
});

// addEventOnElements(tabBtns, "click", () => {
//   lastActivePanel.classList("hidden", "");
//   lastActiveBtn.setAttribute("aria-selected", "false");
//   lastActiveBtn.setAttribute("tabindex", "-1");

//   const currentActivePanel = document.querySelector(
//     `${this.getAttribute("aria-controls")}`
//   );
//   currentActivePanel.classList.remove("hidden");
//   this.setAttribute("aria-selected", "true");
//   this.setAttribute("tabindex", "0");

//   lastActivePanel = currentActivePanel;
//   lastActiveBtn = this;
// });

// -------------DARK MODE
const content = document.getElementsByTagName("body")[0];
const darkMode = document.getElementById("dark-change");

darkMode.addEventListener("click", function () {
  darkMode.classList.toggle("active");
  content.classList.toggle("night");
});
