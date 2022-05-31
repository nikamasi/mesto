import { Popup } from "./Popup.js";
import {
    imageInPopUpSelector,
    nameInPopUpSelector
} from "./constants.js"

export class PopupWithImage extends Popup {
  constructor(popupSelecetor) {
    super(popupSelecetor);
  }

  open(src, alt, name) {
    const imageInPopUp = document.querySelector(imageInPopUpSelector);
    const nameInPopUp = document.querySelector(nameInPopUpSelector);
    imageInPopUp.src = src;
    imageInPopUp.alt = alt;
    nameInPopUp.textContent = name;
    super.open();
  }
}
