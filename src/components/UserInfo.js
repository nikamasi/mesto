export class UserInfo {
    constructor({name: nameSelector, bio: bioSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._bioElement = document.querySelector(bioSelector);
    }

    getUserInfo() {
        const data = {
            name: this._nameElement.textContent,
            bio: this._bioElement.textContent,
        }
        return data
    }

    setUserInfo(name, bio) {
        this._nameElement.textContent = name;
        this._bioElement.textContent = bio;
    }
}