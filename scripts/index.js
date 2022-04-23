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
const image = document.querySelector(".image-view__image");
const imageName = document.querySelector(".image-view__name");
const closeImageViewButton = document.querySelector(
  ".pop-up__close-button_image-view"
);

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

// ****** FUNCTION DECLARATIONS ******* //

function togglePopUp(popUp) {
  popUp.classList.toggle("pop-up_opened");
}

function togglePopUpProfile() {
  nameInput.value = currentName.textContent;
  bioInput.value = currentBio.textContent;
  togglePopUp(popUpProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentBio.textContent = bioInput.value;
  togglePopUp(popUpProfile);
}

function createCard(name, link, alt) {
  const card = imageTemplate.querySelector(".gallery__item").cloneNode(true);
  const image = card.querySelector(".gallery__image");
  const itemName = card.querySelector(".gallery__item-name");
  const likeButton = card.querySelector(".gallery__like-button");

  itemName.textContent = name;
  image.src = link;
  image.alt = alt;

  image.addEventListener("click", () => openImage(name, link, alt));

  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("gallery__like-button_active")
  );
  card
    .querySelector(".gallery__item-remove-button")
    .addEventListener("click", () => card.remove());
  return card;
}

function createGalleryItem(name, link, alt = name) {
  const galleryItem = createCard(name, link, alt);
  gallery.prepend(galleryItem);
}

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  createGalleryItem(imageNameInput.value, imageLinkInput.value);
  formElementImage.reset();
  togglePopUp(popUpImage);
}

function openImage(name, link, alt) {
  image.src = link;
  image.alt = alt;
  imageName.textContent = name;
  togglePopUp(popUpImageView);
}

function addOverlayEventListener(popUp) {
  popUp.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("pop-up_opened")) {
      togglePopUp(popUp);
    }
  });
}

// **** FUNCTION CALLS **** //

initialCards.forEach((item) =>
  createGalleryItem(item["name"], item["link"], item["alt"])
);

editProfileButton.addEventListener("click", () =>
  togglePopUpProfile(popUpProfile)
);
formElementProfile.addEventListener("submit", handleProfileFormSubmit);
closeButtonProfileForm.addEventListener("click", () =>
  togglePopUp(popUpProfile)
);

addImageButton.addEventListener("click", () => togglePopUp(popUpImage));
formElementImage.addEventListener("submit", handleImageFormSubmit);
closeButtonImageForm.addEventListener("click", () => togglePopUp(popUpImage));

closeImageViewButton.addEventListener("click", () =>
  togglePopUp(popUpImageView)
);

addOverlayEventListener(popUpProfile);
addOverlayEventListener(popUpImage);

document.addEventListener("keydown", (evt) => {
  if (
    evt.key === "Escape" &&
    popUpProfile.classList.contains("pop-up_opened")
  ) {
    togglePopUp(popUpProfile);
  }
});
