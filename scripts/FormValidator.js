export class FormValidator {
  constructor(formSettings, formElement) {
    this._formElement = formElement;
    this._inactiveButtonClass = formSettings.inactiveButtonClass;
    this._inputErrorClass = formSettings.inputErrorClass;
    this._errorClass = formSettings.errorClass;

    this._inputElements = Array.from(
      this._formElement.querySelectorAll(formSettings.inputSelector)
    );
    this._errorElements = Array.from(
      this._formElement.querySelectorAll(formSettings.errorMessageSelector)
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

  _hideInputError(errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _showInputError(errorMessage, errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  resetFormErrors() {
    this._errorElements.forEach((element) => {
      this._hideInputError(element);
    });
    this._inputElements.forEach((element) => {
      element.classList.remove(this._inputErrorClass);
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
            inputElement.validationMessage,
            errorElement,
            this._errorClass
          );
          inputElement.classList.add(this._inputErrorClass);
        } else {
          this._hideInputError(errorElement, this._errorClass);
          inputElement.classList.remove(this._inputErrorClass);
        }
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
