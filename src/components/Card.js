export class Card {
  constructor(
    templateSelector,
    name,
    imageLink,
    id,
    likes,
    userIsOwner,
    userLikedBefore,
    imageAlt,
    handleCardClick,
    handleDeleteButtonClick,
    handleLikeClick
  ) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._imageLink = imageLink;
    this._id = id;
    this._imageAlt = imageAlt;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeClick = handleLikeClick;
    this._likeNumber = likes;
    this._userLikedBefore = userLikedBefore;
    this._userIsOwner = userIsOwner;
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
    };
    this._handleCardClick(imageData);
  }

  _toggleLike() {
    this._handleLikeClick(this._element.id).then((likes) => {
      this._likeNumberElement.textContent = likes;
      this._likeButton.classList.toggle("gallery__like-button_active");
    });
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => this._openImage());
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._element
      .querySelector(".gallery__item-remove-button")
      .addEventListener("click", () =>
        this._handleDeleteButtonClick(this._element)
      );
  }

  getElement() {
    this._element = this._getTemplate();
    this._element.id = this._id;
    this._image = this._element.querySelector(".gallery__image");
    this._itemName = this._element.querySelector(".gallery__item-name");
    this._likeButton = this._element.querySelector(".gallery__like-button");
    this._removeButton = this._element.querySelector(
      ".gallery__item-remove-button"
    );
    this._itemName.textContent = this._name;
    this._image.src = this._imageLink;
    this._image.alt = this._imageAlt;
    this._likeNumberElement = this._element.querySelector(
      ".gallery__like-number"
    );
    this._likeNumberElement.textContent = this._likeNumber;
    this._setEventListeners();

    if (this._userIsOwner) {
      this._removeButton.classList.add("gallery__item-remove-button_active");
    }
    if (this._userLikedBefore) {
      this._likeButton.classList.add("gallery__like-button_active");
    }
    return this._element;
  }
}
