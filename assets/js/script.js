const openBtn = document.querySelector(".mobile-open-btn");
const closeBtn = document.querySelector(".mobile-close-btn");
const navBar = document.querySelector("nav");

const modalCloseBtn = document.querySelector(".modal-close-btn");
const addNewRecordBtn = document.querySelector(".add-new-record");
const addRecordModalWindow = document.querySelector(".add-record");
const overlay = document.querySelector(".overlay");

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

// ====================================================================================================================

const addNewCompany = document.querySelector("#add-new-company");
const deleteRecordBtn = document.querySelector(".delete-record");

const addCompany = async (
  compnayName,
  companyDescription,
  companyKpiStartDate,
  companyKpiEndDate,
  userId
) => {
  const response = await axios({
    method: "POST",
    url: "http://127.0.0.1:4000/api/v1/company",
    data: {
      name: compnayName,
      description: companyDescription,
      startDate: companyKpiStartDate,
      endDate: companyKpiEndDate,
      userId,
    },
  });

  if (response.data.status === "success") {
    location.assign("/dashboard");
  }
};

addNewCompany.addEventListener("submit", (event) => {
  event.preventDefault();

  const compnayName = document.querySelector("#companyName").value;
  const companyDescription = document.querySelector(
    "#companyDescription"
  ).value;
  const companyKpiStartDate = document.querySelector(
    "#companyKpiStartDate"
  ).value;
  const companyKpiEndDate = document.querySelector("#companyKpiEndDate").value;

  const userId = document.querySelector("#userId").value;

  addCompany(
    compnayName,
    companyDescription,
    companyKpiStartDate,
    companyKpiEndDate,
    userId
  );
});

const deleteCompany = async (selectedIdArray) => {
  const response = await axios({
    method: "DELETE",
    url: "http://127.0.0.1:4000/api/v1/company",
    data: {
      selectedIdArray,
    },
  });

  if (response.data.status === "success") {
    location.assign("/dashboard");
  }
};

deleteRecordBtn.addEventListener("click", (event) => {
  const selectedRows = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );

  console.log(selectedRows);
  const selectedRowIds = Array.from(selectedRows).map((row) => row.value);

  if (selectedRowIds.length > 0) {
    deleteCompany(selectedRowIds);
  }
  //
});
