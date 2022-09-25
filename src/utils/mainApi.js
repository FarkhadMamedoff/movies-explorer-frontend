import { BASE_URL } from './constants';

class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _headers() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    };
  }

  async _getResult(res) {
    const response = await res.json();
    if (res.ok) {
      return response;
    }
    return Promise.reject(response.message !== 'Validation failed' ? response.message : response.validation.body.message);
  }

  _setData(request, method, object, isAuthHeaders) {
    return fetch(this._baseUrl + request, {
      method: method,
      headers: isAuthHeaders ? {
        'Content-Type': 'application/json'
      } :
        this._headers(),
      body: JSON.stringify(object),
    })
      .then((res) => { return this._getResult(res) });
  }

  _getData(request) {
    return fetch(this._baseUrl + request, {
      method: 'GET',
      headers: this._headers(),
    })
      .then((res) => { return this._getResult(res) });
  }

  _updateData(request, method, id) {
    return fetch(this._baseUrl + request + id, {
      method: method,
      headers: this._headers(),
    })
      .then((res) => { return this._getResult(res) });
  }

  checkToken(token) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => { return this._getResult(res) });
  }

  login(object) {
    return this._setData('/signin', 'POST', object, true);
  }

  register(object) {
    return this._setData('/signup', 'POST', object, true);
  }

  updateUserInfo(object) {
    return this._setData('/users/me', 'PATCH', object, false);
  }

  getSavedMovies() {
    return this._getData('/movies');
  }

  deleteMovie(movieId) {
    return this._updateData('/movies/', 'DELETE', movieId);
  }

  addNewMovie(object) {
    return this._setData('/movies', 'POST', object, false);
  }

}


export default new MainApi({
  baseUrl: BASE_URL,
});