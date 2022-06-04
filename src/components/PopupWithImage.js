import { Popup } from "./Popup.js";
import {
    imageInPopUpSelector,
    nameInPopUpSelector
} from "../utils/constants.js"

export class PopupWithImage extends Popup {
  constructor(popupSelecetor) {
    super(popupSelecetor);
    this._imageInPopUp = this._popup.querySelector(imageInPopUpSelector);
    this._nameInPopUp = this._popup.querySelector(nameInPopUpSelector);
  }

  open(src, alt, name) {
    this._imageInPopUp.src = src;
    this._imageInPopUp.alt = alt;
    this._nameInPopUp.textContent = name;
    super.open();
  }
}
