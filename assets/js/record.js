// ====================================================================

window.addEventListener("load", () => {
  const spinnerContainer = document.querySelector(".preloaderContainer");
  spinnerContainer.classList.add("spinnerHide");
});
// ====================================================================

const inviteForm = document.querySelector("#inviteForm");
const kpiDataInput = document.querySelector("#kpiDataInput");
const invitedList = document.querySelector("#invitedList");

const userId = document.querySelector("#userId").value;
const companyId = document.querySelector("#companyId").value;

const addLiItem = (recordId) => {
  // create li element
  const listItem = document.createElement("li");

  // create span element
  const nameSpan = document.createElement("span");
  nameSpan.textContent = kpiDataInput.value;

  // create div element
  const kpiContainer = document.createElement("div");
  kpiContainer.classList.add("kpi-container");

  // create input element
  const slider = document.createElement("input");
  slider.type = "range";
  slider.classList.add("slider");
  slider.min = 0;
  slider.max = 100;
  slider.value = 0;
  slider.required = true;
  slider.disabled = true;
  slider.setAttribute("step", 20);

  // create a hidden input element
  const hiddenInput = document.createElement("input");
  hiddenInput.type = "text";
  hiddenInput.style.display = "none";
  hiddenInput.id = "kpiRecordId";
  hiddenInput.setAttribute("value", recordId);

  // add textare element
  const textarea = document.createElement("textarea");
  textarea.setAttribute("name", "#");
  textarea.setAttribute("id", "#");
  textarea.setAttribute("placeholder", "Enter Remarks");
  textarea.disabled = true;

  // create edit button element
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  // create remove button element
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";

  // append child elements to parent li
  kpiContainer.appendChild(slider);

  listItem.appendChild(nameSpan);
  listItem.appendChild(kpiContainer);
  listItem.appendChild(textarea);
  listItem.appendChild(editButton);
  listItem.appendChild(removeButton);
  listItem.appendChild(hiddenInput);

  return listItem;
};

// =====================================================================

// Add Record API Call
const addRecord = async (kpiData, percentage, companyId, userId) => {
  const response = await axios({
    method: "POST",
    url: "http://127.0.0.1:4000/api/v1/record/add/",
    data: {
      kpiData,
      percentage,
      companyId,
      userId,
    },
  });

  if (response.data.status === "success") {
    // location.assign(`/record/${companyId}`);
    const li = addLiItem(response.data.recordId);
    invitedList.appendChild(li);
  }
};

// =====================================================================

// Delete Record API Call
const deleteRecord = async (kpiRecordId, li) => {
  const response = await axios({
    method: "DELETE",
    url: "http://127.0.0.1:4000/api/v1/record/delete/",
    data: {
      kpiRecordId,
    },
  });

  if (response.data.status === "Success") {
    invitedList.removeChild(li);
    // location.assign(`/record/${companyId}`);
  }
};

// =====================================================================

const updateRecord = async (kpiRecordId, percentage, kpiData) => {
  const response = await axios({
    method: "PATCH",
    url: "http://127.0.0.1:4000/api/v1/record/update/",
    data: {
      kpiRecordId,
      kpiData,
      percentage,
    },
  });

  // if (response.data.status === "Success") {
  //   console.log("success");
  //   location.assign(`/record/${companyId}`);
  // }
};

// =====================================================================

inviteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (kpiDataInput.value != "") {
    const percentage = 0;
    await addRecord(kpiDataInput.value, percentage, companyId, userId);
    kpiDataInput.value = "";
  }
});

// =====================================================================

invitedList.addEventListener("click", (event) => {
  if (event.target.tagName == "BUTTON") {
    const button = event.target;
    const li = event.target.parentNode;

    if (button.textContent == "Remove") {
      // invitedList.removeChild(li);
      const kpiRecordId = li.lastElementChild.value;
      deleteRecord(kpiRecordId, li);
    } else if (button.textContent == "Edit") {
      li.children[1].firstElementChild.disabled = false;
      li.style.border = "2px solid #ffd831";
      const span = li.firstElementChild;
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = "Save";
    } else if (button.textContent == "Save") {
      li.style.border = "1px solid #eee";
      const input = li.firstElementChild;
      const span = document.createElement("span");
      span.textContent = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
      li.children[1].firstElementChild.disabled = true;

      const percentage = li.children[1].firstElementChild.value;
      const kpiData = input.value;
      const kpiRecordId = li.lastElementChild.value;
      updateRecord(kpiRecordId, percentage, kpiData);

      button.textContent = "Edit";
    }
  }
});

// =====================================================================

const fileUploadForm = document.querySelector(".kpiFileUploadForm");

fileUploadForm.addEventListener("change", function (event) {
  const kpiId = fileUploadForm.parentElement.lastElementChild.value;

  var file = event.target.files[0];
  var formData = new FormData();
  formData.append("kpi-record-file", file);
  axios
    .post(`http://127.0.0.1:4000/api/v1/record/upload/${kpiId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
