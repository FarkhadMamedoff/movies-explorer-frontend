import { MOVIES_URL } from './constants';

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  async _getResult(res) {
    const response = await res.json();
    if (res.ok) {
      return response;
    }
    return Promise.reject(res);
  }

  getInitialMovies() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => { return this._getResult(res) });
  }

}


export default new MoviesApi({
  baseUrl: MOVIES_URL,
});