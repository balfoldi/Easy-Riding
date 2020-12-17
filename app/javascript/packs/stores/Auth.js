import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import Cookies from "js-cookie";

class AuthStore {
  user = null;
  error = null;
  validatesErrors = [];

  constructor() {
    makeObservable(this, {
      user: observable,
      error: observable,
      validatesErrors: observable,
      isLogged: computed,
      signup: action,
      login: action,
      logout: action,
      autoLogin: action
    });
  }

  get isLogged() {
    return !!this.user?.id;
  }

  signup = async (email, password, passwordConfirmation, termsAccepted) => {
    this.validatesErrors = [];

    const body = {
      user: {
        email,
        password,
        passwordConfirmation,
        termsAccepted
      }
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();

      for (let pair of response.headers.entries()) {
        if (pair[0] === "authorization") {
          Cookies.set("EasyRidingUserToken", pair[1].split(' ')[1]);
        }
      }

      if (data.errors) {
        runInAction(() => {
          data.errors.map((error) => {
            this.validatesErrors.push(error.detail)
          });
        });
        throw new Error(`Erreur: ${data.errors}`);
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
          Cookies.set("EasyRidingUserToken", pair[1].split(' ')[1]);
        }
      }

      if (data.error) {
        throw new Error(data.error);
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

  logout = async () => {
    this.error = null;

    const userToken = Cookies.get("EasyRidingUserToken");

    try {
      await fetch('/api/logout', {
        method: 'delete',
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
      });

      Cookies.remove("EasyRidingUserToken");

      runInAction(() => {
        this.user = null;
      });

    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
    }
  }

  autoLogin = async (userId, userToken) => {
    this.error = null;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      runInAction(() => {
        this.user = data;
      });

    } catch (error) {
      console.warn("The token is revoked, please login again");
    }
  }

}

export default new AuthStore();
