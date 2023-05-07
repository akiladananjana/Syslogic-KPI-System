const signupForm = document.querySelector("#signup-form");
const successSignUpModal = document.querySelector(".successSignUpModal");
const overlay = document.querySelector(".overlay");

const signup = async (
  firstName,
  lastName,
  email,
  password,
  passwordConfirm
) => {
  const response = await axios({
    method: "POST",
    url: "http://127.0.0.1:4000/api/v1/users/signup",
    data: { firstName, lastName, email, password, passwordConfirm },
  });

  console.log(response);

  if (response.data.status === "Success") {
    successSignUpModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    setTimeout(function () {
      location.assign("/login");
    }, 2000);
  }
};

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#fname").value;
  const lastName = document.querySelector("#lname").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const passwordConfirm = document.querySelector("#password-confirm").value;

  if (password === passwordConfirm) {
    signup(firstName, lastName, email, password, passwordConfirm);
  }
});
