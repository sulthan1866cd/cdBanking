const createAccount = async () => {
  const cIDElement = document.getElementById("cID");
  const nameElement = document.getElementById("name");
  const branchElement = document.getElementById("branch");
  const passwordElement = document.getElementById("password");
  const confirmPasswordElement = document.getElementById("confirmPassword");
  const customer_id = cIDElement.value.trim();
  const name = nameElement.value.trim();
  const branch = branchElement.value.trim();
  const password = passwordElement.value.trim();
  const confirmPassword = confirmPasswordElement.value.trim();

  const cIDMessageElement = document.getElementById("cIDMessage");
  if (customer_id === "") {
    cIDMessageElement.textContent = "Enter customer ID";
    return;
  } else if (customer_id.length > 30) {
    cIDMessageElement.textContent = "character length should not exceed 30";
    return;
  }
  cIDMessageElement.textContent = "";
  nameElement.focus();

  const nameMessageElement = document.getElementById("nameMessage");
  if (name === "") {
    nameMessageElement.textContent = "Enter name";
    return;
  } else if (name.length > 30) {
    nameMessageElement.textContent = "character length should not exceed 50";
    return;
  }
  nameMessageElement.textContent = "";
  branchElement.focus();

  const branchMessageElement = document.getElementById("branchMessage");
  if (branch === "") {
    branchMessageElement.textContent = "Please select a branch";
    return;
  }
  branchMessageElement.textContent = "";
  passwordElement.focus();

  const passwordMessageElement = document.getElementById("passwordMessage");
  if (password === "") {
    passwordMessageElement.textContent = "Enter correct password";
    return;
  } else if (password.length < 8 || password.length > 30) {
    passwordMessageElement.textContent =
      "character length should be between 8 to 30";
    return;
  }
  passwordMessageElement.textContent = "";
  confirmPasswordElement.focus();

  const confirmPasswordMessageElement = document.getElementById(
    "confirmPasswordMessage"
  );
  if (confirmPassword !== password) {
    confirmPasswordMessageElement.textContent = "password do not match";
    return;
  }
  confirmPasswordMessageElement.textContent = "";

  const result = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ customer_id, name, password ,branch}),
  });
  if (result.status === 201) {
    sessionStorage.setItem("customer_id", customer_id);
    window.location.href = "/";
  } else {
    const toastElemnt = document.getElementById("toast");
    toastElemnt.style.display = "flex";
    toastElemnt.textContent = "user with costumer id already exists";
  }
};

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") createAccount();
});
