import { api } from "../pages/index.js";

export class UserInfo {
  constructor({ name: nameSelector, about: aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return api.getUserInfo();
  }

  saveUserInfo(name, about) {
    return api.saveUserInfo(name, about);
  }

  setUserInfo(name, about) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}
