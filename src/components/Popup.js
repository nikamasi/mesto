export class Popup {
  constructor(popupSelecetor) {
    this._popup = document.querySelector(popupSelecetor);
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("pop-up_opened");
    document.addEventListener("keydown", this._boundHandleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  
  close() {
    this._popup.classList.remove("pop-up_opened");
    document.removeEventListener("keydown", this._boundHandleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("pop-up__close-button")) {
        this.close();
      }
      if (evt.target.classList.contains("pop-up_opened")) {
        this.close();
      }
    });
  }
}
