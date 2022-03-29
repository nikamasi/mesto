let addButton = document.querySelector(".profile__add-button");
let editProfileButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".pop-up__close-button");
let saveButton = document.querySelector(".pop-up__save-button");
let popUp = document.querySelector(".pop-up");
let currentName = document.querySelector(".profile__name");
let currentBio = document.querySelector(".profile__bio");
let formElement = document.querySelector(".pop-up__form")
let nameInput = document.querySelectorAll(".pop-up__input")[0]
let bioInput = document.querySelectorAll(".pop-up__input")[1]

function togglePopUp() {
    popUp.classList.toggle("pop-up_opened");
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    currentName.textContent = nameInput.value
    currentBio.textContent = bioInput.value
    console.log(currentName, currentBio)
    togglePopUp()
}

editProfileButton.addEventListener("click", togglePopUp);
closeButton.addEventListener("click", togglePopUp);
formElement.addEventListener('submit', formSubmitHandler); 
