import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./data.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const popUpProfile = document.querySelector(".pop-up_profile");
const formElementProfile = document.querySelector(".name-bio");
const currentName = document.querySelector(".profile__name");
const currentBio = document.querySelector(".profile__bio");
const nameInput = document.querySelector(".pop-up__input_name");
const bioInput = document.querySelector(".pop-up__input_bio");

const addImageButton = document.querySelector(".profile__add-button");
const popUpImage = document.querySelector(".pop-up_add-image");
const formElementImage = document.querySelector(".image-form");
const imageNameInput = document.querySelector(".pop-up__input_image-name");
const imageLinkInput = document.querySelector(".pop-up__input_image-link");
const gallery = document.querySelector(".gallery");

//    FUNCTION DECLARATIONS    //

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector(".pop-up_opened");
    closePopUp(openedPopUp);
  }
}

function closeByClick(evt) {
  if (evt.target.classList.contains("pop-up_opened")) {
    closePopUp(evt.target);
  }
  if (evt.target.classList.contains("pop-up__close-button")) {
    closePopUp(document.querySelector(".pop-up_opened"));
  }
}

export function openPopUp(popUp) {
  popUp.classList.add("pop-up_opened");
  document.addEventListener("keydown", closeByEscape);
  popUp.addEventListener("mousedown", closeByClick);
}

function closePopUp(popUp) {
  popUp.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", closeByEscape);
  popUp.removeEventListener("mousedown", closeByClick);
}

function openPopUpProfile() {
  nameInput.value = currentName.textContent;
  bioInput.value = currentBio.textContent;
  profileFormValidator.resetFormErrors();
  openPopUp(popUpProfile);
}

function opepPopUpImageForm() {
  formElementImage.reset();
  imageFormValidator.resetFormErrors();
  openPopUp(popUpImage);
}

function createGalleryItem(name, link, alt = name) {
  const card = new Card("#image-template", name, link, (alt = name));
  return card.getElement()
}

function addCardToGallery(cardElement) {
  gallery.prepend(cardElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentBio.textContent = bioInput.value;
  closePopUp(popUpProfile);
}

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createGalleryItem(
    imageNameInput.value,
    imageLinkInput.value
  );
  addCardToGallery(newCard)
  formElementImage.reset();
  closePopUp(popUpImage);
}

//    FUNCTION CALLS    //

initialCards.forEach((item) => {
  const card = createGalleryItem(item["name"], item["link"], item["alt"]);
  addCardToGallery(card);
});

editProfileButton.addEventListener("click", () => openPopUpProfile());
addImageButton.addEventListener("click", () => opepPopUpImageForm());

//    SETTING UP FORMS    //

const formSettings = {
  formSelector: ".pop-up__form",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__save-button",
  inactiveButtonClass: "pop-up__save-button_disabled",
  inputErrorClass: "pop-up__input_invalid",
  errorClass: "pop-up__error-message_visible",
  errorMessageSelector: ".pop-up__error-message",
};

const imageFormValidator = new FormValidator(
  formSettings, 
  formElementImage
  );
imageFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  formSettings,
  formElementProfile
);
profileFormValidator.enableValidation();

formElementProfile.addEventListener("submit", handleProfileFormSubmit);

formElementImage.addEventListener("submit", handleImageFormSubmit);
