export class Popup {
  constructor(popupSelecetor) {
    this._popup = document.querySelector(popupSelecetor);
  }

  open() {
    this._popup.classList.add("pop-up_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  
  close() {
    this._popup.classList.remove("pop-up_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("mousedown", this.close);
  }

  setEventListeners() {
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
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
