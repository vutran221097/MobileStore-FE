export default function authHeader() {
  const accessToken = JSON.parse(sessionStorage.getItem('token'));
  if (accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': accessToken };
  } else {
    return {};
  }
}