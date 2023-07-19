//accordion
var accordionHeaders = document.querySelectorAll(".accordion-header");
accordionHeaders.forEach(function (header) {
  header.addEventListener("click", function () {
    var content = this.nextElementSibling;
    if (content.style.display === "none") {
      content.style.display = "block";
      this.querySelector(".accordion-icon").textContent = "-";
    } else {
      content.style.display = "none";
      this.querySelector(".accordion-icon").textContent = "+";
    }
  });
});

const cartIcon = document.querySelector(".cart");
const cartMenu = document.querySelector(".cart-menu");
const currency = document.querySelector(".currency");
const dropdownMenu = document.querySelector(".menu-currency");



const loginButton = document.getElementById("login-button");
const modal = document.getElementById("modal-login-form");
const modalInputs = modal.querySelectorAll("input");
// const enqButton = document.getElementById("enquiry-button");
// const modalEnq = document.getElementById("modal-enquiry-form");
const mobileNumber = document.getElementById("mobile-number");
const sentMessage = document.getElementById("sent-message");
const enterOtp = document.getElementById("enter-otp");
const loginScreen = document.getElementById("login-screen");
loginButton.addEventListener("click", function () {
  modal.style.display = "block";
});
// enqButton.addEventListener("click", function () {
//   modalEnq.style.display = "block";
// });

const closeIcon = document.querySelector(".close-icon");
const closeEnquiry = document.querySelector(".close-enquiry");
closeIcon.addEventListener("click", function () {
  modalInputs.forEach((i) => {
    i.value = "";
    i.removeAttribute("class");
  });

  modal.style.display = "none";
  showMobile();
});
closeEnquiry.addEventListener("click", function () {
  modalInputs.forEach((i) => {
    i.value = "";
    i.removeAttribute("class");
  });
  showMobile();
  showStep(steps1, step1Tab);
  // modalEnq.style.display = "none";
});

// calendar start
const calendar = document.querySelector(".calendar");
const header = calendar.querySelector(".header");
const monthYear = header.querySelector("#month-year");
const prevBtn = header.querySelector("#prevdate");
const nextBtn = header.querySelector("#nextdate");
const weekdays = calendar.querySelector(".weekdays");
const days = calendar.querySelector(".days");
const input = document.querySelector('input[name="tour-date-select"]');
const dateInput = document.querySelector("#date-input");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekdaysLong = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = new Date();

input.addEventListener("click", () => {
  calendar.classList.add("show");
});

prevBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});
dateInput.addEventListener("click", function () {
  if (calendar.style.display === "block") {
    calendar.style.display = "none";
  } else {
    calendar.style.display = "block";
  }
});
document.addEventListener("click", function (event) {
  const targetElement = event.target;
  if (targetElement !== dateInput) {
    calendar.style.display = "none";
  }
});
days.addEventListener("click", (event) => {
  const day = event.target.textContent;
  if (day !== "") {
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    input.value = selectedDate.toLocaleDateString("en-US");
    calendar.classList.remove("open");
  }
});
function selectDate(day) {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const selectedDate = `${month}/${day}/${year}`;
  input.value = selectedDate;
  calendar.style.display = "none";
}

function renderCalendar() {
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDayIndex = new Date(year, month, daysInMonth).getDay();

  monthYear.innerHTML = `${months[month]} ${year}`;

  let daysHtml = "";
  for (let i = 0; i < firstDayIndex; i++) {
    daysHtml += "<div></div>";
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysHtml += `<div onclick="selectDate(${i})">${i}</div>`;
  }
  for (let i = lastDayIndex + 1; i < 7; i++) {
    daysHtml += "<div></div>";
  }

  days.innerHTML = daysHtml;

  const today = new Date();
  if (
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  ) {
    const todayIndex = today.getDate() + firstDayIndex - 1;
    days.children[todayIndex].classList.add("today");
  } else {
    const todayEl = calendar.querySelector(".today");
    if (todayEl) {
      todayEl.classList.remove("today");
    }
  }
}

