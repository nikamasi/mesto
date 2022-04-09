const editProfileButton = document.querySelector(".profile__edit-button");
const popUpProfile = document.querySelector(".pop-up_profile");
const formElementProfile = document.querySelector(".name-bio");
const currentName = document.querySelector(".profile__name");
const currentBio = document.querySelector(".profile__bio");
const nameInput = document.querySelector(".pop-up__input_name");
const bioInput = document.querySelector(".pop-up__input_bio");
const closeButtonProfileForm = document.querySelector(
  ".pop-up__close-button_profile"
);

const addImageButton = document.querySelector(".profile__add-button");
const popUpImage = document.querySelector(".pop-up_add-image");
const formElementImage = document.querySelector(".image-form");
const imageNameInput = document.querySelector(".pop-up__input_image-name");
const imageLinkInput = document.querySelector(".pop-up__input_image-link");
const closeButtonImageForm = document.querySelector(
  ".pop-up__close-button_image"
);

const gallery = document.querySelector(".gallery");
const imageTemplate = document.querySelector("#image-template").content;

const popUpImageView = document.querySelector(".pop-up_image-view");
const closeImageViewButton = document.querySelector(
  ".pop-up__close-button_image-view"
);

const initialCards = [
  {
    name: "Ницца",
    link: "https://images.unsplash.com/photo-1503696967350-ad1874122058?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Сен-Тропе",
    link: "https://images.unsplash.com/photo-1608035057921-3c1e28e812f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Ле-Трепор",
    link: "https://images.unsplash.com/photo-1552426106-468a47fdd2cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80",
  },
  {
    name: "Красное море",
    link: "https://images.unsplash.com/photo-1582623838120-455da222cdc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
  },
  {
    name: "Этрета",
    link: "https://images.unsplash.com/photo-1505753065532-68713e211a3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Море Кортеса",
    link: "https://images.unsplash.com/photo-1615695478392-af177ac550b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80",
  },
];

// ****** FUNCTION DECLARATIONS ******* //

function togglePopUp(popUp) {
  popUp.classList.toggle("pop-up_opened");
  if (popUp === popUpProfile) {
    nameInput.value = currentName.textContent;
    bioInput.value = currentBio.textContent;
  }
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentBio.textContent = bioInput.value;
  togglePopUp(popUpProfile);
}

function createGalleryItem(name, link) {
  const galleryItem = imageTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);
  const image = galleryItem.querySelector(".gallery__image");
  const itemName = galleryItem.querySelector(".gallery__item-name")
  const likeButton = galleryItem.querySelector(".gallery__like-button");

  itemName.textContent = name;
  image.src = link;

  image.addEventListener("click", () => openImage(image));
  
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("gallery__like-button_active")
  );
  galleryItem
    .querySelector(".gallery__item-remove-button")
    .addEventListener("click", () => galleryItem.remove());

  gallery.prepend(galleryItem);
}

function imageFormSubmitHandler(evt) {
  evt.preventDefault();
  createGalleryItem(imageNameInput.value, imageLinkInput.value);
  formElementImage.reset();
  togglePopUp(popUpImage);
}

function openImage(image) {
  popUpImageView.querySelector(".image-view__image").src = image.src;
  popUpImageView.querySelector(".image-view__name").textContent =
    image.parentElement.querySelector(".gallery__item-name").textContent;
  togglePopUp(popUpImageView);
}

// **** FUNCTION CALLS ****//

initialCards.forEach((item) => createGalleryItem(item["name"], item["link"]));

editProfileButton.addEventListener("click", () => togglePopUp(popUpProfile));
formElementProfile.addEventListener("submit", profileFormSubmitHandler);
closeButtonProfileForm.addEventListener("click", () =>
  togglePopUp(popUpProfile)
);

addImageButton.addEventListener("click", () => togglePopUp(popUpImage));
formElementImage.addEventListener("submit", imageFormSubmitHandler);
closeButtonImageForm.addEventListener("click", () => togglePopUp(popUpImage));

closeImageViewButton.addEventListener("click", () =>
  togglePopUp(popUpImageView)
);
