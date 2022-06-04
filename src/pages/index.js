import "../pages/index.css"

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { initialCards } from "../utils/data.js";
import {
  gallerySelector,
  formNames,
  formSettings,
  popupSelectors,
  userInfoSelectors,
  addImageButton,
  editProfileButton,
} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";

///   FORM VALIDATION  

const formValidators = {}

function enableValidation(formSettings) {
  const formList = Array.from(document.querySelectorAll(formSettings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formSettings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation()
  })
}

enableValidation(formSettings);

///   CARDS 

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = createGalleryItem(item["name"], item["link"], item["alt"]);
      cardList.addItem(card);
    },
  },
  gallerySelector
);

cardList.renderItems();

function createGalleryItem(name, link, alt = name) {
  const card = new Card(
    "#image-template",
    name,
    link,
    (alt = name),
    handleImageClick
  );
  return card.getElement();
}

///   POPUPS  


const popUpProfile = new PopupWithForm(
  popupSelectors.profileForm,
  handleProfileFormSubmit
);


const popUpAddImage = new PopupWithForm(
  popupSelectors.addImageForm,
  handleImageFormSubmit
);

const popupImage = new PopupWithImage(popupSelectors.image);

popUpProfile.setEventListeners()
popUpAddImage.setEventListeners()
popupImage.setEventListeners();

const userInfo = new UserInfo(userInfoSelectors);

function openPopUpProfile() {
  const { name, bio } = userInfo.getUserInfo();
  popUpProfile.setInputValues({name, bio})
  openPopUp(popUpProfile, formValidators[formNames.profileForm])
}

function openPopUp(popup, formValidator) {
  formValidator.resetFormErrors()
  popup.open()
}

function handleProfileFormSubmit(evt, { name: name, bio: bio }) {
  evt.preventDefault();
  userInfo.setUserInfo(name, bio);
  popUpProfile.close();
}

function handleImageFormSubmit(
  evt,
  { "image-name": name, "image-link": link }
) {
  evt.preventDefault();
  const newCard = createGalleryItem(name, link);
  cardList.addItem(newCard);
  popUpAddImage.close();
}

function handleImageClick({ src: src, alt: alt, name: name }) {
  popupImage.open(src, alt, name);
}

editProfileButton.addEventListener("click", () => openPopUpProfile());
addImageButton.addEventListener("click", () => openPopUp(popUpAddImage, formValidators[formNames.imageForm]));
