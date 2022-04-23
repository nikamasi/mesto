function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, button, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
}

function showInputError(errorMessage, errorElement, errorClass) {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(errorElement, errorClass) {
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

function setEventListeners(
  formElement,
  inputList,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const saveButton = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.addEventListener("input", (evt) => {
      if (!inputElement.validity.valid) {
        showInputError(
          inputElement.validationMessage,
          errorElement,
          errorClass
        );
        inputElement.classList.add(inputErrorClass);
      } else {
        hideInputError(errorElement, errorClass);
        inputElement.classList.remove(inputErrorClass);
      }
      toggleButtonState(inputList, saveButton, inactiveButtonClass);
    });
  });
}

function getInputList(formElement, inputSelector) {
  return Array.from(formElement.querySelectorAll(inputSelector));
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    const inputList = getInputList(formElement, inputSelector);
    setEventListeners(
      formElement,
      inputList,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
}

enableValidation({
  formSelector: ".pop-up__form",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__save-button",
  inactiveButtonClass: "pop-up__save-button_disabled",
  inputErrorClass: "pop-up__input_invalid",
  errorClass: "pop-up__error-message_visible",
});
