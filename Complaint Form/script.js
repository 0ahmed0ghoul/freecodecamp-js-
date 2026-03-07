const form = document.getElementById("form");

// ================== VALIDATE FUNCTION ==================
function validateForm() {
  const fullName = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const orderNo = document.getElementById("order-no").value.trim();
  const productCode = document.getElementById("product-code").value.trim();
  const quantity = document.getElementById("quantity").value;
  const complaintDescription = document.getElementById("complaint-description").value.trim();
  const solutionDescription = document.getElementById("solution-description").value.trim();

  const complaints = document.querySelectorAll("#complaints-group input[type='checkbox']");
  const solutions = document.querySelectorAll("#solutions-group input[type='radio']");

  const otherComplaint = document.getElementById("other-complaint");
  const otherSolution = document.getElementById("other-solution");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const orderPattern = /^2024\d{6}$/;
  const productPattern = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/;

  const complaintChecked = Array.from(complaints).some(cb => cb.checked);
  const solutionChecked = Array.from(solutions).some(r => r.checked);

  return {
    "full-name": fullName !== "",
    "email": emailPattern.test(email),
    "order-no": orderPattern.test(orderNo),
    "product-code": productPattern.test(productCode),
    "quantity": Number(quantity) > 0 && Number.isInteger(Number(quantity)),
    "complaints-group": complaintChecked,
    "complaint-description":
      !otherComplaint.checked || complaintDescription.length >= 20,
    "solutions-group": solutionChecked,
    "solution-description":
      !otherSolution.checked || solutionDescription.length >= 20
  };
}

// ================== IS VALID FUNCTION ==================
function isValid(validationObject) {
  return Object.values(validationObject).every(value => value === true);
}

// ================== BORDER COLOR HANDLER ==================
function setBorder(element, condition) {
  element.style.borderColor = condition ? "green" : "red";
}

// ================== INPUT CHANGE EVENTS ==================
document.getElementById("full-name").addEventListener("change", function () {
  setBorder(this, validateForm()["full-name"]);
});

document.getElementById("email").addEventListener("change", function () {
  setBorder(this, validateForm()["email"]);
});

document.getElementById("order-no").addEventListener("change", function () {
  setBorder(this, validateForm()["order-no"]);
});

document.getElementById("product-code").addEventListener("change", function () {
  setBorder(this, validateForm()["product-code"]);
});

document.getElementById("quantity").addEventListener("change", function () {
  setBorder(this, validateForm()["quantity"]);
});

// ================== COMPLAINT CHECKBOXES ==================
const complaintsGroup = document.getElementById("complaints-group");
const complaintCheckboxes = document.querySelectorAll("#complaints-group input");

complaintCheckboxes.forEach(cb => {
  cb.addEventListener("change", function () {
    setBorder(complaintsGroup, validateForm()["complaints-group"]);
  });
});

// ================== COMPLAINT DESCRIPTION ==================
document.getElementById("complaint-description")
  .addEventListener("change", function () {
    const otherComplaint = document.getElementById("other-complaint");
    if (otherComplaint.checked) {
      setBorder(this, validateForm()["complaint-description"]);
    }
  });

// ================== SOLUTION RADIOS ==================
const solutionsGroup = document.getElementById("solutions-group");
const solutionRadios = document.querySelectorAll("#solutions-group input");

solutionRadios.forEach(radio => {
  radio.addEventListener("change", function () {
    setBorder(solutionsGroup, validateForm()["solutions-group"]);
  });
});

// ================== SOLUTION DESCRIPTION ==================
document.getElementById("solution-description")
  .addEventListener("change", function () {
    const otherSolution = document.getElementById("other-solution");
    if (otherSolution.checked) {
      setBorder(this, validateForm()["solution-description"]);
    }
  });

// ================== FORM SUBMIT ==================
form.addEventListener("submit", function (e) {
  const validation = validateForm();

  if (!isValid(validation)) {
    e.preventDefault();
  }
});