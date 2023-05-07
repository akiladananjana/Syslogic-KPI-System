// ====================================================================

// ====================================================================

const inviteForm = document.querySelector("#inviteForm");
const kpiDataInput = document.querySelector("#kpiDataInput");
const invitedList = document.querySelector("#invitedList");

const userId = document.querySelector("#userId").value;
const companyId = document.querySelector("#companyId").value;

const addLiItem = () => {
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
  listItem.appendChild(editButton);
  listItem.appendChild(removeButton);

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

  if (response.data.status === "Success") {
    console.log("success");
    location.assign(`/record/${companyId}`);
  }
};

// =====================================================================

// Delete Record API Call
const deleteRecord = async (kpiRecordId) => {
  const response = await axios({
    method: "DELETE",
    url: "http://127.0.0.1:4000/api/v1/record/delete/",
    data: {
      kpiRecordId,
    },
  });

  if (response.data.status === "Success") {
    console.log("success");
    location.assign(`/record/${companyId}`);
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
    // const li = addLiItem();
    // invitedList.appendChild(li);

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
      deleteRecord(kpiRecordId);
    } else if (button.textContent == "Edit") {
      li.childNodes[3].firstElementChild.disabled = false;
      const span = li.firstElementChild;
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = "Save";
    } else if (button.textContent == "Save") {
      const input = li.firstElementChild;
      const span = document.createElement("span");
      span.textContent = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
      li.childNodes[3].firstElementChild.disabled = true;

      const percentage = li.childNodes[3].firstElementChild.value;
      const kpiData = input.value;
      console.log(percentage, kpiData);
      const kpiRecordId = li.lastElementChild.value;
      updateRecord(kpiRecordId, percentage, kpiData);

      button.textContent = "Edit";
    }
  }
});