renderCalendar();

// calendar end

// night number start

const minusButton = document.querySelector(".minus-btn");
const plusButton = document.querySelector(".plus-btn");
const inputField = document.querySelector(".night-input");

minusButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputField.value > 1) {
    inputField.value--;
  }
});

plusButton.addEventListener("click", function (e) {
  e.preventDefault();
  inputField.value++;
});

// night number end

// search start
const searchButton = document.getElementById("searchButton");
const inputFieldFocus = document.getElementById("city-from");
const targetElement = document.querySelector(".quik-form");

searchButton.addEventListener("click", () => {
  const targetPosition = targetElement.offsetTop + 100; // Get the top offset of the target element
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth" // Scroll with smooth animation
  });
  inputFieldFocus.focus();
});

//City Suggetions

function showSuggestions(
  userInput,
  suggestionDropdownId,
  suggestions,
  inputFieldId
) {
  const matchingSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().startsWith(userInput.toLowerCase())
  );
  const suggestionDropdown = document.getElementById(suggestionDropdownId);

  if (matchingSuggestions.length === 0) {
    suggestionDropdown.innerHTML =
      '<li class="no-results">No Results Found</li>';
  } else {
    const suggestionList = matchingSuggestions.map(
      (suggestion) =>
        `<li onclick="selectSuggestion('${suggestion}', '${suggestionDropdownId}', '${inputFieldId}')">${suggestion}</li>`
    );
    suggestionDropdown.innerHTML = suggestionList.join("");
  }

  if (userInput === "") {
    suggestionDropdown.style.display = "none";
  } else {
    suggestionDropdown.style.display = "block";
  }
}

function selectSuggestion(value, suggestionDropdownId, inputFieldId) {
  const inputField = document.getElementById(inputFieldId);
  inputField.value = value;
  const suggestionDropdown = document.getElementById(suggestionDropdownId);
  suggestionDropdown.style.display = "none";
}

// Filter Popup
const toggleDropdown = (dropdownId) => {
  const dropdown = document.getElementById(dropdownId);
  const scrolledValue = document.documentElement.scrollTop;
  const overlayBgFilter = document.getElementById("overlay-bg");
  const body = document.body;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  body.classList.add("modal-open");
  body.style.marginRight = scrollbarWidth + "px";

  overlayBgFilter.style.display = overlayBgFilter.style.display === "block" ? "none" : "block";
  overlayBgFilter.style.zIndex = "999";
  overlayBgFilter.style.top = scrolledValue + "px";

  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  dropdown.style.top = scrolledValue+ 106 + "px";
};
// Filter Close
const closeFilter = document.querySelector(".close-filter");
const clearFilter = document.querySelector(".clear-filter");
const filtersDiv = document.getElementById("filterSearch");
closeFilter.addEventListener("click", function () {
  closeDD();
});
clearFilter.addEventListener("click", function () {
  console.log("Please clear all selected filter here!")
  closeDD();
});
document.getElementById("overlay-bg").addEventListener("click", function () {
  closeDD();
});
const closeDD= () => {
  const body = document.body;
  filtersDiv.removeAttribute("style");
  body.removeAttribute("class");
  body.removeAttribute("style");
  document.getElementById("overlay-bg").removeAttribute("style");
}
// Filter Apply

// Filter Apply Code Goes Here

// slider range
const priceRange = document.getElementById("priceRange");
const sliderValue = document.getElementById("sliderValue");

priceRange.addEventListener("input", function () {
  sliderValue.textContent = priceRange.value;
});

function addActiveClassToListItems(containerId) {
  const container = document.getElementById(containerId);
  const listItems = container.querySelectorAll("ul li");
  listItems.forEach(function (item) {
    item.addEventListener("click", function () {
      listItems.forEach(function (li) {
        li.classList.remove("active");
      });

      item.classList.add("active");
      const label = item.querySelector("label");
      const value = label.textContent.trim();
    });
  });
}

