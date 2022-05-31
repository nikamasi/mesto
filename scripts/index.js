import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { initialCards } from "./data.js";
import {
  formElementProfile,
  formElementImage,
  formSettings,
  nameInput,
  bioInput,
  popupProfileSelector,
  popupAddImageSelector,
  gallerySelector,
  editProfileButton,
  addImageButton,
  popupWithImageSelector,
  userInfoSelectors,
} from "./constants.js";
import { UserInfo } from "./UserInfo.js";

///   FORM VALIDATION  

const imageFormValidator = new FormValidator(formSettings, formElementImage);
imageFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  formSettings,
  formElementProfile
);

profileFormValidator.enableValidation();

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
  popupProfileSelector,
  formElementProfile,
  handleProfileFormSubmit
);

const popUpAddImage = new PopupWithForm(
  popupAddImageSelector,
  formElementImage,
  handleImageFormSubmit
);

const popupImage = new PopupWithImage(popupWithImageSelector);

const userInfo = new UserInfo(userInfoSelectors);

function openPopUpProfile() {
  const { name: name, bio: bio } = userInfo.getUserInfo();
  nameInput.value = name;
  bioInput.value = bio;
  openPopUp(popUpProfile, profileFormValidator)
}

function openPopUp(popup, formValidator) {
  formValidator.resetFormErrors()
  popup.setEventListeners()
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
  popupImage.setEventListeners();
  popupImage.open(src, alt, name);
}

editProfileButton.addEventListener("click", () => openPopUpProfile());
addImageButton.addEventListener("click", () => openPopUp(popUpAddImage, imageFormValidator));
