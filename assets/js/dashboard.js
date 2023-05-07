const addNewCompany = document.querySelector("#add-new-company");
const deleteRecordBtn = document.querySelector(".delete-record");
const logOutBtn = document.querySelector(".logOutBtn");

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

logOutBtn.addEventListener("click", async (event) => {
  console.log("A");
  try {
    const response = await axios({
      method: "GET",
      url: "http://127.0.0.1:4000/api/v1/users/logout",
    });

    if (response.data.status === "success") {
      location.reload(true);
    }
  } catch (error) {
    console.log("Error in Logout Process...!");
  }
});
