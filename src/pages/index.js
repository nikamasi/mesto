import "../pages/index.css";

import { Card } from "../components/Card.js";
import { API } from "../components/API.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import {
  gallerySelector,
  formNames,
  formSettings,
  popupSelectors,
  userInfoSelectors,
  addImageButton,
  editProfileButton,
  changeProfilePicButton,
  userName,
  userAbout,
  userPic,
} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";

export const api = new API({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-43",
  headers: {
    authorization: "25ff97e3-505c-4bb3-ae57-617973c9d998",
    "Content-Type": "application/json",
  },
});

///   FORM VALIDATION

const formValidators = {};

function enableValidation(formSettings) {
  const formList = Array.from(
    document.querySelectorAll(formSettings.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(formSettings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(formSettings);

/// USER INFO

const userInfo = new UserInfo(userInfoSelectors);
let userId = "";

function renderUserInfo(data) {
  userAbout.textContent = data.about;
  userName.textContent = data.name;
  userPic.src = data.avatar;
  userPic.alt = data.alt ? data.alt : data.name;
}

userInfo
  .getUserInfo()
  .then((data) => {
    userId = data._id;
    renderUserInfo(data);
  })
  .catch((err) => console.log(err))
  .finally(() => getCards());

///   CARDS
let cardList;

function getCards() {
  api
    .getInitialCards()
    .then((data) => {
      cardList = new Section(
        {
          data: data,
          renderer: (item) => {
            const userIsOwner = item["owner"]["_id"] == userId;
            api.checkIfLikedBefore(item["_id"], userId).then((likedBefore) => {
              const card = createGalleryItem(
                item["name"],
                item["link"],
                item["_id"],
                item["likes"].length,
                userIsOwner,
                likedBefore,
                (item["alt"] = item["name"])
              );
              cardList.addItem(card);
            });
          },
        },
        gallerySelector
      );
      cardList.renderItems();
    })
    .catch((err) => console.log(err));
}

function createGalleryItem(
  name,
  link,
  id,
  likes,
  userIsOwner,
  userLikedBefore,
  alt = name
) {
  const card = new Card(
    "#image-template",
    name,
    link,
    id,
    likes,
    userIsOwner,
    userLikedBefore,
    (alt = name),
    handleImageClick,
    handleDeleteButtonClick,
    handleLikeClick
  );
  return card.getElement();
}

///   POPUPS - SET UP

const popUpProfile = new PopupWithForm(
  popupSelectors.profileForm,
  handleProfileFormSubmit
);

const popUpAddImage = new PopupWithForm(
  popupSelectors.addImageForm,
  handleImageFormSubmit
);

const popupImage = new PopupWithImage(popupSelectors.image);
const popupDelete = new PopupWithForm(
  popupSelectors.deleteImage,
  handleDeleteFormSubmit
);

const popupChangePic = new PopupWithForm(
  popupSelectors.changePic,
  handleChangePicFormSubmit
);

popUpProfile.setEventListeners();
popUpAddImage.setEventListeners();
popupImage.setEventListeners();
popupDelete.setEventListeners();
popupChangePic.setEventListeners();

/// OPEN POPUPS

function openPopUpProfile() {
  userInfo
    .getUserInfo()
    .then((data) => {
      popUpProfile.setInputValues(data);
      openPopUp(popUpProfile, formValidators[formNames.profileForm]);
    })
    .catch((err) => console.log(err));
}

function openPopUp(popup, formValidator) {
  formValidator.resetFormErrors();
  popup.open();
}

/// SUBMIT HANDLERS

function handleProfileFormSubmit(evt, { name: name, about: about }) {
  evt.preventDefault();
  popUpProfile.saveButton.textContent = "Сохранение...";
  userInfo
    .saveUserInfo(name, about)
    .then((data) => {
      userName.textContent = data.name
      userAbout.textContent = data.about;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popUpProfile.close();
      popUpProfile.saveButton.textContent = "Сохранить";
    });
}

function handleImageFormSubmit(
  evt,
  { "image-name": name, "image-link": link }
) {
  evt.preventDefault();
  popupChangePic.saveButton.textContent = "Сохранение...";
  api
    .saveImage(name, link)
    .then((data) => {
      const newCard = createGalleryItem(name, link, data._id, 0, true, false);
      cardList.addItem(newCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popUpAddImage.close();
      popupChangePic.saveButton.textContent = "Сохранить";
    });
}

function handleDeleteFormSubmit(evt) {
  evt.preventDefault();
  api
    .deleteImage(cardToDelete.id)
    .then(() => {
      cardToDelete.remove();
      popupDelete.close();
    })
    .catch((err) => console.log(err));
}

function handleChangePicFormSubmit(evt, { "change-pic-link": link }) {
  evt.preventDefault();
  popupChangePic.saveButton.textContent = "Сохранение...";
  api
    .changePic(link)
    .then(() => {
      userPic.src = link;
    })
    .finally(() => {
      popupChangePic.close();
      popupChangePic.saveButton.textContent = "Сохранить";
    });
}

function handleImageClick({ src: src, alt: alt, name: name }) {
  popupImage.open(src, alt, name);
}

function handleLikeClick(id) {
  return api
    .checkIfLikedBefore(id, userId)
    .then((likedBefore) => {
      return likedBefore ? api.unlike(id, userId) : api.like(id, userId)
    })
    .catch((err) => console.log(err));
}

let cardToDelete;

function handleDeleteButtonClick(card) {
  cardToDelete = card;
  popupDelete.open();
}

editProfileButton.addEventListener("click", () => openPopUpProfile());
addImageButton.addEventListener("click", () =>
  openPopUp(popUpAddImage, formValidators[formNames.imageForm])
);
changeProfilePicButton.addEventListener("click", () =>
  openPopUp(popupChangePic, formValidators[formNames.changePicForm])
);
