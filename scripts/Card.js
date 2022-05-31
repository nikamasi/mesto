export class Card {
  constructor(templateSelector, name, imageLink, imageAlt, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._imageLink = imageLink;
    this._imageAlt = imageAlt;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const imageTemplate = document.querySelector(
      this._templateSelector
    ).content;
    const cardElement = imageTemplate
      .querySelector(".gallery__item")
      .cloneNode(true);
    return cardElement;
  }

  _openImage() {
    const imageData = {
      src: this._imageLink,
      alt: this._imageAlt,
      name: this._name,
    }
    this._handleCardClick(imageData)
  }

  _toggleLike() {
    this._likeButton.classList.toggle("gallery__like-button_active");
  }

  _removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => this._openImage());
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._element
      .querySelector(".gallery__item-remove-button")
      .addEventListener("click", () => this._removeCard());
  }

  getElement() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".gallery__image");
    this._itemName = this._element.querySelector(".gallery__item-name");
    this._likeButton = this._element.querySelector(".gallery__like-button");
    this._itemName.textContent = this._name;
    this._image.src = this._imageLink;
    this._image.alt = this._imageAlt;

    this._setEventListeners();

    return this._element;
  }
}
