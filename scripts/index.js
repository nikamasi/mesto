let editProfileButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".pop-up__close-button");
let popUp = document.querySelector(".pop-up");
let currentName = document.querySelector(".profile__name");
let currentBio = document.querySelector(".profile__bio");
let formElement = document.querySelector(".pop-up__form")
let nameInput = document.querySelector(".pop-up__input_name")
let bioInput = document.querySelector(".pop-up__input_bio")

function togglePopUp() {
    popUp.classList.toggle("pop-up_opened");
    nameInput.value = currentName.textContent
    bioInput.value = currentBio.textContent
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    currentName.textContent = nameInput.value
    currentBio.textContent = bioInput.value
    togglePopUp()
}

editProfileButton.addEventListener("click", togglePopUp);
closeButton.addEventListener("click", togglePopUp);
formElement.addEventListener('submit', formSubmitHandler); 
