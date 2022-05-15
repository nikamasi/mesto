import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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

// const saveImageFormButton = popUpImage.querySelector(".pop-up__save-button");

const gallery = document.querySelector(".gallery");
const templateSelector = "#image-template";

const initialCards = [
  {
    name: "Ницца",
    link: "https://images.unsplash.com/photo-1503696967350-ad1874122058?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    alt: "вытянутый песчаный пляж в городе у лазурного моря",
  },
  {
    name: "Сен-Тропе",
    link: "https://images.unsplash.com/photo-1608035057921-3c1e28e812f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "узкая улочка из брусчатки проходит между старых домов и ведет к морю",
  },
  {
    name: "Ле-Трепор",
    link: "https://images.unsplash.com/photo-1552426106-468a47fdd2cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80",
    alt: "высокий утес у моря",
  },
  {
    name: "Красное море",
    link: "https://images.unsplash.com/photo-1582623838120-455da222cdc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    alt: "подводный морской мир, разнообразные рыбы и кораллы",
  },
  {
    name: "Этрета",
    link: "https://images.unsplash.com/photo-1505753065532-68713e211a3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    alt: "песчаное побережье и утес с природной аркой у лазурного моря",
  },
  {
    name: "Море Кортеса",
    link: "https://images.unsplash.com/photo-1615695478392-af177ac550b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80",
    alt: "кактусы и лодка у пляжа",
  },
];

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

function createGalleryItem(templateSelector, name, link, alt = name) {
  const card = new Card(templateSelector, name, link, (alt = name));
  gallery.prepend(card.getElement());
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentBio.textContent = bioInput.value;
  closePopUp(popUpProfile);
}

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  createGalleryItem(
    templateSelector,
    imageNameInput.value,
    imageLinkInput.value
  );
  formElementImage.reset();
  closePopUp(popUpImage);
}

//    FUNCTION CALLS    //

initialCards.forEach((item) => {
  createGalleryItem(templateSelector, item["name"], item["link"], item["alt"]);
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

const imageFormValidator = new FormValidator(formSettings, formElementImage);
imageFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  formSettings,
  formElementProfile
);
profileFormValidator.enableValidation();

formElementProfile.addEventListener("submit", handleProfileFormSubmit);

formElementImage.addEventListener("submit", handleImageFormSubmit);
