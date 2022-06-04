import { Popup } from "./Popup.js";
import { formSettings } from "../utils/constants.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(formSettings.formSelector);
    this._submitHandler = submitHandler;
    this._boundSubmitHandler = this._handleSubmit.bind(this);
    this._inputValues = {};
    this._inputFields = this._popup.querySelectorAll(formSettings.inputSelector);
  }

  _getInputValues() {
    this._inputFields.forEach((field) => {
      this._inputValues[field.id] = field.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputFields.forEach((field) => {
      field.value = data[field.id];
    });
  }

  _handleSubmit(evt) {
    this._submitHandler(evt, this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._boundSubmitHandler);
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
