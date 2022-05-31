import { Popup } from "./Popup.js";
import { popupInputSelector } from "./constants.js"

export class PopupWithForm extends Popup {
  constructor(popupSelector, formElement, submitHandler) {
    super(popupSelector);
    this._formElement = formElement;
    this._submitHandler = submitHandler;
    this._boundSubmitHandler = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    const inputValues = {};
    const inputFields = this._popup.querySelectorAll(popupInputSelector);
    inputFields.forEach((field) => {
      inputValues[field.id] = field.value;
    });
    return inputValues;
  }

  _handleSubmit(evt) {
    this._submitHandler(evt, this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._boundSubmitHandler);
  }

  close() {
    this._formElement.removeEventListener("submit", this._handleSubmit);
    super.close();
    this._formElement.reset();
  }
}
