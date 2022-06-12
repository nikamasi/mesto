export class UserInfo {
  constructor({ name: nameSelector, about: aboutSelector, pic: picSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._picElement = document.querySelector(picSelector)
  }

  getUserInfo() {
    const data = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
    return data
  }

  setUserInfo(name, about, link, alt) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (about) {
      this._aboutElement.textContent = about;
    }

    this.setUserPic(link, alt)
  }

  setUserPic(link, alt="фото профиля") {
    if (link) {
      this._picElement.src = link
    }
    this._picElement.alt = alt
  }
}
