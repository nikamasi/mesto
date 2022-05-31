export class UserInfo {
    constructor({name: nameSelector, bio: bioSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._bioElement = document.querySelector(bioSelector);
        this._name = "Жак Ив Кусто";
        this._bio = "Исследователь океана";
    }

    getUserInfo() {
        const data = {
            name: this._name,
            bio: this._bio,
        }
        return data
    }

    setUserInfo(name, bio) {
        this._name = name;
        this._bio = bio;
        this._nameElement.textContent = name;
        this._bioElement.textContent = bio;
    }
}