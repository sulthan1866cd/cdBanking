// ----------------------- data --------------

let balences;
let cID;
let accountNumbers;
let user;
const BASE_API_URL_V1 = "http://localhost:3000/api/v1";
const token = sessionStorage.getItem("token");

// --------------------- functions ----------------

const addDetailstoID = (details) => {
  for (const detail in details) {
    const element = document.getElementById(detail);
    element.textContent = details[detail];
  }
};

const loadData = async (cID) => {
  let savingResult = await fetch(`${BASE_API_URL_V1}/saving/${cID}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  savingResult = await savingResult.json();
  const SavingAccountSummary = {
    SaccNo: savingResult.savings_acc_no,
    Sbranch: savingResult.branch,
    Sname: user.name,
    Sifsc: savingResult.ifsc,
  };

  let currentResult = await fetch(`${BASE_API_URL_V1}/current/${cID}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  currentResult = await currentResult.json();
  const currentAccountSummary = {
    CaccNo: currentResult.current_acc_no,
    Cbranch: currentResult.branch,
    Cname: user.name,
    Cifsc: currentResult.ifsc,
  };

  let creditResult = await fetch(`${BASE_API_URL_V1}/credit/${cID}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  creditResult = await creditResult.json();
  const creditAccountSummary = {
    creditCardNo: `XXXX XXXX XXXX ${creditResult.credit_card_no.slice(-5)}`,
    creditType: creditResult.type,
    creditName: user.name,
  };

  accountNumbers = {
    saving: SavingAccountSummary["SaccNo"],
    current: currentAccountSummary["CaccNo"],
    credit: creditAccountSummary["creditCardNo"],
  };
  balences = {
    savingBalence: savingResult.balence,
    currentBalence: currentResult.balence,
    creditBalence: creditResult.balence,
  };

  addDetailstoID(SavingAccountSummary);
  addDetailstoID(currentAccountSummary);
  addDetailstoID(creditAccountSummary);
};

const loadBalances = () => {
  let formattedBalence = {};
  for (const accountType in balences) {
    formattedBalence[accountType] = Number(
      balences[accountType]
    ).toLocaleString();
  }
  addDetailstoID(formattedBalence);
};
// -------------------------- DOM content loaded --------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  cID = sessionStorage.getItem("customer_id");
  if (!cID) window.location.href = "/forms/login/login.html";

  user = await fetch(`${BASE_API_URL_V1}/users/${cID}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (user.status === 401) window.location.href = "forms/login/login.html";
  user = await user.json();
  const mainHeading = document.getElementById("mainHeading");
  mainHeading.textContent = "Greetings " + user.name + "!";

  // --------------------- beneficiary render ------------------------------
  const beneficiaryElement = document.getElementById("beneficiary");
  let users = await fetch(`${BASE_API_URL_V1}/users`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  users = await users.json();
  for (let user of users) {
    if (user.customer_id === cID) continue;
    const userElement = document.createElement("option");
    userElement.value = user.customer_id;
    userElement.textContent = user.name;
    beneficiaryElement.appendChild(userElement);
  }

  await loadData(cID);
  loadBalances();
});

const switchTab = (tabID) => {
  const activeContent = document.getElementsByClassName("active-content");

  activeContent[0].style.display = "none";
  activeContent[0].classList.remove("active-content");

  const selectedContent = document.getElementById(tabID);
  selectedContent.style.display = "block";
  selectedContent.classList.add("active-content");

  const activeTab = document.getElementsByClassName("active-tab");

  activeTab[0].classList.remove("active-tab");

  const selectedTab = document.getElementById(tabID + "Tab");
  selectedTab.classList.add("active-tab");
};

const openSubTab = (subTabOpenID) => {
  const subTabOpenElement = document.getElementById(subTabOpenID);
  subTabOpenElement.style.transform =
    subTabOpenElement.style.transform == "rotate(0deg)"
      ? "rotate(180deg)"
      : "rotate(0deg)";
};
// -------------------------- statement ---------------------------------
const viewStatement = async (accountType) => {
  let statementResult = await fetch(
    `${BASE_API_URL_V1}/statements/${cID}/${accountType}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  statementResult = await statementResult.json();
  statementResult.reverse();
  const statementModelElement = document.getElementById("statementModel");
  statementModelElement.style.display = "flex";

  const accountNumberElement = document.getElementById(
    "statementAccountNumber"
  );
  accountNumberElement.textContent = `Account No: ${accountNumbers[accountType]}`;

  const statementElement = document.getElementById("statement");

  while (statementElement.childNodes.length > 2) {
    statementElement.removeChild(statementElement.lastChild);
  }

  for (let statement of statementResult) {
    const tr = document.createElement("tr");
    tr.classList.add("statement-table");
    statement = {
      date: statement.createdAt,
      description: statement.description,
      transaction_no: statement.transaction_no,
      ammount: statement.ammount,
      closingBalence: statement.closing_balence,
    };
    for (const key in statement) {
      const td = document.createElement("td");
      td.textContent = statement[key];
      if (key === "ammount") {
        if (statement.ammount > 0) {
          td.classList.add("text-green");
        } else {
          td.classList.add("text-red");
        }
      } else {
        td.classList.add("text-teal");
      }
      tr.appendChild(td);
    }
    statementElement.appendChild(tr);
  }
};

const closeStatement = () => {
  const statementModelElement = document.getElementById("statementModel");
  statementModelElement.style.display = "none";
};

// ----------------------------------- deposit ------------------------------------
const viewDeposit = (accountType) => {
  const depositModelElement = document.getElementById("depositModel");
  depositModelElement.style.display = "flex";
  const depositAccountTypeElement =
    document.getElementById("depositAccountType");
  depositAccountTypeElement.textContent = accountType;
};

const depositAmmount = async () => {
  const accountType = document.getElementById("depositAccountType").textContent;
  const depositAmmountElement = document.getElementById("depositAmmount");
  const depositAmt = Number(depositAmmountElement.value);
  if (depositAmt <= 0) {
    const depositAmmountAlertElement = document.getElementById(
      "depositAmmountAlert"
    );
    depositAmmountAlertElement.classList.remove("text-green");
    depositAmmountAlertElement.classList.add("text-red");
    depositAmmountAlertElement.textContent = `Please enter an ammount greater than 0`;
    return;
  }
  const depositResult = await fetch(
    `${BASE_API_URL_V1}/${accountType}/${cID}`,
    {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ammount: depositAmt,
        description: "direct deposit",
      }),
    }
  );
  if (depositResult.status === 200) {
    const depositAmmountAlertElement = document.getElementById(
      "depositAmmountAlert"
    );
    depositAmmountAlertElement.classList.remove("text-red");
    depositAmmountAlertElement.classList.add("text-green");
    depositAmmountAlertElement.textContent = `Rs. ${depositAmt} has been successfully deposited to ${accountType} account`;
    await loadData(cID);
    loadBalances();
  }
};
const closeDeposit = () => {
  const depositModelElement = document.getElementById("depositModel");
  depositModelElement.style.display = "none";
  const depositAmmountAlertElement = document.getElementById(
    "depositAmmountAlert"
  );
  depositAmmountAlertElement.textContent = "";
};
// ---------------------------------------------- transaction fund -----------------------
const resetForm = () => {
  const accountElement = document.getElementById("accountType");
  const beneficiaryElement = document.getElementById("beneficiary");
  const ammountElement = document.getElementById("ammount");
  const remarksElement = document.getElementById("remarks");
  accountElement.value = "";
  beneficiaryElement.value = "";
  ammountElement.value = "";
  remarksElement.value = "";
};

const showMessage = (message) => {
  const showMessageElement = document.getElementById("transactionMessage");
  showMessageElement.textContent = message;

  setTimeout(() => {
    showMessageElement.textContent = "";
  }, 4000);
};

const sendMoney = async () => {
  const accountElement = document.getElementById("accountType");
  const beneficiaryElement = document.getElementById("beneficiary");
  const ammountElement = document.getElementById("ammount");
  const remarksElement = document.getElementById("remarks");
  const account = accountElement.value;
  const beneficiary = beneficiaryElement.value;
  const ammount = ammountElement.value;
  const remarks = remarksElement.value;

  if (account === "") {
    showMessage("Please choose an account");
    return;
  }
  if (beneficiary === "") {
    showMessage("Please choose an beneficiary");
    return;
  }

  if (isNaN(ammount) || Number(ammount) <= 0) {
    showMessage(
      `Can't transfer ammount ${ammount}, please enter amount value greater than 0`
    );
    return;
  }
  if (Number(balences[account + "Balence"]) < Number(ammount)) {
    showMessage(
      `Transfer of Rs. ${Number(
        ammount
      )} from your ${account} account has failed fue to insufficiant balence! cuttent balence: ${
        balences[account + "Balence"]
      }`
    );
    return;
  }
  if (remarks === "") {
    showMessage("Please enter remarks to proceed");
    return;
  }

  await fetch(`${BASE_API_URL_V1}/${account}/${cID}`, {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ammount: -Number(ammount),
      description: remarks,
    }),
  });

  await fetch(`${BASE_API_URL_V1}/${account}/${beneficiary}`, {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ammount: Number(ammount),
      description: remarks,
    }),
  });

  resetForm();
  await loadData(cID);
  loadBalances();
  showMessage(
    `Transfer of Rs. ${ammount} from your ${account} account is successful!`
  );
};

const logout = () => {
  sessionStorage.removeItem("customer_id");
  localStorage.removeItem("balences");
  localStorage.removeItem("statement");
  window.location.href = "/forms/login/login.html";
};
