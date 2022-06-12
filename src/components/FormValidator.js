export class FormValidator {
  constructor(formSettings, formElement) {
    this._formElement = formElement;
    this._inactiveButtonClass = formSettings.inactiveButtonClass;
    this._inputErrorClass = formSettings.inputErrorClass;
    this._errorClass = formSettings.errorClass;

    this._inputElements = Array.from(
      this._formElement.querySelectorAll(formSettings.inputSelector)
    );
    this._saveButton = this._formElement.querySelector(
      formSettings.submitButtonSelector
    );
  }

  _hasInvalidInput() {
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputElements)) {
      this._saveButton.classList.add(this._inactiveButtonClass);
      this._saveButton.disabled = true;
    } else {
      this._saveButton.classList.remove(this._inactiveButtonClass);
      this._saveButton.disabled = false;
    }
  }

  _hideInputError(inputElement) {
    inputElement.nextElementSibling.textContent = "";
    inputElement.nextElementSibling.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _showInputError(inputElement, errorElement) {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  resetFormErrors() {
    this._inputElements.forEach((element) => {
      this._hideInputError(element);
    });
    this._toggleButtonState(this._saveButton);
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      const errorElement = document.getElementById(`${inputElement.id}-error`);
      inputElement.addEventListener("input", (evt) => {
        if (!inputElement.validity.valid) {
          this._showInputError(
            inputElement,
            errorElement,
          );
        } else {
          this._hideInputError(inputElement);
        }
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
