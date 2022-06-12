export const userInfoSelectors = {
  name: ".profile__name",
  about: ".profile__bio",
  pic: ".profile__pic"
};

export const formNames = {
  profileForm: "name-bio",
  imageForm: "image-form",
  changePicForm: "change-pic"
}

export const popupSelectors = {
  profileForm: ".pop-up_profile",
  addImageForm: ".pop-up_add-image",
  image: ".pop-up_image-view",
  deleteImage: ".pop-up_delete-image",
  changePic: ".pop-up_change-pic"
}

export const gallerySelector = ".gallery";

export const imageInPopUpSelector = ".image-view__image";
export const nameInPopUpSelector = ".image-view__name";

export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);

export const changeProfilePicButton = document.querySelector(
  ".profile__pic-edit-button"
)
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

export const userName = document.querySelector(userInfoSelectors.name)
export const userAbout = document.querySelector(userInfoSelectors.about)
export const userPic = document.querySelector(userInfoSelectors.pic)