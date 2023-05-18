const API_URL = "https://my-json-server.typicode.com/improvein/dev-challenge/db";
const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export {
    API_URL,
    usernameRegex,
    passwordRegex
}