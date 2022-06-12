export class API {
  constructor(options) {
    (this._url = options.baseUrl), (this._headers = options.headers);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject("Ошибка при получении карточек");
        }
      }
    );
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject("Ошибка при получении данных пользователя.");
        }
      }
    );
  }

  saveUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject("Ошибка при сохранении данных пользователя.");
      } else {
        return res.json()
      }
    });
  }

  saveImage(name, src) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: src,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Ошибка при сохранении данных изображения.")
      }
    });
  }

  deleteImage(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).
    then((res) => {
      if (!res.ok) {
        return Promise.reject("Ошибка при удалении изображения.")
      }
    });
  }

  getLikes(id) {
    return fetch(`${this._url}/cards/?id=${id}`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject("Ошибка при получении данных о лайках.")
        }
      })
      .then((data) => {
        let card = data.find(({ _id }) => _id === id);
        return card["likes"];
    })
  }

  checkIfLikedBefore(id, userId) {
    return this.getLikes(id).then((likes) => {
      let users = [];
      likes.forEach((like) => {
        users.push(like["_id"]);
      });
      return users.includes(userId) ? true : false;
    });
  }

  like(id, user) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        likes: user,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Ошибка при удалении лайка.");
      }
    })
      .then((data) => {
        return data["likes"].length;
      });
  }

  unlike(id, user) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        likes: user,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject("Ошибка при отправке лайка.");
        }
      })
      .then((data) => data["likes"].length);
  }

  changePic(link, user) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject("Ошибка при отправке ссылки.");
      }
    });
  }
}
