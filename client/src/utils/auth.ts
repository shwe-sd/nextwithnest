import Cookies from 'js-cookie';

export const logoutUser = () => {
  Cookies.remove('token');
};