const logOutBtn = document.querySelector(".logOutBtn");

logOutBtn.addEventListener("click", async (event) => {
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
