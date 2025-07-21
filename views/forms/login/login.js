const validate = async () => {
  const cIDElement = document.getElementById("cID");
  const passwordElement = document.getElementById("password");
  const customer_id = cIDElement.value.trim();
  const password = passwordElement.value;

  const cIDMessageElement = document.getElementById("cIDMessage");
  if (customer_id === "") {
    cIDMessageElement.textContent = "Enter customer ID";
    return;
  }
  let presentCustomer;
  try {
    presentCustomer = await fetch(
      `http://localhost:3000/users/${customer_id}`,
      {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id, password }),
      }
    );
    presentCustomer = await presentCustomer.json();
    cIDMessageElement.textContent = "";
    passwordElement.focus()
  } catch (error) {
    cIDMessageElement.textContent = "user with this customer id dose not exist";
    console.log(error)
    return;
  }

  const passwordMessageElement = document.getElementById("passwordMessage");
  if (!presentCustomer) {
    passwordMessageElement.textContent = "Enter correct password";
    return;
  }
  passwordMessageElement.textContent = "";

  sessionStorage.setItem("customer_id", customer_id);
  window.location.href = "/";
};

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") validate();
});
