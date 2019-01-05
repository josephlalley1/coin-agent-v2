export function saveToken(token) {
  localStorage.setItem('house-token', token);
}

export function getToken() {
  return localStorage.getItem('house-token');
}

export function decodeToken() {
  const token = getToken();
  if (!token) return {};
  const decoded = JSON.parse(atob(token.split('.')[1]));
  return decoded;
}

export function deleteToken() {
  localStorage.removeItem('house-token');
}

export function isAuthenticated() {
  return !!getToken();
}
