export const userInfoSelectors = {
  name: ".profile__name",
  bio: ".profile__bio",
};

export const formNames = {
  profileForm: "name-bio",
  imageForm: "image-form"
}

export const popupSelectors = {
  profileForm: ".pop-up_profile",
  addImageForm: ".pop-up_add-image",
  image: ".pop-up_image-view"
}
export const popupProfileSelector = ".pop-up_profile";
export const popupAddImageSelector = ".pop-up_add-image";
export const popupWithImageSelector = ".pop-up_image-view";

export const gallerySelector = ".gallery";

export const imageInPopUpSelector = ".image-view__image";
export const nameInPopUpSelector = ".image-view__name";

export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const addImageButton = document.querySelector(".profile__add-button");

export const formSettings = {
  formSelector: ".form",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__save-button",
  inactiveButtonClass: "pop-up__save-button_disabled",
  inputErrorClass: "pop-up__input_invalid",
  errorClass: "pop-up__error-message_visible",
  errorMessageSelector: ".pop-up__error-message",
};
