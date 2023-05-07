const loginForm = document.querySelector("#login-form");

const login = async (email, password) => {
  const response = await axios({
    method: "POST",
    url: "http://127.0.0.1:4000/api/v1/users/login",
    data: {
      email,
      password,
    },
  });

  // If loggin success, redirect user to Dashboard
  if (response.data.status === "success") {
    location.assign("/dashboard");
  }
};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  if (email != "" || password != "") {
    login(email, password);
  }
});
