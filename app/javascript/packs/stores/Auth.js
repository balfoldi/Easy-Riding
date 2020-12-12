import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import Cookies from "js-cookie";

class AuthStore {
  user = null;
  error = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      error: observable,
      isLogged: computed,
      login: action,
    });
  }

  get isLogged() {
    return !!this.user?.id;
  }

  login = async (email, password) => {
    this.error = null;

    const body = {
      user: {
        email,
        password
      }
    }

    try {
      const response = await fetch('/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();

      for (let pair of response.headers.entries()) {
        if (pair[0] === "authorization") {
          Cookies.set("EasyRiderToken", pair[1]);
        }
      }

      if (data.error) {
        throw new Error(`Erreur: ${data.error}`);
      }

      runInAction(() => {
        this.user = data;
      });

    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
    }
  }

}

export default new(AuthStore);
