import decode from 'jwt-decode';
import { store } from '../redux/store';
import { loginSuccess, logout } from '../redux/store';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    const isValid = !!token && !this.isTokenExpired(token);
    if (isValid) {
      store.dispatch(loginSuccess({ token, user: this.getProfile() }));
    }
    return isValid;
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        store.dispatch(logout());
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    store.dispatch(loginSuccess({ 
      token: idToken, 
      user: decode(idToken)
    }));
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    store.dispatch(logout());
    window.location.assign('/');
  }
}

const authService = new AuthService();
export default authService;