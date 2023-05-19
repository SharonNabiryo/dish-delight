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
  addTabContent(this, currentActivePanel);
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

// -------------API----------------

const apiUrl = " https://api.edamam.com/api/recipes/v2";
const apiKey = "2458ff35ec0ecd41289915e93b4d391c	";
const appId = "4245a1a0";
const type = "public";

const fetchRecipes = async (queries, successCallback) => {
  const query = queries
    .flatMap((q) => q.join("="))
    .join("&")
    .replace(/,/g, "=")
    .replace(/ /g, "%20")
    .replace(/\+/g, "%2B");

  const url = `${apiUrl}?app_id=${appId}&app_key=${apiKey}&type=${type}${
    query ? `&${query}` : ""
  }`;

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    successCallback(data);
  }
};

const cardQueries = [
  ["field", "url"],
  ["field", "label"],
  ["field", "image"],
  ["field", "totalTime"],
];

// Skeleton Card
const skeletonCard = `
<div class="card skeleton-card">

<div class="skeleton card-banner"></div>

  <div class="card-body">
     <div class="skeleton card-title"></div>

     <div class="skeleton card-text"></div>
  </div>

  </div>
`;

// -----work with api-----
const addTabContent = (currentTabBtn, currentActivePanel) => {
  const gridList = document.createElement("div");
  gridList.classList.add("grid-list");

  currentActivePanel.innerHTML = `
  <div class="grid-list">
  ${skeletonCard.repeat(12)}
  </div>`;

  fetchRecipes(
    [
      ["mealType", currentTabBtn.textContent.trim().toLowerCase()],
      ...cardQueries,
    ],
    function (data) {
      // console.log(data);
      currentActivePanel.innerHTML = "";
      for (let i = 0; i < 12; i++) {
        //const { url, label, image, totalTime } = data.hits[i].recipe; // }
        const {
          recipe: { image, label: title, totalTime: cookingTime, uri },
        } = data.hits[i];

        const card = document.createElement("div");
        card.classList.add("card");
        card.style.animationDelay = `${100 * i}ms`;

        card.innerHTML = `
         <figure class="card-media img-holder">
                      <img
                        src="${image}"
                        alt="${title}"
                        width="195"
                        height="195"
                        loading="lazy"
                        class="img-cover"
                      />
                    </figure>
                    <div class="card-body">
                      <h3 class="title-small">
                        <a href="./detail.html" class="card-link"
                          >${title ?? "Untitled"}</a
                        >
                      </h3>
                      <div class="meta-wrapper">
                        <div class="meta-item">
                          <i class="fa-regular fa-clock"></i>
                          <!-- <span>Breakfast</span> -->
                          <span class="label-medium">${
                            cookingTime || ""
                          }</span><span class="label-medium">min</span>
                        </div>
                        <div
                          class="icon-btn has-state removed"
                          aria-label="Add to saved recipes"
                        >
                          <span aria-hidden="true"
                            ><i class="fa-solid fa-bookmark"></i
                          ></span>
                          <span aria-hidden="true">
                            <i class="fa-sharp fa-regular fa-bookmark"></i
                          ></span>
                        </div>
                      </div>
                    </div>
        `;

        gridList.appendChild(card);
      }
      currentActivePanel.appendChild(gridList);

      currentActivePanel.innerHTML += `
      <button class="btn btn-secondary">
                  <a
                    href="./recipes.html?mealType=${currentTabBtn.textContent
                      .trim()
                      .toLowerCase()}"
                    class="btn btn-secondary label-large has-state"
                    >Show more</a
                  >
                </button>`;
    }
  );
};
addTabContent(lastActiveBtn, lastActivePanel);

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
