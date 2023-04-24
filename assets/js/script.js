const openBtn = document.querySelector(".mobile-open-btn");
const closeBtn = document.querySelector(".mobile-close-btn");
const navBar = document.querySelector("nav");

const modalCloseBtn = document.querySelector(".modal-close-btn");
const addNewRecordBtn = document.querySelector(".add-new-record");
const addRecordModalWindow = document.querySelector(".add-record");
const overlay = document.querySelector(".overlay");

const updateRecordBtn = document.querySelector(".update-record-button");
const updateRecordModalWindow = document.querySelector(".update-record");
const updateModalCloseBtn = document.querySelector(".update-modal-close-btn");

const detailsRecordBtn = document.querySelector(".view-record-button");
const detailsRecordModalWindow = document.querySelector(".record-details");
const detailsModalCloseBtn = document.querySelector(".details-modal-close-btn");

openBtn.addEventListener("click", () => {
  navBar.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  navBar.classList.remove("open");
});

///////////////////////////////////////////

addNewRecordBtn.addEventListener("click", () => {
  addRecordModalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

modalCloseBtn.addEventListener("click", () => {
  addRecordModalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
});

///////////////////////////////////////////

updateRecordBtn.addEventListener("click", () => {
  updateRecordModalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

updateModalCloseBtn.addEventListener("click", () => {
  updateRecordModalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
});

///////////////////////////////////////////

detailsRecordBtn.addEventListener("click", () => {
  detailsRecordModalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

detailsModalCloseBtn.addEventListener("click", () => {
  detailsRecordModalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
});