addActiveClassToListItems("hotel-category");
addActiveClassToListItems("flights");

function showMobile() {
  mobileNumber.classList.remove("hidden");
  sentMessage.classList.add("hidden");
  enterOtp.classList.add("hidden");
  loginScreen.classList.add("hidden");
}
function showSentMessage() {
  mobileNumber.classList.add("hidden");
  sentMessage.classList.remove("hidden");
}

function showEnterOTP() {
  sentMessage.classList.add("hidden");
  enterOtp.classList.remove("hidden");
}

function showLoginScreen() {
  enterOtp.classList.add("hidden");
  loginScreen.classList.remove("hidden");
}

// Get references to the buttons and steps
const step1Tab = document.getElementById("step1Tab");
const step2Tab = document.getElementById("step2Tab");
const step3Tab = document.getElementById("step3Tab");
const steps1 = document.getElementById("steps1");
const steps2 = document.getElementById("steps2");
const steps3 = document.getElementById("steps3");

// Function to show a step and make its tab active
function showStep(step, tab) {
  // Hide all steps
  steps1.classList.add("hidden");
  steps2.classList.add("hidden");
  steps3.classList.add("hidden");

  // Remove "active" class from all tabs
  step1Tab.classList.remove("active");
  step2Tab.classList.remove("active");
  step3Tab.classList.remove("active");

  // Show the specified step and make its tab active
  step.classList.remove("hidden");
  tab.classList.add("active");
}

// Add click event listeners to the step tabs
step1Tab.addEventListener("click", () => {
  showStep(steps1, step1Tab);
});

step2Tab.addEventListener("click", () => {
  showStep(steps2, step2Tab);
});

step3Tab.addEventListener("click", () => {
  showStep(steps3, step3Tab);
});

// Add click event listener to the Step 1 submit button
const step1SubmitButton = steps1.querySelector('button[type="submit"]');
step1SubmitButton.addEventListener("click", () => {
  showStep(steps2, step2Tab);
});

// Add click event listener to the Step 2 submit button
const step2SubmitButton = steps2.querySelector('button[type="submit"]');
step2SubmitButton.addEventListener("click", () => {
  showStep(steps3, step3Tab);
});
//function to open trip enquiry
function openTripForm() {
  modal.style.display = "none";
  showStep(steps1, step1Tab);
  modalEnq.style.display = "block";
}

// Input Focus & Blur Effect
function focusInput(e) {
  e.target.className = "i-m-clicked";
  console.log(e.target.id);
  if (e.target.id === duration) {
    console.log("e.target.parentNode", e.target.parentNode);
  }
}

function blurInput(e) {
  if (e.target.value.length < 1) {
    e.target.removeAttribute("class");
  }
}
function otpNextButton(e) {
  console.log(e.target.value.length);
  if (e.target.value.length === 0) {
    // console.log(document.querySelector(".otp-inputs").indexOf(e.target));
    return false;
  }
}

// Get the input and dropdown time
const inputElement = document.querySelector(".dropdown input");
const dropdownElement = document.querySelector(".dropdown-time");

const listItems = dropdownElement.querySelectorAll("li");
listItems.forEach((item) => {
  item.addEventListener("click", () => {
    inputElement.value = item.textContent;
    dropdownElement.classList.add("dn");
  });
});

inputElement.addEventListener("click", () => {
  dropdownElement.classList.toggle("dn");
});

//Sort List Toggle
// const sortBtn = document.querySelector(".sort-btn");
// const sortList = document.querySelector(".sort-list");
// sortBtn.addEventListener("click", function (event) {
//   console.log(event.target);
//   event.stopPropagation();
//   sortList.classList.toggle("show");
//   body.classList.toggle("no-scroll");
//   overlayBg.classList.toggle("on");
// });
// document.addEventListener("click", function (event) {
//   if (
//     (!sortList.contains(event.target) && event.target !== sortBtn) ||
//     event.target == backButton ||
//     event.target == backIcon
//   ) {
//     sortList.classList.remove("show");
//   }
// });
