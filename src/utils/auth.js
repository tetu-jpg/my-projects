export function getUser() {
  return JSON.parse(localStorage.getItem('doctor')) || JSON.parse(localStorage.getItem('patient'));
}

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('doctor');
  localStorage.removeItem('patient');
}
